import React, { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Contact from '../../Components/Contact/Contact'
import ChatContainer from '../../Components/ChatContainer/ChatContainer'
import Leftbar from '../../Components/LeftpostContainer/Leftbar'
import { useSelector } from 'react-redux'
import { conversations } from '../../utils/constants'
import axios from '../../utils/axios';

const Chat = () => {

    const user = useSelector((state) => state.user)
    const token = useSelector((state) => state.token)
    const [conversation, setConversation] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    console.log("currentChat");
    console.log(currentChat);
    console.log("currentChat");
    useEffect(() => {
        const getConversations = async () => {
            try {
                console.log("gggggg");
                const response = await axios.get(`${conversations}/${user._id}`, {
                    'Authorization': `barear ${token}`
                })
                console.log("conversation ====response.data");
                console.log(response.data);
                setConversation(response.data)
            } catch (err) {
                console.log(err)
            }
        }
        getConversations();
    }, [user?._id])

    useEffect(() => {
        
        const getMessages = async () => {
            const response = await axios.get(`/api/messages/${currentChat?._id}`)
            setMessages(response.data)
        }
        currentChat && getMessages();
    }, [currentChat])
    return (
        <div>
            <Navbar />
            <div className='bg-[#efefef] flex flex-wrap'>
                <div className=' hidden md:block w-1/4 p-2 relative '>
                    <Leftbar />
                </div>
                <div className='w-1/4 p-2'>
                    <Contact conversation={conversation} currentUser={user} setCurrentChat={setCurrentChat} />
                </div>
                <div className='w-3/4 md:w-2/4'>
                    {currentChat ?
                        <ChatContainer messages={messages} setMessages={setMessages} currentChat={currentChat} /> :
                        <div>open a chat to start a conversation</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Chat