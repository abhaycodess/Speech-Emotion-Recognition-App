import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UserDashboard from './components/UserDashboard';
import PredictEmotion from './components/PredictEmotion';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/predict" element={<PredictEmotion />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 