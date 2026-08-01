import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative w-full min-h-[95vh] flex items-center bg-dark pt-20 overflow-hidden">
      {/* Background with Dark Teal Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-primary to-[#131415] opacity-90 mix-blend-multiply z-10" />
        <div className="absolute inset-0 bg-[#131415] opacity-70 z-10" />
        {/* We can use a solid color if image fails to load, or use the image from vercel */}
        <img 
          src="https://pelvic-vitality.vercel.app/images/hero-bg.png" 
          alt="Clinic Background" 
          className="w-full h-full object-cover object-center grayscale z-0"
        />
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[70px] font-heading font-normal text-white mb-6 leading-[1.1]"
          >
            Reclaim Your <span className="text-lime font-medium">Confidence</span> and <span className="text-lime font-medium">Freedom</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl font-body text-white/90 mb-10 max-w-2xl leading-relaxed font-medium space-y-4"
          >
            <p>Experience Advanced Pelvic Floor Rehabilitation</p>
            <p>The Gazelle Chair offers a non-invasive, evidence-informed approach to strengthening pelvic floor musculature. Using targeted neuromuscular stimulation, this therapy enhances muscle function without discomfort or the need for disrobing.</p>
            <p>Effective pelvic floor therapy for men and women.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 w-full justify-center px-4 sm:px-0"
          >
            <Link 
              to="/contact"
              className="bg-primary hover:bg-opacity-90 text-white px-6 py-4 md:px-[32px] md:py-[16px] rounded-button font-heading font-medium text-lg md:text-[21px] transition-all duration-300 shadow-sm w-full sm:w-auto text-center"
            >
              Book Your Consultation
            </Link>
            <Link 
              to="/about-chair"
              className="bg-transparent border border-white hover:bg-white hover:text-dark text-white px-6 py-4 md:px-[32px] md:py-[16px] rounded-button font-heading font-medium text-lg md:text-[21px] transition-all duration-300 w-full sm:w-auto text-center"
            >
              Learn How It Works
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
