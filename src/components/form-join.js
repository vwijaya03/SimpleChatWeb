import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { FaSpinner } from 'react-icons/fa'; 

const FormJoin = ({ onJoinRoom, isLoading }) => {
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');

  const joinRoom = () => {
    if (username.trim() === '' || roomId.trim() === '') {
      alert('Please enter both username and room ID.');
      return;
    }

    onJoinRoom(username, roomId);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Join Chatroom</h2>
      <Form>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formRoomId">
          <Form.Label>Room ID:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
        </Form.Group>

        <Col xs="auto">
            {isLoading ? (
              <Button
                variant="primary"
                type="button"
                className="w-100"
                disabled
                style={{ backgroundColor: '#5DB075', borderColor: '#5DB075' }}
              >
                <FaSpinner className="mr-10 spinner" style={{ marginRight: '10px' }} />
                Joining Room...
              </Button>
            ) : (
              <Button
                variant="primary"
                type="button"
                onClick={() => joinRoom()}
                className="w-100"
                style={{ backgroundColor: '#5DB075', borderColor: '#5DB075' }}
              >
                Join Room
              </Button>
            )}
          </Col>
      </Form>
    </div>
  );
};

export default FormJoin;
