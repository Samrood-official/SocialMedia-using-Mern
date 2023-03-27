import React from 'react'
import Avatar from './Avatar'

const FriendInfo = () => {
  return (
    <div className='flex gap-2 shadow-md shadow-gray-400 p-2 justify-between'>
      <div className='flex'>
        <Avatar />
        <div>
          <h3 className='font-semibold text-xl'>user</h3>
          <div className='text-sm leading-3'>bio</div>
        </div>
      </div>
      <div className='px-7 py-auto '>
        <button className='bg-gray-700 my-2 px-2 text-white'>follow</button>
      </div>
    </div>
  )
}

export default FriendInfo