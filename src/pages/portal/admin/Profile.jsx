import { useState, useEffect } from 'react';
import { SiteCard, SiteCardContent } from '@/components/ui/SiteCard';
import { SiteButton } from '@/components/ui/SiteButton';
import { Shield, Mail } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { AdminProfileForm } from '@/components/profile/AdminProfileForm';

export default function AdminProfile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate('/admin/login');
          return;
        }

        setUserEmail(user.email);

        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileData?.role !== 'admin') {
          navigate('/portal/staff/dashboard');
          return;
        }

        setProfile(profileData);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return <div className="p-8 text-center text-brand-ink">Loading profile...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-extrabold text-brand-ink mb-2">My Profile</h1>
        <p className="text-muted-foreground font-body text-lg">Manage your personal information and preferences.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Info */}
        <div className="md:col-span-2 space-y-6">
          <SiteCard className="border-brand-teal/20 bg-white/70">
            <SiteCardContent className="p-6">
              {profile && <AdminProfileForm profile={profile} />}
            </SiteCardContent>
          </SiteCard>
        </div>

        {/* Sidebar settings */}
        <div className="space-y-6">
          <SiteCard className="border-brand-teal/20 bg-white/70">
            <SiteCardContent className="p-6 space-y-6">
              <div>
                <h3 className="font-heading text-xl font-bold text-brand-ink mb-2 flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-brand-teal" /> Account Email
                </h3>
                <p className="font-body text-brand-ink">{userEmail}</p>
                <p className="text-xs text-muted-foreground mt-1">Email changes must be done via Supabase dashboard.</p>
              </div>

              <div className="border-t border-brand-teal/10 pt-6">
                <h3 className="font-heading text-xl font-bold text-brand-ink mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-brand-teal" /> Security
                </h3>
                <SiteButton variant="secondary" className="w-full justify-start text-brand-ink border-brand-ink">
                  Change Password
                </SiteButton>
              </div>
            </SiteCardContent>
          </SiteCard>
        </div>
      </div>
    </div>
  );
}
