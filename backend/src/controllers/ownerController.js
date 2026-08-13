import * as ownerService from '../services/ownerService.js';
import * as userService from '../services/userService.js';
import { getPaginationOptions, formatPagination } from '../utils/pagination.js';

export const getDashboard = async (req, res) => {
  const stats = await ownerService.getOwnerDashboardStats(req.user.id);
  res.json({ success: true, data: stats });
};

export const getRatings = async (req, res) => {
  const pagination = getPaginationOptions(req.query);
  const { ratings, total } = await ownerService.getOwnerRatings(req.user.id, pagination);

  res.json({
    success: true,
    data: ratings,
    pagination: formatPagination(pagination.page, pagination.limit, total)
  });
};

export const updatePassword = async (req, res) => {
  const { newPassword } = req.body;
  await userService.updateUserPasswordWithoutCurrent(req.user.id, newPassword);
  res.json({ success: true, data: { message: 'Password updated successfully' } });
};
