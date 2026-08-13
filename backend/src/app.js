import express from 'express';
import cors from 'cors';
import 'express-async-errors';

import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import storeRoutes from './routes/storeRoutes.js';
import ownerRoutes from './routes/ownerRoutes.js';
import userRoutes from './routes/userRoutes.js';

import { errorHandler } from './middleware/errorMiddleware.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/owner', ownerRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);

export default app;
