import React, { useRef, useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  useTheme,
  Tooltip,
  Alert
} from '@mui/material';
import { motion } from 'framer-motion';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.js';
import TimelinePlugin from 'wavesurfer.js/dist/plugins/timeline.js';
import CircularProgress from '@mui/material/CircularProgress';

const toolButtons = [
  { icon: <UploadFileIcon />, label: 'Import', action: 'import' },
  { icon: <ContentCutIcon />, label: 'Cut', action: 'cut' },
  { icon: <DeleteIcon />, label: 'Delete', action: 'delete' },
  { icon: <AddIcon />, label: 'Add Track', action: 'add' },
  { icon: <SettingsIcon />, label: 'Settings', action: 'settings' },
];

const AudioEditor = () => {
  const theme = useTheme();
  const [audioFile, setAudioFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [region, setRegion] = useState(null);
  const wavesurferRef = useRef(null);
  const waveformContainerRef = useRef(null);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef(null);
  const [loadingWaveform, setLoadingWaveform] = useState(false);
  const [waveformError, setWaveformError] = useState('');
  const timelineRef = useRef(null);

  // Initialize WaveSurfer with Timeline and Regions
  useEffect(() => {
    if (waveformContainerRef.current) {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
      }
      wavesurferRef.current = WaveSurfer.create({
        container: waveformContainerRef.current,
        waveColor: theme.palette.mode === 'dark' ? '#F6B17A' : '#3A59D1',
        progressColor: theme.palette.mode === 'dark' ? '#fff' : '#23243a',
        backgroundColor: 'transparent',
        height: 90,
        responsive: true,
        barWidth: 2,
        barRadius: 2,
        cursorColor: theme.palette.primary.main,
        plugins: [
          RegionsPlugin.create({
            dragSelection: {
              slop: 2,
              color: theme.palette.mode === 'dark' ? 'rgba(246,177,122,0.2)' : 'rgba(58,89,209,0.15)',
            },
          }),
          TimelinePlugin.create({
            container: timelineRef.current,
            height: 24,
            notchPercentHeight: 80,
            primaryColor: theme.palette.mode === 'dark' ? '#F6B17A' : '#3A59D1',
            secondaryColor: theme.palette.mode === 'dark' ? '#fff' : '#23243a',
            fontFamily: 'inherit',
            fontSize: 13,
          })
        ]
      });
      wavesurferRef.current.on('region-updated', (reg) => setRegion(reg));
      wavesurferRef.current.on('region-created', (reg) => setRegion(reg));
      wavesurferRef.current.on('region-removed', () => setRegion(null));
      wavesurferRef.current.on('finish', () => setPlaying(false));
      wavesurferRef.current.on('play', () => setPlaying(true));
      wavesurferRef.current.on('pause', () => setPlaying(false));
      wavesurferRef.current.on('error', (err) => {
        setWaveformError('Failed to load audio. Please try another file.');
        setLoadingWaveform(false);
      });
      wavesurferRef.current.on('ready', () => {
        setLoadingWaveform(false);
        setWaveformError('');
        // Automatically create a region covering the whole audio
        const ws = wavesurferRef.current;
        if (ws && ws.getDuration() > 0) {
          ws.regions.clear();
          const reg = ws.addRegion({
            start: 0,
            end: ws.getDuration(),
            color: theme.palette.mode === 'dark' ? 'rgba(246,177,122,0.2)' : 'rgba(58,89,209,0.15)',
            drag: true,
            resize: true,
          });
          setRegion(reg);
        }
      });
    }
    // Cleanup
    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
        wavesurferRef.current = null;
      }
    };
    // eslint-disable-next-line
  }, [theme.palette.mode]);

  // Load audio into WaveSurfer
  useEffect(() => {
    if (audioUrl && wavesurferRef.current) {
      try {
        setLoadingWaveform(true);
        setWaveformError('');
        wavesurferRef.current.load(audioUrl);
        setRegion(null);
      } catch (err) {
        setWaveformError('Error loading audio into WaveSurfer.');
        setLoadingWaveform(false);
      }
    } else {
      if (!audioUrl) setWaveformError('');
      if (!wavesurferRef.current) setWaveformError('');
    }
  }, [audioUrl]);

  // Play/pause logic (sync with WaveSurfer)
  const handlePlayPause = () => {
    if (!wavesurferRef.current) return;
    wavesurferRef.current.playPause();
    // State will be updated by WaveSurfer events
  };

  // Enhanced Import logic
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('audio/')) {
        setErrorMsg('Unsupported file type. Please upload an audio file.');
        return;
      }
      setErrorMsg('');
      setAudioFile(file);
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
    } else {
      setErrorMsg('No file selected');
    }
  };

  // Drag-and-drop handlers
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (!file.type.startsWith('audio/')) {
        setErrorMsg('Unsupported file type. Please upload an audio file.');
        return;
      }
      setErrorMsg('');
      setAudioFile(file);
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
      e.dataTransfer.clearData();
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleMainAreaClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  // Export trimmed region
  const handleExport = async () => {
    if (!audioFile || !region) return;
    const audioBuffer = await fetch(audioUrl).then(r => r.arrayBuffer());
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const decoded = await audioCtx.decodeAudioData(audioBuffer.slice(0));
    const start = Math.floor(region.start * decoded.sampleRate);
    const end = Math.floor(region.end * decoded.sampleRate);
    const trimmed = decoded.getChannelData(0).slice(start, end);
    const trimmedBuffer = audioCtx.createBuffer(1, trimmed.length, decoded.sampleRate);
    trimmedBuffer.copyToChannel(trimmed, 0);
    const wavBlob = await bufferToWav(trimmedBuffer);
    const link = document.createElement('a');
    link.href = URL.createObjectURL(wavBlob);
    link.download = `trimmed-${audioFile.name}`;
    link.click();
  };

  // Helper: Convert AudioBuffer to WAV Blob
  async function bufferToWav(buffer) {
    const numOfChan = buffer.numberOfChannels,
      length = buffer.length * numOfChan * 2 + 44,
      bufferArray = new ArrayBuffer(length),
      view = new DataView(bufferArray),
      channels = [],
      sampleRate = buffer.sampleRate;
    let offset = 0,
        pos = 0;
    // Write WAV header
    setUint32(0x46464952); // "RIFF"
    setUint32(length - 8); // file length - 8
    setUint32(0x45564157); // "WAVE"
    setUint32(0x20746d66); // "fmt "
    setUint32(16); // length = 16
    setUint16(1); // PCM (uncompressed)
    setUint16(numOfChan);
    setUint32(sampleRate);
    setUint32(sampleRate * 2 * numOfChan);
    setUint16(numOfChan * 2);
    setUint16(16);
    setUint32(0x61746164); // "data"
    setUint32(length - pos - 4);
    // Write interleaved data
    for (let i = 0; i < buffer.numberOfChannels; i++)
      channels.push(buffer.getChannelData(i));
    let sample = 0;
    while (pos < length) {
      for (let i = 0; i < numOfChan; i++) {
        sample = Math.max(-1, Math.min(1, channels[i][offset]));
        sample = (0.5 + sample * 32767) | 0;
        view.setInt16(pos, sample, true);
        pos += 2;
      }
      offset++;
    }
    return new Blob([bufferArray], { type: 'audio/wav' });
    function setUint16(data) { view.setUint16(pos, data, true); pos += 2; }
    function setUint32(data) { view.setUint32(pos, data, true); pos += 4; }
  }

  // Remove region
  const handleDeleteRegion = () => {
    if (wavesurferRef.current && region) {
      wavesurferRef.current.clearRegions();
      setRegion(null);
    }
  };

  // Sidebar tool actions
  const handleSidebarTool = (action) => {
    if (action === 'cut' && region && wavesurferRef.current) {
      // Play only the selected region
      wavesurferRef.current.play(region.start, region.end);
    } else if (action === 'delete' && region && wavesurferRef.current) {
      wavesurferRef.current.regions.clear();
      setRegion(null);
    } else if (action === 'import') {
      if (fileInputRef.current) fileInputRef.current.click();
    }
    // Add more tool actions as needed
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(120deg, #232a4d 0%, #23243a 100%)'
          : 'linear-gradient(120deg, #e9eafc 0%, #f7f8fa 100%)',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        overflow: 'hidden',
      }}
    >
      {/* Sidebar */}
      <motion.div
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          minWidth: 80,
          maxWidth: 90,
          background: theme.palette.mode === 'dark' ? '#181A20' : '#fff',
          borderRight: `1.5px solid ${theme.palette.divider}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '32px 0 16px 0',
          zIndex: 2,
          boxShadow: theme.palette.mode === 'dark' ? '0 0 24px 0 #23243a33' : '0 0 24px 0 #e9eafc33',
        }}
      >
        {toolButtons.map((btn, idx) => (
          <Tooltip title={btn.label} placement="right" key={btn.label} arrow>
            <IconButton
              color="primary"
              size="large"
              sx={{
                mb: 2.5,
                background: theme.palette.mode === 'dark' ? '#23243a' : '#f7f8fa',
                color: theme.palette.text.primary,
                transition: 'background 0.2s, color 0.2s',
                '&:hover': {
                  background: theme.palette.primary.main,
                  color: '#fff',
                },
                boxShadow: '0 2px 8px 0 rgba(31, 38, 135, 0.08)',
              }}
              component={btn.action === 'import' ? 'label' : 'button'}
              onClick={() => handleSidebarTool(btn.action)}
            >
              {btn.icon}
              {btn.action === 'import' && (
                <input type="file" accept="audio/*" hidden onChange={handleFileUpload} />
              )}
            </IconButton>
          </Tooltip>
        ))}
      </motion.div>
      {/* Main Workspace */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          px: { xs: 1, md: 4 },
          py: { xs: 2, md: 4 },
        }}
      >
        {/* Timeline */}
        <Box ref={timelineRef} sx={{ width: '100%', maxWidth: 700, minHeight: 32, mb: 1, mt: 2 }} />
        {/* Central Import/Preview Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          style={{
            width: '100%',
            maxWidth: 700,
            minHeight: 320,
            background: theme.palette.mode === 'dark' ? 'rgba(24,26,32,0.92)' : 'rgba(255,255,255,0.92)',
            borderRadius: 18,
            boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
            border: `2px dashed ${theme.palette.primary.main}`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 6, // More space before timeline
            position: 'relative',
            overflow: 'hidden',
            cursor: !audioUrl ? 'pointer' : 'default',
          }}
          onClick={!audioUrl ? handleMainAreaClick : undefined}
          onDrop={!audioUrl ? handleDrop : undefined}
          onDragOver={!audioUrl ? handleDragOver : undefined}
        >
          <input
            type="file"
            accept="audio/*"
            hidden
            ref={fileInputRef}
            onChange={handleFileUpload}
          />
          {errorMsg && (
            <Alert severity="error" sx={{ mb: 2, width: '90%' }}>{errorMsg}</Alert>
          )}
          {waveformError && (
            <Alert severity="error" sx={{ mb: 2, width: '90%' }}>{waveformError}</Alert>
          )}
          {loadingWaveform && (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 2 }}>
              <CircularProgress color="primary" />
              <Typography sx={{ mt: 1, color: theme.palette.text.secondary }}>Loading audio...</Typography>
            </Box>
          )}
          {!audioUrl ? (
            <>
              <UploadFileIcon sx={{ fontSize: 64, color: theme.palette.primary.main, mb: 2 }} />
              <Typography variant="h5" fontWeight={700} align="center" sx={{ color: theme.palette.text.primary, mb: 1 }}>
                Click here or drag & drop audio to import
              </Typography>
              <Typography align="center" sx={{ color: theme.palette.text.secondary, fontSize: '1.1rem' }}>
                Supported formats: WAV, MP3, etc.
              </Typography>
            </>
          ) : (
            <>
              <Box ref={waveformContainerRef} sx={{ width: '100%', minHeight: 100, mb: 2 }} />
              <Typography sx={{ color: theme.palette.text.secondary, fontSize: '1rem', mb: 1 }}>
                Tip: Click and drag on the waveform to select a region. Use the sidebar tools to cut or delete.
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <IconButton onClick={handlePlayPause} color="primary" size="large" sx={{ background: '#3A59D1', color: '#fff', '&:hover': { background: '#2d47a0' } }}>
                  {playing ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>
                <Typography sx={{ color: theme.palette.text.primary, fontWeight: 600 }}>
                  {audioFile ? audioFile.name : ''}
                </Typography>
                {region && (
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    sx={{ ml: 2, fontWeight: 600 }}
                    onClick={handleDeleteRegion}
                  >
                    Remove Selection
                  </Button>
                )}
              </Box>
              <Button
                variant="contained"
                startIcon={<SaveAltIcon />}
                sx={{ fontWeight: 700, fontSize: '1.1rem', borderRadius: 3, background: '#3A59D1', color: '#fff', mt: 2 }}
                onClick={handleExport}
                disabled={!region}
              >
                Export Trimmed Audio
              </Button>
              {!region && (
                <Typography sx={{ mt: 2, color: theme.palette.text.secondary, fontSize: '1rem' }}>
                  Select a region on the waveform to enable export.
                </Typography>
              )}
              {region && (
                <Alert severity="info" sx={{ mt: 2, width: '90%' }}>
                  Selected region: {region.start.toFixed(2)}s - {region.end.toFixed(2)}s
                </Alert>
              )}
            </>
          )}
        </motion.div>
        {/* Timeline Area (now handled by timeline plugin) */}
      </Box>
    </Box>
  );
};

export default AudioEditor; 