import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, AlertTriangle, Edit, Loader } from 'lucide-react';
import { bookingAPI, otpAPI } from '../services/api';
import toast from 'react-hot-toast';
import OTPVerificationModal from './OTPVerificationModal';

const BookingManagementModal = ({ isOpen, onClose, booking, onSuccess }) => {
  const [action, setAction] = useState(null); // 'cancel' or 'modify'
  const [isProcessing, setIsProcessing] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  
  // Modification states
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [modifyData, setModifyData] = useState({
    checkIn: booking?.checkIn || '',
    checkOut: booking?.checkOut || '',
    guests: {
      adults: booking?.guests?.adults || 2,
      children: booking?.guests?.children || 0,
    },
  });

  const handleCancelBooking = async () => {
    if (!cancelReason.trim()) {
      toast.error('Please provide a cancellation reason');
      return;
    }

    setIsProcessing(true);
    try {
      const response = await bookingAPI.cancel(booking._id, {
        reason: cancelReason,
      });

      if (response.data.success) {
        toast.success('Booking cancelled successfully');
        onSuccess();
        onClose();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to cancel booking');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleModifyBooking = async () => {
    if (!otpVerified) {
      // Generate OTP first
      try {
        await otpAPI.generate({
          bookingId: booking._id,
          purpose: 'booking_modification',
        });
        setShowOTPModal(true);
      } catch (error) {
        toast.error('Failed to initiate modification. Please try again.');
      }
      return;
    }

    setIsProcessing(true);
    try {
      const response = await bookingAPI.modify(booking._id, {
        ...modifyData,
        otpVerified: true,
      });

      if (response.data.success) {
        toast.success('Booking modified successfully');
        onSuccess();
        onClose();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to modify booking');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleOTPVerificationSuccess = () => {
    setOtpVerified(true);
    setShowOTPModal(false);
    toast.success('OTP verified! You can now modify your booking.');
  };

  if (!isOpen || !booking) return null;

  // Check if booking can be cancelled
  const checkInDate = new Date(booking.checkIn);
  const now = new Date();
  const hoursUntilCheckIn = (checkInDate - now) / (1000 * 60 * 60);
  const canCancel = hoursUntilCheckIn > 24 && booking.status !== 'cancelled' && booking.status !== 'completed';
  const canModify = booking.status === 'confirmed' && hoursUntilCheckIn > 24;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: 'var(--spacing-lg)',
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            background: 'var(--bg-primary)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--spacing-2xl)',
            maxWidth: '600px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            position: 'relative',
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 'var(--spacing-lg)',
              right: 'var(--spacing-lg)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
            }}
          >
            <X size={24} />
          </button>

          {/* Header */}
          <div style={{ marginBottom: 'var(--spacing-xl)' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.75rem',
                fontWeight: '700',
                marginBottom: '0.5rem',
              }}
            >
              Manage Booking
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              {booking.property?.title || 'Your booking'}
            </p>
          </div>

          {/* Action Selection */}
          {!action && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
              {canModify && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setAction('modify')}
                  style={{
                    padding: 'var(--spacing-lg)',
                    background: 'var(--bg-secondary)',
                    border: '2px solid var(--border-color)',
                    borderRadius: 'var(--radius-lg)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-md)',
                    transition: 'all 0.2s',
                  }}
                >
                  <Edit size={24} color="var(--primary)" />
                  <div style={{ textAlign: 'left', flex: 1 }}>
                    <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>
                      Modify Booking
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      Change dates or guest count
                    </div>
                  </div>
                </motion.button>
              )}

              {canCancel && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setAction('cancel')}
                  style={{
                    padding: 'var(--spacing-lg)',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '2px solid #EF4444',
                    borderRadius: 'var(--radius-lg)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-md)',
                    transition: 'all 0.2s',
                  }}
                >
                  <AlertTriangle size={24} color="#EF4444" />
                  <div style={{ textAlign: 'left', flex: 1 }}>
                    <div style={{ fontWeight: '600', marginBottom: '0.25rem', color: '#EF4444' }}>
                      Cancel Booking
                    </div>
                    <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      Free cancellation until 24 hours before check-in
                    </div>
                  </div>
                </motion.button>
              )}

              {!canCancel && !canModify && (
                <div
                  style={{
                    padding: 'var(--spacing-lg)',
                    background: 'var(--bg-secondary)',
                    borderRadius: 'var(--radius-lg)',
                    textAlign: 'center',
                  }}
                >
                  <AlertTriangle size={32} color="var(--text-secondary)" style={{ margin: '0 auto var(--spacing-md)' }} />
                  <p style={{ color: 'var(--text-secondary)' }}>
                    This booking cannot be modified or cancelled at this time.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Modify Form */}
          {action === 'modify' && (
            <div>
              <button
                onClick={() => setAction(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--primary)',
                  cursor: 'pointer',
                  marginBottom: 'var(--spacing-lg)',
                }}
              >
                ← Back
              </button>

              <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    value={modifyData.checkIn?.split('T')[0] || ''}
                    onChange={(e) => setModifyData({ ...modifyData, checkIn: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    value={modifyData.checkOut?.split('T')[0] || ''}
                    onChange={(e) => setModifyData({ ...modifyData, checkOut: e.target.value })}
                    min={modifyData.checkIn || new Date().toISOString().split('T')[0]}
                    className="input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
                    Number of Guests
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                    <div>
                      <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Adults</label>
                      <input
                        type="number"
                        min="1"
                        value={modifyData.guests.adults}
                        onChange={(e) =>
                          setModifyData({
                            ...modifyData,
                            guests: { ...modifyData.guests, adults: parseInt(e.target.value) },
                          })
                        }
                        className="input"
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Children</label>
                      <input
                        type="number"
                        min="0"
                        value={modifyData.guests.children}
                        onChange={(e) =>
                          setModifyData({
                            ...modifyData,
                            guests: { ...modifyData.guests, children: parseInt(e.target.value) },
                          })
                        }
                        className="input"
                      />
                    </div>
                  </div>
                </div>

                {otpVerified && (
                  <div
                    style={{
                      padding: 'var(--spacing-md)',
                      background: 'rgba(34, 197, 94, 0.1)',
                      border: '1px solid #22C55E',
                      borderRadius: 'var(--radius-md)',
                      color: '#22C55E',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                    }}
                  >
                    ✓ OTP Verified - You can now save changes
                  </div>
                )}

                <button
                  onClick={handleModifyBooking}
                  disabled={isProcessing}
                  className="btn-gradient"
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    opacity: isProcessing ? 0.6 : 1,
                  }}
                >
                  {isProcessing ? (
                    <>
                      <Loader size={20} className="spin" />
                      Processing...
                    </>
                  ) : otpVerified ? (
                    'Save Changes'
                  ) : (
                    'Verify OTP & Modify'
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Cancel Form */}
          {action === 'cancel' && (
            <div>
              <button
                onClick={() => setAction(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--primary)',
                  cursor: 'pointer',
                  marginBottom: 'var(--spacing-lg)',
                }}
              >
                ← Back
              </button>

              <div
                style={{
                  padding: 'var(--spacing-lg)',
                  background: 'rgba(239, 68, 68, 0.1)',
                  borderRadius: 'var(--radius-lg)',
                  marginBottom: 'var(--spacing-lg)',
                }}
              >
                <AlertTriangle size={24} color="#EF4444" style={{ marginBottom: '0.5rem' }} />
                <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                  Are you sure you want to cancel this booking? This action cannot be undone.
                </p>
              </div>

              <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
                  Reason for Cancellation *
                </label>
                <textarea
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="Please tell us why you're cancelling..."
                  className="input"
                  rows="4"
                  style={{ resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                <button
                  onClick={() => setAction(null)}
                  style={{
                    flex: 1,
                    padding: 'var(--spacing-md)',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-lg)',
                    cursor: 'pointer',
                  }}
                >
                  Keep Booking
                </button>
                <button
                  onClick={handleCancelBooking}
                  disabled={isProcessing}
                  style={{
                    flex: 1,
                    padding: 'var(--spacing-md)',
                    background: '#EF4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: 'var(--radius-lg)',
                    cursor: 'pointer',
                    opacity: isProcessing ? 0.6 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                  }}
                >
                  {isProcessing ? (
                    <>
                      <Loader size={20} className="spin" />
                      Cancelling...
                    </>
                  ) : (
                    'Confirm Cancellation'
                  )}
                </button>
              </div>
            </div>
          )}

          <style>
            {`
              @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
              .spin {
                animation: spin 1s linear infinite;
              }
            `}
          </style>
        </motion.div>
      </motion.div>

      {/* OTP Modal for Modification */}
      <OTPVerificationModal
        isOpen={showOTPModal}
        onClose={() => setShowOTPModal(false)}
        bookingId={booking?._id}
        onVerificationSuccess={handleOTPVerificationSuccess}
      />
    </AnimatePresence>
  );
};

export default BookingManagementModal;
