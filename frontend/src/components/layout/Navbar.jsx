import { Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

export default function Navbar({ title }) {
  const { user } = useAuth();
  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 shrink-0">
      <div>
        <h1 className="text-lg font-bold text-slate-900">{title}</h1>
        <p className="text-xs text-slate-500">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
          <Bell size={18} />
        </button>
        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
          <span className="text-indigo-700 text-xs font-bold">
            {user?.email?.[0]?.toUpperCase()}
          </span>
        </div>
      </div>
    </header>
  );
}
