import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/layout/ScrollToTop';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WebsiteLayout from './components/layout/WebsiteLayout';
import Home from './pages/Home';
import PortalLayout from './components/layout/PortalLayout';

// Dedicated Pages
import SymptomsPage from './pages/SymptomsPage';
import AboutChairPage from './pages/AboutChairPage';
import ConditionsPage from './pages/ConditionsPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import SpecialistsPage from './pages/SpecialistsPage';
import BlogsPage from './pages/BlogsPage';
import BlogDetailPage from './pages/BlogDetailPage';
import SurveyPage from './pages/SurveyPage';

// Legal Pages
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import HipaaNoticePage from './pages/HipaaNoticePage';

// Auth Pages
import AdminLogin from './pages/auth/AdminLogin';
import AdminSignup from './pages/auth/AdminSignup';
import PatientLogin from './pages/auth/PatientLogin';
import PatientSignup from './pages/auth/PatientSignup';
import StaffLogin from './pages/auth/StaffLogin';
import StaffSignup from './pages/auth/StaffSignup';

// Dashboards
import PatientDashboard from './pages/portal/patient/Dashboard';
import PatientProfile from './pages/portal/patient/Profile';
import PatientAppointments from './pages/portal/patient/Appointments';
import PatientReports from './pages/portal/patient/Reports';
import AdminDashboard from './pages/portal/admin/Dashboard';
import AdminUsers from './pages/portal/admin/Users';
import AdminAddUser from './pages/portal/admin/AddUser';
import AdminProfile from './pages/portal/admin/Profile';
import StaffDashboard from './pages/portal/staff/Dashboard';
import StaffProfile from './pages/portal/staff/Profile';
import StaffPatients from './pages/portal/staff/Patients';
import StaffPatientReports from './pages/portal/staff/PatientReports';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Main Website Routes */}
        <Route element={<WebsiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/symptoms" element={<SymptomsPage />} />
          <Route path="/about-chair" element={<AboutChairPage />} />
          <Route path="/conditions" element={<ConditionsPage />} />
          <Route path="/specialists" element={<SpecialistsPage />} />
          <Route path="/faqs" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/survey" element={<SurveyPage />} />
          <Route path="/research-survey" element={<SurveyPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/:id" element={<BlogDetailPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />
          <Route path="/hipaa-notice" element={<HipaaNoticePage />} />
        </Route>
        
        {/* Auth Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        
        <Route path="/patient/login" element={<PatientLogin />} />
        <Route path="/patient/signup" element={<PatientSignup />} />
        
        <Route path="/doc-nurse/login" element={<StaffLogin />} />
        <Route path="/doc-nurse/signup" element={<StaffSignup />} />

        {/* Portal Routes */}
        <Route element={<PortalLayout />}>
          <Route path="/patient/dashboard" element={<PatientDashboard />} />
          <Route path="/patient/appointments" element={<PatientAppointments />} />
          <Route path="/patient/reports" element={<PatientReports />} />
          <Route path="/patient/profile" element={<PatientProfile />} />
          
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/users/add" element={<AdminAddUser />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          
          <Route path="/doc-nurse/dashboard" element={<StaffDashboard />} />
          <Route path="/doc-nurse/patients" element={<StaffPatients />} />
          <Route path="/doc-nurse/patient-reports" element={<StaffPatientReports />} />
          <Route path="/doc-nurse/profile" element={<StaffProfile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
