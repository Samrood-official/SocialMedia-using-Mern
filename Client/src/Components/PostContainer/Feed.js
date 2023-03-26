import React, { useEffect } from 'react'
import Post from './Post'
import axios from '../../utils/axios'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from '../../state/userReducer'
import { getPosts } from '../../utils/constants'

const Feed = () => {

    const posts = useSelector((state) => state.posts)
    const token = useSelector((state) => state.token)
    const dispatch = useDispatch()

    const fetchPost =async () => {
        const posts = await axios.get(getPosts, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
        })
        dispatch(setPosts({posts:posts.data}))
    }

    useEffect(() => {
        fetchPost()
    },[])
    return (
        <>
            {
                posts.map(({
                    _id,
                    desc,
                    userId,
                    image,
                    likes,
                    comments,
                    createdAt }) => (
                    <Post key={_id}
                        desc={desc}
                        userId={userId}
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