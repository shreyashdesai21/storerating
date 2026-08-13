import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ pagination, onPageChange }) {
  if (!pagination || pagination.totalPages <= 1) return null;
  const { page, totalPages } = pagination;

  const pages = [];
  const delta = 1;
  for (let i = Math.max(1, page - delta); i <= Math.min(totalPages, page + delta); i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100">
      <p className="text-xs text-slate-500">
        Page <span className="font-semibold text-slate-700">{page}</span> of <span className="font-semibold text-slate-700">{totalPages}</span>
        {' · '}{pagination.total} total
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(page - 1)} disabled={page === 1}
          className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft size={16} />
        </button>
        {page > 2 && <><button onClick={() => onPageChange(1)} className="w-8 h-8 rounded-lg text-xs text-slate-600 hover:bg-slate-100">1</button><span className="text-slate-400 text-xs">…</span></>}
        {pages.map(p => (
          <button key={p} onClick={() => onPageChange(p)}
            className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${p === page ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
          >{p}</button>
        ))}
        {page < totalPages - 1 && <><span className="text-slate-400 text-xs">…</span><button onClick={() => onPageChange(totalPages)} className="w-8 h-8 rounded-lg text-xs text-slate-600 hover:bg-slate-100">{totalPages}</button></>}
        <button
          onClick={() => onPageChange(page + 1)} disabled={page === totalPages}
          className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
