// Navbar handled by WebsiteLayout
import Hero from '../components/sections/Hero';
import Symptoms from '../components/sections/Symptoms';
import AboutChair from '../components/sections/AboutChair';
import HowItWorks from '../components/sections/HowItWorks';
import Conditions from '../components/sections/Conditions';
import ForEveryone from '../components/sections/ForEveryone';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import Testimonials from '../components/sections/Testimonials';
import FAQ from '../components/sections/FAQ';
import Contact from '../components/sections/Contact';

const Home = () => {
  return (
    <div className="bg-white selection:bg-lime selection:text-dark">
      <main>
        <Hero />
        <Symptoms />
        <AboutChair />
        <HowItWorks />
        <Conditions />
        <ForEveryone />
        <WhyChooseUs />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
    </div>
  );
};

export default Home;
