import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // עדכן לפי כתובת השרת שלך

const SideMachines = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [machineName, setMachineName] = useState('Machine 1');

  useEffect(() => {
    socket.on('message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
    if (!inputMessage.trim()) return; // לא לשלוח הודעה ריקה
    const messageData = {
      from: machineName,
      message: inputMessage,
    };
    socket.emit('message', messageData);
    setMessages((prevMessages) => [...prevMessages, messageData]);
    setInputMessage('');
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <div className="flex flex-col items-center mt-8 gap-4 bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-lg">
      <h2 className="text-white font-bold text-xl">{machineName}</h2>
      <div className="flex flex-col items-center gap-4 w-full">
        <input
          type="text"
          placeholder="Type your message"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              sendMessage();
            }
          }}
          className="text-black border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <div className="flex gap-4">
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Send Message
          </button>
          <button
            onClick={clearMessages}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
          >
            Clear Messages
          </button>
        </div>
      </div>
      <div className="mt-6 w-full">
        <h3 className="text-white font-bold">Messages:</h3>
        <ul className="space-y-3 mt-4">
          {messages.map((msg, index) => (
            <li
              key={index}
              className="bg-indigo-600 text-white p-3 rounded-lg shadow-md break-words"
            >
              <strong>{msg.from}:</strong> {msg.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideMachines;
