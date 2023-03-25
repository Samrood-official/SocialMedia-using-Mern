import React from 'react'
import FriendInfo from '../smallComponants/FriendInfo'

const Rightbar = () => {
  return (
    <React.Fragment>
      <div className='sticky right-0 top-36 bottom-0 z-10'>
        <div className="p-2 bg-white ">
          <h1 className="text-lg font-bold mb-4">Online Friends</h1>
          <ul className="divide-y divide-gray-300">
            <li className="py-2">
            <FriendInfo  />
            </li>
            <li className="py-2">
            <FriendInfo  />
            </li>
            <li className="py-2">
            <FriendInfo  />
            </li>
          </ul>
        </div>
        <div className="p-4 mt-10 bg-white ">
          <h1 className="text-lg font-bold mb-4">Suggestions</h1>
          <ul className="divide-y divide-gray-300">
            <li className="py-4">
            <FriendInfo  />
            </li>
            <li className="py-4">
            <FriendInfo  />
            </li>
            <li className="py-4">
            <FriendInfo  />
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>

  )
}

export default Rightbar



// import React from 'react'

// const Rightbar = () => {
//   return (
//     <div className="hidden md:block h-screen pt-10 pr-3 ">
//       <div className="p-4 bg-white  rounded-md">
//         <h1 className="text-lg font-bold mb-4">Online Friends</h1>
//         <ul className="divide-y divide-gray-300">
//           <li className="py-4">
//             <a href="#" className="text-gray-700 hover:text-black font-medium">user 1</a>
//           </li>
//           <li className="py-4">
//             <a href="#" className="text-gray-700 hover:text-black font-medium">user 2</a>
//           </li>
//           <li className="py-4">
//             <a href="#" className="text-gray-700 hover:text-black font-medium">user 3</a>
//           </li>
//         </ul>
//       </div>
//       <div className="p-4 mt-10 bg-white">
//         <h1 className="text-lg font-bold mb-4">Suggestions</h1>
//         <ul className="divide-y divide-gray-300">
//           <li className="py-4">
//             <a href="#" className="text-gray-700 hover:text-black font-medium">User 1</a>
//           </li>
//           <li className="py-4">
//             <a href="#" className="text-gray-700 hover:text-black font-medium">User 2</a>
//           </li>
//           <li className="py-4">
//             <a href="#" className="text-gray-700 hover:text-black font-medium">User 3</a>
//           </li>
//         </ul>
//       </div>
//     </div>
//     //  <div className=" h-96 bg-white mt-6 rounded-2xl mr-6 shadow md:sticky top-36">
//     //     <div className="overflow-y-auto">
//     //       <div className="flex justify-between py-3 px-4 border-b border-gray-200">
//     //         <p className="font-semibold text-gray-700">Notifications</p>
//     //         <p className="text-gray-500">See all</p>
//     //       </div>

//     //       <div className="flex items-center py-4 px-4 hover:bg-gray-100 cursor-pointer">
//     //         <img className="w-12 h-12 rounded-full mr-3" src="https://media.istockphoto.com/id/1351147752/photo/studio-portrait-of-attractive-20-year-old-bearded-man.jpg?b=1&s=170667a&w=0&k=20&c=N-Uwgbn8qhGypoXFB6keEEC3mW0qhNynAqBqd8oNJw0=" alt="Profile"/>
//     //         <div>
//     //           <p className="text-gray-700"><span className="font-semibold">Madan</span> liked your post</p>
//     //           <p className="text-xs text-gray-500">2 hours ago</p>
//     //         </div>
//     //       </div>
//     //       <div className="flex items-center py-4 px-4 hover:bg-gray-100 cursor-pointer">
//     //         <img className="w-12 h-12 rounded-full mr-3" src="https://media.istockphoto.com/id/1351147752/photo/studio-portrait-of-attractive-20-year-old-bearded-man.jpg?b=1&s=170667a&w=0&k=20&c=N-Uwgbn8qhGypoXFB6keEEC3mW0qhNynAqBqd8oNJw0=" alt="Profile"/>
//     //         <div>
//     //           <p className="text-gray-700"><span className="font-semibold">Madan</span> liked your post</p>
//     //           <p className="text-xs text-gray-500">2 hours ago</p>
//     //         </div>
//     //       </div>
//     //       <div className="flex items-center py-4 px-4 hover:bg-gray-100 cursor-pointer">
//     //         <img className="w-12 h-12 rounded-full mr-3" src="https://media.istockphoto.com/id/1351147752/photo/studio-portrait-of-attractive-20-year-old-bearded-man.jpg?b=1&s=170667a&w=0&k=20&c=N-Uwgbn8qhGypoXFB6keEEC3mW0qhNynAqBqd8oNJw0=" alt="Profile"/>
//     //         <div>
//     //           <p className="text-gray-700"><span className="font-semibold">Madan</span> liked your post</p>
//     //           <p className="text-xs text-gray-500">2 hours ago</p>
//     //         </div>
//     //       </div>
//     //       <div className="flex items-center py-4 px-4 hover:bg-gray-100 cursor-pointer">
//     //         <img className="w-12 h-12 rounded-full mr-3" src="https://media.istockphoto.com/id/1351147752/photo/studio-portrait-of-attractive-20-year-old-bearded-man.jpg?b=1&s=170667a&w=0&k=20&c=N-Uwgbn8qhGypoXFB6keEEC3mW0qhNynAqBqd8oNJw0=" alt="Profile"/>
//     //         <div>
//     //           <p className="text-gray-700"><span className="font-semibold">Madan</span> liked your post</p>
//     //           <p className="text-xs text-gray-500">2 hours ago</p>
//     //         </div>
//     //       </div>
//     //       {/* Add more notifications as needed */}
//     //     </div>
//     //   </div>
//   )
// }

// export default Rightbar