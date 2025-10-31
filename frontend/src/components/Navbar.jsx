import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, X, User, Heart, MessageCircle, Home, LogOut, Settings, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { logout } from '../store/slices/authSlice';
import toast from 'react-hot-toast';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showUserMenu]);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      toast.success('Logged out successfully');
      setShowUserMenu(false);
      navigate('/');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  const navLinks = [
    { name: 'Explore', path: '/explore' },
    { name: 'Trips', path: '/trips' },
    { name: 'Messages', path: '/messages' },
    { name: 'Wishlists', path: '/wishlists' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="navbar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 'var(--z-fixed)',
        background: isScrolled ? 'var(--glass-bg)' : 'transparent',
        backdropFilter: isScrolled ? 'var(--backdrop-blur)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--border-color)' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}
    >
      <div className="container" style={{ padding: '1rem var(--spacing-lg)' }}>
        <div className="flex-between">
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <img 
                src="https://backend-prod-hjlerckip39sk4no.s3-accelerate.amazonaws.com/images/2025/10/25/0198d335-0585-7738-b404-2c3b98ca1098/wsa-_logo_7430fb77.jpg"
                alt="HomelyHub Logo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </motion.div>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                fontWeight: '700',
                background: 'var(--gradient-sunset)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              HomelyHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    color: location.pathname === link.path ? 'var(--primary)' : 'var(--text-primary)',
                    fontWeight: location.pathname === link.path ? '600' : '500',
                    fontSize: '0.95rem',
                    transition: 'color 0.2s ease',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = 'var(--primary)')}
                  onMouseLeave={(e) => {
                    if (location.pathname !== link.path) {
                      e.target.style.color = 'var(--text-primary)';
                    }
                  }}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="activeNav"
                      style={{
                        position: 'absolute',
                        bottom: '-4px',
                        left: 0,
                        right: 0,
                        height: '2px',
                        background: 'var(--primary)',
                        borderRadius: 'var(--radius-full)',
                      }}
                    />
                  )}
                </Link>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {/* Become a Host Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (user) {
                    // User is logged in
                    if (user.role === 'host') {
                      navigate('/host-dashboard');
                    } else {
                      navigate('/become-host');
                    }
                  } else {
                    // User not logged in - save intended destination and go to login
                    toast.info('🔐 Please log in or sign up to become a host');
                    navigate('/login', { state: { from: { pathname: '/become-host' } } });
                  }
                }}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  borderRadius: 'var(--radius-full)',
                  padding: '0.65rem 1.25rem',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
                }}
              >
                🏠 {user && user.role === 'host' ? 'Host Dashboard' : 'Become a Host'}
              </motion.button>

              <ThemeToggle />
              
              {user ? (
                <div className="user-menu-container" style={{ position: 'relative' }}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    style={{
                      background: 'transparent',
                      border: '2px solid var(--border-color)',
                      borderRadius: 'var(--radius-full)',
                      padding: '0.5rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      cursor: 'pointer',
                      color: 'var(--text-primary)',
                      fontWeight: '500',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--primary)';
                      e.currentTarget.style.background = 'var(--bg-secondary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <Menu size={18} />
                    <User size={18} />
                  </motion.button>

                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        style={{
                          position: 'absolute',
                          top: 'calc(100% + 0.5rem)',
                          right: 0,
                          background: 'var(--bg-primary)',
                          border: '1px solid var(--border-color)',
                          borderRadius: 'var(--radius-lg)',
                          boxShadow: 'var(--shadow-2xl)',
                          minWidth: '220px',
                          overflow: 'hidden',
                          zIndex: 1000,
                        }}
                      >
                        <div style={{ padding: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                          <p style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                            {user.name || user.email}
                          </p>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            {user.email}
                          </p>
                        </div>
                        
                        <div style={{ padding: '0.5rem' }}>
                          <Link
                            to="/profile"
                            onClick={() => setShowUserMenu(false)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.75rem',
                              padding: '0.75rem 1rem',
                              borderRadius: 'var(--radius-md)',
                              color: 'var(--text-primary)',
                              textDecoration: 'none',
                              transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'var(--bg-secondary)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'transparent';
                            }}
                          >
                            <Settings size={18} />
                            <span style={{ fontWeight: '500', fontSize: '0.9rem' }}>Profile Settings</span>
                          </Link>
                          
                          {(user.role === 'host' || user.role === 'admin') && (
                            <Link
                              to="/host-dashboard"
                              onClick={() => setShowUserMenu(false)}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.75rem',
                                padding: '0.75rem 1rem',
                                borderRadius: 'var(--radius-md)',
                                color: 'var(--text-primary)',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'var(--bg-secondary)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'transparent';
                              }}
                            >
                              <LayoutDashboard size={18} />
                              <span style={{ fontWeight: '500', fontSize: '0.9rem' }}>Host Dashboard</span>
                            </Link>
                          )}
                          
                          <button
                            onClick={handleLogout}
                            style={{
                              width: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.75rem',
                              padding: '0.75rem 1rem',
                              borderRadius: 'var(--radius-md)',
                              color: '#ef4444',
                              background: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              fontWeight: '500',
                              fontSize: '0.9rem',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'transparent';
                            }}
                          >
                            <LogOut size={18} />
                            <span>Logout</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Link to="/login">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        background: 'transparent',
                        border: '2px solid var(--border-color)',
                        borderRadius: 'var(--radius-full)',
                        padding: '0.6rem 1.25rem',
                        color: 'var(--text-primary)',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--primary)';
                        e.currentTarget.style.background = 'var(--bg-secondary)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-color)';
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      Login
                    </motion.button>
                  </Link>

                  <Link to="/signup">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-primary"
                      style={{
                        background: 'var(--gradient-sunset)',
                        border: 'none',
                        borderRadius: 'var(--radius-full)',
                        padding: '0.6rem 1.25rem',
                        color: 'white',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        cursor: 'pointer',
                      }}
                    >
                      Sign Up
                    </motion.button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              display: 'none',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-primary)',
            }}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mobile-menu"
            style={{
              background: 'var(--bg-primary)',
              borderTop: '1px solid var(--border-color)',
              padding: '1rem',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    color: location.pathname === link.path ? 'var(--primary)' : 'var(--text-primary)',
                    fontWeight: location.pathname === link.path ? '600' : '500',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-md)',
                    background: location.pathname === link.path ? 'var(--bg-secondary)' : 'transparent',
                  }}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/host-dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                <button
                  className="btn-primary"
                  style={{
                    width: '100%',
                    background: 'var(--gradient-sunset)',
                    border: 'none',
                    borderRadius: 'var(--radius-full)',
                    padding: '0.75rem',
                    color: 'white',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Become a Host
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-toggle {
            display: block !important;
          }
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;
