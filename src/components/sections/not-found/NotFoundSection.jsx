import { motion, useReducedMotion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Button from '../../ui/Button'

const HOLLOW_STYLE = { color: 'transparent', WebkitTextFillColor: 'transparent', WebkitTextStroke: '1.5px oklch(0.98 0 0 / 0.55)' }

export default function NotFoundSection() {
  const reduce = useReducedMotion()
  const navigate = useNavigate()

  const lineReveal = (delay = 0) => ({
    hidden: { y: reduce ? 0 : '110%', opacity: 0, skewY: reduce ? 0 : 1 },
    visible: { y: '0%', opacity: 1, skewY: 0, transition: { delay, duration: reduce ? 0.4 : 1.0, ease: [0.16, 1, 0.3, 1] } },
  })
  const rise = (delay = 0) => ({
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { delay, duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  })

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden py-[clamp(6rem,12vw,9rem)] text-center">
      <div
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 90% 75% at 50% 32%, oklch(0.15 0.034 250 / 0.95) 0%, oklch(0.10 0.026 260 / 0.65) 55%, transparent 100%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(oklch(0.40 0.015 260 / 0.18) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 60% 60% at 50% 40%, black 25%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 40%, black 25%, transparent 75%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: '300px 300px',
          opacity: 0.032,
          mixBlendMode: 'overlay',
        }} />
      </div>

      <div className="relative z-[1] mx-auto flex max-w-[var(--container)] flex-col items-center gap-[clamp(1.5rem,4vw,2.5rem)] px-[var(--container-pad)]">
        <h1 className="m-0 [font-family:var(--font-display)] font-black italic uppercase">
          <div className="overflow-hidden">
            <motion.div
              variants={lineReveal(0)}
              initial="hidden"
              animate="visible"
              className="text-[clamp(3.5rem,12vw,7rem)] leading-[0.88] tracking-[-0.03em]"
              style={{ color: 'var(--c-lime)' }}
            >
              404
            </motion.div>
          </div>
          <div className="overflow-hidden">
            <motion.div
              variants={lineReveal(0.14)}
              initial="hidden"
              animate="visible"
              className="text-[clamp(1.5rem,4.5vw,2.75rem)] leading-[0.95] tracking-[-0.02em]"
              style={HOLLOW_STYLE}
            >
              ESTE LINK SE PERDIÓ
            </motion.div>
          </div>
        </h1>

        <motion.div
          variants={rise(0.32)}
          initial="hidden"
          animate="show"
          aria-hidden="true"
          className="h-[2px] w-[clamp(3rem,7vw,4.5rem)] [background:var(--c-lime)] opacity-80"
        />

        <motion.p
          variants={rise(0.4)}
          initial="hidden"
          animate="show"
          className="m-0 max-w-[42ch] [font-family:var(--font-body)] text-[clamp(1rem,1.6vw,1.15rem)] leading-[1.65]"
          style={{ color: 'var(--c-ink)', opacity: 0.85 }}
        >
          Esta página no existe, se movió o nunca estuvo aquí. Volvamos a terreno conocido.
        </motion.p>

        <motion.div
          variants={rise(0.5)}
          initial="hidden"
          animate="show"
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Button variant="primary" size="lg" onClick={() => navigate('/')}>Volver al inicio</Button>
          <Button variant="outline" size="lg" onClick={() => navigate('/proyectos')}>Ver proyectos</Button>
        </motion.div>
      </div>
    </section>
  )
}
