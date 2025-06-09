import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FAQs = () => (
  <Box sx={{ minHeight: '100vh', width: '100vw', background: 'linear-gradient(120deg, #232a4d 0%, #3A59D1 100%)', color: '#fff' }}>
    <Box sx={{ py: 8, px: 2, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h3" fontWeight={700} gutterBottom>Frequently Asked Questions</Typography>
      <Accordion sx={{ mt: 2, background: 'rgba(255,255,255,0.08)', color: '#fff', borderRadius: 2, boxShadow: 'none' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#F6B17A' }} />}>
          <Typography sx={{ color: '#fff' }}>What is Nimbus?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: '#fff' }}>
            Nimbus is a speech emotion recognition system that uses deep learning to analyze and predict emotions from audio samples.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ background: 'rgba(255,255,255,0.08)', color: '#fff', borderRadius: 2, boxShadow: 'none' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#F6B17A' }} />}>
          <Typography sx={{ color: '#fff' }}>How accurate is the emotion recognition?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: '#fff' }}>
            Our model is trained on thousands of samples and achieves high accuracy on standard benchmarks, but results may vary depending on audio quality and context.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ background: 'rgba(255,255,255,0.08)', color: '#fff', borderRadius: 2, boxShadow: 'none' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#F6B17A' }} />}>
          <Typography sx={{ color: '#fff' }}>How can I use Nimbus?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ color: '#fff' }}>
            Simply sign up, log in, and upload or record your speech to get instant emotion predictions on the dashboard.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  </Box>
);

export default FAQs; 