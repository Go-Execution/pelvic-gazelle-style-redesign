import { useState, useEffect } from 'react';
import { SiteCard, SiteCardContent } from '@/components/ui/SiteCard';
import { SiteButton } from '@/components/ui/SiteButton';
import { Shield, Mail } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { PatientProfileForm } from '@/components/profile/PatientProfileForm';

export default function PatientProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [patientInfo, setPatientInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const { data: { user: currentUser } } = await supabase.auth.getUser();
        
        if (!currentUser) {
          navigate('/patient/login');
          return;
        }

        setUser(currentUser);

        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', currentUser.id)
          .single();
          
        if (profileError && profileError.code !== 'PGRST116') throw profileError;
        setProfile(profileData || {});

        const { data: patientData, error: patientError } = await supabase
          .from('patients')
          .select('*')
          .eq('profile_id', currentUser.id)
          .single();
          
        if (patientError && patientError.code !== 'PGRST116') throw patientError;
        setPatientInfo(patientData || {});

      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-teal"></div>
      </div>
    );
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
              <PatientProfileForm profile={profile} patientInfo={patientInfo} />
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
                <p className="font-body text-brand-ink">{user?.email}</p>
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
