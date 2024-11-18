import React, { useState } from 'react';
import { FaArrowLeft, FaBug, FaPowerOff, FaKey, FaTerminal, FaCode, FaNetworkWired, FaBroadcastTower, FaTools } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ModalWrapper from './ModalWrapper'; // ייבוא של ModalWrapper
import SideMachines from './SideMachines'; // ייבוא של SideMachines

const OneProduct = ({ product, onBack }) => {
  const [selectedDebug, setSelectedDebug] = useState(null);
  const [isPowerOn, setIsPowerOn] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(''); // תוכן המודאל
  const [showSideMachinesModal, setShowSideMachinesModal] = useState(false); // מצב עבור מודאל SideMachines
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
            host: '192.168.227.233',
            port: 22,
            username: 'void',
            password: 'nullme11', // יש להחליף את הערכים המתאימים בפרטים שלך
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

  const toggleSideMachinesModal = () => {
    setShowSideMachinesModal((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-900 to-black flex flex-col p-6 relative">
      {/* כפתור חזרה */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 bg-indigo-600 text-white p-2 rounded-full shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-transform transform hover:-translate-y-1 flex items-center justify-center w-10 h-10"
      >
        <FaArrowLeft size={16} />
      </button>
      {/* כפתור Debug */}
      <button
        onClick={() => setSelectedDebug('')}
        className="absolute top-4 right-24 bg-yellow-400 text-black p-2 rounded-full shadow-lg hover:bg-yellow-500 hover:shadow-xl transition-transform transform hover:-translate-y-1 flex items-center justify-center w-10 h-10"
      >
        <FaBug size={18} />
      </button>
      {/* כפתור הדלקה וכיבוי */}
      <button
        onClick={togglePower}
        className={`absolute top-4 right-4 p-2 rounded-full shadow-lg transition-transform transform hover:-translate-y-1 flex items-center justify-center w-10 h-10 ${
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

      {/* כפתורי הפעולות */}
      <div className="absolute right-16 top-1/2 transform -translate-y-1/2 flex flex-col gap-6">
        {['SSH', 'Telnet', 'CLI', 'JPref', 'Streamer', 'Side Machines'].map((buttonLabel) => {
          const icons = {
            SSH: <FaKey size={28} />,
            Telnet: <FaTerminal size={28} />,
            CLI: <FaCode size={28} />,
            JPref: <FaTools size={28} />,
            Streamer: <FaBroadcastTower size={28} />,
            'Side Machines': <FaNetworkWired size={28} />,
          };
          const handleClick = buttonLabel === 'Side Machines' ? toggleSideMachinesModal : () => openBlackbox(buttonLabel);
          return (
            <button
              key={buttonLabel}
              onClick={handleClick}
              className="flex flex-col items-center justify-center text-indigo-300 hover:text-indigo-600 transition-transform transform hover:-translate-y-1 focus:outline-none hover:shadow-2xl"
            >
              <div className="transition-transform transform hover:scale-125">
                {icons[buttonLabel]}
              </div>
              <span className="text-xs mt-1">{buttonLabel}</span>
            </button>
          );
        })}
      </div>

      {/* מודאל עבור Side Machines */}
      {showSideMachinesModal && (
        <ModalWrapper isOpen={showSideMachinesModal} onClose={toggleSideMachinesModal}>
          <SideMachines />
        </ModalWrapper>
      )}

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

      {/* מודאל עבור טרמינל */}
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
