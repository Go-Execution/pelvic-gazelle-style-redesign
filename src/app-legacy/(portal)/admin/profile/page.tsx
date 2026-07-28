import { SiteCard, SiteCardContent } from '@/components/ui/SiteCard'
import { SiteButton } from '@/components/ui/SiteButton'
import { Shield, Mail } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { AdminProfileForm } from '@/components/profile/AdminProfileForm'

export default async function AdminProfilePage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  // Fetch the user's profile from the database
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (profile?.role !== 'admin') {
    redirect('/doc-nurse/dashboard')
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
              <AdminProfileForm profile={profile} />
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
                <p className="font-body text-brand-ink">{user.email}</p>
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
  )
}

