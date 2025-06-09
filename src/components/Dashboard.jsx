import React, { useState } from 'react';
import { 
  FaUser, FaMicrophone, FaUpload, FaHistory, 
  FaChartLine, FaLightbulb, FaCog, FaShare, 
  FaQuestionCircle, FaRegCalendarAlt, FaRegClock 
} from 'react-icons/fa';
import Navigation from './Navigation';

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState({
    emotion: 'Happy',
    confidence: 85,
    timestamp: new Date().toLocaleString()
  });

  // Mock data for history
  const historyData = [
    { id: 1, date: '2024-03-20', filename: 'recording1.wav', emotion: 'Happy', confidence: 85 },
    { id: 2, date: '2024-03-19', filename: 'recording2.wav', emotion: 'Neutral', confidence: 75 },
    { id: 3, date: '2024-03-18', filename: 'recording3.wav', emotion: 'Sad', confidence: 90 },
  ];

  return (
    <div className={`min-h-screen flex ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Navigation />
      <div className="flex-1 p-4 md:p-8">
        <div className="container mx-auto">
          {/* Welcome Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                <FaUser className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Welcome back, Abhay!</h1>
                <p className="text-gray-600 dark:text-gray-300">Last login: {new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Record & Upload Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Record & Upload</h2>
              <div className="space-y-4">
                <button className="w-full flex items-center justify-center space-x-2 bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition">
                  <FaMicrophone />
                  <span>Record Audio</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-3 px-4 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                  <FaUpload />
                  <span>Upload Audio File</span>
                </button>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <p>Supported formats: WAV, MP3</p>
                  <p>Maximum duration: 5 minutes</p>
                </div>
              </div>
            </div>

            {/* Emotion Detection Output */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
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
          </div>

          {/* History & Logs */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Analysis History</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Date</th>
                    <th className="text-left py-2">File</th>
                    <th className="text-left py-2">Emotion</th>
                    <th className="text-left py-2">Confidence</th>
                    <th className="text-left py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {historyData.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-2">{item.date}</td>
                      <td className="py-2">{item.filename}</td>
                      <td className="py-2">{item.emotion}</td>
                      <td className="py-2">{item.confidence}%</td>
                      <td className="py-2">
                        <button className="text-blue-500 hover:text-blue-600 mr-2">Replay</button>
                        <button className="text-gray-500 hover:text-gray-600 mr-2">View</button>
                        <button className="text-red-500 hover:text-red-600">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Insights & Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Emotion Trends</h2>
              <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">Chart will be displayed here</p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Insights</h2>
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
                  <p className="text-blue-800 dark:text-blue-200">
                    "You've been mostly 'Neutral' this week. Keep up the balance!"
                  </p>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg">
                  <p className="text-yellow-800 dark:text-yellow-200">
                    "Try relaxation techniques — high 'Anger' detected recently."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Settings & Preferences */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Dark Mode</span>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-12 h-6 rounded-full ${
                    darkMode ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transform transition ${
                      darkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span>Language</span>
                <select className="border rounded-lg px-3 py-1">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 