import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function AuthSuccess() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      // Redirect to dashboard after successful login
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Authentication Successful!
        </h1>
        <p className="text-center text-gray-600">
          Redirecting to dashboard...
        </p>
      </div>
    </div>
  );
}

export default AuthSuccess; 