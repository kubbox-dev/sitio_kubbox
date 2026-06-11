import { Suspense, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'
import GlowOrb from '../ui/GlowOrb'
import Button from '../ui/Button'
import { SplineScene } from '../ui/SplineScene'

const SPLINE_ROBOT = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'

// Variantes de animación más suaves
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

export default function AISection() {
  const sectionRef = useRef(null)
  const splineRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })

  const handleMouseMove = useCallback((e) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setMousePos({ x, y })

    if (splineRef.current && splineRef.current.emitEvent) {
      splineRef.current.emitEvent('mouseMove', { 
        x: x * 2 - 1,
        y: y * 2 - 1 
      })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        overflow: 'hidden',
        paddingBlock: 'clamp(4rem, 10vw, 7rem)',
        marginTop: '-1px', // ← elimina posible línea entre secciones
        // Fondo degradado: transparente arriba → oscuro abajo
        background: 'linear-gradient(to bottom, transparent 0%, var(--c-bg) 15%, var(--c-bg) 100%)',
      }}
    >
      {/* Spotlight global que sigue al mouse */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-150"
        style={{
          background: `radial-gradient(500px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, oklch(0.88 0.26 130 / 0.12), transparent 75%)`,
        }}
      />

      {/* Glow Orbs */}
      <GlowOrb color="teal" size={500} top="-15%" left="10%" opacity={0.5} blur={140} />
      <GlowOrb color="lime" size={300} bottom="-5%" right="8%" opacity={0.4} blur={100} />

      <div
        style={{
          maxWidth: 'var(--container)',
          marginInline: 'auto',
          paddingInline: 'var(--container-pad)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            display: 'flex',
            minHeight: '520px',
            flexDirection: 'column',
          }}
          className="ai-card"
        >
          {/* Left: Spline robot */}
          <div
            style={{
              flex: 1,
              position: 'relative',
              minHeight: '320px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* IA watermark */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '0.5rem',
                right: '0.75rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                letterSpacing: '-0.04em',
                color: 'transparent',
                WebkitTextStroke: '1.5px oklch(0.88 0.260 130 / 0.25)',
                userSelect: 'none',
                pointerEvents: 'none',
                zIndex: 15,
                opacity: 0.7,
              }}
            >
              IA
            </div>

            {/* Spline scene con fallback */}
            <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%', minHeight: '320px' }}>
              <Suspense
                fallback={
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    width: '100%',
                  }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      border: '2px solid var(--c-lime)',
                      borderTopColor: 'transparent',
                      borderRadius: '50%',
                      animation: 'spin 0.8s linear infinite',
                    }} />
                  </div>
                }
              >
                <SplineScene 
                  ref={splineRef}
                  scene={SPLINE_ROBOT} 
                  className="w-full h-full" 
                />
              </Suspense>
            </div>

            {/* Bottom fade */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '25%',
                background: 'linear-gradient(to top, var(--c-bg), transparent)',
                pointerEvents: 'none',
                zIndex: 5,
              }}
            />
          </div>

          {/* Right: copy */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            style={{
              flex: 1,
              padding: 'clamp(1.5rem, 5vw, 3rem) clamp(1rem, 4vw, 2rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {/* Badge */}
            <motion.div
              variants={fadeUp}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'oklch(0.88 0.260 130 / 0.08)',
                border: '1px solid oklch(0.88 0.260 130 / 0.22)',
                borderRadius: '2rem',
                padding: '0.35rem 1rem',
                marginBottom: '1.5rem',
                width: 'fit-content',
              }}
            >
              <Sparkles size={13} color="var(--c-lime)" />
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--c-lime)',
              }}>
                Inteligencia Artificial
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              variants={fadeUp}
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(1.8rem, 5vw, 3rem)',
                letterSpacing: '-0.025em',
                textTransform: 'uppercase',
                lineHeight: 1.1,
                marginBottom: '1rem',
                textWrap: 'balance',
              }}
            >
              <span style={{ color: 'var(--c-ink)' }}>CREATIVIDAD</span><br />
              <span style={{ color: 'var(--c-lime)' }}>IMPULSADA</span>
              <span style={{ color: 'var(--c-ink)' }}> POR IA</span>
            </motion.h2>

            {/* Subtítulo */}
            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: 'oklch(0.65 0.020 260)',
                marginBottom: '0.75rem',
              }}
            >
              Adaptándonos a los nuevos entornos<br />digitales y tecnológicos
            </motion.p>

            {/* Body */}
            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: 'var(--c-muted)',
                lineHeight: 1.6,
                maxWidth: '46ch',
                marginBottom: '2rem',
                textWrap: 'pretty',
              }}
            >
              En Kubbox usamos inteligencia artificial como un aliado tecnológico para crear soluciones innovadoras y análisis más rápidos. Combinamos el ingenio humano con el poder de la automatización para diseñar estrategias que realmente funcionan.
            </motion.p>

            {/* CTA */}
            <motion.div variants={fadeUp}>
              <Button variant="primary" size="md" className="group gap-2">
                <span>Descubre nuestras soluciones</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @media (min-width: 769px) {
          .ai-card { flex-direction: row !important; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  )
}