import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title, 
  description, 
  url = 'https://pelvicvitality.com', 
  type = 'website', 
  schema 
}) {
  const siteName = "Pelvic Vitality";
  const defaultTitle = "Pelvic Vitality | Advanced Pelvic Floor Therapy";
  const defaultDescription = "Pelvic Vitality provides advanced, evidence-based pelvic floor therapy for men and women, featuring the innovative Gazelle Chair for incontinence and pelvic pain relief.";
  
  const fullTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const metaDescription = description || defaultDescription;

  // Default LocalBusiness/MedicalBusiness schema
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Pelvic Vitality",
    "description": metaDescription,
    "url": "https://pelvicvitality.com",
    "logo": "https://pelvicvitality.com/images/pelvic-logo.png",
    "medicalSpecialty": "Physiotherapy",
    "telephone": "210-909-7364",
    "email": "info@pelvic-vitality.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "22211 I-10 Access Rd #1201 Suite #14",
      "addressLocality": "San Antonio",
      "addressRegion": "TX",
      "postalCode": "78256",
      "addressCountry": "US"
    },
    "sameAs": [
      // Add social links here if available
    ]
  };

  const finalSchema = schema || defaultSchema;

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content="https://pelvicvitality.com/images/pelvic-logo.png" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content="https://pelvicvitality.com/images/pelvic-logo.png" />

      {/* Schema.org / JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(finalSchema)}
      </script>
    </Helmet>
  );
}
