import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Home, ArrowRight, Sparkles } from 'lucide-react';
import { login, reset } from '../store/slices/authSlice';
import toast from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }

    if (isSuccess && user) {
      toast.success('Welcome back! 🎉');
      dispatch(reset());
      navigate(from, { replace: true });
    }
  }, [isError, isSuccess, message, user, navigate, dispatch, from]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    dispatch(login(formData));
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-primary)',
        padding: '2rem 1rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated Background Elements */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          background: 'var(--gradient-sunset)',
          borderRadius: '50%',
          filter: 'blur(120px)',
          opacity: '0.1',
          animation: 'float 20s ease-in-out infinite',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '-5%',
          width: '400px',
          height: '400px',
          background: 'var(--gradient-ocean)',
          borderRadius: '50%',
          filter: 'blur(100px)',
          opacity: '0.1',
          animation: 'float 15s ease-in-out infinite reverse',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          width: '100%',
          maxWidth: '480px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Logo and Title */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: '50px',
                height: '50px',
                background: 'var(--gradient-sunset)',
                borderRadius: 'var(--radius-lg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              <Home size={28} color="white" />
            </motion.div>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.75rem',
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

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1
              style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                color: 'var(--text-primary)',
                marginBottom: '0.5rem',
                fontFamily: 'var(--font-display)',
              }}
            >
              Welcome Back! 👋
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
              Sign in to continue your journey
            </p>
          </motion.div>
        </div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'var(--backdrop-blur)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-xl)',
            padding: '2.5rem',
            boxShadow: 'var(--shadow-2xl)',
          }}
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                style={{
                  display: 'block',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem',
                }}
              >
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail
                  size={20}
                  style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-tertiary)',
                  }}
                />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  style={{
                    width: '100%',
                    padding: '0.875rem 1rem 0.875rem 3rem',
                    fontSize: '1rem',
                    border: '2px solid var(--border-color)',
                    borderRadius: 'var(--radius-lg)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    transition: 'all 0.2s ease',
                    outline: 'none',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--primary)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(255, 56, 92, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--border-color)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                style={{
                  display: 'block',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem',
                }}
              >
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock
                  size={20}
                  style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-tertiary)',
                  }}
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    padding: '0.875rem 3rem 0.875rem 3rem',
                    fontSize: '1rem',
                    border: '2px solid var(--border-color)',
                    borderRadius: 'var(--radius-lg)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    transition: 'all 0.2s ease',
                    outline: 'none',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--primary)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(255, 56, 92, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--border-color)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-tertiary)',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.25rem',
                  }}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Link
                to="/forgot-password"
                style={{
                  fontSize: '0.9rem',
                  color: 'var(--primary)',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={(e) => (e.target.style.opacity = '0.8')}
                onMouseLeave={(e) => (e.target.style.opacity = '1')}
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: '100%',
                padding: '1rem',
                fontSize: '1.05rem',
                fontWeight: '700',
                color: 'white',
                background: isLoading ? 'var(--text-tertiary)' : 'var(--gradient-sunset)',
                border: 'none',
                borderRadius: 'var(--radius-lg)',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: 'var(--shadow-lg)',
                transition: 'all 0.2s ease',
              }}
            >
              {isLoading ? (
                <>
                  <span
                    style={{
                      width: '20px',
                      height: '20px',
                      border: '3px solid rgba(255, 255, 255, 0.3)',
                      borderTop: '3px solid white',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                    }}
                  />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={20} />
                </>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              margin: '2rem 0',
            }}
          >
            <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
            <span style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>or</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
          </div>

          {/* Sign Up Link */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Don't have an account?{' '}
              <Link
                to="/signup"
                state={{ from: location.state?.from }}
                style={{
                  color: 'var(--primary)',
                  fontWeight: '700',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={(e) => (e.target.style.opacity = '0.8')}
                onMouseLeave={(e) => (e.target.style.opacity = '1')}
              >
                Sign up now
                <Sparkles size={16} />
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ textAlign: 'center', marginTop: '2rem' }}
        >
          <Link
            to="/"
            style={{
              color: 'var(--text-secondary)',
              fontSize: '0.9rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.target.style.color = 'var(--primary)')}
            onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
          >
            ← Back to Home
          </Link>
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default Login;
