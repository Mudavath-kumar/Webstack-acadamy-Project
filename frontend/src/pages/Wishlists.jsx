import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ListingCard from '../components/ListingCard';
import MotionWrapper from '../components/MotionWrapper';
import { favoriteAPI } from '../services/api';

const Wishlists = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const { data } = await favoriteAPI.getUserFavorites();
        console.log('Favorites response:', data);
        const favorites = data?.data || data?.favorites || [];
        setWishlistItems(favorites);
      } catch (error) {
        console.error('Error fetching favorites:', error);
        toast.error('Failed to load your wishlist');
        setWishlistItems([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="container section">
        <MotionWrapper>
          <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '700', marginBottom: 'var(--spacing-md)', display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
              <Heart size={40} fill="var(--primary)" color="var(--primary)" />
              Your Wishlists
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
              {wishlistItems.length} saved properties
            </p>
          </div>
        </MotionWrapper>

        {!loading && wishlistItems.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--spacing-xl)' }}>
            {wishlistItems.map((listing, index) => (
              <MotionWrapper key={listing._id || listing.id} delay={index * 0.1}>
                <ListingCard listing={listing} />
              </MotionWrapper>
            ))}
          </div>
        ) : loading ? (
          <div style={{ textAlign: 'center', padding: 'var(--spacing-3xl)' }}>
            <p style={{ color: 'var(--text-secondary)' }}>Loading your favorites...</p>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: 'var(--spacing-3xl)' }}>
            <Heart size={64} color="var(--text-tertiary)" style={{ marginBottom: 'var(--spacing-lg)' }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: 'var(--spacing-md)' }}>
              No saved properties yet
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-xl)' }}>
              Start exploring and save your favorite places!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-gradient"
              onClick={() => (window.location.href = '/explore')}
            >
              Explore Stays
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlists;
