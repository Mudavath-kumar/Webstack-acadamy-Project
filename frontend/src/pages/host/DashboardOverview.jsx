import axios from 'axios';
import { motion } from 'framer-motion';
import {
    ArrowDown,
    ArrowUp,
    Calendar,
    DollarSign,
    Home,
    Plus,
    TrendingUp,
    Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const DashboardOverview = () => {
  const { stats, setStats } = useOutletContext();
  const [loading, setLoading] = useState(true);
  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const base = import.meta.env.VITE_API_URL || '/api/v1';

      // Fetch host properties and bookings with fallback
      const [propertiesRes, bookingsRes] = await Promise.allSettled([
        axios.get(`${base}/properties/host/my-properties`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${base}/bookings/host/all`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      // Extract data with safe fallbacks
      const properties = propertiesRes.status === 'fulfilled' 
        ? (propertiesRes.value?.data?.data || [])
        : [];
      
      const bookings = bookingsRes.status === 'fulfilled'
        ? (bookingsRes.value?.data?.data || [])
        : [];

      // Calculate stats
      const totalEarnings = bookings
        .filter((b) => b.status === 'confirmed' || b.status === 'completed')
        .reduce((sum, b) => sum + (b.totalAmount || 0), 0);

      const currentMonth = new Date().getMonth();
      const monthlyEarnings = bookings
        .filter(
          (b) =>
            (b.status === 'confirmed' || b.status === 'completed') &&
            new Date(b.createdAt).getMonth() === currentMonth
        )
        .reduce((sum, b) => sum + (b.totalAmount || 0), 0);

      setStats({
        totalProperties: properties.length,
        totalBookings: bookings.length,
        totalEarnings,
        monthlyEarnings,
      });

      // Get recent bookings
      setRecentBookings(bookings.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Set default values instead of showing error
      setStats({
        totalProperties: 0,
        totalBookings: 0,
        totalEarnings: 0,
        monthlyEarnings: 0,
      });
      setRecentBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const statsCards = [
    {
      title: 'Total Properties',
      value: stats.totalProperties,
      icon: Home,
      color: '#667eea',
      change: '+2 this month',
      positive: true,
    },
    {
      title: 'Total Bookings',
      value: stats.totalBookings,
      icon: Calendar,
      color: '#f5576c',
      change: '+12% from last month',
      positive: true,
    },
    {
      title: 'Monthly Earnings',
      value: `₹${stats.monthlyEarnings.toLocaleString()}`,
      icon: TrendingUp,
      color: '#4facfe',
      change: '+8% from last month',
      positive: true,
    },
    {
      title: 'Total Earnings',
      value: `₹${stats.totalEarnings.toLocaleString()}`,
      icon: DollarSign,
      color: '#fee140',
      change: 'All time',
      positive: true,
    },
  ];

  if (loading) {
    return (
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '2rem' }}>
          Dashboard Overview
        </h1>
        <div className="stats-grid">
          {[1, 2, 3, 4].map((i) => (
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
      {/* Page Header */}
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
          Dashboard Overview
        </h1>
        <p style={{ color: 'var(--host-text-secondary)', fontSize: '1.1rem', fontWeight: '500' }}>
          Welcome back, {' '}
          <span style={{ color: 'var(--host-primary)', fontWeight: '700' }}>
            {JSON.parse(localStorage.getItem('user') || '{}').name || 'Host'}
          </span>
          ! Here's your property performance today. 🎉
        </p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">{statsCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="stat-card-header">
              <div>
                <div className="stat-card-value">{stat.value}</div>
                <div className="stat-card-label">{stat.title}</div>
                <div
                  className={`stat-card-change ${
                    stat.positive ? 'positive' : 'negative'
                  }`}
                >
                  {stat.positive ? (
                    <ArrowUp size={16} />
                  ) : (
                    <ArrowDown size={16} />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="stat-card-icon">
                <stat.icon size={28} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Bookings Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{
          marginTop: '2.5rem',
          background: 'white',
          borderRadius: '20px',
          padding: '2rem',
          boxShadow: 'var(--host-shadow)',
          border: '1px solid var(--host-border)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
          }}
        >
          <div>
            <h2 style={{ 
              fontSize: '1.75rem', 
              fontWeight: '800',
              marginBottom: '0.25rem',
              color: 'var(--host-text-primary)'
            }}>
              Recent Bookings
            </h2>
            <p style={{ color: 'var(--host-text-secondary)', fontSize: '0.95rem' }}>
              Your latest guest reservations
            </p>
          </div>
          <button
            className="btn-secondary"
            style={{ padding: '0.75rem 1.5rem', fontSize: '0.95rem', fontWeight: '600' }}
            onClick={() => (window.location.href = '/host/bookings')}
          >
            View All Bookings →
          </button>
        </div>

        {recentBookings.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              background: 'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%)',
              borderRadius: '12px',
            }}
          >
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 1.5rem',
              background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 20px rgba(124, 58, 237, 0.3)'
            }}>
              <Calendar size={40} color="white" />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--host-text-primary)' }}>
              No bookings yet!
            </h3>
            <p style={{ color: 'var(--host-text-secondary)', marginBottom: '1.5rem', fontSize: '1rem' }}>
              Start by adding amazing properties to attract guests 🏠
            </p>
            <button
              className="btn-primary"
              style={{ padding: '0.875rem 2rem', fontSize: '1rem' }}
              onClick={() => (window.location.href = '/host/properties/new')}
            >
              <Plus size={20} style={{ marginRight: '0.5rem' }} />
              Add Your First Property
            </button>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr
                  style={{
                    borderBottom: '2px solid rgba(0, 0, 0, 0.05)',
                    textAlign: 'left',
                  }}
                >
                  <th style={{ padding: '1rem', fontWeight: '600' }}>Guest</th>
                  <th style={{ padding: '1rem', fontWeight: '600' }}>Property</th>
                  <th style={{ padding: '1rem', fontWeight: '600' }}>Check-in</th>
                  <th style={{ padding: '1rem', fontWeight: '600' }}>Amount</th>
                  <th style={{ padding: '1rem', fontWeight: '600' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr
                    key={booking._id}
                    style={{
                      borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #667eea, #764ba2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: '600',
                          }}
                        >
                          {booking.guest?.name?.charAt(0) || 'G'}
                        </div>
                        <span style={{ fontWeight: '500' }}>
                          {booking.guest?.name || 'Guest'}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '1rem' }}>
                      {booking.property?.title || 'Property'}
                    </td>
                    <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
                      {new Date(booking.checkIn).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '1rem', fontWeight: '600', color: '#667eea' }}>
                      ₹{booking.totalAmount?.toLocaleString() || 0}
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <span
                        style={{
                          padding: '0.375rem 0.75rem',
                          borderRadius: '50px',
                          fontSize: '0.85rem',
                          fontWeight: '600',
                          backgroundColor:
                            booking.status === 'confirmed'
                              ? 'rgba(16, 185, 129, 0.1)'
                              : booking.status === 'pending'
                              ? 'rgba(251, 191, 36, 0.1)'
                              : 'rgba(239, 68, 68, 0.1)',
                          color:
                            booking.status === 'confirmed'
                              ? '#10b981'
                              : booking.status === 'pending'
                              ? '#fbbf24'
                              : '#ef4444',
                        }}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{
          marginTop: '2rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
        }}
      >
        <div
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '16px',
            padding: '2rem',
            color: 'white',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onClick={() => (window.location.href = '/host/properties/new')}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          <Home size={32} style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>
            Add New Property
          </h3>
          <p style={{ opacity: 0.9, fontSize: '0.95rem' }}>
            List a new property and start earning
          </p>
        </div>

        <div
          style={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            borderRadius: '16px',
            padding: '2rem',
            color: 'white',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onClick={() => (window.location.href = '/host/bookings')}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
        >
          <Users size={32} style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>
            Manage Bookings
          </h3>
          <p style={{ opacity: 0.9, fontSize: '0.95rem' }}>
            Review and respond to booking requests
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DashboardOverview;
