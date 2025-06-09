import React, { useMemo, useState, createContext, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Footer from './components/Footer';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQs from './pages/FAQs';
import AudioEditor from './pages/AudioEditor';
import Terms from './pages/Terms';
import FocusWindowBlur from './components/FocusWindowBlur';
import AuthSuccess from './pages/AuthSuccess';
import AuthError from './pages/AuthError';
import PrivateRoute from './components/PrivateRoute';

// Theme context for dark/light mode
const ColorModeContext = createContext({ toggleColorMode: () => {} });
export const useColorMode = () => useContext(ColorModeContext);

function App() {
  const [mode, setMode] = useState('light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  let theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: '#fff' }, // Primary color is now white
          secondary: { main: '#F6B17A' },
          background: {
            default: mode === 'dark' ? '#181A20' : '#F8F9FB',
            paper: mode === 'dark' ? '#23242B' : '#FFFFFF',
          },
          text: {
            primary: mode === 'dark' ? '#fff' : '#232946',
            secondary: mode === 'dark' ? '#b0b3b8' : '#444',
          },
        },
        typography: {
          fontFamily: `'Playfair Display', 'Merriweather', serif`,
          h1: { fontWeight: 800, fontSize: '2.8rem', letterSpacing: '-1.5px' },
          h2: { fontWeight: 700, fontSize: '2.2rem', letterSpacing: '-1px' },
          h3: { fontWeight: 700, fontSize: '1.7rem' },
          h4: { fontWeight: 700, fontSize: '1.3rem' },
          h5: { fontWeight: 600 },
          h6: { fontWeight: 600 },
          body1: { fontWeight: 400, fontSize: '1.05rem' },
          body2: { fontWeight: 400, fontSize: '0.97rem' },
          button: { fontWeight: 600, textTransform: 'none', letterSpacing: '0.5px' },
        },
        shape: {
          borderRadius: 14,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 10,
                boxShadow: 'none',
                fontWeight: 600,
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 18,
                boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
              },
            },
          },
        },
      }),
    [mode]
  );
  theme = responsiveFontSizes(theme);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Navbar />
          <div style={{ position: 'relative', flex: 1, minHeight: '80vh' }}>
            <FocusWindowBlur>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/auth/success" element={<AuthSuccess />} />
                <Route path="/auth/error" element={<AuthError />} />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <PrivateRoute>
                      <Profile />
                    </PrivateRoute>
                  }
                />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faqs" element={<FAQs />} />
                <Route path="/audio-editor" element={<AudioEditor />} />
                <Route path="/terms" element={<Terms />} />
              </Routes>
            </FocusWindowBlur>
          </div>
          <Footer />
        </AuthProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App; 