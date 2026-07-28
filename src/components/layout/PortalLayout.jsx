import { useState, useEffect } from 'react';
import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { LogOut, Home, Calendar, FileText, User, Users } from 'lucide-react';

export default function PortalLayout() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('patient');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/');
        return;
      }

      setUser(user);

      // Fetch role
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profile?.role) {
        setRole(profile.role);
      }
      setLoading(false);
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = async (e) => {
    e.preventDefault();
    await supabase.auth.signOut();
    navigate('/');
  };

  let navItems = [];
  if (role === 'admin') {
    navItems = [
      { name: 'Dashboard', href: '/admin/dashboard', icon: Home },
      { name: 'Profile', href: '/admin/profile', icon: User },
    ];
  } else if (role === 'staff') {
    navItems = [
      { name: 'Dashboard', href: '/doc-nurse/dashboard', icon: Home },
      { name: 'Patients', href: '/doc-nurse/patients', icon: Users },
      { name: 'Patient Reports', href: '/doc-nurse/patient-reports', icon: FileText },
      { name: 'Profile', href: '/doc-nurse/profile', icon: User },
    ];
  } else {
    navItems = [
      { name: 'Dashboard', href: '/patient/dashboard', icon: Home },
      { name: 'Appointments', href: '/patient/appointments', icon: Calendar },
      { name: 'Reports', href: '/patient/reports', icon: FileText },
      { name: 'Profile', href: '/patient/profile', icon: User },
    ];
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-brand-sand">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-brand-sand/30">
      {/* Sidebar */}
      <aside className="w-64 bg-white/50 backdrop-blur-md border-r border-brand-teal/20 hidden md:flex flex-col">
        <div className="p-6 border-b border-brand-teal/20 flex justify-center">
          <img src="/images/pelvic-logo.png" alt="Pelvic Vitality Logo" className="object-contain h-12 md:h-16 w-auto" />
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link 
              key={item.name} 
              to={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors font-heading font-medium ${location.pathname === item.href ? 'bg-brand-teal/10 text-brand-teal' : 'text-brand-ink hover:bg-brand-teal/10 hover:text-brand-teal'}`}
            >
              <item.icon className="h-5 w-5 text-brand-teal" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-brand-teal/20">
          <form onSubmit={handleLogout}>
            <button type="submit" className="flex w-full items-center space-x-3 px-4 py-3 text-brand-ink hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors font-heading font-medium">
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
            <img src="/images/pelvic-logo.png" alt="Pelvic Vitality Logo" className="object-contain w-24" />
          </div>
          {/* Mobile menu button would go here */}
        </header>
        <div className="p-8 flex-1 overflow-y-auto">
          <Outlet context={{ user, role }} />
        </div>
      </main>
    </div>
  );
}
