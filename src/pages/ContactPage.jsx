import SEO from '../components/SEO';
import Contact from '../components/sections/Contact';

const ContactPage = () => {
  return (
    <>
      <SEO 
        title="Contact Us"
        description="Get in touch with Pelvic Vitality. Schedule an appointment for advanced pelvic floor therapy and the Gazelle Chair treatment."
        url="https://pelvicvitality.com/contact"
      />
      <Contact />
    </>
  );
};

export default ContactPage;
