import React from 'react'
import Avatar from './Avatar'

const FriendInfo = () => {
  return (
    <div className='flex gap-2 shadow-md shadow-gray-400 p-2'>
        <Avatar/>
        <div>
            <h3 className='font-semibold text-xl'>Samrood</h3>
            <div className='text-sm leading-3'>5 mutual friends</div>
        </div>
    </div>
  )
}

export default FriendInfo