import React, { useState } from 'react';

const OneProduct = ({ product, onBack }) => {
  const [selectedDebug, setSelectedDebug] = useState(null);
  const debugOptions = ['Chip 1', 'Chip 2', 'Chip 3'];

  const handleDebugSelect = (option) => {
    setSelectedDebug(option);
  };

  const handleDebugBack = () => {
    setSelectedDebug(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-indigo-900 flex flex-col items-center p-6 relative">
      {/* כפתור החזרה למעלה בצד שמאל */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 bg-red-500 text-white py-2 px-4 rounded-full shadow-lg hover:bg-red-600 hover:shadow-xl transition-transform transform hover:-translate-y-1"
      >
        Back
      </button>
      <div className="flex items-center w-full mb-6 mt-10">
        <img src={product.image} alt={product.text} className="w-1/3 h-auto rounded-lg shadow-lg mr-6" />
        <h1 className="text-4xl font-bold text-white">{product.text}</h1>
      </div>
      {/* כפתורי הפעולות */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        {['SSH', 'Telnet', 'CLI', 'JPref'].map((buttonLabel) => (
          <button
            key={buttonLabel}
            className="bg-indigo-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg transition-transform transform hover:-translate-y-1 focus:outline-none"
          >
            {buttonLabel}
          </button>
        ))}
      </div>
      {/* כפתור Debug */}
      <button
        onClick={() => setSelectedDebug('')}
        className="bg-yellow-400 text-black py-3 px-8 rounded-lg shadow-md hover:bg-yellow-500 hover:shadow-lg transition-transform transform hover:-translate-y-1 focus:outline-none"
      >
        Debug
      </button>
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
    </div>
  );
};

export default OneProduct;
