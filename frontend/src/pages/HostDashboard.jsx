import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Home, TrendingUp, Users, Plus } from 'lucide-react';
import MotionWrapper from '../components/MotionWrapper';

const HostDashboard = () => {
  const stats = [
    { icon: DollarSign, label: 'Total Earnings', value: '₹24,58,000', change: '+12.5%' },
    { icon: Home, label: 'Active Listings', value: '8', change: '+2' },
    { icon: Users, label: 'Total Guests', value: '342', change: '+18%' },
    { icon: TrendingUp, label: 'Occupancy Rate', value: '87%', change: '+5%' },
  ];

  const listings = [
    {
      id: 1,
      title: 'Luxury Beachfront Villa',
      location: 'Malibu, CA',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80',
      status: 'Active',
      bookings: 23,
      revenue: '₹10,35,000',
    },
    {
      id: 2,
      title: 'Mountain Retreat Cabin',
      location: 'Aspen, CO',
      image: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=600&q=80',
      status: 'Active',
      bookings: 18,
      revenue: '₹4,95,000',
    },
  ];

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="container section">
        <MotionWrapper>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-2xl)' }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '700' }}>
              Host Dashboard
            </h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-gradient"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: 'var(--spacing-md) var(--spacing-xl)' }}
            >
              <Plus size={20} />
              Add Listing
            </motion.button>
          </div>
        </MotionWrapper>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-2xl)' }}>
          {stats.map((stat, index) => (
            <MotionWrapper key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="glass-card"
              >
                <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: 'var(--spacing-md)' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-lg)', background: 'var(--gradient-sunset)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <stat.icon size={24} color="white" />
                  </div>
                  <span style={{ padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', background: 'rgba(34, 197, 94, 0.1)', color: '#22C55E', fontSize: '0.8rem', fontWeight: '600' }}>
                    {stat.change}
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>{stat.label}</p>
                <p style={{ fontSize: '2rem', fontWeight: '700', fontFamily: 'var(--font-display)' }}>{stat.value}</p>
              </motion.div>
            </MotionWrapper>
          ))}
        </div>

        {/* Listings */}
        <MotionWrapper delay={0.4}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: '700', marginBottom: 'var(--spacing-xl)' }}>
            Your Listings
          </h2>
        </MotionWrapper>

        <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
          {listings.map((listing, index) => (
            <MotionWrapper key={listing.id} delay={0.5 + index * 0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                className="card"
                style={{ padding: 0, overflow: 'hidden', display: 'grid', gridTemplateColumns: '200px 1fr auto', gap: 'var(--spacing-lg)', alignItems: 'center' }}
              >
                <img src={listing.image} alt={listing.title} style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '150px' }} />
                <div style={{ padding: 'var(--spacing-lg)' }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                    {listing.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-md)' }}>{listing.location}</p>
                  <div style={{ display: 'flex', gap: 'var(--spacing-xl)' }}>
                    <div>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Bookings</span>
                      <p style={{ fontSize: '1.25rem', fontWeight: '700' }}>{listing.bookings}</p>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Revenue</span>
                      <p style={{ fontSize: '1.25rem', fontWeight: '700' }}>{listing.revenue}</p>
                    </div>
                  </div>
                </div>
                <div style={{ padding: 'var(--spacing-lg)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)', alignItems: 'center' }}>
                  <span style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', background: 'rgba(34, 197, 94, 0.1)', color: '#22C55E', fontSize: '0.85rem', fontWeight: '600' }}>
                    {listing.status}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-outline"
                    style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                  >
                    Edit
                  </motion.button>
                </div>
              </motion.div>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HostDashboard;
