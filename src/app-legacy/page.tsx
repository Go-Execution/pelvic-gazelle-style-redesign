import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { HeroSection } from "@/components/sections/HeroSection"
import { SymptomsSection } from "@/components/sections/SymptomsSection"
import { AboutPelvicFloorSection } from "@/components/sections/AboutPelvicFloorSection"
import { HowItWorksSection } from "@/components/sections/HowItWorksSection"
import { GazelleChairSection } from "@/components/sections/GazelleChairSection"
import { BenefitsSection } from "@/components/sections/BenefitsSection"
import { ConditionsSection } from "@/components/sections/ConditionsSection"
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection"
import { EvidenceBasedSection } from "@/components/sections/EvidenceBasedSection"
import { TestimonialsSection } from "@/components/sections/TestimonialsSection"
import { FAQSection } from "@/components/sections/FAQSection"
import { FinalCTASection } from "@/components/sections/FinalCTASection"
import { ContactSection } from "@/components/sections/ContactSection"

import symptomsData from "@/content/symptoms.json"
import howItWorksData from "@/content/how-it-works.json"
import benefitsData from "@/content/benefits.json"
import conditionsData from "@/content/conditions.json"
import testimonialsData from "@/content/testimonials.json"
import faqsData from "@/content/faqs.json"

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="flex flex-col min-h-screen">
        <HeroSection />
        <SymptomsSection symptoms={symptomsData} />
        <AboutPelvicFloorSection />
        <GazelleChairSection />
        <HowItWorksSection steps={howItWorksData} />
        <BenefitsSection benefits={benefitsData} />
        <ConditionsSection conditions={conditionsData} />
        <WhyChooseUsSection />
        <EvidenceBasedSection />
        <TestimonialsSection testimonials={testimonialsData} />
        <FAQSection faqs={faqsData} />
        <ContactSection />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  )
}
