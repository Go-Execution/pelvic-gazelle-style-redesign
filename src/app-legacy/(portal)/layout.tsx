import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { LogOut, Home, Calendar, FileText, User, Users, CreditCard, MessageSquare, Activity } from 'lucide-react'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/')
  }

  // Fetch the user's role from the profiles table
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  const role = profile?.role || 'patient'
  // Define navigation based on role
  let navItems = []
  if (role === 'admin') {
    navItems = [
      { name: 'Dashboard', href: '/admin/dashboard', icon: Home },
      { name: 'Profile', href: '/admin/profile', icon: User },
    ]
  } else if (role === 'staff') {
    navItems = [
      { name: 'Dashboard', href: '/doc-nurse/dashboard', icon: Home },
      { name: 'Patients', href: '/doc-nurse/patients', icon: Users },
      { name: 'Patient Reports', href: '/doc-nurse/patient-reports', icon: FileText },
      { name: 'Profile', href: '/doc-nurse/profile', icon: User },
    ]
  } else {
    navItems = [
      { name: 'Dashboard', href: '/patient/dashboard', icon: Home },
      { name: 'Appointments', href: '/patient/appointments', icon: Calendar },
      { name: 'Reports', href: '/patient/reports', icon: FileText },
      { name: 'Profile', href: '/patient/profile', icon: User },
    ]
  }

  return (
    <div className="flex min-h-screen bg-brand-sand/30">
      {/* Sidebar */}
      <aside className="w-64 bg-white/50 backdrop-blur-md border-r border-brand-teal/20 hidden md:flex flex-col">
        <div className="p-6 border-b border-brand-teal/20 flex justify-center">
          <Image src="/logo.jpg" alt="Pelvic Vitality Logo" width={150} height={50} className="object-contain" />
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="flex items-center space-x-3 px-4 py-3 text-brand-ink hover:bg-brand-teal/10 hover:text-brand-teal rounded-xl transition-colors font-heading font-medium"
            >
              <item.icon className="h-5 w-5 text-brand-teal" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-brand-teal/20">
          <form action="/auth/signout" method="post">
            <button className="flex w-full items-center space-x-3 px-4 py-3 text-brand-ink hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors font-heading font-medium">
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="bg-white/50 backdrop-blur-md border-b border-brand-teal/20 p-4 flex justify-between items-center md:hidden">
          <div className="flex items-center">
            <Image src="/logo.jpg" alt="Pelvic Vitality Logo" width={120} height={40} className="object-contain" />
          </div>
          {/* Mobile menu button would go here */}
        </header>
        <div className="p-8 flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
