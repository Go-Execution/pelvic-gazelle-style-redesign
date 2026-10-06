import SEO from '../components/SEO';
import InnerPageHero from '../components/shared/InnerPageHero';
import Symptoms from '../components/sections/Symptoms';
import Testimonials from '../components/sections/Testimonials';

const SymptomsPage = () => {
  return (
    <>
      <SEO 
        title="Symptoms We Treat"
        description="Experiencing incontinence, pelvic pain, or weak pelvic muscles? Learn about the symptoms Pelvic Vitality treats using advanced therapy."
        url="https://pelvicvitality.com/symptoms"
      />
      <InnerPageHero title="Symptoms" subtitle="Understand the common signs of pelvic floor dysfunction." />
      <Symptoms />
      <Testimonials />
    </>
  );
};

export default SymptomsPage;
