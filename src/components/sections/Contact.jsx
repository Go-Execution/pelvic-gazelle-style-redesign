import { motion } from 'framer-motion';

const Contact = () => {
  return (
    <>
      <section id="contact" className="py-16 md:py-24 bg-smoke">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-8 md:mb-16">
            <p className="text-primary font-heading uppercase tracking-widest text-sm mb-4 font-normal">
              Get in Touch
            </p>
            <h2 className="text-4xl md:text-5xl font-heading font-normal text-dark">
              Contact Us
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
            <div className="w-full lg:w-1/3 space-y-8">
              <div className="rounded-[10px] border-2 border-dark overflow-hidden aspect-square relative shadow-sm">
                <img 
                  src="/images/therapist.png" 
                  alt="Friendly physical therapist" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-heading font-semibold text-dark mb-2">Location</h3>
                <p className="font-body text-dark/80 font-medium">Dominium Ridge Shopping Center<br/>22211 I-10 Access Rd #1201 Suite #14<br/>San Antonio, Texas 78256</p>
              </div>
              <div>
                <h3 className="text-xl font-heading font-semibold text-dark mb-2">Hours</h3>
                <p className="font-body text-dark/80 font-medium">Monday - Friday: 9am - 6pm<br/>Saturday: 9am - 2pm<br/>Additional Hours by Request</p>
              </div>
              <div>
                <h3 className="text-xl font-heading font-semibold text-dark mb-2">Contact</h3>
                <p className="font-body text-dark/80 font-medium">Call us: Pelvic Vitality @ 210-909-7364<br/>Email: hello@pelvicvitality.com</p>
              </div>
            </div>
            
            <div className="w-full lg:w-2/3">
              <div className="bg-white border-2 border-dark rounded-[10px] p-8 shadow-sm">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-heading font-medium text-dark">Name</label>
                      <input type="text" id="name" className="w-full rounded-[5px] border-2 border-dark px-4 py-3 focus:outline-none focus:border-primary font-body" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-heading font-medium text-dark">Phone</label>
                      <input type="tel" id="phone" className="w-full rounded-[5px] border-2 border-dark px-4 py-3 focus:outline-none focus:border-primary font-body" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-heading font-medium text-dark">Email</label>
                    <input type="email" id="email" className="w-full rounded-[5px] border-2 border-dark px-4 py-3 focus:outline-none focus:border-primary font-body" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-heading font-medium text-dark">Message</label>
                    <textarea id="message" rows="4" className="w-full rounded-[5px] border-2 border-dark px-4 py-3 focus:outline-none focus:border-primary font-body"></textarea>
                  </div>
                  <button className="bg-primary hover:bg-opacity-90 text-white px-[32px] py-[16px] rounded-button font-heading font-medium text-[18px] transition-all duration-300 shadow-sm w-full md:w-auto mt-4" type="button">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-32 bg-primary text-white text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 leading-tight">
            Ready to Reclaim Your Quality of Life?
          </h2>
          <p className="text-xl font-body font-medium text-white/90 mb-10 leading-relaxed">
            Don't let pelvic floor issues hold you back any longer. Book a consultation today and discover how our advanced technology can help you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="bg-white text-primary hover:bg-smoke px-[32px] py-[16px] rounded-button font-heading font-bold text-[21px] transition-all duration-300">
              Book Your Appointment
            </a>
            <a href="tel:5551234567" className="bg-transparent border border-white text-white hover:bg-white/10 px-[32px] py-[16px] rounded-button font-heading font-medium text-[21px] transition-all duration-300">
              Call Us: (555) 123-4567
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
