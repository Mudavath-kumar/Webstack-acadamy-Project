import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const RatingBreakdown = ({ ratings }) => {
  // Calculate percentages and averages
  const totalReviews = ratings.count || 0;
  const averageRating = ratings.average || 0;
  
  // Rating distribution (5 star, 4 star, etc.)
  const distribution = ratings.distribution || {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  // Category ratings
  const categoryRatings = ratings.categories || {
    cleanliness: 4.8,
    accuracy: 4.9,
    checkin: 5.0,
    communication: 4.9,
    location: 4.7,
    value: 4.8,
  };

  const categories = [
    { key: 'cleanliness', label: 'Cleanliness' },
    { key: 'accuracy', label: 'Accuracy' },
    { key: 'checkin', label: 'Check-in' },
    { key: 'communication', label: 'Communication' },
    { key: 'location', label: 'Location' },
    { key: 'value', label: 'Value' },
  ];

  const getPercentage = (count) => {
    return totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
  };

  return (
    <div className="card" style={{ padding: 'var(--spacing-xl)', marginBottom: 'var(--spacing-xl)' }}>
      {/* Overall Rating */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 'var(--spacing-2xl)', 
        marginBottom: 'var(--spacing-2xl)',
        flexWrap: 'wrap',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontSize: '3rem', 
            fontWeight: '700', 
            marginBottom: 'var(--spacing-sm)',
            background: 'var(--gradient-sunset)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            {averageRating.toFixed(2)}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', justifyContent: 'center', marginBottom: 'var(--spacing-xs)' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={20}
                fill={star <= averageRating ? '#FFD700' : 'none'}
                color={star <= averageRating ? '#FFD700' : 'var(--text-secondary)'}
              />
            ))}
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
          </div>
        </div>

        {/* Rating Distribution */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = distribution[rating] || 0;
            const percentage = getPercentage(count);
            
            return (
              <div key={rating} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 'var(--spacing-md)', 
                marginBottom: 'var(--spacing-sm)' 
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.25rem',
                  minWidth: '60px',
                }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{rating}</span>
                  <Star size={14} fill="#FFD700" color="#FFD700" />
                </div>
                
                <div style={{ 
                  flex: 1, 
                  height: '8px', 
                  background: 'var(--bg-secondary)', 
                  borderRadius: 'var(--radius-full)',
                  overflow: 'hidden',
                  position: 'relative',
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{
                      height: '100%',
                      background: 'var(--gradient-sunset)',
                      borderRadius: 'var(--radius-full)',
                    }}
                  />
                </div>
                
                <div style={{ 
                  minWidth: '50px', 
                  textAlign: 'right',
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                }}>
                  {percentage}%
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category Ratings */}
      <div>
        <h3 style={{ 
          fontSize: '1.1rem', 
          fontWeight: '700', 
          marginBottom: 'var(--spacing-lg)',
        }}>
          Rating Categories
        </h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: 'var(--spacing-lg)' 
        }}>
          {categories.map((category) => {
            const rating = categoryRatings[category.key] || 0;
            const percentage = (rating / 5) * 100;
            
            return (
              <div key={category.key}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: 'var(--spacing-sm)',
                }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>
                    {category.label}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Star size={14} fill="#FFD700" color="#FFD700" />
                    <span style={{ fontSize: '0.9rem', fontWeight: '700' }}>
                      {rating.toFixed(1)}
                    </span>
                  </div>
                </div>
                <div style={{ 
                  height: '6px', 
                  background: 'var(--bg-secondary)', 
                  borderRadius: 'var(--radius-full)',
                  overflow: 'hidden',
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    style={{
                      height: '100%',
                      background: percentage >= 80 
                        ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' 
                        : percentage >= 60
                        ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                        : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                      borderRadius: 'var(--radius-full)',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RatingBreakdown;
