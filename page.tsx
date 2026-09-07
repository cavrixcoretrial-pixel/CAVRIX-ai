import Navbar from "@/components/landing/navbar"
import Hero from "@/components/landing/hero"
import Features from "@/components/landing/features"
import Models from "@/components/landing/models"
import Pricing from "@/components/landing/pricing"
import FAQ from "@/components/landing/faq"
import Footer from "@/components/landing/footer"

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Models />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  )
}
