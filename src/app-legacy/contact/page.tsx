import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { ContactSection } from "@/components/sections/ContactSection"

export const metadata = {
  title: "Contact Us | Pelvic Vitality",
  description: "Get in touch to book a consultation or ask questions about our FDA-cleared Gazelle Chair therapy for pelvic floor disorders.",
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex flex-col min-h-screen bg-brand-sand">
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
