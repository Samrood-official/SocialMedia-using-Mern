import { useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Leftbar from '../../Components/LeftpostContainer/Leftbar'
import { getNotifications } from '../../state/apiCalls'
import Notificationlist from './Notificationlist'
const Notification = () => {
    const token = useSelector((state) => state.token)
    const [notification, setNotification] = useState([])

    const fetchNotification = async () => {
        const response = await getNotifications(token)
        console.log(response);
        setNotification(response)
    }
    useEffect(() => {
        fetchNotification()
    },[])
    return (
        <>
            <Navbar />
            <div className='bg-[#efefef] flex flex-wrap' >
                <div className=' hidden md:block w-1/4 p-2 relative '>
                    <Leftbar />
                </div>
                <div className='w-full md:w-3/4 p-2 mt-2 '>
                    <div className="bg-gray-100 rounded-md shadow-md max-w-lg ">
                        <div className="p-4">
                            <p>Notifications</p>
                        </div>
                        <div className='h-72 overflow-scroll overflow scrollbar-hide'> 

                        {notification.length !== 0 ? notification.map(({type, user, friend, content, postId,createdAt})=>(
                        <Notificationlist type={type} createdAt={createdAt} user={user} friend={friend} content={content} post={postId}/>
                        )):<div className='p-28 text-2xl font-semibold'>No Notifications</div>
                        }
                        </div>  
                    </div>
                </div>

            </div>
        </>
    )
}

export default Notification