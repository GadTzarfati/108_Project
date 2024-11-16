// ModalWrapper.jsx
import React from 'react';

const ModalWrapper = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // אם המודאל אינו פתוח, לא מציגים אותו

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg max-w-lg w-full relative">
        {children}
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-red-600 hover:shadow-lg transition-transform transform hover:-translate-y-1 focus:outline-none absolute top-2 right-2"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ModalWrapper;
