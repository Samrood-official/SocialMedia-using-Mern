import React, { useEffect, useState } from 'react';
import { conversations } from '../../utils/constants';
import { useSelector } from 'react-redux';
import ContactList from '../ContactList/ContactList';
const Contact = ({ conversation, currentUser, setCurrentChat }) => {
  
  return (
    <div className="flex flex-col  bg-white rounded-lg shadow-md p-4">
      <div className="mb-4">
        <input
          className="w-full h-12 px-4 rounded-md border border-zinc-400 "
          type="text"
          placeholder="Search for users"
        />
      </div>
      {conversation.map((item,index) => (
        <div onClick={()=>setCurrentChat(item)} key={index}>
          <ContactList  conversation={item} currentUser={currentUser} />
        </div>
      ))}
    </div>
  );
};

export default Contact;
