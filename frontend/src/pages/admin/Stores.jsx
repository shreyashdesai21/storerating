import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Eye } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout.jsx';
import StoreTable from '../../components/stores/StoreTable.jsx';
import SearchBar from '../../components/common/SearchBar.jsx';
import Pagination from '../../components/common/Pagination.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';
import Button from '../../components/common/Button.jsx';
import { getAdminStores } from '../../services/adminService.js';
import { Store } from 'lucide-react';

export default function AdminStores() {
  const navigate = useNavigate();
  const [stores, setStores] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [page, setPage] = useState(1);

  const fetchStores = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 10, sortBy, sortOrder };
      if (search) params.name = search;
      const res = await getAdminStores(params);
      setStores(res.data.data);
      setPagination(res.data.pagination);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [page, sortBy, sortOrder, search]);

  useEffect(() => { fetchStores(); }, [fetchStores]);

  const handleSort = (field) => {
    if (sortBy === field) setSortOrder(o => o === 'asc' ? 'desc' : 'asc');
    else { setSortBy(field); setSortOrder('asc'); }
    setPage(1);
  };

  return (
    <DashboardLayout title="Stores">
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div className="w-72">
            <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }}
              placeholder="Search by name, email or address..." onClear={() => { setSearch(''); setPage(1); }} />
          </div>
          <Button onClick={() => navigate('/admin/stores/add')} variant="primary" size="md">
            <Plus size={16} /> Add Store
          </Button>
        </div>

        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-64"><LoadingSpinner size="lg" /></div>
          ) : stores.length === 0 ? (
            <EmptyState icon={Store} title="No stores found" description="Try adjusting your search filters." />
          ) : (
            <>
              <StoreTable
                stores={stores} sortBy={sortBy} sortOrder={sortOrder} onSort={handleSort}
                actions={(store) => (
                  <button onClick={() => navigate(`/admin/stores/${store.id}`)}
                    className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                    <Eye size={15} />
                  </button>
                )}
              />
              <Pagination pagination={pagination} onPageChange={setPage} />
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
