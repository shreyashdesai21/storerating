import express from 'express';
import * as adminController from '../controllers/adminController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/roleMiddleware.js';
import { validateRequest, validateQuery } from '../middleware/validationMiddleware.js';
import { createUserSchema, userQuerySchema } from '../validators/userValidator.js';
import { createStoreSchema, storeQuerySchema } from '../validators/storeValidator.js';

const router = express.Router();

router.use(authenticate, requireRole('ADMIN'));

router.get('/dashboard', adminController.getDashboard);

router.get('/users', validateQuery(userQuerySchema), adminController.getUsers);
router.post('/users', validateRequest(createUserSchema), adminController.createUser);
router.get('/users/:id', adminController.getUserById);

router.get('/stores', validateQuery(storeQuerySchema), adminController.getStores);
router.post('/stores', validateRequest(createStoreSchema), adminController.createStore);
router.get('/stores/:id', adminController.getStoreById);

export default router;
