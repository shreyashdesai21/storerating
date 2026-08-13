import { z } from 'zod';

export const createStoreSchema = z.object({
  name: z.string().min(2, "Store name is too short"),
  email: z.string().email("Invalid store email"),
  address: z.string().min(5, "Address is too short"),
  ownerId: z.string().uuid("Invalid owner ID")
});

export const storeQuerySchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  address: z.string().optional(),
  sortBy: z.enum(['name', 'email', 'createdAt', 'overallRating']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  page: z.string().regex(/^\d+$/).optional(),
  limit: z.string().regex(/^\d+$/).optional()
});
