import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Building, Hotel, Mountain, Warehouse, Sparkles } from 'lucide-react';
import ListingCard from '../components/ListingCard';
import MotionWrapper from '../components/MotionWrapper';

const PropertyTypePage = () => {
  const { type } = useParams();

  const propertyTypeData = {
    houses: {
      title: 'Houses',
      description: 'Entire houses with space, privacy, and comfort for your perfect home away from home',
      icon: Home,
      gradient: 'var(--gradient-tropical)',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1920&q=80',
      properties: 3421,
      avgPrice: 6500,
    },
    apartments: {
      title: 'Apartments',
      description: 'Modern apartments in prime locations with all the amenities you need',
      icon: Building,
      gradient: 'var(--gradient-ocean)',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=80',
      properties: 5234,
      avgPrice: 4500,
    },
    villas: {
      title: 'Villas',
      description: 'Luxurious villas with stunning views, private pools, and exceptional service',
      icon: Sparkles,
      gradient: 'var(--gradient-sunset)',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&q=80',
      properties: 1876,
      avgPrice: 12000,
    },
    cabins: {
      title: 'Cabins',
      description: 'Cozy cabins nestled in nature for a peaceful retreat',
      icon: Mountain,
      gradient: 'var(--gradient-forest)',
      image: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1920&q=80',
      properties: 2134,
      avgPrice: 5500,
    },
    condos: {
      title: 'Condos',
      description: 'Comfortable condos with resort-style amenities and community features',
      icon: Warehouse,
      gradient: 'var(--gradient-purple)',
      image: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=1920&q=80',
      properties: 2987,
      avgPrice: 5000,
    },
    hotels: {
      title: 'Boutique Hotels',
      description: 'Unique boutique hotels offering personalized experiences',
      icon: Hotel,
      gradient: 'var(--gradient-miami)',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80',
      properties: 1543,
      avgPrice: 8000,
    },
  };

  const current = propertyTypeData[type] || propertyTypeData.houses;
  const IconComponent = current.icon;

  const listings = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    title: `${['Modern', 'Luxury', 'Cozy', 'Spacious', 'Beautiful', 'Stunning'][i % 6]} ${current.title.slice(0, -1)}`,
    location: `${['Downtown', 'Beachfront', 'Mountain View', 'City Center', 'Historic District', 'Waterfront'][i % 6]}`,
    image: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&q=80',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80',
    ][i % 6],
    price: current.avgPrice + (i * 800) - 1500,
    rating: 4.5 + (i % 5) / 10,
    guests: 2 + (i % 6),
    bedrooms: 1 + (i % 4),
    beds: 1 + (i % 5),
    featured: i % 4 === 0,
  }));

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
      {/* Hero Section */}
      <div
        style={{
          position: 'relative',
          minHeight: '500px',
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
            opacity: 0.3,
          }}
        />
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ maxWidth: '800px' }}
          >
            <div
              style={{
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
                width: '80px',
                height: '80px',
                borderRadius: 'var(--radius-xl)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--spacing-lg)',
                border: '2px solid rgba(255,255,255,0.3)',
              }}
            >
              <IconComponent size={40} color="white" strokeWidth={2} />
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
                fontWeight: '800',
                marginBottom: 'var(--spacing-lg)',
                color: 'white',
                textShadow: '0 4px 30px rgba(0,0,0,0.3)',
              }}
            >
              {current.title}
            </h1>
            <p
              style={{
                fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                color: 'white',
                marginBottom: 'var(--spacing-xl)',
                textShadow: '0 2px 15px rgba(0,0,0,0.3)',
              }}
            >
              {current.description}
            </p>

            <div style={{ display: 'flex', gap: 'var(--spacing-lg)', flexWrap: 'wrap' }}>
              <div
                className="glass"
                style={{
                  padding: 'var(--spacing-md) var(--spacing-xl)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                <div style={{ fontSize: '0.85rem', opacity: 0.9, color: 'white', marginBottom: '0.25rem' }}>
                  Total Properties
                </div>
                <div
                  style={{
                    fontSize: '1.75rem',
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
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                <div style={{ fontSize: '0.85rem', opacity: 0.9, color: 'white', marginBottom: '0.25rem' }}>
                  Avg. Price/Night
                </div>
                <div
                  style={{
                    fontSize: '1.75rem',
                    fontWeight: '700',
                    fontFamily: 'var(--font-display)',
                    color: 'white',
                  }}
                >
                  ₹{current.avgPrice}
                </div>
              </div>
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
              Featured {current.title}
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
              Browse our handpicked selection of {current.title.toLowerCase()} that offer the best experiences
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

        {/* Why Choose Section */}
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
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                fontWeight: '700',
                marginBottom: 'var(--spacing-md)',
              }}
            >
              Why Choose {current.title}?
            </h3>
            <p style={{ fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto', opacity: 0.95 }}>
              Whether you're traveling for business or leisure, our {current.title.toLowerCase()} provide the perfect
              balance of comfort, style, and location. Each property is carefully vetted to ensure quality.
            </p>
          </div>
        </MotionWrapper>
      </div>
    </div>
  );
};

export default PropertyTypePage;
