import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Monitor, Megaphone, BarChart2, Cpu, ChevronRight } from 'lucide-react'
import GlowOrb from '../ui/GlowOrb'
import Button from '../ui/Button'
import { useScrollAnimation, fadeUp, staggerContainer } from '../../hooks/useScrollAnimation'

const SERVICES = [
  {
    id: 'desarrollo',
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
    id: 'marketing',
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
    id: 'performance',
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
    id: 'ia',
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

const PERSON_IMG = '/images/HOME/WEB/Ruleta/se%C3%B1ora.png'
const RULETA_IMG = '/images/HOME/WEB/Ruleta/Ruleta completa.png'

export default function ServicesSection() {
  const [active, setActive] = useState(0)
  const { ref: headRef, controls: headControls } = useScrollAnimation()
  const service = SERVICES[active]

  return (
    <section
      id="servicios"
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingBlock: 'clamp(4rem, 8vw, 6rem)',
      }}
    >
      <GlowOrb color="lime"  size={600} top="-5%"  right="-8%"  opacity={0.9} blur={130} />
      <GlowOrb color="teal"  size={450} bottom="0%" left="-5%"  opacity={0.7} blur={110} />

      <div style={{ maxWidth: 'var(--container)', marginInline: 'auto', paddingInline: 'var(--container-pad)', position: 'relative', zIndex: 1, width: '100%' }}>

        {/* ── Top heading — editorial overlap ───────── */}
        <motion.div
          ref={headRef}
          initial="hidden"
          animate={headControls}
          variants={staggerContainer(0.12)}
          className="svc-head"
          style={{ position: 'relative', marginBottom: 'clamp(2.5rem, 6vw, 4.5rem)' }}
        >
          {/* CREADOS PARA TI — top right */}
          <motion.div variants={fadeUp} className="svc-label svc-label--tr">
            <span>Creados para ti</span>
            <span className="svc-label-line" />
          </motion.div>

          {/* NUESTROS — sólido */}
          <motion.h2 variants={fadeUp} className="svc-word svc-word--solid">
            NUESTROS
          </motion.h2>

          {/* SERVICIOS — outline, superpuesto y desplazado */}
          <motion.div variants={fadeUp} className="svc-word svc-word--outline" aria-hidden="false">
            SERVICIOS
          </motion.div>

          {/* 5 AÑOS ENCONTRANDO IDENTIDAD — bottom left */}
          <motion.p variants={fadeUp} className="svc-label svc-label--bl">
            5 años encontrando identidad
          </motion.p>
        </motion.div>

        {/* ── Main split layout ─────────────────────── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 420px) 1fr',
          gap: 'clamp(2rem, 5vw, 4rem)',
          alignItems: 'center',
        }}
          className="services-grid"
        >
          {/* Left — service detail */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div style={{ width: '2.5rem', height: '2.5rem', border: '1px solid oklch(0.28 0.028 260)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--c-lime)' }}>
                    <service.icon size={18} strokeWidth={1.5} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.6rem, 3.5vw, 2.25rem)', letterSpacing: '-0.01em', textTransform: 'uppercase', color: 'var(--c-ink)' }}>
                    {service.title}
                  </h3>
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
                  {service.bullets.map(b => (
                    <li key={b} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                      <ChevronRight size={16} style={{ flexShrink: 0, marginTop: '0.2rem', color: 'var(--c-lime)' }} />
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.975rem', color: 'oklch(0.72 0.010 260)', lineHeight: 1.55 }}>
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button variant="outline" size="md">Ver más</Button>
              </motion.div>
            </AnimatePresence>

            {/* Service tabs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem', marginTop: '2.5rem' }}>
              {SERVICES.map((s, i) => {
                const Icon = s.icon
                return (
                  <motion.button
                    key={s.id}
                    onClick={() => setActive(i)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      background: i === active ? 'oklch(0.88 0.220 130 / 0.12)' : 'var(--c-surface)',
                      border: `1px solid ${i === active ? 'var(--c-lime)' : 'oklch(0.22 0.022 260)'}`,
                      borderRadius: '0.5rem',
                      padding: '0.5rem 0.875rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      cursor: 'pointer',
                      color: i === active ? 'var(--c-lime)' : 'var(--c-muted)',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      transition: 'all var(--transition-base)',
                    }}
                  >
                    <Icon size={14} strokeWidth={1.5} />
                    {s.title}
                  </motion.button>
                )
              })}
            </div>
          </div>

          {/* Right — person visual with ruleta decoration */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '500px' }}>
            {/* Ruleta decorativa girando en el fondo */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 60, ease: 'linear' }}
              style={{
                position: 'absolute',
                width: '90%',
                aspectRatio: '1',
                pointerEvents: 'none',
                zIndex: 0,
                opacity: 0.35,
              }}
            >
              <img
                src={RULETA_IMG}
                alt=""
                aria-hidden="true"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </motion.div>

            {/* Person image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'relative',
                zIndex: 1,
                width: '80%',
                maxWidth: '460px',
              }}
            >
              <img
                src={PERSON_IMG}
                alt="Soluciones digitales con tecnología de vanguardia"
                style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block' }}
              />
            </motion.div>

            {/* Floating service count badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              style={{
                position: 'absolute',
                bottom: '6%',
                right: '-4%',
                background: 'var(--c-surface)',
                border: '1px solid oklch(0.25 0.028 260)',
                borderRadius: '0.875rem',
                padding: '0.875rem 1.25rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backdropFilter: 'blur(12px)',
              }}
            >
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '2rem', color: 'var(--c-lime)', lineHeight: 1 }}>+50</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--c-muted)', letterSpacing: '0.04em', marginTop: '0.25rem' }}>proyectos</span>
            </motion.div>

            {/* Floating years badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.65, duration: 0.6 }}
              style={{
                position: 'absolute',
                top: '8%',
                left: '-4%',
                background: 'var(--c-surface)',
                border: '1px solid oklch(0.28 0.028 260)',
                borderRadius: '0.875rem',
                padding: '0.875rem 1.25rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backdropFilter: 'blur(12px)',
              }}
            >
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '2rem', color: 'var(--c-teal)', lineHeight: 1 }}>5+</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'var(--c-muted)', letterSpacing: '0.04em', marginTop: '0.25rem' }}>años</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Fade oscuro al fondo — transición suave hacia AISection */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '35%',
          background: 'linear-gradient(to bottom, transparent, var(--c-bg))',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Responsive: stack on mobile */}
      <style>{`
        /* ── Heading editorial ── */
        .svc-head {
          --svc-size: clamp(3rem, 13vw, 10rem);
          line-height: 0.82;
          padding-block: clamp(1.5rem, 3vw, 2.5rem);
        }
        .svc-word {
          font-family: var(--font-display);
          font-weight: 900;
          font-style: italic;
          font-size: var(--svc-size);
          letter-spacing: -0.03em;
          text-transform: uppercase;
          margin: 0;
        }
        .svc-word--solid {
          color: var(--c-ink);
          position: relative;
          z-index: 2;
          width: fit-content;
        }
        .svc-word--outline {
          color: transparent;
          -webkit-text-stroke: 1.5px oklch(0.98 0 0 / 0.65);
          margin-top: -0.18em;
          margin-left: clamp(2rem, 18vw, 18rem);
          width: fit-content;
          position: relative;
          z-index: 1;
        }
        .svc-label {
          font-family: var(--font-display);
          font-weight: 700;
          font-style: italic;
          font-size: clamp(0.7rem, 1.3vw, 0.95rem);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: oklch(0.62 0.015 260);
          margin: 0;
        }
        .svc-label--tr {
          position: absolute;
          top: clamp(1.5rem, 4vw, 3.5rem);
          right: 0;
          display: flex;
          align-items: center;
          gap: 0.85rem;
          z-index: 3;
        }
        .svc-label-line {
          width: clamp(2.5rem, 8vw, 7rem);
          height: 1px;
          background: oklch(0.62 0.015 260 / 0.6);
          display: inline-block;
        }
        .svc-label--bl {
          position: absolute;
          left: 0;
          bottom: clamp(0.5rem, 2vw, 1.5rem);
          z-index: 3;
        }
        @media (max-width: 600px) {
          .svc-word--outline { margin-left: clamp(1rem, 8vw, 4rem); }
          .svc-label--tr { position: static; justify-content: flex-end; margin-bottom: 0.75rem; }
          .svc-label--bl { position: static; margin-top: 0.85rem; }
        }

        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
