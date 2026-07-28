import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { FinalCTASection } from "@/components/sections/FinalCTASection"
import conditionsData from "@/content/conditions.json"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  return conditionsData.map((condition) => ({
    slug: condition.slug,
  }))
}

export default async function ConditionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const condition = conditionsData.find((c) => c.slug === slug)

  if (!condition) {
    notFound()
  }

  return (
    <>
      <Header />
      <main className="flex flex-col min-h-screen pt-24 bg-brand-sand">
        <div className="container mx-auto px-4 max-w-4xl py-16">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-brand-ink mb-6">{condition.name}</h1>
          <div className="prose prose-lg text-brand-ink/80 max-w-none">
            <p className="text-xl mb-8 leading-relaxed font-medium">{condition.shortDescription}</p>
            <h2 className="text-2xl font-bold text-brand-ink mb-4 mt-12">How We Can Help</h2>
            <p className="leading-relaxed">
              At Pelvic Vitality, we use a combination of expert manual therapy and advanced electromagnetic stimulation 
              (the Gazelle Chair) to effectively treat {condition.name.toLowerCase()}. Our specialized focus ensures you get the targeted care you need.
            </p>
          </div>
        </div>
        <FinalCTASection />
      </main>
      <Footer />
    </>
  )
}
