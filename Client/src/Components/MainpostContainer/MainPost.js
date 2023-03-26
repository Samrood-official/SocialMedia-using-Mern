import React from 'react'
import ContentPost from '../ContentpostContainer/ContentPost'
import Feed from '../PostContainer/Feed'

const MainPost = () => {
  return (
    <>
      <ContentPost />
      <Feed />
      <Feed />
    </>
  )
}
export default MainPost


// import React from 'react'
// import ContentPost from '../ContentpostContainer/ContentPost'
// import Post from '../PostContainer/Post'

// const MainPost = () => {
//   return (
//     <div className='pt-10 col-span-2'>
//       <ContentPost />
//       <Post />
//       <Post />
//     </div>
//   )
// }
// export default MainPost