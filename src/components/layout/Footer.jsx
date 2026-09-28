import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-12 md:py-16 border-t-4 border-primary">
      <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="inline-block mb-6">
            <div className="bg-white rounded-[5px] inline-flex shadow-sm border-2 border-primary">
              <img src="/images/pelvic-logo.png" alt="Pelvic Vitality Logo" className="h-14 md:h-16 lg:h-20 w-auto" />
            </div>
          </Link>
          <p className="text-white/70 font-body font-medium max-w-sm mb-6">
            Advanced, non-invasive electromagnetic pelvic floor therapy to restore your strength, confidence, and comfort.
          </p>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-lg mb-4 text-lime">Quick Links</h4>
          <ul className="space-y-2 font-body font-medium">
            <li><Link to="/symptoms" className="text-white/70 hover:text-white transition-colors">Symptoms</Link></li>
            <li><Link to="/about-chair" className="text-white/70 hover:text-white transition-colors">The Gazelle Chair</Link></li>
            <li><Link to="/conditions" className="text-white/70 hover:text-white transition-colors">Conditions We Treat</Link></li>
            <li><Link to="/blogs" className="text-white/70 hover:text-white transition-colors">Blogs</Link></li>
            <li><Link to="/faqs" className="text-white/70 hover:text-white transition-colors">FAQs</Link></li>
            <li><Link to="/contact" className="text-white/70 hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading font-semibold text-lg mb-4 text-lime">Legal</h4>
          <ul className="space-y-2 font-body font-medium">
            <li><Link to="/privacy-policy" className="text-white/70 hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms-of-service" className="text-white/70 hover:text-white transition-colors">Terms of Service</Link></li>
            <li><Link to="/hipaa-notice" className="text-white/70 hover:text-white transition-colors">HIPAA Notice</Link></li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 lg:px-8 mt-12 pt-8 border-t border-white/10 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-white/50 text-sm font-body font-medium">
        <p>© {new Date().getFullYear()} Pelvic Vitality. All rights reserved.</p>
        <p className="mt-4 md:mt-0">Designed for advanced clinical care.</p>
      </div>
    </footer>
  );
};

export default Footer;
