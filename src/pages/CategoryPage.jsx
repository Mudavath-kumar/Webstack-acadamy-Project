import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, SlidersHorizontal } from 'lucide-react';
import ListingCard from '../components/ListingCard';
import MotionWrapper from '../components/MotionWrapper';

const CategoryPage = () => {
  const { category } = useParams();
  const [showFilters, setShowFilters] = useState(false);

  const categoryData = {
    beachfront: {
      title: 'Beachfront Properties',
      description: 'Wake up to the sound of waves and stunning ocean views',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&q=80',
    },
    cabins: {
      title: 'Cozy Cabins',
      description: 'Rustic retreats in nature perfect for a peaceful getaway',
      image: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=1920&q=80',
    },
    mountain: {
      title: 'Mountain Escapes',
      description: 'Breathtaking views and fresh mountain air await you',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
    },
    luxury: {
      title: 'Luxury Stays',
      description: 'Indulge in premium properties with world-class amenities',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80',
    },
    'ski-in-out': {
      title: 'Ski-in/Ski-out',
      description: 'Direct access to slopes for the ultimate winter experience',
      image: 'https://images.unsplash.com/photo-1551524164-687a55dd1126?w=1920&q=80',
    },
    city: {
      title: 'City Living',
      description: 'Urban apartments in the heart of vibrant cities',
      image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1920&q=80',
    },
    countryside: {
      title: 'Countryside Retreats',
      description: 'Peaceful rural properties surrounded by natural beauty',
      image: 'https://images.unsplash.com/photo-1464146072230-91cabc968266?w=1920&q=80',
    },
    camping: {
      title: 'Camping & Glamping',
      description: 'Connect with nature in style and comfort',
      image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1920&q=80',
    },
  };

  const currentCategory = categoryData[category] || categoryData.beachfront;

  // Mock listings
  const listings = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    title: `${currentCategory.title} Property ${i + 1}`,
    location: ['Mumbai, India', 'Goa, India', 'Kerala, India', 'Rajasthan, India', 'Himachal Pradesh, India', 'Tamil Nadu, India'][i % 6],
    image: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&q=80',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80',
    ][i % 6],
    price: 1500 + i * 500,
    rating: 4.5 + (i % 5) / 10,
    guests: 2 + (i % 4),
    bedrooms: 1 + (i % 3),
    beds: 1 + (i % 4),
    featured: i % 3 === 0,
  }));

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
      {/* Hero Banner */}
      <div
        style={{
          position: 'relative',
          height: '400px',
          backgroundImage: `url(${currentCategory.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)',
          }}
        />
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', color: 'white', padding: '0 var(--spacing-lg)' }}>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              fontWeight: '800',
              marginBottom: 'var(--spacing-md)',
              textShadow: '0 4px 20px rgba(0,0,0,0.5)',
            }}
          >
            {currentCategory.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.5rem)',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            }}
          >
            {currentCategory.description}
          </motion.p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 'var(--spacing-2xl)', paddingBottom: 'var(--spacing-3xl)' }}>
        {/* Stats */}
        <MotionWrapper>
          <div
            style={{
              display: 'flex',
              gap: 'var(--spacing-xl)',
              marginBottom: 'var(--spacing-2xl)',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {[
              { label: 'Properties', value: listings.length },
              { label: 'Cities', value: '50+' },
              { label: 'Average Rating', value: '4.8' },
            ].map((stat, index) => (
              <div
                key={index}
                className="glass-card"
                style={{
                  padding: 'var(--spacing-lg)',
                  textAlign: 'center',
                  minWidth: '150px',
                }}
              >
                <div
                  style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    fontFamily: 'var(--font-display)',
                    color: 'var(--primary)',
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </MotionWrapper>

        {/* Filter Toggle */}
        <div style={{ marginBottom: 'var(--spacing-xl)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              fontWeight: '700',
            }}
          >
            Available Properties
          </h2>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowFilters(!showFilters)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              borderRadius: 'var(--radius-full)',
              border: '2px solid var(--border-color)',
              background: showFilters ? 'var(--primary)' : 'var(--bg-primary)',
              color: showFilters ? 'white' : 'var(--text-primary)',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            <SlidersHorizontal size={20} />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </motion.button>
        </div>

        {/* Listings Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 'var(--spacing-xl)',
          }}
        >
          {listings.map((listing, index) => (
            <MotionWrapper key={listing.id} delay={index * 0.05}>
              <ListingCard listing={listing} />
            </MotionWrapper>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
