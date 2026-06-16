import { motion } from 'framer-motion'

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

export default function ContactHeroSection() {
  return (
    <section
      className="contact-hero"
      style={{
        position: 'relative',
        minHeight: 'clamp(360px, 46vw, 560px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        paddingTop: '6rem',
        paddingBottom: '2.5rem',
        paddingInline: 'clamp(1rem, 4vw, 3rem)',
      }}
    >
      <style>{`
        @media (max-width: 767px) {
          .contact-hero-bg-layers {
            mask-image: linear-gradient(to bottom, black 0%, black 50%, transparent 75%) !important;
            -webkit-mask-image: linear-gradient(to bottom, black 0%, black 50%, transparent 75%) !important;
          }
          .contact-hero { min-height: clamp(260px, 58vw, 380px) !important; }
        }
      `}</style>

      {/* ── Capas de fondo — mismo triángulo del Hero principal ── */}
      <div
        aria-hidden="true"
        className="contact-hero-bg-layers"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          maskImage: 'linear-gradient(to bottom, black 0%, black 58%, transparent 88%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 58%, transparent 88%)',
        }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 100% 95% at 50% 10%, oklch(0.14 0.032 250 / 0.97) 0%, oklch(0.11 0.028 250 / 0.92) 45%, oklch(0.08 0.022 250 / 0.55) 100%)',
          clipPath: 'polygon(-20% -5%, 120% -5%, 50% 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'oklch(0.18 0.036 245 / 0.50)',
          clipPath: 'polygon(-15.1% -5%, 115.1% -5%, 50% 92.65%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'oklch(0.16 0.032 245 / 0.40)',
          clipPath: 'polygon(-10.2% -5%, 110.2% -5%, 50% 85.3%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'oklch(0.14 0.028 245 / 0.30)',
          clipPath: 'polygon(-5.3% -5%, 105.3% -5%, 50% 77.95%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(oklch(0.40 0.015 260 / 0.18) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 65% 65% at 50% 35%, black 25%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 65% 65% at 50% 35%, black 25%, transparent 75%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: '300px 300px',
          opacity: 0.032,
          mixBlendMode: 'overlay',
        }} />
      </div>

      {/* ── Título ── */}
      <div style={{ overflow: 'hidden', position: 'relative', zIndex: 2 }}>
        <motion.h1
          variants={lineReveal(0)}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontStyle: 'italic',
            fontSize: 'clamp(3.25rem, 14vw, 9.5rem)',
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            margin: 0,
            ...NEON_STYLE,
          }}
        >
          CONTACTO
        </motion.h1>
      </div>
    </section>
  )
}
