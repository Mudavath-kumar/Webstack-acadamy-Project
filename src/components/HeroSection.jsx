import React from 'react';
import { motion } from 'framer-motion';
import SearchBar from './SearchBar';

const HeroSection = () => {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingTop: '80px',
      }}
    >
      {/* Background Image with Parallax Effect */}
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.85)',
        }}
      />

      {/* Gradient Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(255, 107, 157, 0.3) 0%, rgba(120, 55, 229, 0.3) 100%)',
        }}
      />

      {/* Animated Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 107, 157, 0.3) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(120, 55, 229, 0.3) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Content */}
      <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              fontWeight: '800',
              color: 'white',
              marginBottom: 'var(--spacing-lg)',
              lineHeight: '1.1',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            }}
          >
            Find your perfect stay<br />
            <span
              style={{
                background: 'var(--gradient-sunset)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              anywhere in the world
            </span>
            <motion.span
              animate={{
                rotate: [0, 14, -8, 14, -4, 10, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
              style={{
                display: 'inline-block',
                marginLeft: '0.5rem',
              }}
            >
              🌍
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'rgba(255, 255, 255, 0.95)',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
              maxWidth: '700px',
              margin: '0 auto var(--spacing-2xl)',
            }}
          >
            Discover unique homes, cabins, and apartments hosted by locals.
            <br />
            Book your dream getaway today.
          </motion.p>
        </motion.div>

        {/* Search Bar */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <SearchBar hero={true} />
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 'var(--spacing-xl)',
            marginTop: 'var(--spacing-2xl)',
            flexWrap: 'wrap',
          }}
        >
          {[
            { number: '1M+', label: 'Properties' },
            { number: '5M+', label: 'Happy Guests' },
            { number: '180+', label: 'Countries' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              style={{
                padding: 'var(--spacing-md)',
                borderRadius: 'var(--radius-lg)',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                minWidth: '150px',
              }}
            >
              <div
                style={{
                  fontSize: '2rem',
                  fontWeight: '700',
                  color: 'white',
                  fontFamily: 'var(--font-display)',
                }}
              >
                {stat.number}
              </div>
              <div style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.9)' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'white',
          fontSize: '0.85rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span style={{ opacity: 0.8 }}>Scroll to explore</span>
        <div
          style={{
            width: '2px',
            height: '30px',
            background: 'linear-gradient(to bottom, white, transparent)',
            borderRadius: 'var(--radius-full)',
          }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
