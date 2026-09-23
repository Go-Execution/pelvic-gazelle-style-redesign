// Navbar handled by WebsiteLayout
import SEO from '../components/SEO';
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
import Doctors from '../components/sections/Doctors';

const Home = () => {
  return (
    <div className="bg-white selection:bg-lime selection:text-dark">
      <SEO 
        title="Home"
        description="Pelvic Vitality provides advanced, evidence-based pelvic floor therapy for men and women, featuring the innovative Gazelle Chair for incontinence and pelvic pain relief."
        url="https://pelvicvitality.com/"
      />
      <main>
        <Hero />
        <Symptoms />
        <AboutChair />
        <HowItWorks />
        <Conditions />
        <ForEveryone />
        <WhyChooseUs />
        <Testimonials />
        <Doctors />
        <FAQ />
        <Contact />
      </main>
    </div>
  );
};

export default Home;
