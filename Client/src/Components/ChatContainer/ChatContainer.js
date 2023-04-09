import React, { useEffect, useRef, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import ChatBox from '../ChatBox/ChatBox';
import { useSelector } from 'react-redux';
import axios from '../../utils/axios';
import io from 'socket.io-client';

const socket = io.connect("ws://localhost:3001")
const ChatContainer = ({ messages, currentChat, setMessages }) => {
  const user = useSelector((state) => state.user)
  const token = useSelector((state) => state.token)
  const [newMessage, setNewMessage] = useState("")
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const scrollRef = useRef()
  useEffect(() => {
    socket?.emit("addUser", user._id)
  }, [user])
  useEffect(() => {
    socket?.on('getMessage', (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now()
      })
    })
  }, [])

  useEffect(() => {
    arrivalMessage && currentChat.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage])
  }, [arrivalMessage, currentChat])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const message = {
      senderId: user._id,
      text: newMessage,
      chatId: currentChat._id
    }
    const recieverId = currentChat.members.find(member => member !== user._id)
    socket?.emit('sendMessage', ({
      senderId: user._id,
      text: newMessage,
      recieverId: recieverId
    }))

    try {
      const response = await axios.post('/api/messages', { message }, {
        headers: {
          "Authorization": `Barear ${token}`
        }
      })
      setMessages([...messages, response.data])
      setNewMessage("")
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className='flex flex-col h-full '>
      {/* Chat header */}
      <div className=' p-2'>
        <div className='flex border border-black bg-slate-200 p-2 items-center'>
          <div className='border border-[#3d3f50] w-10 h-10 rounded-full'>
            <FaUser className='w-full h-full rounded-full' />
          </div>
          <div className='pl-2'>
            <h3 className='text-gray-500 text-sm text-center font-medium'>Name</h3>
            <div className='text-sm font-medium'>@userName</div>
          </div>
        </div>
      </div>
      {/* Chat messages */}
      <div className='h-80 overflow-y-scroll px-2 py-1'>
        {messages.map((m, index) => (
          <div ref={scrollRef} key={index} >
            <ChatBox message={m} own={m.senderId === user._id} />
          </div>
        ))}
      </div>
      {/* Chat input */}
      <div className='border-2 border-gray-300 p-2'>
        <div className='flex items-center'>
          <div className='border border-[#3d3f50] w-10 h-10 rounded-full'>
            <FaUser className='w-full h-full rounded-full' />
          </div>
          <input onChange={(e) => setNewMessage(e.target.value)} value={newMessage} className='flex-1 ml-2 h-10 rounded-2xl px-4 focus:outline-none border border-gray-400' type="text" placeholder='Send a message' />
          <div className='ml-2'>
            <button onClick={handleSubmit} className='bg-gray-600 rounded-full px-4 py-2 text-white hover:bg-black focus:outline-none'>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
