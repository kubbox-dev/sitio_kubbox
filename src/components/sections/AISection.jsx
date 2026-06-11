import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import GlowOrb from '../ui/GlowOrb'
import Button from '../ui/Button'
import { useScrollAnimation, fadeUp, scaleUp, staggerContainer } from '../../hooks/useScrollAnimation'

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
      <GlowOrb color="teal" size={600} top="-10%" left="20%" opacity={0.9} blur={130} />
      <GlowOrb color="lime" size={350} bottom="0%" right="10%" opacity={0.7} blur={90} />

      <div
        style={{
          maxWidth: 'var(--container)',
          marginInline: 'auto',
          paddingInline: 'var(--container-pad)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(2rem, 6vw, 5rem)',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Left — giant IA text */}
        <motion.div
          initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
          whileInView={{ opacity: 1, clipPath: 'inset(0% 0 0 0)' }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: 'relative' }}
        >
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(8rem, 22vw, 16rem)',
              lineHeight: 0.85,
              letterSpacing: '-0.04em',
              color: 'transparent',
              WebkitTextStroke: '2px var(--c-lime)',
              userSelect: 'none',
              position: 'relative',
            }}
          >
            IA
            {/* Glow behind the text */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: '-20px',
                background: 'radial-gradient(ellipse 60% 60% at 50% 50%, oklch(0.88 0.260 130 / 0.12), transparent)',
                pointerEvents: 'none',
                zIndex: -1,
              }}
            />
          </div>

          {/* Floating phone placeholder */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            style={{
              width: 'clamp(120px, 20vw, 180px)',
              aspectRatio: '9/16',
              background: 'linear-gradient(160deg, oklch(0.18 0.030 260), oklch(0.12 0.025 260))',
              borderRadius: '1.5rem',
              border: '2px solid oklch(0.28 0.028 260)',
              position: 'absolute',
              bottom: '-1rem',
              right: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 40px oklch(0.72 0.150 190 / 0.25)',
            }}
          >
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '2rem', color: 'var(--c-teal)' }}>
              📱
            </span>
          </motion.div>
        </motion.div>

        {/* Right — copy */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={staggerContainer(0.12, 0.2)}
        >
          <motion.div
            variants={fadeUp}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'oklch(0.88 0.260 130 / 0.10)',
              border: '1px solid oklch(0.88 0.260 130 / 0.30)',
              borderRadius: '2rem',
              padding: '0.375rem 1rem',
              marginBottom: '1.5rem',
            }}
          >
            <Sparkles size={14} color="var(--c-lime)" />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--c-lime)' }}>
              Inteligencia Artificial
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              color: 'var(--c-ink)',
              lineHeight: 1.05,
              marginBottom: '1.25rem',
              textWrap: 'balance',
            }}
          >
            CREATIVIDAD <br />
            <span style={{ color: 'var(--c-lime)' }}>IMPULSADA</span> POR IA
          </motion.h2>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: 'var(--c-muted)',
              lineHeight: 1.7,
              maxWidth: '52ch',
              marginBottom: '2rem',
            }}
          >
            En Kubbox usamos inteligencia artificial como un aliado tecnológico para crear soluciones innovadoras y analíticas más rápidas y eficientes. Combinamos el ingenio humano con el poder de la automatización para diseñar estrategias, optimizar procesos y generar contenido que funciona.
          </motion.p>

          <motion.div variants={fadeUp}>
            <Button variant="outline" size="md">
              Descubre nuestras soluciones
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
