import React, { useState } from 'react';
import { Box, Typography, useTheme, Collapse, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { styled } from '@mui/material/styles';

// Glassy card for collapsible sections
const GlassySection = styled(Box)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'rgba(58, 89, 209, 0.18)'
    : 'rgba(163, 184, 248, 0.32)',
  borderRadius: 22,
  boxShadow: theme.palette.mode === 'dark'
    ? '0 8px 32px rgba(35,42,77,0.32)'
    : '0 8px 32px rgba(58,89,209,0.10)',
  border: `1.5px solid ${theme.palette.mode === 'dark' ? 'rgba(58,89,209,0.22)' : 'rgba(58,89,209,0.18)'}`,
  mb: 3,
  px: { xs: 2, md: 4 },
  py: { xs: 2, md: 3 },
  transition: 'box-shadow 0.3s, background 0.3s',
  '&:hover': {
    boxShadow: theme.palette.mode === 'dark'
      ? '0 12px 40px rgba(35,42,77,0.38)'
      : '0 12px 40px rgba(58,89,209,0.16)',
    background: theme.palette.mode === 'dark'
      ? 'rgba(58, 89, 209, 0.28)'
      : 'rgba(163, 184, 248, 0.45)',
  },
}));

const sections = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    content: [
      'By creating an account, uploading audio, or interacting with the App in any way, you agree to be bound by these Terms and our Privacy Policy.'
    ]
  },
  {
    id: 'eligibility',
    title: '2. User Eligibility',
    content: [
      'You must be at least 13 years old to use this App. If you are under 18, you must have parental or guardian permission.'
    ]
  },
  {
    id: 'accounts',
    title: '3. User Accounts',
    content: [
      'You must provide accurate, complete information when creating an account.',
      'You are responsible for maintaining the confidentiality of your login credentials.',
      'You agree to notify us immediately of any unauthorized access to your account.'
    ]
  },
  {
    id: 'use',
    title: '4. Use of the App',
    content: [
      'You agree to use the App only for lawful purposes. You are prohibited from:',
      <ul style={{ marginLeft: 24 }}>
        <li>Uploading unlawful, harmful, or offensive content.</li>
        <li>Attempting to reverse-engineer, hack, or disrupt the App's functionality.</li>
        <li>Using the App for commercial purposes without written permission.</li>
      </ul>
    ]
  },
  {
    id: 'audio',
    title: '5. Audio Uploads and Predictions',
    content: [
      'The audio files you upload are processed for emotion recognition using machine learning models.',
      'We do not use your audio for training without explicit permission.',
      'We do not guarantee 100% accuracy of emotion predictions.'
    ]
  },
  {
    id: 'ip',
    title: '6. Intellectual Property',
    content: [
      'All content, features, and source code of this App are the intellectual property of [Your Team/Organization Name].',
      'You are granted a limited, non-exclusive, non-transferable license to use the Services.'
    ]
  },
  {
    id: 'privacy',
    title: '7. Privacy',
    content: [
      'Our use and storage of your data (including audio and account information) is governed by our Privacy Policy. By using the App, you consent to the collection and processing of your data as outlined there.'
    ]
  },
  {
    id: 'liability',
    title: '8. Limitation of Liability',
    content: [
      'To the maximum extent permitted by law:',
      <ul style={{ marginLeft: 24 }}>
        <li>We are not liable for indirect, incidental, or consequential damages.</li>
        <li>The App is provided "as is" without warranties of any kind.</li>
      </ul>
    ]
  },
  {
    id: 'termination',
    title: '9. Termination',
    content: [
      'We reserve the right to suspend or terminate your access if you:',
      <ul style={{ marginLeft: 24 }}>
        <li>Violate these Terms</li>
        <li>Use the App in a way that may cause harm or legal liability</li>
      </ul>
    ]
  },
  {
    id: 'changes',
    title: '10. Changes to the Terms',
    content: [
      'We may update these Terms from time to time. Users will be notified via email or the App dashboard. Continued use of the App after changes constitutes your acceptance of the new Terms.'
    ]
  },
  {
    id: 'law',
    title: '11. Governing Law',
    content: [
      'These Terms are governed by and interpreted under the laws of [Your Country/State]. Any disputes shall be resolved in the courts of [Your Jurisdiction].'
    ]
  },
  {
    id: 'contact',
    title: '12. Contact',
    content: [
      'For any questions or concerns, please contact us at:',
      <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}><span role="img" aria-label="email">📧</span> [Insert Your Contact Email]</span>
    ]
  }
];

const Terms = () => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState({});

  const toggleSection = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        pt: { xs: 10, md: 12 },
        pb: 4,
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(120deg, #232a4d 0%, #3A59D1 100%)'
          : 'linear-gradient(120deg, #3A59D1 0%, #a3b8f8 100%)',
        color: theme.palette.text.primary,
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 700, mx: 'auto', px: { xs: 1, sm: 2, md: 0 } }}>
        <Typography
          variant="h2"
          sx={{
            fontFamily: `'Playfair Display', 'Merriweather', serif`,
            fontWeight: 800,
            mb: 4,
            fontSize: { xs: '2rem', md: '2.7rem', lg: '3.2rem' },
            background: theme.palette.mode === 'dark'
              ? 'none'
              : 'linear-gradient(45deg, #3A59D1, #232a4d)',
            WebkitBackgroundClip: theme.palette.mode === 'dark' ? undefined : 'text',
            WebkitTextFillColor: theme.palette.mode === 'dark' ? '#fff' : 'transparent',
            color: theme.palette.mode === 'dark' ? '#fff' : undefined,
            letterSpacing: '-1.5px',
            textShadow: theme.palette.mode === 'dark'
              ? '0 1px 2px #222'
              : '0 2px 16px rgba(60,60,60,0.10)',
            textAlign: 'center',
            zIndex: 2,
          }}
        >
          Terms of Service
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" align="center" sx={{ mb: 4 }}>
          Effective Date: [Insert Date]
        </Typography>
        {sections.map((section) => (
          <GlassySection key={section.id}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                py: 1.5,
                borderBottom: `1px solid ${theme.palette.divider}`,
                '&:hover': {
                  backgroundColor: theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.04)'
                    : 'rgba(58, 89, 209, 0.06)',
                },
                px: { xs: 1, md: 2 },
              }}
              onClick={() => toggleSection(section.id)}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.text.primary,
                  m: 0,
                  fontFamily: 'Inter, Roboto, Arial, sans-serif',
                  textAlign: 'left',
                }}
              >
                {section.title}
              </Typography>
              <IconButton>
                {expanded[section.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            </Box>
            <Collapse in={expanded[section.id]}>
              <Box sx={{ pl: 1, pt: 2 }}>
                {section.content.map((c, i) =>
                  typeof c === 'string' ? (
                    <Typography key={i} variant="body1" paragraph>{c}</Typography>
                  ) : (
                    <Box key={i}>{c}</Box>
                  )
                )}
              </Box>
            </Collapse>
          </GlassySection>
        ))}
      </Box>
    </Box>
  );
};

export default Terms; 