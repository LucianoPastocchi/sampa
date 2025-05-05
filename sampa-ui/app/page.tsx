import Header from "@/components/header"
import Footer from "@/components/footer"
import HeroSection from "@/components/sections/hero-section"
import ProblemSection from "@/components/sections/problem-section"
import SolutionSection from "@/components/sections/solution-section"
import TechnologySection from "@/components/sections/technology-section"
import FeaturesSection from "@/components/sections/features-section"
import ValueSection from "@/components/sections/value-section"
import CTASection from "@/components/sections/cta-section"

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
