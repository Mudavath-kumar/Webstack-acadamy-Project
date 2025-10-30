import axios from 'axios';

// For local dev: use relative path (Vite proxy)
// For production (Vercel): use full backend URL from env
const API_URL = import.meta.env.VITE_API_URL || '/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
  updatePassword: (data) => api.put('/auth/updatepassword', data),
};

export const propertyAPI = {
  getAll: (params) => api.get('/properties', { params }),
  getOne: (id) => api.get(`/properties/${id}`),
  create: (data) => api.post('/properties', data),
  createProperty: (data) => api.post('/properties', data),
  update: (id, data) => api.put(`/properties/${id}`, data),
  updateProperty: (id, data) => api.put(`/properties/${id}`, data),
  delete: (id) => api.delete(`/properties/${id}`),
  deleteProperty: (id) => api.delete(`/properties/${id}`),
  getHostProperties: () => api.get('/properties/host/all'),
};

export const bookingAPI = {
  create: (data) => api.post('/bookings', data),
  createBooking: (data) => api.post('/bookings', data),
  getOne: (id) => api.get(`/bookings/${id}`),
  cancel: (id) => api.put(`/bookings/${id}/cancel`),
  cancelBooking: (id) => api.put(`/bookings/${id}/cancel`),
  getUserBookings: () => api.get('/bookings/user/all'),
  getHostBookings: () => api.get('/bookings/host/all'),
};

export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
};

export const paymentAPI = {
  createOrder: (data) => api.post('/payments/create-order', data),
  processPayment: (data) => api.post('/payments/process', data),
  verifyPayment: (data) => api.post('/payments/verify', data),
  getPaymentDetails: (paymentId) => api.get(`/payments/${paymentId}`),
  getUserPayments: () => api.get('/payments/my-payments'),
  processRefund: (data) => api.post('/payments/refund', data),
};
