import { motion } from 'framer-motion';
import { CheckCircle, Clock, Heart, Home as HomeIcon, Search, Shield, Star } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import CategoryGrid from '../components/CategoryGrid';
import CountUp from '../components/CountUp';
import CTASection from '../components/CTASection';
import HeroSection from '../components/HeroSection';
import ListingCard from '../components/ListingCard';
import ListingCardSkeleton from '../components/ListingCardSkeleton';
import MotionWrapper from '../components/MotionWrapper';
import NewsletterSection from '../components/NewsletterSection';
import ScrollToTop from '../components/ScrollToTop';
import WhyChooseUs from '../components/WhyChooseUs';
import { propertyAPI } from '../services/api';

const Home = () => {
  const [featuredListings, setFeaturedListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('');
  const sectionRefs = useRef({});

  // Helper function to normalize API property data to match ListingCard format
  const normalizeProperty = (property) => {
    return {
      id: property._id,
      _id: property._id,
      title: property.title,
      location: `${property.location?.city || ''}, ${property.location?.country || ''}`.trim(),
      image: property.images && property.images.length > 0 
        ? (typeof property.images[0] === 'string' ? property.images[0] : property.images[0].url)
        : 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
      price: property.pricing?.basePrice || property.price || 0,
      rating: typeof property.rating === 'number'
        ? property.rating
        : (property.rating?.average ?? 4.5),
      guests: property.capacity?.guests || property.guests || 1,
      bedrooms: property.capacity?.bedrooms || property.bedrooms || 1,
      beds: property.capacity?.beds || property.beds || 1,
      featured: property.featured || false,
      favoriteCount: property.favoriteCount || 0,
    };
  };

  // Fetch real properties from API (prefer real; fallback to mock only if needed)
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await propertyAPI.getAll({ limit: 8, sort: '-rating.average' });
        if (response.data.success && Array.isArray(response.data.data)) {
          const normalizedProperties = response.data.data.map(normalizeProperty);
          setFeaturedListings(normalizedProperties.slice(0, 8));
        } else {
          setFeaturedListings([]);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
        setFeaturedListings([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Scroll tracking for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = Object.keys(sectionRefs.current);
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = sectionRefs.current[section];
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // No mock fallback: prefer real API data. If empty, featured grid remains empty.

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
      <section className="container section" ref={(el) => (sectionRefs.current['categories'] = el)}>
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
      <section className="container section-sm" ref={(el) => (sectionRefs.current['destinations'] = el)}>
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
                  whileHover={{ y: -8, scale: 1.02, rotateY: 5 }}
                  style={{
                    position: 'relative',
                    height: '300px',
                    borderRadius: 'var(--radius-xl)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px var(--shadow-sm)',
                    transformStyle: 'preserve-3d',
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
                    {destination.country} ·{' '}
                    <CountUp end={destination.properties} duration={2} /> properties
                  </p>
                </div>
              </motion.div>
              </MotionWrapper>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--spacing-2xl)' }}>
          <Link to="/explore">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-gradient"
              style={{
                padding: '1rem 2.5rem',
                fontSize: '1.1rem',
                fontWeight: '600',
                borderRadius: 'var(--radius-full)',
              }}
            >
              View All Destinations →
            </motion.button>
          </Link>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="container section-sm" ref={(el) => (sectionRefs.current['featured'] = el)}>
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
          {isLoading &&
            Array.from({ length: 6 }).map((_, index) => (
              <MotionWrapper key={`skeleton-${index}`} delay={index * 0.05}>
                <ListingCardSkeleton />
              </MotionWrapper>
            ))}

          {!isLoading && featuredListings.length > 0 &&
            featuredListings.map((listing, index) => (
              <MotionWrapper key={listing.id || index} delay={index * 0.1}>
                <ListingCard listing={listing} />
              </MotionWrapper>
            ))}

          {!isLoading && featuredListings.length === 0 && (
            <MotionWrapper>
              <div
                className="glass-card"
                style={{ textAlign: 'center', gridColumn: '1 / -1', padding: 'var(--spacing-2xl)' }}
              >
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>No featured stays yet</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                  New listings are being curated right now. Check back shortly or explore all stays below.
                </p>
                <Link to="/explore" className="btn btn-gradient">
                  Browse all properties
                </Link>
              </div>
            </MotionWrapper>
          )}
        </div>
      </section>

      {/* Why Choose Us - NEW SECTION */}
      <WhyChooseUs />

      {/* How It Works */}
      <section
        className="section"
        ref={(el) => (sectionRefs.current['how-it-works'] = el)}
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

      {/* Book with Confidence */}
      <section className="container section" ref={(el) => (sectionRefs.current['confidence'] = el)}>
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

      {/* Stats Section */}
      <section className="section" style={{ background: 'var(--gradient-ocean)', color: 'white' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 'var(--spacing-2xl)',
              textAlign: 'center',
            }}
          >
            <MotionWrapper>
              <motion.div whileHover={{ scale: 1.05 }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: '700', marginBottom: 'var(--spacing-sm)' }}>
                  <CountUp end={10000000} duration={2.5} />+
                </h2>
                <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>Happy Guests</p>
              </motion.div>
            </MotionWrapper>
            <MotionWrapper delay={0.1}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: '700', marginBottom: 'var(--spacing-sm)' }}>
                  <CountUp end={150} duration={2} />+
                </h2>
                <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>Countries</p>
              </motion.div>
            </MotionWrapper>
            <MotionWrapper delay={0.2}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: '700', marginBottom: 'var(--spacing-sm)' }}>
                  <CountUp end={5000000} duration={2.5} />+
                </h2>
                <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>Properties</p>
              </motion.div>
            </MotionWrapper>
            <MotionWrapper delay={0.3}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: '700', marginBottom: 'var(--spacing-sm)' }}>
                  4.9★
                </h2>
                <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>Average Rating</p>
              </motion.div>
            </MotionWrapper>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <MotionWrapper>
            <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-2xl)' }}>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                  fontWeight: '700',
                  marginBottom: 'var(--spacing-md)',
                }}
              >
                What Our Guests Say
              </h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                Real experiences from travelers around the world
              </p>
            </div>
          </MotionWrapper>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'var(--spacing-xl)',
              maxWidth: '1200px',
              margin: '0 auto',
            }}
          >
            {[
              {
                name: 'Sarah Johnson',
                location: 'New York, USA',
                avatar: 'https://i.pravatar.cc/150?img=1',
                rating: 5,
                text: 'HomelyHub made finding the perfect vacation rental so easy! The booking process was seamless, and the property exceeded our expectations. Will definitely use again!',
              },
              {
                name: 'Raj Patel',
                location: 'Mumbai, India',
                avatar: 'https://i.pravatar.cc/150?img=12',
                rating: 5,
                text: 'Amazing platform with incredible properties. The host was super responsive, and the property was exactly as described. Best vacation rental experience ever!',
              },
              {
                name: 'Emma Wilson',
                location: 'London, UK',
                avatar: 'https://i.pravatar.cc/150?img=5',
                rating: 5,
                text: 'I have used many rental platforms, but HomelyHub stands out. Great selection, easy booking, and excellent customer support. Highly recommended!',
              },
            ].map((testimonial, index) => (
              <MotionWrapper key={index} delay={index * 0.15}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="card"
                  style={{
                    padding: 'var(--spacing-xl)',
                    height: '100%',
                  }}
                >
                  <div style={{ display: 'flex', marginBottom: 'var(--spacing-md)' }}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={20} fill="#FFD700" color="#FFD700" />
                    ))}
                  </div>
                  <p style={{ fontSize: '1rem', lineHeight: '1.7', marginBottom: 'var(--spacing-lg)', color: 'var(--text-secondary)' }}>
                    "{testimonial.text}"
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: 'var(--radius-full)',
                        objectFit: 'cover',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                        {testimonial.name}
                      </h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section - NEW */}
      <NewsletterSection />

      {/* CTA Section */}
      <div className="container">
        <CTASection />
      </div>

      {/* Scroll to Top Button */}
      <ScrollToTop />

      {/* Live Chat Widget - removed duplicate, using AIChatAssistant in App.jsx */}
    </div>
  );
};

export default Home;
