import { motion, useReducedMotion } from 'framer-motion'

const SOLID_STYLE = { color: 'var(--c-lime)', WebkitTextFillColor: 'transparent', WebkitTextStroke: '2px var(--c-lime)' }
const OUTLINE_STYLE = { color: 'var(--c-ink)' }

export default function HeroBlock({ eyebrowLime, eyebrowWhite, logo, logoAlt = '', art, artAlt = '' }) {
  const reduce = useReducedMotion()
  const lineReveal = (delay = 0) => ({
    hidden: { y: reduce ? 0 : '110%', opacity: 0, skewY: reduce ? 0 : 1 },
    visible: {
      y: '0%',
      opacity: 1,
      skewY: 0,
      transition: { delay, duration: reduce ? 0.4 : 1.0, ease: [0.16, 1, 0.3, 1] },
    },
  })
  const rise = (delay = 0) => ({
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  })
  return (
    <section className="relative overflow-hidden pt-[clamp(6rem,12vw,9rem)] pb-[clamp(2rem,5vw,3.5rem)] text-center">
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

      <div
        className="mx-auto flex max-w-[var(--container)] flex-col items-center gap-[clamp(1.5rem,4vw,2.5rem)] px-[var(--container-pad)]"
        style={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        <h1 className="m-0 [font-family:var(--font-display)] text-[clamp(2.5rem,9vw,6rem)] font-black italic uppercase leading-[0.9] tracking-[-0.02em]">
          <div className="overflow-hidden">
            <motion.div variants={lineReveal(0)} initial="hidden" animate="visible" style={SOLID_STYLE}>
              {eyebrowLime}
            </motion.div>
          </div>
          <div className="">
            <motion.div variants={lineReveal(0.12)} initial="hidden" animate="visible" style={OUTLINE_STYLE}>
              {eyebrowWhite}
            </motion.div>
          </div>
        </h1>
        {logo && <motion.img variants={rise(0.32)} initial="hidden" animate="show" src={logo} alt={logoAlt} className="h-[clamp(2.5rem,7vw,4rem)] w-auto" />}
        {art && <motion.img variants={rise(0.42)} initial="hidden" animate="show" src={art} alt={artAlt} className="h-auto w-[clamp(180px,40vw,320px)]" />}
      </div>
    </section>
  )
}