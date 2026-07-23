import { motion } from 'framer-motion';

const ForEveryone = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-primary font-heading uppercase tracking-widest text-sm mb-4 font-normal">
            Inclusive Care
          </p>
          <h2 className="text-4xl md:text-5xl font-heading font-normal text-dark">
            Pelvic Health is for Everyone
          </h2>
          <p className="mt-6 text-[18px] font-body font-light text-dark/80 max-w-2xl mx-auto">
            Pelvic floor dysfunction doesn't discriminate. Whether you're a man or a woman, 
            maintaining a strong pelvic floor is crucial for your overall health, confidence, and quality of life.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 justify-center">
          {/* Women's Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex-1 bg-smoke border-2 border-dark rounded-[10px] flex flex-col hover:-translate-y-1 transition-transform duration-300 shadow-sm overflow-hidden"
          >
            <div className="h-64 w-full relative border-b-2 border-dark">
              <img src="/images/active_woman.png" alt="Women's Pelvic Health" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="p-8 flex flex-col flex-1">
              <h3 className="text-2xl font-heading font-semibold text-dark mb-4">For Women</h3>
              <p className="font-body text-dark/80 font-light text-[16px] mb-6">
                Women often experience pelvic floor weakening due to pregnancy, childbirth, menopause, or high-impact activities. 
                Our non-invasive treatments help restore bladder control, improve core stability, and enhance intimate health.
              </p>
              <ul className="space-y-3 font-body text-dark/80 font-medium mt-auto">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span> Postpartum recovery
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span> Stress & urge incontinence
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span> Pelvic organ prolapse support
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Men's Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex-1 bg-smoke border-2 border-dark rounded-[10px] flex flex-col hover:-translate-y-1 transition-transform duration-300 shadow-sm overflow-hidden"
          >
            <div className="h-64 w-full relative border-b-2 border-dark">
              <img src="/images/active_man.png" alt="Men's Pelvic Health" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="p-8 flex flex-col flex-1">
              <h3 className="text-2xl font-heading font-semibold text-dark mb-4">For Men</h3>
              <p className="font-body text-dark/80 font-light text-[16px] mb-6">
                Men's pelvic health is frequently overlooked. Issues often arise after prostate surgery, heavy lifting, or due to aging. 
                Strengthening these muscles can significantly improve urinary control and overall function.
              </p>
              <ul className="space-y-3 font-body text-dark/80 font-medium mt-auto">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span> Post-prostatectomy recovery
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span> Overactive bladder & leakage
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span> Improved intimate health
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ForEveryone;
