import React, { useState } from 'react';
import { FaArrowLeft, FaBug } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // ייבוא useNavigate

const OneProduct = ({ product, onBack }) => {
  const [selectedDebug, setSelectedDebug] = useState(null);
  const debugOptions = ['Chip 1', 'Chip 2', 'Chip 3'];
  const navigate = useNavigate(); // יצירת הפונקציה לניווט

  const handleDebugSelect = (option) => {
    setSelectedDebug(option);
  };

  const handleDebugBack = () => {
    setSelectedDebug(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-indigo-900 flex flex-col p-6 relative">
      {/* כפתור חזרה עם אייקון חץ בצבעי האתר */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-transform transform hover:-translate-y-1 flex items-center justify-center"
      >
        <FaArrowLeft size={20} />
      </button>
      {/* כפתור Debug בצורת עיגול */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setSelectedDebug('')}
          className="bg-yellow-400 text-black p-3 rounded-full shadow-lg hover:bg-yellow-500 hover:shadow-xl transition-transform transform hover:-translate-y-1 flex items-center justify-center w-16 h-16"
        >
          <FaBug size={24} className="absolute" />
        </button>
      </div>
      {/* תיאור ותמונה מתחת לכפתור החזרה */}
      <div className="flex flex-col items-start mt-20 ml-12">
        {/* הצגת התמונה בגודל התואם לרוחב הכרטיסיה */}
        <img
          src={product.image}
          alt={product.text}
          className="w-3/4 h-auto rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 mb-4 max-w-xs"
        />
        {/* תיאור בתוך כרטיסיה מתחת לתמונה */}
        <div className="bg-indigo-600 text-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 w-3/4 max-w-xs text-center">
          <h1 className="text-lg font-bold">{product.text}</h1>
        </div>
      </div>
      {/* כפתורי הפעולות מוגדלים יותר במרכז בצד ימין */}
      <div className="absolute right-16 top-1/2 transform -translate-y-1/2 flex flex-col gap-8">
        {['SSH', 'Telnet', 'CLI', 'JPref'].map((buttonLabel) => (
          <button
            key={buttonLabel}
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
          onClick={() => navigate('/stremer')} // ניווט לקומפוננטת Stremer
        >
          Stremer
        </button>
        <button
          className="bg-blue-500 text-white py-6 px-12 rounded-lg shadow-lg hover:bg-blue-600 hover:shadow-xl transition-transform transform hover:-translate-y-1 focus:outline-none text-2xl"
        >
          Site Machine
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
    </div>
  );
};

export default OneProduct;
