import { Droplet, Clock, Activity, ArrowDownToLine, Zap, Baby } from 'lucide-react';
import { motion } from 'framer-motion';

const Symptoms = () => {
  const symptoms = [
    {
      icon: <Droplet className="w-8 h-8" />,
      text: "Urine leakage when coughing, laughing, or exercising"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      text: "Sudden, intense urges to use the restroom"
    },
    {
      icon: <Activity className="w-8 h-8" />,
      text: "Frequent urination day or night"
    },
    {
      icon: <ArrowDownToLine className="w-8 h-8" />,
      text: "A feeling of heaviness or pressure in the pelvic area"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      text: "Pelvic pain during intimacy or daily activities"
    },
    {
      icon: <Baby className="w-8 h-8" />,
      text: "Postpartum recovery challenges"
    }
  ];

  return (
    <section id="symptoms" className="py-24 bg-smoke">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-primary font-heading uppercase tracking-widest text-sm mb-4 font-normal">
            Recognize the Signs
          </p>
          <h2 className="text-4xl md:text-5xl font-heading font-normal text-dark">
            Are these symptoms affecting your daily life?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {symptoms.map((symptom, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border-2 border-dark p-8 rounded-[10px] text-center flex flex-col items-center hover:bg-[#faf089] hover:border-dark transition-colors duration-300"
            >
              <div className="text-primary mb-6">
                {symptom.icon}
              </div>
              <p className="font-body font-medium text-lg text-dark">
                {symptom.text}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-6">
          <p className="text-lg text-dark font-body font-light">
            You don't have to live with discomfort. These common issues can be effectively treated with our specialized electromagnetic therapy.
          </p>
          <a
            href="#contact"
            className="bg-primary hover:bg-opacity-90 text-white px-[32px] py-[16px] rounded-button font-heading font-medium text-[21px] transition-all duration-300 shadow-sm"
          >
            Get Help Today
          </a>
        </div>
      </div>
    </section>
  );
};

export default Symptoms;
