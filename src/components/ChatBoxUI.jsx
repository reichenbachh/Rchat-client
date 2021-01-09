import React, { useState, useEffect } from 'react';
import ChatBox, { ChatFrame } from 'react-chat-plugin';
import BeforeUnloadComponent from 'react-beforeunload-component';
import logo from '../assets/logo.png';

const ChatBoxUI = ({ sendMessage, fetchMessages, messages, readMessage }) => {
  useEffect(() => {
    fetchMessages();
  }, []);
  useEffect(() => {
    readMessage();
  });
  const [createInput, setCreateInput] = useState('');
  const onChange = (e) => {
    setCreateInput(e.target.value);
  };

  const handleSendMessage = (e) => {
    if (createInput.length === 0) {
      return alert('Please enter a message');
    } else {
      const userName = localStorage.getItem('user');
      const roomName = localStorage.getItem('room');
      const message = createInput;
      const messageObject = {
        userName,
        roomName,
        message,
      };
      sendMessage(messageObject, localStorage.getItem('roomID'));
      setCreateInput('');
    }
  };
  console.log(messages);

  //convert message object into an array
  let messagesArray = [
    {
      text: 'user2 has joined the conversation',
      timestamp: 1578366389250,
      type: 'notification',
    },
  ];
  for (let msg in messages) {
    messagesArray.push({
      author: {
        username: messages[msg].userName,
        id: localStorage.getItem('user') === messages[msg].userName ? 1 : 2,
        avatarUrl: null,
      },
      text: messages[msg].message,
      type: 'text',
      timestamp: 1578366425250,
    });
  }
  console.log(messagesArray);

  // messages[room]
  let messageData = [
    {
      text: 'user2 has joined the conversation',
      timestamp: 1578366389250,
      type: 'notification',
    },
    {
      author: { username: 'user2', id: 2, avatarUrl: null },
      text: 'Show two buttons',
      type: 'text',
      timestamp: 1578366425250,
    },
  ];
  const handleOnSendMessage = (message) => {
    if (message.length === 0) {
      return alert('Please enter a message');
    } else {
      const userName = localStorage.getItem('user');
      const roomName = localStorage.getItem('room');
      const messageObject = {
        userName,
        roomName,
        message,
      };
      sendMessage(messageObject, localStorage.getItem('roomID'));
    }
  };
  let messagesObject = [];
  return (
    <BeforeUnloadComponent
      blockRoute={true}
      alertMessage={'You will be disconnected when tab closes or reloads'}
    >
      <div className='chat-wrapper'>
        <div className='chat-header'>
          <div className='logo'>
            <img src={logo} alt='' srcset='' />
          </div>
          <div className='room-name'>
            <h1>{localStorage.getItem('room')}</h1>
          </div>
          <div className='options'>
            <button
              onClick={() => {
                localStorage.removeItem('user');
                localStorage.removeItem('room');
                window.location.reload();
              }}
            >
              Leave Room
            </button>
            <button>Destroy Room</button>
          </div>
        </div>
        <div className='chat-holder'>
          <ChatBox
            messages={messagesArray}
            userId={1}
            onSendMessage={handleOnSendMessage}
            width={'900px'}
            height={'80vh'}
          />
        </div>
      </div>
    </BeforeUnloadComponent>
  );
};

export default ChatBoxUI;
