import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FinalCTASection } from "@/components/sections/FinalCTASection"
import { FadeInSection } from "@/components/shared/FadeInSection"
import conditionsData from "@/content/conditions.json"
import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "Conditions We Treat | Pelvic Vitality",
  description: "Learn about the specific pelvic floor conditions we treat using the FDA-cleared Gazelle Chair and our evidence-based approach.",
}

export default function ConditionsIndexPage() {
  return (
    <>
      <Header />
      <main className="flex flex-col min-h-screen bg-brand-sand">
        <div className="container mx-auto px-4 max-w-6xl py-20 md:py-32">
          <FadeInSection>
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold font-heading text-brand-ink mb-6">Conditions We Treat</h1>
              <p className="text-xl text-brand-ink/70 max-w-2xl mx-auto">
                Our evidence-based treatments target a variety of pelvic floor disorders, helping you regain confidence and comfort.
              </p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {conditionsData.map((condition, i) => (
              <FadeInSection key={condition.slug} delay={i * 0.1}>
                <Link 
                  href={`/conditions/${condition.slug}`} 
                  className="group flex flex-col h-full bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative h-64 w-full overflow-hidden shrink-0">
                    <Image
                      src={condition.image}
                      alt={condition.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-brand-ink/10 group-hover:bg-transparent transition-colors duration-300" />
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-2xl font-bold text-brand-ink mb-3 group-hover:text-brand-teal transition-colors">
                      {condition.name}
                    </h3>
                    <p className="text-brand-ink/70 leading-relaxed flex-grow">
                      {condition.shortDescription}
                    </p>
                    <div className="mt-6 flex items-center text-brand-teal font-medium">
                      Learn More 
                      <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </Link>
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
