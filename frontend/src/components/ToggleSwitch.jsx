import React, { useState } from 'react';
import './ToggleSwitch.css';

const ToggleSwitch = ({ onToggle }) => {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(prev => {
      const newValue = !prev;
      if (onToggle) onToggle(newValue);
      return newValue;
    });
  };

  return (
    <div className="toggle-container">
      <p>Are you a tech geek?</p>
      <div
        className={`toggle-switch ${isOn ? 'active' : ''}`}
        onClick={toggleSwitch}
      >
        <div className="toggle-circle" />
        <span className="option no">No</span>
        <span className="option yes">Yes</span>
      </div>
    </div>
  );
};

export default ToggleSwitch; 