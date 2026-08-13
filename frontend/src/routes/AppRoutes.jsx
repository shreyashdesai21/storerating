import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.jsx';
import RoleRoute from './RoleRoute.jsx';

import Login from '../pages/auth/Login.jsx';
import Signup from '../pages/auth/Signup.jsx';

import AdminDashboard from '../pages/admin/AdminDashboard.jsx';
import AdminStores from '../pages/admin/Stores.jsx';
import AdminUsers from '../pages/admin/Users.jsx';
import AddStore from '../pages/admin/AddStore.jsx';
import AddUser from '../pages/admin/AddUser.jsx';
import UserDetails from '../pages/admin/UserDetails.jsx';

import UserStores from '../pages/user/Stores.jsx';
import ChangePasswordUser from '../pages/user/ChangePassword.jsx';

import OwnerDashboard from '../pages/owner/OwnerDashboard.jsx';
import ChangePasswordOwner from '../pages/owner/ChangePassword.jsx';

import LandingPage from '../pages/LandingPage.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Admin routes */}
      <Route path="/admin/dashboard" element={
        <ProtectedRoute><RoleRoute allowedRoles={['ADMIN']}><AdminDashboard /></RoleRoute></ProtectedRoute>
      } />
      <Route path="/admin/stores" element={
        <ProtectedRoute><RoleRoute allowedRoles={['ADMIN']}><AdminStores /></RoleRoute></ProtectedRoute>
      } />
      <Route path="/admin/stores/add" element={
        <ProtectedRoute><RoleRoute allowedRoles={['ADMIN']}><AddStore /></RoleRoute></ProtectedRoute>
      } />
      <Route path="/admin/users" element={
        <ProtectedRoute><RoleRoute allowedRoles={['ADMIN']}><AdminUsers /></RoleRoute></ProtectedRoute>
      } />
      <Route path="/admin/users/add" element={
        <ProtectedRoute><RoleRoute allowedRoles={['ADMIN']}><AddUser /></RoleRoute></ProtectedRoute>
      } />
      <Route path="/admin/users/:id" element={
        <ProtectedRoute><RoleRoute allowedRoles={['ADMIN']}><UserDetails /></RoleRoute></ProtectedRoute>
      } />

      {/* User routes */}
      <Route path="/user/stores" element={
        <ProtectedRoute><RoleRoute allowedRoles={['USER']}><UserStores /></RoleRoute></ProtectedRoute>
      } />
      <Route path="/user/change-password" element={
        <ProtectedRoute><RoleRoute allowedRoles={['USER']}><ChangePasswordUser /></RoleRoute></ProtectedRoute>
      } />

      {/* Owner routes */}
      <Route path="/owner/dashboard" element={
        <ProtectedRoute><RoleRoute allowedRoles={['STORE_OWNER']}><OwnerDashboard /></RoleRoute></ProtectedRoute>
      } />
      <Route path="/owner/change-password" element={
        <ProtectedRoute><RoleRoute allowedRoles={['STORE_OWNER']}><ChangePasswordOwner /></RoleRoute></ProtectedRoute>
      } />

      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
