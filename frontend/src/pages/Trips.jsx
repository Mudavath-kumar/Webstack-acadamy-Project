import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from '../components/ConfirmDialog';
import MotionWrapper from '../components/MotionWrapper';
import { bookingAPI } from '../services/api';

const Trips = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);

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

  const openCancelDialog = (booking) => {
    setBookingToCancel(booking);
    setShowCancelDialog(true);
  };

  const handleCancelBooking = async () => {
    if (!bookingToCancel) return;
    
    setCancellingId(bookingToCancel.id);
    try {
      const response = await bookingAPI.cancelBooking(bookingToCancel.id);
      toast.success('✅ Booking cancelled successfully!');
      setShowCancelDialog(false);
      setBookingToCancel(null);
      // Refresh bookings
      const res = await bookingAPI.getUserBookings();
      if (res.data?.success) {
        setBookings(res.data.data || []);
      }
    } catch (err) {
      console.error('Failed to cancel booking:', err);
      
      // Extract detailed error message
      let errorMessage = '❌ Failed to cancel booking.';
      
      if (err.response) {
        // Server responded with error status
        const serverMessage = err.response.data?.message;
        
        if (err.response.status === 404) {
          errorMessage = '❌ Booking not found. It may have already been cancelled.';
        } else if (err.response.status === 403) {
          errorMessage = '❌ You are not authorized to cancel this booking.';
        } else if (err.response.status === 400) {
          if (serverMessage?.includes('24 hours')) {
            errorMessage = '⏰ Cannot cancel booking less than 24 hours before check-in.';
          } else if (serverMessage?.includes('already cancelled')) {
            errorMessage = '❌ This booking has already been cancelled.';
          } else {
            errorMessage = `❌ ${serverMessage || 'Cannot cancel this booking.'}`;
          }
        } else if (serverMessage) {
          errorMessage = `❌ ${serverMessage}`;
        }
      } else if (err.request) {
        // Request made but no response received
        errorMessage = '🌐 Network error. Please check your internet connection.';
      } else {
        // Something else went wrong
        errorMessage = `❌ ${err.message || 'An unexpected error occurred.'}`;
      }
      
      toast.error(errorMessage, { duration: 5000 });
      setShowCancelDialog(false);
    } finally {
      setCancellingId(null);
    }
  };

  const handleViewProperty = (propertyId) => {
    if (propertyId) {
      navigate(`/listing/${propertyId}`);
    } else {
      toast.error('Property details not available');
    }
  };

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
                        {typeof trip.location === 'string' 
                          ? trip.location 
                          : `${trip.location?.city || ''}, ${trip.location?.country || ''}`.trim() || 'Location unavailable'}
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

                  <div style={{ display: 'flex', gap: 'var(--spacing-md)', flexWrap: 'wrap' }}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-primary"
                      style={{ padding: '0.75rem 1.5rem' }}
                      onClick={() => handleViewProperty(trip.propertyId)}
                    >
                      View Property
                    </motion.button>
                    {activeTab === 'upcoming' && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="btn-outline"
                        style={{ 
                          padding: '0.75rem 1.5rem',
                          borderColor: '#ef4444',
                          color: '#ef4444',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}
                        onClick={() => openCancelDialog(trip)}
                        disabled={cancellingId === trip.id}
                      >
                        <X size={18} />
                        {cancellingId === trip.id ? 'Cancelling...' : 'Cancel Booking'}
                      </motion.button>
                    )}
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

      {/* Cancel Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showCancelDialog}
        onClose={() => {
          setShowCancelDialog(false);
          setBookingToCancel(null);
        }}
        onConfirm={handleCancelBooking}
        title="Cancel Booking?"
        message={bookingToCancel ? `Are you sure you want to cancel your booking at ${bookingToCancel.title}? This action cannot be undone.` : ''}
        confirmText="Yes, Cancel Booking"
        cancelText="Keep Booking"
        isLoading={cancellingId === bookingToCancel?.id}
      />

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
