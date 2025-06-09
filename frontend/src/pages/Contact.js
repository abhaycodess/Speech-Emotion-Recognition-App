import React from 'react';
import { Box, Typography } from '@mui/material';

const Contact = () => (
  <Box sx={{ minHeight: '100vh', width: '100vw', background: 'linear-gradient(120deg, #232a4d 0%, #3A59D1 100%)', color: '#fff' }}>
    <Box sx={{ py: 8, px: 2, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h3" fontWeight={700} gutterBottom>Contact</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        For any inquiries, feedback, or support, please email us at <a href="mailto:support@nimbus.com" style={{ color: '#F6B17A' }}>support@nimbus.com</a> or use the contact form on our website.
      </Typography>
    </Box>
  </Box>
);

export default Contact; 