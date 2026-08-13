import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';

export default function SortButton({ field, label, sortBy, sortOrder, onSort }) {
  const active = sortBy === field;
  return (
    <button
      onClick={() => onSort(field)}
      className={`flex items-center gap-1 text-xs font-semibold uppercase tracking-wider transition-colors ${active ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
    >
      {label}
      {active
        ? sortOrder === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />
        : <ArrowUpDown size={12} className="opacity-40" />}
    </button>
  );
}
