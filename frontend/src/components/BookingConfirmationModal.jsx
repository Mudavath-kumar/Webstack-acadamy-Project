import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, CheckCircle, CreditCard, MapPin, Users, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/Modal.css';

const BookingConfirmationModal = ({ isOpen, onClose, booking }) => {
  const navigate = useNavigate();

  if (!isOpen || !booking) return null;

  const handleViewBookings = () => {
    onClose();
    navigate('/trips');
  };

  const handleBackToHome = () => {
    onClose();
    navigate('/');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-overlay" onClick={onClose}>
          <motion.div
            className="modal-content booking-confirmation-modal"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <button className="modal-close" onClick={onClose} aria-label="Close">
              <X size={24} />
            </button>

            <div className="modal-body">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="success-icon"
              >
                <CheckCircle size={80} color="#10b981" />
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  marginTop: '1.5rem',
                  marginBottom: '0.5rem',
                  color: 'var(--text-primary)',
                }}
              >
                Booking Confirmed! 🎉
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{
                  color: 'var(--text-secondary)',
                  marginBottom: '2rem',
                  fontSize: '1.1rem',
                }}
              >
                Your booking has been successfully confirmed
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="booking-details"
                style={{
                  background: 'var(--bg-secondary)',
                  borderRadius: 'var(--border-radius-lg)',
                  padding: '1.5rem',
                  marginBottom: '2rem',
                  textAlign: 'left',
                }}
              >
                <h3
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: 'var(--text-primary)',
                  }}
                >
                  Booking Details
                </h3>

                <div className="detail-item" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
                  <MapPin size={20} color="var(--primary-color)" style={{ marginRight: '0.75rem' }} />
                  <div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)' }}>Property</div>
                    <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>
                      {booking.property?.title || 'Property Name'}
                    </div>
                  </div>
                </div>

                <div className="detail-item" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
                  <Calendar size={20} color="var(--primary-color)" style={{ marginRight: '0.75rem' }} />
                  <div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)' }}>Check-in / Check-out</div>
                    <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>
                      {booking.checkIn && new Date(booking.checkIn).toLocaleDateString()} -{' '}
                      {booking.checkOut && new Date(booking.checkOut).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="detail-item" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
                  <Users size={20} color="var(--primary-color)" style={{ marginRight: '0.75rem' }} />
                  <div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)' }}>Guests</div>
                    <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>
                      {booking.guests || 2} guest{booking.guests !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>

                <div className="detail-item" style={{ display: 'flex', alignItems: 'center' }}>
                  <CreditCard size={20} color="var(--primary-color)" style={{ marginRight: '0.75rem' }} />
                  <div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)' }}>Total Amount</div>
                    <div style={{ fontWeight: '600', fontSize: '1.25rem', color: 'var(--primary-color)' }}>
                      ₹{(booking.totalPrice || 0).toLocaleString()}
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                style={{
                  background: 'var(--bg-tertiary)',
                  padding: '1rem',
                  borderRadius: 'var(--border-radius)',
                  marginBottom: '2rem',
                }}
              >
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
                  📧 A confirmation email has been sent to your registered email address
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
              >
                <button
                  onClick={handleViewBookings}
                  style={{
                    flex: 1,
                    minWidth: '200px',
                    padding: '1rem 2rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
                  }}
                >
                  🎫 View My Bookings
                </button>
                <button
                  onClick={handleBackToHome}
                  style={{
                    flex: 1,
                    minWidth: '200px',
                    padding: '1rem 2rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    background: 'transparent',
                    color: 'var(--primary-color)',
                    border: '2px solid var(--primary-color)',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'var(--primary-color)';
                    e.target.style.color = 'white';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = 'var(--primary-color)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  🏠 Back to Home
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingConfirmationModal;
