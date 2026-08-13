import express from 'express';
import * as userController from '../controllers/userController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/roleMiddleware.js';
import { validateRequest } from '../middleware/validationMiddleware.js';
import { updatePasswordSchema } from '../validators/authValidator.js';

const router = express.Router();

router.use(authenticate, requireRole('USER'));

router.put('/password', validateRequest(updatePasswordSchema), userController.updatePassword);

export default router;
