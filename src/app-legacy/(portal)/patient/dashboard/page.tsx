import { SiteCard, SiteCardContent } from '@/components/ui/SiteCard'
import { SiteButton } from '@/components/ui/SiteButton'
import { Activity, Calendar, FileText, CheckCircle2, CreditCard, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function PatientDashboard() {
  const supabase = await createClient()

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/patient/login')
  }

  // Fetch Patient Record
  const { data: patient } = await supabase
    .from('patients')
    .select('*')
    .eq('profile_id', user.id)
    .single()

  // If the user doesn't have a patient record, they are probably not seeded properly
  // but we can default some values
  const totalKegels = patient?.total_kegels_equivalent || 0
  const sessionsCompleted = patient?.sessions_completed || 0
  const patientId = patient?.id

  // Fetch Appointments
  let nextAppointment = null
  if (patientId) {
    const { data: appointments } = await supabase
      .from('appointments')
      .select('*')
      .eq('patient_id', patientId)
      .eq('status', 'scheduled')
      .order('scheduled_at', { ascending: true })
      .limit(1)
    
    if (appointments && appointments.length > 0) {
      nextAppointment = appointments[0]
    }
  }

  const nextApptDate = nextAppointment 
    ? new Date(nextAppointment.scheduled_at).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })
    : 'None scheduled'
  const nextApptTime = nextAppointment
    ? new Date(nextAppointment.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : ''

  // Fetch Recent Report
  let recentReport = null
  if (patientId) {
    const { data: reports } = await supabase
      .from('reports')
      .select('*')
      .eq('patient_id', patientId)
      .order('created_at', { ascending: false })
      .limit(1)
    
    if (reports && reports.length > 0) {
      recentReport = reports[0]
    }
  }

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
            <div className="space-y-4">
              <Link href="/patient/appointments">
                <SiteButton variant="secondary" className="w-full justify-start mb-2">
                  <Calendar className="mr-2 h-4 w-4" /> Book New Session
                </SiteButton>
              </Link>
            </div>
          </SiteCardContent>
        </SiteCard>

        <SiteCard className="border-brand-teal/20 bg-white/70">
          <SiteCardContent className="p-6">
            <div className="mb-4">
              <h3 className="font-heading text-xl font-bold text-brand-ink">Recent Notifications</h3>
              <p className="font-body text-sm text-muted-foreground">Updates from your clinical team</p>
            </div>
            <div className="space-y-4 font-body">
              {nextAppointment && (
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-brand-teal mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-brand-ink">Appointment Reminder</p>
                    <p className="text-sm text-muted-foreground">
                      Your next session is scheduled for {nextApptDate} at {nextApptTime}.
                    </p>
                  </div>
                </div>
              )}
              
              {recentReport && (
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-brand-teal/50 mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-medium text-brand-ink">New Report Available</p>
                    <p className="text-sm text-muted-foreground">
                      A new report "{recentReport.title}" was added to your profile.
                    </p>
                  </div>
                </div>
              )}

              {!nextAppointment && !recentReport && (
                <p className="text-sm text-muted-foreground">No recent notifications.</p>
              )}
            </div>
          </SiteCardContent>
        </SiteCard>
      </div>
    </div>
  )
}
