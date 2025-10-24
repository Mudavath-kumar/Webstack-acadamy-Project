import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, CheckCircle, Home as HomeIcon, Shield, Clock, Heart } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import CategoryGrid from '../components/CategoryGrid';
import CTASection from '../components/CTASection';
import MotionWrapper from '../components/MotionWrapper';
import ListingCard from '../components/ListingCard';

const Home = () => {
  // Mock trending destinations
  const trendingDestinations = [
    {
      name: 'Paris',
      slug: 'paris',
      country: 'France',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
      properties: 2453,
    },
    {
      name: 'Tokyo',
      slug: 'tokyo',
      country: 'Japan',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
      properties: 1876,
    },
    {
      name: 'New York',
      slug: 'new-york',
      country: 'USA',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80',
      properties: 3521,
    },
    {
      name: 'Bali',
      slug: 'bali',
      country: 'Indonesia',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
      properties: 1234,
    },
    {
      name: 'London',
      slug: 'london',
      country: 'UK',
      image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80',
      properties: 2987,
    },
    {
      name: 'Dubai',
      slug: 'dubai',
      country: 'UAE',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80',
      properties: 1654,
    },
  ];

  // Mock featured listings
  const featuredListings = [
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
      featured: false,
    },
    {
      id: 3,
      title: 'Modern Downtown Loft',
      location: 'New York, NY',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      price: 35000,
      rating: 4.92,
      guests: 4,
      bedrooms: 2,
      beds: 2,
      featured: true,
    },
    {
      id: 4,
      title: 'Beachfront Paradise',
      location: 'Tulum, Mexico',
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80',
      price: 32000,
      rating: 4.90,
      guests: 5,
      bedrooms: 2,
      beds: 3,
      featured: false,
    },
    {
      id: 5,
      title: 'Elegant City Penthouse',
      location: 'Mumbai, India',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
      price: 55000,
      rating: 4.96,
      guests: 6,
      bedrooms: 3,
      beds: 4,
      featured: true,
    },
    {
      id: 6,
      title: 'Hillside Cottage with Valley View',
      location: 'Shimla, India',
      image: 'https://images.unsplash.com/photo-1464146072230-91cabc968266?w=800&q=80',
      price: 18000,
      rating: 4.85,
      guests: 4,
      bedrooms: 2,
      beds: 2,
      featured: false,
    },
    {
      id: 7,
      title: 'Beachside Villa with Private Pool',
      location: 'Goa, India',
      image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80',
      price: 38000,
      rating: 4.93,
      guests: 8,
      bedrooms: 4,
      beds: 5,
      featured: true,
    },
    {
      id: 8,
      title: 'Heritage Haveli Stay',
      location: 'Jaipur, India',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
      price: 42000,
      rating: 4.91,
      guests: 10,
      bedrooms: 5,
      beds: 6,
      featured: false,
    },
  ];

  // How it works steps
  const steps = [
    {
      icon: Search,
      title: 'Search',
      description: 'Find your perfect stay from thousands of unique homes across the globe.',
    },
    {
      icon: CheckCircle,
      title: 'Book',
      description: 'Book with confidence using our secure payment system and get instant confirmation.',
    },
    {
      icon: HomeIcon,
      title: 'Enjoy',
      description: 'Settle into your new home-away-from-home and start your adventure.',
    },
  ];

  // Why choose us features
  const features = [
    {
      icon: Shield,
      title: 'Verified Hosts',
      description: 'We carefully vet every host to ensure quality and safety.',
    },
    {
      icon: Heart,
      title: 'Guest Favorite',
      description: 'Millions of travelers trust HomelyHub for their stays.',
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Our global support team is here to help you around the clock.',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Categories */}
      <section className="container section">
        <MotionWrapper>
          <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-2xl)' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: '700',
                marginBottom: 'var(--spacing-md)',
              }}
            >
              Discover unique experiences
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
              Explore highly curated collections for your hyper-specific tastes
            </p>
          </div>
        </MotionWrapper>

        <CategoryGrid />
      </section>

      {/* Trending Destinations */}
      <section className="container section-sm">
        <MotionWrapper>
          <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: '700',
                marginBottom: 'var(--spacing-md)',
              }}
            >
              Trending destinations
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
              Popular places travelers are booking right now
            </p>
          </div>
        </MotionWrapper>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: 'var(--spacing-lg)',
          }}
        >
          {trendingDestinations.map((destination, index) => (
            <Link
              key={destination.name}
              to={`/destination/${destination.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <MotionWrapper delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  style={{
                    position: 'relative',
                    height: '300px',
                    borderRadius: 'var(--radius-xl)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px var(--shadow-sm)',
                  }}
                >
                <img
                  src={destination.image}
                  alt={destination.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')}
                  onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: 'var(--spacing-lg)',
                    color: 'white',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {destination.name}
                  </h3>
                  <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>
                    {destination.country} · {destination.properties} properties
                  </p>
                </div>
              </motion.div>
              </MotionWrapper>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Listings */}
      <section className="container section-sm">
        <MotionWrapper>
          <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: '700',
                marginBottom: 'var(--spacing-md)',
              }}
            >
              Featured stays
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
              Hand-picked properties our guests love
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
          {featuredListings.map((listing, index) => (
            <MotionWrapper key={listing.id} delay={index * 0.1}>
              <ListingCard listing={listing} />
            </MotionWrapper>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section
        className="section"
        style={{
          background: 'var(--bg-secondary)',
          padding: 'var(--spacing-3xl) 0',
        }}
      >
        <div className="container">
          <MotionWrapper>
            <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-2xl)' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: '700',
                  marginBottom: 'var(--spacing-md)',
                }}
              >
                Your journey, simplified
              </h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                Booking your dream stay is as easy as one, two, three
              </p>
            </div>
          </MotionWrapper>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'var(--spacing-2xl)',
              maxWidth: '1000px',
              margin: '0 auto',
            }}
          >
            {steps.map((step, index) => (
              <MotionWrapper key={index} delay={index * 0.2}>
                <div
                  style={{
                    textAlign: 'center',
                    padding: 'var(--spacing-xl)',
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    style={{
                      width: '80px',
                      height: '80px',
                      margin: '0 auto var(--spacing-lg)',
                      borderRadius: 'var(--radius-xl)',
                      background: 'var(--gradient-sunset)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 10px 30px rgba(255, 56, 92, 0.3)',
                    }}
                  >
                    <step.icon size={36} color="white" />
                  </motion.div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      marginBottom: 'var(--spacing-md)',
                    }}
                  >
                    {index + 1}. {step.title}
                  </h3>
                  <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    {step.description}
                  </p>
                </div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container section">
        <MotionWrapper>
          <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-2xl)' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: '700',
                marginBottom: 'var(--spacing-md)',
              }}
            >
              Book with confidence
            </h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
              We've got you covered every step of the way
            </p>
          </div>
        </MotionWrapper>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--spacing-xl)',
            maxWidth: '1100px',
            margin: '0 auto',
          }}
        >
          {features.map((feature, index) => (
            <MotionWrapper key={index} delay={index * 0.15}>
              <motion.div
                whileHover={{ y: -8 }}
                className="glass-card"
                style={{
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    margin: '0 auto var(--spacing-lg)',
                    borderRadius: 'var(--radius-lg)',
                    background: 'var(--gradient-sunset)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <feature.icon size={32} color="white" />
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    marginBottom: 'var(--spacing-sm)',
                  }}
                >
                  {feature.title}
                </h3>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  {feature.description}
                </p>
              </motion.div>
            </MotionWrapper>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <div className="container">
        <CTASection />
      </div>
    </div>
  );
};

export default Home;
