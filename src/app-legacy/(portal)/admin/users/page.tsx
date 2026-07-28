import { SiteCard, SiteCardContent } from '@/components/ui/SiteCard'
import { SiteButton } from '@/components/ui/SiteButton'
import { Users, UserPlus, Settings, ShieldAlert } from 'lucide-react'
import { createClient } from '@/utils/supabase/server'
import { updateUserRole } from '@/app/actions/admin'
import Link from 'next/link'

export default async function AdminUsers() {
  // Use the admin client to bypass RLS so we can see ALL users
  const { createClient: createSupabaseClient } = await import('@supabase/supabase-js')
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  const { redirect } = await import('next/navigation')
  
  // Protect route
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user!.id)
    .single()

  if (profile?.role !== 'admin') {
    redirect('/doc-nurse/dashboard')
  }

  const supabaseAdmin = createSupabaseClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  // Fetch all profiles
  const { data: profiles } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .order('role', { ascending: true })
    .order('first_name', { ascending: true })

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-extrabold text-brand-ink mb-2">Manage Users & Staff</h1>
          <p className="text-muted-foreground font-body text-lg">Control access and assign roles to clinic staff.</p>
        </div>
        <Link href="/admin/users/add">
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
              profiles.map((profile: any) => (
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
                        Admin Role (Editable via Supabase only)
                      </div>
                    ) : (
                      <form action={updateUserRole as any} className="flex items-center gap-2">
                        <input type="hidden" name="userId" value={profile.id} />
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
  )
}
