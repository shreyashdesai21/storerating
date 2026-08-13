import app from './app.js';
import { env } from './config/env.js';
import { prisma } from './config/database.js';

const startServer = async () => {
  try {
    await prisma.$connect();
    console.log('✅ Connected to the database');

    app.listen(env.PORT, () => {
      console.log(`🚀 Server is running on port ${env.PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start the server:', error);
    process.exit(1);
  }
};

startServer();
