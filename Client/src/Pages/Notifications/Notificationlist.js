import React from 'react'
import { FaUser } from 'react-icons/fa'
import {format} from 'timeago.js'

const Notificationlist = ({ type, user, friend, content, post, createdAt }) => {

    return (
        <div className=''>
            <div className='flex p-2 border-2 m-1'>
                {friend.profilePic ?
                    <img className='rounded-full mx-2 w-10 h-10' src={friend.profilePic} /> :
                    <div className='border mx-2 border-[#3d3f50] w-10 h-10 rounded-full'>
                        <FaUser className='w-full h-full rounded-full' />
                    </div>
                }
                <div>
                <p>{`${friend.userName} ${content}`}</p>
                <p>{format(createdAt)}</p></div>
                {post &&
                    <img className=' mx-3 w-10 h-10' src={post.image} />
                }
            </div>
        </div>
    )
}

export default Notificationlist