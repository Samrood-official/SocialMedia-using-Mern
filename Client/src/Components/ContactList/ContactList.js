import React, { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import axios from '../../utils/axios';
import { useSelector } from 'react-redux';

const ContactList = ({ conversation, currentUser }) => {
  const token = useSelector((state) => state.token)
  const [user, setUser] = useState(null)
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id)
    console.log("friendId");
    console.log(friendId);
    const getUser = async () => {
      const response = await axios.get(`/api/get-user/${friendId}`,{
        headers:{
          "Authorization": `Barear ${token}`
        }
      })
      setUser(response.data)
    }
    getUser()
  }, [currentUser, conversation])
  return (
    <div className="flex items-center space-x-4 p-2 my-1 bg-gray-200 rounded-md">
      {user?.profilePic ?
        <img className='w-10 h-10 rounded-full' src={user?.profilePic} alt='profilepic' /> :
        <div className='border border-[#3d3f50] w-10 h-10 rounded-full'>
          <FaUser className='w-full h-full rounded-full' />
        </div>
      }
      <div>
        <h3 className="text-lg font-medium text-gray-700">{user?.name}</h3>
        <p className="text-sm text-gray-500">{user?.userName}</p>
      </div>
    </div>
  )
}

export default ContactList