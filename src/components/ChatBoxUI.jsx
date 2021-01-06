import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import { ChatFeed, Message } from 'react-chat-ui';
import BeforeUnloadComponent from 'react-beforeunload-component';

const ChatBoxUI = ({ sendMessage, fetchMessages, messages }) => {
  useEffect(() => {
    fetchMessages();
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

  //convert message object into an array
  let messagesArray = [];
  for (let msg in messages) {
    messagesArray.push(
      new Message({
        id: messages[msg].userName === localStorage.getItem('user') ? 0 : 1,
        message: messages[msg].message,
        senderName: messages[msg].userName,
      })
    );
  }
  console.log(messagesArray);
  // messages[room]
  let messagesObject = [];
  return (
    <BeforeUnloadComponent
      blockRoute={true}
      alertMessage={'You will be disconnected when tab closes or reloads'}
    >
      <div className='chat-box-container'>
        <div className='chat-header'>
          <div className='logo'>
            <h1> {localStorage.getItem('room')}</h1>
          </div>
          <div className='chat-btn'>
            <div>
              <button
                onClick={() => {
                  localStorage.removeItem('user');
                  localStorage.removeItem('room');
                  window.location.reload();
                }}
              >
                Destroy Room
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  localStorage.removeItem('user');
                  localStorage.removeItem('room');
                  window.location.reload();
                }}
              >
                Leave Room
              </button>
            </div>
          </div>
        </div>
        <div className='chat-box'>
          <div>
            <ChatFeed
              messages={messagesArray} // Array: list of message objects
              // isTyping={true} // Boolean: is the recipient typing
              hasInputField={false} // Boolean: use our input, or use your own
              showSenderName={true} // show the name of the user who sent the message
              bubblesCentered={false} //Boolean should the bubbles be centered in the feed?
              // JSON: Custom bubble styles
              bubbleStyles={{
                text: {
                  fontSize: 12,
                },
                chatbubble: {
                  borderRadius: 70,
                  padding: 18,
                },
              }}
            />
          </div>

          <div className='search_box'>
            <input
              value={createInput}
              type='text'
              placeholder='enter message'
              onChange={onChange}
            />
            <i
              className='fas fa-paper-plane'
              onClick={(e) => {
                handleSendMessage(e);
              }}
            ></i>
          </div>
        </div>
      </div>
    </BeforeUnloadComponent>
  );
};

export default ChatBoxUI;
