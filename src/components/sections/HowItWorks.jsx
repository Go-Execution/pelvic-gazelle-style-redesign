import { motion } from 'framer-motion';

const HowItWorks = () => {
  const steps = [
    { num: "1", title: "Consultation", desc: "Discuss your symptoms and goals with our specialists." },
    { num: "2", title: "Personalized Plan", desc: "We develop a treatment protocol tailored to your unique needs." },
    { num: "3", title: "Treatment Sessions", desc: "Relax on the Gazelle Chair twice a week for 20 minutes per session." },
    { num: "4", title: "Results", desc: "Experience restored strength, reduced symptoms, and improved confidence." }
  ];

  const benefits = [
    { icon: "✨", title: "Non-Invasive", desc: "Remain fully clothed during the entire 20-minute session." },
    { icon: "⏱️", title: "Time Efficient", desc: "Each session is under 30 minutes, easily fitting into your lunch break." },
    { icon: "⚡", title: "Highly Effective", desc: "Equivalent to performing 11,000 Kegel exercises per session." },
    { icon: "💪", title: "Restore Confidence", desc: "Regain control over your body and improve your quality of life." }
  ];

  return (
    <>
      <section className="py-12 md:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <p className="text-primary font-heading uppercase tracking-widest text-sm mb-4 font-normal">
              Your Journey To Stability, Confidence, and Control Back in your Daily life
            </p>
            <h2 className="text-3xl md:text-5xl font-heading font-normal text-dark">
              Take the First Step
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto relative">
            <div className="hidden lg:block absolute top-8 left-12 right-12 h-[2px] bg-dark z-0 border-dashed border-2"></div>
            {steps.map((step, index) => (
              <div key={index} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-[10px] bg-primary border-2 border-dark text-lime flex items-center justify-center text-2xl font-bold font-heading mb-6 shadow-sm">
                  {step.num}
                </div>
                <h3 className="text-xl font-heading font-semibold text-dark mb-3">
                  {step.title}
                </h3>
                <p className="font-body text-dark/80 font-medium text-[16px] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-smoke border-t-2 border-dark">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
             <p className="text-primary font-heading uppercase tracking-widest text-sm mb-4 font-normal">
                Transform Your Life
             </p>
             <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-normal text-dark max-w-4xl mx-auto leading-tight">
                With Pelvic Floor Therapy you can return to the active, confident life you deserve
             </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
               <div key={index} className="bg-white border-2 border-dark p-6 md:p-8 rounded-[10px] flex flex-col h-full shadow-sm hover:bg-[#faf089] transition-colors duration-300">
                  <div className="w-12 h-12 bg-smoke border-2 border-dark rounded-[5px] flex items-center justify-center text-xl mb-6">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-dark mb-3">
                    {benefit.title}
                  </h3>
                  <p className="font-body text-dark/80 font-medium text-[16px] leading-relaxed">
                    {benefit.desc}
                  </p>
               </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HowItWorks;
