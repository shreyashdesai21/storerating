import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed process...');

  // Clean existing data in order of foreign key dependencies
  await prisma.rating.deleteMany();
  await prisma.store.deleteMany();
  await prisma.user.deleteMany();

  console.log('Cleared existing database records.');

  // Common password hash for test accounts
  const passwordHash = await bcrypt.hash('Password123!', 10);

  // 1. Create System Administrator
  const admin = await prisma.user.create({
    data: {
      name: 'System Administrator',
      email: 'admin@storerating.com',
      password: passwordHash,
      address: '100 HQ Blvd, Suite 1000, New York, NY 10001',
      role: Role.ADMIN,
    },
  });
  console.log(`Created Admin: ${admin.email}`);

  // 2. Create Store Owners
  const owner1 = await prisma.user.create({
    data: {
      name: 'John Store Owner',
      email: 'owner1@storerating.com',
      password: passwordHash,
      address: '12 Retail Ave, San Francisco, CA 94102',
      role: Role.STORE_OWNER,
    },
  });

  const owner2 = await prisma.user.create({
    data: {
      name: 'Sarah Shopkeeper',
      email: 'owner2@storerating.com',
      password: passwordHash,
      address: '45 Business Park, Austin, TX 78701',
      role: Role.STORE_OWNER,
    },
  });
  console.log(`Created Store Owners: ${owner1.email}, ${owner2.email}`);

  // 3. Create Normal Users
  const user1 = await prisma.user.create({
    data: {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      password: passwordHash,
      address: '742 Evergreen Terrace, Springfield, OR 97477',
      role: Role.USER,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Bob Smith',
      email: 'bob@example.com',
      password: passwordHash,
      address: '123 Maple Street, Seattle, WA 98101',
      role: Role.USER,
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: 'Charlie Brown',
      email: 'charlie@example.com',
      password: passwordHash,
      address: '456 Oak Lane, Denver, CO 80202',
      role: Role.USER,
    },
  });
  console.log(`Created Users: ${user1.email}, ${user2.email}, ${user3.email}`);

  // 4. Create Stores
  const store1 = await prisma.store.create({
    data: {
      name: 'Tech Haven',
      email: 'contact@techhaven.com',
      address: '500 Innovation Way, San Jose, CA 95110',
      ownerId: owner1.id,
    },
  });

  const store2 = await prisma.store.create({
    data: {
      name: 'Fresh Organic Market',
      email: 'hello@freshorganic.com',
      address: '88 Green Valley Rd, Portland, OR 97201',
      ownerId: owner1.id,
    },
  });

  const store3 = await prisma.store.create({
    data: {
      name: 'Urban Coffee Roasters',
      email: 'info@urbancoffee.com',
      address: '12 Main Street, Austin, TX 78702',
      ownerId: owner2.id,
    },
  });
  console.log(`Created Stores: ${store1.name}, ${store2.name}, ${store3.name}`);

  // 5. Create Ratings
  const ratingsData = [
    // Ratings for Tech Haven (store1)
    { userId: user1.id, storeId: store1.id, rating: 5 },
    { userId: user2.id, storeId: store1.id, rating: 4 },
    { userId: user3.id, storeId: store1.id, rating: 5 },

    // Ratings for Fresh Organic Market (store2)
    { userId: user1.id, storeId: store2.id, rating: 4 },
    { userId: user3.id, storeId: store2.id, rating: 2 },

    // Ratings for Urban Coffee Roasters (store3)
    { userId: user1.id, storeId: store3.id, rating: 5 },
    { userId: user2.id, storeId: store3.id, rating: 3 },
    { userId: user3.id, storeId: store3.id, rating: 4 },
  ];

  for (const rating of ratingsData) {
    await prisma.rating.create({
      data: rating,
    });
  }

  console.log(`Successfully seeded ${ratingsData.length} ratings.`);
  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
