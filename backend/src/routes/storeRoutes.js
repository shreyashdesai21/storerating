import express from 'express';
import * as storeController from '../controllers/storeController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/roleMiddleware.js';
import { validateRequest, validateQuery } from '../middleware/validationMiddleware.js';
import { ratingSchema } from '../validators/ratingValidator.js';
import { storeQuerySchema } from '../validators/storeValidator.js';

const router = express.Router();

// Allow public access or just logged in users?
// Prompt: "Normal User APIs: GET /api/stores, GET /api/stores/:id, POST /api/stores/:id/rating, PUT /api/stores/:id/rating"
// We'll apply authenticate so we can fetch userRating, but we can make it optional if we write a custom middleware.
// Given "Normal User APIs", let's assume `authenticate` is required for all.

router.use(authenticate);

router.get('/', validateQuery(storeQuerySchema), storeController.getStores);
router.get('/:id', storeController.getStoreById);

router.post('/:id/rating', requireRole('USER'), validateRequest(ratingSchema), storeController.upsertRating);
router.put('/:id/rating', requireRole('USER'), validateRequest(ratingSchema), storeController.upsertRating);

export default router;
