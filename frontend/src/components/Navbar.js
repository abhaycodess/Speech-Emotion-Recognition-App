import React, { useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '@mui/material/styles';
import { useColorMode } from '../App';
import Switch from './Switch';
import Logo from './Logo';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
  { label: "FAQ's", path: '/faqs' },
];

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const colorMode = useColorMode();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      background: 'transparent',
      boxShadow: 'none',
      borderBottom: 'none',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 30,
      color: theme.palette.text.primary,
      transition: 'background 0.3s',
    }}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse" style={{ color: theme.palette.primary.main, textDecoration: 'none' }}>
          <Logo width={48} height={48} />
          <span className="self-center text-2xl font-semibold whitespace-nowrap" style={{ color: theme.palette.text.primary }}>Nimbus</span>
        </a>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {currentUser ? (
              <>
                <button
                  type="button"
                  className="flex text-sm rounded-full focus:ring-4"
                  id="user-menu-button"
                  aria-expanded={userDropdown}
                  onClick={() => setUserDropdown((v) => !v)}
                  style={{ background: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200] }}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src={currentUser.photoURL || 'https://ui-avatars.com/api/?name=User'}
                    alt="user avatar"
                  />
                </button>
                {/* Dropdown menu */}
                <div
                  className={`z-50 ${userDropdown ? '' : 'hidden'} my-4 text-base list-none rounded-lg shadow-sm absolute right-4 top-16 min-w-[180px]`}
                  style={{ 
                    background: theme.palette.background.paper, 
                    color: theme.palette.text.primary, 
                    border: `1px solid ${theme.palette.divider}`,
                    position: 'absolute',
                    right: '1rem',
                    top: '4rem',
                    zIndex: 50,
                    minWidth: '180px',
                    borderRadius: '0.5rem',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
                  }}
                  id="user-dropdown"
                >
                  <div className="px-4 py-3 border-b" style={{ borderColor: theme.palette.divider }}>
                    <span className="block text-sm font-medium" style={{ color: theme.palette.text.primary }}>{currentUser.username || 'User'}</span>
                    <span className="block text-sm truncate" style={{ color: theme.palette.text.secondary }}>{currentUser.email}</span>
                  </div>
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                      <RouterLink
                        to="/dashboard"
                        className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                        style={{ 
                          color: theme.palette.text.primary,
                          textDecoration: 'none',
                          transition: 'background-color 0.2s'
                        }}
                        onClick={() => setUserDropdown(false)}
                      >
                        Dashboard
                      </RouterLink>
                    </li>
                    <li>
                      <RouterLink
                        to="/profile"
                        className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                        style={{ 
                          color: theme.palette.text.primary,
                          textDecoration: 'none',
                          transition: 'background-color 0.2s'
                        }}
                        onClick={() => setUserDropdown(false)}
                      >
                        Profile
                      </RouterLink>
                    </li>
                    <li>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                        style={{ 
                          color: theme.palette.error.main,
                          background: 'none',
                          border: 'none',
                          transition: 'background-color 0.2s'
                        }}
                        onClick={handleLogout}
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <RouterLink
                  to="/login"
                  style={{
                    color: theme.palette.primary.main,
                    marginRight: 8,
                    textDecoration: 'none',
                    fontWeight: 600,
                    padding: '6px 18px',
                    borderRadius: 6,
                    background: theme.palette.mode === 'dark' ? 'rgba(58,89,209,0.12)' : 'rgba(58,89,209,0.08)',
                    transition: 'background 0.2s, color 0.2s',
                    border: `1.5px solid transparent`,
                    ...(location.pathname === '/login' && {
                      background: theme.palette.primary.main,
                      color: '#fff',
                    }),
                    ':hover': {
                      background: theme.palette.primary.main,
                      color: '#fff',
                    }
                  }}
                >
                  Login
                </RouterLink>
                <RouterLink
                  to="/signup"
                  style={{
                    color: theme.palette.primary.main,
                    marginRight: 8,
                    textDecoration: 'none',
                    fontWeight: 600,
                    padding: '6px 18px',
                    borderRadius: 6,
                    background: theme.palette.mode === 'dark' ? 'rgba(58,89,209,0.12)' : 'rgba(58,89,209,0.08)',
                    transition: 'background 0.2s, color 0.2s',
                    border: `1.5px solid transparent`,
                    ...(location.pathname === '/signup' && {
                      background: theme.palette.primary.main,
                      color: '#fff',
                    }),
                    ':hover': {
                      background: theme.palette.primary.main,
                      color: '#fff',
                    }
                  }}
                >
                  Sign Up
                </RouterLink>
              </>
            )}
            <Switch onToggle={colorMode.toggleColorMode} checked={theme.palette.mode === 'dark'} />
          </div>
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden ml-2"
            style={{ color: theme.palette.text.secondary, background: 'none' }}
            aria-controls="navbar-user"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${menuOpen ? '' : 'hidden'}`}
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0" style={{ background: 'transparent', borderColor: theme.palette.divider }}>
            {navLinks.map(link => (
              <li key={link.path}>
                <RouterLink
                  to={link.path}
                  className="block py-2 px-3 rounded-sm md:bg-transparent md:p-0 nav-link"
                  style={{
                    color:
                      location.pathname === link.path
                        ? theme.palette.primary.main
                        : theme.palette.text.primary,
                    fontWeight: location.pathname === link.path ? 700 : 500,
                    textDecoration: 'none',
                    background: 'transparent',
                    borderRadius: 6,
                    transition: 'background 0.2s, color 0.2s',
                  }}
                  aria-current={location.pathname === link.path ? 'page' : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </RouterLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 