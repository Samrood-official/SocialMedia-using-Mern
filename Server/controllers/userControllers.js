import bcrypt from 'bcrypt'
import Jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Post from '../models/Post.js'
import cloudinary from '../config/cloudinary.js'
import genrateotp from '../utils/mail.js'
import VerificationToken from '../models/VerificationToken.js';
const jwt_secret_key = "mywebtoken"
import transport from '../config/nodemailer.js'
import crypto from 'crypto'
import ResetToken from '../models/ResetToken.js';
import { match } from 'assert';
export const register = async (req, res) => {
    try {
        console.log(req.body);
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(403).json({ msg: "Email Already Exist" })
        }
        const saltRounds = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(req.body.password, saltRounds)

        user = await User.create({
            userName: req.body.userName,
            email: req.body.email,
            password: hashedpassword,
            phoneNumber: req.body.phoneNumber
        })
        const accessToken = Jwt.sign({
            id: user._id,
            userName: user.userName,

        }, jwt_secret_key)
        const otp = genrateotp()

        const verificationToken = await VerificationToken.create({
            user: user._id,
            token: otp
        })
        await verificationToken.save()
        await user.save()

        transport.sendMail({
            from: "sender@server.com",
            to: user.email,
            subject: "verify your email using otp",
            html: `<h1>Your Otp Code ${otp}</h1>`
        })
        // res.status(200).json({ user, accessToken })
        res.status(200).json({
            status: "pending",
            message: "Please check your email",
            user: user._id,
        })
    } catch (error) {
        return res.status(500).json("internal error Occured" + error)
    }
}

//login
export const login = async (req, res) => {
    try {
        const userData = await User.findOne({ email: req.body.email })
        if (!userData) {
            return res.status(400).json({ msg: "Email Not Exist" })
        }
        const comparePassword = await bcrypt.compare(req.body.password, userData.password)
        if (!comparePassword) {
            return res.status(401).json({ msg: "incorrect password" })
        }
        const accessToken = Jwt.sign({
            id: userData._id,
            userName: userData.userName
        }, jwt_secret_key)
        const { password, ...user } = userData._doc
        res.status(200).json({ user, accessToken })

    } catch (err) {
        return res.status(500).json({ error: err.message })
    }
}

//verify email
export const verifyEmail = async (req, res) => {
    try {
        const { userId, otp } = req.body
        console.log(userId, otp);
        const mainuser = await User.findById(userId)
        if (!mainuser) { return res.status(400).json("user not exist") }
        const token = await VerificationToken.findOne({ user: userId })
        if (!token) { return res.status(400).json("token is not valid") }
        const isMatch = await bcrypt.compare(otp, token.token)
        if (!isMatch) { return res.status(400).json({ msg: 'otp is incorrect' }) }
        mainuser.verified = true;

        await VerificationToken.findByIdAndDelete(token._id)
        await mainuser.save()
        const accessToken = Jwt.sign({
            id: userId,
            userName: mainuser.userName
        }, jwt_secret_key)
        const { password, ...user } = mainuser._doc

        //nodemailer    
        transport.sendMail({
            from: "socialmedia@gmail.com",
            to: user.email,
            subject: "Successfully verified email",
            html: `<h1>now you can login</h1>`
        })
        return res.status(200).json({ user, accessToken })
    } catch (err) {
        return res.status(500).json('internal error')
    }
}

//forgot password
export const forgotPassword = async (req, res) => {
    console.log("dddddddddddddd");
    const { email } = req.body
    let user = await User.findOne({ email: email })
    if (!user) return res.status(400).json({ msg: 'acccount not found' })
    let userId = user._id
    const randomText = crypto.randomBytes(20).toString('hex')
    const resetToken = new ResetToken({
        user: user._id,
        token: randomText
    })
    await resetToken.save()
    transport.sendMail({
        from: "sender@server.com",
        to: user.email,
        subject: "reset token",
        html: `
        <a href="http://localhost:3000/resetPassword?token=${randomText}&userId=${userId}">password reset link</a>`
    })
    return res.status(200).json({ msg: 'check your email to reset password' })
}

//reset Password
export const resetPassword = async (req, res) => {
    const { token, userId } = req.query
    if (!token || !userId) return res.status(400).json({ msg: 'invalid request' })

    const user = await User.findOne({ _id: userId })
    if (!user) return res.status(400).json('user not found')
    const resetToken = await ResetToken.findOne({ user: user._id })
    if (!resetToken) return res.status(400).json({ msg: "Already changed password" })
    const isMatch = await bcrypt.compare(token, resetToken.token)
    if (!isMatch) { return res.status(400).json({ msg: 'token is not valid' }) }
    await ResetToken.deleteOne({ user: user._id })

    const { password } = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    user.password = hashedPassword
    await user.save()

    transport.sendMail({
        from: "sender@server.com",
        to: user.email,
        subject: "your password reset successfull",
        html: `now you can login`
    })
    return res.status(200).json({ msg: 'check your email to reset password' })
}

export const followUser = async (req, res) => {
    try {
        if (req.params.id !== req.body.user) {
            const user = await User.findById(req.body.user)
            const otherUser = await User.findById(req.params.id)
            if (!user.followers.includes(req.body.user)) {
                await User.updateOne({ $push: { followers: req.body.user } })
                await User.updateOne({ $push: { followings: req.params.id } })
                return res.status(200).json("user has followed")
            } else {
                return res.status(400).json('user already follow this user')
            }
        } else {
            return res.status(500).json('you cant follow yourself')
        }
    } catch (err) {

    }
}
export const fetchPostFollowing = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const followingsPost = await Promise.all(
            user.followings.map((item) => {
                return Post.find({ user: item })
            })
        )
        res.status(200).json(followingsPost)

    } catch (err) {
        return res.status(500).json("internal error")
    }
}
export const updateUser = async (req, res) => {
    try {
        if (req.params.id === req.body.user) {

            if (req.body.password) {
                const salt = await bcrypt.genSalt(10)
                const password = await bcrypt.hash(req.body.password, salt)
                req.body.password = password
                const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                })
                return res.status(200).json(updatedUser + "updated user data")
            }
        } else {
            return res.status(400).json("you are not allowed to update this user details")
        }

    } catch (err) {
        return res.status(500).json('internal error occured')
    }
}
export const deleteUser = async (req, res) => {
    try {
        if (req.params.id !== req.user.id) {
            return res.status(400).json("user dosn't match")
        }
        await User.findByIdAndDelete(req.params.id)
        return res.status(200).json('deleted account successfully')
    } catch (err) {
        return res.status(500).json('internal error occured')
    }
}

//add post
export const addPost = async (req, res) => {
    try {
        let { title, image, video } = req.body
        let newPost = new Post({
            title, image, video, user: req.user.id
        })
        const post = await newPost.save()
        res.status(200).json(post)
    } catch (err) {
        return res.status(500).json("internal error occured")
    }
}

export const getPost = async (req, res) => {
    try {
        const mypost = await findById(req.user.id)
        if (!mypost) {
            return res.status(400).json("you dont have any post")
        }
        res.status(200).json(mypost)
    } catch (err) {
        res.status(500).json('internal error')
    }
}
export const updatePost = async (req, res) => {
    try {
        let post = await findById(req.params.id)
        if (!post) return res.status(400).json("post not found")
        post = await findByIdAndUpdate(req.params.id, {
            $set: req.body
        })
        let updatedpost = post.save()
        res.status(200).json(updatedpost)
    } catch (err) {
        return res.status(500).json('internal error occured')
    }
}

export const likePost = async (req, res) => {
    try {
        const post = await findById(req.params.id)
        if (!post.like.includes(req.params.id)) {
            await updateOne({ id: req.params.id }, {
                $push: { like: req.body.user }
            })
            return res.status(200).json('post has been liked')
        } else {
            await post.updateOne({ id: req.param.id }, {
                $pull: { like: req.body.user }
            })
            return res.status(200).json('Post hasbeen unliked')
        }
    } catch (err) {
        return res.status(400).json('internal error occured')
    }
}
export const commentPost = async (req, res) => {
    try {
        const { comment, postid } = req.body;
        const comments = {
            user: req.user.id,
            userName: req.user.userName,
            comment
        }
        const post = await findById(postid)
        post.comments.push(comments)
        await post.save()
        res.status(200).json(post)
    } catch (err) {
        return res.status(500).json("internal server error")
    }
}
export const deletePost = async (req, res) => {
    try {
        const post = await findById(req.param.id)
        if (post) {
            await findByIdAndDelete(req.params.id)
            return res.status(200).json("deleted post")
        } else {
            return res.status(400).json('you are not allowed to delete this post')
        }
    } catch (err) {
        return res.status(500).json("internal server error")
    }
}
export const addProfilepPic = async (req, res) => {
    try {
        const { userId } = req.body
        let result = await cloudinary.uploader.upload(req.file.path)
        let updatedUser = await User.findByIdAndUpdate(userId,
            { $set: { profilePic: result.secure_url } }, { new: true })
        console.log(updatedUser);
        res.status(200).json(updatedUser)
    } catch (err) {
        res.status(500).json("internal error")
    }

}