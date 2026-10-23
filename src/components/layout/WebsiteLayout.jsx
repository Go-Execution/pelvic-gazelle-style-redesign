import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ResearchSurveyModal from '../survey/ResearchSurveyModal';

const WebsiteLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white selection:bg-lime selection:text-dark">
      <Navbar />
      <main className="flex-grow pt-[88px] md:pt-[104px]">
        <Outlet />
      </main>
      <Footer />
      {/* Floating Survey Action Button & Popup Modal replacing old chatbot */}
      <ResearchSurveyModal />
    </div>
  );
};

export default WebsiteLayout;
