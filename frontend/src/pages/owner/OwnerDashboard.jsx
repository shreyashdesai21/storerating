import { useEffect, useState } from 'react';
import { Star, Users, TrendingUp } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import Pagination from '../../components/common/Pagination.jsx';
import { getOwnerDashboard, getOwnerRatings } from '../../services/ownerService.js';
import { StarDisplay } from '../../components/stores/RatingInput.jsx';

export default function OwnerDashboard() {
  const [stats, setStats] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [ratingsLoading, setRatingsLoading] = useState(false);

  useEffect(() => {
    getOwnerDashboard().then(res => setStats(res.data.data)).catch(console.error).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setRatingsLoading(true);
    getOwnerRatings({ page, limit: 10 })
      .then(res => { setRatings(res.data.data || []); setPagination(res.data.pagination); })
      .catch(console.error)
      .finally(() => setRatingsLoading(false));
  }, [page]);

  return (
    <DashboardLayout title="Store Dashboard">
      {loading ? (
        <div className="flex items-center justify-center h-64"><LoadingSpinner size="lg" /></div>
      ) : (
        <div className="space-y-6">
          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
              <p className="text-sm text-slate-500 font-medium mb-1">Average Rating</p>
              <div className="flex items-end gap-3">
                <span className="text-4xl font-bold text-slate-900">
                  {stats?.averageRating ? Number(stats.averageRating).toFixed(1) : 'N/A'}
                </span>
                <StarDisplay rating={stats?.averageRating || 0} size={20} />
              </div>
              {stats?.totalRatings > 0 && (
                <p className="text-xs text-slate-400 mt-2">Based on {stats.totalRatings} ratings</p>
              )}
            </div>
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
              <p className="text-sm text-slate-500 font-medium mb-1">Total Ratings</p>
              <div className="flex items-end gap-3">
                <span className="text-4xl font-bold text-slate-900">{stats?.totalRatings ?? 0}</span>
                <Users size={22} className="text-indigo-400 mb-1" />
              </div>
              <p className="text-xs text-slate-400 mt-2">From all your stores</p>
            </div>
          </div>

          {/* Ratings table */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100">
              <h3 className="text-base font-semibold text-slate-900">Users Who Rated Your Store</h3>
            </div>
            {ratingsLoading ? (
              <div className="flex items-center justify-center h-40"><LoadingSpinner size="md" /></div>
            ) : ratings.length === 0 ? (
              <EmptyState icon={Star} title="No ratings yet" description="Your store hasn't received any ratings." />
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                        {['User Name', 'Email', 'Rating', 'Date'].map(h => (
                          <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {ratings.map((r, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3 text-sm font-medium text-slate-900">{r.name}</td>
                          <td className="px-4 py-3 text-sm text-slate-500">{r.email}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <StarDisplay rating={r.rating} size={13} />
                              <span className="text-xs font-semibold text-slate-700">{r.rating}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-slate-500">
                            {new Date(r.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Pagination pagination={pagination} onPageChange={setPage} />
              </>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
