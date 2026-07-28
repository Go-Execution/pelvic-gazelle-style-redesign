import { useState, useEffect } from 'react';
import { SiteCard, SiteCardContent } from '@/components/ui/SiteCard';
import { SiteButton } from '@/components/ui/SiteButton';
import { Activity, Calendar, FileText, CheckCircle2, CreditCard, MessageSquare } from 'lucide-react';
import { Link, useOutletContext } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';

export default function PatientDashboard() {
  const { user } = useOutletContext();
  const [patient, setPatient] = useState(null);
  const [nextAppointment, setNextAppointment] = useState(null);
  const [recentReport, setRecentReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!user) return;
      
      const { data: patientData } = await supabase
        .from('patients')
        .select('*')
        .eq('profile_id', user.id)
        .single();
        
      setPatient(patientData);

      if (patientData?.id) {
        const { data: appointments } = await supabase
          .from('appointments')
          .select('*')
          .eq('patient_id', patientData.id)
          .eq('status', 'scheduled')
          .order('scheduled_at', { ascending: true })
          .limit(1);
          
        if (appointments && appointments.length > 0) {
          setNextAppointment(appointments[0]);
        }

        const { data: reports } = await supabase
          .from('reports')
          .select('*')
          .eq('patient_id', patientData.id)
          .order('created_at', { ascending: false })
          .limit(1);
          
        if (reports && reports.length > 0) {
          setRecentReport(reports[0]);
        }
      }
      setLoading(false);
    }
    
    fetchData();
  }, [user]);

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  const totalKegels = patient?.total_kegels_equivalent || 0;
  const sessionsCompleted = patient?.sessions_completed || 0;

  const nextApptDate = nextAppointment 
    ? new Date(nextAppointment.scheduled_at).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })
    : 'None scheduled';
  const nextApptTime = nextAppointment
    ? new Date(nextAppointment.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '';

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-extrabold text-brand-ink mb-2">Welcome Back!</h1>
        <p className="text-muted-foreground font-body text-lg">Here is your pelvic floor therapy progress.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Next Session Card */}
        <SiteCard className="border-brand-teal/20 bg-white/70">
          <SiteCardContent className="p-6">
            <div className="flex flex-row items-center justify-between pb-2">
              <h3 className="text-sm font-heading font-semibold text-brand-ink">Next Session</h3>
              <Calendar className="h-4 w-4 text-brand-teal" />
            </div>
            <div className="text-2xl font-bold font-heading text-brand-ink">{nextApptDate}</div>
            <p className="text-xs text-muted-foreground font-body mt-1">{nextApptTime}</p>
          </SiteCardContent>
        </SiteCard>

        {/* Therapy Progress Card */}
        <SiteCard className="border-brand-teal/20 bg-white/70">
          <SiteCardContent className="p-6">
            <div className="flex flex-row items-center justify-between pb-2">
              <h3 className="text-sm font-heading font-semibold text-brand-ink">Kegels Equivalent</h3>
              <Activity className="h-4 w-4 text-brand-teal" />
            </div>
            <div className="text-2xl font-bold font-heading text-brand-ink">{totalKegels.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground font-body mt-1">Total across all sessions</p>
          </SiteCardContent>
        </SiteCard>

        {/* Sessions Completed */}
        <SiteCard className="border-brand-teal/20 bg-white/70">
          <SiteCardContent className="p-6">
            <div className="flex flex-row items-center justify-between pb-2">
              <h3 className="text-sm font-heading font-semibold text-brand-ink">Sessions Completed</h3>
              <CheckCircle2 className="h-4 w-4 text-brand-teal" />
            </div>
            <div className="text-2xl font-bold font-heading text-brand-ink">{sessionsCompleted} / 6</div>
            <div className="w-full bg-brand-sand/50 h-2 mt-2 rounded-full overflow-hidden">
              <div 
                className="bg-brand-teal/50 h-full transition-all duration-500" 
                style={{ width: `${Math.min(100, (sessionsCompleted / 6) * 100)}%` }}
              ></div>
            </div>
          </SiteCardContent>
        </SiteCard>

        {/* Recent Reports */}
        <SiteCard className="border-brand-teal/20 bg-white/70">
          <SiteCardContent className="p-6">
            <div className="flex flex-row items-center justify-between pb-2">
              <h3 className="text-sm font-heading font-semibold text-brand-ink">Recent Report</h3>
              <FileText className="h-4 w-4 text-brand-teal" />
            </div>
            {recentReport ? (
              <>
                <div className="text-lg font-bold font-heading text-brand-ink truncate" title={recentReport.title}>
                  {recentReport.title}
                </div>
                <p className="text-xs text-muted-foreground font-body mt-1">
                  {new Date(recentReport.created_at).toLocaleDateString()}
                </p>
              </>
            ) : (
              <>
                <div className="text-lg font-bold font-heading text-brand-ink">No Reports</div>
                <p className="text-xs text-muted-foreground font-body mt-1">Check back later</p>
              </>
            )}
          </SiteCardContent>
        </SiteCard>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <SiteCard className="border-brand-teal/20 bg-white/70">
          <SiteCardContent className="p-6">
            <div className="mb-4">
              <h3 className="font-heading text-xl font-bold text-brand-ink">Quick Actions</h3>
              <p className="font-body text-sm text-muted-foreground">Manage your treatment journey</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <SiteButton variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-brand-teal/20 hover:border-brand-teal/50 hover:bg-brand-teal/5" asChild>
                <Link to="/patient/appointments">
                  <Calendar className="h-6 w-6 text-brand-teal" />
                  <span className="font-heading">Book Session</span>
                </Link>
              </SiteButton>
              <SiteButton variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-brand-teal/20 hover:border-brand-teal/50 hover:bg-brand-teal/5" asChild>
                <Link to="/patient/reports">
                  <FileText className="h-6 w-6 text-brand-teal" />
                  <span className="font-heading">View Reports</span>
                </Link>
              </SiteButton>
              <SiteButton variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-brand-teal/20 hover:border-brand-teal/50 hover:bg-brand-teal/5" asChild>
                <Link to="#">
                  <MessageSquare className="h-6 w-6 text-brand-teal" />
                  <span className="font-heading">Message Staff</span>
                </Link>
              </SiteButton>
              <SiteButton variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-brand-teal/20 hover:border-brand-teal/50 hover:bg-brand-teal/5" asChild>
                <Link to="#">
                  <CreditCard className="h-6 w-6 text-brand-teal" />
                  <span className="font-heading">Billing</span>
                </Link>
              </SiteButton>
            </div>
          </SiteCardContent>
        </SiteCard>
      </div>
    </div>
  );
}
