import { z } from 'zod';
import { signupSchema } from './authValidator.js';

// Admin creating a user can specify role
export const createUserSchema = signupSchema.extend({
  role: z.enum(['ADMIN', 'USER', 'STORE_OWNER']).optional()
});

export const userQuerySchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  address: z.string().optional(),
  role: z.enum(['ADMIN', 'USER', 'STORE_OWNER']).optional(),
  sortBy: z.enum(['name', 'email', 'createdAt']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  page: z.string().regex(/^\d+$/).optional(),
  limit: z.string().regex(/^\d+$/).optional()
});
