"use client"
import dynamic from "next/dynamic"

// Importar componentes dinámicamente para asegurar que se rendericen solo en el cliente
const Header = dynamic(() => import("@/components/header"), { ssr: false })
const Footer = dynamic(() => import("@/components/footer"), { ssr: false })
const HeroSection = dynamic(() => import("@/components/sections/hero-section"), { ssr: false })
const ProblemSection = dynamic(() => import("@/components/sections/problem-section"), { ssr: false })
const SolutionSection = dynamic(() => import("@/components/sections/solution-section"), { ssr: false })
const TechnologySection = dynamic(() => import("@/components/sections/technology-section"), { ssr: false })
const FeaturesSection = dynamic(() => import("@/components/sections/features-section"), { ssr: false })
const ValueSection = dynamic(() => import("@/components/sections/value-section"), { ssr: false })
const CTASection = dynamic(() => import("@/components/sections/cta-section"), { ssr: false })

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">

      <Header />
      <main className="flex-1">
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <TechnologySection />
        <FeaturesSection />
        <ValueSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
