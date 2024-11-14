import React, { useState } from 'react';

const Stremer = () => {
  const [localFiles, setLocalFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleLocalFileChange = (event) => {
    setLocalFiles([...localFiles, ...event.target.files]);
  };

  const handleUploadedFileChange = (event) => {
    setUploadedFiles([...uploadedFiles, ...event.target.files]);
  };

  return (
    <div className="container mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-center text-2xl font-bold text-gray-800 mb-6">Stremer</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Local Files */}
        <div className="p-4 bg-white border border-gray-300 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-600 border-b-2 border-blue-600 pb-2 mb-4">Local Files</h3>
          <input
            type="file"
            multiple
            onChange={handleLocalFileChange}
            className="block w-full mb-4 text-gray-800"
          />
          <ul className="space-y-2">
            {localFiles.map((file, index) => (
              <li key={index} className="p-2 bg-gray-50 border border-gray-200 rounded-md">
                {file.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Uploaded Files */}
        <div className="p-4 bg-white border border-gray-300 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-600 border-b-2 border-blue-600 pb-2 mb-4">Upload Files</h3>
          <input
            type="file"
            multiple
            onChange={handleUploadedFileChange}
            className="block w-full mb-4 text-gray-800"
          />
          <ul className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <li key={index} className="p-2 bg-gray-50 border border-gray-200 rounded-md">
                {file.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* JPerf Display */}
        <div className="p-4 bg-white border border-gray-300 rounded-lg">
          <h3 className="text-lg font-semibold text-green-600 border-b-2 border-green-600 pb-2 mb-4">JPerf Data</h3>
          <div className="overflow-y-auto h-48 p-3 bg-gray-50 border border-gray-200 rounded-md">
            <p>JPerf data will be displayed here...</p>
          </div>
        </div>

        {/* Communication Logs */}
        <div className="p-4 bg-white border border-gray-300 rounded-lg">
          <h3 className="text-lg font-semibold text-green-600 border-b-2 border-green-600 pb-2 mb-4">Communication Logs</h3>
          <div className="overflow-y-auto h-48 p-3 bg-gray-50 border border-gray-200 rounded-md">
            <p>Logs will be displayed here...</p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white border border-gray-300 rounded-lg">
        {/* Transfer Details */}
        <h3 className="text-lg font-semibold text-yellow-600 border-b-2 border-yellow-600 pb-2 mb-4">Transfer Details</h3>
        <div className="overflow-y-auto h-36 p-3 bg-gray-50 border border-gray-200 rounded-md">
          <p>Transfer details will be displayed here...</p>
        </div>
      </div>
    </div>
  );
};

export default Stremer;
