import api from './api.js';

export const submitRating = (storeId, rating) =>
  api.post(`/stores/${storeId}/rating`, { rating });

export const updateRating = (storeId, rating) =>
  api.put(`/stores/${storeId}/rating`, { rating });
