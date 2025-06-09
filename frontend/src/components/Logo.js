import React from 'react';
import logo from '../assets/nimbus-logo.png';

const Logo = ({ width = 48, height = 48, style = {}, ...props }) => (
  <img
    src={logo}
    alt="Nimbus Logo"
    width={width}
    height={height}
    style={{ display: 'block', ...style }}
    {...props}
  />
);

export default Logo; 