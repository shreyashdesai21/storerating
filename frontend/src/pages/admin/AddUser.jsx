import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout.jsx';
import Button from '../../components/common/Button.jsx';
import { createAdminUser } from '../../services/adminService.js';
import toast from 'react-hot-toast';

const schema = z.object({
  name: z.string().min(20, 'Name must be between 20 and 60 characters').max(60, 'Name must be between 20 and 60 characters'),
  email: z.string().email('Enter a valid email address'),
  address: z.string().min(1, 'Address is required').max(400, 'Address must be at most 400 characters'),
  password: z.string()
    .min(8, 'Password must be between 8 and 16 characters')
    .max(16, 'Password must be between 8 and 16 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),
  role: z.enum(['ADMIN', 'USER', 'STORE_OWNER']).optional(),
});

const formatApiError = (err, fallbackMessage = 'Failed to create user') => {
  const data = err.response?.data;
  if (!data) return err.message || fallbackMessage;

  if (Array.isArray(data.errors) && data.errors.length > 0) {
    return data.errors.map((e) => e.message || e).join(', ');
  }

  return data.message || fallbackMessage;
};

export default function AddUser() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await createAdminUser(data);
      toast.success('User created successfully!');
      navigate('/admin/users');
    } catch (err) {
      toast.error(formatApiError(err, 'Failed to create user'));
    }
  };

  const formFields = [
    { label: 'Full Name', name: 'name', placeholder: 'Enter full name (20-60 chars)' },
    { label: 'Email', name: 'email', type: 'email', placeholder: 'john@example.com' },
    { label: 'Address', name: 'address', placeholder: '123 Main St' },
    { label: 'Password', name: 'password', type: 'password', placeholder: '••••••••' },
  ];

  return (
    <DashboardLayout title="Add User">
      <div className="max-w-xl">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-6 transition-colors">
          <ArrowLeft size={16} /> Back
        </button>
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-5">New User Details</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {(Array.isArray(formFields) ? formFields : []).map(({ label, name, type = 'text', placeholder }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
                <input {...register(name)} type={type} placeholder={placeholder}
                  className={`w-full px-3.5 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all
                    ${errors[name] ? 'border-red-400' : 'border-slate-200'}`} />
                {errors[name] && <p className="mt-1 text-xs text-red-500">{errors[name].message}</p>}
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Role</label>
              <select {...register('role')} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500">
                <option value="USER">Normal User</option>
                <option value="ADMIN">Admin</option>
                <option value="STORE_OWNER">Store Owner</option>
              </select>
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="button" variant="secondary" onClick={() => navigate(-1)}>Cancel</Button>
              <Button type="submit" variant="primary" loading={isSubmitting}>Create User</Button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}

