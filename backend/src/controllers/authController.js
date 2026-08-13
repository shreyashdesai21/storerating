import * as authService from '../services/authService.js';

export const signup = async (req, res) => {
  const user = await authService.signup(req.body);
  res.status(201).json({ success: true, data: user });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  res.json({ success: true, data: result });
};

export const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  await authService.changePassword(req.user.id, currentPassword, newPassword);
  res.json({ success: true, data: { message: 'Password updated successfully' } });
};

export const getMe = async (req, res) => {
  res.json({ success: true, data: req.user });
};
