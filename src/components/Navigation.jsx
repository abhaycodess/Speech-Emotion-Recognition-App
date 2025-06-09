import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaChartLine, FaHistory, FaCog, FaMicrophone } from 'react-icons/fa';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/predict', icon: <FaMicrophone />, label: 'Predict Emotion' },
    { path: '/dashboard', icon: <FaHome />, label: 'Dashboard' },
    { path: '/analytics', icon: <FaChartLine />, label: 'Analytics' },
    { path: '/history', icon: <FaHistory />, label: 'History' },
    { path: '/settings', icon: <FaCog />, label: 'Settings' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg fixed bottom-0 left-0 right-0 md:relative md:w-64">
      <div className="flex md:flex-col justify-around md:justify-start p-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center space-x-2 p-3 rounded-lg transition-colors ${
              location.pathname === item.path
                ? 'bg-blue-500 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="hidden md:inline">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navigation; 