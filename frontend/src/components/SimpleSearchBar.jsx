import { useEffect, useMemo, useRef, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Calendar, MapPin, Search, Users } from 'lucide-react';
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

  const popularCities = useMemo(
    () => [
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
    ],
    []
  );

  useEffect(() => {
    if (searchData.location.trim()) {
      const query = searchData.location.toLowerCase();
      const filtered = popularCities.filter(
        (city) =>
          city.city.toLowerCase().includes(query) ||
          city.country.toLowerCase().includes(query) ||
          city.region.toLowerCase().includes(query)
      );
      setFilteredCities(filtered.slice(0, 5));
    } else {
      setFilteredCities([]);
    }
  }, [searchData.location, popularCities]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (guestsPopupRef.current && !guestsPopupRef.current.contains(event.target)) {
        setShowGuestsPopup(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocationSelect = (city) => {
    setSearchData((prev) => ({
      ...prev,
      location: `${city.city}, ${city.country}`,
    }));
    setShowLocationSuggestions(false);
  };

  const updateGuests = (increment) => {
    setSearchData((prev) => ({
      ...prev,
      guests: Math.max(1, Math.min(20, prev.guests + increment)),
    }));
  };

  const handleSearch = (event) => {
    event.preventDefault();

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
        },
      },
    });
  };

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
    <>
      <style>{`
        .search-bar-container {
          width: 100%;
          display: flex;
          justify-content: center;
          padding: 2rem 1rem;
          position: relative;
          z-index: 10;
        }

        .search-bar {
          display: flex;
          align-items: center;
          gap: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 60px;
          padding: 0.5rem;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1),
                      0 0 0 1px rgba(255, 255, 255, 0.3);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          max-width: 1000px;
          width: 100%;
        }

        .search-bar:hover {
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15),
                      0 0 0 1px rgba(255, 255, 255, 0.5);
          transform: translateY(-2px);
        }

        .search-field {
          flex: 1;
          position: relative;
          padding: 0.75rem 1.5rem;
          border-right: 1px solid rgba(0, 0, 0, 0.08);
          cursor: pointer;
          transition: all 0.3s ease;
          border-radius: 50px;
        }

        .search-field:last-of-type {
          border-right: none;
        }

        .search-field:hover {
          background: rgba(79, 70, 229, 0.03);
        }

        .search-field label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 0.25rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .search-field label svg {
          color: #4f46e5;
          stroke-width: 2.5;
        }

        .search-field input {
          width: 100%;
          border: none;
          background: transparent;
          font-size: 0.95rem;
          color: #111827;
          font-weight: 500;
          outline: none;
          padding: 0.25rem 0;
          cursor: pointer;
        }

        .search-field input::placeholder {
          color: #9ca3af;
          font-weight: 400;
        }

        .search-field input[type="date"] {
          color-scheme: light;
          cursor: pointer;
        }

        .search-field input[type="date"]::-webkit-calendar-picker-indicator {
          cursor: pointer;
          opacity: 0.6;
          transition: opacity 0.2s;
        }

        .search-field input[type="date"]::-webkit-calendar-picker-indicator:hover {
          opacity: 1;
        }

        .guests-input {
          font-size: 0.95rem;
          color: #111827;
          font-weight: 500;
          padding: 0.25rem 0;
          cursor: pointer;
          user-select: none;
        }

        .suggestions-dropdown {
          position: absolute;
          top: calc(100% + 0.5rem);
          left: 0;
          right: 0;
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
          overflow: hidden;
          z-index: 1000;
          animation: slideDown 0.3s ease;
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .suggestion-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.25rem;
          cursor: pointer;
          transition: all 0.2s ease;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .suggestion-item:last-child {
          border-bottom: none;
        }

        .suggestion-item:hover {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .suggestion-item svg {
          color: #4f46e5;
          flex-shrink: 0;
          transition: color 0.2s;
        }

        .suggestion-item:hover svg {
          color: white;
        }

        .city-name {
          font-weight: 600;
          font-size: 0.95rem;
          margin-bottom: 0.15rem;
        }

        .city-region {
          font-size: 0.8rem;
          opacity: 0.7;
        }

        .guests-popup {
          position: absolute;
          top: calc(100% + 0.5rem);
          right: 0;
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
          padding: 1.5rem;
          z-index: 1000;
          min-width: 280px;
          animation: slideDown 0.3s ease;
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .guests-control {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .guests-control > span {
          font-weight: 600;
          font-size: 1rem;
          color: #1f2937;
        }

        .guests-buttons {
          display: flex;
          align-items: center;
          gap: 1rem;
          background: rgba(79, 70, 229, 0.05);
          padding: 0.5rem 1rem;
          border-radius: 50px;
        }

        .guests-buttons button {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: none;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          font-size: 1.25rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(79, 70, 229, 0.3);
        }

        .guests-buttons button:hover:not(:disabled) {
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.4);
        }

        .guests-buttons button:active:not(:disabled) {
          transform: scale(0.95);
        }

        .guests-buttons button:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          box-shadow: none;
        }

        .guests-buttons > span {
          font-weight: 600;
          font-size: 1.1rem;
          color: #1f2937;
          min-width: 30px;
          text-align: center;
        }

        .search-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 50px;
          padding: 1rem 2rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
          position: relative;
          overflow: hidden;
        }

        .search-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s;
        }

        .search-button:hover::before {
          left: 100%;
        }

        .search-button:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.5);
        }

        .search-button:active {
          transform: translateY(0) scale(1);
        }

        .search-button svg {
          stroke-width: 2.5;
        }

        @media (max-width: 1024px) {
          .search-bar {
            flex-wrap: wrap;
            border-radius: 24px;
            padding: 1rem;
            gap: 0.5rem;
          }

          .search-field {
            flex: 1 1 calc(50% - 0.25rem);
            border-right: none;
            border-bottom: 1px solid rgba(0, 0, 0, 0.08);
            padding: 1rem;
            border-radius: 16px;
          }

          .search-field:nth-last-child(2),
          .search-field:last-of-type {
            border-bottom: none;
          }

          .search-button {
            flex: 1 1 100%;
            justify-content: center;
            padding: 1.25rem;
          }
        }

        @media (max-width: 640px) {
          .search-bar-container {
            padding: 1rem 0.5rem;
          }

          .search-bar {
            flex-direction: column;
            padding: 1rem;
            gap: 0.5rem;
          }

          .search-field {
            flex: 1 1 100%;
            border-right: none;
            border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          }

          .search-field:last-of-type {
            border-bottom: none;
          }
        }
      `}</style>

      <div className="search-bar-container">
        <form onSubmit={handleSearch} className="search-bar">
          <div className="search-field">
            <label>
              <MapPin size={18} />
              <span>Location</span>
            </label>
            <input
              ref={locationInputRef}
              type="text"
              value={searchData.location}
              onChange={(e) => setSearchData((prev) => ({ ...prev, location: e.target.value }))}
              onFocus={() => setShowLocationSuggestions(true)}
              onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
              placeholder="Where are you going?"
            />

            {showLocationSuggestions && filteredCities.length > 0 && (
              <div className="suggestions-dropdown">
                {filteredCities.map((city, index) => (
                  <div
                    key={index}
                    onClick={() => handleLocationSelect(city)}
                    className="suggestion-item"
                  >
                    <MapPin size={16} />
                    <div>
                      <div className="city-name">{city.city}</div>
                      <div className="city-region">
                        {city.country} - {city.region}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="search-field">
            <label>
              <Calendar size={18} />
              <span>Check In</span>
            </label>
            <input
              type="date"
              value={searchData.checkIn}
              onChange={(e) => setSearchData((prev) => ({ ...prev, checkIn: e.target.value }))}
              min={getMinCheckInDate()}
            />
          </div>

          <div className="search-field">
            <label>
              <Calendar size={18} />
              <span>Check Out</span>
            </label>
            <input
              type="date"
              value={searchData.checkOut}
              onChange={(e) => setSearchData((prev) => ({ ...prev, checkOut: e.target.value }))}
              min={getMinCheckOutDate()}
              disabled={!searchData.checkIn}
            />
          </div>

          <div className="search-field" style={{ position: 'relative' }}>
            <label>
              <Users size={18} />
              <span>Guests</span>
            </label>
            <div onClick={() => setShowGuestsPopup((prev) => !prev)} className="guests-input">
              {searchData.guests} {searchData.guests === 1 ? 'guest' : 'guests'}
            </div>

            {showGuestsPopup && (
              <div ref={guestsPopupRef} className="guests-popup">
                <div className="guests-control">
                  <span>Guests</span>
                  <div className="guests-buttons">
                    <button
                      type="button"
                      onClick={() => updateGuests(-1)}
                      disabled={searchData.guests <= 1}
                    >
                      -
                    </button>
                    <span>{searchData.guests}</span>
                    <button
                      type="button"
                      onClick={() => updateGuests(1)}
                      disabled={searchData.guests >= 20}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button type="submit" className="search-button">
            <Search size={20} />
            <span>Search</span>
          </button>
        </form>
      </div>
    </>
  );
};

export default SimpleSearchBar;
