import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { CommentIcon, HeartIcon, MenuIcon, ShareIcon, SubmitIcon } from '../../icons/icons'
import axios from '../../utils/axios'
import { deletePost, updatePost } from '../../utils/constants'
const Feed = (props) => {
    const {
        id,
        desc,
        author,
        image,
        likes,
        // comments,
        createdAt } = props;

    const [like, setLike] = useState(false)
    const [count, setCount] = useState(10)
    const [comments, setComment] = useState([])
    const [commentWriting, setcommentWriting] = useState('')
    const [showComment, setShowComment] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const user = useSelector((state) => state.user)
    const token = useSelector((state)=>state.token)
    const handleLike = () => {
        if (like === true) {
            setLike(false)
            setCount(count - 1)
        } else {
            setLike(true)
            setCount(count + 1)
        }
    }
    const AddComment = () => {
        const comment = {
            "id": "4ejdifudh45asde",
            "userName": "suman",
            "title": `${commentWriting}`
        }
        
        setComment(comments.concat(comment))
    }
    const HandleComment = () => {
        AddComment();
    }
    const HandleShowComment = () => {
        if (showComment === true)
            setShowComment(false)
        else setShowComment(true)
    }

    const handleDeletePost = (postId) => {
        console.log(postId);
        axios.delete(`${deletePost}/${postId}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }).then((response) => {
            window.location.reload()
        }).catch((err) => {
        })
    }

    const handleEditPost = (postId)=>{
        axios.put(`${updatePost}/${postId}`,{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }).then(()=>{
            window.location.reload()
        }).catch(()=>{

        })
    }

    return (
        <div className='pt-4'>
            <div className='bg-white rounded-2xl'>
                <div className=' p-4'>
                    <div className='justify-between flex'>
                        <div className=' flex '>
                            <img className='w-10 rounded-full h-10' src={user.profilePic} alt='' />
                            <div>
                                <p className='pl-4'>{user.userName}</p>
                                <p className='text-sm'>{user.bio}</p>
                            </div>
                        </div>

                        <div className='relative'>
                            <div className='block w-10 h-10 cursor-pointer ' onClick={() => setShowMenu(true)}>
                                <MenuIcon />
                            </div>
                            {showMenu &&
                                <div className="absolute top-0 right-8 w-20 bg-white text-center rounded-lg py-2">
                                    <p onClick={() => handleDeletePost(id)} className='py-2 rounded hover:bg-gray-200 hover:text-white transition duration-200'>Delete</p>
                                    <p onClick={()=> handleEditPost(id)} className='py-2 rounded hover:bg-gray-200 hover:text-white transition duration-200'>Edit</p>
                                </div>
                            }
                        </div>
                    </div>
                    <p className='bg-white p-5 '>
                        {desc}
                    </p>
                    <div className='flex justify-center ' onClick={() => setShowMenu(false)}>
                        <img className='rounded-md' src={image} alt='' />
                    </div>
                </div>

                <div className='flex'>
                    <div className='flex'>
                        <div className='flex p-4'>
                            <div onClick={handleLike}>
                                <HeartIcon liked={like? true: false}/>
                            </div>
                            <p>{likes.length} likes</p>
                        </div>
                        <div className='flex p-4'>
                            <div onClick={HandleShowComment}>
                                <CommentIcon />
                            </div>
                            <p>10k comments</p>
                        </div>
                    </div>
                    <div className='ml-auto mr-5 pt-4'>
                       <ShareIcon />
                    </div>
                </div>

                {showComment ?
                    <div>
                        <div className='flex p-5 justify-between'>
                            <div className='pl-4 flex'>
                                <img className='w-10 rounded-full h-10' src={user.profilePic} alt='' />
                                <div className='pl-4'>
                                    <input className='w-72 h-12 focus:outline-none' type="text" onChange={(e) => setcommentWriting(e.target.value)} placeholder='comment' />
                                </div>
                            </div>
                            {/* comment sending icon */}
                            <div className='p-2' onClick={HandleComment}>
                                <SubmitIcon />
                            </div>
                        </div>
                        {comments.map((item) => (

                            <div className='flex p-5 gap-2'>
                                <img className='w-10 rounded-full h-10' src={user.profilePic} alt='' />
                                <div>
                                    <p className='text-sm'>{item.userName}</p>
                                    <p>{item.title}</p>
                                </div>
                            </div>
                        ))}
                    </div> : ""
                }
            </div>
        </div>
    )
}

export default Feed