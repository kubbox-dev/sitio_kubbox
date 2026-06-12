import { useEffect, useRef, useState, useCallback } from 'react'
import Lenis from 'lenis'

import HeroSection       from '../../components/sections/HeroSection'
import ProjectsSection   from '../../components/sections/ProjectsSection'
import ServicesSection   from '../../components/sections/ServicesSection'
import AISection         from '../../components/sections/AISection'
import PhilosophySection from '../../components/sections/PhilosophySection'
import ClientsSection    from '../../components/sections/ClientsSection'
import CTASection        from '../../components/sections/CTASection'
import CustomCursor      from '../../components/ui/CustomCursor'
import FloatingBubbles  from '../../components/ui/FloatingBubbles'

export default function LandingPage() {
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
      <FloatingBubbles />
      <CustomCursor />
      <main>
        <HeroSection />
        <ProjectsSection />
        <ServicesSection />
        <div
          ref={darkZoneRef}
          onMouseMove={onDarkMove}
          onMouseLeave={onDarkLeave}
          style={{ position: 'relative', marginTop: '-1px' }}
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
