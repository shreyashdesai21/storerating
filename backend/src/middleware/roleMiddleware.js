export const requireRole = (roleOrRoles) => {
  const roles = Array.isArray(roleOrRoles) ? roleOrRoles : [roleOrRoles];

  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Access denied: insufficient permissions' });
    }
    next();
  };
};
