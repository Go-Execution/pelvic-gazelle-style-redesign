const PrivacyPolicyPage = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-heading font-normal text-dark mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none font-body font-medium text-dark/80 space-y-6">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-heading font-medium text-dark mt-8 mb-4">1. Introduction</h2>
          <p>
            Welcome to Pelvic Vitality. We are committed to protecting your personal information and your right to privacy. 
            If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us.
          </p>
          
          <h2 className="text-2xl font-heading font-medium text-dark mt-8 mb-4">2. Information We Collect</h2>
          <p>
            We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Website or otherwise when you contact us.
          </p>
          
          <h2 className="text-2xl font-heading font-medium text-dark mt-8 mb-4">3. How We Use Your Information</h2>
          <p>
            We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
          </p>
          
          <h2 className="text-2xl font-heading font-medium text-dark mt-8 mb-4">4. Sharing Your Information</h2>
          <p>
            We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
          </p>

          <h2 className="text-2xl font-heading font-medium text-dark mt-8 mb-4">5. Contact Us</h2>
          <p>
            If you have questions or comments about this notice, you may email us at Info@pelvic-vitality.com or by post to our office address.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicyPage;
