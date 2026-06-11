import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

const BG_DARK = 'oklch(0.06 0.018 260)'
const transparent = 'transparent'
const lineReveal = (delay = 0) => ({
  hidden:  { y: '110%', opacity: 0, skewY: 1 },
  visible: { y: '0%',   opacity: 1, skewY: 0,
    transition: { delay, duration: 1.0, ease: [0.16, 1, 0.3, 1] } },
})

const NEON_STYLE = {
  color: 'var(--c-lime)',
  WebkitTextFillColor: transparent,
  WebkitTextStroke: '2px var(--c-lime)',
}

export default function HeroSection() {
  return (
    <section
      id="inicio"
      style={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        overflow: 'hidden',
        paddingTop: '5rem',
        paddingBottom: '5rem',
        paddingInline: 'clamp(1rem, 4vw, 3rem)',
      }}
    >
      {/* ── Triángulo invertido con degradado interno ─────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 100% 95% at 50% 10%, oklch(0.06 0.018 260 / 0.96) 0%, oklch(0.06 0.018 260 / 0.90) 45%, oklch(0.06 0.018 260 / 0.45) 100%)',
          clipPath: 'polygon(-20% -5%, 120% -5%, 50% 100%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* ── Dot grid texture — sutil ────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(oklch(0.40 0.015 260 / 0.18) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 65% 65% at 50% 35%, black 25%, transparent 75%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* ── Contenido ───────────────────────────────────────────────── */}
      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '1200px' }}>

        {/* TU MARCA EN */}
        <div style={{ overflow: 'hidden' }}>
          <motion.h1
            variants={lineReveal(0)}
            initial="hidden"
            animate="visible"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontStyle: 'italic',
              fontSize: 'clamp(2.5rem, 9vw, 7.5rem)',
              lineHeight: 0.92,
              letterSpacing: '-0.025em',
              textTransform: 'uppercase',
              color: 'var(--c-ink)',
              margin: 0,
            }}
          >
            TU MARCA EN
          </motion.h1>
        </div>

        {/* EL MUNDO — hollow outline */}
        <div style={{ overflow: 'hidden' }}>
          <motion.div
            variants={lineReveal(0.14)}
            initial="hidden"
            animate="visible"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontStyle: 'italic',
              fontSize: 'clamp(3rem, 14vw, 11rem)',
              lineHeight: 0.88,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              ...NEON_STYLE,
            }}
          >
            EL MUNDO
          </motion.div>
        </div>

        {/* DIGITAL — hollow outline */}
        <div style={{ overflow: 'hidden', marginBottom: 'clamp(2rem, 5vw, 4rem)' }}>
          <motion.div
            variants={lineReveal(0.26)}
            initial="hidden"
            animate="visible"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontStyle: 'italic',
              fontSize: 'clamp(3.5rem, 16vw, 13.5rem)',
              lineHeight: 0.88,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              ...NEON_STYLE,
            }}
          >
            DIGITAL
          </motion.div>
        </div>

        {/* CONOCE NUESTROS / PROYECTOS */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <a href="#experiencia" style={{ display: 'inline-block', textDecoration: 'none', cursor: 'pointer' }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontStyle: 'italic',
              fontSize: 'clamp(1rem, 2.8vw, 2.1rem)',
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
              color: 'var(--c-ink)',
              lineHeight: 1.1,
              display: 'block',
            }}>
              CONOCE NUESTROS
            </span>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontStyle: 'italic',
              fontSize: 'clamp(1rem, 2.8vw, 2.1rem)',
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
              WebkitTextFillColor: 'transparent',
              WebkitTextStroke: '1.5px oklch(0.98 0 0 / 0.55)',
              lineHeight: 1.1,
              display: 'block',
            }}>
              PROYECTOS
            </span>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)' }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          style={{
            color: 'var(--c-muted)',
            background: 'oklch(0.12 0.020 260 / 0.55)',
            border: '1px solid oklch(0.28 0.020 260)',
            borderRadius: '50%',
            padding: '0.45rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ArrowDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  )
}
