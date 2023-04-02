import React, { useEffect, useState } from 'react'
import Feed from '../PostContainer/Feed'
import Card from '../smallComponants/Card'
import About from './About'
import { InfoIcon, PhotoIcon, PostIcon, UserGroupIcon } from '../../icons/icons'
import Friends from './Friends'
import Images from './Images'
import ProfilePic from '../ProfilePic/ProfilePic'
import { useSelector } from 'react-redux'
import EditProfile from '../EditProfile/EditProfile'
import axios from '../../utils/axios'
import { getFrieds } from '../../utils/constants'
const ProfileMainPost = () => {
  const userData = useSelector((state) => state.user)
  //editprofile modal
  const [isModal, setIsModal] = useState(false)
  const [tab, setTab] = useState('posts')
  const active = 'transition duration-200 hover:bg-zinc-300 rounded flex gap-1 px-2 md:px-4 py-1 items-center border-black border-b text-red-500'
  const nonActive = "transition duration-200 hover:bg-gray-300 rounded flex gap-1 px-2 md:px-4 py-1 items-center"

  // followings followers
  const [followings, setFollowings] = useState([])
  const [followers, setFollowers] = useState([])
  const [callFriend,setCallFriend] = useState(false)
   const token = useSelector((state) => state.token)
  const getFollowers = () => {
    axios.get(getFrieds, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    }).then((response) => {
      setFollowings(response.data.followings)
      setFollowers(response.data.followers)
    })
  }
  useEffect(() => {
    getFollowers()
  }, [callFriend])

  return (
    <>
      <div className='w-full border-x border-zinc-400 mt-4'>
        <Card noPadding={false} className="bg-white rounded mb-5">
          <div>
            <div className='h-44 bg-[#c6c6c6] mx-1'>
              {/* <img className='w-full h-48' src='https://www.nationsonline.org/gallery/Greece/Acropolis-Athens.jpg' alt='' /> */}
              <div className=' w-full h-full'> </div>
            </div>
            <div className=' border-b-2 border-[#3d3f50]'>
              <>
                <ProfilePic />
                <div className='ml-24'>
                  <h1 className=' text-2xl font-semibold capitalize'>
                    {userData?.userName}
                  </h1 >
                  <div className='flex flex-wrapjustify-self-auto w-32'>
                    <p className='text-gray-500 w-full leading-4'>{userData?.bio}</p>
                  </div>
                </div>
                <div className='flex justify-end mr-4 -mt-3 font-bold '>
                  <div onClick={() => setIsModal(true)} className='border border-[#3d3f50] mb-2 text-md cursor-pointer rounded-md px-1'>Edit Profile</div>
                </div>
                {isModal && <div className=' w-full'><EditProfile setIsModal={setIsModal} /></div>}
              </>
            </div>
            <div>

              <div className=' flex gap-0 '>
                <p onMouseOver={() => setTab('posts')} className={tab === "posts" ? active : nonActive}>
                  <PostIcon />
                  Posts
                </p>
                <p onMouseOver={() => setTab('images')} className={tab === "images" ? active : nonActive}>
                  <PhotoIcon />
                  Photos
                </p>
                <p onMouseOver={() => setTab('followings')} className={tab === "followings" ? active : nonActive}>
                  <UserGroupIcon />
                  Followings
                </p>
                <p onMouseOver={() => setTab('followers')} className={tab === "followers" ? active : nonActive}>
                  <InfoIcon />
                  Followers
                </p>

              </div>
              {tab === "followings" && <Friends  data={followings} type={"followings"} />}
              {tab === "posts" && <Feed isMypost={true}/>}
              {tab === "followers" && <Friends setCallFriend={setCallFriend} callFriend={callFriend} data={followers} type={"followers"} />}
              {tab === "images" && <Images />}
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}
export default ProfileMainPost