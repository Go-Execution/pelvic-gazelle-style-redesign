const TermsOfServicePage = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-heading font-normal text-dark mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none font-body font-medium text-dark/80 space-y-6">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-heading font-medium text-dark mt-8 mb-4">1. Agreement to Terms</h2>
          <p>
            By viewing or using this website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
          </p>
          
          <h2 className="text-2xl font-heading font-medium text-dark mt-8 mb-4">2. Medical Disclaimer</h2>
          <p>
            The content on this website is for informational purposes only and is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
          </p>
          
          <h2 className="text-2xl font-heading font-medium text-dark mt-8 mb-4">3. Use License</h2>
          <p>
            Permission is granted to temporarily download one copy of the materials (information or software) on Pelvic Vitality's website for personal, non-commercial transitory viewing only.
          </p>
          
          <h2 className="text-2xl font-heading font-medium text-dark mt-8 mb-4">4. Limitations</h2>
          <p>
            In no event shall Pelvic Vitality or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Pelvic Vitality's website.
          </p>

          <h2 className="text-2xl font-heading font-medium text-dark mt-8 mb-4">5. Revisions and Errata</h2>
          <p>
            The materials appearing on our website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on its website are accurate, complete or current.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TermsOfServicePage;
