import React, { useEffect, useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import socket from '../src/socket-service';
import FormJoin from '../src/components/form-join';
import Chat from '../src/components/chat';

const App = () => {
  const [isShowChat, setShowChat] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const props = { socket, username, roomId };

  useEffect(() => {
    const handleJoinRoomSuccess = (res) => {
      setUsername(res.data.username);
      setRoomId(res.data.roomId);
      setShowChat(true);
    };

    const handleJoinRoomError = (data) => {
      console.error('Error joining room:', data.message);
      setIsLoading(false);
      setError(data.message);
    };

    // Set up event listeners when the component mounts
    socket.on('joinRoomSuccess', handleJoinRoomSuccess);
    socket.on('joinRoomError', handleJoinRoomError);

    // Clean up event listeners when the component unmounts
    return () => {
      socket.off('joinRoomSuccess', handleJoinRoomSuccess);
      socket.off('joinRoomError', handleJoinRoomError);
    };
  }, []);

  const joinRoom = (username, roomId) => {
    setIsLoading(true);
    setError(null);

    try {
      socket.emit('joinRoom', { username, roomId });
    } catch (error) {
      setIsLoading(false);
      setError(`Whoops, something went wrong: ${error.message}`);
    }
  };

  const closeAlert = () => {
    setError(null);
  };

  const exitRoom = (username, roomId) => {
    socket.emit('exitRoom', { username, roomId });
    // socket.disconnect();
    setShowChat(false);
    setIsLoading(false);
  };

  return (
    <div>
      <main>
      {error && <Alert variant="danger" onClose={() => closeAlert()} dismissible>{error}</Alert>}
        {!isShowChat && (
          <FormJoin 
            onJoinRoom={(username, roomId) => joinRoom(username, roomId)}
            isLoading={isLoading}
          />
        )}

        {isShowChat && (
          <Chat props={props} onExitRoom={(username, roomId) => exitRoom(username, roomId)} />
        )}
      </main>
    </div>
  );
};

export default App;
