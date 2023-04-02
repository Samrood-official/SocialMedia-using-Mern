import React, { useEffect, useState } from 'react'
import Post from './Post'
import axios from '../../utils/axios'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from '../../state/userReducer'
import { getPosts } from '../../utils/constants'
import { fetchMypost } from '../../state/apiCalls'
const Feed = ({ isMypost }) => {
    let posts = useSelector((state) => state.posts)
    const token = useSelector((state) => state.token)
    const user = useSelector((state) => state.user)
    const [loading, setLoading] = useState(false)
    // const [userPosts, setUserPosts] = useState([])
    const dispatch = useDispatch()

    const fetchPosts = async () => {
        setLoading(true)
        const response = await axios.get(getPosts, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
        })
        const postData = response.data;
        dispatch(setPosts({ posts: postData }))
        setLoading(false)
    }
    if (isMypost) {
        posts = posts.filter((item) => item?.author?._id === user?._id)
        console.log(posts);
    }
    useEffect(() => {
        fetchPosts()
    }, [])
    if (loading) return <div className='bg-white mt-2 rounded p-28 text-3xl font-semibold'>loading..............</div>
    if (!posts) return null
    return (
        <>
            {posts?.length < 1 ? <div className='bg-white mt-2 rounded p-28 text-3xl font-semibold'>No Posts !!</div> :

                posts?.map(({
                    _id,
                    desc,
                    author,
                    image,
                    likes,
                    comments,
                    createdAt }) => (
                    <Post key={_id}
                        postId={_id}
                        desc={desc}
                        author={author}
                        image={image}
                        likes={likes}
                        comments={comments}
                        createdAt={createdAt}
                    />
                ))
            }
        </>
    )

}

export default Feed