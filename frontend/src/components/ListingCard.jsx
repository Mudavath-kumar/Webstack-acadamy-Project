import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { Bath, BedDouble, Heart, MapPin, Star, Users } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ListingCard = ({ listing }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(listing.favoriteCount || 0);
  const [activeImage, setActiveImage] = useState(0);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  
  // MongoDB uses _id, but mock data uses id
  const propertyId = listing._id || listing.id;
  const base = import.meta.env.VITE_API_URL || '/api/v1';
  const isValidObjectId = (val) => /^[a-f\d]{24}$/i.test(String(val || ''));
  const fallbackImage = 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80';

  const galleryImages = useMemo(() => {
    const rawImages = Array.isArray(listing.images)
      ? listing.images
      : listing.gallery;

    const normalized = Array.isArray(rawImages)
      ? rawImages
          .map((image) => (typeof image === 'string' ? image : image?.url))
          .filter(Boolean)
      : [];

    if (listing.image && typeof listing.image === 'string') {
      normalized.unshift(listing.image);
    }

    return normalized.length ? Array.from(new Set(normalized)) : [fallbackImage];
  }, [listing.image, listing.images, listing.gallery]);

  useEffect(() => {
    setActiveImage(0);
  }, [galleryImages, propertyId]);

  useEffect(() => {
    // Check if property is in user's favorites (real properties only)
    if (isAuthenticated && propertyId && isValidObjectId(propertyId)) {
      checkFavoriteStatus();
    }
  }, [isAuthenticated, propertyId]);

  const checkFavoriteStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await axios.get(
        `${base}/favorites/check/${propertyId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setIsFavorited(response.data.data.isFavorited);
    } catch (error) {
      console.error('Error checking favorite status:', error);
    }
  };

  const handleFavoriteToggle = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error('Please login to add favorites');
      return;
    }

    // Prevent favorites for demo/invalid IDs
    if (!isValidObjectId(propertyId)) {
      toast('Favorites are available for real listings only.', { icon: '🔖' });
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to continue');
        return;
      }

      if (isFavorited) {
        // Remove from favorites
        await axios.delete(
          `${base}/favorites/${propertyId}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setIsFavorited(false);
        setFavoriteCount(prev => Math.max(0, prev - 1));
        toast.success('Removed from favorites');
      } else {
        // Add to favorites
        await axios.post(
          `${base}/favorites/${propertyId}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        setIsFavorited(true);
        setFavoriteCount(prev => prev + 1);
        toast.success('Added to favorites ❤️');
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast.error(error.response?.data?.message || 'Failed to update favorites');
    }
  };

  return (
    <motion.div
      whileHover={{ y: -12 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      style={{ position: 'relative' }}
    >
      <Link to={`/listing/${propertyId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div
          className="card"
          style={{
            padding: 0,
            overflow: 'hidden',
            cursor: 'pointer',
            borderRadius: 'var(--radius-2xl)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 22px 45px rgba(15, 23, 42, 0.15)',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              paddingBottom: '72%',
              overflow: 'hidden',
              borderRadius: 'var(--radius-2xl) var(--radius-2xl) 0 0',
              background: 'var(--bg-secondary)',
            }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={`${propertyId}-${galleryImages[activeImage]}`}
                src={galleryImages[activeImage] || fallbackImage}
                alt={listing.title}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'saturate(1.05)',
                }}
              />
            </AnimatePresence>

            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(15, 23, 42, 0.0) 10%, rgba(15, 23, 42, 0.45) 100%)',
              }}
            />

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleFavoriteToggle}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                width: '38px',
                height: '38px',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(255, 255, 255, 0.92)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
              }}
            >
              <Heart
                size={18}
                fill={isFavorited ? '#FF385C' : 'none'}
                color={isFavorited ? '#FF385C' : '#222222'}
              />
            </motion.button>

            {/* Featured Badge */}
            {listing.featured && (
              <div
                style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  padding: '0.4rem 0.8rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(255, 255, 255, 0.16)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.35)',
                  color: 'white',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                }}
              >
                Featured
              </div>
            )}
            <div
              style={{
                position: 'absolute',
                bottom: '18px',
                left: '18px',
                right: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: '#fff',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <span style={{ fontWeight: 600, fontSize: '0.75rem', opacity: 0.85 }}>Starting from</span>
                <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>₹{(listing.price || 0).toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.35rem 0.8rem', borderRadius: '999px', background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)' }}>
                <Star size={16} color="#FACC15" fill="#FACC15" />
                <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{listing.rating ?? '4.8'}</span>
              </div>
            </div>

            {galleryImages.length > 1 && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: '6px',
                }}
              >
                {galleryImages.slice(0, 4).map((thumb, index) => (
                  <button
                    key={`${propertyId}-thumb-${index}`}
                    type="button"
                    aria-label={`Preview image ${index + 1}`}
                    onMouseEnter={() => setActiveImage(index)}
                    onFocus={() => setActiveImage(index)}
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: 'var(--radius-md)',
                      border: index === activeImage ? '2px solid #fff' : '1px solid rgba(255,255,255,0.4)',
                      overflow: 'hidden',
                      padding: 0,
                      cursor: 'pointer',
                      background: 'rgba(15, 23, 42, 0.35)',
                    }}
                  >
                    <img
                      src={thumb || fallbackImage}
                      alt="Preview thumbnail"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div style={{ padding: '1.2rem 1.4rem 1.35rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.85rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', maxWidth: '75%' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  <MapPin size={15} />
                  {listing.location || 'Dream destination'}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.18rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    lineHeight: 1.35,
                    margin: 0,
                  }}
                >
                  {listing.title}
                </h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.15rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Rated</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}>
                  <Star size={16} color="#FACC15" fill="#FACC15" />
                  <span style={{ color: 'var(--text-primary)' }}>{listing.rating ?? '4.8'}</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Users size={16} />
                {listing.guests || 1} guests
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <BedDouble size={16} />
                {listing.bedrooms || listing.beds || 1} beds
              </span>
              {listing.bathrooms && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Bath size={16} />
                  {listing.bathrooms} baths
                </span>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem' }}>
                <span
                  style={{
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                  }}
                >
                  ₹{(listing.price || 0).toLocaleString()}
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>/ night</span>
              </div>

              {favoriteCount > 0 && (
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Heart size={13} color="#FF385C" />
                  {favoriteCount} {favoriteCount === 1 ? 'guest' : 'guests'} loved this
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ListingCard;
