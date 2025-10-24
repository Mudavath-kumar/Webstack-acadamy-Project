import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Lock, Calendar, Users, MapPin } from 'lucide-react';
import MotionWrapper from '../components/MotionWrapper';

const Checkout = () => {
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: '',
  });

  const booking = {
    title: 'Luxury Beachfront Villa',
    location: 'Malibu, California',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80',
    checkIn: '2024-04-01',
    checkOut: '2024-04-05',
    guests: 4,
    nights: 4,
    pricePerNight: 450,
    cleaningFee: 75,
    serviceFee: 90,
  };

  const total = booking.nights * booking.pricePerNight + booking.cleaningFee + booking.serviceFee;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Booking confirmed! (This is a demo)');
  };

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--bg-secondary)' }}>
      <div className="container section">
        <MotionWrapper>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              fontWeight: '700',
              marginBottom: 'var(--spacing-2xl)',
              textAlign: 'center',
            }}
          >
            Complete your booking
          </h1>
        </MotionWrapper>

        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 'var(--spacing-2xl)', maxWidth: '1200px', margin: '0 auto' }}>
          {/* Payment Form */}
          <div>
            <MotionWrapper delay={0.1}>
              <div className="card" style={{ padding: 'var(--spacing-xl)' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: '700', marginBottom: 'var(--spacing-lg)' }}>
                  Payment information
                </h2>

                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                    <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
                      Card number
                    </label>
                    <div style={{ position: 'relative' }}>
                      <CreditCard size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={paymentInfo.cardNumber}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })}
                        className="input"
                        style={{ paddingLeft: '2.5rem' }}
                        required
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
                    <div>
                      <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
                        Expiry date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={paymentInfo.expiry}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, expiry: e.target.value })}
                        className="input"
                        required
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        value={paymentInfo.cvv}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                        className="input"
                        required
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                    <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
                      Cardholder name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={paymentInfo.name}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, name: e.target.value })}
                      className="input"
                      required
                    />
                  </div>

                  <div style={{ background: 'var(--bg-secondary)', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--spacing-xl)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Lock size={20} color="var(--primary)" />
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      Your payment information is encrypted and secure
                    </p>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-gradient"
                    style={{ width: '100%', padding: 'var(--spacing-md)', fontSize: '1.1rem' }}
                  >
                    Confirm and Pay ₹{total}
                  </motion.button>
                </form>
              </div>
            </MotionWrapper>
          </div>

          {/* Booking Summary */}
          <div>
            <MotionWrapper delay={0.2}>
              <div className="card" style={{ padding: 'var(--spacing-xl)', position: 'sticky', top: '100px' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: '700', marginBottom: 'var(--spacing-lg)' }}>
                  Booking summary
                </h2>

                <img
                  src={booking.image}
                  alt={booking.title}
                  style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: 'var(--spacing-lg)' }}
                />

                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                  {booking.title}
                </h3>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: 'var(--spacing-lg)' }}>
                  <MapPin size={14} />
                  {booking.location}
                </p>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 'var(--spacing-md)', marginBottom: 'var(--spacing-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: 'var(--spacing-md)' }}>
                    <Calendar size={18} color="var(--text-secondary)" />
                    <div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Check-in / Check-out</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: '600' }}>
                        {booking.checkIn} - {booking.checkOut}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: 'var(--spacing-md)' }}>
                    <Users size={18} color="var(--text-secondary)" />
                    <div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Guests</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: '600' }}>{booking.guests} guests</div>
                    </div>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 'var(--spacing-md)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-sm)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>₹{booking.pricePerNight * 100} x {booking.nights} nights</span>
                    <span>₹{booking.nights * booking.pricePerNight * 100}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-sm)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Cleaning fee</span>
                    <span>₹{booking.cleaningFee * 100}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--spacing-md)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Service fee</span>
                    <span>₹{booking.serviceFee * 100}</span>
                  </div>
                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 'var(--spacing-md)', display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: '700' }}>
                    <span>Total</span>
                    <span>₹{total}</span>
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
      `}</style>
    </div>
  );
};

export default Checkout;
