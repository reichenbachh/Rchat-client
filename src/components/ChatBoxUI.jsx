import React from 'react';
import { ChatFeed, Message } from 'react-chat-ui';

const ChatBoxUI = () => {
  let messageState = {
    messages: [
      new Message({
        id: 1,
        message: "I'm the recipient! (The person you're talking to)",
      }),
      new Message({ id: 0, message: "I'm you -- the blue bubble!" }),
    ],
  }; // Gray bubble  ],;
  return (
    <div className='chat-box-container'>
      <div className='chat-box'>
        <div>
          <ChatFeed
            messages={messageState.messages} // Array: list of message objects
            isTyping={true} // Boolean: is the recipient typing
            hasInputField={false} // Boolean: use our input, or use your own
            showSenderName // show the name of the user who sent the message
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
          <input type='text' placeholder='enter message' />
          <i className='fas fa-paper-plane'></i>
        </div>
      </div>
    </div>
  );
};

export default ChatBoxUI;
