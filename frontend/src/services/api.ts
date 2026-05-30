import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth endpoints
export const authService = {
  signup: (data: { name: string; email: string; password: string; phone: string; role: string }) =>
    apiClient.post('/auth/signup', data),
  login: (data: { email: string; password: string }) =>
    apiClient.post('/auth/login', data),
  getCurrentUser: () => apiClient.get('/auth/me'),
};

// Property endpoints
export const propertyService = {
  getAll: (filters?: { propertyType?: string; location?: string; minPrice?: number; maxPrice?: number }) =>
    apiClient.get('/properties', { params: filters }),
  getById: (id: number) => apiClient.get(`/properties/${id}`),
  create: (data: any) => apiClient.post('/properties', data),
  update: (id: number, data: any) => apiClient.put(`/properties/${id}`, data),
  delete: (id: number) => apiClient.delete(`/properties/${id}`),
};

// Booking endpoints
export const bookingService = {
  getAll: (filters?: { status?: string }) => apiClient.get('/bookings', { params: filters }),
  getById: (id: number) => apiClient.get(`/bookings/${id}`),
  create: (data: { propertyId: number; checkIn: string; checkOut: string }) =>
    apiClient.post('/bookings', data),
  cancel: (id: number) => apiClient.put(`/bookings/${id}/cancel`),
};

export default apiClient;
