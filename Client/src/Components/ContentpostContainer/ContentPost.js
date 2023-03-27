import axios from '../../utils/axios'
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { ImageIcon } from '../../icons/icons'
import { addPost } from '../../utils/constants'
const ContentPost = () => {
  const userData = useSelector((state) => state.user)
  const desc = useRef()
  const [file, setFile] = useState()
  const handleImageChange = (e) => {
    setFile(e.target.files[0])
  }
  const handlePost = async (e) => {
    e.preventDefault()
    var formData = new FormData()
    formData.append("file", file)
    formData.append("userId", userData._id)
    formData.append("desc", desc.current.value)
    try {
      await axios.post(addPost, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      window.location.reload()
    } catch (err) {
      
    }
  }
  return (
    <div className='bg-white w-full rounded-md'>
      <form onSubmit={handlePost}>
        <div className='flex p-4 '>
          <img className='w-14 rounded-full h-14' src={userData.profilePic} alt='' />
          <div className='pt-3'>
            <input ref={desc} className='pl-4 w-full h-10 focus:outline-none' type='text' placeholder='type....' />
          </div>
        </div>
        <div className='flex justify-between p-5'>
          <div className='flex'>
            <div className='flex px-2 text-slate-600'>
              <label htmlFor='file' className='cursor-pointer'>
                <ImageIcon />
                <input type='file' accept='.jpg,.jpeg,.png' onChange={handleImageChange} name='file' id='file' hidden />
              </label>
              <span className='px-1'>Photo</span>
            </div>

          </div>
          <div className='mr-3'>
            <button type='submit' className=' text-black border text-lg border-gray-700 rounded-md w-20'>Post</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ContentPost