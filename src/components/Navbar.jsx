import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, Heart, MessageCircle, Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
                background: 'var(--gradient-sunset)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Home size={24} color="white" />
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
              <ThemeToggle />
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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

              <Link to="/host-dashboard">
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
                  Become a Host
                </motion.button>
              </Link>
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
