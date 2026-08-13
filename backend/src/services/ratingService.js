import { prisma } from '../config/database.js';

export const upsertRating = async (userId, storeId, ratingValue) => {
  // Verify store exists
  const store = await prisma.store.findUnique({ where: { id: storeId } });
  if (!store) {
    throw new Error('Store not found');
  }

  const rating = await prisma.rating.upsert({
    where: {
      userId_storeId: {
        userId,
        storeId
      }
    },
    update: {
      rating: ratingValue
    },
    create: {
      userId,
      storeId,
      rating: ratingValue
    }
  });

  return rating;
};
