import React from 'react'
import Leftbar from '../../Components/LeftpostContainer/Leftbar'
import MainPost from '../../Components/MainpostContainer/MainPost'
import Navbar from '../../Components/Navbar/Navbar'
import Rightbar from '../../Components/RightpostContainer/Rightbar'
const Home = () => {
  return (
    <>
      <Navbar />
      <div className='bg-[#efefef] flex flex-wrap' >
        <div className=' hidden md:block w-1/4 p-2 relative '>
          <Leftbar />
        </div>
        <div className='w-full md:w-2/4 p-2 mt-2 '>
          <MainPost />
        </div>
        <div className="hidden md:block w-1/4 p-2 relative ">
          <Rightbar />
        </div>
      </div>
    </>
  )
}

export default Home



// import React from 'react'
// import Leftbar from '../../Components/LeftpostContainer/Leftbar'
// import MainPost from '../../Components/MainpostContainer/MainPost'
// import Navbar from '../../Components/Navbar/Navbar'
// import Rightbar from '../../Components/RightpostContainer/Rightbar'
// const Home = () => {
//   return (
//     <>
      
//         <Navbar />
//         <div className='bg-[#efefc8] grid md:grid-cols-4 gap-3' >
//           <Leftbar />
//           <MainPost />
//           <Rightbar />
//         </div>
      
//     </>
//   )
// }

// export default Home