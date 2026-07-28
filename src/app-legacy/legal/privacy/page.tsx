import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="flex flex-col min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-4xl font-bold font-heading text-brand-ink mb-8">Privacy Policy</h1>
          <div className="prose prose-lg text-brand-ink/80 max-w-none">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <h2 className="text-2xl font-bold mt-8 mb-4">1. Introduction</h2>
            <p className="mb-4">Welcome to Pelvic Vitality. We are committed to protecting your personal information and your right to privacy. This privacy policy explains how we collect, use, and share your information when you use our website.</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">2. Information We Collect</h2>
            <p className="mb-4">We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and Services, when you participate in activities on the Website, or otherwise when you contact us.</p>
            <p className="mb-4">The personal information that we collect depends on the context of your interactions with us and the Website, the choices you make, and the products and features you use.</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
