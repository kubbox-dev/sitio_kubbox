import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

/* Slide-up reveal per línea — parent necesita overflow:hidden */
const lineReveal = (delay = 0) => ({
  hidden:  { y: '110%', opacity: 0, skewY: 2 },
  visible: { y: '0%',   opacity: 1, skewY: 0,
    transition: { delay, duration: 1.0, ease: [0.16, 1, 0.3, 1] } },
})

const NEON_SHADOW =
  '0 0 7px var(--c-lime), 0 0 18px var(--c-lime), ' +
  '0 0 45px oklch(0.88 0.260 130 / 0.80), ' +
  '0 0 90px oklch(0.88 0.260 130 / 0.40), ' +
  '0 0 160px oklch(0.88 0.260 130 / 0.20)'

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
      {/* Dot grid texture */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(oklch(0.45 0.020 260 / 0.30) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          maskImage: 'radial-gradient(ellipse 85% 85% at 50% 50%, black 45%, transparent 100%)',
          zIndex: 0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '1300px' }}>

        {/* ── TU MARCA EN ──────────────────────────── */}
        <div style={{ overflow: 'hidden' }}>
          <motion.h1
            variants={lineReveal(0)}
            initial="hidden"
            animate="visible"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontStyle: 'italic',
              fontSize: 'clamp(2.8rem, 10.5vw, 8.5rem)',
              lineHeight: 0.92,
              letterSpacing: '-0.025em',
              textTransform: 'uppercase',
              color: 'var(--c-ink)',
              margin: 0,
              whiteSpace: 'nowrap',
            }}
          >
            TU MARCA EN
          </motion.h1>
        </div>

        {/* ── EL MUNDO ─────────────────────────────── */}
        <div style={{ overflow: 'hidden' }}>
          <motion.div
            variants={lineReveal(0.14)}
            initial="hidden"
            animate="visible"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontStyle: 'italic',
              fontSize: 'clamp(3.5rem, 15.5vw, 13rem)',
              lineHeight: 0.88,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              color: 'var(--c-lime)',
              textShadow: NEON_SHADOW,
              whiteSpace: 'nowrap',
            }}
          >
            EL MUNDO
          </motion.div>
        </div>

        {/* ── DIGITAL ──────────────────────────────── */}
        <div style={{ overflow: 'hidden', marginBottom: 'clamp(2rem, 5vw, 4.5rem)' }}>
          <motion.div
            variants={lineReveal(0.26)}
            initial="hidden"
            animate="visible"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontStyle: 'italic',
              fontSize: 'clamp(4rem, 18vw, 15.5rem)',
              lineHeight: 0.88,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              color: 'var(--c-lime)',
              textShadow: NEON_SHADOW,
              whiteSpace: 'nowrap',
            }}
          >
            DIGITAL
          </motion.div>
        </div>

        {/* ── CONOCE NUESTROS PROYECTOS ────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.72, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <a
            href="#experiencia"
            style={{ display: 'inline-block', textDecoration: 'none', cursor: 'pointer' }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontStyle: 'italic',
                fontSize: 'clamp(1.2rem, 3.2vw, 2.4rem)',
                letterSpacing: '-0.01em',
                textTransform: 'uppercase',
                color: 'var(--c-ink)',
                lineHeight: 1.1,
                display: 'block',
              }}
            >
              CONOCE NUESTROS
            </span>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontStyle: 'italic',
                fontSize: 'clamp(1.2rem, 3.2vw, 2.4rem)',
                letterSpacing: '-0.01em',
                textTransform: 'uppercase',
                color: 'transparent',
                WebkitTextFillColor: 'transparent',
                WebkitTextStroke: '1.5px oklch(0.98 0 0 / 0.60)',
                lineHeight: 1.1,
                display: 'block',
              }}
            >
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
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          style={{ color: 'var(--c-muted)' }}
        >
          <ArrowDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  )
}
