import React from 'react';
import { Box, Container, Typography, Link, IconButton, Stack } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Logo from './Logo';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 1.5,
        px: 0,
        mt: 'auto',
        width: '100vw',
        position: 'relative',
        zIndex: 1200,
        backdropFilter: 'blur(5px)',
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? 'rgba(58,89,209,0.12)'
            : 'rgba(58,89,209,0.08)',
        borderTop: (theme) =>
          `1.5px solid ${theme.palette.mode === 'dark' ? 'rgba(58,89,209,0.22)' : 'rgba(58,89,209,0.18)'}`,
        boxShadow: (theme) =>
          theme.palette.mode === 'dark'
            ? '0 -8px 32px 0 rgba(35,42,77,0.18), 0 1px 8px 0 rgba(255,255,255,0.08)'
            : '0 -8px 32px 0 rgba(58,89,209,0.08), 0 1px 8px 0 rgba(255,255,255,0.08)',
        color: (theme) => theme.palette.text.primary,
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="md" sx={{ px: 0 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={1}>
          <Stack direction="row" spacing={0.5}>
            <IconButton color="inherit" component="a" href="https://github.com/abhaycodess" target="_blank" rel="noopener" aria-label="GitHub" size="small">
              <GitHubIcon fontSize="small" />
            </IconButton>
            <IconButton color="inherit" component="a" href="https://twitter.com/" target="_blank" rel="noopener" aria-label="Twitter" size="small">
              <TwitterIcon fontSize="small" />
            </IconButton>
            <IconButton color="inherit" component="a" href="https://linkedin.com/" target="_blank" rel="noopener" aria-label="LinkedIn" size="small">
              <LinkedInIcon fontSize="small" />
            </IconButton>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Link color="inherit" href="/about" fontSize={13}>About</Link>
            <Link color="inherit" href="/contact" fontSize={13}>Contact</Link>
            <Link color="inherit" href="/help" fontSize={13}>Help Us</Link>
            <Link color="inherit" href="/contribute" fontSize={13}>Contribute</Link>
          </Stack>
        </Stack>
        <Typography variant="caption" color="text.secondary" align="center" sx={{ mt: 0.5, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
          <Logo width={24} height={24} style={{ marginRight: 6 }} />
          © {new Date().getFullYear()} Nimbus - Emotion Recognition System. All rights reserved.
        </Typography>
        <Typography variant="caption" color="text.secondary" align="center" sx={{ fontSize: 12, display: 'block' }}>
          <Link color="inherit" href="/privacy" fontSize={12}>Privacy Policy</Link>
          {' | '}
          <Link color="inherit" href="/terms" fontSize={12}>Terms of Service</Link>
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer; 