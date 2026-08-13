import api from './api.js';

export const getOwnerDashboard = () => api.get('/owner/dashboard');
export const getOwnerRatings = (params) => api.get('/owner/ratings', { params });
export const updateOwnerPassword = (data) => api.put('/owner/password', data);
