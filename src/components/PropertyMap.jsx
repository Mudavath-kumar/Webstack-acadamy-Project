import React, { useState, useCallback, useRef } from 'react';
import { MapPin, Navigation, ZoomIn, ZoomOut } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * PropertyMap Component
 * Displays properties on an interactive map with markers
 * Uses Mapbox GL JS for rendering
 */
const PropertyMap = ({ properties = [], onPropertySelect, center, zoom = 12 }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [mapCenter, setMapCenter] = useState(center || { lat: 28.6139, lng: 77.2090 }); // Default: Delhi
  const [mapZoom, setMapZoom] = useState(zoom);
  const mapRef = useRef(null);

  // Handle property marker click
  const handleMarkerClick = useCallback((property) => {
    setSelectedProperty(property);
    if (onPropertySelect) {
      onPropertySelect(property);
    }
  }, [onPropertySelect]);

  // Get user's current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setMapZoom(13);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  // Zoom controls
  const zoomIn = () => setMapZoom((prev) => Math.min(prev + 1, 18));
  const zoomOut = () => setMapZoom((prev) => Math.max(prev - 1, 3));

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '600px' }}>
      {/* Map Container */}
      <div
        ref={mapRef}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          background: 'var(--bg-secondary)',
          position: 'relative',
        }}
      >
        {/* Placeholder for actual map - In production, use Mapbox GL JS or Google Maps */}
        <div
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            opacity: 0.1,
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />

        {/* Property Markers */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          {properties.map((property, index) => (
            <PropertyMarker
              key={property.id || index}
              property={property}
              position={{
                x: `${20 + (index % 4) * 20}%`,
                y: `${20 + Math.floor(index / 4) * 25}%`,
              }}
              isSelected={selectedProperty?.id === property.id}
              onClick={() => handleMarkerClick(property)}
            />
          ))}
        </div>

        {/* Map Controls */}
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          {/* Current Location Button */}
          <motion.button
            onClick={getCurrentLocation}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: '44px',
              height: '44px',
              background: 'white',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-lg)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)',
            }}
            title="My Location"
          >
            <Navigation size={20} />
          </motion.button>

          {/* Zoom In */}
          <motion.button
            onClick={zoomIn}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: '44px',
              height: '44px',
              background: 'white',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-lg)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)',
            }}
            title="Zoom In"
          >
            <ZoomIn size={20} />
          </motion.button>

          {/* Zoom Out */}
          <motion.button
            onClick={zoomOut}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              width: '44px',
              height: '44px',
              background: 'white',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-lg)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)',
            }}
            title="Zoom Out"
          >
            <ZoomOut size={20} />
          </motion.button>
        </div>

        {/* Selected Property Card */}
        {selectedProperty && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            style={{
              position: 'absolute',
              bottom: '1rem',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'white',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-2xl)',
              padding: '1rem',
              minWidth: '300px',
              maxWidth: '400px',
            }}
          >
            <div style={{ display: 'flex', gap: '1rem' }}>
              {selectedProperty.image && (
                <img
                  src={selectedProperty.image}
                  alt={selectedProperty.title}
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: 'var(--radius-md)',
                    objectFit: 'cover',
                  }}
                />
              )}
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.25rem' }}>
                  {selectedProperty.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  {selectedProperty.location}
                </p>
                <p style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--primary)' }}>
                  ₹{selectedProperty.price?.toLocaleString()} / night
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Map Attribution */}
        <div
          style={{
            position: 'absolute',
            bottom: '0.5rem',
            right: '0.5rem',
            fontSize: '0.7rem',
            color: 'rgba(0, 0, 0, 0.5)',
            background: 'rgba(255, 255, 255, 0.8)',
            padding: '0.25rem 0.5rem',
            borderRadius: 'var(--radius-sm)',
          }}
        >
          © Mapbox | © OpenStreetMap
        </div>
      </div>
    </div>
  );
};

/**
 * PropertyMarker Component
 * Individual marker for each property on the map
 */
const PropertyMarker = ({ property, position, isSelected, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      style={{
        position: 'absolute',
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -100%)',
        cursor: 'pointer',
        zIndex: isSelected ? 1000 : 1,
      }}
    >
      {/* Marker Pin */}
      <div
        style={{
          background: isSelected ? 'var(--primary)' : 'white',
          color: isSelected ? 'white' : 'var(--primary)',
          padding: '0.5rem 0.75rem',
          borderRadius: 'var(--radius-full)',
          boxShadow: isSelected ? 'var(--shadow-2xl)' : 'var(--shadow-lg)',
          fontWeight: '700',
          fontSize: '0.9rem',
          border: `2px solid ${isSelected ? 'var(--primary)' : 'white'}`,
          whiteSpace: 'nowrap',
        }}
      >
        ₹{property.price?.toLocaleString()}
      </div>

      {/* Pin Point */}
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: '8px solid transparent',
          borderRight: '8px solid transparent',
          borderTop: `12px solid ${isSelected ? 'var(--primary)' : 'white'}`,
          margin: '0 auto',
        }}
      />
    </motion.div>
  );
};

export default PropertyMap;
