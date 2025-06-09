import React from 'react';
import { Box, CircularProgress, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const Loader = ({ size = 40, color }) => {
  const theme = useTheme();
  const loaderColor = color || theme.palette.primary.main;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        width: size,
        height: size,
      }}
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <CircularProgress
          size={size}
          sx={{
            color: loaderColor,
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
      </motion.div>
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <CircularProgress
          size={size * 0.7}
          sx={{
            color: loaderColor,
            position: 'absolute',
            top: '15%',
            left: '15%',
          }}
        />
      </motion.div>
    </Box>
  );
};

export default Loader; 