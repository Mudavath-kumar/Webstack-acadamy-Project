import React from 'react';
import { Star, Shield, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const HostCard = ({ host }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="card"
      style={{
        padding: 'var(--spacing-xl)',
      }}
    >
      {/* Host Avatar & Info */}
      <div style={{ display: 'flex', alignItems: 'start', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-lg)' }}>
        <div style={{ position: 'relative' }}>
          <img
            src={host.avatar}
            alt={host.name}
            style={{
              width: '80px',
              height: '80px',
              borderRadius: 'var(--radius-full)',
              objectFit: 'cover',
              border: '3px solid var(--border-color)',
            }}
          />
          {host.verified && (
            <div
              style={{
                position: 'absolute',
                bottom: '-4px',
                right: '-4px',
                width: '28px',
                height: '28px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid var(--bg-primary)',
              }}
            >
              <Shield size={14} color="white" />
            </div>
          )}
        </div>

        <div style={{ flex: 1 }}>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              fontWeight: '700',
              marginBottom: '0.25rem',
              color: 'var(--text-primary)',
            }}
          >
            Hosted by {host.name}
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            {host.joinDate}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Star size={14} fill="#FFD700" color="#FFD700" />
              <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>{host.rating}</span>
            </div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              · {host.reviews} reviews
            </span>
          </div>
        </div>
      </div>

      {/* Host Stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'var(--spacing-md)',
          padding: 'var(--spacing-md) 0',
          borderTop: '1px solid var(--border-color)',
          borderBottom: '1px solid var(--border-color)',
          marginBottom: 'var(--spacing-lg)',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)' }}>
            {host.properties}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Properties</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)' }}>
            {host.responseRate}%
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Response rate</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)' }}>
            {host.responseTime}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Response time</div>
        </div>
      </div>

      {/* Host Bio */}
      <p
        style={{
          fontSize: '0.9rem',
          lineHeight: '1.6',
          color: 'var(--text-secondary)',
          marginBottom: 'var(--spacing-lg)',
        }}
      >
        {host.bio}
      </p>

      {/* Contact Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          width: '100%',
          padding: 'var(--spacing-md)',
          borderRadius: 'var(--radius-md)',
          border: '2px solid var(--border-color)',
          background: 'transparent',
          color: 'var(--text-primary)',
          fontWeight: '600',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
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
        <MessageCircle size={18} />
        Contact Host
      </motion.button>
    </motion.div>
  );
};

export default HostCard;
