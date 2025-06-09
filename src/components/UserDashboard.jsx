import React, { useState } from 'react';
import { FaUser, FaHistory, FaChartLine, FaRegCalendarAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  // Mock user data
  const userData = {
    name: 'Abhay',
    email: 'abhay@example.com',
    joinDate: '2024-01-01',
    totalAnalyses: 25,
    mostCommonEmotion: 'Neutral',
  };

  // Mock history data
  const historyData = [
    { id: 1, date: '2024-03-20', emotion: 'Happy', confidence: 85 },
    { id: 2, date: '2024-03-19', emotion: 'Neutral', confidence: 75 },
    { id: 3, date: '2024-03-18', emotion: 'Sad', confidence: 90 },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* User Profile Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center">
              <FaUser className="text-white text-3xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{userData.name}</h1>
              <p className="text-gray-600 dark:text-gray-300">{userData.email}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Member since {userData.joinDate}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Your Stats</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Total Analyses</span>
                <span className="font-semibold">{userData.totalAnalyses}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Most Common Emotion</span>
                <span className="font-semibold">{userData.mostCommonEmotion}</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-4">
              <button
                onClick={() => navigate('/predict')}
                className="w-full flex items-center justify-center space-x-2 bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition"
              >
                <FaChartLine />
                <span>Analyze New Emotion</span>
              </button>
            </div>
          </div>
        </div>

        {/* History Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Analyses</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Date</th>
                  <th className="text-left py-2">Emotion</th>
                  <th className="text-left py-2">Confidence</th>
                </tr>
              </thead>
              <tbody>
                {historyData.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-2">{item.date}</td>
                    <td className="py-2">{item.emotion}</td>
                    <td className="py-2">{item.confidence}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard; 