import express from 'express';
import * as authController from '../controllers/authController.js';
import { validateRequest } from '../middleware/validationMiddleware.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { signupSchema, loginSchema, changePasswordSchema } from '../validators/authValidator.js';

const router = express.Router();

router.post('/signup', validateRequest(signupSchema), authController.signup);
router.post('/login', validateRequest(loginSchema), authController.login);
router.post('/change-password', authenticate, validateRequest(changePasswordSchema), authController.changePassword);
router.get('/me', authenticate, authController.getMe);

export default router;
