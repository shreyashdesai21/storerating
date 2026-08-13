import { Star } from 'lucide-react';
import { StarDisplay } from './RatingInput.jsx';
import SortButton from '../common/SortButton.jsx';

export default function StoreTable({ stores, sortBy, sortOrder, onSort, actions }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-slate-50 border-b border-slate-100">
          <tr>
            <th className="px-4 py-3 text-left">
              <SortButton field="name" label="Store Name" sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} />
            </th>
            <th className="px-4 py-3 text-left">
              <SortButton field="email" label="Email" sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} />
            </th>
            <th className="px-4 py-3 text-left">
              <SortButton field="address" label="Address" sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} />
            </th>
            <th className="px-4 py-3 text-left">
              <SortButton field="overallRating" label="Rating" sortBy={sortBy} sortOrder={sortOrder} onSort={onSort} />
            </th>
            {actions && <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {stores.map((store) => (
            <tr key={store.id} className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-3 text-sm font-medium text-slate-900">{store.storeName || store.name}</td>
              <td className="px-4 py-3 text-sm text-slate-500">{store.email}</td>
              <td className="px-4 py-3 text-sm text-slate-500 max-w-xs truncate">{store.address}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <StarDisplay rating={store.overallRating || 0} size={13} />
                  <span className="text-xs font-semibold text-slate-700">
                    {store.overallRating ? Number(store.overallRating).toFixed(1) : 'N/A'}
                  </span>
                </div>
              </td>
              {actions && <td className="px-4 py-3">{actions(store)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
