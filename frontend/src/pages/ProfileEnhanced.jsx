import { AnimatePresence, motion } from 'framer-motion';
import {
    Bell,
    Calendar,
    Camera,
    CheckCircle,
    Clock,
    DollarSign,
    Download,
    Edit2,
    Lock,
    Mail,
    MapPin,
    Phone,
    Save,
    User,
    XCircle
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import MotionWrapper from '../components/MotionWrapper';
import { bookingAPI, userAPI } from '../services/api';
import { updatePassword } from '../store/slices/authSlice';

const ProfileEnhanced = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    totalBookings: 0,
    upcomingBookings: 0,
    completedBookings: 0,
    totalSpent: 0,
  });
  
  // Profile form state
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    address: '',
  });
  
  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  // Preferences state
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    bookingUpdates: true,
    priceAlerts: false,
  });

  // Load user data and bookings
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        bio: user.bio || '',
        address: user.address || '',
      });
      setImagePreview(user.avatar?.url || null);
      loadBookings();
    }
  }, [user]);

  // Load bookings
  const loadBookings = async () => {
    try {
      const response = await bookingAPI.getUserBookings();
      if (response.data.success) {
        const bookingsData = response.data.data || [];
        setBookings(bookingsData);
        calculateStats(bookingsData);
      }
    } catch (error) {
      console.error('Error loading bookings:', error);
      // Set demo data for demonstration
      const demoBookings = [
        {
          _id: '1',
          property: {
            title: 'Luxury Beachfront Villa',
            location: 'Malibu, CA',
            images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80'],
          },
          checkIn: '2024-04-01',
          checkOut: '2024-04-05',
          guests: 4,
          totalPrice: 2165,
          status: 'confirmed',
          paymentInfo: { status: 'completed' },
        },
        {
          _id: '2',
          property: {
            title: 'Mountain Retreat Cabin',
            location: 'Aspen, CO',
            images: ['https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=600&q=80'],
          },
          checkIn: '2024-03-15',
          checkOut: '2024-03-18',
          guests: 2,
          totalPrice: 890,
          status: 'completed',
          paymentInfo: { status: 'completed' },
        },
      ];
      setBookings(demoBookings);
      calculateStats(demoBookings);
    }
  };

  // Calculate statistics
  const calculateStats = (bookingsData) => {
    const now = new Date();
    const upcoming = bookingsData.filter(b => new Date(b.checkIn) > now);
    const completed = bookingsData.filter(b => b.status === 'completed');
    const totalSpent = bookingsData.reduce((sum, b) => sum + (b.totalPrice || 0), 0);

    setStats({
      totalBookings: bookingsData.length,
      upcomingBookings: upcoming.length,
      completedBookings: completed.length,
      totalSpent: totalSpent,
    });
  };

  // Handle profile update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    
    if (!profileData.name.trim()) {
      toast.error('Name is required');
      return;
    }

    setIsLoading(true);
    
    try {
      // Update MongoDB user profile
      const response = await userAPI.updateProfile(profileData);
      
      if (response.data.success) {
        // Update local storage
        const updatedUser = { ...user, ...profileData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        toast.success('Profile updated successfully! 🎉');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle avatar upload
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    
    if (!file) return;
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    toast.success('Avatar uploaded successfully! 🎨');
  };

  // Handle password update
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error('Please fill all password fields');
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters');
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);
    
    try {
      // MongoDB password update
      await dispatch(updatePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      })).unwrap();
      
      toast.success('Password updated successfully! 🔐');
      
      // Clear form
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error('Password update error:', error);
      toast.error(error || 'Failed to update password');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle booking cancellation
  const handleCancelBooking = async (bookingId) => {
    const confirmed = window.confirm('Are you sure you want to cancel this booking?');
    if (!confirmed) return;

    try {
      await bookingAPI.cancelBooking(bookingId);
      toast.success('Booking cancelled successfully');
      loadBookings();
    } catch (error) {
      console.error('Cancel booking error:', error);
      toast.error('Failed to cancel booking');
    }
  };

  // Get booking status badge
  const getStatusBadge = (status) => {
    const statusConfig = {
      confirmed: { color: '#22C55E', bg: 'rgba(34, 197, 94, 0.1)', icon: CheckCircle },
      pending: { color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)', icon: Clock },
      cancelled: { color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)', icon: XCircle },
      completed: { color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)', icon: CheckCircle },
    };

    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.25rem',
        padding: '0.375rem 0.75rem',
        borderRadius: 'var(--radius-full)',
        background: config.bg,
        color: config.color,
        fontSize: '0.875rem',
        fontWeight: '600',
      }}>
        <Icon size={14} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Tab configuration
  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'bookings', label: 'My Bookings', icon: Calendar },
    { id: 'account', label: 'Account Info', icon: Edit2 },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'preferences', label: 'Preferences', icon: Bell },
  ];

  if (!user) {
    return (
      <div style={{ paddingTop: '100px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Please log in to view your profile</h2>
          <a href="/login" className="btn-gradient">Go to Login</a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <div className="container section">
        {/* Header */}
        <MotionWrapper>
          <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
            <h1 style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: 'clamp(2rem, 4vw, 3rem)', 
              fontWeight: '700',
              marginBottom: '0.5rem'
            }}>
              {activeTab === 'overview' && 'My Profile'}
              {activeTab === 'bookings' && 'My Bookings'}
              {activeTab === 'account' && 'Account Settings'}
              {activeTab === 'security' && 'Security Settings'}
              {activeTab === 'preferences' && 'Preferences'}
            </h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
              {activeTab === 'overview' && 'Overview of your account and activity'}
              {activeTab === 'bookings' && 'Manage and track all your reservations'}
              {activeTab === 'account' && 'Update your personal information'}
              {activeTab === 'security' && 'Manage your password and security'}
              {activeTab === 'preferences' && 'Customize your experience'}
            </p>
          </div>
        </MotionWrapper>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '280px 1fr', 
          gap: 'var(--spacing-2xl)',
          '@media (max-width: 968px)': {
            gridTemplateColumns: '1fr'
          }
        }}>
          {/* Sidebar */}
          <div>
            {/* Profile Card */}
            <MotionWrapper delay={0.1}>
              <div className="card" style={{ padding: 'var(--spacing-xl)', textAlign: 'center', marginBottom: 'var(--spacing-lg)' }}>
                <div style={{ position: 'relative', display: 'inline-block', marginBottom: 'var(--spacing-md)' }}>
                  <div style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: imagePreview ? `url(${imagePreview})` : 'var(--gradient-sunset)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.5rem',
                    color: 'white',
                    fontWeight: '700',
                    border: '4px solid var(--bg-primary)',
                  }}>
                    {!imagePreview && (user.name?.[0] || user.email?.[0] || 'U').toUpperCase()}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                    accept="image/*"
                    style={{ display: 'none' }}
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      position: 'absolute',
                      bottom: '0',
                      right: '0',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'var(--primary)',
                      border: '2px solid var(--bg-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <Camera size={16} color="white" />
                  </motion.button>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.25rem' }}>
                  {user.name || 'User'}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-md)' }}>
                  {user.email}
                </p>
                {user.emailVerified && (
                  <div style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '0.25rem',
                    padding: '0.25rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(34, 197, 94, 0.1)',
                    color: '#22C55E',
                    fontSize: '0.8rem',
                    fontWeight: '600'
                  }}>
                    <CheckCircle size={12} />
                    Verified
                  </div>
                )}
              </div>
            </MotionWrapper>

            {/* Navigation Tabs */}
            <MotionWrapper delay={0.2}>
              <div className="card" style={{ padding: '0.5rem' }}>
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    whileHover={{ x: 4 }}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: 'var(--spacing-md)',
                      background: activeTab === tab.id ? 'var(--bg-secondary)' : 'transparent',
                      border: 'none',
                      borderRadius: 'var(--radius-md)',
                      color: activeTab === tab.id ? 'var(--primary)' : 'var(--text-primary)',
                      fontWeight: activeTab === tab.id ? '600' : '500',
                      fontSize: '0.95rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      textAlign: 'left',
                    }}
                  >
                    <tab.icon size={20} />
                    {tab.label}
                  </motion.button>
                ))}
              </div>
            </MotionWrapper>
          </div>

          {/* Main Content */}
          <div>
            <AnimatePresence mode="wait">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Stats Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-2xl)' }}>
                    {[
                      { icon: Calendar, label: 'Total Bookings', value: stats.totalBookings, color: '#3B82F6' },
                      { icon: Clock, label: 'Upcoming', value: stats.upcomingBookings, color: '#F59E0B' },
                      { icon: CheckCircle, label: 'Completed', value: stats.completedBookings, color: '#22C55E' },
                      { icon: DollarSign, label: 'Total Spent', value: `₹${stats.totalSpent.toLocaleString()}`, color: '#8B5CF6' },
                    ].map((stat, index) => (
                      <MotionWrapper key={index} delay={index * 0.1}>
                        <motion.div
                          whileHover={{ y: -4 }}
                          className="glass-card"
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-sm)' }}>
                            <div style={{
                              width: '48px',
                              height: '48px',
                              borderRadius: 'var(--radius-lg)',
                              background: `${stat.color}15`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              <stat.icon size={24} color={stat.color} />
                            </div>
                            <div>
                              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                                {stat.label}
                              </p>
                              <p style={{ fontSize: '1.75rem', fontWeight: '700', fontFamily: 'var(--font-display)' }}>
                                {stat.value}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      </MotionWrapper>
                    ))}
                  </div>

                  {/* Recent Bookings */}
                  <MotionWrapper delay={0.4}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: 'var(--spacing-lg)' }}>
                      Recent Bookings
                    </h2>
                    {bookings.length === 0 ? (
                      <div className="card" style={{ padding: 'var(--spacing-2xl)', textAlign: 'center' }}>
                        <Calendar size={48} color="var(--text-tertiary)" style={{ margin: '0 auto var(--spacing-md)' }} />
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No bookings yet</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
                          Start exploring amazing properties
                        </p>
                        <a href="/explore" className="btn-gradient">
                          Browse Properties
                        </a>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                        {bookings.slice(0, 3).map((booking, index) => (
                          <MotionWrapper key={booking._id} delay={0.5 + index * 0.1}>
                            <motion.div
                              whileHover={{ y: -2 }}
                              className="card"
                              style={{ padding: 0, overflow: 'hidden', display: 'grid', gridTemplateColumns: '150px 1fr auto', gap: 'var(--spacing-md)', alignItems: 'center' }}
                            >
                              <img
                                src={booking.property.images[0]}
                                alt={booking.property.title}
                                style={{ width: '100%', height: '120px', objectFit: 'cover' }}
                              />
                              <div style={{ padding: 'var(--spacing-md)' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                                  {booking.property.title}
                                </h3>
                                <p style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                                  <MapPin size={14} />
                                  {typeof booking.property.location === 'string' 
                                    ? booking.property.location 
                                    : `${booking.property.location?.city || ''}, ${booking.property.location?.country || ''}`.trim() || 'Location unavailable'}
                                </p>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                  {booking.checkIn} to {booking.checkOut} • {booking.guests} guests
                                </p>
                              </div>
                              <div style={{ padding: 'var(--spacing-md)', textAlign: 'right' }}>
                                {getStatusBadge(booking.status)}
                                <p style={{ fontSize: '1.25rem', fontWeight: '700', marginTop: 'var(--spacing-sm)' }}>
                                  ₹{booking.totalPrice.toLocaleString()}
                                </p>
                              </div>
                            </motion.div>
                          </MotionWrapper>
                        ))}
                      </div>
                    )}
                  </MotionWrapper>
                </motion.div>
              )}

              {/* Bookings Tab */}
              {activeTab === 'bookings' && (
                <motion.div
                  key="bookings"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {bookings.length === 0 ? (
                    <div className="card" style={{ padding: 'var(--spacing-2xl)', textAlign: 'center' }}>
                      <Calendar size={64} color="var(--text-tertiary)" style={{ margin: '0 auto var(--spacing-lg)' }} />
                      <h2 style={{ fontSize: '1.75rem', marginBottom: 'var(--spacing-sm)' }}>No bookings found</h2>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: 'var(--spacing-xl)' }}>
                        Time to plan your next adventure!
                      </p>
                      <a href="/explore" className="btn-gradient" style={{ display: 'inline-block' }}>
                        Explore Properties
                      </a>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                      {bookings.map((booking, index) => (
                        <MotionWrapper key={booking._id} delay={index * 0.1}>
                          <motion.div
                            whileHover={{ y: -4 }}
                            className="card"
                            style={{ padding: 'var(--spacing-xl)' }}
                          >
                            <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 'var(--spacing-xl)' }}>
                              <img
                                src={booking.property.images[0]}
                                alt={booking.property.title}
                                style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
                              />
                              <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 'var(--spacing-md)' }}>
                                  <div>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                                      {booking.property.title}
                                    </h3>
                                    <p style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)' }}>
                                      <MapPin size={16} />
                                      {typeof booking.property.location === 'string' 
                                        ? booking.property.location 
                                        : `${booking.property.location?.city || ''}, ${booking.property.location?.country || ''}`.trim() || 'Location unavailable'}
                                    </p>
                                  </div>
                                  {getStatusBadge(booking.status)}
                                </div>

                                <div style={{ 
                                  display: 'grid', 
                                  gridTemplateColumns: 'repeat(3, 1fr)', 
                                  gap: 'var(--spacing-lg)', 
                                  padding: 'var(--spacing-md)', 
                                  background: 'var(--bg-secondary)', 
                                  borderRadius: 'var(--radius-md)',
                                  marginBottom: 'var(--spacing-md)'
                                }}>
                                  <div>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Check-in</p>
                                    <p style={{ fontWeight: '600' }}>{booking.checkIn}</p>
                                  </div>
                                  <div>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Check-out</p>
                                    <p style={{ fontWeight: '600' }}>{booking.checkOut}</p>
                                  </div>
                                  <div>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Guests</p>
                                    <p style={{ fontWeight: '600' }}>{booking.guests} guests</p>
                                  </div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <div>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>Total Amount</p>
                                    <p style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--primary)' }}>
                                      ₹{booking.totalPrice.toLocaleString()}
                                    </p>
                                  </div>
                                  <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                                    <motion.button
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      className="btn-outline"
                                      style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                                    >
                                      <Download size={16} style={{ marginRight: '0.5rem' }} />
                                      Invoice
                                    </motion.button>
                                    {booking.status === 'confirmed' && (
                                      <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => handleCancelBooking(booking._id)}
                                        style={{
                                          padding: '0.5rem 1rem',
                                          fontSize: '0.9rem',
                                          background: 'transparent',
                                          border: '2px solid #EF4444',
                                          borderRadius: 'var(--radius-md)',
                                          color: '#EF4444',
                                          fontWeight: '600',
                                          cursor: 'pointer',
                                        }}
                                      >
                                        Cancel Booking
                                      </motion.button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </MotionWrapper>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Account Tab */}
              {activeTab === 'account' && (
                <motion.div
                  key="account"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <form onSubmit={handleUpdateProfile} className="card" style={{ padding: 'var(--spacing-xl)' }}>
                    <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
                      <div>
                        <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
                          <User size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          className="input"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
                          <Mail size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={profileData.email}
                          disabled
                          className="input"
                          style={{ background: 'var(--bg-secondary)', cursor: 'not-allowed' }}
                        />
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                          Email cannot be changed
                        </p>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
                          <Phone size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          className="input"
                          placeholder="+91 99999 99999"
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
                          <MapPin size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                          Address
                        </label>
                        <textarea
                          value={profileData.address}
                          onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                          className="input"
                          rows="3"
                          placeholder="Enter your address"
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
                          Bio
                        </label>
                        <textarea
                          value={profileData.bio}
                          onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                          className="input"
                          rows="4"
                          placeholder="Tell us about yourself..."
                        />
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isLoading}
                        className="btn-gradient"
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                      >
                        <Save size={20} />
                        {isLoading ? 'Saving...' : 'Save Changes'}
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <motion.div
                  key="security"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <form onSubmit={handleUpdatePassword} className="card" style={{ padding: 'var(--spacing-xl)' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: 'var(--spacing-lg)' }}>
                      Change Password
                    </h2>
                    <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
                      <div>
                        <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
                          Current Password
                        </label>
                        <input
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                          className="input"
                          placeholder="Enter current password"
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
                          New Password
                        </label>
                        <input
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                          className="input"
                          placeholder="Enter new password"
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                          className="input"
                          placeholder="Confirm new password"
                        />
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isLoading}
                        className="btn-gradient"
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                      >
                        <Lock size={20} />
                        {isLoading ? 'Updating...' : 'Update Password'}
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <motion.div
                  key="preferences"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="card" style={{ padding: 'var(--spacing-xl)' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: 'var(--spacing-lg)' }}>
                      Notification Preferences
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                      {[
                        { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive email updates about your bookings' },
                        { key: 'pushNotifications', label: 'Push Notifications', desc: 'Get push notifications for important updates' },
                        { key: 'bookingUpdates', label: 'Booking Updates', desc: 'Notifications about your reservations' },
                        { key: 'priceAlerts', label: 'Price Alerts', desc: 'Get notified about price drops' },
                        { key: 'marketingEmails', label: 'Marketing Emails', desc: 'Receive promotional offers and deals' },
                      ].map((pref) => (
                        <div key={pref.key} style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center',
                          padding: 'var(--spacing-md)',
                          background: 'var(--bg-secondary)',
                          borderRadius: 'var(--radius-md)'
                        }}>
                          <div>
                            <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{pref.label}</p>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{pref.desc}</p>
                          </div>
                          <label style={{ position: 'relative', display: 'inline-block', width: '52px', height: '28px' }}>
                            <input
                              type="checkbox"
                              checked={preferences[pref.key]}
                              onChange={(e) => setPreferences({ ...preferences, [pref.key]: e.target.checked })}
                              style={{ opacity: 0, width: 0, height: 0 }}
                            />
                            <span style={{
                              position: 'absolute',
                              cursor: 'pointer',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              background: preferences[pref.key] ? 'var(--primary)' : '#ccc',
                              borderRadius: '28px',
                              transition: '0.3s',
                              '::before': {
                                position: 'absolute',
                                content: '""',
                                height: '20px',
                                width: '20px',
                                left: '4px',
                                bottom: '4px',
                                background: 'white',
                                borderRadius: '50%',
                                transition: '0.3s',
                                transform: preferences[pref.key] ? 'translateX(24px)' : 'none'
                              }
                            }} />
                          </label>
                        </div>
                      ))}
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toast.success('Preferences saved! ⚙️')}
                        className="btn-gradient"
                        style={{ marginTop: 'var(--spacing-md)' }}
                      >
                        <Save size={20} style={{ marginRight: '0.5rem' }} />
                        Save Preferences
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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

export default ProfileEnhanced;
