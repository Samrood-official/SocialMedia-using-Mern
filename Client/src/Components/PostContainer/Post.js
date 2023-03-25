import React from 'react'
import { useState } from 'react'
import { MenuIcon } from '../../icons/icons'
const Post = () => {
    const [like, setLike] = useState(false)
    const [count, setCount] = useState(10)
    const [comments, setComment] = useState([])
    const [commentWriting, setcommentWriting] = useState('')
    const [showComment, setShowComment] = useState(false)
    const handleLike = () => {
        if (like === true) {
            setLike(false)
            setCount(count - 1)
        } else {
            setLike(true)
            setCount(count + 1)
        }
    }
    const AddComment = () => {
        const comment = {
            "id": "4ejdifudh45asde",
            "userName": "suman",
            "title": `${commentWriting}`
        }
        setComment(comments.concat(comment))
    }
    const HandleComment = () => {
        AddComment();
    }
    const HandleShowComment = () => {
        if (showComment === true) {
            setShowComment(false)
        } else {
            setShowComment(true)
        }
    }
    return (
        <div className='pt-4'>
            <div className='bg-white rounded-2xl'>
                <div className=' p-4'>
                    <div className='justify-between flex'>
                        <div className=' flex '>
                            <img className='w-10 rounded-full h-10' src='https://1.bp.blogspot.com/-kK7Fxm7U9o0/YN0bSIwSLvI/AAAAAAAACFk/aF4EI7XU_ashruTzTIpifBfNzb4thUivACLcBGAsYHQ/s1280/222.jpg' alt='' />
                            <div>
                                <p className='pl-4'>Suman</p>
                                <p className='text-sm'>following by suman</p>
                            </div>
                        </div>
                        <div>
                           <MenuIcon />
                        </div>
                    </div>

                    <p className='bg-white p-5 '>
                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
                        classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a
                    </p>
                    <div className='flex justify-center '>
                        <img className='rounded-md' src='https://media.istockphoto.com/id/1317323736/photo/a-view-up-into-the-trees-direction-sky.jpg?b=1&s=170667a&w=0&k=20&c=VqVR2PMyaneOTn8f6wgEgM2V-zsHCzFMk6Wnm_kAf_k=' alt='' />
                    </div>
                </div>

                <div className='flex'>
                    <div className='flex'>
                        <div className='flex p-4'>
                            <div onClick={handleLike}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={like ? "red" : "currentColor"} className="w-6 h-6 ">
                                    <path strokeLinecap="round" fill={like ? "red" : ""} strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>


                            </div>
                            <p>{count} likes</p>
                        </div>
                        <div className='flex p-4'>
                            <div onClick={HandleShowComment}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                </svg>
                            </div>
                            <p>10k comments</p>
                        </div>
                    </div>
                    <div className='ml-auto mr-5 pt-4'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                        </svg>
                    </div>
                </div>

                {showComment ?
                    <div>
                        <div className='flex p-5 justify-between'>
                            <div className='pl-4 flex'>
                                <img className='w-10 rounded-full h-10' src='https://media.istockphoto.com/id/1317323736/photo/a-view-up-into-the-trees-direction-sky.jpg?b=1&s=170667a&w=0&k=20&c=VqVR2PMyaneOTn8f6wgEgM2V-zsHCzFMk6Wnm_kAf_k=' alt='' />
                                <div className='pl-4'>
                                    <input className='w-72 h-12 focus:outline-none' type="text" onChange={(e) => setcommentWriting(e.target.value)} placeholder='comment' />
                                </div>
                            </div>
                            {/* comment sending icon */}
                            <div className='p-2' onClick={HandleComment}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                </svg>
                            </div>
                        </div>
                        {comments.map((item) => (

                            <div className='flex p-5 gap-2'>
                                <img className='w-10 rounded-full h-10' src='https://media.istockphoto.com/id/1317323736/photo/a-view-up-into-the-trees-direction-sky.jpg?b=1&s=170667a&w=0&k=20&c=VqVR2PMyaneOTn8f6wgEgM2V-zsHCzFMk6Wnm_kAf_k=' alt='' />
                                <div>
                                    <p className='text-sm'>{item.userName}</p>
                                    <p>{item.title}</p>
                                </div>
                            </div>
                        ))}
                    </div> : ""
                }
            </div>
        </div>
    )
}

export default Post


// import React from 'react'
// import { useState } from 'react'
// const Post = () => {
//     const [like, setLike] = useState(false)
//     const [count, setCount] = useState(10)
//     const [comments, setComment] = useState([])
//     const [commentWriting, setcommentWriting] = useState('')
//     const [showComment, setShowComment] = useState(false)
//     const handleLike = () => {
//         if (like === true) {
//             setLike(false)
//             setCount(count - 1)
//         } else {
//             setLike(true)
//             setCount(count + 1)
//         }
//     }
//     const AddComment = () => {
//         const comment = {
//             "id": "4ejdifudh45asde",
//             "userName": "suman",
//             "title": `${commentWriting}`
//         }
//         setComment(comments.concat(comment))
//     }
//     const HandleComment = () => {
//         AddComment();
//     }
//     const HandleShowComment = () => {
//         if (showComment === true) {
//             setShowComment(false)
//         } else {
//             setShowComment(true)
//         }
//     }
//     return (
//         <div className='pt-4'>
//             <div className='bg-white rounded-2xl'>
//                 <div className=' p-4'>
//                     <div className='justify-between flex'>
//                         <div className=' flex '>
//                             <img className='w-10 rounded-full h-10' src='https://1.bp.blogspot.com/-kK7Fxm7U9o0/YN0bSIwSLvI/AAAAAAAACFk/aF4EI7XU_ashruTzTIpifBfNzb4thUivACLcBGAsYHQ/s1280/222.jpg' alt='' />
//                             <div>
//                                 <p className='pl-4'>Suman</p>
//                                 <p className='text-sm'>following by suman</p>
//                             </div>
//                         </div>
//                         <div>
//                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//                                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
//                             </svg>
//                         </div>
//                     </div>

//                     <p className='bg-white p-5 '>
//                         Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
//                         classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a
//                     </p>
//                     <div className='flex justify-center '>
//                         <img className='rounded-md' src='https://media.istockphoto.com/id/1317323736/photo/a-view-up-into-the-trees-direction-sky.jpg?b=1&s=170667a&w=0&k=20&c=VqVR2PMyaneOTn8f6wgEgM2V-zsHCzFMk6Wnm_kAf_k=' alt='' />
//                     </div>
//                 </div>

//                 <div className='flex'>
//                     <div className='flex'>
//                         <div className='flex p-4'>
//                             <div onClick={handleLike}>
//                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={like ? "red" : "currentColor"} className="w-6 h-6 ">
//                                     <path strokeLinecap="round" fill={like ? "red" : ""} strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
//                                 </svg>


//                             </div>
//                             <p>{count} likes</p>
//                         </div>
//                         <div className='flex p-4'>
//                             <div onClick={HandleShowComment}>
//                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//                                     <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
//                                 </svg>
//                             </div>
//                             <p>10k comments</p>
//                         </div>
//                     </div>
//                     <div className='ml-auto mr-5 pt-4'>
//                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//                             <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
//                         </svg>
//                     </div>
//                 </div>

//                 {showComment ?
//                     <div>
//                         <div className='flex p-5 justify-between'>
//                             <div className='pl-4 flex'>
//                                 <img className='w-10 rounded-full h-10' src='https://media.istockphoto.com/id/1317323736/photo/a-view-up-into-the-trees-direction-sky.jpg?b=1&s=170667a&w=0&k=20&c=VqVR2PMyaneOTn8f6wgEgM2V-zsHCzFMk6Wnm_kAf_k=' alt='' />
//                                 <div className='pl-4'>
//                                     <input className='w-72 h-12 focus:outline-none' type="text" onChange={(e) => setcommentWriting(e.target.value)} placeholder='comment' />
//                                 </div>
//                             </div>
//                             {/* comment sending icon */}
//                             <div className='p-2' onClick={HandleComment}>
//                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
//                                     <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
//                                 </svg>
//                             </div>
//                         </div>
//                         {comments.map((item) => (

//                             <div className='flex p-5 gap-2'>
//                                 <img className='w-10 rounded-full h-10' src='https://media.istockphoto.com/id/1317323736/photo/a-view-up-into-the-trees-direction-sky.jpg?b=1&s=170667a&w=0&k=20&c=VqVR2PMyaneOTn8f6wgEgM2V-zsHCzFMk6Wnm_kAf_k=' alt='' />
//                                 <div>
//                                     <p className='text-sm'>{item.userName}</p>
//                                     <p>{item.title}</p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div> : ""
//                 }
//             </div>
//         </div>
//     )
// }

// export default Post