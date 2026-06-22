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
      {/* Keyframes only — Tailwind has no utility-class way to author @keyframes,
          same exception already used by the router's PageLoader spinner. */}
      <style>{`
        @keyframes nf-glitch {
          0%, 70%, 100% { opacity: 1; filter: none; }
          72% { opacity: 0.8; filter: drop-shadow(3px 0 oklch(0.72 0.150 190 / 0.8)) drop-shadow(-3px 0 oklch(0.88 0.260 130 / 0.6)); }
          74% { opacity: 1; filter: drop-shadow(-3px 0 oklch(0.72 0.150 190 / 0.8)) drop-shadow(3px 0 oklch(0.88 0.260 130 / 0.6)); }
          76% { opacity: 0.55; filter: none; }
          78% { opacity: 1; filter: drop-shadow(2px 0 oklch(0.72 0.150 190 / 0.7)) drop-shadow(-2px 0 oklch(0.88 0.260 130 / 0.5)); }
          80% { opacity: 0.7; filter: none; }
          84%, 100% { opacity: 1; filter: none; }
        }
        @keyframes nf-scan { 0% { background-position: 0 0; } 100% { background-position: 0 9px; } }
      `}</style>

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

      {/* Scanlines — sits above the content, like a CRT screen losing the signal */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
          backgroundImage: 'repeating-linear-gradient(to bottom, oklch(1 0 0 / 0.04) 0px, oklch(1 0 0 / 0.04) 1px, transparent 1px, transparent 3px)',
          mixBlendMode: 'overlay',
          animation: reduce ? 'none' : 'nf-scan 0.25s linear infinite',
        }}
      />

      <div className="relative z-[1] mx-auto flex max-w-[var(--container)] flex-col items-center gap-[clamp(1.5rem,4vw,2.5rem)] px-[var(--container-pad)]">
        <h1 className="m-0 [font-family:var(--font-display)] font-black italic uppercase">
          <div>
            <motion.div
              variants={lineReveal(0.1)}
              initial="hidden"
              animate="visible"
              className="text-[clamp(3.5rem,12vw,7rem)] leading-[0.88] tracking-[-0.03em]"
              style={{ color: 'var(--c-lime)', animation: reduce ? 'none' : 'nf-glitch 3.5s ease-in-out 0.6s infinite' }}
            >
              404
            </motion.div>
          </div>
        </h1>

        <motion.div
          variants={rise(0.42)}
          initial="hidden"
          animate="show"
          aria-hidden="true"
          className="h-[2px] w-[clamp(3rem,7vw,4.5rem)] [background:var(--c-lime)] opacity-80"
        />

        <motion.p
          variants={rise(0.5)}
          initial="hidden"
          animate="show"
          className="m-0 max-w-[42ch] [font-family:var(--font-body)] text-[clamp(1rem,1.6vw,1.15rem)] leading-[1.65]"
          style={{ color: 'var(--c-ink)', opacity: 0.85 }}
        >
          Esta página no existe, se movió o nunca estuvo aquí. Volvamos a terreno conocido.
        </motion.p>

        <motion.div
          variants={rise(0.6)}
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
