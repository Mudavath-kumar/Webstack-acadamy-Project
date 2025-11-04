import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import {
    Edit,
    Eye,
    MapPin,
    Plus,
    Search,
    Star,
    Trash2,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const MyProperties = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const base = import.meta.env.VITE_API_URL || '/api/v1';
      
      const response = await axios.get(`${base}/properties/host/my-properties`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProperties(response.data?.data || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
      // Don't show error toast, just use empty array
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const token = localStorage.getItem('token');
      const base = import.meta.env.VITE_API_URL || '/api/v1';
      
      await axios.delete(`${base}/properties/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success('Property deleted successfully');
      fetchProperties();
    } catch (error) {
      console.error('Error deleting property:', error);
      toast.error('Failed to delete property');
    }
  };

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location?.city?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'active' && property.isActive) ||
      (filterStatus === 'inactive' && !property.isActive);

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '2rem' }}>
          My Properties
        </h1>
        <div className="properties-grid">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton-card">
              <div className="skeleton skeleton-image" />
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
            My Properties
          </h1>
          <p style={{ color: 'var(--host-text-secondary)', fontSize: '1.1rem', fontWeight: '500' }}>
            Manage and monitor all your property listings 🏠
          </p>
        </div>
        <motion.button
          className="btn-add-property"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/host/properties/new')}
          style={{ margin: 0 }}
        >
          <Plus size={20} />
          <span>Add New Property</span>
        </motion.button>
      </div>

      {/* Search and Filters */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ flex: '1', minWidth: '250px', position: 'relative' }}>
          <Search
            size={20}
            style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--host-text-secondary)',
            }}
          />
          <input
            type="text"
            placeholder="Search properties..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '3rem', color: 'var(--host-text-primary)', fontSize: '1rem' }}
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="form-select"
          style={{ minWidth: '150px' }}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Properties Grid */}
      {filteredProperties.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            background: 'white',
            borderRadius: '16px',
            padding: '4rem 2rem',
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
            <Plus size={40} color="#667eea" />
          </div>
          <h3 style={{ 
            fontSize: '1.75rem', 
            fontWeight: '800', 
            marginBottom: '0.75rem',
            color: 'var(--host-text-primary)'
          }}>
            No properties yet! 🏠
          </h3>
          <p style={{ 
            color: 'var(--host-text-secondary)', 
            marginBottom: '2rem',
            fontSize: '1.05rem',
            fontWeight: '500'
          }}>
            Start by adding your first property to begin earning
          </p>
          <button
            className="btn-primary"
            onClick={() => navigate('/host/properties/new')}
          >
            <Plus size={20} />
            <span>Add Your First Property</span>
          </button>
        </motion.div>
      ) : (
        <div className="properties-grid">
          <AnimatePresence>
            {filteredProperties.map((property, index) => (
              <motion.div
                key={property._id}
                className="property-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div style={{ position: 'relative' }}>
                  <img
                    src={property.images?.[0]?.url || property.images?.[0] || 'https://via.placeholder.com/400x300'}
                    alt={property.title}
                    className="property-card-image"
                    style={{ width: '100%', height: '220px', objectFit: 'cover' }}
                  />
                  <div
                    className={`property-card-badge ${
                      property.isActive ? 'badge-active' : 'badge-inactive'
                    }`}
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                    }}
                  >
                    {property.isActive ? 'Active' : 'Inactive'}
                  </div>
                </div>

                <div className="property-card-content">
                  <h3 className="property-card-title">{property.title}</h3>
                  
                  <div className="property-card-location">
                    <MapPin size={16} />
                    <span>
                      {property.location?.city}, {property.location?.country}
                    </span>
                  </div>

                  <div className="property-card-stats">
                    <div className="stat-item-card">
                      <span className="value">
                        ₹{property.pricing?.basePrice?.toLocaleString() || 0}
                      </span>
                      <span className="label">per night</span>
                    </div>
                    <div className="stat-item-card">
                      <span className="value" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Star size={16} fill="#FFD700" color="#FFD700" />
                        {property.rating?.average || 0}
                      </span>
                      <span className="label">
                        {property.rating?.count || 0} reviews
                      </span>
                    </div>
                  </div>

                  <div className="property-card-actions">
                    <motion.button
                      className="btn-icon btn-view"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate(`/listing/${property._id}`)}
                    >
                      <Eye size={18} />
                      <span>View</span>
                    </motion.button>
                    <motion.button
                      className="btn-icon btn-edit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate(`/host/properties/edit/${property._id}`)}
                    >
                      <Edit size={18} />
                      <span>Edit</span>
                    </motion.button>
                    <motion.button
                      className="btn-icon btn-delete"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(property._id, property.title)}
                    >
                      <Trash2 size={18} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
};

export default MyProperties;
