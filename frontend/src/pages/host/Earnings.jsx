import axios from 'axios';
import { motion } from 'framer-motion';
import {
    ArrowUpRight,
    Calendar,
    DollarSign,
    Download,
    TrendingUp
} from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Earnings = () => {
  const [earnings, setEarnings] = useState({
    total: 0,
    monthly: 0,
    pending: 0,
    available: 0,
  });
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    fetchEarnings();
    fetchTransactions();
  }, []);

  const fetchEarnings = async () => {
    try {
      const token = localStorage.getItem('token');
      const base = import.meta.env.VITE_API_URL || '/api/v1';
      
      const response = await axios.get(`${base}/payments/host/earnings`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = response.data?.data || {};
      setEarnings({
        total: data.totalEarnings || 0,
        monthly: data.monthlyEarnings || 0,
        pending: data.pendingEarnings || 0,
        available: data.availableEarnings || 0,
      });

      setMonthlyData(data.monthlyBreakdown || []);
    } catch (error) {
      console.error('Error fetching earnings:', error);
      // Don't show error toast, just use default values
      setEarnings({
        total: 0,
        monthly: 0,
        pending: 0,
        available: 0,
      });
      setMonthlyData([]);
    }
  };

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const base = import.meta.env.VITE_API_URL || '/api/v1';
      
      const response = await axios.get(`${base}/payments/host/transactions`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTransactions(response.data?.data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
      // Don't show error toast, just use empty array
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleWithdraw = () => {
    toast.success('Withdrawal feature coming soon!');
  };

  const handleExport = () => {
    toast.success('Export feature coming soon!');
  };

  if (loading && transactions.length === 0) {
    return (
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '2rem' }}>
          Earnings & Payouts
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
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2.5rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '800', 
            marginBottom: '0.75rem',
            background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Earnings & Payouts
          </h1>
          <p style={{ 
            color: 'var(--host-text-secondary)', 
            fontSize: '1.1rem', 
            fontWeight: '500' 
          }}>
            Track your revenue and manage withdrawals 💰
          </p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <motion.button
            className="btn-secondary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleExport}
          >
            <Download size={18} />
            <span>Export</span>
          </motion.button>
          <motion.button
            className="btn-primary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleWithdraw}
          >
            <DollarSign size={18} />
            <span>Withdraw Funds</span>
          </motion.button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid" style={{ marginBottom: '2rem' }}>
        <motion.div
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
            <DollarSign size={24} color="white" />
          </div>
          <div className="stat-content">
            <span className="stat-label">Total Earnings</span>
            <span className="stat-value">₹{earnings.total.toLocaleString()}</span>
            <div className="stat-change positive">
              <ArrowUpRight size={16} />
              <span>12% from last month</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
            <TrendingUp size={24} color="white" />
          </div>
          <div className="stat-content">
            <span className="stat-label">This Month</span>
            <span className="stat-value">₹{earnings.monthly.toLocaleString()}</span>
            <div className="stat-change positive">
              <ArrowUpRight size={16} />
              <span>8% increase</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
            <Calendar size={24} color="white" />
          </div>
          <div className="stat-content">
            <span className="stat-label">Pending Payouts</span>
            <span className="stat-value">₹{earnings.pending.toLocaleString()}</span>
            <div className="stat-change neutral">
              <span>Processing...</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="stat-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
            <DollarSign size={24} color="white" />
          </div>
          <div className="stat-content">
            <span className="stat-label">Available Balance</span>
            <span className="stat-value">₹{earnings.available.toLocaleString()}</span>
            <div className="stat-change positive">
              <span>Ready to withdraw</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Monthly Trend */}
      {monthlyData.length > 0 && (
        <motion.div
          className="earnings-chart"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{ marginBottom: '2rem' }}
        >
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem' }}>
            Monthly Revenue Trend
          </h2>
          <div className="chart-bars">
            {monthlyData.slice(-6).map((month, index) => {
              const maxValue = Math.max(...monthlyData.map((m) => m.amount));
              const height = (month.amount / maxValue) * 200;
              return (
                <div key={index} className="chart-bar-wrapper">
                  <motion.div
                    className="chart-bar"
                    initial={{ height: 0 }}
                    animate={{ height: `${height}px` }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  >
                    <div className="chart-bar-value">₹{month.amount.toLocaleString()}</div>
                  </motion.div>
                  <span className="chart-bar-label">{month.month}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Transactions Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem' }}>
          Recent Transactions
        </h2>

        {transactions.length === 0 ? (
          <div
            style={{
              background: 'white',
              borderRadius: '16px',
              padding: '3rem 2rem',
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
                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <DollarSign size={40} color="#667eea" />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
              No transactions yet
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              Your transaction history will appear here once you receive bookings
            </p>
          </div>
        ) : (
          <div className="transactions-table">
            <div className="table-header">
              <div className="table-cell">Date</div>
              <div className="table-cell">Property</div>
              <div className="table-cell">Booking ID</div>
              <div className="table-cell">Guest</div>
              <div className="table-cell">Amount</div>
              <div className="table-cell">Status</div>
            </div>
            {transactions.map((transaction, index) => (
              <motion.div
                key={transaction._id}
                className="table-row"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.05 }}
              >
                <div className="table-cell">
                  <Calendar size={16} />
                  <span>{formatDate(transaction.createdAt)}</span>
                </div>
                <div className="table-cell">
                  <strong>{transaction.property?.title || 'N/A'}</strong>
                </div>
                <div className="table-cell">
                  <span className="booking-id">#{transaction.booking?._id?.slice(-8) || 'N/A'}</span>
                </div>
                <div className="table-cell">
                  {transaction.user?.name || transaction.user?.email || 'Guest'}
                </div>
                <div className="table-cell">
                  <strong style={{ color: '#667eea' }}>
                    {transaction.type === 'refund' ? '-' : '+'}₹{transaction.amount.toLocaleString()}
                  </strong>
                </div>
                <div className="table-cell">
                  <span
                    className="transaction-status"
                    style={{
                      background:
                        transaction.status === 'completed'
                          ? '#D4EDDA'
                          : transaction.status === 'pending'
                          ? '#FFF3CD'
                          : '#F8D7DA',
                      color:
                        transaction.status === 'completed'
                          ? '#155724'
                          : transaction.status === 'pending'
                          ? '#856404'
                          : '#721C24',
                    }}
                  >
                    {transaction.status || 'Unknown'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Earnings;
