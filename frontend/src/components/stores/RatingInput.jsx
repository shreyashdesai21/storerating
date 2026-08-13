import { Star } from 'lucide-react';

export function StarDisplay({ rating, max = 5, size = 16 }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}
        />
      ))}
    </div>
  );
}

export default function RatingInput({ value, onChange, onSubmit, loading, label = 'Rate this store' }) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-medium text-slate-600">{label}</p>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
            onClick={() => onChange(star)}
            className="transition-transform hover:scale-110 focus:outline-none"
          >
            <Star
              size={28}
              className={star <= (value || 0)
                ? 'fill-amber-400 text-amber-400 drop-shadow-sm'
                : 'fill-slate-200 text-slate-200 hover:fill-amber-200 hover:text-amber-200'}
            />
          </button>
        ))}
        {value && <span className="ml-2 text-sm font-semibold text-slate-700">{value}/5</span>}
      </div>
      {value && (
        <button
          onClick={onSubmit}
          disabled={loading}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-all disabled:opacity-50"
        >
          {loading ? 'Saving…' : 'Submit Rating'}
        </button>
      )}
    </div>
  );
}
