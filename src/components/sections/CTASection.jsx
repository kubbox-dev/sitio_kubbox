import { motion } from 'framer-motion'
import GlowOrb from '../ui/GlowOrb'
import Button from '../ui/Button'
import { useScrollAnimation, fadeUp, scaleUp, staggerContainer } from '../../hooks/useScrollAnimation'

export default function CTASection() {
  const { ref, controls } = useScrollAnimation(0.15)

  return (
    <section
      id="contacto"
      style={{
        position: 'relative',
        overflow: 'hidden',
        paddingBlock: 'clamp(5rem, 12vw, 9rem)',
        textAlign: 'center',
      }}
    >
      <GlowOrb color="lime" size={700} top="-20%" left="10%" opacity={1.0} blur={140} />
      <GlowOrb color="teal" size={500} bottom="-10%" right="5%" opacity={0.8} blur={110} />

      {/* Bar chart visual */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 'var(--container)',
          marginInline: 'auto',
          paddingInline: 'var(--container-pad)',
        }}
      >
        {/* Inline bar chart decoration */}
        <div
          aria-hidden="true"
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            gap: '0.5rem',
            height: '120px',
            marginBottom: 'clamp(2rem, 4vw, 3.5rem)',
          }}
        >
          {[40, 60, 50, 80, 65, 90, 100, 75, 85].map((h, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: 'clamp(10px, 1.5vw, 18px)',
                height: `${h}%`,
                borderRadius: '3px 3px 0 0',
                background: i >= 7
                  ? 'var(--c-lime)'
                  : i >= 4
                    ? `oklch(0.72 0.150 190 / ${0.4 + i * 0.1})`
                    : `oklch(0.40 0.080 260 / ${0.3 + i * 0.08})`,
                transformOrigin: 'bottom',
              }}
            />
          ))}
        </div>

        {/* Headline */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={staggerContainer(0.1)}
        >
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              color: 'var(--c-ink)',
              lineHeight: 1,
              textWrap: 'balance',
              marginBottom: '0.25em',
            }}
          >
            LLEVAMOS TU ESTRATEGIA
          </motion.h2>
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(2.5rem, 7vw, 5.5rem)',
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              color: 'var(--c-lime)',
              lineHeight: 1,
              textWrap: 'balance',
              marginBottom: 'clamp(1.5rem, 4vw, 3rem)',
            }}
          >
            DIGITAL A OTRO NIVEL
          </motion.h2>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 2vw, 1.15rem)',
              color: 'var(--c-muted)',
              lineHeight: 1.7,
              maxWidth: '52ch',
              marginInline: 'auto',
              marginBottom: 'clamp(2rem, 4vw, 3rem)',
              textWrap: 'pretty',
            }}
          >
            Estamos listos para potenciar tu marca. Cuéntanos en qué etapa estás y construimos juntos la estrategia que te lleve al siguiente nivel.
          </motion.p>

          <motion.div
            variants={fadeUp}
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Button size="lg" variant="primary">
              Hablemos de tu proyecto
            </Button>
            <Button size="lg" variant="outline">
              Ver todos los servicios
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
