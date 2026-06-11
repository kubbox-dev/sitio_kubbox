import { motion } from 'framer-motion'
import { Monitor, Megaphone, BarChart2, Globe, Cpu, Layers } from 'lucide-react'
import GlowOrb from '../ui/GlowOrb'
import Button from '../ui/Button'
import { useScrollAnimation, fadeUp, scaleUp, staggerContainer } from '../../hooks/useScrollAnimation'

const SERVICES = [
  {
    icon: Monitor,
    title: 'Desarrollo Digital',
    bullets: [
      'Sitios web a medida de alto rendimiento',
      'E-commerce y tiendas online',
      'Diseño UI/UX centrado en conversión',
      'Analítica y métricas avanzadas',
    ],
  },
  {
    icon: Megaphone,
    title: 'Marketing Digital',
    bullets: [
      'Estrategia y gestión de redes sociales',
      'Campañas de pauta digital (Meta, Google)',
      'Email marketing y automatización',
      'Contenido y copywriting estratégico',
    ],
  },
  {
    icon: BarChart2,
    title: 'Performance & Data',
    bullets: [
      'Analítica web y reportes de ROI',
      'Optimización de conversiones (CRO)',
      'SEO técnico y de contenidos',
      'Auditorías y diagnósticos digitales',
    ],
  },
  {
    icon: Cpu,
    title: 'IA & Automatización',
    bullets: [
      'Flujos automatizados con IA',
      'Chatbots y asistentes digitales',
      'Generación de contenido asistida',
      'Integraciones y herramientas custom',
    ],
  },
]

export default function ServicesSection() {
  const { ref: headRef, controls: headControls } = useScrollAnimation()
  const { ref: gridRef, controls: gridControls } = useScrollAnimation(0.1)

  return (
    <section
      id="servicios"
      style={{
        position: 'relative',
        overflow: 'hidden',
        paddingBlock: 'clamp(4rem, 10vw, 7rem)',
        background: 'oklch(0.08 0.023 260)',
      }}
    >
      <GlowOrb color="lime" size={500} top="10%" right="-5%" opacity={0.8} blur={110} />
      <GlowOrb color="teal" size={400} bottom="5%" left="-5%" opacity={0.7} blur={100} />

      <div style={{ maxWidth: 'var(--container)', marginInline: 'auto', paddingInline: 'var(--container-pad)', position: 'relative', zIndex: 1 }}>

        {/* Heading */}
        <motion.div
          ref={headRef}
          initial="hidden"
          animate={headControls}
          variants={staggerContainer(0.12)}
          style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)', textAlign: 'center' }}
        >
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--c-lime)',
              marginBottom: '0.75rem',
            }}
          >
            5 años encontrando identidad
          </motion.p>
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(2.5rem, 7vw, 5rem)',
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              color: 'var(--c-ink)',
              lineHeight: 0.95,
            }}
          >
            NUESTROS
            <br />
            <span style={{ color: 'var(--c-lime)' }}>SERVICIOS</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              color: 'var(--c-muted)',
              marginTop: '1.5rem',
            }}
          >
            IMPULSA TU <span style={{ color: 'var(--c-ink)' }}>MARCA</span> CON{' '}
            <span style={{ color: 'var(--c-lime)' }}>NUESTRAS SOLUCIONES</span>
          </motion.p>
        </motion.div>

        {/* Services grid */}
        <motion.div
          ref={gridRef}
          initial="hidden"
          animate={gridControls}
          variants={staggerContainer(0.1, 0.2)}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {SERVICES.map(({ icon: Icon, title, bullets }) => (
            <ServiceCard key={title} icon={Icon} title={title} bullets={bullets} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ServiceCard({ icon: Icon, title, bullets }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6, borderColor: 'var(--c-lime)' }}
      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
      style={{
        background: 'var(--c-surface)',
        border: '1px solid oklch(0.20 0.022 260)',
        borderRadius: '1rem',
        padding: '2rem',
        transition: 'border-color var(--transition-base)',
      }}
    >
      <div style={{
        width: '3rem',
        height: '3rem',
        border: '1px solid oklch(0.28 0.028 260)',
        borderRadius: '0.625rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--c-lime)',
        marginBottom: '1.25rem',
      }}>
        <Icon size={22} strokeWidth={1.5} />
      </div>

      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: '1.4rem',
        letterSpacing: '-0.01em',
        color: 'var(--c-ink)',
        marginBottom: '1rem',
      }}>
        {title}
      </h3>

      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {bullets.map(bullet => (
          <li key={bullet} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}>
            <span style={{ flexShrink: 0, marginTop: '0.35rem', width: '5px', height: '5px', borderRadius: '50%', background: 'var(--c-lime)', display: 'block' }} />
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--c-muted)', lineHeight: 1.5 }}>
              {bullet}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
