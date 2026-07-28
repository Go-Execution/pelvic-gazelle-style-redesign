const HipaaNoticePage = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-heading font-normal text-dark mb-8">HIPAA Notice of Privacy Practices</h1>
        
        <div className="prose prose-lg max-w-none font-body font-medium text-dark/80 space-y-6">
          <p><strong>THIS NOTICE DESCRIBES HOW MEDICAL INFORMATION ABOUT YOU MAY BE USED AND DISCLOSED AND HOW YOU CAN GET ACCESS TO THIS INFORMATION. PLEASE REVIEW IT CAREFULLY.</strong></p>
          <p>Effective Date: {new Date().toLocaleDateString()}</p>
          
          <h2 className="text-2xl font-heading font-medium text-dark mt-8 mb-4">1. Our Pledge Regarding Medical Information</h2>
          <p>
            We understand that medical information about you and your health is personal. We are committed to protecting medical information about you. We create a record of the care and services you receive to provide you with quality care and to comply with certain legal requirements.
          </p>
          
          <h2 className="text-2xl font-heading font-medium text-dark mt-8 mb-4">2. How We May Use and Disclose Medical Information About You</h2>
          <p>
            The following categories describe different ways that we use and disclose medical information. For each category of uses or disclosures, we will explain what we mean and try to give some examples.
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li><strong>For Treatment:</strong> We may use medical information about you to provide you with medical treatment or services.</li>
            <li><strong>For Payment:</strong> We may use and disclose medical information about you so that the treatment and services you receive may be billed to and payment may be collected from you, an insurance company, or a third party.</li>
            <li><strong>For Health Care Operations:</strong> We may use and disclose medical information about you for our health care operations. These uses and disclosures are necessary to run the clinic and make sure that all of our patients receive quality care.</li>
          </ul>
          
          <h2 className="text-2xl font-heading font-medium text-dark mt-8 mb-4">3. Your Rights Regarding Medical Information About You</h2>
          <p>
            You have the following rights regarding medical information we maintain about you:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-4">
            <li>Right to Inspect and Copy</li>
            <li>Right to Amend</li>
            <li>Right to an Accounting of Disclosures</li>
            <li>Right to Request Restrictions</li>
            <li>Right to Request Confidential Communications</li>
            <li>Right to a Paper Copy of This Notice</li>
          </ul>
          
          <h2 className="text-2xl font-heading font-medium text-dark mt-8 mb-4">4. Changes to This Notice</h2>
          <p>
            We reserve the right to change this notice. We reserve the right to make the revised or changed notice effective for medical information we already have about you as well as any information we receive in the future.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HipaaNoticePage;
