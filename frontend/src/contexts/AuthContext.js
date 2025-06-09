import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Fetch user data
      axios.get('/api/current_user')
        .then(response => {
          setCurrentUser(response.data);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
          localStorage.removeItem('token');
          delete axios.defaults.headers.common['Authorization'];
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/login', { email, password });
      const { token, user } = response.data;
      
      // Store token in localStorage
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setCurrentUser(user);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      return { 
        success: false, 
        error: error.response?.data?.error || 'An error occurred during login' 
      };
    }
  };

  const signup = async (username, email, password) => {
    try {
      const response = await axios.post('/api/signup', { username, email, password });
      const { token, user } = response.data;
      
      // Store token in localStorage
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setCurrentUser(user);
      return { success: true };
    } catch (error) {
      console.error('Signup error:', error.response?.data || error.message);
      return { 
        success: false, 
        error: error.response?.data?.error || 'An error occurred during signup' 
      };
    }
  };

  const logout = async () => {
    try {
      await axios.get('/api/logout');
      setCurrentUser(null);
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error.response?.data || error.message);
      return { 
        success: false, 
        error: error.response?.data?.error || 'An error occurred during logout' 
      };
    }
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
} 