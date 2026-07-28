import { motion } from 'framer-motion';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "After having my second child, I struggled with stress incontinence. The Gazelle Chair treatment completely changed my life. I can finally run and laugh without worry.",
      author: "Sarah M.",
      avatar: "https://pelvic-vitality.vercel.app/images/avatar-3.png"
    },
    {
      quote: "I was skeptical at first, but the results speak for themselves. The staff is incredibly supportive and the treatment was entirely painless.",
      author: "Linda T.",
      avatar: "https://pelvic-vitality.vercel.app/images/avatar-2.png"
    },
    {
      quote: "A truly professional clinic. The fact that I didn't have to undress for the treatment made me feel so comfortable. Highly recommended!",
      author: "Emily R.",
      avatar: "https://pelvic-vitality.vercel.app/images/avatar-1.png"
    }
  ];

  return (
    <section className="py-12 md:py-24 bg-smoke">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-8 md:mb-16">
          <p className="text-primary font-heading uppercase tracking-widest text-sm mb-4 font-normal">
            Success Stories
          </p>
          <h2 className="text-3xl md:text-5xl font-heading font-normal text-dark">
            Hear From Our Patients
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border-2 border-dark rounded-[10px] p-8 flex flex-col relative shadow-sm"
            >
              <div className="text-primary text-5xl font-heading absolute top-4 left-4 opacity-30">"</div>
              <p className="font-body text-dark/90 font-medium italic text-[16px] leading-relaxed mb-8 relative z-10 pt-4 flex-grow">
                "{testimonial.quote}"
              </p>
              <div className="mt-auto flex items-center gap-4">
                <div>
                  <p className="font-heading font-bold text-dark">{testimonial.author}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
