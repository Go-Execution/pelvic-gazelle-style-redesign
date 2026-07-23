import { motion } from 'framer-motion';

const Conditions = () => {
  const conditions = [
    {
      title: "Stress Urinary Incontinence",
      desc: "Leakage during physical exertion, coughing, sneezing, or laughing."
    },
    {
      title: "Urge Incontinence",
      desc: "A sudden, intense urge to urinate followed by involuntary loss of urine."
    },
    {
      title: "Mixed Incontinence",
      desc: "Experiencing symptoms of both stress and urge incontinence."
    },
    {
      title: "Overactive Bladder",
      desc: "A frequent and sudden urge to urinate that may be difficult to control."
    },
    {
      title: "Pelvic Floor Dysfunction",
      desc: "Inability to correctly relax and coordinate your pelvic floor muscles."
    },
    {
      title: "Postpartum Pelvic Weakness",
      desc: "Restoring core and pelvic floor strength after childbirth."
    }
  ];

  return (
    <section id="conditions" className="py-24 bg-smoke">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-primary font-heading uppercase tracking-widest text-sm mb-4 font-normal">
            What We Treat
          </p>
          <h2 className="text-4xl md:text-5xl font-heading font-normal text-dark">
            We're Here to Help With
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {conditions.map((condition, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border-2 border-dark p-8 rounded-[10px] flex flex-col h-full shadow-sm hover:-translate-y-1 transition-transform duration-300"
            >
              <h3 className="text-xl font-heading font-semibold text-dark mb-3">
                {condition.title}
              </h3>
              <p className="font-body text-dark/80 font-light text-[16px] flex-grow mb-6">
                {condition.desc}
              </p>
              <a href="#contact" className="text-primary font-body font-bold text-[15px] flex items-center hover:underline mt-auto">
                Learn more <span className="ml-2">→</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Conditions;
