import SEO from '../components/SEO';
import InnerPageHero from '../components/shared/InnerPageHero';
import Contact from '../components/sections/Contact';

const ContactPage = () => {
  return (
    <>
      <SEO 
        title="Contact Us"
        description="Get in touch with Pelvic Vitality. Schedule an appointment for advanced pelvic floor therapy and the Gazelle Chair treatment."
        url="https://pelvicvitality.com/contact"
      />
      <InnerPageHero title="Contact Us" subtitle="We are here to help. Reach out to schedule a consultation." />
      <Contact />
    </>
  );
};

export default ContactPage;
