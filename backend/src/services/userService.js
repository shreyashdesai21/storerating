import { prisma } from '../config/database.js';
import { hashPassword } from '../utils/password.js';

export const getUsers = async (query) => {
  const { page, limit, skip } = query.pagination;
  const { name, email, address, role, sortBy, sortOrder } = query.filters;

  const where = {
    ...(name && { name: { contains: name, mode: 'insensitive' } }),
    ...(email && { email: { contains: email, mode: 'insensitive' } }),
    ...(address && { address: { contains: address, mode: 'insensitive' } }),
    ...(role && { role }),
  };

  const orderBy = sortBy ? { [sortBy]: sortOrder || 'asc' } : { createdAt: 'desc' };

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      }
    }),
    prisma.user.count({ where })
  ]);

  return { users, total };
};

export const getUserById = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      address: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    }
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

export const createUser = async (data) => {
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
    },
    select: {
      id: true,
      name: true,
      email: true,
      address: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    }
  });

  return user;
};

export const updateUserPasswordWithoutCurrent = async (userId, newPassword) => {
  const hashedPassword = await hashPassword(newPassword);

  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword }
  });

  return true;
};
