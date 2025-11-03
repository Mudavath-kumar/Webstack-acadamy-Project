import { motion } from 'framer-motion';
import { Calendar, MapPin, Users } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import MotionWrapper from '../components/MotionWrapper';
import { bookingAPI } from '../services/api';

const Trips = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      setLoading(true);
      try {
        const res = await bookingAPI.getUserBookings();
        if (res.data?.success) {
          setBookings(res.data.data || []);
        } else {
          setBookings([]);
        }
      } catch (err) {
        console.error('Failed to load bookings', err);
        toast.error('Unable to load your trips right now.');
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };
    loadBookings();
  }, []);

  const { upcomingTrips, pastTrips } = useMemo(() => {
    const now = new Date();
    const upcoming = [];
    const past = [];
    for (const b of bookings) {
      const out = new Date(b.checkOut);
      const property = b.property || {};
      const card = {
        id: b._id,
        title: property.title || 'Stay',
        location: property.location ? `${property.location.city || ''}, ${property.location.country || ''}`.trim() : '—',
        image: property.images && property.images.length > 0
          ? (typeof property.images[0] === 'string' ? property.images[0] : property.images[0].url)
          : 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
        checkIn: b.checkIn?.slice(0,10),
        checkOut: b.checkOut?.slice(0,10),
        guests: b.totalGuests || b.guests?.adults || 1,
        status: b.status?.charAt(0).toUpperCase() + b.status?.slice(1) || 'Confirmed',
        propertyId: property._id,
      };
      if (out >= now) upcoming.push(card); else past.push(card);
    }
    return { upcomingTrips: upcoming, pastTrips: past };
  }, [bookings]);

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

        {!loading && trips.length === 0 && (
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
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.5} }
      `}</style>
    </div>
  );
};

export default Trips;
