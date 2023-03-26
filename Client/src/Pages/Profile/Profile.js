import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import ProfileMainPost from '../../Components/ProfileMainpostContainer/ProfileMainPost'
import Leftbar from '../../Components/LeftpostContainer/Leftbar'
const Profile = () => {
  // bg-rgb-235-238-246
  return (
    <>
      <Navbar />
      <div className='bg-[#efefc8] flex flex-wrap p-8' >
        <div className='hidden md:block md:w-1/4 p-2 '>
          <Leftbar />
        </div>
        <div className='w-full md:w-3/4 p-4 flex flex-wap shadow-lg shadow-gray-400'>
          <ProfileMainPost />
        </div>
      </div>
    </>
  )
}

export default Profile