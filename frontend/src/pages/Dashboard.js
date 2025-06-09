import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Button,
  Alert,
  useTheme,
  IconButton
} from '@mui/material';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import MicIcon from '@mui/icons-material/Mic';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import axios from 'axios';
import Loader from '../components/Loader';

const getStartedButtonSx = {
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
      transform: 'translateX(0)'
    }
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
    transition: 'transform 0.4s cubic-bezier(.77,0,.18,1)'
  },
  '& .MuiButton-startIcon, & .MuiButton-endIcon': {
    position: 'relative',
    zIndex: 2
  },
  '& span': {
    position: 'relative',
    zIndex: 2,
    transition: 'color 0.3s'
  }
};

function Dashboard() {
  const [activeTab, setActiveTab] = useState(0); // 0: Record, 1: Upload
  const [recording, setRecording] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [audioDuration, setAudioDuration] = useState(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioRef = useRef(null);
  const fileInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const theme = useTheme();

  const handleReset = () => {
    setResult(null);
    setError('');
    setAudioFile(null);
    setAudioUrl(null);
    setAudioDuration(null);
    setAudioPlaying(false);
  };

  const handleSaveToHistory = () => {
    // TODO: Implement save to history logic
    alert('Result saved to history!');
  };

  const formatDuration = (seconds) => {
    if (!seconds) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (audioPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setAudioPlaying(!audioPlaying);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new window.MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        await analyzeAudio(audioBlob);
      };

      mediaRecorder.start();
      setRecording(true);
      setError('');
    } catch (err) {
      setError('Error accessing microphone. Please ensure you have granted microphone permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setRecording(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioFile(file);
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
      // Get duration
      const audio = new window.Audio(url);
      audio.addEventListener('loadedmetadata', () => {
        setAudioDuration(audio.duration);
      });
      await analyzeAudio(file);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const analyzeAudio = async (audioBlob) => {
    setAnalyzing(true);
    setError('');
    setResult(null);
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob);
      const response = await axios.post('/api/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      // Debug: log the response
      console.log('API /api/predict response:', response.data);

      // Check for required fields
      if (
        response.data &&
        typeof response.data.emotion === 'string' &&
        typeof response.data.confidence === 'number' &&
        typeof response.data.probabilities === 'object'
      ) {
        setResult(response.data);
      } else {
        setError('Invalid response from server. Please check backend.');
        setResult(null);
      }
    } catch (err) {
      setError('Error analyzing audio. Please try again.');
      setResult(null);
    } finally {
      setAnalyzing(false);
    }
  };

  const formatChartData = () => {
    if (!result || !result.probabilities) return [];
    return Object.entries(result.probabilities).map(([emotion, probability]) => ({
      emotion,
      probability: probability * 100,
    }));
  };

  // Theme-adaptive colors
  const accentColor = '#F6B17A';
  const chartBarColor = theme.palette.mode === 'dark' ? '#F6B17A' : '#3A59D1';
  const chartTooltipBg = theme.palette.mode === 'dark' ? 'rgba(30, 32, 40, 0.92)' : 'rgba(255,255,255,0.98)';
  const chartTooltipText = theme.palette.mode === 'dark' ? '#fff' : '#23243a';
  const resetBtnBg = theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(60,60,60,0.06)';
  const resetBtnText = theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.dark;
  const resetBtnHoverBg = theme.palette.primary.main;
  const resetBtnHoverText = theme.palette.getContrastText(theme.palette.primary.main);
  const audioInfoBg = theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.10)' : 'rgba(60,60,60,0.04)';
  const audioInfoText = theme.palette.mode === 'dark' ? '#fff' : '#23243a';

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflowY: 'auto',
        overflowX: 'hidden',
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #23243a 0%, #2d3142 100%)'
          : 'linear-gradient(135deg, #f7f8fa 0%, #e9eafc 100%)',
        fontFamily: 'Playfair Display, Merriweather, serif',
        px: 2,
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', zIndex: 1, py: { xs: 4, md: 8 }, pb: { xs: 20, md: 24 } }}>
        <Typography
          variant="h3"
          align="center"
          fontWeight={700}
          gutterBottom
          sx={{
            fontFamily: 'Playfair Display, Merriweather, serif',
            fontSize: { xs: '2rem', md: '2.5rem' },
            letterSpacing: '-1px',
            mb: 1,
          }}
        >
          Predict <Box component="span" sx={{ color: accentColor }}>Emotion</Box> from Speech
        </Typography>
        {/* Side by side animated buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
          <motion.div
            whileHover={{ scale: 1.07 }}
            animate={activeTab === 0 ? { scale: 1.12 } : { scale: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Button
              variant="contained"
              startIcon={<MicIcon />}
              onClick={() => setActiveTab(0)}
              sx={{
                ...getStartedButtonSx,
                width: 150,
                background: activeTab === 0 ? '#3A59D1' : '#bfc8ec',
                color: activeTab === 0 ? '#fff' : '#3A59D1',
                boxShadow: activeTab === 0 ? '0 4px 16px 0 rgba(31, 38, 135, 0.10)' : 'none',
              }}
            >
              <span>Record</span>
            </Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.07 }}
            animate={activeTab === 1 ? { scale: 1.12 } : { scale: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Button
              variant="contained"
              startIcon={<UploadFileIcon />}
              onClick={() => setActiveTab(1)}
              sx={{
                ...getStartedButtonSx,
                width: 150,
                background: activeTab === 1 ? '#3A59D1' : '#bfc8ec',
                color: activeTab === 1 ? '#fff' : '#3A59D1',
                boxShadow: activeTab === 1 ? '0 4px 16px 0 rgba(31, 38, 135, 0.10)' : 'none',
              }}
            >
              <span>Upload</span>
            </Button>
          </motion.div>
        </Box>
        {/* Audio info/player always shown if file is selected */}
        {activeTab === 1 && audioFile && audioUrl && (
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            mt: 2,
            mb: 2,
            px: 2,
            py: 1.5,
            borderRadius: 3,
            background: audioInfoBg,
            color: audioInfoText,
            boxShadow: '0 2px 8px 0 rgba(31, 38, 135, 0.08)',
            width: '100%',
            maxWidth: 320,
            mx: 'auto',
          }}>
            <IconButton onClick={handlePlayPause} color="primary" size="large">
              {audioPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="body2" noWrap sx={{ fontWeight: 600, fontFamily: 'Playfair Display, Merriweather, serif' }}>
                {audioFile.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {audioDuration ? formatDuration(audioDuration) : '...'}
              </Typography>
            </Box>
            <audio
              ref={audioRef}
              src={audioUrl}
              onEnded={() => setAudioPlaying(false)}
              onPause={() => setAudioPlaying(false)}
              onPlay={() => setAudioPlaying(true)}
              style={{ display: 'none' }}
            />
          </Box>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>
        )}
        <Box sx={{ minHeight: 170, position: 'relative' }}>
          <motion.div
            key={activeTab + '-content'}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 60 }}
            style={{ position: 'absolute', width: '100%' }}
          >
            {activeTab === 0 ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mt: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<MicIcon />}
                  onClick={recording ? stopRecording : startRecording}
                  disabled={analyzing}
                  sx={{ ...getStartedButtonSx, width: 210, mb: 2, background: '#3A59D1', color: '#fff' }}
                >
                  <span>{recording ? 'Stop Recording' : 'Record Audio'}</span>
                </Button>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', fontFamily: 'Playfair Display, Merriweather, serif' }}>
                  {recording ? 'Recording... Speak now!' : 'Click the button to record your voice.'}
                </Typography>
                {/* Show result or loader below */}
                <Box sx={{ mt: 3, width: '100%' }}>
                  {analyzing ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
                      <Loader color={theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.primary.main} size={56} />
                      <Typography sx={{ mt: 2, fontFamily: 'Playfair Display, Merriweather, serif', color: theme.palette.text.primary }}>Analyzing audio...</Typography>
                    </Box>
                  ) : result ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ width: '100%', minHeight: 220, height: { xs: 240, md: 260 } }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={formatChartData()}>
                            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                            <XAxis dataKey="emotion" stroke={theme.palette.text.primary} style={{ fontFamily: 'Playfair Display, Merriweather, serif', fontWeight: 600 }} />
                            <YAxis stroke={theme.palette.text.primary} style={{ fontFamily: 'Playfair Display, Merriweather, serif', fontWeight: 600 }} />
                            <RechartsTooltip
                              contentStyle={{
                                background: chartTooltipBg,
                                border: '1.5px solid rgba(60,60,60,0.10)',
                                borderRadius: 12,
                                fontFamily: 'Playfair Display, Merriweather, serif',
                                color: chartTooltipText,
                              }}
                            />
                            <Bar dataKey="probability" fill={chartBarColor} radius={[8, 8, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </Box>
                      <Typography variant="h4" align="center" sx={{ mt: 2, fontWeight: 700, fontFamily: 'Playfair Display, Merriweather, serif', color: theme.palette.text.primary }}>
                        Predicted Emotion: <Box component="span" sx={{ color: accentColor }}>{result.emotion}</Box>
                      </Typography>
                      <Typography variant="body1" align="center" sx={{ color: theme.palette.text.secondary }}>
                        Confidence: {result.confidence ? (result.confidence * 100).toFixed(2) : '--'}%
                      </Typography>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleSaveToHistory}
                        sx={{ mt: 2, borderRadius: 999, fontWeight: 600, px: 4, py: 1.2, fontSize: '1.1rem' }}
                      >
                        Save to History
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<RestartAltIcon />}
                        onClick={handleReset}
                        sx={{
                          mt: 2,
                          borderRadius: 999,
                          fontFamily: 'Playfair Display, Merriweather, serif',
                          fontWeight: 600,
                          px: 4,
                          py: 1.2,
                          fontSize: '1.1rem',
                          color: resetBtnText,
                          borderColor: resetBtnText,
                          background: resetBtnBg,
                          '&:hover': {
                            background: resetBtnHoverBg,
                            color: resetBtnHoverText,
                            borderColor: resetBtnHoverBg,
                          },
                        }}
                      >
                        Reset
                      </Button>
                    </Box>
                  ) : null}
                </Box>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mt: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<UploadFileIcon />}
                  component="label"
                  disabled={analyzing}
                  sx={{ ...getStartedButtonSx, width: 210, mb: 2, background: '#3A59D1', color: '#fff' }}
                >
                  <span>Upload Audio</span>
                  <input
                    type="file"
                    accept="audio/*"
                    hidden
                    onChange={handleFileUpload}
                    ref={fileInputRef}
                  />
                </Button>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', fontFamily: 'Playfair Display, Merriweather, serif' }}>
                  Supported formats: WAV, MP3, etc.
                </Typography>
                {/* Show result or loader below */}
                <Box sx={{ mt: 3, width: '100%' }}>
                  {analyzing ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
                      <Loader color={theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.primary.main} size={56} />
                      <Typography sx={{ mt: 2, fontFamily: 'Playfair Display, Merriweather, serif', color: theme.palette.text.primary }}>Analyzing audio...</Typography>
                    </Box>
                  ) : result ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                      <Box sx={{ width: '100%', minHeight: 220, height: { xs: 240, md: 260 } }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={formatChartData()}>
                            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                            <XAxis dataKey="emotion" stroke={theme.palette.text.primary} style={{ fontFamily: 'Playfair Display, Merriweather, serif', fontWeight: 600 }} />
                            <YAxis stroke={theme.palette.text.primary} style={{ fontFamily: 'Playfair Display, Merriweather, serif', fontWeight: 600 }} />
                            <RechartsTooltip
                              contentStyle={{
                                background: chartTooltipBg,
                                border: '1.5px solid rgba(60,60,60,0.10)',
                                borderRadius: 12,
                                fontFamily: 'Playfair Display, Merriweather, serif',
                                color: chartTooltipText,
                              }}
                            />
                            <Bar dataKey="probability" fill={chartBarColor} radius={[8, 8, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </Box>
                      <Typography variant="h4" align="center" sx={{ mt: 2, fontWeight: 700, fontFamily: 'Playfair Display, Merriweather, serif', color: theme.palette.text.primary }}>
                        Predicted Emotion: <Box component="span" sx={{ color: accentColor }}>{result.emotion}</Box>
                      </Typography>
                      <Typography variant="body1" align="center" sx={{ color: theme.palette.text.secondary }}>
                        Confidence: {result.confidence ? (result.confidence * 100).toFixed(2) : '--'}%
                      </Typography>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleSaveToHistory}
                        sx={{ mt: 2, borderRadius: 999, fontWeight: 600, px: 4, py: 1.2, fontSize: '1.1rem' }}
                      >
                        Save to History
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<RestartAltIcon />}
                        onClick={handleReset}
                        sx={{
                          mt: 2,
                          borderRadius: 999,
                          fontFamily: 'Playfair Display, Merriweather, serif',
                          fontWeight: 600,
                          px: 4,
                          py: 1.2,
                          fontSize: '1.1rem',
                          color: resetBtnText,
                          borderColor: resetBtnText,
                          background: resetBtnBg,
                          '&:hover': {
                            background: resetBtnHoverBg,
                            color: resetBtnHoverText,
                            borderColor: resetBtnHoverBg,
                          },
                        }}
                      >
                        Reset
                      </Button>
                    </Box>
                  ) : null}
                </Box>
              </Box>
            )}
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard; 