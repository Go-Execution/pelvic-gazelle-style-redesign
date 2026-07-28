import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FinalCTASection } from "@/components/sections/FinalCTASection"
import { FadeInSection } from "@/components/shared/FadeInSection"
import symptomsData from "@/content/symptoms.json"
import Image from "next/image"
import { Droplet, Clock, Activity, ArrowDownToLine, Zap, Baby } from "lucide-react"

export const metadata = {
  title: "Symptoms We Treat | Pelvic Vitality",
  description: "Identify the pelvic floor symptoms you may be experiencing and learn how our treatments can provide relief.",
}

// Helper function to map string names to Lucide icons
const getIcon = (iconName: string) => {
  switch (iconName) {
    case "Droplet": return <Droplet className="w-8 h-8 text-brand-teal" />
    case "Clock": return <Clock className="w-8 h-8 text-brand-teal" />
    case "Activity": return <Activity className="w-8 h-8 text-brand-teal" />
    case "ArrowDownToLine": return <ArrowDownToLine className="w-8 h-8 text-brand-teal" />
    case "Zap": return <Zap className="w-8 h-8 text-brand-teal" />
    case "Baby": return <Baby className="w-8 h-8 text-brand-teal" />
    default: return null
  }
}

export default function SymptomsIndexPage() {
  return (
    <>
      <Header />
      <main className="flex flex-col min-h-screen bg-brand-sand">
        <div className="container mx-auto px-4 max-w-6xl py-20 md:py-32">
          <FadeInSection>
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold font-heading text-brand-ink mb-6">Symptoms We Treat</h1>
              <p className="text-xl text-brand-ink/70 max-w-2xl mx-auto">
                You don't have to live with discomfort. If you recognize any of these symptoms, we can help you find lasting relief.
              </p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {symptomsData.map((symptom, i) => (
              <FadeInSection key={symptom.id} delay={i * 0.1}>
                <div 
                  className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative h-64 w-full overflow-hidden shrink-0">
                    <Image
                      src={symptom.image}
                      alt={symptom.label}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-brand-ink/10 group-hover:bg-transparent transition-colors duration-300" />
                  </div>
                  <div className="p-8 flex flex-col flex-grow items-start text-left">
                    <div className="bg-brand-sage/20 p-4 rounded-2xl mb-6">
                      {getIcon(symptom.icon)}
                    </div>
                    <h3 className="text-xl font-medium text-brand-ink/90 leading-relaxed">
                      {symptom.label}
                    </h3>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
        <FinalCTASection />
      </main>
      <Footer />
    </>
  )
}
