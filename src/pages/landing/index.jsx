import { useEffect, useRef, useState, useCallback } from 'react'
import Lenis from 'lenis'

import HeroSection       from '../../components/sections/landing/HeroSection'
import ProjectsSection   from '../../components/sections/landing/ProjectsSection'
import ServicesSection   from '../../components/sections/landing/ServicesSection'
import AISection         from '../../components/sections/landing/AISection'
import PhilosophySection from '../../components/sections/landing/PhilosophySection'
import ClientsSection    from '../../components/sections/landing/ClientsSection'
import CTASection        from '../../components/sections/landing/CTASection'
import CustomCursor      from '../../components/ui/CustomCursor'
import MorphicBackground      from '../../components/layout/fondo'
import { useDocumentMeta } from '../../hooks/useDocumentMeta'

export default function LandingPage() {
  useDocumentMeta({
    title: 'Kubbox — Agencia de Marketing Digital y Desarrollo Web',
    description: 'Kubbox es una agencia de marketing digital y desarrollo web en Medellín, Colombia. Creamos campañas digitales, plataformas y sitios web que convierten.',
    path: '/',
  })

  const darkZoneRef = useRef(null)
  const [spotPos, setSpotPos] = useState(null)

  const onDarkMove = useCallback((e) => {
    const rect = darkZoneRef.current.getBoundingClientRect()
    setSpotPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }, [])

  const onDarkLeave = useCallback(() => setSpotPos(null), [])

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
    <>
      <CustomCursor />
      <MorphicBackground />
      <main>      
        <HeroSection />
        <ProjectsSection />
        <ServicesSection />
        <div
          ref={darkZoneRef}
          onMouseMove={onDarkMove}
          onMouseLeave={onDarkLeave}
          style={{ position: 'relative', marginTop: '-1px', background: 'var(--c-bg)' }}
        >
          {spotPos && (
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                zIndex: 100,
                background: `radial-gradient(350px circle at ${spotPos.x}% ${spotPos.y}%, oklch(0.88 0.26 130 / 0.07), transparent 65%)`,
              }}
            />
          )}
          <AISection />
          <PhilosophySection />
          <ClientsSection />
        </div>
        <CTASection />
      </main>
    </>
  )
}
