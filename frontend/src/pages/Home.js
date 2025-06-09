// home.js
import React, { useRef } from 'react';
import {
  Box,
  Typography,
  Button,
  useTheme,
} from '@mui/material';
import { motion, useInView } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import InfoCards from '../components/InfoCards';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import FadeInOnScroll from '../components/FadeInOnScroll';

const AnimatedBlob = motion(Box);

export default function Home() {
  const theme = useTheme();
  const heroRef = useRef(null);
  const infoCardsRef = useRef(null);
  const inView = useInView(heroRef, { once: true, margin: '-100px' });
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Scroll to main section
  const handleGetStarted = () => {
    if (infoCardsRef.current) {
      infoCardsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Try It Now button logic
  const handleTryItNow = () => {
    if (!currentUser) {
      navigate('/login');
    } else {
      navigate('/dashboard');
    }
  };

  // Unified background gradient
  const unifiedBg = theme.palette.mode === 'dark'
    ? `linear-gradient(120deg, #232a4d 0%, #3A59D1 100%)`
    : `linear-gradient(120deg, #3A59D1 0%, #a3b8f8 100%)`;

  return (
    <Box sx={{ minHeight: '100vh', width: '100vw', background: unifiedBg, pb: 0 }}>
      {/* Animated floating background shapes */}
      <AnimatedBlob
        initial={{ opacity: 0, scale: 0.9, y: 0 }}
        animate={{
          opacity: 0.18,
          scale: [0.9, 1.05, 0.95, 1],
          y: [0, 20, -10, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        sx={{
          position: 'fixed',
          top: { xs: 40, md: 80 },
          left: { xs: -80, md: -120 },
          width: { xs: 180, md: 320 },
          height: { xs: 180, md: 320 },
          borderRadius: '50%',
          background: theme.palette.primary.main,
          zIndex: 0,
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />
      <AnimatedBlob
        initial={{ opacity: 0, scale: 0.9, y: 0 }}
        animate={{
          opacity: 0.13,
          scale: [1, 1.08, 0.95, 1],
          y: [0, -15, 10, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 1 }}
        sx={{
          position: 'fixed',
          bottom: { xs: 10, md: 40 },
          right: { xs: -60, md: -100 },
          width: { xs: 120, md: 220 },
          height: { xs: 120, md: 220 },
          borderRadius: '50%',
          background: theme.palette.secondary.main,
          zIndex: 0,
          filter: 'blur(32px)',
          pointerEvents: 'none',
        }}
      />
      {/* Hero Video Section */}
      <Box
        ref={heroRef}
        sx={{
          minHeight: { xs: 340, md: 520 },
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          borderRadius: 0,
          boxShadow: 0,
          mb: 0,
          position: 'relative',
        }}
      >
        {/* Remove background video for minimal look */}
        {/* Gradient overlay and headline/button remain */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.2 }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, rgba(30,60,180,0.55) 0%, rgba(0,0,0,0.15) 100%)',
            zIndex: 1,
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          style={{
            zIndex: 2,
            color: '#fff',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2.2rem',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontFamily: `'Playfair Display', 'Merriweather', serif`,
              fontWeight: 800,
              fontSize: { xs: '2.2rem', md: '3.6rem', lg: '4.2rem' },
              lineHeight: 1.13,
              letterSpacing: '-1.5px',
              mb: 2,
              color: '#fff',
              textShadow: '0 2px 16px rgba(0,0,0,0.10)',
              whiteSpace: 'normal',
              maxWidth: 900,
              mx: 'auto',
              display: 'block',
            }}
          >
            Discover the Power of{' '}
            <Box component="span" sx={{ color: '#F6B17A', fontWeight: 900 }}>
              Emotion
            </Box>{' '}
            through Speech
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontFamily: `'Inter', 'Roboto', 'Arial', sans-serif`,
              fontWeight: 400,
              fontSize: { xs: '1.1rem', md: '1.35rem' },
              color: 'rgba(255,255,255,0.92)',
              mb: 4,
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.5,
              letterSpacing: 0,
            }}
          >
            Experience real-time speech emotion recognition powered by deep learning and advanced audio features.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={handleGetStarted}
            sx={{
              fontWeight: 700,
              fontSize: '1.1rem',
              px: 4,
              py: 1.5,
              borderRadius: 3,
              boxShadow: '0 2px 16px rgba(0,0,0,0.10)',
              background: '#3A59D1',
              color: '#fff',
              position: 'relative',
              overflow: 'hidden',
              transition: 'color 0.3s',
              zIndex: 1,
              '&:hover': {
                color: '#3A59D1',
                background: '#fff',
                '&::before': {
                  transform: 'translateX(0)',
                },
                '.animated-arrow': {
                  transform: 'rotate(90deg)',
                  color: '#3A59D1',
                },
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: '#fff',
                zIndex: 0,
                transform: 'translateX(-100%)',
                transition: 'transform 0.4s cubic-bezier(.77,0,.18,1)',
              },
              '& .MuiButton-startIcon, & .MuiButton-endIcon': {
                position: 'relative',
                zIndex: 2,
              },
              '& span': {
                position: 'relative',
                zIndex: 2,
                transition: 'color 0.3s',
              },
            }}
          >
            <span>Get Started</span>
            <ArrowForwardIcon
              className="animated-arrow"
              sx={{
                ml: 1,
                transition: 'transform 0.4s cubic-bezier(.77,0,.18,1), color 0.3s',
                color: '#fff',
              }}
            />
          </Button>
        </motion.div>
      </Box>
      {/* Model Preview Section */}
      <FadeInOnScroll y={60} duration={0.8}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: { xs: '2rem 1rem', md: '4rem 2rem' },
            background: unifiedBg,
            borderRadius: '24px',
            margin: { xs: '1rem', md: '2rem' },
            boxShadow: theme.palette.mode === 'dark'
              ? '0 8px 32px rgba(0, 0, 0, 0.3)'
              : '0 8px 32px rgba(0, 0, 0, 0.12)',
            border: `1.5px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(60,60,60,0.08)'}`,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ flex: 1, textAlign: 'left', zIndex: 1, padding: '0 2vw' }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                color: theme.palette.mode === 'dark' ? '#fff' : '#23243a',
                mb: 2,
                fontSize: { xs: '1.75rem', md: '2.25rem' },
                background: 'none',
                WebkitBackgroundClip: 'unset',
                WebkitTextFillColor: 'unset',
                textShadow: theme.palette.mode === 'dark'
                  ? '0 2px 8px rgba(0,0,0,0.32)'
                  : '0 2px 8px rgba(255,255,255,0.12)',
              }}
            >
              Watch Nimbus in Action
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.mode === 'dark' ? '#e0e0e0' : '#23243a',
                mb: 3,
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.6,
                textShadow: theme.palette.mode === 'dark'
                  ? '0 1px 4px rgba(0,0,0,0.18)'
                  : '0 1px 4px rgba(255,255,255,0.10)',
              }}
            >
              Experience the power of emotion through speech with Nimbus. Our advanced AI model analyzes speech patterns in real-time to detect and predict emotions with remarkable accuracy.
            </Typography>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={handleTryItNow}
                sx={{
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  px: 4,
                  py: 1.5,
                  borderRadius: 3,
                  boxShadow: '0 2px 16px rgba(0,0,0,0.10)',
                  background: '#3A59D1',
                  color: '#fff',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'color 0.3s',
                  zIndex: 1,
                  '&:hover': {
                    color: '#3A59D1',
                    background: '#fff',
                    '&::before': {
                      transform: 'translateX(0)',
                    },
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: '#fff',
                    zIndex: 0,
                    transform: 'translateX(-100%)',
                    transition: 'transform 0.4s cubic-bezier(.77,0,.18,1)',
                  },
                  '& .MuiButton-startIcon, & .MuiButton-endIcon': {
                    position: 'relative',
                    zIndex: 2,
                  },
                  '& span': {
                    position: 'relative',
                    zIndex: 2,
                    transition: 'color 0.3s',
                  },
                }}
              >
                <span>Try It Now</span>
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ flex: 1, textAlign: 'center', zIndex: 1, marginTop: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <Box
              sx={{
                aspectRatio: '16/9',
                width: { xs: '90vw', sm: '70vw', md: '32vw' },
                maxWidth: 600,
                minWidth: 240,
                borderRadius: '18px',
                overflow: 'hidden',
                boxShadow: theme.palette.mode === 'dark'
                  ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                  : '0 8px 32px rgba(0, 0, 0, 0.15)',
                border: 'none',
                background: theme.palette.mode === 'dark' ? '#232a4d' : '#f3f6fa',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src="/preview.gif"
                alt="Nimbus in Action"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '18px',
                  display: 'block',
                }}
              />
            </Box>
          </motion.div>
        </Box>
      </FadeInOnScroll>
      {/* Unified Info Cards Section (moved further down) */}
      <Box
        ref={infoCardsRef}
        sx={{
          py: { xs: 10, md: 16 },
          background: 'transparent',
          px: { xs: 2, md: 0 },
        }}
      >
        <Typography variant="h4" align="center" fontWeight={700} sx={{ mb: 6, color: '#fff', textShadow: '0 2px 16px rgba(0,0,0,0.10)' }}>
          Don't Just Speak. Be Understood.
        </Typography>
        <FadeInOnScroll y={60} duration={0.8}>
          <InfoCards />
        </FadeInOnScroll>
      </Box>
    </Box>
  );
}
