import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Map, List, Filter } from 'lucide-react';
import PropertyMap from '../components/PropertyMap';
import ListingCard from '../components/ListingCard';

/**
 * MapView Page
 * Shows properties on an interactive map with list view toggle
 */
const MapView = () => {
  const [viewMode, setViewMode] = useState('map'); // 'map' or 'list'
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // Sample properties with coordinates
  const properties = [
    {
      id: 1,
      title: 'Luxury Villa with Ocean View',
      location: 'Bali, Indonesia',
      price: 15000,
      rating: 4.9,
      reviews: 127,
      image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80',
      coordinates: { lat: -8.3405, lng: 115.0920 },
    },
    {
      id: 2,
      title: 'Modern Apartment in City Center',
      location: 'Paris, France',
      price: 12000,
      rating: 4.8,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
      coordinates: { lat: 48.8566, lng: 2.3522 },
    },
    {
      id: 3,
      title: 'Cozy Mountain Cabin',
      location: 'Swiss Alps, Switzerland',
      price: 18000,
      rating: 4.95,
      reviews: 203,
      image: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&q=80',
      coordinates: { lat: 46.8182, lng: 8.2275 },
    },
    {
      id: 4,
      title: 'Beach House with Private Pool',
      location: 'Malibu, California',
      price: 25000,
      rating: 4.92,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
      coordinates: { lat: 34.0259, lng: -118.7798 },
    },
    {
      id: 5,
      title: 'Historic Loft in SoHo',
      location: 'New York, USA',
      price: 20000,
      rating: 4.87,
      reviews: 142,
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      coordinates: { lat: 40.7231, lng: -74.0023 },
    },
    {
      id: 6,
      title: 'Traditional Ryokan',
      location: 'Kyoto, Japan',
      price: 16000,
      rating: 4.94,
      reviews: 178,
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
      coordinates: { lat: 35.0116, lng: 135.7681 },
    },
    {
      id: 7,
      title: 'Desert Oasis Villa',
      location: 'Dubai, UAE',
      price: 30000,
      rating: 4.91,
      reviews: 134,
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
      coordinates: { lat: 25.2048, lng: 55.2708 },
    },
    {
      id: 8,
      title: 'Cottage by the Lake',
      location: 'Lake District, UK',
      price: 11000,
      rating: 4.86,
      reviews: 92,
      image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80',
      coordinates: { lat: 54.4609, lng: -3.0886 },
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', paddingTop: '80px' }}>
      {/* Header */}
      <div
        style={{
          position: 'sticky',
          top: '70px',
          zIndex: 100,
          background: 'var(--glass-bg)',
          backdropFilter: 'var(--backdrop-blur)',
          borderBottom: '1px solid var(--border-color)',
          padding: '1rem 0',
        }}
      >
        <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
            {/* Title */}
            <div>
              <h1 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                Explore Properties
              </h1>
              <p style={{ color: 'var(--text-secondary)' }}>
                {properties.length} properties available
              </p>
            </div>

            {/* View Toggle & Filters */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {/* Filters Button */}
              <motion.button
                onClick={() => setShowFilters(!showFilters)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '0.75rem 1.25rem',
                  background: showFilters ? 'var(--primary)' : 'var(--bg-secondary)',
                  color: showFilters ? 'white' : 'var(--text-primary)',
                  border: `2px solid ${showFilters ? 'var(--primary)' : 'var(--border-color)'}`,
                  borderRadius: 'var(--radius-lg)',
                  cursor: 'pointer',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <Filter size={20} />
                Filters
              </motion.button>

              {/* View Mode Toggle */}
              <div
                style={{
                  display: 'flex',
                  background: 'var(--bg-secondary)',
                  border: '2px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                }}
              >
                <motion.button
                  onClick={() => setViewMode('map')}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: '0.75rem 1.25rem',
                    background: viewMode === 'map' ? 'var(--primary)' : 'transparent',
                    color: viewMode === 'map' ? 'white' : 'var(--text-primary)',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <Map size={20} />
                  Map
                </motion.button>
                <motion.button
                  onClick={() => setViewMode('list')}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: '0.75rem 1.25rem',
                    background: viewMode === 'list' ? 'var(--primary)' : 'transparent',
                    color: viewMode === 'list' ? 'white' : 'var(--text-primary)',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <List size={20} />
                  List
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          style={{
            background: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-color)',
            padding: '2rem 0',
          }}
        >
          <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>Filters will be available soon!</p>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        {viewMode === 'map' ? (
          /* Map View */
          <PropertyMap
            properties={properties}
            onPropertySelect={setSelectedProperty}
            center={{ lat: 28.6139, lng: 77.2090 }}
          />
        ) : (
          /* List View */
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '2rem',
            }}
          >
            {properties.map((property) => (
              <ListingCard key={property.id} listing={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MapView;
