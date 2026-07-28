import { useState, useEffect } from 'react';
import { SiteCard, SiteCardContent } from '@/components/ui/SiteCard';
import { SiteButton } from '@/components/ui/SiteButton';
import { Users, UserPlus, Settings, ShieldAlert } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';

export default function AdminUsers() {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/admin/login');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profile?.role !== 'admin') {
        navigate('/portal/staff/dashboard');
        return;
      }

      // We must fetch from profiles. If RLS blocks it, we would need to use a Supabase Edge Function 
      // or similar, but for now we attempt to fetch directly assuming admin can select *.
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .order('role', { ascending: true })
        .order('first_name', { ascending: true });

      setProfiles(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRole = async (e, userId) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newRole = formData.get('role');
    
    // In a real application, updating another user's role securely would require an Edge Function
    // using the service role key to bypass RLS, or a strict RLS policy that allows admins to update roles.
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);
        
      if (error) throw error;
      fetchUsers(); // refresh
    } catch (error) {
      console.error('Error updating role:', error);
      alert('Failed to update role. You may need admin RLS policies configured on the profiles table.');
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-brand-ink">Loading users...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-extrabold text-brand-ink mb-2">Manage Users & Staff</h1>
          <p className="text-muted-foreground font-body text-lg">Control access and assign roles to clinic staff.</p>
        </div>
        <Link to="/admin/users/add">
          <SiteButton className="font-heading border-2 border-brand-teal bg-brand-teal text-white hover:bg-dark hover:border-brand-teal/20 transition-colors">
            <UserPlus className="mr-2 h-4 w-4" /> Add New Staff
          </SiteButton>
        </Link>
      </div>

      <SiteCard className="border-brand-teal/20 bg-white/70 backdrop-blur-xl shadow-md">
        <SiteCardContent>
          <div className="font-heading text-xl flex items-center">
            <Users className="mr-2 h-5 w-5 text-brand-teal" /> Registered Users
          </div>
          <p className="font-body">List of all registered users in the system.</p>
        </SiteCardContent>
        <SiteCardContent>
          <div className="space-y-4">
            {profiles && profiles.length > 0 ? (
              profiles.map((profile) => (
                <div key={profile.id} className="flex flex-col md:flex-row md:items-center justify-between border-2 border-brand-teal/10 p-4 rounded-md">
                  <div className="space-y-1">
                    <div className="flex items-center text-brand-ink font-heading font-bold text-lg">
                      {profile.first_name || profile.last_name 
                        ? `${profile.first_name || ''} ${profile.last_name || ''}`
                        : 'Unnamed User'}
                    </div>
                    <div className="text-sm text-muted-foreground font-body">
                      Current Role: <span className="font-semibold text-brand-teal capitalize">{profile.role}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0">
                    {profile.role === 'admin' ? (
                      <div className="flex items-center text-sm font-semibold text-brand-ink/60 bg-brand-sand px-3 py-2 rounded-md">
                        <ShieldAlert className="w-4 h-4 mr-2" />
                        Admin Role
                      </div>
                    ) : (
                      <form onSubmit={(e) => handleUpdateRole(e, profile.id)} className="flex items-center gap-2">
                        <select 
                          name="role" 
                          defaultValue={profile.role} 
                          className="px-3 py-2 border-2 border-brand-teal/20 rounded-md font-body text-sm bg-white"
                        >
                          <option value="patient">Patient</option>
                          <option value="staff">Staff</option>
                        </select>
                        <SiteButton type="submit" variant="outline" className="border-2 border-brand-teal/20 hover:bg-brand-teal/10 text-xs">
                          <Settings className="mr-1 h-3 w-3" /> Update
                        </SiteButton>
                      </form>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">No users found.</p>
            )}
          </div>
        </SiteCardContent>
      </SiteCard>
    </div>
  );
}
