import { useEffect } from 'react'
import Lenis from 'lenis'

import HeroSection       from '../../components/sections/HeroSection'
import ProjectsSection   from '../../components/sections/ProjectsSection'
import ServicesSection   from '../../components/sections/ServicesSection'
import AISection         from '../../components/sections/AISection'
import PhilosophySection from '../../components/sections/PhilosophySection'
import ClientsSection    from '../../components/sections/ClientsSection'
import CTASection        from '../../components/sections/CTASection'

export default function LandingPage() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    const id = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(id)
      lenis.destroy()
    }
  }, [])

  return (
    <main>
      <HeroSection />
      <ProjectsSection />
      <ServicesSection />
      <AISection />
      <PhilosophySection />
      <ClientsSection />
      <CTASection />
    </main>
  )
}
