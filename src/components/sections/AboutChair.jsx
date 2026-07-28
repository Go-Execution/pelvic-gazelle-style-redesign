import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutChair = () => {
  return (
    <>
      {/* What is the Pelvic Floor? */}
      <section className="py-12 md:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2">
              <div className="bg-smoke p-4 rounded-[10px] border-2 border-dark shadow-sm h-[300px] md:h-[400px]">
                 <img src="/images/pelvic imageavif.avif" alt="Pelvic Anatomy" className="w-full h-full object-cover rounded-[5px]" />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <div className="flex flex-col gap-4 mb-6">
                <span className="text-sm font-heading font-medium tracking-widest uppercase text-primary">
                  Understanding Your Body
                </span>
                <h2 className="text-3xl md:text-5xl font-heading font-normal text-dark leading-[1.1]">
                  What is the Pelvic Floor?
                </h2>
              </div>
              <div className="space-y-4 text-dark/80 text-[16px] font-body font-medium leading-relaxed">
                <p>
                  The pelvic floor is a sling of muscles that supports the bladder, bowel, and uterus. When these muscles weaken due to childbirth, aging, or surgery, it leads to issues like incontinence and pelvic pain.
                </p>
                <p>
                  Traditional Kegel exercises can be difficult to perform correctly and consistently. That's why we use advanced technology to retrain these muscles for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Gazelle Chair */}
      <section id="gazelle-chair" className="py-12 md:py-32 bg-primary text-white">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center mb-10 md:mb-20">
            <span className="text-2xl md:text-3xl font-heading font-bold text-gold mb-2 capitalize">
              Introducing
            </span>
            <h2 className="text-6xl md:text-[100px] font-heading font-black text-smoke tracking-widest leading-none uppercase drop-shadow-md">
              Gazelle
            </h2>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 relative items-center">
            <div className="w-full md:w-1/2 space-y-8">
              <div className="text-[18px] leading-relaxed font-body font-medium">
                <p>
                  The Gazelle is an FDA Cleared device designed to strengthen your pelvic floor in 20 minute session, while you sit fully clothed.
                </p>
              </div>
              <div className="text-[18px] leading-relaxed font-body font-medium">
                <p>
                  Backed by over 44 clinical studies, this non-invasive treatment effectively targets Stress Incontinence, Urge Incontinence, Overactive Bladder, Hemorrhoids, General Pelvic Inflammation, Erectile Dysfunction, and more.
                </p>
              </div>
              
              <ul className="space-y-6 text-[18px] font-body font-medium mt-8">
                <li className="flex items-center gap-4">
                  <CheckCircle2 className="text-lime w-6 h-6 flex-shrink-0" />
                  <span>No surgery, no downtime</span>
                </li>
                <li className="flex items-center gap-4">
                  <CheckCircle2 className="text-lime w-6 h-6 flex-shrink-0" />
                  <span>Remain fully clothed</span>
                </li>
                <li className="flex items-center gap-4">
                  <CheckCircle2 className="text-lime w-6 h-6 flex-shrink-0" />
                  <span>Quick 20-minute sessions</span>
                </li>
              </ul>
              
              <div className="pt-8">
                <Link 
                  to="/contact"
                  className="bg-transparent border border-white text-white hover:bg-white hover:text-dark px-6 py-4 md:px-[32px] md:py-[16px] rounded-button font-heading font-medium text-lg md:text-[21px] transition-all duration-300 inline-block w-full text-center sm:w-auto"
                >
                  Book a Demo
                </Link>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 flex justify-center items-start">
              <div className="relative w-full pt-[100%] rounded-[10px] overflow-hidden border-2 border-white shadow-xl bg-dark">
                <video src="/videos/gazelle-chair.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutChair;
