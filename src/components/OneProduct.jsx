import React, { useState } from 'react';
import { FaArrowLeft, FaBug, FaPowerOff } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ModalWrapper from './ModalWrapper'; // Import the ModalWrapper

const OneProduct = ({ product, onBack }) => {
  const [selectedDebug, setSelectedDebug] = useState(null);
  const [isPowerOn, setIsPowerOn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(''); // Content for modal
  const debugOptions = ['Chip 1', 'Chip 2', 'Chip 3'];
  const navigate = useNavigate();

  const handleDebugSelect = (option) => {
    setSelectedDebug(option);
  };

  const handleDebugBack = () => {
    setSelectedDebug(null);
  };

  const togglePower = () => {
    setIsPowerOn((prev) => !prev);
  };

  const openBlackbox = async (type) => {
    setModalContent(`${type} Terminal`);
    setIsModalOpen(true);

    if (type === 'SSH') {
      try {
        const response = await fetch('http://localhost:5000/api/connect-ssh', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            host: 'your-ssh-host',
            port: 22,
            username: 'your-username',
            password: 'your-password', // יש להחליף לפרטים המתאימים שלך או לקבל אותם כקלט
          }),
        });

        const data = await response.json();
        if (data.success) {
          setModalContent(`SSH Terminal Output:\n${data.output}`);
        } else {
          setModalContent(`SSH Connection Error: ${data.error}`);
        }
      } catch (error) {
        setModalContent(`Network Error: ${error.message}`);
      }
    }
  };

  const closeBlackbox = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-indigo-900 flex flex-col p-6 relative">
      {/* כפתור חזרה */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 bg-indigo-600 text-white p-2 rounded-full shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-transform transform hover:-translate-y-1 flex items-center justify-center w-12 h-12"
      >
        <FaArrowLeft size={16} />
      </button>
      {/* כפתור Debug */}
      <button
        onClick={() => setSelectedDebug('')}
        className="absolute top-4 right-24 bg-yellow-400 text-black p-2 rounded-full shadow-lg hover:bg-yellow-500 hover:shadow-xl transition-transform transform hover:-translate-y-1 flex items-center justify-center w-12 h-12"
      >
        <FaBug size={18} />
      </button>
      {/* כפתור הדלקה וכיבוי */}
      <button
        onClick={togglePower}
        className={`absolute top-4 right-4 p-2 rounded-full shadow-lg transition-transform transform hover:-translate-y-1 flex items-center justify-center w-12 h-12 ${
          isPowerOn ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-500 hover:bg-gray-600'
        }`}
      >
        <FaPowerOff size={18} className="text-white" />
      </button>

      {/* תיאור ותמונה */}
      <div className="flex flex-col items-start mt-20 ml-12">
        <img
          src={product.image}
          alt={product.text}
          className="w-3/4 h-auto rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 mb-4 max-w-xs"
        />
        <div className="bg-indigo-600 text-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 w-3/4 max-w-xs text-center">
          <h1 className="text-lg font-bold">{product.text}</h1>
        </div>
      </div>

      {/* כפתורי הפעולות מוגדלים יותר במרכז בצד ימין */}
      <div className="absolute right-16 top-1/2 transform -translate-y-1/2 flex flex-col gap-8">
        {['SSH', 'Telnet', 'CLI', 'JPref'].map((buttonLabel) => (
          <button
            key={buttonLabel}
            onClick={() => openBlackbox(buttonLabel)}
            className="bg-indigo-600 text-white py-8 px-16 rounded-lg shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-transform transform hover:-translate-y-1 focus:outline-none text-2xl"
          >
            {buttonLabel}
          </button>
        ))}
      </div>

      {/* כפתורי Stremer ו-Site Machine */}
      <div className="flex flex-col items-center mt-12 gap-6">
        <button
          className="bg-purple-500 text-white py-6 px-12 rounded-lg shadow-lg hover:bg-purple-600 hover:shadow-xl transition-transform transform hover:-translate-y-1 focus:outline-none text-2xl"
          onClick={() => openBlackbox('Streamer')}
        >
          Stremer
        </button>
        <button
          className="bg-blue-500 text-white py-6 px-12 rounded-lg shadow-lg hover:bg-blue-600 hover:shadow-xl transition-transform transform hover:-translate-y-1 focus:outline-none text-2xl"
          onClick={() => openBlackbox('Side Machine')}
        >
          Side Machine
        </button>
      </div>

      {/* חלון בחירת Debug */}
      {selectedDebug && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Select Debug Option</h2>
          <div className="flex gap-4 justify-center">
            {debugOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => handleDebugSelect(option)}
                className={`py-2 px-4 rounded-lg shadow-md transition-transform transform hover:-translate-y-1 ${
                  selectedDebug === option ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
                disabled={selectedDebug && selectedDebug !== option}
              >
                {option}
              </button>
            ))}
          </div>
          <button
            onClick={handleDebugBack}
            className="mt-4 bg-red-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-red-600 hover:shadow-lg transition-transform transform hover:-translate-y-1 focus:outline-none"
          >
            Back from Debug
          </button>
        </div>
      )}

      {/* Blackbox Modal */}
      <ModalWrapper isOpen={isModalOpen} onClose={closeBlackbox}>
        <h2 className="text-xl font-bold mb-4">{modalContent}</h2>
        <div className="h-48 bg-gray-900 p-4 rounded-lg overflow-auto">
          <p>{modalContent}</p>
        </div>
      </ModalWrapper>
    </div>
  );
};

export default OneProduct;
