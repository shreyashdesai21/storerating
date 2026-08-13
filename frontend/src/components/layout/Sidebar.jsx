import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Store, Users, Plus, LogOut,
  KeyRound, Star, ChevronRight, ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

const adminLinks = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/users', icon: Users, label: 'Users' },
  { to: '/admin/stores', icon: Store, label: 'Stores' },
  { to: '/admin/users/add', icon: Plus, label: 'Add User' },
  { to: '/admin/stores/add', icon: Plus, label: 'Add Store' },
];

const userLinks = [
  { to: '/user/stores', icon: Store, label: 'Stores' },
  { to: '/user/change-password', icon: KeyRound, label: 'Change Password' },
];

const ownerLinks = [
  { to: '/owner/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/owner/change-password', icon: KeyRound, label: 'Change Password' },
];

const ROLE_LINKS = { ADMIN: adminLinks, USER: userLinks, STORE_OWNER: ownerLinks };
const ROLE_LABELS = { ADMIN: 'Administrator', USER: 'Normal User', STORE_OWNER: 'Store Owner' };

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const links = ROLE_LINKS[user?.role] || [];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="w-60 bg-slate-900 min-h-screen flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-5 py-6 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0">
            <Star size={16} className="text-white fill-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-none">StoreRating</p>
            <p className="text-slate-500 text-[10px] mt-0.5">Platform</p>
          </div>
        </div>
      </div>

      {/* User info */}
      <div className="px-4 py-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600/20 rounded-full flex items-center justify-center">
            <span className="text-indigo-400 text-xs font-bold">
              {user?.email?.[0]?.toUpperCase()}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-white text-xs font-semibold truncate">{user?.email}</p>
            <p className="text-slate-500 text-[10px] mt-0.5">{ROLE_LABELS[user?.role]}</p>
          </div>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer
              ${isActive ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`
            }
          >
            <Icon size={16} />
            <span className="flex-1">{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-slate-800">
        <button onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
