import React from 'react';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-secondary)' }}>
      <div style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ fontSize: '8rem', marginBottom: 'var(--spacing-xl)' }}
        >
          🧳
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 10vw, 8rem)',
            fontWeight: '800',
            background: 'var(--gradient-sunset)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: 'var(--spacing-md)',
          }}
        >
          404
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2rem',
            fontWeight: '700',
            marginBottom: 'var(--spacing-md)',
          }}
        >
          Oops! Page not found
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            marginBottom: 'var(--spacing-2xl)',
            maxWidth: '500px',
            margin: '0 auto var(--spacing-2xl)',
          }}
        >
          Looks like you've wandered off the beaten path. The page you're looking for doesn't exist.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-gradient"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: 'var(--spacing-md) var(--spacing-2xl)',
                fontSize: '1.1rem',
              }}
            >
              <Home size={20} />
              Go Back Home
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
