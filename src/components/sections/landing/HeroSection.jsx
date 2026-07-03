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
        justifyContent: 'flex-start',
        alignItems: 'center',
        textAlign: 'center',
        paddingTop: 'clamp(5.5rem, 18svh, 10rem)',
        paddingBottom: '5rem',
        paddingInline: 'clamp(1rem, 4vw, 3rem)',
      }}
    >
      <style>{`
        @media (max-width: 767px) {
          .hero-bg-layers {
            mask-image: linear-gradient(to bottom, black 0%, black 50%, transparent 75%) !important;
            -webkit-mask-image: linear-gradient(to bottom, black 0%, black 50%, transparent 85%) !important;
          }
          #inicio {
            min-height: 90svh !important;
          }
        }
      `}</style>

      {/* ── Capas de fondo — con fade en la base para fluir hacia Projects ── */}
      <div
        aria-hidden="true"
        className="hero-bg-layers"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          maskImage: 'linear-gradient(to bottom, black 0%, black 58%, transparent 88%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 58%, transparent 88%)',
        }}
      >
        {/* Triángulo relleno */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 100% 95% at 50% 10%, oklch(0.14 0.032 250 / 0.97) 0%, oklch(0.11 0.028 250 / 0.92) 45%, oklch(0.08 0.022 250 / 0.55) 100%)',
          clipPath: 'polygon(-20% -5%, 120% -5%, 50% 100%)',
        }} />
        {/* Franja s=0.93 */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'oklch(0.18 0.036 245 / 0.50)',
          clipPath: 'polygon(-15.1% -5%, 115.1% -5%, 50% 92.65%)',
        }} />
        {/* Franja s=0.86 */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'oklch(0.16 0.032 245 / 0.40)',
          clipPath: 'polygon(-10.2% -5%, 110.2% -5%, 50% 85.3%)',
        }} />
        {/* Franja s=0.79 */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'oklch(0.14 0.028 245 / 0.30)',
          clipPath: 'polygon(-5.3% -5%, 105.3% -5%, 50% 77.95%)',
        }} />
        {/* Dot grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(oklch(0.40 0.015 260 / 0.18) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 65% 65% at 50% 35%, black 25%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 65% 65% at 50% 35%, black 25%, transparent 75%)',
        }} />
        {/* Noise grain */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: '300px 300px',
          opacity: 0.032,
          mixBlendMode: 'overlay',
        }} />
      </div>

{/* ── Contenido ───────────────────────────────────────────────── */}
      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: '1200px' }}>

        {/* TRANSFORMAMOS IDEAS EN */}
        <div style={{ overflow: 'hidden' }}>
          <motion.h1
            variants={lineReveal(0)}
            initial="hidden"
            animate="visible"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontStyle: 'italic',
              fontSize: 'clamp(1.4rem, 4.8vw, 3.8rem)',
              lineHeight: 0.92,
              letterSpacing: '-0.025em',
              textTransform: 'uppercase',
              color: 'var(--c-ink)',
              margin: 0,
            }}
          >
            TRANSFORMAMOS IDEAS EN
          </motion.h1>
        </div>

        {/* SOLUCIONES DIGITALES — hollow outline */}
        <div style={{ overflow: 'hidden' }}>
          <motion.div
            variants={lineReveal(0.12)}
            initial="hidden"
            animate="visible"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontStyle: 'italic',
              fontSize: 'clamp(1.8rem, 6.8vw, 5.4rem)',
              lineHeight: 0.88,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              ...NEON_STYLE,
            }}
          >
            SOLUCIONES DIGITALES
          </motion.div>
        </div>

        {/* QUE GENERAN — sólido blanco */}
        <div style={{ overflow: 'hidden' }}>
          <motion.div
            variants={lineReveal(0.22)}
            initial="hidden"
            animate="visible"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontStyle: 'italic',
              fontSize: 'clamp(1.4rem, 5vw, 4rem)',
              lineHeight: 0.92,
              letterSpacing: '-0.025em',
              textTransform: 'uppercase',
              color: 'var(--c-ink)',
            }}
          >
            QUE GENERAN
          </motion.div>
        </div>

        {/* RESULTADOS — hollow outline, remate grande */}
        <div style={{ overflow: 'hidden', marginBottom: 'clamp(2rem, 5vw, 4rem)' }}>
          <motion.div
            variants={lineReveal(0.32)}
            initial="hidden"
            animate="visible"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontStyle: 'italic',
              fontSize: 'clamp(2.8rem, 11vw, 8.5rem)',
              lineHeight: 0.88,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              ...NEON_STYLE,
            }}
          >
            RESULTADOS
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
