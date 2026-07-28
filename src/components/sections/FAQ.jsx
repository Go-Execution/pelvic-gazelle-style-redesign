import { useState } from 'react';

const FAQ = () => {
  const faqs = [
    {
      q: "What is pelvic floor therapy?",
      a: "Pelvic floor therapy is a specialized kind of physical therapy to relieve the symptoms of pelvic floor dysfunction and make the pelvic muscles work the way they should."
    },
    {
      q: "How does the Gazelle Chair work?",
      a: "The Gazelle Chair uses electromagnetic technology to stimulate pelvic floor muscles, inducing thousands of supramaximal contractions in a single session to strengthen the pelvic floor."
    },
    {
      q: "Does the treatment hurt?",
      a: "No, the treatment is non-invasive and painless. You may feel a tingling sensation and muscle contractions during the procedure."
    },
    {
      q: "How many sessions will I need?",
      a: "A typical treatment plan involves 24 sessions, scheduled 2-3 a week for 12 weeks, but this can vary depending on your specific condition."
    },
    {
      q: "Do I need to undress for the treatment?",
      a: "No, you remain fully clothed during the Gazelle Chair treatment."
    },
    {
      q: "When will I see results?",
      a: "Many patients report improvement after a few sessions, with results typically continuing to improve over the next few weeks."
    }
  ];

  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faqs" className="py-12 md:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <div className="text-center mb-8 md:mb-16">
          <p className="text-primary font-heading uppercase tracking-widest text-sm mb-4 font-normal">
            Common Questions
          </p>
          <h2 className="text-3xl md:text-5xl font-heading font-normal text-dark">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-smoke border-2 border-dark rounded-[5px] overflow-hidden transition-all duration-300"
            >
              <button
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none hover:bg-[#faf089] transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              >
                <span className="font-heading font-semibold text-dark text-[18px] pr-8">
                  {faq.q}
                </span>
                <span className={`text-primary font-bold transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              
              <div 
                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="w-full h-[2px] bg-dark/10 mb-4"></div>
                <p className="font-body font-medium text-dark/80 text-[16px] leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
