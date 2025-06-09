import React, { useState, useEffect } from 'react';
import { Box, Typography, useTheme, Collapse, IconButton, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { motion } from 'framer-motion';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { styled } from '@mui/material/styles';

// Animated background blob component
const AnimatedBlob = motion(Box);

// Glassy card for collapsible sections
const GlassySection = styled(Box)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'rgba(58, 89, 209, 0.18)' // bluish glass for dark
    : 'rgba(163, 184, 248, 0.32)', // bluish glass for light
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

const About = () => {
  const [isTechGeek, setIsTechGeek] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [expandedSections, setExpandedSections] = useState({});
  const theme = useTheme();

  // Define the gradient colors
  const gradientColors = {
    primary: '#3A59D1',
    secondary: '#232a4d'
  };

  useEffect(() => {
    // Show form when component mounts
    setShowForm(true);
  }, []);

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const SectionHeader = ({ id, title, level }) => {
    const isExpanded = expandedSections[id] || false;
    return (
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
        onClick={() => toggleSection(id)}
      >
        <Typography
          variant={level === 1 ? 'h2' : level === 2 ? 'h3' : 'h4'}
          sx={{
            fontSize: level === 1 ? { xs: '1.5rem', md: '2rem' } : level === 2 ? { xs: '1.25rem', md: '1.5rem' } : { xs: '1.1rem', md: '1.2rem' },
            fontWeight: 700,
            color: theme.palette.text.primary,
            m: 0,
            fontFamily: 'Inter, Roboto, Arial, sans-serif',
            textAlign: 'left',
          }}
        >
          {title}
        </Typography>
        <IconButton>
          {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
    );
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      width: '100vw',
      position: 'relative',
      color: theme.palette.text.primary,
      pt: { xs: 10, md: 12 }, // margin-top for header
      pb: 12,
      overflowX: 'hidden',
      background: theme.palette.mode === 'dark'
        ? 'linear-gradient(120deg, #232a4d 0%, #3A59D1 100%)'
        : 'linear-gradient(120deg, #3A59D1 0%, #a3b8f8 100%)',
    }}>
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
      {/* Tech Geek Form Overlay */}
      {isTechGeek === null ? (
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          mt: { xs: 6, md: 10 },
          mb: 2,
        }}>
          <span style={{ fontSize: 48, marginBottom: 8 }}>🤓</span>
          <FormLabel component="legend" sx={{ mb: 2, fontSize: 22, fontWeight: 700, letterSpacing: 0.5, color: theme => theme.palette.primary.main }}>
            Are you a tech geek?
          </FormLabel>
          <FormControl component="fieldset" sx={{ width: '100%' }}>
            <RadioGroup
              row
              aria-label="tech-geek"
              name="tech-geek-group"
              sx={{ justifyContent: 'center', gap: 4, mb: 2 }}
              onChange={e => {
                setIsTechGeek(e.target.value === 'yes');
              }}
              value={isTechGeek === null ? '' : isTechGeek ? 'yes' : 'no'}
            >
              <FormControlLabel
                value="yes"
                control={<Radio sx={{
                  color: '#3A59D1',
                  '&.Mui-checked': { color: '#3A59D1' },
                  transform: 'scale(1.3)',
                }} />}
                label={<span style={{ fontSize: 18, fontWeight: 600 }}>Yes</span>}
              />
              <FormControlLabel
                value="no"
                control={<Radio sx={{
                  color: '#232a4d',
                  '&.Mui-checked': { color: '#232a4d' },
                  transform: 'scale(1.3)',
                }} />}
                label={<span style={{ fontSize: 18, fontWeight: 600 }}>No</span>}
              />
            </RadioGroup>
          </FormControl>
          <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary', fontSize: 15 }}>
            Your answer helps us personalize your experience!
          </Typography>
        </Box>
      ) : (
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '20vh',
          mt: { xs: 6, md: 10 },
          mb: 2,
        }}>
          <Typography variant="h5" sx={{ mt: 4, fontWeight: 700, color: theme => theme.palette.primary.main }}>
            {isTechGeek ? "Welcome, tech geek! 🚀" : "No worries, you're awesome too!"}
          </Typography>
        </Box>
      )}

      {/* Main Content - only show if isTechGeek !== null */}
      {isTechGeek !== null && (
        <Box sx={{ width: '100%', maxWidth: 1100, mx: 'auto', position: 'relative', zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {(!showForm && isTechGeek) ? (
              // Technical Content Section
              <Box sx={{
                width: '100%',
                px: { xs: 1, md: 2 },
                '& p, & ul, & li': {
                  fontSize: { xs: '1rem', md: '1.08rem' },
                  lineHeight: 1.7,
                  color: theme.palette.text.secondary,
                  fontFamily: 'Inter, Roboto, Arial, sans-serif',
                  textAlign: 'left',
                  mb: 1.5,
                },
                '& ul': {
                  pl: 3,
                  mb: 2,
                },
                '& li': {
                  mb: 0.5,
                },
              }}>
                <Typography
                  variant="h1"
                  sx={{
                    fontFamily: `'Playfair Display', 'Merriweather', serif`,
                    fontSize: { xs: '2rem', md: '2.7rem', lg: '3.2rem' },
                    fontWeight: 800,
                    mb: 4,
                    background: theme.palette.mode === 'dark'
                      ? 'none'
                      : `linear-gradient(45deg, ${gradientColors.primary}, ${gradientColors.secondary})`,
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
                  Speech Emotion Recognition System: A Comprehensive Technical Overview
                </Typography>
                <Typography variant="body1" paragraph sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto', mb: 4 }}>
                  This page presents an in-depth technical walkthrough of our Speech Emotion Recognition (SER) System, which enables machines to detect and interpret human emotions from speech using cutting-edge machine learning and audio signal processing. Designed with scalability, accuracy, and real-time responsiveness in mind, this system combines a thoughtfully crafted frontend interface with a robust backend pipeline to deliver efficient and insightful emotion recognition.
                </Typography>
                <GlassySection>
                  <SectionHeader id="system-architecture" title="1. System Architecture" level={2} />
                  <Collapse in={expandedSections['system-architecture']}>
                    <Box sx={{ pl: 2 }}>
                      <SectionHeader id="frontend-overview" title="1.1 Frontend Overview" level={3} />
                      <Collapse in={expandedSections['frontend-overview']}>
                        <Box sx={{ pl: 2 }}>
                          <Typography variant="body1" paragraph>
                            The frontend is engineered for clarity, responsiveness, and ease of use:
                          </Typography>
                          <Box component="ul">
                            <li><strong>Technology Stack:</strong> Built with React.js for performance and flexibility.</li>
                            <li><strong>UI/UX Design:</strong> Uses Material-UI for a sleek, modern look with support for both dark and light modes, catering to user preferences.</li>
                            <li><strong>Audio Input Mechanisms:</strong>
                              <ul>
                                <li>Live microphone recording directly through the browser.</li>
                                <li>Audio file upload capability supporting multiple formats (WAV, MP3).</li>
                              </ul>
                            </li>
                            <li><strong>Visualization Tools:</strong>
                              <ul>
                                <li>Real-time emotion prediction graphs.</li>
                                <li>Dynamic confidence scores and class probability visualizations.</li>
                              </ul>
                            </li>
                            <li><strong>Usability:</strong> Designed with accessibility, minimal learning curve, and intuitive navigation in mind.</li>
                          </Box>
                        </Box>
                      </Collapse>

                      <SectionHeader id="backend-overview" title="1.2 Backend Overview" level={3} />
                      <Collapse in={expandedSections['backend-overview']}>
                        <Box sx={{ pl: 2 }}>
                          <Typography variant="body1" paragraph>
                            Our backend provides the logic and intelligence behind the interface:
                          </Typography>
                          <Box component="ul">
                            <li><strong>Framework:</strong> Developed using Flask, a lightweight and efficient Python-based web framework.</li>
                            <li><strong>Database:</strong> Integrated SQLite for managing:
                              <ul>
                                <li>User accounts and authentication data.</li>
                                <li>Uploaded audio files and associated metadata.</li>
                                <li>Prediction results and session history.</li>
                              </ul>
                            </li>
                            <li><strong>Security and Compliance:</strong>
                              <ul>
                                <li>CORS-enabled for safe cross-origin communication.</li>
                                <li>Flask-Login for user session control.</li>
                                <li>Secure file handling, input validation, and session tracking mechanisms.</li>
                              </ul>
                            </li>
                          </Box>
                        </Box>
                      </Collapse>
                    </Box>
                  </Collapse>
                </GlassySection>

                <GlassySection>
                  <SectionHeader id="audio-processing" title="2. Audio Processing Pipeline" level={2} />
                  <Collapse in={expandedSections['audio-processing']}>
                    <Box sx={{ pl: 2 }}>
                      <Typography variant="body1" paragraph>
                        A robust and carefully optimized audio processing pipeline is central to accurate emotion detection.
                      </Typography>

                      <SectionHeader id="feature-extraction" title="2.1 Feature Extraction" level={3} />
                      <Collapse in={expandedSections['feature-extraction']}>
                        <Box sx={{ pl: 2 }}>
                          <Typography variant="body1" paragraph>
                            We extract high-dimensional feature representations from raw audio inputs using signal processing techniques optimized for speech-based applications.
                          </Typography>
                          <Box component="ul">
                            <li><strong>MFCC (Mel-Frequency Cepstral Coefficients)</strong>
                              <ul>
                                <li><strong>Purpose:</strong> Captures vocal tract configuration — fundamental in speech recognition.</li>
                                <li><strong>Configuration:</strong>
                                  <ul>
                                    <li>40 coefficients per frame</li>
                                    <li>Sample Rate: 22,050 Hz</li>
                                    <li>Clip Duration: 3 seconds</li>
                                    <li>Window Size: 2048 samples</li>
                                    <li>Hop Length: 512 samples</li>
                                  </ul>
                                </li>
                              </ul>
                            </li>
                            <li><strong>Chroma Features</strong>
                              <ul>
                                <li><strong>Purpose:</strong> Represents pitch class distribution, useful for capturing tonal aspects.</li>
                                <li><strong>Derived From:</strong> Short-Time Fourier Transform (STFT)</li>
                                <li><strong>Output:</strong> 12-dimensional vector per frame</li>
                              </ul>
                            </li>
                            <li><strong>Mel Spectrogram</strong>
                              <ul>
                                <li><strong>Purpose:</strong> Captures energy distribution in the mel scale — reflects timbre and loudness.</li>
                                <li><strong>Configuration:</strong>
                                  <ul>
                                    <li>128 Mel bands</li>
                                    <li>Power: 2.0 (power spectrogram)</li>
                                    <li>Hann window applied</li>
                                    <li>Frames centered during analysis</li>
                                  </ul>
                                </li>
                              </ul>
                            </li>
                          </Box>
                        </Box>
                      </Collapse>
                    </Box>
                  </Collapse>
                </GlassySection>

                <GlassySection>
                  <SectionHeader id="ml-model" title="3. Machine Learning Model" level={2} />
                  <Collapse in={expandedSections['ml-model']}>
                    <Box sx={{ pl: 2 }}>
                      <Typography variant="body1" paragraph>
                        Our SER system employs a proven and efficient ensemble approach to classify emotional states.
                      </Typography>
                      
                      <SectionHeader id="model-architecture" title="3.1 Model Architecture" level={3} />
                      <Collapse in={expandedSections['model-architecture']}>
                        <Box sx={{ pl: 2 }}>
                          <Typography variant="body1" paragraph>
                            Classifier Used: Random Forest — chosen for its:
                          </Typography>
                          <Box component="ul">
                            <li>Interpretability</li>
                            <li>Resistance to overfitting</li>
                            <li>Capability to handle noisy and high-dimensional data</li>
                          </Box>
                          <Typography variant="body1" paragraph>
                            Specifications:
                          </Typography>
                          <Box component="ul">
                            <li>100 decision trees</li>
                            <li>Outputs both class labels and probability distributions</li>
                          </Box>
                        </Box>
                      </Collapse>

                      <SectionHeader id="training-methodology" title="3.2 Training Methodology" level={3} />
                      <Collapse in={expandedSections['training-methodology']}>
                        <Box sx={{ pl: 2 }}>
                          <Typography variant="body1" paragraph>
                            Preprocessing:
                          </Typography>
                          <Box component="ul">
                            <li>Input audio is segmented into 3-second non-overlapping clips</li>
                            <li>Features are extracted and preprocessed</li>
                            <li>Labels for 7 emotion classes are one-hot encoded</li>
                            <li>Augmentation techniques (e.g., noise injection, pitch shifting) used to enhance model robustness</li>
                          </Box>
                          <Typography variant="body1" paragraph>
                            Model Training:
                          </Typography>
                          <Box component="ul">
                            <li>StandardScaler used to normalize feature space</li>
                            <li>Stratified k-fold cross-validation ensures generalizability</li>
                            <li>Hyperparameters (number of trees, max depth) are tuned via grid search</li>
                            <li>Final model persisted using joblib for deployment</li>
                          </Box>
                        </Box>
                      </Collapse>

                      <SectionHeader id="emotion-classes" title="3.3 Emotion Classes" level={3} />
                      <Collapse in={expandedSections['emotion-classes']}>
                        <Box sx={{ pl: 2 }}>
                          <Typography variant="body1" paragraph>
                            The model is trained to recognize seven primary human emotions:
                          </Typography>
                          <Box component="ul">
                            <li>Angry</li>
                            <li>Disgust</li>
                            <li>Fear</li>
                            <li>Happy</li>
                            <li>Neutral</li>
                            <li>Sad</li>
                            <li>Surprise</li>
                          </Box>
                          <Typography variant="body1" paragraph>
                            Each prediction is accompanied by a confidence score, reflecting the model's certainty.
                          </Typography>
                        </Box>
                      </Collapse>
                    </Box>
                  </Collapse>
                </GlassySection>

                <GlassySection>
                  <SectionHeader id="rest-api" title="4. REST API Endpoints" level={2} />
                  <Collapse in={expandedSections['rest-api']}>
                    <Box sx={{ pl: 2 }}>
                      <Typography variant="body1" paragraph>
                        The system exposes RESTful endpoints to facilitate interaction between the user interface and backend logic.
                      </Typography>

                      <SectionHeader id="prediction-endpoint" title="4.1 Prediction Endpoint" level={3} />
                      <Collapse in={expandedSections['prediction-endpoint']}>
                        <Box sx={{ pl: 2 }}>
                          <Typography variant="body1" paragraph>
                            POST /predict
                          </Typography>
                          <Box component="ul">
                            <li>Accepts audio files via multipart/form-data</li>
                            <li>Supports WAV, MP3</li>
                            <li>Processes and returns:
                              <ul>
                                <li>Predicted emotion label</li>
                                <li>Probability distribution across all emotion classes</li>
                              </ul>
                            </li>
                          </Box>
                        </Box>
                      </Collapse>

                      <SectionHeader id="auth-endpoints" title="4.2 Authentication Endpoints" level={3} />
                      <Collapse in={expandedSections['auth-endpoints']}>
                        <Box sx={{ pl: 2 }}>
                          <Box component="ul">
                            <li>/register: User registration with input validation</li>
                            <li>/login: Secure login with password hashing</li>
                            <li>/logout: Ends user session securely</li>
                            <li>/profile: Returns user data and prediction history</li>
                          </Box>
                        </Box>
                      </Collapse>
                    </Box>
                  </Collapse>
                </GlassySection>

                <GlassySection>
                  <SectionHeader id="database" title="5. Database Schema" level={2} />
                  <Collapse in={expandedSections['database']}>
                    <Box sx={{ pl: 2 }}>
                      <Typography variant="body1" paragraph>
                        AudioFile Table
                      </Typography>
                      <Box component="ul">
                        <li>id: Unique identifier</li>
                        <li>file_name: Original uploaded filename</li>
                        <li>path: Server path to stored file</li>
                        <li>upload_date: Timestamp of submission</li>
                        <li>is_recorded: Boolean flag indicating live-recorded or uploaded</li>
                        <li>predicted_emotion: Output from model</li>
                        <li>confidence_scores: Serialized array of emotion probabilities</li>
                        <li>user_id: Foreign key referencing the user</li>
                      </Box>
                    </Box>
                  </Collapse>
                </GlassySection>

                <GlassySection>
                  <SectionHeader id="performance" title="6. Performance Optimizations" level={2} />
                  <Collapse in={expandedSections['performance']}>
                    <Box sx={{ pl: 2 }}>
                      <SectionHeader id="audio-processing-opt" title="6.1 Audio Processing" level={3} />
                      <Collapse in={expandedSections['audio-processing-opt']}>
                        <Box sx={{ pl: 2 }}>
                          <Box component="ul">
                            <li>Processes in fixed-length (3s) chunks for consistent feature vectors</li>
                            <li>Batch processing and multithreading enabled for faster throughput</li>
                            <li>Uses memory-mapped arrays to reduce RAM usage for large files</li>
                          </Box>
                        </Box>
                      </Collapse>

                      <SectionHeader id="model-inference" title="6.2 Model Inference" level={3} />
                      <Collapse in={expandedSections['model-inference']}>
                        <Box sx={{ pl: 2 }}>
                          <Box component="ul">
                            <li>Predictions are executed via pre-loaded model instance in memory</li>
                            <li>Responses generated within milliseconds per segment</li>
                            <li>System optimized for real-time usage, even on consumer-grade hardware</li>
                          </Box>
                        </Box>
                      </Collapse>
                    </Box>
                  </Collapse>
                </GlassySection>

                <GlassySection>
                  <SectionHeader id="security" title="7. Security Framework" level={2} />
                  <Collapse in={expandedSections['security']}>
                    <Box sx={{ pl: 2 }}>
                      <Typography variant="body1" paragraph>
                        Security is woven into the entire design:
                      </Typography>
                      <Box component="ul">
                        <li>Password Hashing: Using Werkzeug with salt</li>
                        <li>Session Management: Via Flask-Login</li>
                        <li>CORS Protection: Cross-domain access control</li>
                        <li>Input Validation: All file types and form inputs are sanitized</li>
                        <li>Secure Storage: Files stored with randomized names and access control</li>
                        <li>Error Logging: Structured logs for monitoring and diagnostics</li>
                      </Box>
                    </Box>
                  </Collapse>
                </GlassySection>

                <GlassySection>
                  <SectionHeader id="future" title="8. Future Development Roadmap" level={2} />
                  <Collapse in={expandedSections['future']}>
                    <Box sx={{ pl: 2 }}>
                      <Typography variant="body1" paragraph>
                        The system is architected with future extensibility in mind. Planned enhancements include:
                      </Typography>

                      <SectionHeader id="model-upgrades" title="Model Upgrades" level={3} />
                      <Collapse in={expandedSections['model-upgrades']}>
                        <Box sx={{ pl: 2 }}>
                          <Box component="ul">
                            <li>Transition to LSTM or CNN-based deep learning models for temporal emotion modeling</li>
                            <li>Transfer learning from large-scale pre-trained models</li>
                            <li>Addition of compound/mixed emotions and contextual emotion prediction</li>
                          </Box>
                        </Box>
                      </Collapse>

                      <SectionHeader id="system-enhancements" title="System Enhancements" level={3} />
                      <Collapse in={expandedSections['system-enhancements']}>
                        <Box sx={{ pl: 2 }}>
                          <Box component="ul">
                            <li>Real-time emotion tracking in long conversations or live calls</li>
                            <li>Batch processing mode for analyzing datasets</li>
                            <li>Data visualization dashboards for emotion trends over time</li>
                            <li>API throttling and caching for performance and protection</li>
                            <li>Integration with cloud storage (e.g., AWS S3, GCP)</li>
                          </Box>
                        </Box>
                      </Collapse>

                      <SectionHeader id="user-features" title="User-Focused Features" level={3} />
                      <Collapse in={expandedSections['user-features']}>
                        <Box sx={{ pl: 2 }}>
                          <Box component="ul">
                            <li>Mobile application for emotion feedback on-the-go</li>
                            <li>Live coaching or adaptive interaction based on detected emotion</li>
                            <li>Historical emotion tracking for longitudinal mental health analysis</li>
                            <li>Custom training module where users train the model on their own voice/emotions</li>
                            <li>Multi-language support for global applicability</li>
                          </Box>
                        </Box>
                      </Collapse>
                    </Box>
                  </Collapse>
                </GlassySection>

                <Typography variant="body1" paragraph sx={{ mt: 4 }}>
                  Our Speech Emotion Recognition System represents a synergy of modern frontend technologies, robust backend architecture, intelligent audio feature extraction, and reliable machine learning. Designed for researchers, developers, and product designers alike, it serves as a flexible foundation for emotion-aware applications — from mental health monitoring to smart assistants and beyond.
                </Typography>
                <Typography variant="body1" paragraph>
                  Whether you're using it to build emotion-sensing apps or to explore the emotional fabric of human speech, this system is built to deliver high-quality, interpretable insights — fast, secure, and reliably.
                </Typography>
              </Box>
            ) : (
              // Simplified Content Section
              <>
                <Typography
                  variant="h1"
                  sx={{
                    fontFamily: `'Playfair Display', 'Merriweather', serif`,
                    fontSize: { xs: '2rem', md: '2.7rem', lg: '3.2rem' },
                    fontWeight: 800,
                    mb: 3,
                    background: theme.palette.mode === 'dark'
                      ? 'none'
                      : `linear-gradient(45deg, ${gradientColors.primary}, ${gradientColors.secondary})`,
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
                  Speech Emotion Recognition: Simple Overview
                </Typography>
                <Typography variant="body1" paragraph sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto', mb: 4 }}>
                  Discover how Nimbus understands your emotions from speech, in a way anyone can grasp. No tech jargon—just the magic of AI, made simple.
                </Typography>

                <GlassySection>
                  <SectionHeader id="about-emotion-model" title="About the Emotion Recognition Model" level={2} />
                  <Collapse in={expandedSections['about-emotion-model']}>
                    <Box sx={{ pl: 2 }}>
                      <Typography variant="body1" paragraph>
                        Our Speech Emotion Recognition System is built to listen to your voice and understand how you're feeling — whether you're happy, sad, excited, or even surprised. It's a smart blend of artificial intelligence and sound analysis, working behind the scenes to bring emotions into the digital world.
                      </Typography>
                    </Box>
                  </Collapse>
                </GlassySection>

                <GlassySection>
                  <SectionHeader id="how-it-works" title="How It Works – In Simple Terms" level={2} />
                  <Collapse in={expandedSections['how-it-works']}>
                    <Box sx={{ pl: 2 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>1. Your Voice, Our Ears</Typography>
                      <Box component="ul">
                        <li>The system listens to it carefully.</li>
                        <li>It breaks it down into small 3-second pieces.</li>
                        <li>It looks at how you speak — not just what you say.</li>
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, mt: 2, mb: 1 }}>2. Listening Beyond Words</Typography>
                      <Box component="ul">
                        <li>Tone and pitch (Are you shouting, whispering, or calm?)</li>
                        <li>Rhythm (Are you speaking fast, slow, or hesitating?)</li>
                        <li>Energy levels (Are you excited or quiet?)</li>
                      </Box>
                      <Typography variant="body1" paragraph>
                        These patterns are turned into numbers — like a fingerprint of your voice's emotion.
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 600, mt: 2, mb: 1 }}>3. The Emotion Brain (AI Model)</Typography>
                      <Typography variant="body1" paragraph>
                        Once your voice is analyzed:
                      </Typography>
                      <Box component="ul">
                        <li>Our trained AI model guesses what emotion you're expressing.</li>
                        <li>It chooses from 7 emotions:
                          <ul>
                            <li>Angry</li>
                            <li>Disgust</li>
                            <li>Fear</li>
                            <li>Happy</li>
                            <li>Neutral</li>
                            <li>Sad</li>
                            <li>Surprise</li>
                          </ul>
                        </li>
                        <li>It also tells how sure it is about each guess.</li>
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, mt: 2, mb: 1 }}>4. The Visual Magic</Typography>
                      <Box component="ul">
                        <li>What emotion was detected.</li>
                        <li>How confident the system is.</li>
                        <li>Visual graphs to help you understand the result better.</li>
                      </Box>
                    </Box>
                  </Collapse>
                </GlassySection>

                <GlassySection>
                  <SectionHeader id="whats-under-hood" title="What's Under the Hood?" level={2} />
                  <Collapse in={expandedSections['whats-under-hood']}>
                    <Box sx={{ pl: 2 }}>
                      <Typography variant="body1" paragraph>
                        Even though it's simple to use, this system is packed with smart technology:
                      </Typography>
                      <Box component="ul">
                        <li>Modern website design that works well on phones and computers.</li>
                        <li>Real-time recording directly in your browser.</li>
                        <li>Secure login to keep your files and results safe.</li>
                        <li>Fast and accurate predictions, even for long recordings.</li>
                      </Box>
                    </Box>
                  </Collapse>
                </GlassySection>

                <GlassySection>
                  <SectionHeader id="why-it-matters" title="Why It Matters" level={2} />
                  <Collapse in={expandedSections['why-it-matters']}>
                    <Box sx={{ pl: 2 }}>
                      <Typography variant="body1" paragraph>
                        Emotion recognition is being used in:
                      </Typography>
                      <Box component="ul">
                        <li><strong>Mental health:</strong> To track moods over time.</li>
                        <li><strong>Customer service:</strong> To know how customers feel.</li>
                        <li><strong>Education:</strong> To help teachers understand student reactions.</li>
                        <li><strong>Smart assistants:</strong> To make machines more human-aware.</li>
                      </Box>
                      <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                        And with our system, you're getting a peek into that future — right from your browser.
                      </Typography>
                    </Box>
                  </Collapse>
                </GlassySection>

                <GlassySection>
                  <SectionHeader id="whats-coming-next" title="What's Coming Next?" level={2} />
                  <Collapse in={expandedSections['whats-coming-next']}>
                    <Box sx={{ pl: 2 }}>
                      <Typography variant="body1" paragraph>
                        We're constantly improving. Here's what's on the horizon:
                      </Typography>
                      <Box component="ul">
                        <li>Adding more emotions and subtle tones.</li>
                        <li>Creating a mobile app.</li>
                        <li>Letting users train the system on their own voice.</li>
                        <li>Supporting more languages.</li>
                        <li>Showing how your emotions change over time with visual history.</li>
                      </Box>
                    </Box>
                  </Collapse>
                </GlassySection>

                <GlassySection>
                  <SectionHeader id="built-with-care" title="Built with Care" level={2} />
                  <Collapse in={expandedSections['built-with-care']}>
                    <Box sx={{ pl: 2 }}>
                      <Typography variant="body1" paragraph>
                        This project is the result of hard work, passion for AI, and a goal to make machines a little more human. Whether you're a developer, a researcher, or just curious — this system is made for you to explore the emotional depth of your voice.
                      </Typography>
                    </Box>
                  </Collapse>
                </GlassySection>
              </>
            )}
          </motion.div>
        </Box>
      )}
    </Box>
  );
};

export default About; 