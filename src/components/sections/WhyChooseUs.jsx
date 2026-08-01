import { motion } from 'framer-motion';

const WhyChooseUs = () => {
  const reasons = [
    { num: "1", title: "Specialized Focus", desc: "Unlike general physiotherapy clinics, we focus 100% on pelvic floor health. Our specialized knowledge means faster, more effective results." },
    { num: "2", title: "Advanced Technology", desc: "We use the Gazelle chair electromagnetic technology for unmatched rehabilitation outcomes." },
    { num: "3", title: "Compassionate Care", desc: "We understand how sensitive these issues are. You'll receive judgment-free, private care tailored to your unique situation." },
    { num: "4", title: "Holistic Approach", desc: "We treat the whole person, not just the symptoms. Our approach includes lifestyle advice, nutritional guidance, and ongoing support." }
  ];

  return (
    <>
      <section className="py-12 md:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <p className="text-primary font-heading uppercase tracking-widest text-sm mb-4 font-normal">
              The Pelvic Vitality Difference
            </p>
            <h2 className="text-3xl md:text-5xl font-heading font-normal text-dark">
              Why Choose Us?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
             {reasons.map((reason, index) => (
                <div key={index} className="flex gap-6">
                  <div className="w-12 h-12 rounded-[5px] bg-primary border-2 border-dark text-lime flex-shrink-0 flex items-center justify-center font-bold text-xl shadow-sm">
                    {reason.num}
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-dark mb-3">{reason.title}</h3>
                    <p className="font-body text-dark/80 font-medium text-[16px] leading-relaxed">
                      {reason.desc}
                    </p>
                  </div>
                </div>
             ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-primary text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2">
               <div className="flex flex-col gap-4 mb-6">
                 <span className="text-sm font-heading font-medium tracking-widest uppercase text-lime">
                   Transform Your Life
                 </span>
                 <h2 className="text-3xl md:text-5xl font-heading font-normal text-white leading-[1.1]">
                   Highly Effective
                 </h2>
               </div>
               <div className="space-y-4 text-white/90 font-body font-medium text-[18px] leading-relaxed mb-8">
                 <p>
                   Each session produces: 5,500-23,000+ contractions -depending on settings.
                 </p>
               </div>
               <div className="grid grid-cols-2 gap-6 mt-8">
                  <div className="border-l-4 border-lime pl-4">
                     <p className="text-4xl font-heading font-bold text-white mb-2">95%</p>
                     <p className="text-sm font-body text-lime uppercase tracking-wide">Patient Satisfaction</p>
                  </div>
                  <div className="border-l-4 border-lime pl-4">
                     <p className="text-4xl font-heading font-bold text-white mb-2">3 Weeks</p>
                     <p className="text-sm font-body text-lime uppercase tracking-wide">Average Time to Improvement</p>
                  </div>
               </div>
            </div>
            <div className="w-full md:w-1/2">
               <div className="bg-dark border-2 border-white rounded-[10px] p-6 shadow-lg h-full flex flex-col justify-center">
                  <h3 className="text-xl md:text-2xl font-heading font-semibold text-lime mb-4">
                    HOW eXMI THERAPHY WORKS
                  </h3>
                  <div className="space-y-3 text-white/90 font-body text-[15px] leading-relaxed">
                    <p>
                      Extracorporeal Magnetic Innervation (ExMI) uses pulsed magnetic fields to activate the pelvic floor muscles without requiring patients to contract them on their own. When the Magnetic pulses pass through the pelvic region, they create small electrical currents in the nerves that control the pelvic floor.
                    </p>
                    <p>
                      These currents trigger rapid muscle contractions that are much stronger than what most people can achieve voluntarily through Kegel exercises.
                    </p>
                    <p>
                      During each session, the chair delivers thousands of these contractions in a steady pattern. This repeated activation helps the pelvic muscles engage, tighten, and regain strength over time. Because the magnetic pulses reach deep into the pelvic region, even the muscles that are difficult to isolate manually can be stimulated effectively. The entire process is non-invasive, hands-free, and completed while the patient remains fully clothed. With routine use, this gentle stimulation helps support bladder control.
                    </p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyChooseUs;
