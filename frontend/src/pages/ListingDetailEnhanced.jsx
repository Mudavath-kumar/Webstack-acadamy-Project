import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, Star, Users, Home, Wifi, Car, Waves, ChevronLeft, ChevronRight, 
  Shield, Calendar, Heart, Share2, Facebook, Twitter, Link as LinkIcon,
  MessageCircle, Mail
} from 'lucide-react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useSelector } from 'react-redux';
import HostCard from '../components/HostCard';
import ReviewCard from '../components/ReviewCard';
import ListingCard from '../components/ListingCard';
import MotionWrapper from '../components/MotionWrapper';

const ListingDetailEnhanced = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [shareCount, setShareCount] = useState(0);

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const isHost = user && user.role === 'host';

  // Mock listing data - in production, fetch from API
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
    coordinates: {
      lat: 34.0259,
      lng: -118.7798
    },
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
    
    // Prevent hosts from booking
    if (isHost) {
      toast.error('Hosts cannot book properties. Please use a guest account to make bookings.');
      return;
    }
    
    window.location.href = `/checkout?listingId=${id}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`;
  };

  const handleFavoriteToggle = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add favorites');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (isFavorited) {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/favorites/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setIsFavorited(false);
        setFavoriteCount(prev => Math.max(0, prev - 1));
        toast.success('Removed from favorites');
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/favorites/${id}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setIsFavorited(true);
        setFavoriteCount(prev => prev + 1);
        toast.success('Added to favorites ❤️');
      }
    } catch (error) {
      toast.error('Failed to update favorites');
    }
  };

  const handleShare = async (platform) => {
    const url = window.location.href;
    const title = listing.title;
    const text = `Check out this amazing property: ${title}`;

    try {
      // Track share
      await axios.post(`${import.meta.env.VITE_API_URL}/properties/${id}/share`);
      setShareCount(prev => prev + 1);

      switch (platform) {
        case 'facebook':
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
          break;
        case 'twitter':
          window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
          break;
        case 'whatsapp':
          window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
          break;
        case 'email':
          window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\n' + url)}`;
          break;
        case 'copy':
          navigator.clipboard.writeText(url);
          toast.success('Link copied to clipboard!');
          break;
        default:
          break;
      }
      setShowShareMenu(false);
    } catch (error) {
      console.error('Share error:', error);
    }
  };

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: 'var(--radius-xl)',
  };

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="container" style={{ paddingBottom: 'var(--spacing-3xl)' }}>
        {/* Action Buttons (Share & Favorite) */}
        <MotionWrapper>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'flex-end', 
            gap: 'var(--spacing-md)', 
            marginBottom: 'var(--spacing-md)' 
          }}>
            <div style={{ position: 'relative' }}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowShareMenu(!showShareMenu)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-sm)',
                  padding: 'var(--spacing-sm) var(--spacing-md)',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-secondary)',
                  cursor: 'pointer',
                }}
              >
                <Share2 size={18} />
                <span>Share</span>
                {shareCount > 0 && <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>({shareCount})</span>}
              </motion.button>

              {/* Share Menu */}
              {showShareMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: 'var(--spacing-sm)',
                    padding: 'var(--spacing-md)',
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-lg)',
                    zIndex: 100,
                    minWidth: '200px',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                    <button
                      onClick={() => handleShare('facebook')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-sm)',
                        padding: 'var(--spacing-sm)',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      <Facebook size={18} color="#1877F2" />
                      <span>Facebook</span>
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-sm)',
                        padding: 'var(--spacing-sm)',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      <Twitter size={18} color="#1DA1F2" />
                      <span>Twitter</span>
                    </button>
                    <button
                      onClick={() => handleShare('whatsapp')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-sm)',
                        padding: 'var(--spacing-sm)',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      <MessageCircle size={18} color="#25D366" />
                      <span>WhatsApp</span>
                    </button>
                    <button
                      onClick={() => handleShare('email')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-sm)',
                        padding: 'var(--spacing-sm)',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      <Mail size={18} />
                      <span>Email</span>
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--spacing-sm)',
                        padding: 'var(--spacing-sm)',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      <LinkIcon size={18} />
                      <span>Copy Link</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFavoriteToggle}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)',
                padding: 'var(--spacing-sm) var(--spacing-md)',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-color)',
                background: isFavorited ? 'rgba(255, 56, 92, 0.1)' : 'var(--bg-secondary)',
                cursor: 'pointer',
              }}
            >
              <Heart 
                size={18} 
                fill={isFavorited ? '#FF385C' : 'none'} 
                color={isFavorited ? '#FF385C' : 'currentColor'} 
              />
              <span style={{ color: isFavorited ? '#FF385C' : 'inherit' }}>
                {isFavorited ? 'Saved' : 'Save'}
              </span>
              {favoriteCount > 0 && <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>({favoriteCount})</span>}
            </motion.button>
          </div>
        </MotionWrapper>

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

            {/* Location Map */}
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
                  Where you'll be
                </h2>
                <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
                  <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                    <GoogleMap
                      mapContainerStyle={mapContainerStyle}
                      center={listing.coordinates}
                      zoom={13}
                    >
                      <Marker position={listing.coordinates} />
                    </GoogleMap>
                  </LoadScript>
                </div>
                <p style={{ marginTop: 'var(--spacing-md)', color: 'var(--text-secondary)' }}>
                  <MapPin size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                  {listing.location}
                </p>
              </div>
            </MotionWrapper>

            {/* Host */}
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
                  Meet your host
                </h2>
                <HostCard host={host} />
              </div>
            </MotionWrapper>

            {/* Reviews */}
            <MotionWrapper delay={0.6}>
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
              {isHost ? (
                /* Host View - Cannot Book */
                <div style={{ textAlign: 'center' }}>
                  <div style={{ marginBottom: 'var(--spacing-md)' }}>
                    <Shield size={48} color="var(--primary)" style={{ margin: '0 auto' }} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: 'var(--spacing-sm)' }}>
                    Host View
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: 'var(--spacing-lg)' }}>
                    As a host, you can view property details but cannot make bookings.
                  </p>
                  <div style={{ padding: 'var(--spacing-md)', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', marginBottom: 'var(--spacing-md)' }}>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      💡 To book properties, please use a guest account.
                    </p>
                  </div>
                  <a href="/host-dashboard" className="btn-gradient" style={{ display: 'inline-block', textDecoration: 'none', padding: 'var(--spacing-md) var(--spacing-xl)' }}>
                    Go to Host Dashboard
                  </a>
                </div>
              ) : (
                /* Guest View - Can Book */
                <>
              <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: 'var(--spacing-sm)' }}>
                  <span style={{ fontSize: '2rem', fontWeight: '700' }}>₹{listing.price.toLocaleString()}</span>
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
                    style={{
                      width: '100%',
                      padding: 'var(--spacing-md)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--border-color)',
                    }}
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
                    style={{
                      width: '100%',
                      padding: 'var(--spacing-md)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--border-color)',
                    }}
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
                    style={{
                      width: '100%',
                      padding: 'var(--spacing-md)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--border-color)',
                    }}
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
              </>
              )}
            </motion.div>
          </div>
        </div>

        {/* Similar Listings */}
        <MotionWrapper delay={0.7}>
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
          .container > div:nth-child(3) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ListingDetailEnhanced;
