import React, { useState, useEffect } from 'react';
import { Heart, Star, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';

const ListingCard = ({ listing }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(listing.favoriteCount || 0);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  
  // MongoDB uses _id, but mock data uses id
  const propertyId = listing._id || listing.id;

  useEffect(() => {
    // Check if property is in user's favorites
    if (isAuthenticated && propertyId) {
      checkFavoriteStatus();
    }
  }, [isAuthenticated, propertyId]);

  const checkFavoriteStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/favorites/check/${propertyId}`,
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

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to continue');
        return;
      }

      if (isFavorited) {
        // Remove from favorites
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/favorites/${propertyId}`,
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
          `${import.meta.env.VITE_API_URL}/favorites/${propertyId}`,
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
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      style={{ position: 'relative' }}
    >
      <Link to={`/listing/${propertyId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div
          className="card"
          style={{
            padding: 0,
            overflow: 'hidden',
            cursor: 'pointer',
          }}
        >
          {/* Image */}
          <div style={{ position: 'relative', width: '100%', paddingBottom: '75%', overflow: 'hidden', borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0' }}>
            <img
              src={listing.image}
              alt={listing.title}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={(e) => (e.target.style.transform = 'scale(1.1)')}
              onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
            />
            
            {/* Like Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleFavoriteToggle}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(255, 255, 255, 0.9)',
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
                  background: 'var(--gradient-sunset)',
                  color: 'white',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                }}
              >
                Featured
              </div>
            )}
          </div>

          {/* Content */}
          <div style={{ padding: '1rem' }}>
            {/* Location & Rating */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                <MapPin size={14} />
                <span>{listing.location}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Star size={14} fill="#FFD700" color="#FFD700" />
                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                  {listing.rating}
                </span>
              </div>
            </div>

            {/* Title */}
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1rem',
                fontWeight: '600',
                marginBottom: '0.5rem',
                color: 'var(--text-primary)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {listing.title}
            </h3>

            {/* Details */}
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
              {listing.guests} guests · {listing.bedrooms} bedrooms · {listing.beds} beds
            </p>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
              <span
                style={{
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  color: 'var(--text-primary)',
                }}
              >
                ₹{listing.price?.toLocaleString()}
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>/ night</span>
            </div>

            {/* Favorite Count */}
            {favoriteCount > 0 && (
              <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                <Heart size={12} style={{ display: 'inline', marginRight: '0.25rem' }} />
                {favoriteCount} {favoriteCount === 1 ? 'person' : 'people'} favorited this
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ListingCard;
