import express from 'express';
import * as ownerController from '../controllers/ownerController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/roleMiddleware.js';
import { validateRequest } from '../middleware/validationMiddleware.js';
import { updatePasswordSchema } from '../validators/authValidator.js';

const router = express.Router();

router.use(authenticate, requireRole('STORE_OWNER'));

router.get('/dashboard', ownerController.getDashboard);
router.get('/ratings', ownerController.getRatings);
router.put('/password', validateRequest(updatePasswordSchema), ownerController.updatePassword);

export default router;
