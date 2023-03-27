import React, { useState } from 'react'
import Feed from '../PostContainer/Feed'
import Card from '../smallComponants/Card'
import About from './About'
import { InfoIcon, PhotoIcon, PostIcon, UserGroupIcon } from '../../icons/icons'
import Friends from './Friends'
import Images from './Images'
import ProfilePic from '../ProfilePic/ProfilePic'
import { useSelector } from 'react-redux'
import EditProfile from '../EditProfile/EditProfile'
const ProfileMainPost = () => {
  const userData = useSelector((state) => state.user)
  //editprofile modal
  const [isModal, setIsModal] = useState(false)
  const [tab, setTab] = useState('posts')
  const active = 'transition duration-200 hover:bg-gray-300 rounded flex gap-1 px-2 md:px-4 py-1 items-center border-black border-b-4 text-gray-900'
  const nonActive = "transition duration-200 hover:bg-gray-300 rounded flex gap-1 px-2 md:px-4 py-1 items-center"

 
  return (
    <>
      <div className='w-full'>
        <Card noPadding={true}>
          <div className='relative overflow-hidden rounded-md'>
            <>
              <ProfilePic />
            </>
            <div>
              <div className=' ml-32 '>
                <h1 className=' text-2xl font-semibold capitalize'>
                  {userData?.userName}
                </h1>
                <p className='text-gray-500 leading-4'>{userData?.bio}</p>
              </div>

              <div className='flex justify-end mr-4 -mt-6 font-bold '>
                <div onClick={() => setIsModal(true)} className='bg-[black] text-white cursor-pointer rounded-xl px-3'>Edit Profile</div>
              </div>

              {isModal &&  <div className='w-full'><EditProfile setIsModal={setIsModal}/></div>}

              <div className='mt-16 flex gap-0 '>
                <p onClick={() => setTab('posts')} className={tab === "posts" ? active : nonActive}>
                  <PostIcon />
                  Posts
                </p>
                <p onClick={() => setTab('images')} className={tab === "images" ? active : nonActive}>
                  <PhotoIcon />
                  Photos
                </p>
                <p onClick={() => setTab('friends')} className={tab === "friends" ? active : nonActive}>
                  <UserGroupIcon />
                  Friends
                </p>
                <p onClick={() => setTab('about')} className={tab === "about" ? active : nonActive}>
                  <InfoIcon />
                  About
                </p>

              </div>
              {tab === "posts" && <Feed />}
              {tab === "about" && <About />}
              {tab === "friends" && <Friends />}
              {tab === "images" && <Images />}
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}
export default ProfileMainPost
