import React from 'react';
import styled from 'styled-components';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import EditNoteIcon from '@mui/icons-material/EditNote';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import { Button, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FadeInOnScroll from './FadeInOnScroll';

const InfoCards = () => {
  const theme = useTheme();
  return (
    <StyledWrapper mode={theme.palette.mode}>
      <div className="container">
        <FadeInOnScroll y={40} duration={0.7}>
          <div data-text="About the Model" style={{ '--r': -15 }} className="glass">
            <PsychologyAltIcon style={{ fontSize: 48, color: '#4F8DFD' }} />
            <div className="card-content">
              <h3 style={{ color: theme.palette.text.primary }}>About the Model</h3>
              <p style={{ color: theme.palette.text.secondary }}>
                Our deep learning model is trained on thousands of speech samples to accurately detect emotions like happiness, sadness, anger, and more in real time.
              </p>
              <Button
                component={RouterLink}
                to="/about"
                variant="outlined"
                color="info"
                sx={{ 
                  fontWeight: 600, 
                  mt: 1,
                  borderColor: '#4F8DFD',
                  color: '#4F8DFD',
                  '&:hover': {
                    borderColor: '#4F8DFD',
                    backgroundColor: 'rgba(79, 141, 253, 0.08)'
                  }
                }}
              >
                Learn More
              </Button>
            </div>
          </div>
        </FadeInOnScroll>
        <FadeInOnScroll y={40} duration={0.7}>
          <div data-text="Audio Editor" style={{ '--r': 5 }} className="glass">
            <EditNoteIcon style={{ fontSize: 48, color: '#F6B17A' }} />
            <div className="card-content">
              <h3 style={{ color: theme.palette.text.primary }}>Audio Editor</h3>
              <p style={{ color: theme.palette.text.secondary }}>
                Edit, trim, and enhance your audio files right in your browser. Export your creations in multiple formats with our intuitive, theme-adaptive editor.
              </p>
              <Button
                component={RouterLink}
                to="/audio-editor"
                variant="outlined"
                color="warning"
                sx={{ fontWeight: 600, mt: 1 }}
              >
                Go to Audio Editor
              </Button>
            </div>
          </div>
        </FadeInOnScroll>
        <FadeInOnScroll y={40} duration={0.7}>
          <div data-text="Predict Emotion" style={{ '--r': 25 }} className="glass">
            <EmojiObjectsIcon style={{ fontSize: 48, color: '#4CAF50' }} />
            <div className="card-content">
              <h3 style={{ color: theme.palette.text.primary }}>Predict Emotion</h3>
              <p style={{ color: theme.palette.text.secondary }}>
                Ready to try? Head to the dashboard and analyze your own speech or audio files instantly.
              </p>
              <Button
                component={RouterLink}
                to="/dashboard"
                variant="outlined"
                color="success"
                sx={{ fontWeight: 600, mt: 1 }}
              >
                Go to Dashboard
              </Button>
            </div>
          </div>
        </FadeInOnScroll>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: stretch;
    gap: 0;
    margin-top: 0;
    margin-bottom: 0;
  }

  .glass {
    position: relative;
    width: 320px;
    min-height: 300px;
    background: ${({ mode }) =>
      mode === 'dark'
        ? 'rgba(24, 26, 32, 0.85)'
        : 'rgba(255,255,255,0.10)'};
    border: 1.5px solid rgba(255, 255, 255, 0.18);
    box-shadow: 0 18px 32px 0 rgba(58,89,209,0.10);
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: 0.5s;
    border-radius: 18px;
    margin: 0 -45px;
    backdrop-filter: blur(18px);
    transform: rotate(calc(var(--r) * 1deg));
    padding: 32px 20px 24px 20px;
    z-index: 1;
  }

  .container:hover .glass {
    transform: rotate(0deg);
    margin: 0 10px;
    z-index: 2;
  }

  .glass svg {
    margin-bottom: 12px;
  }

  .card-content {
    text-align: center;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .card-content h3 {
    margin: 0 0 8px 0;
    font-size: 1.2rem;
    font-weight: 700;
    /* color: #232946; */
  }

  .card-content p {
    font-size: 1rem;
    /* color: #444; */
    margin-bottom: 0;
  }
`;

export default InfoCards; 