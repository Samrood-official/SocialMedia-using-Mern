import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BellIcon, ChatIcon, SearchIcon } from '../../icons/icons'
import { setLogout } from '../../state/userReducer'
const Navbar = () => {
  const userData = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  const handleLogout = () => {
    dispatch(setLogout())
    navigate('/login')
  }
  return (
    <>
      {/* <User></User> */}
      <nav className='sticky top-0 z-20 w-full bg-white flex  justify-between h-24 items-center py-3 px-5 shadow-md'>
        <div className='flex item-center space-x-5'>
          <i className='fa-solid fa-bars'></i>
          <h1 className='text-3xl  italic from-neutral-700'>Social</h1>
        </div>
        <div className='hidden sm:block w-auto border border-black bg-black  rounded md:flex item-center space-x-5'>
          <input className='w-full focus:outline-none py-2 px-5 text-gray ' type='text' placeholder='search....' />
          <div className='pr-3 cursor-pointer py-2'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
        </div>

        <div className='flex'>
          <div className="flex items-center">
            <div className='px-4'>
              <BellIcon />
            </div>

            <ChatIcon />
          </div>

          {userData &&
            <p className=" px-3 py-3 capitalize rounded-md text-sm font-bold">{userData?.userName}</p>
          }

          <div className='relative'>
            {userData.profilePic ?
              <button className='block w-12 h-12 md:hidden' onClick={toggleMenu}>
                <img className='rounded-full h-full w-full' src={userData?.profilePic ? userData?.profilePic : ""} alt=''></img>
              </button> : <div onClick={toggleMenu} className='block md:hidden border-zinc-400 border w-10 h-10 rounded-full'>
                <FaUser className='w-full h-full rounded-full' /> </div>}
            {userData.profilePic ?
              <button onClick={() => navigate(`/profile/${userData._id}`)} className='hidden md:block w-12 h-12'>
                <img className='rounded-full h-full w-full' src={userData?.profilePic ? userData?.profilePic : ""} alt=''></img>
              </button> : <div className='hidden md:block  border border-[#3d3f50] w-10 h-10 rounded-full'>
                <FaUser className='w-full h-full rounded-full' /> </div>}

            <div className={`absolute top-12 right-0 w-40 bg-white text-center rounded-lg py-2 ${isOpen ? '' : 'hidden'}`}>
              {userData ? <p onClick={handleLogout} className='py-2 rounded hover:bg-gray-700 hover:text-white transition duration-200'>Logout</p> :
                <p onClick={() => navigate('/login')} className='py-2rounded hover:bg-gray-700 hover:text-white transition duration-200'>Login</p>
              }
              <p onClick={() => navigate(`/profile/${userData._id}`)} className='py-2 rounded hover:bg-gray-700 hover:text-white transition duration-200'>Profile</p>
              <p className='py-2 rounded hover:bg-gray-700 hover:text-white transition duration-200'>Settings</p>
            </div>
          </div>
          {/* {userData && <p className='p-3 font-bold'>{userData.userName}</p>} */}
        </div>
      </nav>

      {/* search bar for small scree  n */}
      <div className=' sm:hidden flex w-full bg-[#efefef] p-2 item-center '>
        <input className='w-full border border-black focus:outline-none py-2 px-5  text-gray rounded-l-md' type='text' placeholder='search....' />
        <div className='border-black bg-black cursor-pointer py-2 px-5  rounded-r-md'>
          <SearchIcon />
        </div>
      </div>
    </>


  )
}

export default Navbar