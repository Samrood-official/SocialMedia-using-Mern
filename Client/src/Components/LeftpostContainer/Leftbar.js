import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
const Leftbar = () => {
  // Get the user data from the Redux store
  const userData = useSelector((state) => state.user);
  const navigate = useNavigate()

  return (
    <div className=' bg-white sticky left-0 top-36 z-10 shadow-lg shadow-gray-400'>
      <div className='p-4'>
        <Link to='/' className='text-xl font-medium block mb-4'>
          {/* My Social Media App */}
        </Link>
        <div className='flex items-center mb-4'>
          <img
            src={userData.profilePic ? userData.profilePic : '/default-profile-pic.png'}
            alt='Profile'
            className='w-12 h-12 rounded-full'
          />
          <div className='ml-2'>
            <p>{userData.userName}</p>
            <p className='text-gray-500 text-sm'>View Profile</p>
          </div>
        </div>
        <nav>
          <Link
            to='/'
            className='block py-2 px-4 rounded hover:bg-[#e9e9ae] font-bold transition duration-200'
          >
            Home
          </Link>
          <Link
            // onClick={()=>navigate(`/profile/${userData._id}`)}
            to={`/profile/${userData._id}`}
            className='block py-2 px-4 rounded hover:bg-[#e9e9ae] transition duration-200'
          >
            Profile
          </Link>
          <Link
            to='/notifications'
            className='block py-2 px-4 rounded hover:bg-[#e9e9ae] transition duration-200'
          >
            Notifications
          </Link>
          <Link
            to='/messages'
            className='block py-2 px-4 rounded hover:bg-[#e9e9ae] transition duration-200'
          >
            Messages
          </Link>
        </nav>
      </div>
      <div className='p-4 border-t border-gray-700'>
        <Link
          to='/settings'
          className=' hover:text-gray-400 transition duration-200'
        >
          Settings
        </Link>
      </div>
    </div>
  )
}

export default Leftbar







// import React from 'react'
// import { useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom'
// const Leftbar = () => {
//   // Get the user data from the Redux store
//   const userData = useSelector((state) => state.user);
//   const navigate = useNavigate()

//   return (
//     <div className='hidden md:block rounded-2xl p-5'>
//       <div className=' left-0 bg-white sticky top-32'>
//         <div className='p-4'>
//           <Link to='/' className='text-xl font-medium block mb-4'>
//             {/* My Social Media App */}
//           </Link>
//           <div className='flex items-center mb-4'>
//             <img
//               src={userData.profilePic ? userData.profilePic : '/default-profile-pic.png'}
//               alt='Profile'
//               className='w-12 h-12 rounded-full'
//             />
//             <div className='ml-2'>
//               <p>{userData.userName}</p>
//               <p className='text-gray-500 text-sm'>View Profile</p>
//             </div>
//           </div>
//           <nav>
//             <Link
//               to='/'
//               className='block py-2 px-4 rounded hover:bg-gray-700 hover:text-white transition duration-200'
//             >
//               Home
//             </Link>
//             <Link
//             // onClick={()=>navigate(`/profile/${userData._id}`)}
//               to={`/profile/${userData._id}`}
//               className='block py-2 px-4 rounded hover:bg-gray-700 hover:text-white transition duration-200'
//             >
//               Profile
//             </Link>
//             <Link
//               to='/notifications'
//               className='block py-2 px-4 rounded hover:bg-gray-700 hover:text-white transition duration-200'
//             >
//               Notifications
//             </Link>
//             <Link
//               to='/messages'
//               className='block py-2 px-4 rounded hover:bg-gray-700 hover:text-white  transition duration-200'
//             >
//               Messages
//             </Link>
//           </nav>
//         </div>
//         <div className='p-4 border-t border-gray-700'>
//           <Link
//             to='/settings'
//             className=' hover:text-gray-400 transition duration-200'
//           >
//             Settings
//           </Link>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Leftbar