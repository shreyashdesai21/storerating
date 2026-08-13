import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Eye } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout.jsx';
import SearchBar from '../../components/common/SearchBar.jsx';
import Pagination from '../../components/common/Pagination.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';
import Button from '../../components/common/Button.jsx';
import SortButton from '../../components/common/SortButton.jsx';
import { getAdminUsers } from '../../services/adminService.js';
import { Users as UsersIcon } from 'lucide-react';

const ROLE_BADGE = {
  ADMIN: 'bg-indigo-100 text-indigo-700',
  USER: 'bg-emerald-100 text-emerald-700',
  STORE_OWNER: 'bg-violet-100 text-violet-700',
};

export default function AdminUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(1);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 10, sortBy, sortOrder };
      if (search) params.name = search;
      if (roleFilter) params.role = roleFilter;
      const res = await getAdminUsers(params);
      setUsers(res.data.data);
      setPagination(res.data.pagination);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [page, sortBy, sortOrder, search, roleFilter]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const handleSort = (field) => {
    if (sortBy === field) setSortOrder(o => o === 'asc' ? 'desc' : 'asc');
    else { setSortBy(field); setSortOrder('asc'); }
    setPage(1);
  };

  return (
    <DashboardLayout title="Users">
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-64">
              <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }}
                placeholder="Search by name or email..." onClear={() => { setSearch(''); setPage(1); }} />
            </div>
            <select value={roleFilter} onChange={(e) => { setRoleFilter(e.target.value); setPage(1); }}
              className="px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="">All Roles</option>
              <option value="ADMIN">Admin</option>
              <option value="USER">User</option>
              <option value="STORE_OWNER">Store Owner</option>
            </select>
          </div>
          <Button onClick={() => navigate('/admin/users/add')} variant="primary" size="md">
            <Plus size={16} /> Add User
          </Button>
        </div>

        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-64"><LoadingSpinner size="lg" /></div>
          ) : users.length === 0 ? (
            <EmptyState icon={UsersIcon} title="No users found" />
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="px-4 py-3 text-left"><SortButton field="name" label="Name" sortBy={sortBy} sortOrder={sortOrder} onSort={handleSort} /></th>
                      <th className="px-4 py-3 text-left"><SortButton field="email" label="Email" sortBy={sortBy} sortOrder={sortOrder} onSort={handleSort} /></th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Address</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {users.map(user => (
                      <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 text-sm font-medium text-slate-900">{user.name}</td>
                        <td className="px-4 py-3 text-sm text-slate-500">{user.email}</td>
                        <td className="px-4 py-3 text-sm text-slate-500 max-w-xs truncate">{user.address}</td>
                        <td className="px-4 py-3">
                          <span className={`badge ${ROLE_BADGE[user.role] || 'bg-slate-100 text-slate-600'}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button onClick={() => navigate(`/admin/users/${user.id}`)}
                            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                            <Eye size={15} />
                          </button>
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
    </DashboardLayout>
  );
}
