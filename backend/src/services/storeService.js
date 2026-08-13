import { prisma } from '../config/database.js';

export const getStores = async (query, userContext = null) => {
  const { page, limit, skip } = query.pagination;
  const { name, email, address, sortBy, sortOrder } = query.filters;

  const where = {
    ...(name && { name: { contains: name, mode: 'insensitive' } }),
    ...(email && { email: { contains: email, mode: 'insensitive' } }),
    ...(address && { address: { contains: address, mode: 'insensitive' } }),
    // If owner is querying their own stores, we can add ownerId: userContext.id
  };

  const orderBy = sortBy && sortBy !== 'overallRating' 
    ? { [sortBy]: sortOrder || 'asc' } 
    : { createdAt: 'desc' };

  const [rawStores, total] = await Promise.all([
    prisma.store.findMany({
      where,
      orderBy,
      // If we sort by overallRating, we have to fetch all and sort in memory, or use raw query.
      // We will handle memory sort if overallRating is requested, which means we can't paginate DB-side easily.
      // For simplicity, we apply DB pagination only if not sorting by overallRating.
      ...(sortBy !== 'overallRating' ? { skip, take: limit } : {}),
      include: {
        owner: {
          select: { name: true, email: true }
        }
      }
    }),
    prisma.store.count({ where })
  ]);

  // Fetch averages for these stores
  const storeIds = rawStores.map(s => s.id);
  
  const aggregates = await prisma.rating.groupBy({
    by: ['storeId'],
    _avg: { rating: true },
    where: { storeId: { in: storeIds } }
  });

  const avgMap = aggregates.reduce((acc, curr) => {
    acc[curr.storeId] = curr._avg.rating || 0;
    return acc;
  }, {});

  // Fetch user ratings if userContext is provided
  let userRatingsMap = {};
  if (userContext) {
    const userRatings = await prisma.rating.findMany({
      where: { userId: userContext.id, storeId: { in: storeIds } }
    });
    userRatingsMap = userRatings.reduce((acc, curr) => {
      acc[curr.storeId] = curr.rating;
      return acc;
    }, {});
  }

  let formattedStores = rawStores.map(store => ({
    id: store.id,
    storeName: store.name,
    email: store.email,
    address: store.address,
    owner: store.owner,
    overallRating: avgMap[store.id] || 0,
    ...(userContext ? { userRating: userRatingsMap[store.id] || null } : {})
  }));

  if (sortBy === 'overallRating') {
    formattedStores.sort((a, b) => {
      if (sortOrder === 'desc') return b.overallRating - a.overallRating;
      return a.overallRating - b.overallRating;
    });
    // Apply pagination in memory
    formattedStores = formattedStores.slice(skip, skip + limit);
  }

  return { stores: formattedStores, total };
};

export const getStoreById = async (id, userContext = null) => {
  const store = await prisma.store.findUnique({
    where: { id },
    include: {
      owner: { select: { name: true, email: true } }
    }
  });

  if (!store) throw new Error('Store not found');

  const agg = await prisma.rating.aggregate({
    _avg: { rating: true },
    where: { storeId: id }
  });

  let userRating = null;
  if (userContext) {
    const ur = await prisma.rating.findUnique({
      where: { userId_storeId: { userId: userContext.id, storeId: id } }
    });
    if (ur) userRating = ur.rating;
  }

  return {
    id: store.id,
    storeName: store.name,
    email: store.email,
    address: store.address,
    owner: store.owner,
    overallRating: agg._avg.rating || 0,
    userRating
  };
};

export const createStore = async (data) => {
  const owner = await prisma.user.findUnique({ where: { id: data.ownerId } });
  if (!owner || owner.role !== 'STORE_OWNER') {
    throw new Error('Invalid owner ID or user is not a STORE_OWNER');
  }

  const store = await prisma.store.create({
    data
  });
  return store;
};
