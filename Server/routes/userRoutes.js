import express  from 'express';

import upload from '../config/multer.js';

import {
    register,
    login,
    followUser,
    fetchPostFollowing,
    updateUser,
    deleteUser,
    getPost,
    addPost,
    updatePost,
    deletePost,
    likePost,
    commentPost,
    addProfilepPic,
    verifyEmail,
    forgotPassword,
    resetPassword

} from '../controllers/userControllers.js';
import { verifyToken } from '../middleware/verifyToken.js'  

const router = express.Router()
router.post('/signup', register)
router.post('/login', login)
router.post('/verifyEmail', verifyEmail)                          
router.post('/addProfilepPic',upload.single("file"),addProfilepPic)
router.post('/addPost',upload.single("file"),addPost)
router.post('/forgotPassword',forgotPassword)
router.put('/resetPassword',resetPassword)

router.put('/following/:id', verifyToken, followUser)
//fetch post from followings     
router.get('/flw/:id', verifyToken, fetchPostFollowing)
//update user
router.put('/update/:id', verifyToken, updateUser)
//delete user account 
router.delete('/delete/:id', verifyToken, deleteUser)

// upload post by one user
router.get('/getPost', verifyToken, getPost)
    
router.post('/user/post', addPost)

//update post
router.put('/update/post/:id', updatePost)

//like
router.put('/:id/like', verifyToken, likePost)

//comment on post
router.post('/comment/post',commentPost)
//delete Post
router.delete("/delete/post/:id", verifyToken, deletePost)
export default router;