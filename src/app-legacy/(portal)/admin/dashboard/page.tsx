import { SiteCard, SiteCardContent } from '@/components/ui/SiteCard'
import { SiteButton } from '@/components/ui/SiteButton'
import { Users, Activity, Banknote, CalendarCheck } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Get current user and role
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    redirect('/doc-nurse/dashboard')
  }

  // 1. Fetch Total Patients
  const { count: patientsCount } = await supabase
    .from('patients')
    .select('*', { count: 'exact', head: true })

  // 2. Fetch Total Sessions
  const { count: sessionsCount } = await supabase
    .from('treatment_sessions')
    .select('*', { count: 'exact', head: true })

  // 3. Fetch Appointments Today
  // For simplicity, we just count all scheduled appointments, or we could filter by date
  // Since we're using dummy data, we'll just get all upcoming appointments
  const { count: appointmentsCount } = await supabase
    .from('appointments')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'scheduled')

  // 4. Fetch Revenue (sum of paid invoices)
  const { data: invoices } = await supabase
    .from('invoices')
    .select('amount')
    .eq('status', 'paid')

  const totalRevenue = invoices?.reduce((sum, inv) => sum + Number(inv.amount), 0) || 0

  // 5. Fetch Recent Activity
  const { data: recentInvoices } = await supabase
    .from('invoices')
    .select('id, amount, status, created_at, patients(profiles(first_name, last_name))')
    .order('created_at', { ascending: false })
    .limit(3)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-extrabold text-brand-ink mb-2">Clinic Administration</h1>
        <p className="text-muted-foreground font-body text-lg">Overview of clinic performance and operations.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <SiteCard className="border-brand-teal/20 bg-white/70 backdrop-blur-xl shadow-md">
          <SiteCardContent className="flex flex-row items-center justify-between pb-2">
            <div className="text-sm font-heading font-semibold text-brand-ink">Active Patients</div>
            <Users className="h-4 w-4 text-brand-teal" />
          </SiteCardContent>
          <SiteCardContent>
            <div className="text-2xl font-bold font-heading text-brand-ink">{patientsCount || 0}</div>
            <p className="text-xs text-muted-foreground font-body mt-1">Total registered</p>
          </SiteCardContent>
        </SiteCard>

        <SiteCard className="border-brand-teal/20 bg-white/70 backdrop-blur-xl shadow-md">
          <SiteCardContent className="flex flex-row items-center justify-between pb-2">
            <div className="text-sm font-heading font-semibold text-brand-ink">Total Gazelle Sessions</div>
            <Activity className="h-4 w-4 text-brand-teal" />
          </SiteCardContent>
          <SiteCardContent>
            <div className="text-2xl font-bold font-heading text-brand-ink">{sessionsCount || 0}</div>
            <p className="text-xs text-muted-foreground font-body mt-1">Lifetime</p>
          </SiteCardContent>
        </SiteCard>

        <SiteCard className="border-brand-teal/20 bg-white/70 backdrop-blur-xl shadow-md">
          <SiteCardContent className="flex flex-row items-center justify-between pb-2">
            <div className="text-sm font-heading font-semibold text-brand-ink">Scheduled Appointments</div>
            <CalendarCheck className="h-4 w-4 text-brand-teal" />
          </SiteCardContent>
          <SiteCardContent>
            <div className="text-2xl font-bold font-heading text-brand-ink">{appointmentsCount || 0}</div>
            <p className="text-xs text-muted-foreground font-body mt-1">Upcoming</p>
          </SiteCardContent>
        </SiteCard>
        
        <SiteCard className="border-brand-teal/20 bg-white/70 backdrop-blur-xl shadow-md">
          <SiteCardContent className="flex flex-row items-center justify-between pb-2">
            <div className="text-sm font-heading font-semibold text-brand-ink">Total Revenue</div>
            <Banknote className="h-4 w-4 text-brand-teal" />
          </SiteCardContent>
          <SiteCardContent>
            <div className="text-2xl font-bold font-heading text-brand-ink">
              ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </div>
            <p className="text-xs text-muted-foreground font-body mt-1">All time</p>
          </SiteCardContent>
        </SiteCard>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <SiteCard className="border-brand-teal/20 bg-white/70 backdrop-blur-xl shadow-md">
          <SiteCardContent>
            <div className="font-heading text-xl">Quick Actions</div>
          </SiteCardContent>
          <SiteCardContent>
            <Link href="/admin/users">
              <SiteButton variant="primary" className="w-full justify-start mb-2">
                <Users className="mr-2 h-4 w-4" /> Manage Staff & Users
              </SiteButton>
            </Link>
          </SiteCardContent>
        </SiteCard>

        <SiteCard className="border-brand-teal/20 bg-white/70 backdrop-blur-xl shadow-md">
          <SiteCardContent>
            <div className="font-heading text-xl">Recent Invoices</div>
          </SiteCardContent>
          <SiteCardContent>
            <div className="space-y-4 font-body">
              {recentInvoices && recentInvoices.length > 0 ? (
                recentInvoices.map((invoice: any) => {
                  const profile = invoice.patients?.profiles
                  const name = profile ? `${profile.first_name} ${profile.last_name}` : 'Unknown Patient'
                  
                  return (
                    <div key={invoice.id} className="flex items-center justify-between border-b border-brand-teal/10 pb-2">
                      <p className="text-sm text-brand-ink">
                        <span className="font-semibold">{name}</span> - ${invoice.amount} ({invoice.status})
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {new Date(invoice.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  )
                })
              ) : (
                <p className="text-sm text-muted-foreground">No recent invoices.</p>
              )}
            </div>
          </SiteCardContent>
        </SiteCard>
      </div>
    </div>
  )
}
