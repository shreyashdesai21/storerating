import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, MapPin, ShieldCheck } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';
import { getAdminUserById } from '../../services/adminService.js';

const ROLE_BADGE = {
  ADMIN: 'bg-indigo-100 text-indigo-700',
  USER: 'bg-emerald-100 text-emerald-700',
  STORE_OWNER: 'bg-violet-100 text-violet-700',
};

export default function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminUserById(id).then(res => setUser(res.data.data)).catch(console.error).finally(() => setLoading(false));
  }, [id]);

  return (
    <DashboardLayout title="User Details">
      <div className="max-w-lg">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-6 transition-colors">
          <ArrowLeft size={16} /> Back to Users
        </button>
        {loading ? (
          <div className="flex items-center justify-center h-48"><LoadingSpinner size="lg" /></div>
        ) : user ? (
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center text-xl font-bold text-indigo-700">
                {user.name?.[0]?.toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
                <span className={`badge ${ROLE_BADGE[user.role] || 'bg-slate-100 text-slate-600'} mt-1`}>{user.role}</span>
              </div>
            </div>
            <div className="border-t border-slate-100 pt-4 space-y-3">
              <div className="flex items-start gap-3">
                <Mail size={16} className="text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 font-medium">Email</p>
                  <p className="text-sm text-slate-900">{user.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 font-medium">Address</p>
                  <p className="text-sm text-slate-900">{user.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck size={16} className="text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-slate-500 font-medium">Member Since</p>
                  <p className="text-sm text-slate-900">{new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-slate-500">User not found.</p>
        )}
      </div>
    </DashboardLayout>
  );
}
