import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const generateToken = (payload, expiresIn = '1d') => {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};
