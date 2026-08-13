import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Symptoms', href: '/symptoms' },
    { name: 'The Gazelle Chair', href: '/about-chair' },
    { name: 'Conditions', href: '/conditions' },
    { name: 'Our Specialists', href: '/specialists' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-white py-5'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src="/images/pelvic-logo.png" alt="Pelvic Vitality Logo" className="h-16 md:h-18 lg:h-20 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-[16px] font-body font-medium text-dark hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/contact"
            className="bg-primary hover:bg-opacity-90 text-white px-[32px] py-[16px] rounded-button font-heading font-medium text-[21px] transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Book Consultation
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-dark p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100">
          <div className="flex flex-col p-4 space-y-4">
            {navLinks.map((link) => (
               <Link
                 key={link.name}
                 to={link.href}
                 className="text-dark font-body font-medium hover:text-primary transition-colors py-2 border-b border-gray-50"
                 onClick={() => setMobileMenuOpen(false)}
               >
                 {link.name}
               </Link>
             ))}
             <Link
               to="/contact"
               className="bg-primary text-white text-center px-6 py-4 rounded-button font-heading font-medium transition-colors mt-4 text-[18px]"
               onClick={() => setMobileMenuOpen(false)}
             >
               Book Consultation
             </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
