// SendMessageForm.js
import React, { useState } from 'react';
import { FiArrowUp, FiSend } from 'react-icons/fi'; 

const SendMessageForm = ({ username, roomId, onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() !== '') {
      onSendMessage(username, roomId, message);
      setMessage('');
    }
  };

  return (
    <div className="send-message-form mb-3 position-relative">
      <input
        type="text"
        className="form-control rounded-start"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ height: '50px', paddingRight: '48px' }}
      />
      <button
        className="btn btn-primary rounded-circle ms-n1"
        type="button"
        onClick={() => handleSend()}
        style={{
          backgroundColor: '#5db075',
          color: 'white',
          border: '1px solid #5db075',
          position: 'absolute',
          right: '8px', // Adjust this value to fine-tune the position
          bottom: '50%', // Position in the middle vertically
          transform: 'translateY(50%)', // Center the button vertically
          zIndex: '1',
          fontSize: '15px',
        }}
      >
        <FiArrowUp />
      </button>
    </div>
  );
};

export default SendMessageForm;
