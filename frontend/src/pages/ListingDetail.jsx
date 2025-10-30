import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, Users, Home, Wifi, Car, Waves, ChevronLeft, ChevronRight, Shield, Calendar } from 'lucide-react';
import HostCard from '../components/HostCard';
import ReviewCard from '../components/ReviewCard';
import ListingCard from '../components/ListingCard';
import MotionWrapper from '../components/MotionWrapper';

const ListingDetail = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  // Mock listing data
  const listing = {
    id,
    title: 'Luxury Beachfront Villa',
    location: 'Malibu, California',
    price: 45000,
    rating: 4.95,
    reviews: 128,
    guests: 8,
    bedrooms: 4,
    beds: 5,
    bathrooms: 3,
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80',
    ],
    description: 'Experience luxury coastal living in this stunning beachfront villa. Wake up to breathtaking ocean views, enjoy your morning coffee on the expansive deck, and spend your days lounging by the infinity pool or strolling along the private beach. This meticulously designed property combines modern elegance with comfortable living spaces, perfect for families or groups seeking an unforgettable getaway.',
    amenities: [
      { icon: Wifi, name: 'WiFi' },
      { icon: Car, name: 'Free parking' },
      { icon: Waves, name: 'Private pool' },
      { icon: Shield, name: '24/7 Security' },
    ],
  };

  const host = {
    name: 'Sarah Johnson',
    avatar: 'https://i.pravatar.cc/150?img=1',
    verified: true,
    joinDate: 'Joined in 2019',
    rating: 4.98,
    reviews: 234,
    properties: 12,
    responseRate: 98,
    responseTime: '< 1hr',
    bio: 'Passionate about hospitality and creating memorable experiences for my guests. I love sharing my beautiful properties with travelers from around the world.',
  };

  const reviews = [
    {
      name: 'Michael Chen',
      avatar: 'https://i.pravatar.cc/150?img=12',
      location: 'San Francisco, CA',
      date: 'March 2024',
      rating: 5,
      text: 'Absolutely stunning property! The views were incredible and the house had everything we needed. Sarah was a wonderful host and very responsive. Highly recommend!',
    },
    {
      name: 'Emma Williams',
      avatar: 'https://i.pravatar.cc/150?img=5',
      location: 'London, UK',
      date: 'February 2024',
      rating: 5,
      text: 'This place exceeded all our expectations. The infinity pool and beach access made our vacation perfect. Would definitely stay here again!',
    },
  ];

  const similarListings = [
    {
      id: 10,
      title: 'Modern Beach House',
      location: 'Santa Monica, CA',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      price: 38000,
      rating: 4.88,
      guests: 6,
      bedrooms: 3,
      beds: 4,
    },
    {
      id: 11,
      title: 'Coastal Retreat',
      location: 'Laguna Beach, CA',
      image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80',
      price: 42500,
      rating: 4.92,
      guests: 7,
      bedrooms: 4,
      beds: 5,
    },
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % listing.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + listing.images.length) % listing.images.length);
  };

  const handleBooking = (e) => {
    e.preventDefault();
    window.location.href = `/checkout?listingId=${id}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`;
  };

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="container" style={{ paddingBottom: 'var(--spacing-3xl)' }}>
        {/* Image Gallery */}
        <MotionWrapper>
          <div style={{ position: 'relative', marginBottom: 'var(--spacing-xl)' }}>
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '500px',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
              }}
            >
              <img
                src={listing.images[currentImageIndex]}
                alt={listing.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              
              <button
                onClick={prevImage}
                style={{
                  position: 'absolute',
                  left: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ChevronLeft size={24} />
              </button>
              
              <button
                onClick={nextImage}
                style={{
                  position: 'absolute',
                  right: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ChevronRight size={24} />
              </button>

              <div
                style={{
                  position: 'absolute',
                  bottom: '20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: '8px',
                }}
              >
                {listing.images.map((_, index) => (
                  <div
                    key={index}
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: index === currentImageIndex ? 'white' : 'rgba(255, 255, 255, 0.5)',
                      cursor: 'pointer',
                    }}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </MotionWrapper>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--spacing-2xl)' }}>
          {/* Main Content */}
          <div>
            {/* Header */}
            <MotionWrapper>
              <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                <h1
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                    fontWeight: '700',
                    marginBottom: 'var(--spacing-sm)',
                  }}
                >
                  {listing.title}
                </h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Star size={16} fill="#FFD700" color="#FFD700" />
                    <span style={{ fontWeight: '600' }}>{listing.rating}</span>
                    <span style={{ color: 'var(--text-secondary)' }}>({listing.reviews} reviews)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)' }}>
                    <MapPin size={16} />
                    <span>{listing.location}</span>
                  </div>
                </div>
              </div>
            </MotionWrapper>

            {/* Details */}
            <MotionWrapper delay={0.1}>
              <div
                className="card"
                style={{
                  padding: 'var(--spacing-xl)',
                  marginBottom: 'var(--spacing-xl)',
                }}
              >
                <div style={{ display: 'flex', gap: 'var(--spacing-xl)', flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ fontSize: '1.25rem', fontWeight: '700' }}>{listing.guests}</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Guests</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.25rem', fontWeight: '700' }}>{listing.bedrooms}</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Bedrooms</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.25rem', fontWeight: '700' }}>{listing.beds}</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Beds</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.25rem', fontWeight: '700' }}>{listing.bathrooms}</div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Bathrooms</div>
                  </div>
                </div>
              </div>
            </MotionWrapper>

            {/* Description */}
            <MotionWrapper delay={0.2}>
              <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    marginBottom: 'var(--spacing-md)',
                  }}
                >
                  About this place
                </h2>
                <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                  {listing.description}
                </p>
              </div>
            </MotionWrapper>

            {/* Amenities */}
            <MotionWrapper delay={0.3}>
              <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    marginBottom: 'var(--spacing-lg)',
                  }}
                >
                  What this place offers
                </h2>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: 'var(--spacing-md)',
                  }}
                >
                  {listing.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-sm)',
                        padding: 'var(--spacing-md)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-md)',
                      }}
                    >
                      <amenity.icon size={20} color="var(--primary)" />
                      <span>{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </MotionWrapper>

            {/* Host */}
            <MotionWrapper delay={0.4}>
              <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    marginBottom: 'var(--spacing-lg)',
                  }}
                >
                  Meet your host
                </h2>
                <HostCard host={host} />
              </div>
            </MotionWrapper>

            {/* Reviews */}
            <MotionWrapper delay={0.5}>
              <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                <h2
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    marginBottom: 'var(--spacing-lg)',
                  }}
                >
                  Guest reviews
                </h2>
                <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
                  {reviews.map((review, index) => (
                    <ReviewCard key={index} review={review} />
                  ))}
                </div>
              </div>
            </MotionWrapper>
          </div>

          {/* Booking Panel */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
              style={{
                position: 'sticky',
                top: '100px',
                padding: 'var(--spacing-xl)',
              }}
            >
              <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: 'var(--spacing-sm)' }}>
                  <span style={{ fontSize: '2rem', fontWeight: '700' }}>₹{listing.price}</span>
                  <span style={{ color: 'var(--text-secondary)' }}>/ night</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Star size={14} fill="#FFD700" color="#FFD700" />
                  <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{listing.rating}</span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>({listing.reviews} reviews)</span>
                </div>
              </div>

              <form onSubmit={handleBooking}>
                <div style={{ marginBottom: 'var(--spacing-md)' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                    Check-in
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="input"
                    required
                  />
                </div>

                <div style={{ marginBottom: 'var(--spacing-md)' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                    Check-out
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="input"
                    required
                  />
                </div>

                <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                    Guests
                  </label>
                  <input
                    type="number"
                    min="1"
                    max={listing.guests}
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="input"
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-gradient"
                  style={{ width: '100%', padding: 'var(--spacing-md)' }}
                >
                  Reserve
                </motion.button>
              </form>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center', marginTop: 'var(--spacing-md)' }}>
                You won't be charged yet
              </p>
            </motion.div>
          </div>
        </div>

        {/* Similar Listings */}
        <MotionWrapper delay={0.6}>
          <div style={{ marginTop: 'var(--spacing-3xl)' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                fontWeight: '700',
                marginBottom: 'var(--spacing-xl)',
              }}
            >
              Similar stays
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--spacing-xl)' }}>
              {similarListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>
        </MotionWrapper>
      </div>

      <style>{`
        @media (max-width: 968px) {
          .container > div:first-of-type {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ListingDetail;
