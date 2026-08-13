import * as storeService from '../services/storeService.js';
import * as ratingService from '../services/ratingService.js';
import { getPaginationOptions, formatPagination } from '../utils/pagination.js';

export const getStores = async (req, res) => {
  const pagination = getPaginationOptions(req.query);
  const { name, email, address, sortBy, sortOrder } = req.query;

  // req.user might be present if logged in, but /api/stores might be public?
  // Prompt says "Protect all private endpoints." Store listing usually public or requires USER role.
  // We'll pass req.user to fetch userRating.
  const { stores, total } = await storeService.getStores({
    pagination,
    filters: { name, email, address, sortBy, sortOrder }
  }, req.user);

  res.json({
    success: true,
    data: stores,
    pagination: formatPagination(pagination.page, pagination.limit, total)
  });
};

export const getStoreById = async (req, res) => {
  const store = await storeService.getStoreById(req.params.id, req.user);
  res.json({ success: true, data: store });
};

export const upsertRating = async (req, res) => {
  const { rating } = req.body;
  const storeId = req.params.id;
  const userId = req.user.id;

  const savedRating = await ratingService.upsertRating(userId, storeId, rating);
  res.json({ success: true, data: savedRating });
};
