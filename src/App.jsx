import { useEffect } from 'react'
import Lenis from 'lenis'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HeroSection from './components/sections/HeroSection'
import ProjectsSection from './components/sections/ProjectsSection'
import ServicesSection from './components/sections/ServicesSection'
import AISection from './components/sections/AISection'
import PhilosophySection from './components/sections/PhilosophySection'
import ClientsSection from './components/sections/ClientsSection'
import CTASection from './components/sections/CTASection'

export default function App() {
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
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProjectsSection />
        <ServicesSection />
        <AISection />
        <PhilosophySection />
        <ClientsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
