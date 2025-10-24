import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, TrendingUp } from 'lucide-react';
import ListingCard from '../components/ListingCard';
import MotionWrapper from '../components/MotionWrapper';

const DestinationPage = () => {
  const { destination } = useParams();

  const destinationData = {
    paris: {
      name: 'Paris',
      country: 'France',
      description: 'The City of Light offers romantic stays near iconic landmarks',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1920&q=80',
      properties: 2453,
      avgPrice: 8500,
      popularAreas: ['Eiffel Tower Area', 'Champs-Élysées', 'Montmartre', 'Le Marais'],
    },
    tokyo: {
      name: 'Tokyo',
      country: 'Japan',
      description: 'Experience the perfect blend of tradition and modernity',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1920&q=80',
      properties: 1876,
      avgPrice: 7500,
      popularAreas: ['Shibuya', 'Shinjuku', 'Asakusa', 'Ginza'],
    },
    'new-york': {
      name: 'New York',
      country: 'USA',
      description: 'The city that never sleeps with stays in every borough',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1920&q=80',
      properties: 3521,
      avgPrice: 12000,
      popularAreas: ['Manhattan', 'Brooklyn', 'Queens', 'Times Square'],
    },
    bali: {
      name: 'Bali',
      country: 'Indonesia',
      description: 'Tropical paradise with stunning beaches and rice terraces',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&q=80',
      properties: 1234,
      avgPrice: 4500,
      popularAreas: ['Ubud', 'Seminyak', 'Canggu', 'Nusa Dua'],
    },
    london: {
      name: 'London',
      country: 'UK',
      description: 'Historic charm meets modern luxury in this global city',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1920&q=80',
      properties: 2987,
      avgPrice: 10000,
      popularAreas: ['Westminster', 'Kensington', 'Camden', 'Shoreditch'],
    },
    dubai: {
      name: 'Dubai',
      country: 'UAE',
      description: 'Luxury and innovation in the heart of the desert',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920&q=80',
      properties: 1654,
      avgPrice: 15000,
      popularAreas: ['Downtown Dubai', 'Marina', 'Palm Jumeirah', 'Jumeirah Beach'],
    },
  };

  const current = destinationData[destination] || destinationData.paris;

  const listings = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    title: `Beautiful ${['Villa', 'Apartment', 'Loft', 'Penthouse'][i % 4]} in ${current.name}`,
    location: `${current.popularAreas[i % current.popularAreas.length]}, ${current.name}`,
    image: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&q=80',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80',
    ][i % 6],
    price: current.avgPrice + (i * 1000) - 2000,
    rating: 4.5 + (i % 5) / 10,
    guests: 2 + (i % 4),
    bedrooms: 1 + (i % 3),
    beds: 1 + (i % 4),
    featured: i % 3 === 0,
  }));

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
      {/* Hero Section */}
      <div
        style={{
          position: 'relative',
          height: '500px',
          backgroundImage: `url(${current.image})`,
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
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 100%)',
          }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 10, color: 'white' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: 'var(--spacing-md)' }}>
              <MapPin size={28} />
              <span style={{ fontSize: '1.25rem', fontWeight: '600' }}>{current.country}</span>
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3rem, 8vw, 5rem)',
                fontWeight: '800',
                marginBottom: 'var(--spacing-lg)',
                textShadow: '0 4px 20px rgba(0,0,0,0.5)',
              }}
            >
              {current.name}
            </h1>
            <p
              style={{
                fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                maxWidth: '600px',
                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                marginBottom: 'var(--spacing-xl)',
              }}
            >
              {current.description}
            </p>

            <div style={{ display: 'flex', gap: 'var(--spacing-xl)', flexWrap: 'wrap' }}>
              <div className="glass" style={{ padding: 'var(--spacing-md) var(--spacing-lg)', borderRadius: 'var(--radius-lg)' }}>
                <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Properties</div>
                <div style={{ fontSize: '1.75rem', fontWeight: '700', fontFamily: 'var(--font-display)' }}>
                  {current.properties}+
                </div>
              </div>
              <div className="glass" style={{ padding: 'var(--spacing-md) var(--spacing-lg)', borderRadius: 'var(--radius-lg)' }}>
                <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Avg. Price/Night</div>
                <div style={{ fontSize: '1.75rem', fontWeight: '700', fontFamily: 'var(--font-display)' }}>
                  ₹{current.avgPrice}
                </div>
              </div>
              <div className="glass" style={{ padding: 'var(--spacing-md) var(--spacing-lg)', borderRadius: 'var(--radius-lg)' }}>
                <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Rating</div>
                <div style={{ fontSize: '1.75rem', fontWeight: '700', fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Star size={24} fill="#FFD700" color="#FFD700" />
                  4.8
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container section">
        {/* Popular Areas */}
        <MotionWrapper>
          <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                fontWeight: '700',
                marginBottom: 'var(--spacing-lg)',
              }}
            >
              Popular Areas in {current.name}
            </h2>
            <div style={{ display: 'flex', gap: 'var(--spacing-md)', flexWrap: 'wrap' }}>
              {current.popularAreas.map((area, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="card"
                  style={{
                    padding: 'var(--spacing-md) var(--spacing-lg)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <MapPin size={18} color="var(--primary)" />
                  <span style={{ fontWeight: '600' }}>{area}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </MotionWrapper>

        {/* Listings */}
        <MotionWrapper delay={0.2}>
          <div style={{ marginBottom: 'var(--spacing-xl)' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                fontWeight: '700',
                marginBottom: 'var(--spacing-sm)',
              }}
            >
              Featured Properties
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
              Discover the best stays in {current.name}
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
            <MotionWrapper key={listing.id} delay={0.3 + index * 0.05}>
              <ListingCard listing={listing} />
            </MotionWrapper>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DestinationPage;
