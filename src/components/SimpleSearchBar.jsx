import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Users, Search } from 'lucide-react';
import toast from 'react-hot-toast';

const SimpleSearchBar = () => {
  const navigate = useNavigate();
  
  const [searchData, setSearchData] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
  });
  
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [showGuestsPopup, setShowGuestsPopup] = useState(false);
  const [filteredCities, setFilteredCities] = useState([]);
  
  const locationInputRef = useRef(null);
  const guestsPopupRef = useRef(null);
  
  // Popular cities for autocomplete
  const popularCities = [
    { city: 'Paris', country: 'France', region: 'Europe' },
    { city: 'Tokyo', country: 'Japan', region: 'Asia' },
    { city: 'New York', country: 'USA', region: 'North America' },
    { city: 'London', country: 'United Kingdom', region: 'Europe' },
    { city: 'Dubai', country: 'UAE', region: 'Middle East' },
    { city: 'Bali', country: 'Indonesia', region: 'Asia' },
    { city: 'Barcelona', country: 'Spain', region: 'Europe' },
    { city: 'Sydney', country: 'Australia', region: 'Oceania' },
    { city: 'Rome', country: 'Italy', region: 'Europe' },
    { city: 'Bangkok', country: 'Thailand', region: 'Asia' },
    { city: 'Istanbul', country: 'Turkey', region: 'Europe/Asia' },
    { city: 'Singapore', country: 'Singapore', region: 'Asia' },
    { city: 'Los Angeles', country: 'USA', region: 'North America' },
    { city: 'Amsterdam', country: 'Netherlands', region: 'Europe' },
    { city: 'Prague', country: 'Czech Republic', region: 'Europe' },
    { city: 'Vienna', country: 'Austria', region: 'Europe' },
    { city: 'Berlin', country: 'Germany', region: 'Europe' },
    { city: 'Miami', country: 'USA', region: 'North America' },
    { city: 'Mumbai', country: 'India', region: 'Asia' },
    { city: 'Delhi', country: 'India', region: 'Asia' },
  ];
  
  // Filter cities based on search input
  useEffect(() => {
    if (searchData.location.trim()) {
      const filtered = popularCities.filter(
        (city) =>
          city.city.toLowerCase().includes(searchData.location.toLowerCase()) ||
          city.country.toLowerCase().includes(searchData.location.toLowerCase()) ||
          city.region.toLowerCase().includes(searchData.location.toLowerCase())
      ).slice(0, 6);
      setFilteredCities(filtered);
    } else {
      setFilteredCities(popularCities.slice(0, 6));
    }
  }, [searchData.location]);
  
  // Close popups when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (guestsPopupRef.current && !guestsPopupRef.current.contains(event.target)) {
        setShowGuestsPopup(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Handle location selection
  const handleLocationSelect = (city) => {
    setSearchData({ ...searchData, location: `${city.city}, ${city.country}` });
    setShowLocationSuggestions(false);
  };
  
  // Update guests count
  const updateGuests = (increment) => {
    setSearchData((prev) => ({
      ...prev,
      guests: Math.max(1, Math.min(20, prev.guests + increment)),
    }));
  };
  
  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!searchData.location.trim()) {
      toast.error('Please enter a location');
      locationInputRef.current?.focus();
      return;
    }
    
    toast.success('Searching for properties...');
    navigate('/explore', { 
      state: { 
        searchData: {
          ...searchData,
          location: searchData.location.trim(),
        }
      } 
    });
  };
  
  // Get minimum dates
  const getMinCheckInDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };
  
  const getMinCheckOutDate = () => {
    if (searchData.checkIn) {
      const checkInDate = new Date(searchData.checkIn);
      checkInDate.setDate(checkInDate.getDate() + 1);
      return checkInDate.toISOString().split('T')[0];
    }
    return getMinCheckInDate();
  };
  
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        padding: '0 1rem',
      }}
    >
      <form
        onSubmit={handleSearch}
        style={{
          display: 'flex',
          alignItems: 'center',
          background: 'var(--glass-bg)',
          backdropFilter: 'var(--backdrop-blur)',
          border: '1px solid var(--border-color)',
          borderRadius: '5rem',
          padding: '0.5rem',
          maxWidth: '850px',
          width: '100%',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
          gap: '0.25rem',
        }}
      >
        {/* Where Section */}
        <div style={{ position: 'relative', flex: '1' }}>
          <div
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '3rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              background: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--bg-secondary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <label
              style={{
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: '600',
                color: 'var(--text-primary)',
                marginBottom: '0.125rem',
              }}
            >
              Where
            </label>
            <input
              ref={locationInputRef}
              type="text"
              value={searchData.location}
              onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
              onFocus={() => setShowLocationSuggestions(true)}
              onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
              placeholder="Search destinations"
              style={{
                width: '100%',
                border: 'none',
                background: 'transparent',
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                outline: 'none',
                padding: '0',
              }}
            />
          </div>
          
          {/* Location Suggestions Dropdown */}
          <AnimatePresence>
            {showLocationSuggestions && filteredCities.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 0.5rem)',
                  left: '0',
                  right: '0',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-xl)',
                  maxHeight: '300px',
                  overflowY: 'auto',
                  zIndex: 50,
                }}
              >
                {filteredCities.map((city, index) => (
                  <div
                    key={index}
                    onClick={() => handleLocationSelect(city)}
                    style={{
                      padding: '0.875rem 1rem',
                      cursor: 'pointer',
                      transition: 'background 0.15s',
                      borderBottom: index < filteredCities.length - 1 ? '1px solid var(--border-color)' : 'none',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--bg-secondary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <MapPin size={16} style={{ color: 'var(--text-tertiary)' }} />
                      <div>
                        <div style={{ fontSize: '0.95rem', fontWeight: '500', color: 'var(--text-primary)' }}>
                          {city.city}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
                          {city.country} • {city.region}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Separator */}
        <div
          style={{
            width: '1px',
            height: '2rem',
            background: 'var(--border-color)',
          }}
        />
        
        {/* When Section */}
        <div style={{ flex: '1' }}>
          <div
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '3rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              background: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--bg-secondary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <label
              style={{
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: '600',
                color: 'var(--text-primary)',
                marginBottom: '0.125rem',
              }}
            >
              When
            </label>
            <input
              type="text"
              value={
                searchData.checkIn && searchData.checkOut
                  ? `${new Date(searchData.checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(searchData.checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                  : ''
              }
              placeholder="Add dates"
              readOnly
              onClick={(e) => e.currentTarget.parentElement.querySelector('input[type="date"]').showPicker()}
              style={{
                width: '100%',
                border: 'none',
                background: 'transparent',
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
                outline: 'none',
                padding: '0',
                cursor: 'pointer',
              }}
            />
            <div style={{ display: 'none' }}>
              <input
                type="date"
                value={searchData.checkIn}
                onChange={(e) => setSearchData({ ...searchData, checkIn: e.target.value })}
                min={getMinCheckInDate()}
              />
              <input
                type="date"
                value={searchData.checkOut}
                onChange={(e) => setSearchData({ ...searchData, checkOut: e.target.value })}
                min={getMinCheckOutDate()}
                disabled={!searchData.checkIn}
              />
            </div>
          </div>
        </div>
        
        {/* Separator */}
        <div
          style={{
            width: '1px',
            height: '2rem',
            background: 'var(--border-color)',
          }}
        />
        
        {/* Who Section */}
        <div style={{ position: 'relative', flex: '0.8' }}>
          <div
            onClick={() => setShowGuestsPopup(!showGuestsPopup)}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '3rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              background: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--bg-secondary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <label
              style={{
                display: 'block',
                fontSize: '0.75rem',
                fontWeight: '600',
                color: 'var(--text-primary)',
                marginBottom: '0.125rem',
              }}
            >
              Who
            </label>
            <div
              style={{
                fontSize: '0.875rem',
                color: 'var(--text-secondary)',
              }}
            >
              {searchData.guests === 1 ? 'Add guests' : `${searchData.guests} guests`}
            </div>
          </div>
          
          {/* Guests Popup */}
          <AnimatePresence>
            {showGuestsPopup && (
              <motion.div
                ref={guestsPopupRef}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 0.5rem)',
                  right: '0',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1rem 1.25rem',
                  boxShadow: 'var(--shadow-xl)',
                  minWidth: '200px',
                  zIndex: 50,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                  <span style={{ fontSize: '0.95rem', fontWeight: '500', color: 'var(--text-primary)' }}>
                    Guests
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <button
                      type="button"
                      onClick={() => updateGuests(-1)}
                      disabled={searchData.guests <= 1}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-secondary)',
                        color: 'var(--text-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: searchData.guests <= 1 ? 'not-allowed' : 'pointer',
                        opacity: searchData.guests <= 1 ? 0.5 : 1,
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        if (searchData.guests > 1) {
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      −
                    </button>
                    <span style={{ fontSize: '1rem', fontWeight: '600', minWidth: '30px', textAlign: 'center', color: 'var(--text-primary)' }}>
                      {searchData.guests}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateGuests(1)}
                      disabled={searchData.guests >= 20}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-secondary)',
                        color: 'var(--text-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: searchData.guests >= 20 ? 'not-allowed' : 'pointer',
                        opacity: searchData.guests >= 20 ? 0.5 : 1,
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        if (searchData.guests < 20) {
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Search Button */}
        <button
          type="submit"
          style={{
            background: 'var(--gradient-sunset)',
            border: 'none',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 56, 92, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <Search size={20} color="white" />
        </button>
      </form>
    </div>
  );
};

export default SimpleSearchBar;
