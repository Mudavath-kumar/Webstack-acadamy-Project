import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ hero = false }) => {
  const [searchData, setSearchData] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
  });
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/explore', { state: { searchData } });
  };

  if (hero) {
    return (
      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        onSubmit={handleSearch}
        className="glass"
        style={{
          padding: '1.5rem',
          borderRadius: 'var(--radius-2xl)',
          maxWidth: '900px',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            alignItems: 'end',
          }}
        >
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              Where
            </label>
            <div style={{ position: 'relative' }}>
              <MapPin size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
              <input
                type="text"
                placeholder="Search destinations"
                value={searchData.location}
                onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                className="input"
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              Check-in
            </label>
            <div style={{ position: 'relative' }}>
              <Calendar size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
              <input
                type="date"
                value={searchData.checkIn}
                onChange={(e) => setSearchData({ ...searchData, checkIn: e.target.value })}
                className="input"
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              Check-out
            </label>
            <div style={{ position: 'relative' }}>
              <Calendar size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
              <input
                type="date"
                value={searchData.checkOut}
                onChange={(e) => setSearchData({ ...searchData, checkOut: e.target.value })}
                className="input"
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              Guests
            </label>
            <div style={{ position: 'relative' }}>
              <Users size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
              <input
                type="number"
                min="1"
                value={searchData.guests}
                onChange={(e) => setSearchData({ ...searchData, guests: e.target.value })}
                className="input"
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-gradient"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.875rem 2rem',
            }}
          >
            <Search size={20} />
            <span>Search</span>
          </motion.button>
        </div>
      </motion.form>
    );
  }

  return (
    <form
      onSubmit={handleSearch}
      style={{
        display: 'flex',
        gap: '0.75rem',
        padding: '0.75rem',
        background: 'var(--bg-primary)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-full)',
        boxShadow: '0 4px 12px var(--shadow-sm)',
      }}
    >
      <input
        type="text"
        placeholder="Where to?"
        value={searchData.location}
        onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
        style={{
          flex: 1,
          border: 'none',
          background: 'transparent',
          fontSize: '0.9rem',
          padding: '0.5rem 1rem',
          color: 'var(--text-primary)',
        }}
      />
      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          background: 'var(--primary)',
          border: 'none',
          borderRadius: 'var(--radius-full)',
          padding: '0.5rem 1.5rem',
          color: 'white',
          fontWeight: '600',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <Search size={18} />
      </motion.button>
    </form>
  );
};

export default SearchBar;
