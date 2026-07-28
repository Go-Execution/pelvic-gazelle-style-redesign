import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const WebsiteLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white selection:bg-lime selection:text-dark">
      <Navbar />
      <main className="flex-grow pt-[88px] md:pt-[104px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default WebsiteLayout;
