import SEO from '../components/SEO';
import Doctors from '../components/sections/Doctors';
import Contact from '../components/sections/Contact';

const SpecialistsPage = () => {
  return (
    <div className="bg-white selection:bg-lime selection:text-dark min-h-screen">
      <SEO 
        title="Our Specialists"
        description="Meet the expert pelvic floor therapists at Pelvic Vitality, including Dr. Dianna and Maria L Valenzuela."
        url="https://pelvicvitality.com/specialists"
      />
      <main className="pt-24 md:pt-32">
        <Doctors />
        <Contact />
      </main>
    </div>
  );
};

export default SpecialistsPage;
