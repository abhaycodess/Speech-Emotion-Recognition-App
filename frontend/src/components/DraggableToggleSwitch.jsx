import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './ToggleSwitch.css';

const SLIDER_WIDTH = 350;
const CIRCLE_SIZE = 60;
const DRAG_RANGE = SLIDER_WIDTH - CIRCLE_SIZE - 10; // 5px margin on each side

const DraggableToggleSwitch = ({ onToggle }) => {
  const [x, setX] = useState(5);

  const handleDragEnd = (event, info) => {
    if (info.point.x - event.target.getBoundingClientRect().left > SLIDER_WIDTH / 2) {
      setX(DRAG_RANGE + 5);
      if (onToggle) onToggle(true);
    } else {
      setX(5);
      if (onToggle) onToggle(false);
    }
  };

  return (
    <div className="toggle-container">
      <p>Are you a tech geek?</p>
      <div className="toggle-switch" style={{ width: SLIDER_WIDTH }}>
        <motion.div
          className="toggle-circle"
          drag="x"
          dragConstraints={{ left: 5, right: DRAG_RANGE + 5 }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          animate={{ x }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          style={{ width: CIRCLE_SIZE, height: CIRCLE_SIZE }}
        />
        <span className="option no">No</span>
        <span className="option yes">Yes</span>
      </div>
    </div>
  );
};

export default DraggableToggleSwitch; 