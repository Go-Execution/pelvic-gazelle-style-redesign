import { motion } from 'framer-motion';

const InnerPageHero = ({ title, subtitle, bgImage = "https://pelvic-vitality.vercel.app/images/hero-bg.png" }) => {
  return (
    <section className="relative w-full py-20 md:py-28 flex items-center bg-dark pt-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-primary to-[#131415] opacity-90 mix-blend-multiply z-10" />
        <div className="absolute inset-0 bg-[#131415] opacity-70 z-10" />
        <img 
          src={bgImage} 
          alt="Background" 
          className="w-full h-full object-cover object-center grayscale z-0"
        />
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-6xl font-heading font-normal text-white mb-4"
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-lg md:text-xl font-body text-white/90 max-w-2xl mx-auto"
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  );
};

export default InnerPageHero;
