import axios from 'axios';
import { Booking, LoginCredentials } from '../types/index';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const bookingApi = {
  getAll: () => api.get<Booking[]>('/bookings'),
  create: (booking: Omit<Booking, '_id'>) => api.post<Booking>('/bookings', booking),
  delete: (id: string) => api.delete(`/bookings/${id}`),
};

export const adminApi = {
  login: (credentials: LoginCredentials) => api.post<{token: string}>('/admin/login', credentials),
};