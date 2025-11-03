import { motion } from 'framer-motion';
import {
    BarChart3,
    Calendar,
    DollarSign,
    Home,
    LogOut,
    Menu,
    Plus,
    Settings,
    TrendingUp,
    Users,
    X,
} from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link, Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import '../../styles/HostDashboard.css';

const HostDashboard = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalBookings: 0,
    totalEarnings: 0,
    monthlyEarnings: 0,
  });

  // Redirect if not authenticated or not a host
  if (!isAuthenticated) {
    return <Navigate to="/login?redirect=/host/dashboard" state={{ from: location }} />;
  }

  if (user?.role !== 'host') {
    toast.error('Access denied. Only hosts can access this page.');
    return <Navigate to="/" />;
  }

  const menuItems = [
    { path: '/host/dashboard', icon: Home, label: 'Dashboard', exact: true },
    { path: '/host/properties', icon: BarChart3, label: 'My Properties' },
    { path: '/host/bookings', icon: Calendar, label: 'Bookings' },
    { path: '/host/earnings', icon: DollarSign, label: 'Earnings' },
    { path: '/host/profile', icon: Settings, label: 'Profile Settings' },
  ];

  const handleLogout = () => {
    // Implement logout logic
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <div className="host-dashboard-container">
      {/* Sidebar */}
      <motion.aside
        className={`host-sidebar ${sidebarOpen ? 'open' : 'closed'}`}
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        {/* Logo & Brand */}
        <div className="sidebar-header">
          <motion.div
            className="brand-logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="logo-icon" />
            <span className="brand-name">Host Hub</span>
          </motion.div>
          <button
            className="sidebar-toggle-mobile"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Host Info Card */}
        <motion.div
          className="host-info-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="host-avatar">
            <img
              src={user?.avatar || 'https://i.pravatar.cc/150?img=12'}
              alt={user?.name}
            />
            <div className="status-indicator online" />
          </div>
          <div className="host-details">
            <h3>{user?.name || 'Host Name'}</h3>
            <p className="host-role">Professional Host</p>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="quick-stats">
          <div className="stat-item">
            <TrendingUp size={20} className="stat-icon" />
            <div>
              <p className="stat-value">{stats.totalProperties}</p>
              <p className="stat-label">Properties</p>
            </div>
          </div>
          <div className="stat-item">
            <Users size={20} className="stat-icon" />
            <div>
              <p className="stat-value">{stats.totalBookings}</p>
              <p className="stat-label">Bookings</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const isActive = item.exact
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${isActive ? 'active' : ''}`}
              >
                <item.icon size={20} className="nav-icon" />
                <span className="nav-label">{item.label}</span>
                {isActive && (
                  <motion.div
                    className="active-indicator"
                    layoutId="activeTab"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Add Property Button */}
        <motion.button
          className="btn-add-property"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/host/properties/new')}
        >
          <Plus size={20} />
          <span>Add New Property</span>
        </motion.button>

        {/* Logout Button */}
        <button className="btn-logout" onClick={handleLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </motion.aside>

      {/* Main Content Area */}
      <div className="host-main-content">
        {/* Top Bar */}
        <header className="host-topbar">
          <button
            className="sidebar-toggle-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu size={24} />
          </button>

          <div className="topbar-right">
            <motion.button
              className="btn-back-to-guest"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
            >
              Back to Guest View
            </motion.button>
          </div>
        </header>

        {/* Content */}
        <main className="dashboard-content">
          <Outlet context={{ stats, setStats }} />
        </main>
      </div>
    </div>
  );
};

export default HostDashboard;
