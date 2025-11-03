import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import {
    Calendar,
    Check,
    Clock,
    DollarSign,
    MapPin,
    User,
    X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const STATUS_TABS = ['All', 'Pending', 'Confirmed', 'Cancelled', 'Completed'];

const STATUS_COLORS = {
  pending: { bg: '#FFF3CD', text: '#856404', border: '#FFE69C' },
  confirmed: { bg: '#D1ECF1', text: '#0C5460', border: '#BEE5EB' },
  cancelled: { bg: '#F8D7DA', text: '#721C24', border: '#F5C6CB' },
  completed: { bg: '#D4EDDA', text: '#155724', border: '#C3E6CB' },
};

const HostBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('All');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const base = import.meta.env.VITE_API_URL || '/api/v1';
      
      const response = await axios.get(`${base}/bookings/host/my-bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBookings(response.data?.data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      // Don't show error toast, just use empty array
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (bookingId, newStatus, propertyTitle) => {
    const action = newStatus === 'confirmed' ? 'accept' : 'reject';
    if (!window.confirm(`Are you sure you want to ${action} this booking for "${propertyTitle}"?`)) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const base = import.meta.env.VITE_API_URL || '/api/v1';
      
      await axios.patch(
        `${base}/bookings/${bookingId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(`Booking ${action}ed successfully`);
      fetchBookings();
    } catch (error) {
      console.error('Error updating booking status:', error);
      toast.error('Failed to update booking status');
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    if (activeTab === 'All') return true;
    return booking.status?.toLowerCase() === activeTab.toLowerCase();
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const calculateNights = (checkIn, checkOut) => {
    const nights = Math.ceil(
      (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
    );
    return nights;
  };

  if (loading) {
    return (
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '2rem' }}>
          Manage Bookings
        </h1>
        <div className="bookings-table">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton-card">
              <div className="skeleton skeleton-text" />
              <div className="skeleton skeleton-text short" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: '800', 
          marginBottom: '0.75rem',
          background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Manage Bookings
        </h1>
        <p style={{ 
          color: 'var(--host-text-secondary)', 
          fontSize: '1.1rem', 
          fontWeight: '500' 
        }}>
          View and manage booking requests from guests 📅
        </p>
      </div>

      {/* Status Tabs */}
      <div className="status-tabs" style={{ marginBottom: '2rem' }}>
        {STATUS_TABS.map((tab) => (
          <button
            key={tab}
            className={`status-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
            <span className="tab-badge">
              {tab === 'All'
                ? bookings.length
                : bookings.filter((b) => b.status?.toLowerCase() === tab.toLowerCase()).length}
            </span>
          </button>
        ))}
      </div>

      {/* Bookings Table */}
      {filteredBookings.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            background: 'white',
            borderRadius: '16px',
            padding: '4rem 2rem',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 1.5rem',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 20px rgba(124, 58, 237, 0.3)'
            }}
          >
            <Calendar size={40} color="white" />
          </div>
          <h3 style={{ 
            fontSize: '1.75rem', 
            fontWeight: '800', 
            marginBottom: '0.75rem',
            color: 'var(--host-text-primary)'
          }}>
            No bookings found! 📭
          </h3>
          <p style={{ 
            color: 'var(--host-text-secondary)',
            fontSize: '1.05rem',
            fontWeight: '500'
          }}>
            {activeTab === 'All'
              ? 'You have no booking requests yet'
              : `No ${activeTab.toLowerCase()} bookings`}
          </p>
        </motion.div>
      ) : (
        <div className="bookings-table">
          <AnimatePresence>
            {filteredBookings.map((booking, index) => (
              <motion.div
                key={booking._id}
                className="booking-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="booking-card-header">
                  <div>
                    <h3 className="booking-property-title">
                      {booking.property?.title || 'Property'}
                    </h3>
                    <div className="booking-location">
                      <MapPin size={14} />
                      <span>
                        {booking.property?.location?.city || 'N/A'},{' '}
                        {booking.property?.location?.country || 'N/A'}
                      </span>
                    </div>
                  </div>
                  <div
                    className="booking-status-badge"
                    style={{
                      background: STATUS_COLORS[booking.status?.toLowerCase()]?.bg || '#e9ecef',
                      color: STATUS_COLORS[booking.status?.toLowerCase()]?.text || '#495057',
                      border: `1px solid ${STATUS_COLORS[booking.status?.toLowerCase()]?.border || '#dee2e6'}`,
                    }}
                  >
                    {booking.status || 'Unknown'}
                  </div>
                </div>

                <div className="booking-card-content">
                  <div className="booking-info-grid">
                    <div className="info-item">
                      <User size={16} color="#667eea" />
                      <div>
                        <span className="info-label">Guest</span>
                        <span className="info-value">
                          {booking.user?.name || booking.user?.email || 'Guest'}
                        </span>
                      </div>
                    </div>

                    <div className="info-item">
                      <Calendar size={16} color="#667eea" />
                      <div>
                        <span className="info-label">Check-in</span>
                        <span className="info-value">{formatDate(booking.checkInDate)}</span>
                      </div>
                    </div>

                    <div className="info-item">
                      <Calendar size={16} color="#667eea" />
                      <div>
                        <span className="info-label">Check-out</span>
                        <span className="info-value">{formatDate(booking.checkOutDate)}</span>
                      </div>
                    </div>

                    <div className="info-item">
                      <Clock size={16} color="#667eea" />
                      <div>
                        <span className="info-label">Nights</span>
                        <span className="info-value">
                          {calculateNights(booking.checkInDate, booking.checkOutDate)}
                        </span>
                      </div>
                    </div>

                    <div className="info-item">
                      <User size={16} color="#667eea" />
                      <div>
                        <span className="info-label">Guests</span>
                        <span className="info-value">{booking.guests || 1}</span>
                      </div>
                    </div>

                    <div className="info-item">
                      <DollarSign size={16} color="#667eea" />
                      <div>
                        <span className="info-label">Total Amount</span>
                        <span className="info-value" style={{ fontWeight: '700', color: '#667eea' }}>
                          ₹{booking.totalAmount?.toLocaleString() || 0}
                        </span>
                      </div>
                    </div>
                  </div>

                  {booking.specialRequests && (
                    <div className="special-requests">
                      <strong>Special Requests:</strong>
                      <p>{booking.specialRequests}</p>
                    </div>
                  )}

                  {booking.status?.toLowerCase() === 'pending' && (
                    <div className="booking-actions">
                      <motion.button
                        className="btn-accept"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() =>
                          handleUpdateStatus(booking._id, 'confirmed', booking.property?.title)
                        }
                      >
                        <Check size={18} />
                        <span>Accept</span>
                      </motion.button>
                      <motion.button
                        className="btn-reject"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() =>
                          handleUpdateStatus(booking._id, 'cancelled', booking.property?.title)
                        }
                      >
                        <X size={18} />
                        <span>Reject</span>
                      </motion.button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};

export default HostBookings;
