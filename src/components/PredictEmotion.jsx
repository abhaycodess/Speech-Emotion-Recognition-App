import React, { useState } from 'react';
import { FaMicrophone, FaUpload, FaRegClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import UserDropdown from './UserDropdown';

const PredictEmotion = () => {
  const navigate = useNavigate();
  const [currentEmotion, setCurrentEmotion] = useState({
    emotion: 'Happy',
    confidence: 85,
    timestamp: new Date().toLocaleString()
  });

  const handleRecord = () => {
    // Implement recording functionality
    console.log('Recording started');
  };

  const handleUpload = () => {
    // Implement file upload functionality
    console.log('File upload initiated');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">SER Web App</h1>
          <UserDropdown />
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">Analyze Your Emotion</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Upload an audio file or record your voice to analyze your emotional state.
            </p>

            {/* Record & Upload Section */}
            <div className="space-y-4 mb-8">
              <button 
                onClick={handleRecord}
                className="w-full flex items-center justify-center space-x-2 bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition"
              >
                <FaMicrophone />
                <span>Record Audio</span>
              </button>
              <button 
                onClick={handleUpload}
                className="w-full flex items-center justify-center space-x-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-3 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                <FaUpload />
                <span>Upload Audio File</span>
              </button>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                <p>Supported formats: WAV, MP3</p>
                <p>Maximum duration: 5 minutes</p>
              </div>
            </div>

            {/* Current Analysis Section */}
            {currentEmotion && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-4">Current Analysis</h2>
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    currentEmotion.emotion === 'Happy' ? 'bg-green-500' :
                    currentEmotion.emotion === 'Sad' ? 'bg-blue-500' :
                    currentEmotion.emotion === 'Angry' ? 'bg-red-500' :
                    'bg-gray-500'
                  }`}>
                    <span className="text-white text-xl">{currentEmotion.emotion[0]}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{currentEmotion.emotion}</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Confidence: {currentEmotion.confidence}%
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      <FaRegClock className="inline mr-1" />
                      {currentEmotion.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-6 flex justify-end space-x-4">
              <button 
                onClick={() => navigate('/dashboard')}
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                Go to Dashboard
              </button>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
                Save Analysis
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictEmotion; 