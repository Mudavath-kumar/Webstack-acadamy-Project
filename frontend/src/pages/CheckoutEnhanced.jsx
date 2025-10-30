import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  CreditCard, Lock, Calendar, Users, MapPin, AlertCircle, CheckCircle,
  Loader, Shield, Clock
} from 'lucide-react';
import { bookingAPI, paymentAPI } from '../services/api';
import toast from 'react-hot-toast';
import MotionWrapper from '../components/MotionWrapper';

const CheckoutEnhanced = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  // Get booking data from location state or use demo data
  const [booking, setBooking] = useState(location.state?.booking || {
    property: {
      _id: 'demo-property',
      title: 'Luxury Beachfront Villa',
      location: 'Malibu, California',
      images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80'],
    },
    checkIn: '2024-04-01',
    checkOut: '2024-04-05',
    guests: 4,
    nights: 4,
    pricePerNight: 45000,
    cleaningFee: 7500,
    serviceFee: 9000,
    gst: 10350,
  });

  const [guestInfo, setGuestInfo] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    specialRequests: '',
  });

  // Calculate total
  const calculateTotal = () => {
    const subtotal = booking.nights * booking.pricePerNight;
    const cleaningFee = booking.cleaningFee || 0;
    const serviceFee = booking.serviceFee || 0;
    const gst = booking.gst || Math.round(subtotal * 0.18); // 18% GST
    return subtotal + cleaningFee + serviceFee + gst;
  };

  const total = calculateTotal();

  // Handle MongoDB-based payment
  const handlePayment = async () => {
    if (!user) {
      toast.error('Please login to continue');
      navigate('/login', { state: { from: location } });
      return;
    }

    if (!guestInfo.fullName || !guestInfo.email || !guestInfo.phone) {
      toast.error('Please fill in all guest information');
      return;
    }

    setIsProcessing(true);

    try {
      // Create booking first
      const bookingResponse = await bookingAPI.createBooking({
        property: booking.property._id,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        guests: booking.guests,
        totalPrice: total / 100, // Convert paise to rupees for booking
        guestInfo: guestInfo,
      });

      if (!bookingResponse.data.success) {
        throw new Error('Failed to create booking');
      }

      const bookingId = bookingResponse.data.data._id;

      // Create MongoDB payment order
      const orderResponse = await paymentAPI.createOrder({
        amount: total / 100, // Convert to actual amount
        bookingId: bookingId,
        paymentMethod: paymentMethod,
        currency: 'USD',
      });

      if (!orderResponse.data.success) {
        throw new Error('Failed to create payment order');
      }

      const paymentId = orderResponse.data.data.paymentId;
      toast.loading('Processing payment...');

      // Process payment (MongoDB-based)
      const processResponse = await paymentAPI.processPayment({
        paymentId: paymentId,
        bookingId: bookingId,
        paymentMethod: paymentMethod,
        paymentDetails: {
          cardLastFour: '4242',
          cardBrand: 'Visa',
        },
      });

      if (!processResponse.data.success) {
        throw new Error('Failed to process payment');
      }

      // Wait a moment for processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Verify payment
      const verifyResponse = await paymentAPI.verifyPayment({
        paymentId: paymentId,
        bookingId: bookingId,
      });

      if (verifyResponse.data.success) {
        toast.dismiss();
        toast.success('Payment successful! 🎉', { duration: 5000 });
        
        // Navigate to success page
        navigate('/trips', { 
          state: { 
            bookingSuccess: true, 
            bookingId: bookingId 
          } 
        });
      } else {
        throw new Error('Payment verification failed');
      }
      
      setIsProcessing(false);
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(error.response?.data?.message || 'Payment failed. Please try again.');
      setIsProcessing(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handlePayment();
  };

  if (!booking.property) {
    return (
      <div style={{ paddingTop: '100px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <AlertCircle size={64} color="var(--text-tertiary)" style={{ margin: '0 auto var(--spacing-lg)' }} />
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>No booking information found</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-xl)' }}>
            Please select a property and try again
          </p>
          <a href="/explore" className="btn-gradient">
            Browse Properties
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--bg-secondary)' }}>
      <div className="container section">
        <MotionWrapper>
          <div style={{ marginBottom: 'var(--spacing-2xl)', textAlign: 'center' }}>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                fontWeight: '700',
                marginBottom: '0.5rem',
              }}
            >
              Complete Your Booking
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
              Secure payment powered by MongoDB
            </p>
          </div>
        </MotionWrapper>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1.5fr 1fr', 
          gap: 'var(--spacing-2xl)', 
          maxWidth: '1200px', 
          margin: '0 auto',
        }}>
          {/* Left Column - Guest Info & Payment */}
          <div>
            {/* Guest Information */}
            <MotionWrapper delay={0.1}>
              <div className="card" style={{ padding: 'var(--spacing-xl)', marginBottom: 'var(--spacing-lg)' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: '700', marginBottom: 'var(--spacing-lg)' }}>
                  Guest Information
                </h2>

                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
                    <div>
                      <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={guestInfo.fullName}
                        onChange={(e) => setGuestInfo({ ...guestInfo, fullName: e.target.value })}
                        className="input"
                        required
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
                        Email Address *
                      </label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={guestInfo.email}
                        onChange={(e) => setGuestInfo({ ...guestInfo, email: e.target.value })}
                        className="input"
                        required
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 99999 99999"
                        value={guestInfo.phone}
                        onChange={(e) => setGuestInfo({ ...guestInfo, phone: e.target.value })}
                        className="input"
                        required
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
                        Special Requests (Optional)
                      </label>
                      <textarea
                        placeholder="Any special requests or requirements..."
                        value={guestInfo.specialRequests}
                        onChange={(e) => setGuestInfo({ ...guestInfo, specialRequests: e.target.value })}
                        className="input"
                        rows="3"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </MotionWrapper>

            {/* Payment Method */}
            <MotionWrapper delay={0.2}>
              <div className="card" style={{ padding: 'var(--spacing-xl)', marginBottom: 'var(--spacing-lg)' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: '700', marginBottom: 'var(--spacing-lg)' }}>
                  Payment Method
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                  <label style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 'var(--spacing-md)', 
                    padding: 'var(--spacing-lg)', 
                    background: paymentMethod === 'card' ? 'var(--primary)10' : 'var(--bg-secondary)', 
                    border: `2px solid ${paymentMethod === 'card' ? 'var(--primary)' : 'var(--border-color)'}`,
                    borderRadius: 'var(--radius-lg)', 
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <CreditCard size={20} color="var(--primary)" />
                        <strong style={{ fontSize: '1.05rem' }}>Credit/Debit Card</strong>
                      </div>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                        Secure payment processing with MongoDB
                      </p>
                    </div>
                    <Shield size={24} color="#22C55E" />
                  </label>
                </div>

                {/* Security Notice */}
                <div style={{ 
                  background: 'var(--bg-secondary)', 
                  padding: 'var(--spacing-md)', 
                  borderRadius: 'var(--radius-md)', 
                  marginTop: 'var(--spacing-lg)',
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem' 
                }}>
                  <Lock size={20} color="var(--primary)" />
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0 }}>
                    Your payment information is encrypted and secure. We use industry-standard security measures.
                  </p>
                </div>
              </div>
            </MotionWrapper>

            {/* Pay Button */}
            <MotionWrapper delay={0.3}>
              <motion.button
                type="submit"
                onClick={handleSubmit}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isProcessing}
                className="btn-gradient"
                style={{ 
                  width: '100%', 
                  padding: 'var(--spacing-lg)', 
                  fontSize: '1.15rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  opacity: isProcessing ? 0.7 : 1,
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                }}
              >
                {isProcessing ? (
                  <>
                    <Loader size={20} className="spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock size={20} />
                    Pay ₹{total.toLocaleString()}
                  </>
                )}
              </motion.button>
              
              <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: 'var(--spacing-md)' }}>
                By clicking "Pay", you agree to our Terms of Service and Privacy Policy
              </p>
            </MotionWrapper>
          </div>

          {/* Right Column - Booking Summary */}
          <div>
            <MotionWrapper delay={0.4}>
              <div className="card" style={{ padding: 'var(--spacing-xl)', position: 'sticky', top: '120px' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: '700', marginBottom: 'var(--spacing-lg)' }}>
                  Booking Summary
                </h2>

                <img
                  src={booking.property.images[0]}
                  alt={booking.property.title}
                  style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: 'var(--spacing-lg)' }}
                />

                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  {booking.property.title}
                </h3>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: 'var(--spacing-lg)' }}>
                  <MapPin size={14} />
                  {booking.property.location}
                </p>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: 'var(--spacing-md)' }}>
                    <Calendar size={18} color="var(--text-secondary)" />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Check-in / Check-out</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: '600' }}>
                        {booking.checkIn} - {booking.checkOut}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: 'var(--spacing-md)' }}>
                    <Users size={18} color="var(--text-secondary)" />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Guests</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: '600' }}>{booking.guests} guests</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Clock size={18} color="var(--text-secondary)" />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Duration</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: '600' }}>{booking.nights} nights</div>
                    </div>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 'var(--spacing-md)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-sm)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>₹{booking.pricePerNight.toLocaleString()} x {booking.nights} nights</span>
                    <span>₹{(booking.nights * booking.pricePerNight).toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-sm)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Cleaning fee</span>
                    <span>₹{booking.cleaningFee.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-sm)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Service fee</span>
                    <span>₹{booking.serviceFee.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-md)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>GST (18%)</span>
                    <span>₹{(booking.gst || Math.round((booking.nights * booking.pricePerNight) * 0.18)).toLocaleString()}</span>
                  </div>
                  <div style={{ borderTop: '2px solid var(--border-color)', paddingTop: 'var(--spacing-md)', display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: '700' }}>
                    <span>Total</span>
                    <span style={{ color: 'var(--primary)' }}>₹{total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div style={{ 
                  marginTop: 'var(--spacing-lg)', 
                  padding: 'var(--spacing-md)', 
                  background: 'var(--bg-secondary)', 
                  borderRadius: 'var(--radius-md)' 
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <CheckCircle size={16} color="#22C55E" />
                    <span style={{ fontSize: '0.9rem' }}>Free cancellation before 48 hours</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <CheckCircle size={16} color="#22C55E" />
                    <span style={{ fontSize: '0.9rem' }}>Secure payment processing</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle size={16} color="#22C55E" />
                    <span style={{ fontSize: '0.9rem' }}>24/7 customer support</span>
                  </div>
                </div>
              </div>
            </MotionWrapper>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 968px) {
          .container > div {
            grid-template-columns: 1fr !important;
          }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default CheckoutEnhanced;
