import React from 'react';

/**
 * FocusWindowBlur wraps its children and creates a 'focus window' effect:
 * - The center area is sharp (clear)
 * - The top and bottom are blurred
 *
 * Usage: <FocusWindowBlur><MainContent /></FocusWindowBlur>
 */
const maskTopBottom = 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)';
const maskCenter = 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)';

const FocusWindowBlur = ({ children }) => (
  <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
    {/* Blurred layer (shows only top/bottom) */}
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
        overflow: 'hidden',
        maskImage: maskTopBottom,
        WebkitMaskImage: maskTopBottom,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          filter: 'blur(8px)',
          WebkitFilter: 'blur(8px)',
          transform: 'scale(1.02)', // Slight scale to avoid edge artifacts
        }}
      >
        {children}
      </div>
    </div>
    {/* Sharp layer (shows only center) */}
    <div
      style={{
        position: 'relative',
        zIndex: 2,
        maskImage: maskCenter,
        WebkitMaskImage: maskCenter,
      }}
    >
      {children}
    </div>
  </div>
);

export default FocusWindowBlur; 