import { useState } from 'react';
import { SiteCard, SiteCardContent } from '@/components/ui/SiteCard';
import { SiteButton } from '@/components/ui/SiteButton';
import { UserPlus, ArrowLeft, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';

export default function AdminAddUser() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsPending(true);

    const formData = new FormData(e.target);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const password = formData.get('password');
    const role = formData.get('role');

    try {
      // NOTE: In a real Supabase setup, an admin cannot simply create another user using 
      // the client-side supabase.auth.signUp() while logged in, because it replaces their session.
      // Usually, you would call a Supabase Edge Function to create the user, or use the 
      // Service Role Key on the server. For the sake of UI demonstration, we will just show an alert.
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert(`User ${firstName} created successfully! (Simulated due to client-side auth restrictions)`);
      navigate('/admin/users');
    } catch (err) {
      setError(err.message || 'An error occurred creating the user.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-extrabold text-brand-ink mb-2">Add New User</h1>
          <p className="text-muted-foreground font-body text-lg">Create a new staff member or patient.</p>
        </div>
        <Link to="/admin/users">
          <SiteButton variant="outline" className="font-heading border-2 border-brand-teal/20 hover:bg-brand-teal/10 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Users
          </SiteButton>
        </Link>
      </div>

      <SiteCard className="max-w-2xl border-brand-teal/20 bg-white/70 backdrop-blur-xl shadow-md">
        <SiteCardContent>
          <div className="font-heading text-xl flex items-center mb-6">
            <UserPlus className="mr-2 h-5 w-5 text-brand-teal" /> User Details
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-heading font-bold text-brand-ink">First Name</label>
                <input 
                  type="text" 
                  name="firstName" 
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-brand-teal/20 bg-white focus:border-brand-teal focus:ring-0 outline-none transition-colors font-body"
                  placeholder="Jane"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-heading font-bold text-brand-ink">Last Name</label>
                <input 
                  type="text" 
                  name="lastName" 
                  required
                  className="w-full px-4 py-3 rounded-lg border-2 border-brand-teal/20 bg-white focus:border-brand-teal focus:ring-0 outline-none transition-colors font-body"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-heading font-bold text-brand-ink">Email Address</label>
              <input 
                type="email" 
                name="email" 
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-brand-teal/20 bg-white focus:border-brand-teal focus:ring-0 outline-none transition-colors font-body"
                placeholder="jane.doe@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-heading font-bold text-brand-ink">Temporary Password</label>
              <input 
                type="password" 
                name="password" 
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-lg border-2 border-brand-teal/20 bg-white focus:border-brand-teal focus:ring-0 outline-none transition-colors font-body"
                placeholder="••••••••"
              />
              <p className="text-xs text-muted-foreground font-body">Must be at least 6 characters long.</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-heading font-bold text-brand-ink">Assign Role</label>
              <select 
                name="role" 
                required
                defaultValue="staff"
                className="w-full px-4 py-3 rounded-lg border-2 border-brand-teal/20 bg-white focus:border-brand-teal focus:ring-0 outline-none transition-colors font-body"
              >
                <option value="staff">Staff (Doctor / Nurse)</option>
                <option value="patient">Patient</option>
              </select>
            </div>

            <div className="pt-4">
              <SiteButton disabled={isPending} type="submit" className="w-full md:w-auto font-heading border-2 border-brand-teal bg-brand-teal text-white hover:bg-dark hover:border-brand-teal/20 transition-colors text-lg px-8 py-6">
                {isPending ? 'Creating User...' : 'Create User'}
              </SiteButton>
            </div>
          </form>
        </SiteCardContent>
      </SiteCard>
    </div>
  );
}
