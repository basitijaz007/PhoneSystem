import React, { useState } from 'react';
import axios from 'axios';

function SendVerification() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSendVerification = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/send-verification', {
        to: phoneNumber,
        message: message,
      });

      if (response.data.success) {
        setStatus('Message sent successfully!');
      } else {
        setStatus('Failed to send the message.');
      }
    } catch (error) {
      setStatus(`Error: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <div>
      <h2>Send Verification SMS</h2>
      <input
        type="text"
        placeholder="Enter phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendVerification}>Send SMS</button>
      <p>{status}</p>
    </div>
  );
}

export default SendVerification;
