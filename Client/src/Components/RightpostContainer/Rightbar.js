import React, { useEffect, useState } from 'react'
import FriendInfo from '../smallComponants/FriendInfo'
import { useDispatch, useSelector } from 'react-redux'
import { allUsers } from '../../utils/constants'
import axios from '../../utils/axios'
import { setAllUsers } from '../../state/userReducer'

const Rightbar = () => {
  const [render, setRender]= useState(false)
  const token = useSelector((state) => state.token)
  const users = useSelector((state)=>state.users)
  const dispatch = useDispatch()
  const fetchUsers = () => {
    axios.get(allUsers, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response)=>{
      dispatch(setAllUsers({users:response.data.data}))
    }).catch((err)=>{
      console.log(err); 
    })
  }
  useEffect(() => {
    fetchUsers()
  },[])
  return (
    <>
      <div className='sticky border rounded-md border-zinc-400 right-0 top-28 bottom-0 z-10 '>
        <div className="p-2 bg-white ">
          <h1 className="text-md font-bold mb-4">Suggestions</h1>
          <ul className="divide-y divide-gray-300">
            {users && users?.map((user)=>(
            <li className="py-2" key={user._id}>
              <FriendInfo name={user.name} key={user._id}  id={user._id} userName={user.userName} profilePic={user.profilePic} />
            </li>
            ))}
          </ul>
        </div>
      </div>
    </>

  )
}

export default Rightbar