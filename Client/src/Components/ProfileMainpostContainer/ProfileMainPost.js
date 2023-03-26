import React, { useState } from 'react'
import Feed from '../PostContainer/Feed'
import Card from '../smallComponants/Card'
import About from './About'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { InfoIcon, PhotoIcon, PostIcon, UserGroupIcon } from '../../icons/icons'
import Friends from './Friends'
import Images from './Images'
import ProfilePic from '../ProfilePic/ProfilePic'
import { useSelector } from 'react-redux'
const ProfileMainPost = () => {
  const { id } = useParams()
  const location = useLocation()
  const { pathname } = location
  const userData = useSelector((state)=>state.user)
  
  const [tab, setTab] = useState('posts')
  const active = 'flex gap-1 px-2 md:px-4 py-1 items-center border-red-600 border-b-4 text-red-500'
  const nonActive = "flex gap-1 px-2 md:px-4 py-1  items-center"

  console.log(pathname);
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
                  {userData.userName}
                </h1>
                <p className='text-gray-500 leading-4'>india, kerala</p>
              </div>
              <div className='mt-10 flex gap-0'>
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
