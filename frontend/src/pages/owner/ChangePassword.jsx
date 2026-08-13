import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Lock } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout.jsx';
import Button from '../../components/common/Button.jsx';
import { updateOwnerPassword } from '../../services/ownerService.js';
import toast from 'react-hot-toast';

const schema = z.object({
  newPassword: z.string().min(8).max(16).regex(/[A-Z]/, 'Needs uppercase').regex(/[^a-zA-Z0-9]/, 'Needs special char'),
  confirmPassword: z.string(),
}).refine(d => d.newPassword === d.confirmPassword, { message: "Passwords don't match", path: ['confirmPassword'] });

export default function ChangePasswordOwner() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await updateOwnerPassword({ newPassword: data.newPassword });
      toast.success('Password updated successfully!');
      reset();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update password');
    }
  };

  return (
    <DashboardLayout title="Change Password">
      <div className="max-w-md">
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
              <Lock size={18} className="text-indigo-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">Update Password</h2>
              <p className="text-xs text-slate-500">Choose a strong, secure password</p>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {[
              { label: 'New Password', name: 'newPassword', placeholder: 'Enter new password' },
              { label: 'Confirm Password', name: 'confirmPassword', placeholder: 'Repeat new password' },
            ].map(({ label, name, placeholder }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
                <input {...register(name)} type="password" placeholder={placeholder}
                  className={`w-full px-3.5 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all
                    ${errors[name] ? 'border-red-400' : 'border-slate-200'}`} />
                {errors[name] && <p className="mt-1 text-xs text-red-500">{errors[name].message}</p>}
              </div>
            ))}
            <Button type="submit" variant="primary" loading={isSubmitting} className="w-full mt-2">Update Password</Button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
