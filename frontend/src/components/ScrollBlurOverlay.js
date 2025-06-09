import React from 'react';

const ScrollBlurOverlay = () => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 10,
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
      WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
      transition: 'backdrop-filter 0.3s',
    }}
  />
);

export default ScrollBlurOverlay; 