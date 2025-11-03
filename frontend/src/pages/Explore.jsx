import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import ListingCard from '../components/ListingCard';
import MotionWrapper from '../components/MotionWrapper';
import { propertyAPI } from '../services/api';

const Explore = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  
  const [listings, setListings] = useState([]);
  const [totalProperties, setTotalProperties] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    priceMin: 0,
    priceMax: 1000,
    guests: 1,
    bedrooms: 0,
    propertyType: 'all',
    amenities: [],
  });

  // Fetch properties from API (prefer real data; fallback to mock only if needed)
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const params = {
          page: currentPage,
          limit: itemsPerPage,
        };

        // Add filters if set
        if (filters.guests > 1) params.guests = filters.guests;
        if (filters.bedrooms > 0) params.bedrooms = filters.bedrooms;
        if (filters.propertyType !== 'all') params.propertyType = filters.propertyType.toLowerCase();
        if (filters.priceMin > 0) params.minPrice = filters.priceMin;
        if (filters.priceMax < 1000) params.maxPrice = filters.priceMax * 1000; // Convert to INR
        if (filters.amenities.length > 0) params.amenities = filters.amenities.join(',');

        const { data } = await propertyAPI.getAll(params);

        if (data.success && Array.isArray(data.data)) {
          // Normalize property data for ListingCard
          const normalizedListings = data.data.map(prop => ({
            _id: prop._id,
            id: prop._id, // for compatibility
            title: prop.title,
            location: `${prop.location.city}, ${prop.location.country}`,
            image: prop.images[0]?.url || 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
            price: prop.pricing.basePrice,
            rating: prop.rating?.average || 4.5,
            guests: prop.capacity.guests,
            bedrooms: prop.capacity.bedrooms,
            beds: prop.capacity.beds,
            featured: prop.featured,
            favoriteCount: prop.favoriteCount || 0,
          }));
          setListings(normalizedListings);
          setTotalProperties(data.total || normalizedListings.length);
        } else {
          setListings([]);
          setTotalProperties(0);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
        setListings([]);
        setTotalProperties(0);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [currentPage, filters, itemsPerPage]);

  const amenities = ['wifi', 'kitchen', 'pool', 'parking', 'pet-friendly', 'air-conditioning', 'hot-tub', 'gym'];
  const propertyTypes = ['all', 'house', 'apartment', 'villa', 'cabin', 'condo'];

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="container" style={{ paddingBottom: 'var(--spacing-3xl)' }}>
        {/* Header */}
        <MotionWrapper>
          <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                fontWeight: '700',
                marginBottom: 'var(--spacing-md)',
              }}
            >
              Explore stays worldwide
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
              Discover {listings.length}+ amazing places to stay
            </p>
          </div>
        </MotionWrapper>

        {/* Filters Toggle */}
        <div style={{ marginBottom: 'var(--spacing-xl)' }}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowFilters(!showFilters)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              borderRadius: 'var(--radius-full)',
              border: '2px solid var(--border-color)',
              background: showFilters ? 'var(--primary)' : 'var(--bg-primary)',
              color: showFilters ? 'white' : 'var(--text-primary)',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            <SlidersHorizontal size={20} />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </motion.button>
        </div>

        <div style={{ display: 'flex', gap: 'var(--spacing-xl)' }}>
          {/* Filters Sidebar */}
          {showFilters && (
            <motion.aside
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              style={{
                width: '300px',
                flexShrink: 0,
              }}
            >
              <div
                className="card"
                style={{
                  position: 'sticky',
                  top: '100px',
                  padding: 'var(--spacing-xl)',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    fontWeight: '700',
                    marginBottom: 'var(--spacing-lg)',
                  }}
                >
                  Filters
                </h3>

                {/* Price Range */}
                <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                  <label
                    style={{
                      display: 'block',
                      fontWeight: '600',
                      marginBottom: 'var(--spacing-sm)',
                      fontSize: '0.95rem',
                    }}
                  >
                    Price Range
                  </label>
                  <div style={{ display: 'flex', gap: 'var(--spacing-sm)', alignItems: 'center' }}>
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.priceMin}
                      onChange={(e) => {
                        setFilters({ ...filters, priceMin: e.target.value });
                        setCurrentPage(1);
                      }}
                      className="input"
                      style={{ flex: 1 }}
                    />
                    <span>-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.priceMax}
                      onChange={(e) => {
                        setFilters({ ...filters, priceMax: e.target.value });
                        setCurrentPage(1);
                      }}
                      className="input"
                      style={{ flex: 1 }}
                    />
                  </div>
                </div>

                {/* Property Type */}
                <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                  <label
                    style={{
                      display: 'block',
                      fontWeight: '600',
                      marginBottom: 'var(--spacing-sm)',
                      fontSize: '0.95rem',
                    }}
                  >
                    Property Type
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                    {propertyTypes.map((type) => (
                      <label
                        key={type}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          cursor: 'pointer',
                        }}
                      >
                        <input
                          type="radio"
                          name="propertyType"
                          checked={filters.propertyType === type.toLowerCase()}
                          onChange={() => setFilters({ ...filters, propertyType: type.toLowerCase() })}
                          style={{ cursor: 'pointer' }}
                        />
                        <span style={{ fontSize: '0.9rem' }}>{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Bedrooms */}
                <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                  <label
                    style={{
                      display: 'block',
                      fontWeight: '600',
                      marginBottom: 'var(--spacing-sm)',
                      fontSize: '0.95rem',
                    }}
                  >
                    Bedrooms
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={filters.bedrooms}
                    onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
                    className="input"
                  />
                </div>

                {/* Amenities */}
                <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                  <label
                    style={{
                      display: 'block',
                      fontWeight: '600',
                      marginBottom: 'var(--spacing-sm)',
                      fontSize: '0.95rem',
                    }}
                  >
                    Amenities
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                    {amenities.map((amenity) => (
                      <label
                        key={amenity}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          cursor: 'pointer',
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={filters.amenities.includes(amenity)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilters({ ...filters, amenities: [...filters.amenities, amenity] });
                            } else {
                              setFilters({ ...filters, amenities: filters.amenities.filter(a => a !== amenity) });
                            }
                          }}
                          style={{ cursor: 'pointer' }}
                        />
                        <span style={{ fontSize: '0.9rem' }}>{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFilters({
                    priceMin: 0,
                    priceMax: 1000,
                    guests: 1,
                    bedrooms: 0,
                    propertyType: 'all',
                    amenities: [],
                  })}
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-md)',
                    borderRadius: 'var(--radius-full)',
                    border: '2px solid var(--border-color)',
                    background: 'transparent',
                    color: 'var(--text-primary)',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  Clear All Filters
                </motion.button>
              </div>
            </motion.aside>
          )}

          {/* Listings Grid */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: showFilters
                  ? 'repeat(auto-fill, minmax(280px, 1fr))'
                  : 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: 'var(--spacing-xl)',
                marginBottom: 'var(--spacing-2xl)',
              }}
            >
              {loading ? (
                // Loading skeleton
                Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      height: '400px',
                      borderRadius: 'var(--radius-lg)',
                      background: 'var(--bg-secondary)',
                      animation: 'pulse 1.5s ease-in-out infinite',
                    }}
                  />
                ))
              ) : listings.length === 0 ? (
                <div style={{ 
                  gridColumn: '1 / -1', 
                  textAlign: 'center', 
                  padding: 'var(--spacing-3xl)',
                  color: 'var(--text-secondary)' 
                }}>
                  <p style={{ fontSize: '1.2rem', marginBottom: 'var(--spacing-md)' }}>
                    No properties found matching your criteria.
                  </p>
                  <p>Try adjusting your filters or check back later for new listings.</p>
                </div>
              ) : (
                listings.map((listing, index) => (
                  <MotionWrapper key={listing._id} delay={index * 0.05}>
                    <ListingCard listing={listing} />
                  </MotionWrapper>
                ))
              )}
            </div>

            {/* Pagination */}
            {!loading && totalProperties > itemsPerPage && (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-2xl)' }}>
                {/* Previous Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: 'var(--spacing-md) var(--spacing-lg)',
                    borderRadius: 'var(--radius-lg)',
                    border: '2px solid var(--border-color)',
                    background: currentPage === 1 ? 'var(--bg-secondary)' : 'var(--bg-primary)',
                    color: currentPage === 1 ? 'var(--text-tertiary)' : 'var(--text-primary)',
                    fontWeight: '600',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    opacity: currentPage === 1 ? 0.5 : 1,
                  }}
                >
                  <ChevronLeft size={20} />
                  Previous
                </motion.button>

                {/* Page Numbers */}
                <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                  {Array.from({ length: Math.min(5, Math.ceil(totalProperties / itemsPerPage)) }, (_, i) => {
                    const pageNum = i + Math.max(1, currentPage - 2);
                    if (pageNum > Math.ceil(totalProperties / itemsPerPage)) return null;
                    return (
                      <motion.button
                        key={pageNum}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setCurrentPage(pageNum)}
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: 'var(--radius-lg)',
                          border: '2px solid var(--border-color)',
                          background: currentPage === pageNum ? 'var(--primary)' : 'var(--bg-primary)',
                          color: currentPage === pageNum ? 'white' : 'var(--text-primary)',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                      >
                        {pageNum}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Next Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(totalProperties / itemsPerPage)))}
                  disabled={currentPage === Math.ceil(totalProperties / itemsPerPage)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: 'var(--spacing-md) var(--spacing-lg)',
                    borderRadius: 'var(--radius-lg)',
                    border: '2px solid var(--border-color)',
                    background: currentPage === Math.ceil(totalProperties / itemsPerPage) ? 'var(--bg-secondary)' : 'var(--bg-primary)',
                    color: currentPage === Math.ceil(totalProperties / itemsPerPage) ? 'var(--text-tertiary)' : 'var(--text-primary)',
                    fontWeight: '600',
                    cursor: currentPage === Math.ceil(totalProperties / itemsPerPage) ? 'not-allowed' : 'pointer',
                    opacity: currentPage === Math.ceil(totalProperties / itemsPerPage) ? 0.5 : 1,
                  }}
                >
                  Next
                  <ChevronRight size={20} />
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default Explore;
