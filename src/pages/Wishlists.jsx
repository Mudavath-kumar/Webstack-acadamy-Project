import React from 'react';
import { Heart } from 'lucide-react';
import ListingCard from '../components/ListingCard';
import MotionWrapper from '../components/MotionWrapper';
import { motion } from 'framer-motion';

const Wishlists = () => {
  const wishlistItems = [
    {
      id: 1,
      title: 'Luxury Villa with Ocean View',
      location: 'Malibu, California',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
      price: 45000,
      rating: 4.95,
      guests: 8,
      bedrooms: 4,
      beds: 5,
      featured: true,
    },
    {
      id: 2,
      title: 'Cozy Mountain Cabin',
      location: 'Aspen, Colorado',
      image: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&q=80',
      price: 27500,
      rating: 4.88,
      guests: 6,
      bedrooms: 3,
      beds: 4,
    },
  ];

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="container section">
        <MotionWrapper>
          <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '700', marginBottom: 'var(--spacing-md)', display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
              <Heart size={40} fill="var(--primary)" color="var(--primary)" />
              Your Wishlists
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
              {wishlistItems.length} saved properties
            </p>
          </div>
        </MotionWrapper>

        {wishlistItems.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--spacing-xl)' }}>
            {wishlistItems.map((listing, index) => (
              <MotionWrapper key={listing.id} delay={index * 0.1}>
                <ListingCard listing={listing} />
              </MotionWrapper>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: 'var(--spacing-3xl)' }}>
            <Heart size={64} color="var(--text-tertiary)" style={{ marginBottom: 'var(--spacing-lg)' }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: 'var(--spacing-md)' }}>
              No saved properties yet
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-xl)' }}>
              Start exploring and save your favorite places!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-gradient"
              onClick={() => (window.location.href = '/explore')}
            >
              Explore Stays
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlists;
