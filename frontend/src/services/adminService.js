import api from './api.js';

export const getAdminDashboard = () => api.get('/admin/dashboard');
export const getAdminUsers = (params) => api.get('/admin/users', { params });
export const getAdminUserById = (id) => api.get(`/admin/users/${id}`);
export const createAdminUser = (data) => api.post('/admin/users', data);
export const getAdminStores = (params) => api.get('/admin/stores', { params });
export const getAdminStoreById = (id) => api.get(`/admin/stores/${id}`);
export const createAdminStore = (data) => api.post('/admin/stores', data);
