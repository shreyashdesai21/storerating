import api from './api.js';

export const updatePassword = (data) => api.put('/users/password', data);
