import * as userService from '../services/userService.js';

export const updatePassword = async (req, res) => {
  const { newPassword } = req.body;
  await userService.updateUserPasswordWithoutCurrent(req.user.id, newPassword);
  res.json({ success: true, data: { message: 'Password updated successfully' } });
};
