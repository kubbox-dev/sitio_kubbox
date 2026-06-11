import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import GlowOrb from '../ui/GlowOrb'
import Button from '../ui/Button'

const HEADLINE_WORDS_1 = ['TU', 'MARCA', 'EN']
const HEADLINE_WORDS_2 = ['EL', 'MUNDO', 'DIGITAL']

const wordVariant = {
  hidden:  { opacity: 0, y: 60, skewY: 4 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: { delay: i * 0.1, duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  }),
}

const subtitleVariant = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.75, duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}

const ctaVariant = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { delay: 0.95, duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
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
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        overflow: 'hidden',
        paddingTop: '6rem',
        paddingBottom: '4rem',
        paddingInline: 'var(--container-pad)',
      }}
    >
      {/* Atmospheric orbs — match design: large teal left, lime right */}
      <GlowOrb color="teal" size={800} top="-20%" left="-20%" opacity={1.4} blur={140} />
      <GlowOrb color="lime" size={700} top="10%"  right="-15%" opacity={1.1} blur={130} />
      <GlowOrb color="teal" size={500} bottom="0%" left="25%"  opacity={0.8} blur={110} />

      {/* Dot grid overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(oklch(0.40 0.020 260 / 0.35) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          zIndex: 0,
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px' }}>
        {/* Line 1 — white */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0 0.4em',
            overflow: 'hidden',
          }}
        >
          {HEADLINE_WORDS_1.map((word, i) => (
            <motion.span
              key={word}
              custom={i}
              variants={wordVariant}
              initial="hidden"
              animate="visible"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(3.5rem, 9vw, 6rem)',
                lineHeight: 1,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                color: 'var(--c-ink)',
                display: 'block',
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>

        {/* Line 2 — neon lime */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0 0.4em',
            overflow: 'hidden',
          }}
        >
          {HEADLINE_WORDS_2.map((word, i) => (
            <motion.span
              key={word}
              custom={i + HEADLINE_WORDS_1.length}
              variants={wordVariant}
              initial="hidden"
              animate="visible"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(3.5rem, 9vw, 6rem)',
                lineHeight: 1,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                color: 'var(--c-lime)',
                display: 'block',
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>

        {/* Subtitle */}
        <motion.p
          variants={subtitleVariant}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            fontWeight: 400,
            color: 'var(--c-muted)',
            marginTop: '1.5rem',
            maxWidth: '52ch',
            marginInline: 'auto',
            lineHeight: 1.7,
          }}
        >
          Agencia de marketing digital que transforma marcas en experiencias que conectan, convierten y perduran.
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={ctaVariant}
          initial="hidden"
          animate="visible"
          style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Button size="lg" variant="primary" as="a" href="#experiencia">
            Conoce nuestros proyectos
          </Button>
          <Button size="lg" variant="outline" as="a" href="#servicios">
            Nuestros servicios
          </Button>
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
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.375rem',
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
