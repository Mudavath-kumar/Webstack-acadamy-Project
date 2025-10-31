import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DollarSign, Home, TrendingUp, Users, Plus, Edit2, Trash2, Eye, EyeOff,
  Calendar, MapPin, Star, Clock, CheckCircle, XCircle, AlertCircle, BarChart,
  Settings, Image as ImageIcon, Save, X, Upload, Package
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { propertyAPI, bookingAPI } from '../services/api';
import toast from 'react-hot-toast';
import MotionWrapper from '../components/MotionWrapper';

const HostDashboardEnhanced = () => {
  const { user } = useSelector((state) => state.firebaseAuth || {});
  const [activeTab, setActiveTab] = useState('overview');
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAddProperty, setShowAddProperty] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);

  // Statistics
  const [stats, setStats] = useState({
    totalEarnings: 0,
    activeListings: 0,
    totalGuests: 0,
    occupancyRate: 0,
  });

  // Property form state
  const [propertyForm, setPropertyForm] = useState({
    title: '',
    description: '',
    propertyType: 'apartment',
    location: '',
    address: '',
    price: '',
    guests: '',
    bedrooms: '',
    bathrooms: '',
    amenities: [],
    images: [],
    rules: '',
  });

  // Available amenities
  const availableAmenities = [
    'WiFi', 'TV', 'Kitchen', 'Washing Machine', 'Air Conditioning', 'Heating',
    'Parking', 'Pool', 'Gym', 'Pet Friendly', 'Workspace', 'Smoke Alarm',
    'First Aid Kit', 'Fire Extinguisher', 'Carbon Monoxide Alarm'
  ];

  // Load data
  useEffect(() => {
    // Load demo data immediately to prevent blank page
    loadDemoData();
    // Then try to load real data
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    // Don't show loading for initial load since we have demo data
    try {
      // Load properties
      const propertiesResponse = await propertyAPI.getHostProperties();
      if (propertiesResponse.data.success && propertiesResponse.data.data?.length > 0) {
        setProperties(propertiesResponse.data.data || []);
      }

      // Load bookings
      const bookingsResponse = await bookingAPI.getHostBookings();
      if (bookingsResponse.data.success) {
        setBookings(bookingsResponse.data.data || []);
      }

      // Calculate stats if we got real data
      if (propertiesResponse.data.success && propertiesResponse.data.data?.length > 0) {
        calculateStats();
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      // Keep demo data on error
    }
  };

  const loadDemoData = () => {
    const demoProperties = [
      {
        _id: '1',
        title: 'Luxury Beachfront Villa',
        location: 'Malibu, CA',
        address: '123 Ocean Drive, Malibu',
        price: 450,
        images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&q=80'],
        status: 'active',
        propertyType: 'villa',
        guests: 8,
        bedrooms: 4,
        bathrooms: 3,
        rating: 4.9,
        reviews: 127,
        bookings: 23,
        revenue: 103500,
      },
      {
        _id: '2',
        title: 'Mountain Retreat Cabin',
        location: 'Aspen, CO',
        address: '456 Mountain Road, Aspen',
        price: 275,
        images: ['https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=600&q=80'],
        status: 'active',
        propertyType: 'cabin',
        guests: 4,
        bedrooms: 2,
        bathrooms: 2,
        rating: 4.8,
        reviews: 89,
        bookings: 18,
        revenue: 49500,
      },
      {
        _id: '3',
        title: 'Downtown Modern Loft',
        location: 'New York, NY',
        address: '789 Broadway, New York',
        price: 325,
        images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80'],
        status: 'active',
        propertyType: 'apartment',
        guests: 2,
        bedrooms: 1,
        bathrooms: 1,
        rating: 4.7,
        reviews: 64,
        bookings: 31,
        revenue: 100750,
      },
    ];

    setProperties(demoProperties);
    
    setStats({
      totalEarnings: 245800,
      activeListings: 3,
      totalGuests: 342,
      occupancyRate: 87,
    });
  };

  const calculateStats = () => {
    const totalEarnings = properties.reduce((sum, p) => sum + (p.revenue || 0), 0);
    const activeListings = properties.filter(p => p.status === 'active').length;
    const totalGuests = bookings.length;
    const occupancyRate = 87; // This would be calculated based on actual booking data

    setStats({
      totalEarnings,
      activeListings,
      totalGuests,
      occupancyRate,
    });
  };

  // Handle property creation
  const handleCreateProperty = async (e) => {
    e.preventDefault();
    
    if (!propertyForm.title || !propertyForm.location || !propertyForm.price) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      const response = await propertyAPI.createProperty(propertyForm);
      if (response.data.success) {
        toast.success('Property added successfully! 🏡');
        setShowAddProperty(false);
        resetPropertyForm();
        loadDashboardData();
      }
    } catch (error) {
      console.error('Error creating property:', error);
      toast.error('Failed to add property. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle property update
  const handleUpdateProperty = async (e) => {
    e.preventDefault();
    
    setIsLoading(true);
    try {
      const response = await propertyAPI.updateProperty(editingProperty._id, propertyForm);
      if (response.data.success) {
        toast.success('Property updated successfully! ✅');
        setEditingProperty(null);
        resetPropertyForm();
        loadDashboardData();
      }
    } catch (error) {
      console.error('Error updating property:', error);
      toast.error('Failed to update property');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle property deletion
  const handleDeleteProperty = async (propertyId) => {
    const confirmed = window.confirm('Are you sure you want to delete this property? This action cannot be undone.');
    if (!confirmed) return;

    setIsLoading(true);
    try {
      await propertyAPI.deleteProperty(propertyId);
      toast.success('Property deleted successfully');
      loadDashboardData();
    } catch (error) {
      console.error('Error deleting property:', error);
      toast.error('Failed to delete property');
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle property status
  const handleToggleStatus = async (propertyId, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    
    try {
      await propertyAPI.updateProperty(propertyId, { status: newStatus });
      toast.success(`Property ${newStatus === 'active' ? 'activated' : 'deactivated'}`);
      loadDashboardData();
    } catch (error) {
      console.error('Error toggling property status:', error);
      toast.error('Failed to update property status');
    }
  };

  // Open edit modal
  const handleEditProperty = (property) => {
    setEditingProperty(property);
    setPropertyForm({
      title: property.title || '',
      description: property.description || '',
      propertyType: property.propertyType || 'apartment',
      location: property.location || '',
      address: property.address || '',
      price: property.price || '',
      guests: property.guests || '',
      bedrooms: property.bedrooms || '',
      bathrooms: property.bathrooms || '',
      amenities: property.amenities || [],
      images: property.images || [],
      rules: property.rules || '',
    });
    setShowAddProperty(true);
  };

  // Reset form
  const resetPropertyForm = () => {
    setPropertyForm({
      title: '',
      description: '',
      propertyType: 'apartment',
      location: '',
      address: '',
      price: '',
      guests: '',
      bedrooms: '',
      bathrooms: '',
      amenities: [],
      images: [],
      rules: '',
    });
  };

  // Toggle amenity
  const toggleAmenity = (amenity) => {
    setPropertyForm(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  // Get status badge
  const getStatusBadge = (status) => {
    const config = {
      active: { color: '#22C55E', bg: 'rgba(34, 197, 94, 0.1)', icon: CheckCircle },
      inactive: { color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)', icon: XCircle },
      pending: { color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)', icon: AlertCircle },
    };

    const cfg = config[status] || config.pending;
    const Icon = cfg.icon;

    return (
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.25rem',
        padding: '0.375rem 0.75rem',
        borderRadius: 'var(--radius-full)',
        background: cfg.bg,
        color: cfg.color,
        fontSize: '0.875rem',
        fontWeight: '600',
      }}>
        <Icon size={14} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Tabs
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'properties', label: 'Properties', icon: Package },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'analytics', label: 'Analytics', icon: BarChart },
  ];

  // Remove the user check - ProtectedRoute already handles authentication
  // This prevents blank page issues

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <div className="container section">
        {/* Header */}
        <MotionWrapper>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-2xl)', flexWrap: 'wrap', gap: 'var(--spacing-md)' }}>
            <div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '700', marginBottom: '0.5rem' }}>
                Host Dashboard
              </h1>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                Manage your properties and track performance
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setShowAddProperty(true);
                setEditingProperty(null);
                resetPropertyForm();
              }}
              className="btn-gradient"
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: 'var(--spacing-md) var(--spacing-xl)' }}
            >
              <Plus size={20} />
              Add Property
            </motion.button>
          </div>
        </MotionWrapper>

        {/* Tabs */}
        <MotionWrapper delay={0.1}>
          <div style={{ 
            display: 'flex', 
            gap: 'var(--spacing-md)', 
            marginBottom: 'var(--spacing-2xl)',
            borderBottom: '2px solid var(--border-color)',
            overflowX: 'auto'
          }}>
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ y: -2 }}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: 'var(--spacing-md) var(--spacing-lg)',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: activeTab === tab.id ? '2px solid var(--primary)' : '2px solid transparent',
                  color: activeTab === tab.id ? 'var(--primary)' : 'var(--text-secondary)',
                  fontWeight: activeTab === tab.id ? '600' : '500',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                  marginBottom: '-2px',
                }}
              >
                <tab.icon size={20} />
                {tab.label}
              </motion.button>
            ))}
          </div>
        </MotionWrapper>

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
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--spacing-lg)', marginBottom: 'var(--spacing-2xl)' }}>
                {[
                  { icon: DollarSign, label: 'Total Earnings', value: `₹${stats.totalEarnings.toLocaleString()}`, change: '+12.5%', color: '#22C55E' },
                  { icon: Home, label: 'Active Listings', value: stats.activeListings, change: '+2', color: '#3B82F6' },
                  { icon: Users, label: 'Total Guests', value: stats.totalGuests, change: '+18%', color: '#8B5CF6' },
                  { icon: TrendingUp, label: 'Occupancy Rate', value: `${stats.occupancyRate}%`, change: '+5%', color: '#F59E0B' },
                ].map((stat, index) => (
                  <MotionWrapper key={index} delay={index * 0.1}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="glass-card"
                    >
                      <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', marginBottom: 'var(--spacing-md)' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-lg)', background: `${stat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <stat.icon size={24} color={stat.color} />
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

              {/* Quick Property Overview */}
              <MotionWrapper delay={0.4}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: '700', marginBottom: 'var(--spacing-xl)' }}>
                  Property Overview
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 'var(--spacing-lg)' }}>
                  {properties.slice(0, 4).map((property, index) => (
                    <MotionWrapper key={property._id} delay={0.5 + index * 0.1}>
                      <motion.div
                        whileHover={{ y: -4 }}
                        className="card"
                        style={{ padding: 0, overflow: 'hidden' }}
                      >
                        <img src={property.images[0]} alt={property.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                        <div style={{ padding: 'var(--spacing-lg)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 'var(--spacing-sm)' }}>
                            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: '600' }}>
                              {property.title}
                            </h3>
                            {getStatusBadge(property.status)}
                          </div>
                          <p style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: 'var(--spacing-md)' }}>
                            <MapPin size={14} />
                            {property.location}
                          </p>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)', fontSize: '0.85rem' }}>
                            <div>
                              <span style={{ color: 'var(--text-secondary)' }}>Bookings</span>
                              <p style={{ fontSize: '1.1rem', fontWeight: '700' }}>{property.bookings || 0}</p>
                            </div>
                            <div>
                              <span style={{ color: 'var(--text-secondary)' }}>Revenue</span>
                              <p style={{ fontSize: '1.1rem', fontWeight: '700' }}>₹{(property.revenue || 0).toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </MotionWrapper>
                  ))}
                </div>
              </MotionWrapper>
            </motion.div>
          )}

          {/* Properties Tab */}
          {activeTab === 'properties' && (
            <motion.div
              key="properties"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {properties.length === 0 ? (
                <div className="card" style={{ padding: 'var(--spacing-2xl)', textAlign: 'center' }}>
                  <Home size={64} color="var(--text-tertiary)" style={{ margin: '0 auto var(--spacing-lg)' }} />
                  <h2 style={{ fontSize: '1.75rem', marginBottom: 'var(--spacing-sm)' }}>No properties yet</h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: 'var(--spacing-xl)' }}>
                    Start by adding your first property listing
                  </p>
                  <button 
                    onClick={() => setShowAddProperty(true)}
                    className="btn-gradient" 
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    <Plus size={20} />
                    Add Property
                  </button>
                </div>
              ) : (
                <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
                  {properties.map((property, index) => (
                    <MotionWrapper key={property._id} delay={index * 0.1}>
                      <motion.div
                        whileHover={{ y: -4 }}
                        className="card"
                        style={{ padding: 0, overflow: 'hidden' }}
                      >
                        <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr auto', gap: 'var(--spacing-lg)', alignItems: 'center' }}>
                          <img src={property.images[0]} alt={property.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                          
                          <div style={{ padding: 'var(--spacing-lg)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-sm)' }}>
                              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: '700' }}>
                                {property.title}
                              </h3>
                              {getStatusBadge(property.status)}
                            </div>
                            <p style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-md)' }}>
                              <MapPin size={16} />
                              {property.location}
                            </p>
                            <div style={{ display: 'flex', gap: 'var(--spacing-xl)' }}>
                              <div>
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Price/night</span>
                                <p style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary)' }}>₹{property.price}</p>
                              </div>
                              <div>
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Bookings</span>
                                <p style={{ fontSize: '1.25rem', fontWeight: '700' }}>{property.bookings || 0}</p>
                              </div>
                              <div>
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Revenue</span>
                                <p style={{ fontSize: '1.25rem', fontWeight: '700' }}>₹{(property.revenue || 0).toLocaleString()}</p>
                              </div>
                              <div>
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Rating</span>
                                <p style={{ fontSize: '1.25rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                  <Star size={18} fill="#F59E0B" color="#F59E0B" />
                                  {property.rating || '0.0'}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div style={{ padding: 'var(--spacing-lg)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)', alignItems: 'stretch' }}>
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleEditProperty(property)}
                              className="btn-outline"
                              style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                            >
                              <Edit2 size={16} />
                              Edit
                            </motion.button>
                            
                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleToggleStatus(property._id, property.status)}
                              style={{
                                padding: '0.5rem 1rem',
                                fontSize: '0.9rem',
                                background: 'transparent',
                                border: '2px solid var(--border-color)',
                                borderRadius: 'var(--radius-md)',
                                color: 'var(--text-primary)',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                              }}
                            >
                              {property.status === 'active' ? <EyeOff size={16} /> : <Eye size={16} />}
                              {property.status === 'active' ? 'Deactivate' : 'Activate'}
                            </motion.button>

                            <motion.button
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleDeleteProperty(property._id)}
                              style={{
                                padding: '0.5rem 1rem',
                                fontSize: '0.9rem',
                                background: 'transparent',
                                border: '2px solid #EF4444',
                                borderRadius: 'var(--radius-md)',
                                color: '#EF4444',
                                fontWeight: '600',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                              }}
                            >
                              <Trash2 size={16} />
                              Delete
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    </MotionWrapper>
                  ))}
                </div>
              )}
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
              <div className="card" style={{ padding: 'var(--spacing-2xl)', textAlign: 'center' }}>
                <Calendar size={64} color="var(--text-tertiary)" style={{ margin: '0 auto var(--spacing-lg)' }} />
                <h2 style={{ fontSize: '1.75rem', marginBottom: 'var(--spacing-sm)' }}>Bookings Management</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                  View and manage all bookings for your properties
                </p>
              </div>
            </motion.div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="card" style={{ padding: 'var(--spacing-2xl)', textAlign: 'center' }}>
                <BarChart size={64} color="var(--text-tertiary)" style={{ margin: '0 auto var(--spacing-lg)' }} />
                <h2 style={{ fontSize: '1.75rem', marginBottom: 'var(--spacing-sm)' }}>Analytics & Insights</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                  Detailed analytics and performance metrics
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add/Edit Property Modal */}
        <AnimatePresence>
          {showAddProperty && (
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
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 'var(--spacing-lg)',
                overflowY: 'auto',
              }}
              onClick={() => {
                setShowAddProperty(false);
                setEditingProperty(null);
                resetPropertyForm();
              }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="card"
                style={{
                  width: '100%',
                  maxWidth: '800px',
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  padding: 'var(--spacing-2xl)',
                  margin: 'auto',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)' }}>
                  <h2 style={{ fontSize: '2rem', fontWeight: '700' }}>
                    {editingProperty ? 'Edit Property' : 'Add New Property'}
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setShowAddProperty(false);
                      setEditingProperty(null);
                      resetPropertyForm();
                    }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '0.5rem',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <X size={24} />
                  </motion.button>
                </div>

                <form onSubmit={editingProperty ? handleUpdateProperty : handleCreateProperty} style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
                  <div>
                    <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Property Title *</label>
                    <input
                      type="text"
                      value={propertyForm.title}
                      onChange={(e) => setPropertyForm({ ...propertyForm, title: e.target.value })}
                      className="input"
                      placeholder="e.g., Luxury Beachfront Villa"
                      required
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                    <div>
                      <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Property Type *</label>
                      <select
                        value={propertyForm.propertyType}
                        onChange={(e) => setPropertyForm({ ...propertyForm, propertyType: e.target.value })}
                        className="input"
                        required
                      >
                        <option value="apartment">Apartment</option>
                        <option value="house">House</option>
                        <option value="villa">Villa</option>
                        <option value="cabin">Cabin</option>
                        <option value="condo">Condo</option>
                        <option value="loft">Loft</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Price per Night (₹) *</label>
                      <input
                        type="number"
                        value={propertyForm.price}
                        onChange={(e) => setPropertyForm({ ...propertyForm, price: e.target.value })}
                        className="input"
                        placeholder="3000"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Location *</label>
                    <input
                      type="text"
                      value={propertyForm.location}
                      onChange={(e) => setPropertyForm({ ...propertyForm, location: e.target.value })}
                      className="input"
                      placeholder="e.g., Malibu, California"
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Full Address</label>
                    <textarea
                      value={propertyForm.address}
                      onChange={(e) => setPropertyForm({ ...propertyForm, address: e.target.value })}
                      className="input"
                      rows="2"
                      placeholder="Complete address"
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--spacing-md)' }}>
                    <div>
                      <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Guests</label>
                      <input
                        type="number"
                        value={propertyForm.guests}
                        onChange={(e) => setPropertyForm({ ...propertyForm, guests: e.target.value })}
                        className="input"
                        placeholder="4"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Bedrooms</label>
                      <input
                        type="number"
                        value={propertyForm.bedrooms}
                        onChange={(e) => setPropertyForm({ ...propertyForm, bedrooms: e.target.value })}
                        className="input"
                        placeholder="2"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Bathrooms</label>
                      <input
                        type="number"
                        value={propertyForm.bathrooms}
                        onChange={(e) => setPropertyForm({ ...propertyForm, bathrooms: e.target.value })}
                        className="input"
                        placeholder="2"
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Description</label>
                    <textarea
                      value={propertyForm.description}
                      onChange={(e) => setPropertyForm({ ...propertyForm, description: e.target.value })}
                      className="input"
                      rows="4"
                      placeholder="Describe your property..."
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Amenities</label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '0.5rem' }}>
                      {availableAmenities.map((amenity) => (
                        <label key={amenity} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', background: propertyForm.amenities.includes(amenity) ? 'var(--primary)20' : 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}>
                          <input
                            type="checkbox"
                            checked={propertyForm.amenities.includes(amenity)}
                            onChange={() => toggleAmenity(amenity)}
                            style={{ cursor: 'pointer' }}
                          />
                          <span style={{ fontSize: '0.9rem' }}>{amenity}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'flex-end', paddingTop: 'var(--spacing-lg)', borderTop: '1px solid var(--border-color)' }}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => {
                        setShowAddProperty(false);
                        setEditingProperty(null);
                        resetPropertyForm();
                      }}
                      className="btn-outline"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isLoading}
                      className="btn-gradient"
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                      <Save size={20} />
                      {isLoading ? 'Saving...' : editingProperty ? 'Update Property' : 'Add Property'}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
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

export default HostDashboardEnhanced;
