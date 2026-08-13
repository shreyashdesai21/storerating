import { useEffect, useState, useCallback } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout.jsx';
import StoreCard from '../../components/stores/StoreCard.jsx';
import SearchBar from '../../components/common/SearchBar.jsx';
import Pagination from '../../components/common/Pagination.jsx';
import EmptyState from '../../components/common/EmptyState.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';
import { getStores } from '../../services/storeService.js';
import { Store } from 'lucide-react';

export default function UserStores() {
  const [stores, setStores] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchStores = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 12 };
      if (search) params.name = search;
      const res = await getStores(params);
      setStores(res.data.data || []);
      setPagination(res.data.pagination);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  }, [page, search, refreshKey]);

  useEffect(() => { fetchStores(); }, [fetchStores]);

  return (
    <DashboardLayout title="Find & Rate Stores">
      <div className="space-y-5">
        <div className="max-w-sm">
          <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }}
            placeholder="Search by store name or address..." onClear={() => { setSearch(''); setPage(1); }} />
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64"><LoadingSpinner size="lg" /></div>
        ) : stores.length === 0 ? (
          <EmptyState icon={Store} title="No stores found" description="Try a different search term." />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {stores.map(store => (
                <StoreCard key={store.id} store={store} onRatingUpdate={() => setRefreshKey(k => k + 1)} />
              ))}
            </div>
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm">
              <Pagination pagination={pagination} onPageChange={setPage} />
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
