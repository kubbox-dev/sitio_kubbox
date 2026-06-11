import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'
import GlowOrb from '../ui/GlowOrb'
import Button from '../ui/Button'
import { SplineScene } from '../ui/SplineScene'
import { Spotlight } from '../ui/Spotlight'
import { useScrollAnimation, fadeUp, staggerContainer } from '../../hooks/useScrollAnimation'

const SPLINE_ROBOT = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'

export default function AISection() {
  const { ref, controls } = useScrollAnimation(0.15)

  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        paddingBlock: 'clamp(4rem, 10vw, 7rem)',
      }}
    >
      <GlowOrb color="teal" size={600} top="-15%" left="10%"  opacity={0.70} blur={140} />
      <GlowOrb color="lime" size={350} bottom="-5%" right="8%" opacity={0.55} blur={100} />

      <div
        style={{
          maxWidth: 'var(--container)',
          marginInline: 'auto',
          paddingInline: 'var(--container-pad)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* ── Layout split ─────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            display: 'flex',
            minHeight: '520px',
          }}
          className="ai-card"
        >
          {/* Spotlight — cursor glow */}
          <Spotlight size={320} />

          {/* ── Left: Spline robot ───────────────────── */}
          <div
            style={{
              flex: 1,
              position: 'relative',
              minHeight: '420px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* "IA" ghost text — z-index 2 so queda sobre el robot como watermark */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(8rem, 18vw, 16rem)',
                letterSpacing: '-0.04em',
                color: 'transparent',
                WebkitTextStroke: '1.5px oklch(0.88 0.260 130 / 0.22)',
                userSelect: 'none',
                pointerEvents: 'none',
                zIndex: 2,
              }}
            >
              IA
            </div>

            {/* Spline scene */}
            <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%', minHeight: '420px' }}>
              <SplineScene scene={SPLINE_ROBOT} className="w-full h-full" />
            </div>

            {/* Bottom fade */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '30%',
                background: 'linear-gradient(to top, var(--c-bg), transparent)',
                pointerEvents: 'none',
                zIndex: 3,
              }}
            />
          </div>

          {/* ── Right: copy ─────────────────────────── */}
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={staggerContainer(0.12, 0.15)}
            style={{
              flex: 1,
              padding: 'clamp(2rem, 5vw, 3.5rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 1,
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
                padding: '0.375rem 1rem',
                marginBottom: '1.5rem',
                width: 'fit-content',
              }}
            >
              <Sparkles size={13} color="var(--c-lime)" />
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.10em',
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
                fontSize: 'clamp(1.8rem, 4vw, 3.25rem)',
                letterSpacing: '-0.025em',
                textTransform: 'uppercase',
                lineHeight: 1.05,
                marginBottom: '1.25rem',
                textWrap: 'balance',
              }}
            >
              <span style={{ color: 'var(--c-ink)' }}>CREATIVIDAD</span><br />
              <span style={{ color: 'var(--c-lime)' }}>IMPULSADA</span>
              <span style={{ color: 'var(--c-ink)' }}> POR IA</span>
            </motion.h2>

            {/* Sub */}
            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                color: 'oklch(0.65 0.020 260)',
                marginBottom: '1rem',
              }}
            >
              Adaptándonos a los nuevos entornos<br />digitales y tecnológicos
            </motion.p>

            {/* Body copy */}
            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                color: 'var(--c-muted)',
                lineHeight: 1.75,
                maxWidth: '46ch',
                marginBottom: '2rem',
                textWrap: 'pretty',
              }}
            >
              En Kubbox usamos inteligencia artificial como un aliado tecnológico para crear soluciones innovadoras y analíticas más rápidas. Combinamos el ingenio humano con el poder de la automatización para diseñar estrategias que realmente funcionan.
            </motion.p>

            {/* CTA */}
            <motion.div variants={fadeUp}>
              <Button variant="primary" size="md">
                <span>Descubre nuestras soluciones</span>
                <ArrowRight size={16} />
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .ai-card { flex-direction: column !important; }
        }
      `}</style>
    </section>
  )
}
