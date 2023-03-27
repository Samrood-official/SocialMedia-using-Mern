import React, { useEffect } from 'react'
import Post from './Post'
import axios from '../../utils/axios'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from '../../state/userReducer'
import { getPosts } from '../../utils/constants'

const Feed = () => {
    const posts = useSelector((state) => state.posts)
    const token = useSelector((state) => state.token)
    console.log(posts);
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
                    author,
                    image,
                    likes,
                    comments,
                    createdAt }) => (
                    <Post key={_id}
                        id={_id}
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