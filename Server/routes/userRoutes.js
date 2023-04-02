import express from 'express';
import upload from '../config/multer.js';
import { verifyToken } from '../middleware/verifyToken.js'

import { updatePost, getPost, addPost, fetchPostFollowing, deletePost, commentPost,fetchPosts,fetchAllPosts } from '../controllers/postController.js'
import { register, login, verifyEmail, resetPassword, forgotPassword } from '../controllers/authController.js'
import { followUser,removeFollower, unfollowUser, getFollowings, updateUser, deleteUser, likePost, addProfilepPic, getAllUsers } from '../controllers/userControllers.js';

const router = express.Router()

//user 
router.post('/signup', register)
router.post('/login', login)

router.get('/all-users', verifyToken, getAllUsers)  
router.get('/get-mypost', verifyToken, getPost)
router.get('/followings', verifyToken, getFollowings)
router.get('/user-posts', verifyToken, fetchPosts)
router.get('/followings-posts', verifyToken, fetchPostFollowing)
router.get('/all-posts', verifyToken, fetchAllPosts)

router.post('/add-profilepic', upload.single("file"), addProfilepPic)
router.post('/add-post', upload.single("file"), addPost)
router.post('/forgot-password', forgotPassword)
router.post('/verify-email', verifyEmail)
router.post('/posts/:postId/comment',verifyToken, commentPost)
    
router.put('/reset-password', resetPassword)
router.put('/edit-profile', verifyToken, updateUser)    
router.put('/posts/:postId/like',verifyToken, likePost)

// router.put('/:id/like', verifyToken, likePost)
router.put('/update-post/:id', updatePost)
router.put('/add-friend', verifyToken, followUser)
router.put('/un-follow', verifyToken, unfollowUser)
router.put('/remove-follower', verifyToken, removeFollower)

router.delete('/delete/:id', verifyToken, deleteUser)
router.delete("/delete-post/:id", verifyToken, deletePost) 

export default router;