// ChatList.js
import React from 'react';

const ChatList = ({ messages, currentUser }) => {
  return (
    <div className="chat-list">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`message-container ${
            message.username === currentUser ? 'current-user' : 'other-user'
          } mb-3 p-2`}
          style={{
            width: '60%',
            marginLeft: message.username === currentUser ? '40%' : '0',
            borderRadius: '8px', // Add rounded corners
            backgroundColor:
              message.username === currentUser ? '#5DB075' : '#F6F6F6',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div className="message">
            <div className="username" style={{ fontWeight: 'bold' }}>
              {message.username}
            </div>
            <div className="text">{message.message}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
