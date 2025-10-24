import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section
      style={{
        position: 'relative',
        borderRadius: 'var(--radius-2xl)',
        overflow: 'hidden',
        marginTop: 'var(--spacing-3xl)',
      }}
    >
      {/* Background with Gradient */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'var(--gradient-sunset)',
        }}
      />

      {/* Pattern Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          opacity: 0.5,
        }}
      />

      {/* Animated Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Content */}
      <div
        className="container"
        style={{
          position: 'relative',
          padding: 'var(--spacing-3xl) var(--spacing-lg)',
          textAlign: 'center',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: '800',
              color: 'white',
              marginBottom: 'var(--spacing-lg)',
              lineHeight: '1.2',
            }}
          >
            Ready for your next getaway?
            <motion.span
              animate={{
                rotate: [0, 14, -8, 14, -4, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 2,
              }}
              style={{
                display: 'inline-block',
                marginLeft: '0.5rem',
              }}
            >
              ✈️
            </motion.span>
          </h2>

          <p
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'rgba(255, 255, 255, 0.95)',
              maxWidth: '600px',
              margin: '0 auto var(--spacing-2xl)',
            }}
          >
            Join millions of travelers who've found their perfect stay with HomelyHub.
            Start exploring today!
          </p>

          <div
            style={{
              display: 'flex',
              gap: 'var(--spacing-md)',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link to="/explore">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '1rem 2.5rem',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  background: 'white',
                  color: 'var(--primary)',
                  fontWeight: '700',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                  transition: 'all 0.3s ease',
                }}
              >
                Start Exploring
                <ArrowRight size={20} />
              </motion.button>
            </Link>

            <Link to="/host-dashboard">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '1rem 2.5rem',
                  borderRadius: 'var(--radius-full)',
                  border: '2px solid white',
                  background: 'transparent',
                  color: 'white',
                  fontWeight: '700',
                  fontSize: '1.1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.color = 'var(--primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'white';
                }}
              >
                Become a Host
              </motion.button>
            </Link>
          </div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              marginTop: 'var(--spacing-2xl)',
              display: 'flex',
              justifyContent: 'center',
              gap: 'var(--spacing-xl)',
              flexWrap: 'wrap',
              color: 'white',
              fontSize: '0.9rem',
            }}
          >
            <div>✓ Free cancellation</div>
            <div>✓ Verified hosts</div>
            <div>✓ 24/7 support</div>
            <div>✓ Secure payments</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
