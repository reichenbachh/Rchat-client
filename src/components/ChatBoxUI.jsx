import React, { useState, useEffect } from 'react';
import ChatBox, { ChatFrame } from 'react-chat-plugin';
import BeforeUnloadComponent from 'react-beforeunload-component';
import logo from '../assets/logo.png';

const ChatBoxUI = ({
  sendMessage,
  fetchMessages,
  messages,
  readMessage,
  leaveRoom,
  isConnected,
}) => {
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

  //convert message object into an array
  let messagesArray = [];
  for (let msg in messages) {
    console.log(messages[msg].type);
    if (messages[msg].type === 'notification') {
      messagesArray.push({
        text: messages[msg].text,
        timestamp: messages[msg].timestamp,
        type: messages[msg].type,
      });
    } else {
      messagesArray.push({
        author: {
          username: messages[msg].userName,
          id: localStorage.getItem('user') === messages[msg].userName ? 1 : 2,
          avatarUrl: null,
        },
        text: messages[msg].message,
        type: 'text',
        timestamp: messages[msg].timestamp,
      });
    }
  }
  console.log(messagesArray);
  // messages[room]

  const returnConnectionStatus = (isConnected) => {
    if (isConnected === null) {
      return 'reconnecting';
    }
    if (isConnected) {
      return 'connected ';
    }
    if (!isConnected) {
      return 'disconnected';
    }
  };

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
        roomID: localStorage.getItem('roomID'),
        timestamp: Date.now(),
        type: 'text',
      };
      sendMessage(messageObject);
    }
  };
  return (
    <BeforeUnloadComponent
      blockRoute={true}
      alertMessage={'You will be disconnected when tab closes or reloads'}
    >
      <div className='chat-wrapper'>
        <div className='chat-header'>
          <div className='logo'>
            <img src={logo} alt='' srcSet='' />
          </div>
          <div className='room-name'>
            <h1>{localStorage.getItem('room')}</h1>

            <div
              className={`connection-status ${returnConnectionStatus(
                isConnected
              )}`}
            >
              <i className='far fa-dot-circle'></i>
              <p>{returnConnectionStatus(isConnected)}</p>
            </div>
          </div>
          <div className='options'>
            <button
              onClick={() => {
                leaveRoom(
                  localStorage.getItem('roomID'),
                  localStorage.getItem('userID')
                );
                localStorage.removeItem('user');
                localStorage.removeItem('room');
                window.location.reload();
              }}
            >
              Leave Room
            </button>
            <button onClick={() => {}}>Destroy Room</button>
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
