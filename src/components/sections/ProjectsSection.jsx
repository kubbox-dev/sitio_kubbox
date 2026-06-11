import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import { useScrollAnimation, fadeUp, staggerContainer } from '../../hooks/useScrollAnimation'

const PROJECTS = [
  {
    number: '01',
    title: "Kellogg's",
    category: 'Campaña Digital · Centroamérica',
    description: 'Desarrollamos una campaña viral con presencia en Costa Rica, Guatemala y El Salvador, diseñada para revolucionar la categoría y aumentar el engagement en el punto de venta.',
    tags: ['Estrategia', 'Pauta Digital', 'Contenido'],
    imgBg: 'linear-gradient(135deg, oklch(0.55 0.18 30), oklch(0.35 0.12 20))',
    accent: 'oklch(0.75 0.20 50)',
  },
  {
    number: '02',
    title: 'Pollocao',
    category: 'Identidad de Marca · Colombia',
    description: 'Rediseño completo de identidad visual y estrategia digital para conectar con nuevas generaciones de consumidores colombianos, aumentando el reconocimiento de marca en un 40%.',
    tags: ['Branding', 'Redes Sociales', 'Web Design'],
    imgBg: 'linear-gradient(135deg, oklch(0.50 0.16 145), oklch(0.30 0.10 155))',
    accent: 'oklch(0.78 0.22 145)',
  },
  {
    number: '03',
    title: 'F-rixo',
    category: 'Desarrollo Web · E-commerce',
    description: 'Sitio web e-commerce de alto rendimiento con integración de pagos, sistema de inventario y experiencia de usuario optimizada que triplicó las ventas online en el primer trimestre.',
    tags: ['E-commerce', 'UI/UX', 'SEO'],
    imgBg: 'linear-gradient(135deg, oklch(0.45 0.15 270), oklch(0.28 0.12 255))',
    accent: 'oklch(0.70 0.18 270)',
  },
  {
    number: '04',
    title: 'CAM',
    category: 'Performance Marketing',
    description: 'Campaña de performance marketing que duplicó el ROI en menos de tres meses a través de segmentación estratégica, A/B testing y optimización continua de creativos.',
    tags: ['Meta Ads', 'Google Ads', 'Analytics'],
    imgBg: 'linear-gradient(135deg, oklch(0.42 0.14 200), oklch(0.25 0.10 210))',
    accent: 'oklch(0.72 0.150 190)',
  },
]

export default function ProjectsSection() {
  const [current, setCurrent] = useState(0)
  const { ref: headRef, controls: headControls } = useScrollAnimation()
  const project = PROJECTS[current]

  const prev = () => setCurrent(i => (i - 1 + PROJECTS.length) % PROJECTS.length)
  const next = () => setCurrent(i => (i + 1) % PROJECTS.length)

  return (
    <section
      id="experiencia"
      style={{
        position: 'relative',
        overflow: 'hidden',
        paddingBlock: 'clamp(4rem, 10vw, 7rem)',
      }}
    >
      <div style={{ maxWidth: 'var(--container)', marginInline: 'auto', paddingInline: 'var(--container-pad)' }}>

        {/* ── Heading ───────────────────────────────── */}
        <motion.div
          ref={headRef}
          initial="hidden"
          animate={headControls}
          variants={staggerContainer(0.1)}
          style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}
        >
          <motion.p variants={fadeUp} style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--c-lime)', marginBottom: '0.5rem' }}>
            Creados para ti
          </motion.p>
          <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2.5rem, 7vw, 5rem)', letterSpacing: '-0.02em', textTransform: 'uppercase', color: 'var(--c-ink)', lineHeight: 0.95 }}>
            CONOCE NUESTROS<br />
            <span style={{ color: 'var(--c-lime)' }}>PROYECTOS</span>
          </motion.h2>
        </motion.div>

        {/* ── Featured project card ─────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'clamp(1.5rem, 4vw, 3rem)',
              background: 'var(--c-surface)',
              borderRadius: '1.25rem',
              overflow: 'hidden',
              border: '1px solid oklch(0.20 0.022 260)',
              position: 'relative',
            }}
            className="project-card-grid"
          >
            {/* Image / visual side */}
            <div
              style={{
                aspectRatio: '4/3',
                background: project.imgBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Mockup screen */}
              <div style={{
                width: '78%',
                aspectRatio: '16/10',
                background: 'oklch(0.10 0.025 260)',
                borderRadius: '0.5rem',
                border: '1px solid oklch(0.30 0.025 260 / 0.6)',
                overflow: 'hidden',
                boxShadow: '0 24px 60px oklch(0.05 0.020 260 / 0.8)',
                display: 'flex',
                flexDirection: 'column',
              }}>
                {/* Browser chrome */}
                <div style={{ height: '1.5rem', background: 'oklch(0.15 0.025 260)', display: 'flex', alignItems: 'center', padding: '0 0.75rem', gap: '0.375rem', flexShrink: 0 }}>
                  {['oklch(0.65 0.20 30)', 'oklch(0.75 0.20 100)', 'oklch(0.70 0.18 145)'].map((c, i) => (
                    <div key={i} style={{ width: '7px', height: '7px', borderRadius: '50%', background: c }} />
                  ))}
                </div>
                {/* Screen content gradient */}
                <div style={{ flex: 1, background: project.imgBg, opacity: 0.7 }} />
              </div>

              {/* Glow */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(ellipse 60% 60% at 50% 50%, ${project.accent}22, transparent)`,
              }} />

              {/* Large number watermark */}
              <div style={{
                position: 'absolute',
                bottom: '-0.5rem',
                right: '1rem',
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(5rem, 12vw, 9rem)',
                lineHeight: 1,
                color: 'transparent',
                WebkitTextStroke: `2px ${project.accent}44`,
                userSelect: 'none',
                pointerEvents: 'none',
              }}>
                {project.number}
              </div>
            </div>

            {/* Info side */}
            <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--c-lime)', marginBottom: '0.5rem' }}>
                {project.category}
              </p>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em', textTransform: 'uppercase', color: 'var(--c-ink)', lineHeight: 1, marginBottom: '1rem' }}>
                {project.title}
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--c-muted)', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '46ch', textWrap: 'pretty' }}>
                {project.description}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                {project.tags.map(tag => (
                  <span key={tag} style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    color: 'var(--c-muted)',
                    border: '1px solid oklch(0.22 0.020 260)',
                    borderRadius: '2rem',
                    padding: '0.25rem 0.75rem',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--c-lime)', fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>
                <ExternalLink size={15} />
                Ver proyecto
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Navigation ────────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          {/* Dots */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {PROJECTS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Proyecto ${i + 1}`}
                style={{
                  width: i === current ? '2rem' : '0.5rem',
                  height: '0.5rem',
                  borderRadius: '1rem',
                  background: i === current ? 'var(--c-lime)' : 'oklch(0.28 0.022 260)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'width var(--transition-base), background var(--transition-base)',
                  padding: 0,
                }}
              />
            ))}
          </div>

          {/* Arrows */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {[{ label: 'Anterior', icon: ArrowLeft, fn: prev }, { label: 'Siguiente', icon: ArrowRight, fn: next }].map(({ label, icon: Icon, fn }) => (
              <motion.button
                key={label}
                onClick={fn}
                whileHover={{ scale: 1.08, borderColor: 'var(--c-lime)', color: 'var(--c-lime)' }}
                whileTap={{ scale: 0.95 }}
                aria-label={label}
                style={{
                  width: '2.75rem',
                  height: '2.75rem',
                  borderRadius: '50%',
                  background: 'var(--c-surface)',
                  border: '1px solid oklch(0.25 0.022 260)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--c-muted)',
                  transition: 'all var(--transition-base)',
                }}
              >
                <Icon size={16} />
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .project-card-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
