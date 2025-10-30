import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, MapPin, DollarSign, Image, Settings, 
  ChevronRight, ChevronLeft, Check, Upload,
  Wifi, Car, Waves, Shield, Coffee, Tv,
  Wind, Zap, Dumbbell, Flame, Users, Bed, Bath
} from 'lucide-react';
import toast from 'react-hot-toast';

const BecomeHost = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    title: '',
    description: '',
    propertyType: 'apartment',
    category: 'city',
    
    // Step 2: Location
    address: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    latitude: '',
    longitude: '',
    
    // Step 3: Capacity
    guests: 1,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,
    
    // Step 4: Amenities
    amenities: [],
    
    // Step 5: Images
    images: [],
    
    // Step 6: Pricing
    basePrice: '',
    cleaningFee: '',
    weeklyDiscount: 0,
    monthlyDiscount: 0,
    
    // Step 7: Rules
    checkIn: '15:00',
    checkOut: '11:00',
    cancellationPolicy: 'flexible',
    instantBook: false,
    minNights: 1,
    maxNights: 365,
  });

  const steps = [
    { number: 1, title: 'Property Info', icon: Home },
    { number: 2, title: 'Location', icon: MapPin },
    { number: 3, title: 'Capacity', icon: Users },
    { number: 4, title: 'Amenities', icon: Settings },
    { number: 5, title: 'Photos', icon: Image },
    { number: 6, title: 'Pricing', icon: DollarSign },
    { number: 7, title: 'House Rules', icon: Check },
  ];

  const propertyTypes = [
    { value: 'house', label: 'House', icon: '🏠' },
    { value: 'apartment', label: 'Apartment', icon: '🏢' },
    { value: 'villa', label: 'Villa', icon: '🏰' },
    { value: 'cabin', label: 'Cabin', icon: '🏕️' },
    { value: 'condo', label: 'Condo', icon: '🏙️' },
    { value: 'hotel', label: 'Hotel', icon: '🏨' },
  ];

  const categories = [
    { value: 'beachfront', label: 'Beachfront', icon: '🏖️' },
    { value: 'cabins', label: 'Cabins', icon: '🛖' },
    { value: 'mountain', label: 'Mountain', icon: '⛰️' },
    { value: 'luxury', label: 'Luxury', icon: '💎' },
    { value: 'ski-in-out', label: 'Ski In/Out', icon: '⛷️' },
    { value: 'city', label: 'City', icon: '🌆' },
    { value: 'countryside', label: 'Countryside', icon: '🌾' },
    { value: 'camping', label: 'Camping', icon: '⛺' },
  ];

  const amenitiesList = [
    { value: 'wifi', label: 'WiFi', icon: Wifi },
    { value: 'kitchen', label: 'Kitchen', icon: Coffee },
    { value: 'parking', label: 'Free Parking', icon: Car },
    { value: 'pool', label: 'Pool', icon: Waves },
    { value: 'hot-tub', label: 'Hot Tub', icon: Waves },
    { value: 'gym', label: 'Gym', icon: Dumbbell },
    { value: 'air-conditioning', label: 'AC', icon: Wind },
    { value: 'heating', label: 'Heating', icon: Flame },
    { value: 'tv', label: 'TV', icon: Tv },
    { value: 'washer', label: 'Washer', icon: Zap },
    { value: 'dryer', label: 'Dryer', icon: Zap },
    { value: 'workspace', label: 'Workspace', icon: Settings },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAmenityToggle = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...imageUrls]
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    try {
      toast.success('Property listed successfully! 🎉');
      setTimeout(() => {
        navigate('/host-dashboard');
      }, 1500);
    } catch (error) {
      toast.error('Failed to create listing. Please try again.');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: 'var(--spacing-sm)' }}>
              Tell us about your place
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-2xl)' }}>
              Share some basic info, like where it is and how many guests can stay.
            </p>

            <div style={{ marginBottom: 'var(--spacing-xl)' }}>
              <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: '600' }}>
                Property Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Cozy Downtown Apartment"
                style={{
                  width: '100%',
                  padding: 'var(--spacing-md)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-color)',
                  fontSize: '1rem',
                }}
              />
            </div>

            <div style={{ marginBottom: 'var(--spacing-xl)' }}>
              <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: '600' }}>
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your property, what makes it special?"
                rows="6"
                style={{
                  width: '100%',
                  padding: 'var(--spacing-md)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-color)',
                  fontSize: '1rem',
                  resize: 'vertical',
                }}
              />
            </div>

            <div style={{ marginBottom: 'var(--spacing-xl)' }}>
              <label style={{ display: 'block', marginBottom: 'var(--spacing-md)', fontWeight: '600' }}>
                Property Type *
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 'var(--spacing-md)' }}>
                {propertyTypes.map(type => (
                  <div
                    key={type.value}
                    onClick={() => setFormData(prev => ({ ...prev, propertyType: type.value }))}
                    style={{
                      padding: 'var(--spacing-lg)',
                      borderRadius: 'var(--radius-lg)',
                      border: `2px solid ${formData.propertyType === type.value ? 'var(--primary)' : 'var(--border-color)'}`,
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.2s',
                      background: formData.propertyType === type.value ? 'rgba(var(--primary-rgb), 0.1)' : 'transparent',
                    }}
                  >
                    <div style={{ fontSize: '2rem', marginBottom: 'var(--spacing-sm)' }}>{type.icon}</div>
                    <div style={{ fontWeight: '600' }}>{type.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 'var(--spacing-xl)' }}>
              <label style={{ display: 'block', marginBottom: 'var(--spacing-md)', fontWeight: '600' }}>
                Category *
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 'var(--spacing-md)' }}>
                {categories.map(cat => (
                  <div
                    key={cat.value}
                    onClick={() => setFormData(prev => ({ ...prev, category: cat.value }))}
                    style={{
                      padding: 'var(--spacing-lg)',
                      borderRadius: 'var(--radius-lg)',
                      border: `2px solid ${formData.category === cat.value ? 'var(--primary)' : 'var(--border-color)'}`,
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.2s',
                      background: formData.category === cat.value ? 'rgba(var(--primary-rgb), 0.1)' : 'transparent',
                    }}
                  >
                    <div style={{ fontSize: '2rem', marginBottom: 'var(--spacing-sm)' }}>{cat.icon}</div>
                    <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{cat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: 'var(--spacing-sm)' }}>
              Where's your place located?
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-2xl)' }}>
              Guests will only get your exact address once they've booked.
            </p>

            <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
              <div>
                <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: '600' }}>
                  Street Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="123 Main Street"
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-md)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-color)',
                    fontSize: '1rem',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: '600' }}>
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="San Francisco"
                    style={{
                      width: '100%',
                      padding: 'var(--spacing-md)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--border-color)',
                      fontSize: '1rem',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: '600' }}>
                    State/Province
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="California"
                    style={{
                      width: '100%',
                      padding: 'var(--spacing-md)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--border-color)',
                      fontSize: '1rem',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: '600' }}>
                    Country *
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="United States"
                    style={{
                      width: '100%',
                      padding: 'var(--spacing-md)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--border-color)',
                      fontSize: '1rem',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: '600' }}>
                    Zip Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="94102"
                    style={{
                      width: '100%',
                      padding: 'var(--spacing-md)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--border-color)',
                      fontSize: '1rem',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: '600' }}>
                    Latitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleInputChange}
                    placeholder="37.7749"
                    style={{
                      width: '100%',
                      padding: 'var(--spacing-md)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--border-color)',
                      fontSize: '1rem',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: '600' }}>
                    Longitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleInputChange}
                    placeholder="-122.4194"
                    style={{
                      width: '100%',
                      padding: 'var(--spacing-md)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--border-color)',
                      fontSize: '1rem',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: 'var(--spacing-sm)' }}>
              Share some basics about your place
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-2xl)' }}>
              You'll add more details later, like bed types.
            </p>

            <div style={{ display: 'grid', gap: 'var(--spacing-2xl)' }}>
              {[
                { name: 'guests', label: 'Guests', icon: Users },
                { name: 'bedrooms', label: 'Bedrooms', icon: Home },
                { name: 'beds', label: 'Beds', icon: Bed },
                { name: 'bathrooms', label: 'Bathrooms', icon: Bath },
              ].map(field => (
                <div key={field.name} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  paddingBottom: 'var(--spacing-lg)',
                  borderBottom: '1px solid var(--border-color)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                    <field.icon size={24} />
                    <span style={{ fontSize: '1.1rem', fontWeight: '600' }}>{field.label}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                    <button
                      onClick={() => setFormData(prev => ({ 
                        ...prev, 
                        [field.name]: Math.max(1, prev[field.name] - 1) 
                      }))}
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-secondary)',
                        cursor: 'pointer',
                        fontSize: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      −
                    </button>
                    <span style={{ fontSize: '1.2rem', fontWeight: '600', minWidth: '40px', textAlign: 'center' }}>
                      {formData[field.name]}
                    </span>
                    <button
                      onClick={() => setFormData(prev => ({ 
                        ...prev, 
                        [field.name]: prev[field.name] + 1 
                      }))}
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-secondary)',
                        cursor: 'pointer',
                        fontSize: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: 'var(--spacing-sm)' }}>
              Tell guests what your place has to offer
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-2xl)' }}>
              You can add more amenities after you publish your listing.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-md)' }}>
              {amenitiesList.map(amenity => {
                const Icon = amenity.icon;
                const isSelected = formData.amenities.includes(amenity.value);
                
                return (
                  <div
                    key={amenity.value}
                    onClick={() => handleAmenityToggle(amenity.value)}
                    style={{
                      padding: 'var(--spacing-lg)',
                      borderRadius: 'var(--radius-lg)',
                      border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--border-color)'}`,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--spacing-md)',
                      transition: 'all 0.2s',
                      background: isSelected ? 'rgba(var(--primary-rgb), 0.1)' : 'transparent',
                    }}
                  >
                    <Icon size={24} />
                    <span style={{ fontWeight: '600' }}>{amenity.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 5:
        return (
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: 'var(--spacing-sm)' }}>
              Add some photos of your place
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-2xl)' }}>
              You'll need at least 5 photos to get started. You can add more or make changes later.
            </p>

            <div style={{ marginBottom: 'var(--spacing-xl)' }}>
              <label
                htmlFor="image-upload"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 'var(--spacing-3xl)',
                  border: '2px dashed var(--border-color)',
                  borderRadius: 'var(--radius-xl)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <Upload size={48} style={{ marginBottom: 'var(--spacing-md)', color: 'var(--text-secondary)' }} />
                <span style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: 'var(--spacing-sm)' }}>
                  Click to upload photos
                </span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  or drag and drop
                </span>
              </label>
              <input
                id="image-upload"
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
            </div>

            {formData.images.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--spacing-md)' }}>
                {formData.images.map((image, index) => (
                  <div key={index} style={{ position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                    <img
                      src={image}
                      alt={`Upload ${index + 1}`}
                      style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                    />
                    <button
                      onClick={() => removeImage(index)}
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        width: '30px',
                        height: '30px',
                        borderRadius: 'var(--radius-full)',
                        background: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1.2rem',
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 6:
        return (
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: 'var(--spacing-sm)' }}>
              Now, set your price
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-2xl)' }}>
              You can change it anytime.
            </p>

            <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
              <div>
                <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: '600' }}>
                  Base Price per Night (₹) *
                </label>
                <input
                  type="number"
                  name="basePrice"
                  value={formData.basePrice}
                  onChange={handleInputChange}
                  placeholder="5000"
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-md)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-color)',
                    fontSize: '1rem',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: '600' }}>
                  Cleaning Fee (₹)
                </label>
                <input
                  type="number"
                  name="cleaningFee"
                  value={formData.cleaningFee}
                  onChange={handleInputChange}
                  placeholder="500"
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-md)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-color)',
                    fontSize: '1rem',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: '600' }}>
                    Weekly Discount (%)
                  </label>
                  <input
                    type="number"
                    name="weeklyDiscount"
                    value={formData.weeklyDiscount}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    placeholder="10"
                    style={{
                      width: '100%',
                      padding: 'var(--spacing-md)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--border-color)',
                      fontSize: '1rem',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: '600' }}>
                    Monthly Discount (%)
                  </label>
                  <input
                    type="number"
                    name="monthlyDiscount"
                    value={formData.monthlyDiscount}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    placeholder="20"
                    style={{
                      width: '100%',
                      padding: 'var(--spacing-md)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--border-color)',
                      fontSize: '1rem',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: 'var(--spacing-sm)' }}>
              Set house rules for guests
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-2xl)' }}>
              Guests must agree to your house rules before they book.
            </p>

            <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: '600' }}>
                    Check-in Time
                  </label>
                  <input
                    type="time"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: 'var(--spacing-md)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--border-color)',
                      fontSize: '1rem',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: '600' }}>
                    Check-out Time
                  </label>
                  <input
                    type="time"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: 'var(--spacing-md)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--border-color)',
                      fontSize: '1rem',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: '600' }}>
                  Cancellation Policy
                </label>
                <select
                  name="cancellationPolicy"
                  value={formData.cancellationPolicy}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: 'var(--spacing-md)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-color)',
                    fontSize: '1rem',
                    background: 'var(--bg-primary)',
                  }}
                >
                  <option value="flexible">Flexible</option>
                  <option value="moderate">Moderate</option>
                  <option value="strict">Strict</option>
                  <option value="super-strict">Super Strict</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-md)' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: '600' }}>
                    Minimum Nights
                  </label>
                  <input
                    type="number"
                    name="minNights"
                    value={formData.minNights}
                    onChange={handleInputChange}
                    min="1"
                    style={{
                      width: '100%',
                      padding: 'var(--spacing-md)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--border-color)',
                      fontSize: '1rem',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: '600' }}>
                    Maximum Nights
                  </label>
                  <input
                    type="number"
                    name="maxNights"
                    value={formData.maxNights}
                    onChange={handleInputChange}
                    min="1"
                    style={{
                      width: '100%',
                      padding: 'var(--spacing-md)',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--border-color)',
                      fontSize: '1rem',
                    }}
                  />
                </div>
              </div>

              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 'var(--spacing-md)',
                padding: 'var(--spacing-lg)',
                background: 'var(--bg-secondary)',
                borderRadius: 'var(--radius-lg)',
              }}>
                <input
                  type="checkbox"
                  name="instantBook"
                  checked={formData.instantBook}
                  onChange={handleInputChange}
                  style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                />
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Enable Instant Book</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    Guests can book instantly without waiting for approval
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Progress Bar */}
      <div style={{ 
        position: 'sticky', 
        top: '80px', 
        background: 'var(--bg-primary)', 
        borderBottom: '1px solid var(--border-color)',
        zIndex: 10,
        padding: 'var(--spacing-lg) 0',
      }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', overflowX: 'auto', padding: 'var(--spacing-sm) 0' }}>
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <React.Fragment key={step.number}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--spacing-sm)',
                      padding: 'var(--spacing-md) var(--spacing-lg)',
                      borderRadius: 'var(--radius-full)',
                      background: isActive ? 'var(--primary)' : isCompleted ? 'rgba(var(--primary-rgb), 0.2)' : 'var(--bg-secondary)',
                      color: isActive ? 'white' : 'var(--text-primary)',
                      minWidth: 'fit-content',
                    }}
                  >
                    {isCompleted ? (
                      <Check size={20} />
                    ) : (
                      <Icon size={20} />
                    )}
                    <span style={{ fontWeight: '600', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div style={{ width: '20px', height: '2px', background: 'var(--border-color)', flexShrink: 0 }} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container" style={{ padding: 'var(--spacing-3xl) var(--spacing-md)' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div style={{ 
          maxWidth: '800px', 
          margin: 'var(--spacing-3xl) auto 0',
          display: 'flex',
          justifyContent: 'space-between',
          gap: 'var(--spacing-md)',
        }}>
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="btn-secondary"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-sm)',
              opacity: currentStep === 1 ? 0.5 : 1,
              cursor: currentStep === 1 ? 'not-allowed' : 'pointer',
            }}
          >
            <ChevronLeft size={20} />
            Back
          </button>

          {currentStep < steps.length ? (
            <button
              onClick={nextStep}
              className="btn-primary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)',
              }}
            >
              Next
              <ChevronRight size={20} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="btn-primary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)',
              }}
            >
              <Check size={20} />
              Publish Listing
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BecomeHost;
