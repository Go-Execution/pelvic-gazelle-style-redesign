import SEO from '../components/SEO';
import InnerPageHero from '../components/shared/InnerPageHero';
import FAQ from '../components/sections/FAQ';

const FAQPage = () => {
  return (
    <>
      <SEO title="Frequently Asked Questions - Pelvic Vitality" description="Find answers to common questions about our treatments." />
      <InnerPageHero title="Frequently Asked Questions" subtitle="Find answers to common questions about our treatments." />
      <FAQ />
    </>
  );
};

export default FAQPage;
