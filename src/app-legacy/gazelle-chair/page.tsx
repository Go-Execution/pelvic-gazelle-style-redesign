import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { GazelleChairSection } from "@/components/sections/GazelleChairSection"
import { FinalCTASection } from "@/components/sections/FinalCTASection"
import { EvidenceBasedSection } from "@/components/sections/EvidenceBasedSection"
import { FadeInSection } from "@/components/shared/FadeInSection"

export default function GazelleChairPage() {
  return (
    <>
      <Header />
      <main className="flex flex-col min-h-screen">
        {/* Page Hero */}
        <section className="pt-32 pb-16 bg-brand-sand relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
            <FadeInSection>
              <h1 className="text-4xl md:text-6xl font-bold font-heading text-brand-ink mb-6">
                The Gazelle Chair
              </h1>
              <p className="text-xl md:text-2xl text-brand-ink/80 leading-relaxed font-medium mb-12">
                The world's most effective non-surgical, non-invasive, FDA Cleared device to treat incontinence and strengthen your pelvic floor.
              </p>
              
              {/* <div className="rounded-[40px] overflow-hidden shadow-2xl border border-brand-teal/10 bg-black aspect-square max-w-xl mx-auto relative">
                <video 
                  src="/videos/gazelle-chair.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  controls
                  playsInline
                  className="w-full h-full object-cover"
                >
                  Your browser does not support the video tag.
                </video>
              </div> */}
            </FadeInSection>
          </div>
        </section>

        {/* Reusing the GazelleChairSection as the core content */}
        <GazelleChairSection />
        
        {/* Supporting sections */}
        <EvidenceBasedSection />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  )
}
