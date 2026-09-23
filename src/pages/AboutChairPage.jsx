import SEO from '../components/SEO';
import AboutChair from '../components/sections/AboutChair';
import HowItWorks from '../components/sections/HowItWorks';
import WhyChooseUs from '../components/sections/WhyChooseUs';

const AboutChairPage = () => {
  return (
    <>
      <SEO 
        title="About The Gazelle Chair"
        description="Discover the Gazelle Chair, an advanced non-invasive treatment for strengthening pelvic floor muscles. FDA cleared and evidence-based."
        url="https://pelvicvitality.com/about-chair"
      />
      <AboutChair />
      <HowItWorks />
      <WhyChooseUs />
    </>
  );
};

export default AboutChairPage;
