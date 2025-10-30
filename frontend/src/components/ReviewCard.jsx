import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const ReviewCard = ({ review }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="card"
      style={{
        padding: 'var(--spacing-lg)',
        height: '100%',
      }}
    >
      {/* Rating Stars */}
      <div style={{ display: 'flex', gap: '0.25rem', marginBottom: 'var(--spacing-md)' }}>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            fill={i < review.rating ? '#FFD700' : 'none'}
            color={i < review.rating ? '#FFD700' : 'var(--text-tertiary)'}
          />
        ))}
      </div>

      {/* Review Text */}
      <p
        style={{
          fontSize: '0.95rem',
          lineHeight: '1.6',
          color: 'var(--text-secondary)',
          marginBottom: 'var(--spacing-lg)',
        }}
      >
        "{review.text}"
      </p>

      {/* Reviewer Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
        <img
          src={review.avatar}
          alt={review.name}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-full)',
            objectFit: 'cover',
          }}
        />
        <div>
          <div
            style={{
              fontWeight: '600',
              color: 'var(--text-primary)',
              fontSize: '0.95rem',
            }}
          >
            {review.name}
          </div>
          <div
            style={{
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
            }}
          >
            {review.location} · {review.date}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewCard;
