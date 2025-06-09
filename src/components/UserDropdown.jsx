import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaCog, FaSignOutAlt, FaChartLine, FaMicrophone } from 'react-icons/fa';

const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleDashboardClick = () => {
    navigate('/dashboard');
    setIsOpen(false);
  };

  const handlePredictClick = () => {
    navigate('/predict');
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
          <FaUser className="text-white text-xl" />
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-10">
          <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-semibold">Abhay</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">abhay@example.com</p>
          </div>
          
          <button
            onClick={handleDashboardClick}
            className="w-full flex items-center space-x-2 px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FaUser />
            <span>My Profile</span>
          </button>

          <button
            onClick={handlePredictClick}
            className="w-full flex items-center space-x-2 px-4 py-2 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FaMicrophone />
            <span>Analyze Emotion</span>
          </button>

          <Link
            to="/settings"
            className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FaCog />
            <span>Settings</span>
          </Link>

          <button className="w-full flex items-center space-x-2 px-4 py-2 text-left text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700">
            <FaSignOutAlt />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown; 