import SEO from '../components/SEO';
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
      <Symptoms />
      <Testimonials />
    </>
  );
};

export default SymptomsPage;
