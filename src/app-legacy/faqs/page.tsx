import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FAQSection } from "@/components/sections/FAQSection"
import { FinalCTASection } from "@/components/sections/FinalCTASection"
import faqsData from "@/content/faqs.json"

export default function FAQsPage() {
  return (
    <>
      <Header />
      <main className="flex flex-col min-h-screen bg-brand-sand">
        <FAQSection faqs={faqsData} />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  )
}
