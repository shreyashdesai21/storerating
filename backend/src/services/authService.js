import { prisma } from '../config/database.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { generateToken } from '../utils/jwt.js';

export const signup = async (data) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email }
  });

  if (existingUser) {
    throw new Error('Email already in use');
  }

  const hashedPassword = await hashPassword(data.password);
  
  const user = await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    }
  });

  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const login = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isPasswordValid = await comparePassword(password, user.password);
  
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  const token = generateToken({
    id: user.id,
    email: user.email,
    role: user.role
  });

  const { password: _, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, token };
};

export const changePassword = async (userId, currentPassword, newPassword) => {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await comparePassword(currentPassword, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid current password');
  }

  const hashedPassword = await hashPassword(newPassword);

  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword }
  });

  return true;
};
