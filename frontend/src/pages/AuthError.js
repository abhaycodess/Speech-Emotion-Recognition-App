import React from 'react';
import { useNavigate } from 'react-router-dom';

function AuthError() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-red-600 mb-4">
          Authentication Failed
        </h1>
        <p className="text-center text-gray-600 mb-6">
          There was an error during the authentication process. Please try again.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Return to Login
        </button>
      </div>
    </div>
  );
}

export default AuthError; 