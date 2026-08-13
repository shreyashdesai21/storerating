import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout.jsx';
import Button from '../../components/common/Button.jsx';
import LoadingSpinner from '../../components/common/LoadingSpinner.jsx';
import { createAdminStore, getAdminUsers } from '../../services/adminService.js';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(2, 'Store name required'),
  email: z.string().email('Invalid email'),
  address: z.string().min(5, 'Address required'),
  ownerId: z.string().uuid('Select a valid owner'),
});

const formatApiError = (err, fallbackMessage = 'Failed to create store') => {
  const data = err.response?.data;
  if (!data) return err.message || fallbackMessage;
  if (Array.isArray(data.errors) && data.errors.length > 0) {
    return data.errors.map((e) => e.message || e).join(', ');
  }
  return data.message || fallbackMessage;
};

export default function AddStore() {
  const navigate = useNavigate();
  const [owners, setOwners] = useState([]);
  const [loadingOwners, setLoadingOwners] = useState(true);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });

  useEffect(() => {
    getAdminUsers({ role: 'STORE_OWNER', limit: 100 })
      .then(res => setOwners(Array.isArray(res?.data?.data) ? res.data.data : []))
      .catch(console.error)
      .finally(() => setLoadingOwners(false));
  }, []);

  const onSubmit = async (data) => {
    try {
      await createAdminStore(data);
      toast.success('Store created successfully!');
      navigate('/admin/stores');
    } catch (err) {
      toast.error(formatApiError(err, 'Failed to create store'));
    }
  };

  return (
    <DashboardLayout title="Add Store">
      <div className="max-w-xl">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-6 transition-colors">
          <ArrowLeft size={16} /> Back
        </button>
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-5">New Store Details</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {[
              { label: 'Store Name', name: 'name', placeholder: 'Tech Haven' },
              { label: 'Email', name: 'email', type: 'email', placeholder: 'store@example.com' },
              { label: 'Address', name: 'address', placeholder: '500 Market St, San Francisco' },
            ].map(({ label, name, type = 'text', placeholder }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
                <input {...register(name)} type={type} placeholder={placeholder}
                  className={`w-full px-3.5 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all
                    ${errors[name] ? 'border-red-400' : 'border-slate-200'}`} />
                {errors[name] && <p className="mt-1 text-xs text-red-500">{errors[name].message}</p>}
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Store Owner</label>
              {loadingOwners ? <LoadingSpinner size="sm" /> : (
                <select {...register('ownerId')}
                  className={`w-full px-3.5 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all
                    ${errors.ownerId ? 'border-red-400' : 'border-slate-200'}`}>
                  <option value="">-- Select Owner --</option>
                  {(Array.isArray(owners) ? owners : []).map(o => <option key={o.id} value={o.id}>{o.name} ({o.email})</option>)}
                </select>
              )}
              {errors.ownerId && <p className="mt-1 text-xs text-red-500">{errors.ownerId.message}</p>}
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="button" variant="secondary" onClick={() => navigate(-1)}>Cancel</Button>
              <Button type="submit" variant="primary" loading={isSubmitting}>Create Store</Button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
