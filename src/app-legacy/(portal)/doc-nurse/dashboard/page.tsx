import { SiteCard, SiteCardContent } from '@/components/ui/SiteCard'
import { SiteButton } from '@/components/ui/SiteButton'
import { Calendar, Users, FileText, ClipboardList } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function StaffDashboard() {
  const supabase = await createClient()

  // Get current staff user
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/doc-nurse/login')
  }

  // Fetch all appointments for this staff member
  const { data: appointments } = await supabase
    .from('appointments')
    .select('*, patients(profiles(first_name, last_name), sessions_completed)')
    .eq('staff_id', user.id)
    .order('scheduled_at', { ascending: true })

  // Calculate some stats based on appointments
  const now = new Date()
  
  // For dummy purposes, we'll just show all upcoming and recent appointments
  const upcomingAppointments = appointments?.filter(a => new Date(a.scheduled_at) > now) || []
  const pastAppointments = appointments?.filter(a => new Date(a.scheduled_at) <= now) || []

  const nextAppointment = upcomingAppointments.length > 0 ? upcomingAppointments[0] : null
  const nextApptName = nextAppointment?.patients?.profiles 
    ? `${nextAppointment.patients.profiles.first_name} ${nextAppointment.patients.profiles.last_name}`
    : 'Unknown'
  
  const formattedNextTime = nextAppointment 
    ? new Date(nextAppointment.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : 'None'

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-extrabold text-brand-ink mb-2">Staff Dashboard</h1>
        <p className="text-muted-foreground font-body text-lg">Manage your schedule and patients.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Today's Patients (Showing total appointments for simplicity) */}
        <SiteCard className="border-brand-teal/20 bg-white/70 backdrop-blur-xl shadow-md">
          <SiteCardContent className="flex flex-row items-center justify-between pb-2">
            <div className="text-sm font-heading font-semibold text-brand-ink">My Patients</div>
            <Users className="h-4 w-4 text-brand-teal" />
          </SiteCardContent>
          <SiteCardContent>
            <div className="text-2xl font-bold font-heading text-brand-ink">{appointments?.length || 0}</div>
            <p className="text-xs text-muted-foreground font-body mt-1">Total appointments</p>
          </SiteCardContent>
        </SiteCard>

        {/* Upcoming Appointments */}
        <SiteCard className="border-brand-teal/20 bg-white/70 backdrop-blur-xl shadow-md">
          <SiteCardContent className="flex flex-row items-center justify-between pb-2">
            <div className="text-sm font-heading font-semibold text-brand-ink">Next Appointment</div>
            <Calendar className="h-4 w-4 text-brand-teal" />
          </SiteCardContent>
          <SiteCardContent>
            <div className="text-2xl font-bold font-heading text-brand-ink">{formattedNextTime}</div>
            <p className="text-xs text-muted-foreground font-body mt-1">{nextApptName}</p>
          </SiteCardContent>
        </SiteCard>

        {/* Pending Reports */}
        <SiteCard className="border-brand-teal/20 bg-white/70 backdrop-blur-xl shadow-md">
          <SiteCardContent className="flex flex-row items-center justify-between pb-2">
            <div className="text-sm font-heading font-semibold text-brand-ink">Pending Reports</div>
            <FileText className="h-4 w-4 text-brand-teal" />
          </SiteCardContent>
          <SiteCardContent>
            <div className="text-2xl font-bold font-heading text-brand-ink">0</div>
            <p className="text-xs text-muted-foreground font-body mt-1">All caught up!</p>
          </SiteCardContent>
        </SiteCard>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <SiteCard className="border-brand-teal/20 bg-white/70 backdrop-blur-xl shadow-md">
          <SiteCardContent>
            <div className="font-heading text-xl">Quick Actions</div>
          </SiteCardContent>
          <SiteCardContent className="space-y-4">
            <Link href="/doc-nurse/patient-reports">
              <SiteButton variant="secondary" className="w-full justify-start mb-2">
                <FileText className="mr-2 h-4 w-4" /> Log Session & Reports
              </SiteButton>
            </Link>
            <Link href="/doc-nurse/patients">
              <SiteButton variant="secondary" className="w-full justify-start mb-2 border-brand-ink text-brand-ink">
                <Users className="mr-2 h-4 w-4" /> View Patient Roster
              </SiteButton>
            </Link>
          </SiteCardContent>
        </SiteCard>

        <SiteCard className="border-brand-teal/20 bg-white/70 backdrop-blur-xl shadow-md">
          <SiteCardContent>
            <div className="font-heading text-xl">My Schedule</div>
          </SiteCardContent>
          <SiteCardContent>
            <div className="space-y-4 font-body">
              {appointments && appointments.length > 0 ? (
                appointments.map((appt: any) => {
                  const profile = appt.patients?.profiles
                  const name = profile ? `${profile.first_name} ${profile.last_name}` : 'Unknown Patient'
                  const time = new Date(appt.scheduled_at).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })
                  
                  return (
                    <div key={appt.id} className="flex items-center justify-between border-b border-brand-teal/10 pb-2">
                      <div>
                        <p className="font-medium text-brand-ink">{time} - {name}</p>
                        <p className="text-sm text-muted-foreground">{appt.notes || 'Routine checkup'}</p>
                      </div>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        appt.status === 'completed' 
                          ? 'text-brand-teal bg-brand-teal/10' 
                          : 'text-brand-ink bg-brand-teal/5'
                      }`}>
                        {appt.status}
                      </span>
                    </div>
                  )
                })
              ) : (
                <p className="text-sm text-muted-foreground">No appointments found.</p>
              )}
            </div>
          </SiteCardContent>
        </SiteCard>
      </div>
    </div>
  )
}
