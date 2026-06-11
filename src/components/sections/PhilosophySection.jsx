import { motion } from 'framer-motion'
import { useScrollAnimation, fadeUp, scaleUp, staggerContainer } from '../../hooks/useScrollAnimation'

const CUBES = [
  {
    quote: 'Lo visual no es un adorno,\nes la forma en que se entienden.',
    color: 'var(--c-lime)',
  },
  {
    quote: 'Cuando la identidad se construye bien,\nla marca encuentra su rol en el mundo.',
    color: 'var(--c-teal)',
  },
  {
    quote: 'Cada detalle cuenta cuando se\ndiseña con intención.',
    color: 'var(--c-lime)',
  },
]

const TAGLINE = 'Nuestro trabajo es que esa historia se vea, se sienta y permanezca. Por eso acompañamos a cada marca en procesos creativos que deben comunicar y reforzar su presencia. Ofrecemos soluciones visuales para que cada identidad tenga las formas que le funcionan.'

export default function PhilosophySection() {
  const { ref, controls } = useScrollAnimation(0.1)

  return (
    <section
      style={{
        paddingBlock: 'clamp(4rem, 10vw, 7rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 'var(--container)', marginInline: 'auto', paddingInline: 'var(--container-pad)' }}>

        {/* 3D Cube icons row */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer(0.15)}
          style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(1.5rem, 5vw, 4rem)', marginBottom: 'clamp(3rem, 6vw, 5rem)', flexWrap: 'wrap' }}
        >
          {CUBES.map(({ quote, color }, i) => (
            <motion.div
              key={i}
              variants={scaleUp}
              style={{ textAlign: 'center', maxWidth: '280px' }}
            >
              <CubeIcon color={color} index={i} />
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: 'var(--c-muted)',
                lineHeight: 1.6,
                marginTop: '1.25rem',
                whiteSpace: 'pre-line',
                textWrap: 'pretty',
              }}>
                {quote}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Tagline */}
        <motion.p
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={fadeUp}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 1.8vw, 1.15rem)',
            color: 'var(--c-muted)',
            lineHeight: 1.75,
            maxWidth: '72ch',
            marginInline: 'auto',
            textAlign: 'center',
            textWrap: 'pretty',
          }}
        >
          {TAGLINE}
        </motion.p>
      </div>
    </section>
  )
}

function CubeIcon({ color, index }) {
  const rotations = ['rotateY(20deg) rotateX(-10deg)', 'rotateY(-15deg) rotateX(12deg)', 'rotateY(25deg) rotateX(-8deg)']

  return (
    <motion.div
      animate={{ rotateY: [0, 8, -8, 0] }}
      transition={{ repeat: Infinity, duration: 5 + index, ease: 'easeInOut', delay: index * 0.8 }}
      style={{
        width: '4rem',
        height: '4rem',
        marginInline: 'auto',
        background: `linear-gradient(135deg, ${color}22, ${color}44)`,
        border: `1px solid ${color}55`,
        borderRadius: '0.75rem',
        transform: rotations[index % rotations.length],
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: `0 0 30px ${color}22`,
      }}
    >
      <div style={{
        width: '2rem',
        height: '2rem',
        background: `linear-gradient(135deg, ${color}88, ${color}44)`,
        borderRadius: '0.375rem',
        border: `1px solid ${color}66`,
      }} />
    </motion.div>
  )
}
