import * as adminService from '../services/adminService.js';
import * as userService from '../services/userService.js';
import * as storeService from '../services/storeService.js';
import { getPaginationOptions, formatPagination } from '../utils/pagination.js';

export const getDashboard = async (req, res) => {
  const stats = await adminService.getDashboardStats();
  res.json({ success: true, data: stats });
};

export const getUsers = async (req, res) => {
  const pagination = getPaginationOptions(req.query);
  const { name, email, address, role, sortBy, sortOrder } = req.query;

  const { users, total } = await userService.getUsers({
    pagination,
    filters: { name, email, address, role, sortBy, sortOrder }
  });

  res.json({
    success: true,
    data: users,
    pagination: formatPagination(pagination.page, pagination.limit, total)
  });
};

export const getUserById = async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res.json({ success: true, data: user });
};

export const createUser = async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(201).json({ success: true, data: user });
};

export const getStores = async (req, res) => {
  const pagination = getPaginationOptions(req.query);
  const { name, email, address, sortBy, sortOrder } = req.query;

  const { stores, total } = await storeService.getStores({
    pagination,
    filters: { name, email, address, sortBy, sortOrder }
  });

  res.json({
    success: true,
    data: stores,
    pagination: formatPagination(pagination.page, pagination.limit, total)
  });
};

export const getStoreById = async (req, res) => {
  const store = await storeService.getStoreById(req.params.id);
  res.json({ success: true, data: store });
};

export const createStore = async (req, res) => {
  const store = await storeService.createStore(req.body);
  res.status(201).json({ success: true, data: store });
};
