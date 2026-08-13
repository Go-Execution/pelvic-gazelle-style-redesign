import { motion } from 'framer-motion';

const Doctors = () => {
  const doctors = [
    {
      name: "Maria L Valenzuela",
      role: "30+ Years Experience • Registered Nurse",
      image: "/images/Maria%20L%20Valenzuela.png",
      bio: "With over 30 + years of experience as a Registered Nurse, I have dedicated my career to caring for others with compassion, knowledge, and genuine heart. My extensive background includes Gastroenterology, Liver Transplant coordinator, Medical-Surgical nursing and other medical specialties, giving me a well-rounded understanding of patient care and wellness. As a bilingual nurse, I believe communication is at the heart of exceptional care. I strive to create an environment where every person feels comfortable, respected, heard and cared for. For me, nursing has never simply been a career-it has been a calling."
    },
    {
      name: "Dr. Dianne Rudolph",
      role: "20+ Years Experience • Nurse Practitioner",
      image: "/images/Dr-Dianna.png",
      bio: "Dr. Dianne Rudolph is a doctorally prepared nurse practitioner with more than 20 years of experience as a nurse practitioner with specialization in wound, ostomy and continence care. She has worked across a variety of settings with adult and older adult patients. She brings her expertise in managing patients with urinary and pelvic floor issues to the clinic and works with a team of highly specialized RNs also experienced in this field. Together they provide a comprehensive, non-invasive approach to patients with issues such as stress urinary incontinence, urge incontinence, overflow incontinence, erectile dysfunction and associated issues."
    }
  ];

  return (
    <section className="py-12 md:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-primary font-heading uppercase tracking-widest text-sm mb-4 font-normal">
            Meet Our Experts
          </p>
          <h2 className="text-3xl md:text-5xl font-heading font-normal text-dark">
            Our Specialists
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {doctors.map((doctor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-smoke border-2 border-dark rounded-[10px] overflow-hidden flex flex-col shadow-sm"
            >
              <div className="w-full h-[400px] md:h-[450px] relative border-b-2 border-dark shrink-0">
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-heading font-bold text-dark mb-2">{doctor.name}</h3>
                <p className="text-primary font-heading font-semibold text-lg mb-6">{doctor.role}</p>
                <p className="font-body text-dark/80 font-medium leading-relaxed">
                  {doctor.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Doctors;
