import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Toaster } from "sonner";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pelvic Vitality | Advanced Pelvic Floor Therapy",
  description: "Restore strength, confidence, and comfort with non-invasive electromagnetic pelvic floor therapy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": "Pelvic Vitality",
    "description": "Restore strength, confidence, and comfort with non-invasive electromagnetic pelvic floor therapy.",
    "url": "https://pelvicvitality.com",
    "telephone": "+1-555-123-4567",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Healing Way, Suite 400",
      "addressLocality": "Wellness City",
      "addressRegion": "WC",
      "postalCode": "12345",
      "addressCountry": "US"
    }
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <CustomCursor />
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
