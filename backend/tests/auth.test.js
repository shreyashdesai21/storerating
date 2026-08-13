import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';
import { prisma } from '../src/config/database.js';
import { hashPassword } from '../src/utils/password.js';

describe('Auth Endpoints', () => {
  const testUser = {
    name: 'Test User Standard Account',
    email: 'testauth@example.com',
    password: 'Password123!',
    address: '123 Test St'
  };

  beforeAll(async () => {
    // Clean up if user already exists
    await prisma.rating.deleteMany({ where: { user: { email: testUser.email } } });
    await prisma.store.deleteMany({ where: { owner: { email: testUser.email } } });
    await prisma.user.deleteMany({ where: { email: testUser.email } });
  });

  afterAll(async () => {
    await prisma.user.deleteMany({ where: { email: testUser.email } });
    await prisma.$disconnect();
  });

  it('should sign up a new user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send(testUser);

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toBe(testUser.email);
    expect(res.body.data).not.toHaveProperty('password');
  });

  it('should login an existing user and return a token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('token');
    expect(res.body.data.user.email).toBe(testUser.email);
  });
});
