import { motion } from 'framer-motion'
import GlowOrb from '../ui/GlowOrb'
import Button from '../ui/Button'
import { useScrollAnimation, fadeUp, staggerContainer } from '../../hooks/useScrollAnimation'

const BARS = [40, 60, 50, 80, 65, 90, 100, 75, 85]

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
        marginTop: '-1px',
      }}
    >
      {/* Fade from dark ClientsSection above */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '22%',
          background: 'linear-gradient(to bottom, var(--c-bg), transparent)',
          pointerEvents: 'none', zIndex: 2,
        }}
      />

      <GlowOrb color="lime" size={700} top="-20%" left="10%" opacity={1.0} blur={140} />
      <GlowOrb color="teal" size={500} bottom="-10%" right="5%" opacity={0.8} blur={110} />

      {/* Beam spotlight from top center */}
      <div aria-hidden="true" className="cta-beam" />

      {/* Subtle grid texture */}
      <div aria-hidden="true" className="cta-grid-bg" />

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
        {/* Animated bar chart */}
        <div className="cta-bars-wrap" aria-hidden="true">
          {BARS.map((h, i) => {
            const isLime = i >= 6 && h === 100
            const isAccent = i >= 5
            return (
              <motion.div
                key={i}
                className={`cta-bar ${isLime ? 'cta-bar--peak' : isAccent ? 'cta-bar--accent' : ''}`}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                style={{ height: `${h}%` }}
              />
            )
          })}
        </div>

        {/* Animated divider line */}
        <motion.div
          className="cta-divider"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        />

        {/* Heading + copy + buttons */}
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
            <Button size="lg" variant="primary">Hablemos de tu proyecto</Button>
            <Button size="lg" variant="outline">Ver todos los servicios</Button>
          </motion.div>
        </motion.div>
      </motion.div>

      <style>{`
        /* Beam of light from top center */
        .cta-beam {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: min(900px, 100%);
          height: 65%;
          background: radial-gradient(ellipse 45% 65% at 50% 0%,
            oklch(0.88 0.26 130 / 0.09),
            transparent 80%
          );
          pointer-events: none;
          z-index: 0;
        }

        /* Grid texture */
        .cta-grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(oklch(0.30 0.02 260 / 0.06) 1px, transparent 1px),
            linear-gradient(90deg, oklch(0.30 0.02 260 / 0.06) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse 65% 55% at 50% 35%, black 15%, transparent 75%);
          pointer-events: none;
          z-index: 0;
        }

        /* Bar chart */
        .cta-bars-wrap {
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: clamp(4px, 0.55vw, 8px);
          height: 130px;
          margin-bottom: clamp(1.75rem, 3.5vw, 2.75rem);
        }

        .cta-bar {
          flex-shrink: 0;
          width: clamp(10px, 1.5vw, 18px);
          border-radius: 3px 3px 0 0;
          background: oklch(0.40 0.080 260 / 0.35);
          transform-origin: bottom;
        }
        .cta-bar--accent {
          background: oklch(0.72 0.150 190 / 0.6);
        }
        .cta-bar--peak {
          background: var(--c-lime);
          box-shadow: 0 -8px 32px oklch(0.88 0.26 130 / 0.55),
                      0 0 0 1px oklch(0.88 0.26 130 / 0.3);
          animation: peak-glow 2s ease-in-out infinite alternate;
        }
        @keyframes peak-glow {
          from { box-shadow: 0 -8px 28px oklch(0.88 0.26 130 / 0.45), 0 0 0 1px oklch(0.88 0.26 130 / 0.25); }
          to   { box-shadow: 0 -12px 44px oklch(0.88 0.26 130 / 0.70), 0 0 0 1px oklch(0.88 0.26 130 / 0.45); }
        }

        /* Animated divider line */
        .cta-divider {
          width: clamp(80px, 15vw, 160px);
          height: 1.5px;
          background: linear-gradient(to right, transparent, var(--c-lime), transparent);
          margin-inline: auto;
          margin-bottom: clamp(1.5rem, 4vw, 2.5rem);
          transform-origin: left;
        }
      `}</style>
    </section>
  )
}
