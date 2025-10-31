import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter, SlidersHorizontal, X, ChevronLeft, ChevronRight } from 'lucide-react';
import ListingCard from '../components/ListingCard';
import MotionWrapper from '../components/MotionWrapper';

const Explore = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [filters, setFilters] = useState({
    priceMin: 0,
    priceMax: 1000,
    guests: 1,
    bedrooms: 0,
    propertyType: 'all',
    amenities: [],
  });

  // Mock listings data
  const listings = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    title: `Beautiful ${['Villa', 'Apartment', 'Cabin', 'House'][i % 4]} ${i + 1}`,
    location: ['Paris, France', 'Tokyo, Japan', 'New York, USA', 'Bali, Indonesia', 'London, UK', 'Dubai, UAE'][i % 6],
    image: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&q=80',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80',
    ][i % 6],
    price: 15000 + i * 5000,
    rating: 4.5 + (i % 5) / 10,
    guests: 2 + (i % 4),
    bedrooms: 1 + (i % 3),
    beds: 1 + (i % 4),
    featured: i % 3 === 0,
  }));

  const amenities = ['WiFi', 'Kitchen', 'Pool', 'Parking', 'Pet-friendly', 'Air conditioning', 'Hot tub', 'Gym'];
  const propertyTypes = ['All', 'House', 'Apartment', 'Villa', 'Cabin', 'Condo'];

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
                      onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
                      className="input"
                      style={{ flex: 1 }}
                    />
                    <span>-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.priceMax}
                      onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
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
              {(() => {
                const indexOfLastItem = currentPage * itemsPerPage;
                const indexOfFirstItem = indexOfLastItem - itemsPerPage;
                const currentListings = listings.slice(indexOfFirstItem, indexOfLastItem);
                
                return currentListings.map((listing, index) => (
                  <MotionWrapper key={listing.id} delay={index * 0.05}>
                    <ListingCard listing={listing} />
                  </MotionWrapper>
                ));
              })()}
            </div>

            {/* Pagination */}
            {listings.length > itemsPerPage && (
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
                  {Array.from({ length: Math.ceil(listings.length / itemsPerPage) }, (_, i) => i + 1).map(pageNum => (
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
                  ))}
                </div>

                {/* Next Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(listings.length / itemsPerPage)))}
                  disabled={currentPage === Math.ceil(listings.length / itemsPerPage)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: 'var(--spacing-md) var(--spacing-lg)',
                    borderRadius: 'var(--radius-lg)',
                    border: '2px solid var(--border-color)',
                    background: currentPage === Math.ceil(listings.length / itemsPerPage) ? 'var(--bg-secondary)' : 'var(--bg-primary)',
                    color: currentPage === Math.ceil(listings.length / itemsPerPage) ? 'var(--text-tertiary)' : 'var(--text-primary)',
                    fontWeight: '600',
                    cursor: currentPage === Math.ceil(listings.length / itemsPerPage) ? 'not-allowed' : 'pointer',
                    opacity: currentPage === Math.ceil(listings.length / itemsPerPage) ? 0.5 : 1,
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
    </div>
  );
};

export default Explore;
