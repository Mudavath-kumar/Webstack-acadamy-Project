import axios from 'axios';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Check,
    MapPin,
    Upload,
    X,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/HostDashboard.css';

const AMENITIES_LIST = [
  'WiFi',
  'Kitchen',
  'Washer',
  'Dryer',
  'Air Conditioning',
  'Heating',
  'TV',
  'Pool',
  'Hot Tub',
  'Gym',
  'Parking',
  'Elevator',
  'Security Cameras',
  'Fire Extinguisher',
  'First Aid Kit',
  'Smoke Alarm',
  'Carbon Monoxide Alarm',
  'Pet Friendly',
  'Workspace',
  'Beach Access',
];

const PropertyForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    propertyType: 'House',
    location: {
      address: '',
      city: '',
      state: '',
      country: '',
      zipCode: '',
      coordinates: { lat: 0, lng: 0 },
    },
    pricing: {
      basePrice: '',
      cleaningFee: '',
      serviceFee: '',
      currency: 'INR',
    },
    capacity: {
      guests: 1,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1,
    },
    amenities: [],
    images: [],
    rules: '',
    isActive: true,
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      fetchProperty();
    }
  }, [id]);

  const fetchProperty = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const base = import.meta.env.VITE_API_URL || '/api/v1';
      
      const response = await axios.get(`${base}/properties/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const property = response.data?.data || response.data;
      setFormData({
        title: property.title || '',
        description: property.description || '',
        propertyType: property.propertyType || 'House',
        location: property.location || formData.location,
        pricing: property.pricing || formData.pricing,
        capacity: property.capacity || formData.capacity,
        amenities: property.amenities || [],
        images: property.images || [],
        rules: property.rules || '',
        isActive: property.isActive !== false,
      });

      if (property.images?.length) {
        setImagePreviews(property.images.map((img) => img.url || img));
      }
    } catch (error) {
      console.error('Error fetching property:', error);
      toast.error('Failed to load property');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: type === 'number' ? Number(value) : value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
      }));
    }
  };

  const handleAmenityToggle = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter((file) => file.type.startsWith('image/'));

    if (validFiles.length !== fileArray.length) {
      toast.error('Only image files are allowed');
    }

    setImageFiles((prev) => [...prev, ...validFiles]);

    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews((prev) => [...prev, e.target.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const base = import.meta.env.VITE_API_URL || '/api/v1';

      // Verify authentication
      if (!token) {
        toast.error('❌ Please login first');
        navigate('/login');
        return;
      }

      // Verify user is a host
      if (user.role !== 'host') {
        toast.error('❌ Only hosts can create properties. Your role: ' + (user.role || 'unknown'));
        console.log('User object:', user);
        return;
      }

      console.log('✅ Authentication check passed');
      console.log('User role:', user.role);
      console.log('Token exists:', !!token);

      // Upload images if new files exist
      let imageUrls = [...(formData.images || [])];
      if (imageFiles.length > 0) {
        const uploadFormData = new FormData();
        imageFiles.forEach((file) => {
          uploadFormData.append('images', file);
        });

        const uploadResponse = await axios.post(
          `${base}/upload/images`,
          uploadFormData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        imageUrls = [...imageUrls, ...(uploadResponse.data?.data || [])];
      }

      const payload = {
        ...formData,
        images: imageUrls,
      };

      if (isEditMode) {
        await axios.put(`${base}/properties/${id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Property updated successfully');
      } else {
        console.log('Creating property with URL:', `${base}/properties`);
        console.log('Token exists:', !!token);
        console.log('Payload:', payload);
        
        const response = await axios.post(`${base}/properties`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        console.log('Property creation response:', response.data);
        toast.success('Property created successfully');
      }

      navigate('/host/properties');
    } catch (error) {
      console.error('Full error object:', error);
      console.error('Error response:', error.response);
      console.error('Error status:', error.response?.status);
      console.error('Error message:', error.response?.data?.message);
      console.error('Request URL:', error.config?.url);
      toast.error(error.response?.data?.message || error.message || 'Failed to save property');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <button
          onClick={() => navigate('/host/properties')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'none',
            border: 'none',
            color: 'var(--host-text-secondary)',
            cursor: 'pointer',
            marginBottom: '1rem',
            fontSize: '1rem',
            fontWeight: '500'
          }}
        >
          <ArrowLeft size={20} />
          <span>Back to Properties</span>
        </button>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: '800',
          background: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '0.5rem'
        }}>
          {isEditMode ? 'Edit Property ✏️' : 'Add New Property 🏠'}
        </h1>
        <p style={{ 
          color: 'var(--host-text-secondary)', 
          fontSize: '1.05rem',
          fontWeight: '500',
          marginBottom: '2rem'
        }}>
          {isEditMode ? 'Update your property details below' : 'Fill in the details to list your property'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="property-form">
        {/* Basic Info */}
        <div className="form-section">
          <h2 className="section-title">Basic Information</h2>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Property Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Beautiful Beachfront Villa"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Property Type *</label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleInputChange}
                className="form-select"
                required
              >
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Cottage">Cottage</option>
                <option value="Condo">Condo</option>
                <option value="Studio">Studio</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label className="form-label">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="form-textarea"
                rows="5"
                placeholder="Describe your property..."
                required
              />
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="form-section">
          <h2 className="section-title">
            <MapPin size={20} />
            Location
          </h2>
          <div className="form-row">
            <div className="form-group full-width">
              <label className="form-label">Address *</label>
              <input
                type="text"
                name="location.address"
                value={formData.location.address}
                onChange={handleInputChange}
                className="form-input"
                placeholder="123 Main Street"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">City *</label>
              <input
                type="text"
                name="location.city"
                value={formData.location.city}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Mumbai"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">State *</label>
              <input
                type="text"
                name="location.state"
                value={formData.location.state}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Maharashtra"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Country *</label>
              <input
                type="text"
                name="location.country"
                value={formData.location.country}
                onChange={handleInputChange}
                className="form-input"
                placeholder="India"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Zip Code *</label>
              <input
                type="text"
                name="location.zipCode"
                value={formData.location.zipCode}
                onChange={handleInputChange}
                className="form-input"
                placeholder="400001"
                required
              />
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="form-section">
          <h2 className="section-title">Pricing</h2>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Base Price (₹/night) *</label>
              <input
                type="number"
                name="pricing.basePrice"
                value={formData.pricing.basePrice}
                onChange={handleInputChange}
                className="form-input"
                placeholder="5000"
                min="0"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Cleaning Fee (₹)</label>
              <input
                type="number"
                name="pricing.cleaningFee"
                value={formData.pricing.cleaningFee}
                onChange={handleInputChange}
                className="form-input"
                placeholder="500"
                min="0"
              />
            </div>
          </div>
        </div>

        {/* Capacity */}
        <div className="form-section">
          <h2 className="section-title">Capacity</h2>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Guests *</label>
              <input
                type="number"
                name="capacity.guests"
                value={formData.capacity.guests}
                onChange={handleInputChange}
                className="form-input"
                min="1"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Bedrooms *</label>
              <input
                type="number"
                name="capacity.bedrooms"
                value={formData.capacity.bedrooms}
                onChange={handleInputChange}
                className="form-input"
                min="1"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Beds *</label>
              <input
                type="number"
                name="capacity.beds"
                value={formData.capacity.beds}
                onChange={handleInputChange}
                className="form-input"
                min="1"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Bathrooms *</label>
              <input
                type="number"
                name="capacity.bathrooms"
                value={formData.capacity.bathrooms}
                onChange={handleInputChange}
                className="form-input"
                min="1"
                step="0.5"
                required
              />
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="form-section">
          <h2 className="section-title">Amenities</h2>
          <div className="amenities-grid">
            {AMENITIES_LIST.map((amenity) => (
              <label key={amenity} className="amenity-checkbox">
                <input
                  type="checkbox"
                  checked={formData.amenities.includes(amenity)}
                  onChange={() => handleAmenityToggle(amenity)}
                />
                <span className="checkbox-custom">
                  {formData.amenities.includes(amenity) && <Check size={16} />}
                </span>
                <span>{amenity}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Images */}
        <div className="form-section">
          <h2 className="section-title">
            <Upload size={20} />
            Property Images
          </h2>
          <div
            className={`image-upload-zone ${dragActive ? 'drag-active' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload size={40} />
            <p>Drag & drop images here or click to browse</p>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileInput}
              style={{ display: 'none' }}
              id="file-input"
            />
            <label htmlFor="file-input" className="btn-secondary">
              Choose Files
            </label>
          </div>

          {imagePreviews.length > 0 && (
            <div className="image-preview-grid">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="image-preview-item">
                  <img src={preview} alt={`Preview ${index + 1}`} />
                  <button
                    type="button"
                    className="btn-remove-image"
                    onClick={() => removeImage(index)}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* House Rules */}
        <div className="form-section">
          <h2 className="section-title">House Rules</h2>
          <textarea
            name="rules"
            value={formData.rules}
            onChange={handleInputChange}
            className="form-textarea"
            rows="4"
            placeholder="No smoking, No parties, Check-in after 2 PM..."
          />
        </div>

        {/* Status */}
        <div className="form-section">
          <label className="amenity-checkbox">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleInputChange}
            />
            <span className="checkbox-custom">
              {formData.isActive && <Check size={16} />}
            </span>
            <span>Make this property active and visible to guests</span>
          </label>
        </div>

        {/* Submit */}
        <div className="form-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate('/host/properties')}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
          >
            {loading ? 'Saving...' : isEditMode ? 'Update Property' : 'Create Property'}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default PropertyForm;
