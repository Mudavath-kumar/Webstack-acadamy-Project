import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Waves, Dog, Anchor, Sparkles, Eye, Accessibility } from 'lucide-react';
import ListingCard from '../components/ListingCard';
import MotionWrapper from '../components/MotionWrapper';

const AmenityPage = () => {
  const { amenity } = useParams();

  const amenityData = {
    pools: {
      title: 'Properties with Pools',
      description: 'Dive into luxury with these stunning properties featuring private or shared swimming pools',
      icon: Waves,
      gradient: 'var(--gradient-ocean)',
      image: 'https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=1920&q=80',
      properties: 2876,
      avgPrice: 7500,
      features: ['Private Pool', 'Heated Pool', 'Infinity Pool', 'Pool View'],
    },
    'pet-friendly': {
      title: 'Pet-Friendly Stays',
      description: 'Bring your furry friends along! These properties welcome pets with open arms',
      icon: Dog,
      gradient: 'var(--gradient-tropical)',
      image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=1920&q=80',
      properties: 3421,
      avgPrice: 5500,
      features: ['Pet Allowed', 'Fenced Yard', 'Pet Bed', 'Dog Park Nearby'],
    },
    waterfront: {
      title: 'Waterfront Properties',
      description: 'Wake up to breathtaking water views from beachfront, lakefront, and riverside properties',
      icon: Anchor,
      gradient: 'var(--gradient-sunset)',
      image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1920&q=80',
      properties: 1987,
      avgPrice: 9500,
      features: ['Beach Access', 'Water View', 'Dock', 'Private Beach'],
    },
    'unique-stays': {
      title: 'Unique Stays',
      description: 'Experience something extraordinary with these one-of-a-kind accommodations',
      icon: Sparkles,
      gradient: 'var(--gradient-purple)',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920&q=80',
      properties: 1234,
      avgPrice: 6500,
      features: ['Unique Architecture', 'Historic Building', 'Treehouse', 'Castle'],
    },
    views: {
      title: 'Properties with Amazing Views',
      description: 'Enjoy stunning vistas from mountain peaks to city skylines and ocean panoramas',
      icon: Eye,
      gradient: 'var(--gradient-miami)',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80',
      properties: 4532,
      avgPrice: 8000,
      features: ['Mountain View', 'Ocean View', 'City View', 'Sunset View'],
    },
    accessible: {
      title: 'Accessible Properties',
      description: 'Wheelchair-accessible properties designed for comfort and ease of mobility',
      icon: Accessibility,
      gradient: 'var(--gradient-forest)',
      image: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=1920&q=80',
      properties: 1654,
      avgPrice: 5800,
      features: ['Step-Free Access', 'Wide Doorways', 'Accessible Bathroom', 'Elevator'],
    },
  };

  const current = amenityData[amenity] || amenityData.pools;
  const IconComponent = current.icon;

  const listings = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    title: `${['Beautiful', 'Stunning', 'Luxurious', 'Modern', 'Cozy', 'Spacious'][i % 6]} ${current.title.includes('with') ? 'Property' : current.title.slice(0, -1)}`,
    location: `${['Miami Beach', 'Malibu', 'Lake Tahoe', 'Aspen', 'Santa Monica', 'Big Sur'][i % 6]}`,
    image: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&q=80',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80',
    ][i % 6],
    price: current.avgPrice + (i * 700) - 1200,
    rating: 4.6 + (i % 4) / 10,
    guests: 2 + (i % 6),
    bedrooms: 1 + (i % 4),
    beds: 1 + (i % 5),
    featured: i % 3 === 0,
  }));

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
      {/* Hero Section */}
      <div
        style={{
          position: 'relative',
          minHeight: '550px',
          background: current.gradient,
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${current.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.25,
          }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ maxWidth: '900px' }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              style={{
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(15px)',
                width: '90px',
                height: '90px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--spacing-xl)',
                border: '3px solid rgba(255,255,255,0.4)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
              }}
            >
              <IconComponent size={45} color="white" strokeWidth={2.5} />
            </motion.div>

            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
                fontWeight: '800',
                marginBottom: 'var(--spacing-lg)',
                color: 'white',
                textShadow: '0 4px 30px rgba(0,0,0,0.3)',
                lineHeight: '1.1',
              }}
            >
              {current.title}
            </h1>
            <p
              style={{
                fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                color: 'white',
                marginBottom: 'var(--spacing-2xl)',
                textShadow: '0 2px 15px rgba(0,0,0,0.3)',
                lineHeight: '1.6',
              }}
            >
              {current.description}
            </p>

            <div style={{ display: 'flex', gap: 'var(--spacing-lg)', flexWrap: 'wrap', marginBottom: 'var(--spacing-xl)' }}>
              <div
                className="glass"
                style={{
                  padding: 'var(--spacing-md) var(--spacing-xl)',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid rgba(255,255,255,0.3)',
                }}
              >
                <div style={{ fontSize: '0.85rem', opacity: 0.9, color: 'white', marginBottom: '0.25rem' }}>
                  Available
                </div>
                <div
                  style={{
                    fontSize: '1.85rem',
                    fontWeight: '700',
                    fontFamily: 'var(--font-display)',
                    color: 'white',
                  }}
                >
                  {current.properties}+
                </div>
              </div>
              <div
                className="glass"
                style={{
                  padding: 'var(--spacing-md) var(--spacing-xl)',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid rgba(255,255,255,0.3)',
                }}
              >
                <div style={{ fontSize: '0.85rem', opacity: 0.9, color: 'white', marginBottom: '0.25rem' }}>
                  Starting From
                </div>
                <div
                  style={{
                    fontSize: '1.85rem',
                    fontWeight: '700',
                    fontFamily: 'var(--font-display)',
                    color: 'white',
                  }}
                >
                  ₹{current.avgPrice}/night
                </div>
              </div>
            </div>

            {/* Features */}
            <div style={{ display: 'flex', gap: 'var(--spacing-md)', flexWrap: 'wrap' }}>
              {current.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="glass"
                  style={{
                    padding: 'var(--spacing-sm) var(--spacing-lg)',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    color: 'white',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                  }}
                >
                  ✓ {feature}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container section">
        {/* Listings Section */}
        <MotionWrapper>
          <div style={{ marginBottom: 'var(--spacing-2xl)', textAlign: 'center' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 2.75rem)',
                fontWeight: '700',
                marginBottom: 'var(--spacing-md)',
              }}
            >
              Handpicked Selection
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto' }}>
              Discover our curated collection of properties that meet your specific needs and preferences
            </p>
          </div>
        </MotionWrapper>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: 'var(--spacing-xl)',
          }}
        >
          {listings.map((listing, index) => (
            <MotionWrapper key={listing.id} delay={0.1 + index * 0.05}>
              <ListingCard listing={listing} />
            </MotionWrapper>
          ))}
        </div>

        {/* Info Card */}
        <MotionWrapper delay={0.3}>
          <div
            className="card"
            style={{
              marginTop: 'var(--spacing-3xl)',
              padding: 'var(--spacing-2xl)',
              background: current.gradient,
              color: 'white',
              textAlign: 'center',
            }}
          >
            <IconComponent size={50} color="white" style={{ margin: '0 auto var(--spacing-lg)' }} />
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                fontWeight: '700',
                marginBottom: 'var(--spacing-md)',
              }}
            >
              Perfect For Your Needs
            </h3>
            <p style={{ fontSize: '1.1rem', maxWidth: '750px', margin: '0 auto', opacity: 0.95, lineHeight: '1.7' }}>
              All properties are verified and equipped with the amenities you're looking for. We ensure quality
              standards are met so you can book with confidence and enjoy your stay.
            </p>
          </div>
        </MotionWrapper>
      </div>
    </div>
  );
};

export default AmenityPage;
