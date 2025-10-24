import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users } from 'lucide-react';
import MotionWrapper from '../components/MotionWrapper';

const Trips = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingTrips = [
    {
      id: 1,
      title: 'Luxury Beachfront Villa',
      location: 'Malibu, California',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80',
      checkIn: '2024-04-01',
      checkOut: '2024-04-05',
      guests: 4,
      status: 'Confirmed',
    },
    {
      id: 2,
      title: 'Mountain Retreat Cabin',
      location: 'Aspen, Colorado',
      image: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=600&q=80',
      checkIn: '2024-05-15',
      checkOut: '2024-05-20',
      guests: 2,
      status: 'Confirmed',
    },
  ];

  const pastTrips = [
    {
      id: 3,
      title: 'City Loft Apartment',
      location: 'New York, NY',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80',
      checkIn: '2024-02-10',
      checkOut: '2024-02-15',
      guests: 2,
      status: 'Completed',
    },
  ];

  const trips = activeTab === 'upcoming' ? upcomingTrips : pastTrips;

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="container section">
        <MotionWrapper>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '700', marginBottom: 'var(--spacing-2xl)' }}>
            Your trips
          </h1>
        </MotionWrapper>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-2xl)', borderBottom: '2px solid var(--border-color)' }}>
          {['upcoming', 'past'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: 'var(--spacing-md) var(--spacing-lg)',
                background: 'transparent',
                border: 'none',
                fontSize: '1rem',
                fontWeight: '600',
                color: activeTab === tab ? 'var(--primary)' : 'var(--text-secondary)',
                borderBottom: activeTab === tab ? '2px solid var(--primary)' : '2px solid transparent',
                marginBottom: '-2px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textTransform: 'capitalize',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Trips Grid */}
        <div style={{ display: 'grid', gap: 'var(--spacing-xl)' }}>
          {trips.map((trip, index) => (
            <MotionWrapper key={trip.id} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="card"
                style={{
                  padding: 0,
                  overflow: 'hidden',
                  display: 'grid',
                  gridTemplateColumns: '300px 1fr',
                  gap: 'var(--spacing-lg)',
                }}
              >
                <img
                  src={trip.image}
                  alt={trip.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '200px' }}
                />
                <div style={{ padding: 'var(--spacing-lg)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 'var(--spacing-md)' }}>
                    <div>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                        {trip.title}
                      </h3>
                      <p style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)' }}>
                        <MapPin size={16} />
                        {trip.location}
                      </p>
                    </div>
                    <span style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', background: trip.status === 'Confirmed' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(148, 163, 184, 0.1)', color: trip.status === 'Confirmed' ? '#22C55E' : '#64748B', fontSize: '0.85rem', fontWeight: '600' }}>
                      {trip.status}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: 'var(--spacing-xl)', marginBottom: 'var(--spacing-lg)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Calendar size={18} color="var(--text-secondary)" />
                      <div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Check-in</div>
                        <div style={{ fontWeight: '600' }}>{trip.checkIn}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Calendar size={18} color="var(--text-secondary)" />
                      <div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Check-out</div>
                        <div style={{ fontWeight: '600' }}>{trip.checkOut}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Users size={18} color="var(--text-secondary)" />
                      <div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Guests</div>
                        <div style={{ fontWeight: '600' }}>{trip.guests}</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-primary"
                      style={{ padding: '0.75rem 1.5rem' }}
                    >
                      View Details
                    </motion.button>
                    {activeTab === 'past' && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="btn-outline"
                        style={{ padding: '0.75rem 1.5rem' }}
                      >
                        Leave Review
                      </motion.button>
                    )}
                  </div>
                </div>
              </motion.div>
            </MotionWrapper>
          ))}
        </div>

        {trips.length === 0 && (
          <div style={{ textAlign: 'center', padding: 'var(--spacing-3xl)' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: 'var(--spacing-md)' }}>
              No {activeTab} trips
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-xl)' }}>
              Time to start planning your next adventure!
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

      <style>{`
        @media (max-width: 768px) {
          .card > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Trips;
