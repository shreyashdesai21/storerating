import { useEffect, useState } from 'react';
import { Users, Store, Star, TrendingUp } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout.jsx';
import { getAdminDashboard, getAdminStores } from '../../services/adminService.js';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';
import { StarDisplay } from '../../components/stores/RatingInput.jsx';

function StatCard({ icon: Icon, label, value, color, sub }) {
  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6 flex items-start gap-4">
      <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center shrink-0`}>
        <Icon size={22} className="text-white" />
      </div>
      <div>
        <p className="text-sm text-slate-500 font-medium">{label}</p>
        <p className="text-3xl font-bold text-slate-900 mt-0.5">{value ?? '—'}</p>
        {sub && <p className="text-xs text-emerald-600 font-medium mt-1">{sub}</p>}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recentStores, setRecentStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getAdminDashboard(),
      getAdminStores({ limit: 5, sortBy: 'createdAt', sortOrder: 'desc' }),
    ]).then(([dashRes, storeRes]) => {
      setStats(dashRes.data.data);
      setRecentStores(storeRes.data.data || []);
    }).catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <DashboardLayout title="Dashboard">
      {loading ? (
        <div className="flex items-center justify-center h-64"><LoadingSpinner size="lg" /></div>
      ) : (
        <div className="space-y-6">
          <div>
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard icon={Users} label="Total Users" value={stats?.totalUsers?.toLocaleString()} color="bg-indigo-600" sub="Platform members" />
              <StatCard icon={Store} label="Total Stores" value={stats?.totalStores?.toLocaleString()} color="bg-violet-600" sub="Registered stores" />
              <StatCard icon={Star} label="Total Ratings" value={stats?.totalRatings?.toLocaleString()} color="bg-amber-500" sub="Submitted reviews" />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-base font-semibold text-slate-900">Recent Stores</h3>
              <a href="/admin/stores" className="text-xs text-indigo-600 font-semibold hover:underline">View all</a>
            </div>
            {recentStores.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-10">No stores found.</p>
            ) : (
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    {['Store Name', 'Address', 'Rating'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {recentStores.map(s => (
                    <tr key={s.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 text-sm font-medium text-slate-900">{s.storeName || s.name}</td>
                      <td className="px-4 py-3 text-sm text-slate-500 truncate max-w-xs">{s.address}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <StarDisplay rating={s.overallRating || 0} size={13} />
                          <span className="text-xs font-semibold text-slate-700">{s.overallRating ? Number(s.overallRating).toFixed(1) : 'N/A'}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
