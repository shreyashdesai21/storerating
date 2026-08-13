import { z } from 'zod';

const passwordSchema = z.string()
  .min(8, "Password must be at least 8 characters")
  .max(16, "Password must be at most 16 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character");

export const signupSchema = z.object({
  name: z.string().min(20, "Name must be at least 20 characters").max(60, "Name is too long"),
  email: z.string().email("Invalid email address"),
  address: z.string().max(400, "Address is too long"),
  password: passwordSchema
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: passwordSchema
});

// Used by user/owner to change password without current password in prompt requirements?
// Prompt says: `PUT /api/users/password`, `PUT /api/owner/password` and `POST /api/auth/change-password`
// We'll assume a uniform structure for these or just the new password
export const updatePasswordSchema = z.object({
  newPassword: passwordSchema
});
