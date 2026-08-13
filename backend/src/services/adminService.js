import { prisma } from '../config/database.js';

export const getDashboardStats = async () => {
  const [totalUsers, totalStores, totalRatings] = await Promise.all([
    prisma.user.count(),
    prisma.store.count(),
    prisma.rating.count()
  ]);

  return { totalUsers, totalStores, totalRatings };
};
