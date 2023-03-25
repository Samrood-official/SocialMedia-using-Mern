import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
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
      <nav className='sticky top-0 z-20 w-full flex bg-[#FFFFFF] justify-between h-24 items-center py-3 px-5 shadow-xl'>
        <div className='flex item-center space-x-5'>
          <i className='fa-solid fa-bars'></i>
          <h1 className='text-3xl text-Blue hover:text-gray-400 font-semibold'>SocialMedia</h1>
        </div>
        <div className='hidden sm:block w-auto border border-[#efefc8] bg-[#efefc8] rounded md:flex item-center space-x-5'>
          <input className='w-full focus:outline-[#efefc8] py-2 px-5 text-gray ' type='text' placeholder='search....' />
          <div className='pr-3 cursor-pointer py-2'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
        </div>

        <div className='flex'>
          <div class="flex items-center">
            <div className='px-4'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue hover:text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6  text-blue hover:text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
            </svg>
          </div>

          {userData &&
            <p class=" hover:text-gray-400 px-3 py-2 rounded-md text-sm font-bold">{userData?.userName}</p>
          }

          <div className='relative'>
            <button className='block w-10 h-10 md:hidden' onClick={toggleMenu}>
              <img className='rounded-full h-full w-full' src={userData?.profilePic ? userData?.profilePic : ""} alt=''></img>
            </button>

            <button className='hidden md:block w-10 h-10'>
              <img className='rounded-full h-full w-full' src={userData?.profilePic ? userData?.profilePic : ""} alt=''></img>
            </button>
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
      <div className='px-12 py-2 sm:hidden flex w-full bg-[#efefc8] rounded item-center space-x-5'>
        <input className='w-full focus:outline-[#efefc8] py-2 px-5 text-gray ' type='text' placeholder='search....' />
        <div className='pr-3 cursor-pointer py-2'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
      </div>
    </>


  )
}

export default Navbar