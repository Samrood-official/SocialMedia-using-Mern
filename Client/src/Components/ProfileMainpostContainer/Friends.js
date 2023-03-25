import React from 'react'
import Avatar from '../smallComponants/Avatar'


const Friend = () => (<div className="flex items-center shadow-md shadow-gray-300 p-2">
  <Avatar />
  <div className="flex flex-col">
    <h2 className="text-lg font-medium">John Doe</h2>
    <p className="text-gray-500">UI/UX Designer</p>
  </div>
  <button className="bg-gray-600 h-8 text-white rounded-md p-auto px-4 m-4 hover:bg-slate-400">
    Follow
  </button>
</div>)

const Friends = () => {
  return (
    <div className='flex'>

      <div className='w-1/2 flex p-4'>
        <div className="bg-white  rounded-md ">
          <h1 className='text-2xl py-2'>Followings</h1>
          <Friend />
          <Friend />
          <Friend />
          <Friend />
        </div>
      </div>
      <div className='w-1/2 flex p-4'>
        <div className="bg-white  rounded-md ">
          <h1 className='text-2xl py-2'>Followers</h1>
          <Friend />
          <Friend />
          <Friend />
          <Friend />
        </div>
      </div>
    </div>
  )
}

export default Friends