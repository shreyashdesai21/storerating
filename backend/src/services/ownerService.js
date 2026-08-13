import { prisma } from '../config/database.js';

export const getOwnerStores = async (ownerId) => {
  return prisma.store.findMany({
    where: { ownerId }
  });
};

export const getOwnerDashboardStats = async (ownerId) => {
  const stores = await getOwnerStores(ownerId);
  const storeIds = stores.map(s => s.id);

  if (storeIds.length === 0) {
    return { averageRating: 0, totalRatings: 0, recentRatings: [] };
  }

  const agg = await prisma.rating.aggregate({
    _avg: { rating: true },
    _count: { rating: true },
    where: { storeId: { in: storeIds } }
  });

  const recentRatings = await prisma.rating.findMany({
    where: { storeId: { in: storeIds } },
    orderBy: { createdAt: 'desc' },
    take: 5,
    include: {
      user: {
        select: { name: true, email: true }
      },
      store: {
        select: { name: true }
      }
    }
  });

  return {
    averageRating: agg._avg.rating || 0,
    totalRatings: agg._count.rating,
    recentRatings: recentRatings.map(r => ({
      name: r.user.name,
      email: r.user.email,
      storeName: r.store.name,
      rating: r.rating,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt
    }))
  };
};

export const getOwnerRatings = async (ownerId, query) => {
  const stores = await getOwnerStores(ownerId);
  const storeIds = stores.map(s => s.id);

  const { page, limit, skip } = query; // Assuming pagination parsed

  const [ratings, total] = await Promise.all([
    prisma.rating.findMany({
      where: { storeId: { in: storeIds } },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
      include: {
        user: { select: { name: true, email: true } },
        store: { select: { name: true } }
      }
    }),
    prisma.rating.count({ where: { storeId: { in: storeIds } } })
  ]);

  return {
    ratings: ratings.map(r => ({
      name: r.user.name,
      email: r.user.email,
      storeName: r.store.name,
      rating: r.rating,
      createdAt: r.createdAt,
      updatedAt: r.updatedAt
    })),
    total
  };
};
