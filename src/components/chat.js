// Chat.js
import React, { useState, useEffect } from 'react';
import ChatList from '../components/chat-list';
import SendMessageForm from '../components/chat-send-message';

const Chat = ({ props, onExitRoom }) => {
  const socket = props.socket;
  const username = props.username;
  const roomId = props.roomId;
  const [messages, setMessages] = useState([]);
  
  const handleIncomingMessage = (receivedMessage) => {
    console.log('Received messages:', receivedMessage);
    // Process the received messages as needed
    const newMessage = [receivedMessage];
    console.log('newMessage', newMessage);
    setMessages((prevMessages) => [...prevMessages, ...newMessage]);
  };

  useEffect(() => {
    let isMounted = true;

    // Fetch initial messages when the component mounts
    // fetchMessages();

    // Clean up the socket connection when the component unmounts
    return () => {
      isMounted = false;
      if (isMounted) {
        socket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    socket.on('message', handleIncomingMessage);
  
    return () => {
      console.log('Effect is cleaning up');
      socket.off('message', handleIncomingMessage);
    };
  }, [socket, roomId]);

  const handleSendMessage = async (username, roomId, message) => {
    socket.emit('sendMessage', { username, roomId, message });
  };

  const handleExitRoom = () => {
    onExitRoom(username, roomId);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
      <div>
        <button 
          className="btn btn-danger"
          onClick={() => handleExitRoom()}
        >
          Exit
        </button>
      </div>
      <div className="text-center">
        <h1>Room Id {roomId}</h1>
      </div>
      <div></div> {/* This empty div maintains the space between Exit button and Room Id label */}
    </div>
      <ChatList messages={messages} currentUser={username} />
      <SendMessageForm 
        username={username}
        roomId={roomId}
        onSendMessage={(username, roomId, message) => handleSendMessage(username, roomId, message)} 
      />
    </div>
  );
};

export default Chat;