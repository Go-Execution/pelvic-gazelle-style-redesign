import Doctors from '../components/sections/Doctors';
import Contact from '../components/sections/Contact';

const SpecialistsPage = () => {
  return (
    <div className="bg-white selection:bg-lime selection:text-dark min-h-screen">
      <main className="pt-24 md:pt-32">
        <Doctors />
        <Contact />
      </main>
    </div>
  );
};

export default SpecialistsPage;
