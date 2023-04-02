import cloudinary from "../config/cloudinary.js"
import Notification from "../models/Notification.js"
import Post from "../models/Post.js"
import User from "../models/User.js"

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params
        const { content } = req.body
        let post = await Post.findById(id)
        if (!post) return res.status(400).json({ msg: 'post not found' })
        post = await Post.findByIdAndUpdate(id, { $set: { desc: content } }, { new: true })
        let updatedpost = await post.save()
        console.log("updatedpost");
        console.log(updatedpost);
        return res.status(200).json(updatedpost)
    } catch (err) {
        console.log(err);
        return res.status(500).json('internal error occured')
    }
}

//add post
export const addPost = async (req, res) => {
    try {
        let { userId, desc } = req.body
        let image = ""
        let result;
        if (req.file) {
            result = await cloudinary.uploader.upload(req.file.path)
            image = result.secure_url
        }
        let newPost = new Post({
            desc: desc,
            image: image,
            author: userId
        })
        const post = await newPost.save()
        res.status(200).json(post)
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "internal error occured" })
    }
}

//user posts
export const getPost = async (req, res) => {
    try {
        const mypost = await Post.find({ author: req.user.id }).populate("author comments.author")
        if (!mypost) {
            return res.status(400).json({ msg: "you dont have any post" })
        }
        res.status(200).json(mypost)
    } catch (err) {
        console.log(err);
        res.status(500).json('internal error')
    }
}

export const fetchPostFollowing = async (req, res) => {
    try {
        const { id } = req.user
        const user = await User.findById(id)
        if (!user) return res.status(400).json('user not found')
        const posts = await Promise.all(
            user.followings.map((item) => {
                return Post.find({ author: item }).populate('author').populate('comments.author').sort({ createdAt: -1 })
            }))
        const flattenPost = posts.flat()
        const userPost = await Post.find({ author: id }).populate("author").populate('comments.author').sort({ createdAt: -1 })
        const combinedPost = userPost.concat(flattenPost)
        return res.status(200).json(combinedPost)
    } catch (err) {
        console.log(err);
        return res.status(400).json("internal error")
    }
}
export const fetchAllPosts = async (req, res) => {
    try {
        const { id } = req.user
        const user = await User.findById(id)
        if (!user) return res.status(400).json('user not found')
        const posts = await Post.find().populate('author').populate('comments.author userName profilePc')
        return res.status(200).json(posts)
    } catch (err) {
        console.log(err);
        return res.status(400).json("internal error")
    }
}
// fetch myposts  
export const fetchPosts = async () => {
    try {
        const { id } = req.user
        const posts = await Post.find({ author: id })
        if (posts) return res.status(200).json(posts)
    } catch (err) {
        console.log(err);
        res.status(400).json('internal error')
    }
}

export const commentPost = async (req, res) => {
    try {
        const postId = req.params.postId
        const { comment } = req.body;
        const { id, userName } = req.user

        const Comment = {
            "text": comment,
            "author": id,
            "isDelete": false
        }
        const post = await Post.findById(postId)
        post.comments.unshift(Comment)
        const updatedpost = await post.save()
        const notification = new Notification({
            type: 'comment',
            user: post.author,
            friend: id,
            content: 'commented on your post',
            postId: postId
        })
        const updatedNotification = await notification.save()
        console.log(updatedNotification);
        return res.status(200).json(updatedpost)
    } catch (err) {
        console.log(err);
        return res.status(500).json("internal server error")
    }
}

//deletePost                                        
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post) {
            await Post.findByIdAndDelete(req.params.id)
            return res.status(200).json({ id: req.params.id })
        } else {
            return res.status(400).json('you are not allowed to delete this post')
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json("internal server error")
    }
}
