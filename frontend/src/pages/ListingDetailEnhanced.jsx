import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import {
    Calendar,
    Car,
    ChevronLeft, ChevronRight,
    Facebook,
    Heart,
    Info,
    Link as LinkIcon,
    Loader,
    Mail,
    MapPin,
    MessageCircle,
    Share2,
    Shield,
    Star,
    Twitter,
    Waves,
    Wifi
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ConfirmDialog from '../components/ConfirmDialog';
import HostCard from '../components/HostCard';
import ListingCard from '../components/ListingCard';
import MotionWrapper from '../components/MotionWrapper';
import ReviewCard from '../components/ReviewCard';
import ScrollToTop from '../components/ScrollToTop';
import { bookingAPI, propertyAPI } from '../services/api';
import '../styles/ListingDetailEnhanced.css';

const ListingDetailEnhanced = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [shareCount, setShareCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [autoSlide, setAutoSlide] = useState(true);
  const [mapLoading, setMapLoading] = useState(true);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userBooking, setUserBooking] = useState(null);
  const [cancellingBooking, setCancellingBooking] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  
  const similarScrollRef = useRef(null);

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const isHost = user && user.role === 'host';

  const isValidObjectId = (val) => /^[a-f\d]{24}$/i.test(String(val || ''));

  // Helper functions (use function declarations so they're available before use)
  function getAmenityIcon(amenity) {
    const iconMap = {
      wifi: Wifi,
      parking: Car,
      pool: Waves,
      'air-conditioning': Shield,
      kitchen: Wifi,
      gym: Shield,
    };
    return iconMap[amenity] || Wifi;
  }

  function formatAmenityName(amenity) {
    return amenity
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // Fetch property data from API
  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      try {
        console.log('Fetching property with ID:', id);
        const { data } = await propertyAPI.getOne(id);
        console.log('Property API response:', data);
        const prop = data?.data || data;
        
        if (!prop || !prop._id) {
          console.error('Invalid property data received:', prop);
          throw new Error('Property not found');
        }
        
        console.log('Property loaded successfully:', prop.title);
        setProperty(prop);
        setGuests(1); // Default guests
        setFavoriteCount(prop.favoriteCount || 0);
        setShareCount(prop.shareCount || 0);
      } catch (error) {
        console.error('Error fetching property:', error);
        console.error('Property ID that failed:', id);
        toast.error('😔 Oops! This property doesn\'t exist or was removed.');
        setTimeout(() => navigate('/explore'), 2000);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      // Validate ID format (MongoDB ObjectId is 24 hex characters)
      if (id.length !== 24 || !/^[0-9a-fA-F]{24}$/.test(id)) {
        console.error('Invalid property ID format:', id);
        toast.error('😔 Invalid property ID. Redirecting to explore...');
        setTimeout(() => navigate('/explore'), 2000);
        setLoading(false);
        return;
      }
      fetchProperty();
    }
  }, [id, navigate]);

  // Check if user has an active booking for this property
  useEffect(() => {
    const checkUserBooking = async () => {
      if (!isAuthenticated || !id) return;
      
      try {
        const { data } = await bookingAPI.getUserBookings();
        const bookings = data?.data || [];
        
        // Find active booking for this property
        const activeBooking = bookings.find(
          booking => 
            booking.property?._id === id && 
            booking.status !== 'cancelled' &&
            new Date(booking.checkOut) > new Date()
        );
        
        if (activeBooking) {
          setUserBooking(activeBooking);
        }
      } catch (error) {
        console.error('Error checking user booking:', error);
      }
    };
    
    checkUserBooking();
  }, [id, isAuthenticated]);

  const openCancelDialog = () => {
    setShowCancelDialog(true);
  };

  const handleCancelBooking = async () => {
    if (!userBooking) return;
    
    setCancellingBooking(true);
    try {
      const response = await bookingAPI.cancelBooking(userBooking._id);
      toast.success('✅ Booking cancelled successfully!');
      setShowCancelDialog(false);
      setUserBooking(null);
      // Refresh bookings
      const { data } = await bookingAPI.getUserBookings();
      const bookings = data?.data || [];
      const activeBooking = bookings.find(
        booking => 
          booking.property?._id === id && 
          booking.status !== 'cancelled' &&
          new Date(booking.checkOut) > new Date()
      );
      setUserBooking(activeBooking || null);
    } catch (error) {
      console.error('Error cancelling booking:', error);
      
      // Extract detailed error message
      let errorMessage = '❌ Failed to cancel booking.';
      
      if (error.response) {
        // Server responded with error status
        const serverMessage = error.response.data?.message;
        
        if (error.response.status === 404) {
          errorMessage = '❌ Booking not found. It may have already been cancelled.';
        } else if (error.response.status === 403) {
          errorMessage = '❌ You are not authorized to cancel this booking.';
        } else if (error.response.status === 400) {
          if (serverMessage?.includes('24 hours')) {
            errorMessage = '⏰ Cannot cancel booking less than 24 hours before check-in.';
          } else if (serverMessage?.includes('already cancelled')) {
            errorMessage = '❌ This booking has already been cancelled.';
          } else {
            errorMessage = `❌ ${serverMessage || 'Cannot cancel this booking.'}`;
          }
        } else if (serverMessage) {
          errorMessage = `❌ ${serverMessage}`;
        }
      } else if (error.request) {
        // Request made but no response received
        errorMessage = '🌐 Network error. Please check your internet connection.';
      } else {
        // Something else went wrong
        errorMessage = `❌ ${error.message || 'An unexpected error occurred.'}`;
      }
      
      toast.error(errorMessage, { duration: 5000 });
      setShowCancelDialog(false);
    } finally {
      setCancellingBooking(false);
    }
  };


  // Normalize property data for display
  const listing = property ? {
    _id: property._id,
    id: property._id,
    title: property.title,
    location: `${property.location.city}, ${property.location.country}`,
    price: property.pricing?.basePrice || 0,
    rating: typeof property.rating === 'object' ? (property.rating?.average || 0) : (property.rating || 0),
    reviews: typeof property.rating === 'object' ? (property.rating?.count || 0) : 0,
    guests: property.capacity?.guests || 1,
    bedrooms: property.capacity?.bedrooms || 0,
    beds: property.capacity?.beds || 0,
    bathrooms: property.capacity?.bathrooms || 0,
    coordinates: property.location?.coordinates
      ? {
          lat: property.location.coordinates.latitude ?? property.location.coordinates.lat ?? 0,
          lng: property.location.coordinates.longitude ?? property.location.coordinates.lng ?? 0,
        }
      : { lat: 0, lng: 0 },
    images: property.images?.map(img => img.url || img) || [],
    description: property.description || '',
    amenities: property.amenities?.slice(0, 8).map(am => ({
      icon: getAmenityIcon(am),
      name: formatAmenityName(am),
    })) || [],
    cleaningFee: property.pricing?.cleaningFee || 0,
    serviceFee: property.pricing?.serviceFee || 0,
  } : null;

  const host = property?.owner ? {
    name: property.owner.name || 'Host',
    avatar: property.owner.avatar || 'https://i.pravatar.cc/150?img=1',
    verified: true,
    joinDate: property.owner.createdAt ? `Joined in ${new Date(property.owner.createdAt).getFullYear()}` : 'Member',
    rating: 4.8,
    reviews: 0,
    properties: 1,
    responseRate: 95,
    responseTime: '< 1hr',
    bio: property.owner.bio || 'Passionate about hospitality and creating memorable experiences for guests.',
  } : null;

  // Scroll detection for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-slide image gallery
  useEffect(() => {
    if (!autoSlide || !listing?.images?.length) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % listing.images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [autoSlide, listing?.images?.length]);

  // Map loading simulation
  useEffect(() => {
    const timer = setTimeout(() => setMapLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Show loading state
  if (loading) {
    return (
      <div style={{ paddingTop: '100px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <Loader size={48} className="spin" style={{ margin: '0 auto var(--spacing-lg)', color: 'var(--primary)' }} />
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>Loading property...</p>
        </div>
      </div>
    );
  }

  // Show error state if property not found
  if (!property || !listing) {
    return (
      <div style={{ paddingTop: '100px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '1.5rem', marginBottom: 'var(--spacing-md)' }}>Property not found</p>
          <button onClick={() => navigate('/explore')} className="btn-gradient">
            Browse Properties
          </button>
        </div>
      </div>
    );
  }

  const reviews = [];

  const similarListings = [];

  const nextImage = () => {
    if (listing.images && listing.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % listing.images.length);
    }
  };

  const prevImage = () => {
    if (listing.images && listing.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + listing.images.length) % listing.images.length);
    }
  };

  const handleBooking = (e) => {
    e.preventDefault();
    
    // Validate dates and guests
    if (!checkIn || !checkOut) {
      toast.error('Please select check-in and check-out dates');
      return;
    }
    
    if (!guests || guests < 1) {
      toast.error('Please select number of guests');
      return;
    }
    
    if (new Date(checkIn) >= new Date(checkOut)) {
      toast.error('Check-out date must be after check-in date');
      return;
    }
    
    // Prevent hosts from booking
    if (isHost) {
      toast.error('Hosts cannot book properties. Please use a guest account to make bookings.');
      return;
    }
    
    // Prevent booking for demo listings or invalid IDs
    if (listing._id === 'demo-property' || !isValidObjectId(listing._id)) {
      toast.error('This is a demo preview. Please choose a real listing from Explore to book.');
      navigate('/explore');
      return;
    }

    // Use real property ID for booking
    navigate(`/checkout?listingId=${listing._id}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`);
  };

  const handleFavoriteToggle = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add favorites');
      return;
    }

    // Skip favorites for demo listings
    if (property?._id === 'demo-property' || !isValidObjectId(id)) {
      toast('Favorites are available for real listings only.', { icon: '🔖' });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const base = import.meta.env.VITE_API_URL || '/api/v1';
      if (isFavorited) {
        await axios.delete(
          `${base}/favorites/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setIsFavorited(false);
        setFavoriteCount(prev => Math.max(0, prev - 1));
        toast.success('Removed from favorites');
      } else {
        await axios.post(
          `${base}/favorites/${id}`,
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
      const base = import.meta.env.VITE_API_URL || '/api/v1';
      // For demo listings, do not call backend share endpoint
      if (property?._id === 'demo-property' || !isValidObjectId(id)) {
        // Just copy link or open platform share
      } else {
        // Track share for real properties
        await axios.post(`${base}/properties/${id}/share`);
        setShareCount(prev => prev + 1);
      }

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
            <div className="image-gallery-container">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImageIndex}
                  src={listing.images[currentImageIndex]}
                  alt={listing.title}
                  className="gallery-image"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </AnimatePresence>
              
              {/* Navigation Buttons */}
              <button
                onClick={prevImage}
                className="gallery-controls gallery-control-btn"
                style={{ left: '20px' }}
              >
                <ChevronLeft size={24} />
              </button>
              
              <button
                onClick={nextImage}
                className="gallery-controls gallery-control-btn"
                style={{ right: '20px' }}
              >
                <ChevronRight size={24} />
              </button>

              {/* Auto-slide toggle */}
              <button
                onClick={() => setAutoSlide(!autoSlide)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  padding: '0.5rem 1rem',
                  borderRadius: '50px',
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  zIndex: 10,
                }}
              >
                {autoSlide ? 'Pause' : 'Play'} Slideshow
              </button>

              {/* Dots Navigation */}
              <div className="gallery-dots">
                {listing.images.map((_, index) => (
                  <div
                    key={index}
                    className={`gallery-dot ${index === currentImageIndex ? 'active' : ''}`}
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
                <h1 className="property-title">
                  {listing.title}
                </h1>
                {listing._id === 'demo-property' && (
                  <div style={{
                    marginTop: '0.25rem',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '8px',
                    background: 'var(--bg-secondary)',
                    border: '1px dashed var(--border-color)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '1rem'
                  }}>
                    <Info size={16} />
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      Demo preview — open Explore to view real, bookable listings from the database.
                    </span>
                  </div>
                )}
                <div className="property-meta">
                  {/* Star Rating Display */}
                  <div className="rating-display">
                    {[...Array(5)].map((_, index) => (
                      <motion.div
                        key={index}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: index * 0.1, type: 'spring', stiffness: 200 }}
                      >
                        <Star 
                          size={18} 
                          fill={index < Math.floor(listing.rating) ? '#FFD700' : 'none'} 
                          color="#FFD700" 
                        />
                      </motion.div>
                    ))}
                    <span style={{ fontWeight: '600', marginLeft: '0.25rem' }}>
                      {typeof listing.rating === 'number' ? listing.rating.toFixed(1) : '0.0'}
                    </span>
                    <span style={{ color: 'var(--text-secondary)' }}>({listing.reviews} reviews)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                    <MapPin size={18} />
                    <span style={{ fontWeight: '500' }}>
                      {typeof listing.location === 'string' 
                        ? listing.location 
                        : `${listing.location?.city || ''}, ${listing.location?.country || ''}`.trim() || 'Location unavailable'}
                    </span>
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
                <div className={`description-text ${!showFullDescription ? 'collapsed' : ''}`}>
                  <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                    {listing.description}
                  </p>
                </div>
                {listing.description.length > 300 && (
                  <button
                    className="show-more-btn"
                    onClick={() => setShowFullDescription(!showFullDescription)}
                  >
                    {showFullDescription ? 'Show less' : 'Show more'}
                  </button>
                )}
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
                <div className="amenities-grid">
                  {listing.amenities.map((amenity, index) => (
                    <motion.div
                      key={index}
                      className="amenity-item"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="amenity-icon">
                        <amenity.icon size={20} />
                      </div>
                      <span style={{ fontWeight: '500' }}>{amenity.name}</span>
                    </motion.div>
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
                <div className="map-container">
                  {mapLoading && <div className="map-loading" />}
                  <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''}>
                    <GoogleMap
                      mapContainerStyle={mapContainerStyle}
                      center={listing.coordinates}
                      zoom={13}
                      onLoad={() => setMapLoading(false)}
                    >
                      <Marker position={listing.coordinates} />
                    </GoogleMap>
                  </LoadScript>
                </div>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  style={{ marginTop: 'var(--spacing-md)', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  <MapPin size={18} />
                  <span style={{ fontWeight: '500' }}>
                    {typeof listing.location === 'string' 
                      ? listing.location 
                      : `${listing.location?.city || ''}, ${listing.location?.country || ''}`.trim() || 'Location unavailable'}
                  </span>
                </motion.p>
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
              className="card booking-sidebar"
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
                /* Guest View - Can Book (real listings only) */
                <>
              {/* Show existing booking notification if user has already booked */}
              {userBooking && (() => {
                const checkInDate = new Date(userBooking.checkIn);
                const now = new Date();
                const hoursUntilCheckIn = (checkInDate - now) / (1000 * 60 * 60);
                const canCancel = hoursUntilCheckIn >= 24;
                
                return (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    padding: 'var(--spacing-md)',
                    marginBottom: 'var(--spacing-lg)',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderRadius: 'var(--radius-lg)',
                    color: 'white',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <Calendar size={18} />
                    <strong>You have an active booking!</strong>
                  </div>
                  <div style={{ fontSize: '0.9rem', marginBottom: '0.5rem', opacity: 0.95 }}>
                    Check-in: <strong>{new Date(userBooking.checkIn).toLocaleDateString()}</strong>
                  </div>
                  <div style={{ fontSize: '0.9rem', marginBottom: '0.75rem', opacity: 0.95 }}>
                    Check-out: <strong>{new Date(userBooking.checkOut).toLocaleDateString()}</strong>
                  </div>
                  
                  {!canCancel && (
                    <div style={{ 
                      fontSize: '0.8rem', 
                      marginBottom: '0.75rem', 
                      padding: '0.5rem', 
                      background: 'rgba(255, 255, 255, 0.15)',
                      borderRadius: 'var(--radius-sm)',
                      opacity: 0.95 
                    }}>
                      ⏰ Cancellation not available (less than 24 hours to check-in)
                    </div>
                  )}
                  
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate('/trips')}
                      style={{
                        flex: 1,
                        padding: '0.5rem 1rem',
                        background: 'rgba(255, 255, 255, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: 'var(--radius-md)',
                        color: 'white',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                      }}
                    >
                      View Details
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: canCancel ? 1.02 : 1 }}
                      whileTap={{ scale: canCancel ? 0.98 : 1 }}
                      onClick={canCancel ? openCancelDialog : null}
                      disabled={cancellingBooking || !canCancel}
                      style={{
                        flex: 1,
                        padding: '0.5rem 1rem',
                        background: !canCancel ? 'rgba(255, 255, 255, 0.1)' : (cancellingBooking ? 'rgba(255, 255, 255, 0.1)' : 'rgba(239, 68, 68, 0.9)'),
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: 'var(--radius-md)',
                        color: 'white',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        cursor: !canCancel || cancellingBooking ? 'not-allowed' : 'pointer',
                        opacity: !canCancel || cancellingBooking ? 0.6 : 1,
                      }}
                      title={!canCancel ? 'Cannot cancel less than 24 hours before check-in' : ''}
                    >
                      {cancellingBooking ? 'Cancelling...' : 'Cancel Booking'}
                    </motion.button>
                  </div>
                </motion.div>
                );
              })()}
              
              <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: 'var(--spacing-sm)' }}>
                  <span className="price-display">₹{listing.price.toLocaleString()}</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>/ night</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Star size={14} fill="#FFD700" color="#FFD700" />
                  <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>
                    {typeof listing.rating === 'number' ? listing.rating.toFixed(1) : '0.0'}
                  </span>
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
                    className="booking-input"
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
                    className="booking-input"
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
                    className="booking-input"
                    required
                  />
                </div>

                {listing._id === 'demo-property' ? (
                  <button
                    type="button"
                    onClick={() => navigate('/explore')}
                    className="btn-gradient"
                    style={{ width: '100%', padding: 'var(--spacing-md)' }}
                  >
                    Browse real listings
                  </button>
                ) : (
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="reserve-button"
                  >
                    Reserve
                  </motion.button>
                )}
              </form>

              <div className="info-note">
                <Info size={16} />
                <span>{listing._id === 'demo-property' ? 'Demo listing — booking is disabled' : "You won't be charged yet"}</span>
              </div>
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

      {/* Scroll to Top Button */}
      <ScrollToTop />

      {/* Cancel Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showCancelDialog}
        onClose={() => setShowCancelDialog(false)}
        onConfirm={handleCancelBooking}
        title="Cancel Your Booking?"
        message={userBooking ? `Are you sure you want to cancel your booking from ${new Date(userBooking.checkIn).toLocaleDateString()} to ${new Date(userBooking.checkOut).toLocaleDateString()}?\n\nCancellation Policy: Free cancellation up to 24 hours before check-in. This action cannot be undone.` : ''}
        confirmText="Yes, Cancel Booking"
        cancelText="Keep Booking"
        isLoading={cancellingBooking}
      />

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
