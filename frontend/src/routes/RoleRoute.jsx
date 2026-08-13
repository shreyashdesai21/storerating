import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const ROLE_HOME = {
  ADMIN: '/admin/dashboard',
  USER: '/user/stores',
  STORE_OWNER: '/owner/dashboard',
};

export default function RoleRoute({ allowedRoles, children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={ROLE_HOME[user.role] || '/login'} replace />;
  }
  return children;
}
