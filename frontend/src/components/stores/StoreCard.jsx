import { useState } from 'react';
import { MapPin, Star, Edit3 } from 'lucide-react';
import { StarDisplay } from './RatingInput.jsx';
import RatingInput from './RatingInput.jsx';
import { submitRating, updateRating } from '../../services/ratingService.js';
import toast from 'react-hot-toast';

export default function StoreCard({ store, onRatingUpdate }) {
  const [editing, setEditing] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(store.userRating || 0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!selectedRating) return;
    setLoading(true);
    try {
      if (store.userRating) {
        await updateRating(store.id, selectedRating);
      } else {
        await submitRating(store.id, selectedRating);
      }
      toast.success('Rating saved!');
      setEditing(false);
      onRatingUpdate?.();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save rating');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 truncate text-base">{store.storeName}</h3>
            <div className="flex items-center gap-1.5 mt-1 text-slate-500">
              <MapPin size={13} />
              <span className="text-xs truncate">{store.address}</span>
            </div>
          </div>
          <div className="ml-3 flex flex-col items-end gap-0.5">
            <div className="flex items-center gap-1">
              <Star size={14} className="fill-amber-400 text-amber-400" />
              <span className="text-sm font-bold text-slate-900">
                {store.overallRating ? Number(store.overallRating).toFixed(1) : 'N/A'}
              </span>
            </div>
            <span className="text-[10px] text-slate-400">Overall</span>
          </div>
        </div>

        <div className="border-t border-slate-50 pt-3">
          {!editing ? (
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 mb-1">Your Rating</p>
                {store.userRating ? (
                  <StarDisplay rating={store.userRating} size={14} />
                ) : (
                  <span className="text-xs text-slate-400 italic">Not rated yet</span>
                )}
              </div>
              <button
                onClick={() => { setEditing(true); setSelectedRating(store.userRating || 0); }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all
                  bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
              >
                <Edit3 size={12} />
                {store.userRating ? 'Edit Rating' : 'Rate Store'}
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    aria-label={`Rate ${star} stars`}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setSelectedRating(star)}
                    className="transition-transform hover:scale-110 focus:outline-none"
                  >
                    <Star
                      size={24}
                      className={star <= (hoverRating || selectedRating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-slate-200 text-slate-200'}
                    />
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSubmit} disabled={!selectedRating || loading}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg disabled:opacity-50 transition-all"
                >
                  {loading ? 'Saving…' : 'Submit'}
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold rounded-lg transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
