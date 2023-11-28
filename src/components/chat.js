import React, { useState, useEffect, useRef } from 'react';
import ChatList from '../components/chat-list';
import SendMessageForm from '../components/chat-send-message';

const Chat = ({ props, onExitRoom }) => {
  const socket = props.socket;
  const username = props.username;
  const roomId = props.roomId;
  const [messages, setMessages] = useState([]);
  const [maxHeight, setMaxHeight] = useState(400); 
  const messagesRef = useRef(messages);
  
  const handleIncomingMessage = (receivedMessage) => {
    console.log('Received messages:', receivedMessage);
    // Process the received messages as needed
    const newMessage = [receivedMessage];
    console.log('newMessage', newMessage);
    setMessages((prevMessages) => [...prevMessages, ...newMessage]);
  };


  useEffect(() => {
    const fetchMessages = async () => {
      // Emit a request for historical messages to the server
      socket.emit('fetchMessagesHistory', { roomId });
  
      // Listen for the response from the server
      socket.on('messagesHistory', (data) => {
        const messagesHistory = data.messages;
        console.log('messagesRef', messagesRef.current);
        setMessages((prevMessages) => [...messagesRef.current, ...messagesHistory].reverse());
      });
    };
    let isMounted = true;

    // Fetch initial messages when the component mounts
    fetchMessages();

    // Clean up the socket connection when the component unmounts
    return () => {
      isMounted = false;
      if (isMounted) {
        socket.disconnect();
        setMessages([]);
      }
    };
  }, [messagesRef, setMessages, socket, roomId]);

  useEffect(() => {
    socket.on('message', handleIncomingMessage);
  
    return () => {
      console.log('Effect is cleaning up');
      socket.off('message', handleIncomingMessage);
      setMessages([]);
    };
  }, [socket, roomId]);

  useEffect(() => {
    const updateMaxHeight = () => {
      const windowHeight = window.innerHeight;
      const newMaxHeight = Math.floor(windowHeight * 0.8);
      setMaxHeight(newMaxHeight);
    };

    // Initial update
    updateMaxHeight();

    window.addEventListener('resize', updateMaxHeight);

    return () => {
      window.removeEventListener('resize', updateMaxHeight);
    };
  }, []);

  const handleSendMessage = async (username, roomId, message) => {
    socket.emit('sendMessage', { username, roomId, message });
  };

  const handleExitRoom = () => {
    onExitRoom(username, roomId);
    setMessages([]);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
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
      <div style={{ overflowY: 'auto', maxHeight: `${maxHeight}px` }} className='mb-3'>
        <ChatList messages={messages} currentUser={username} />
      </div>
      <SendMessageForm 
        username={username}
        roomId={roomId}
        onSendMessage={(username, roomId, message) => handleSendMessage(username, roomId, message)} 
      />
    </div>
  );
};

export default Chat;
