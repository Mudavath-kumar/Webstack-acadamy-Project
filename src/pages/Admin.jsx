import React from 'react';
import { motion } from 'framer-motion';
import { Users, Home, DollarSign, Activity } from 'lucide-react';
import MotionWrapper from '../components/MotionWrapper';

const Admin = () => {
  const stats = [
    { icon: Users, label: 'Total Users', value: '12,487', color: '#4F46E5' },
    { icon: Home, label: 'Total Properties', value: '3,245', color: '#FF385C' },
    { icon: DollarSign, label: 'Total Revenue', value: '₹8.42Cr', color: '#22C55E' },
    { icon: Activity, label: 'Active Bookings', value: '1,823', color: '#F59E0B' },
  ];

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="container section">
        <MotionWrapper>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '700', marginBottom: 'var(--spacing-2xl)' }}>
            Admin Dashboard
          </h1>
        </MotionWrapper>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--spacing-lg)' }}>
          {stats.map((stat, index) => (
            <MotionWrapper key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                className="glass-card"
              >
                <div style={{ width: '56px', height: '56px', borderRadius: 'var(--radius-lg)', background: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--spacing-lg)' }}>
                  <stat.icon size={28} color="white" />
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{stat.label}</p>
                <p style={{ fontSize: '2.5rem', fontWeight: '700', fontFamily: 'var(--font-display)', color: stat.color }}>{stat.value}</p>
              </motion.div>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
