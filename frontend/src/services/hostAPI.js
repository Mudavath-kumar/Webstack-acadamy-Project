import axios from 'axios';

// Get base URL from environment or default
const BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Host API Services
export const hostAPI = {
  // ============ Property Management ============
  
  /**
   * Get all properties for the logged-in host
   */
  getMyProperties: async () => {
    const response = await api.get('/properties/host/my-properties');
    return response.data;
  },

  /**
   * Get a single property by ID
   */
  getPropertyById: async (id) => {
    const response = await api.get(`/properties/${id}`);
    return response.data;
  },

  /**
   * Create a new property
   * @param {Object} propertyData - Property details including title, description, location, pricing, etc.
   */
  createProperty: async (propertyData) => {
    const response = await api.post('/properties', propertyData);
    return response.data;
  },

  /**
   * Update an existing property
   * @param {string} id - Property ID
   * @param {Object} propertyData - Updated property details
   */
  updateProperty: async (id, propertyData) => {
    const response = await api.put(`/properties/${id}`, propertyData);
    return response.data;
  },

  /**
   * Delete a property
   * @param {string} id - Property ID
   */
  deleteProperty: async (id) => {
    const response = await api.delete(`/properties/${id}`);
    return response.data;
  },

  /**
   * Toggle property active status
   * @param {string} id - Property ID
   * @param {boolean} isActive - New active status
   */
  updatePropertyStatus: async (id, isActive) => {
    const response = await api.patch(`/properties/${id}/status`, { isActive });
    return response.data;
  },

  // ============ Booking Management ============

  /**
   * Get all bookings for the host's properties
   */
  getHostBookings: async () => {
    const response = await api.get('/bookings/host/my-bookings');
    return response.data;
  },

  /**
   * Get a single booking by ID
   */
  getBookingById: async (id) => {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },

  /**
   * Update booking status (accept/reject/cancel)
   * @param {string} id - Booking ID
   * @param {string} status - New status: 'pending', 'confirmed', 'cancelled', 'completed'
   */
  updateBookingStatus: async (id, status) => {
    const response = await api.patch(`/bookings/${id}/status`, { status });
    return response.data;
  },

  /**
   * Accept a booking request
   * @param {string} id - Booking ID
   */
  acceptBooking: async (id) => {
    return hostAPI.updateBookingStatus(id, 'confirmed');
  },

  /**
   * Reject a booking request
   * @param {string} id - Booking ID
   */
  rejectBooking: async (id) => {
    return hostAPI.updateBookingStatus(id, 'cancelled');
  },

  // ============ Earnings & Analytics ============

  /**
   * Get earnings summary for the host
   */
  getEarnings: async () => {
    const response = await api.get('/payments/host/earnings');
    return response.data;
  },

  /**
   * Get transaction history
   */
  getTransactions: async () => {
    const response = await api.get('/payments/host/transactions');
    return response.data;
  },

  /**
   * Get dashboard statistics
   */
  getDashboardStats: async () => {
    const response = await api.get('/host/dashboard/stats');
    return response.data;
  },

  /**
   * Get monthly revenue breakdown
   */
  getMonthlyRevenue: async () => {
    const response = await api.get('/host/dashboard/revenue');
    return response.data;
  },

  // ============ Image Upload ============

  /**
   * Upload property images
   * @param {FormData} formData - FormData with images
   */
  uploadImages: async (formData) => {
    const response = await api.post('/upload/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  /**
   * Delete an image
   * @param {string} imageUrl - Image URL to delete
   */
  deleteImage: async (imageUrl) => {
    const response = await api.delete('/upload/images', { data: { imageUrl } });
    return response.data;
  },

  // ============ Reviews & Ratings ============

  /**
   * Get reviews for a property
   * @param {string} propertyId - Property ID
   */
  getPropertyReviews: async (propertyId) => {
    const response = await api.get(`/properties/${propertyId}/reviews`);
    return response.data;
  },

  /**
   * Reply to a review
   * @param {string} reviewId - Review ID
   * @param {string} reply - Host's reply text
   */
  replyToReview: async (reviewId, reply) => {
    const response = await api.post(`/reviews/${reviewId}/reply`, { reply });
    return response.data;
  },

  // ============ Host Profile ============

  /**
   * Get host profile
   */
  getHostProfile: async () => {
    const response = await api.get('/host/profile');
    return response.data;
  },

  /**
   * Update host profile
   * @param {Object} profileData - Updated profile data
   */
  updateHostProfile: async (profileData) => {
    const response = await api.put('/host/profile', profileData);
    return response.data;
  },

  // ============ Availability Management ============

  /**
   * Get property availability
   * @param {string} propertyId - Property ID
   */
  getAvailability: async (propertyId) => {
    const response = await api.get(`/properties/${propertyId}/availability`);
    return response.data;
  },

  /**
   * Update property availability
   * @param {string} propertyId - Property ID
   * @param {Object} availabilityData - Availability dates and blocked dates
   */
  updateAvailability: async (propertyId, availabilityData) => {
    const response = await api.put(`/properties/${propertyId}/availability`, availabilityData);
    return response.data;
  },
};

export default hostAPI;
