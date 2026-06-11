import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ProjectCard from '../ui/ProjectCard'
import { useScrollAnimation, fadeUp, staggerContainer } from '../../hooks/useScrollAnimation'

const PROJECTS = [
  {
    number: 1,
    title: "Kellogg's",
    category: 'Estrategia Digital',
    description: 'Desarrollamos una campaña viral con presencia en Costa Rica, Guatemala y El Salvador, diseñada para revolucionar la categoría en el punto de venta.',
    imageSrc: null,
    imageAlt: "Campaña digital de Kellogg's",
  },
  {
    number: 2,
    title: 'Pollocao',
    category: 'Identidad de Marca',
    description: 'Rediseño completo de identidad y estrategia digital para conectar con nuevas generaciones de consumidores colombianos.',
    imageSrc: null,
    imageAlt: 'Identidad de marca Pollocao',
  },
  {
    number: 3,
    title: 'F-rixo',
    category: 'Desarrollo Web',
    description: 'Sitio web e-commerce de alto rendimiento con integración de pagos y experiencia de usuario optimizada para conversión.',
    imageSrc: null,
    imageAlt: 'Sitio web F-rixo',
  },
  {
    number: 4,
    title: 'CAM',
    category: 'Pauta Digital',
    description: 'Campaña de performance marketing que duplicó el ROI en menos de tres meses a través de segmentación estratégica.',
    imageSrc: null,
    imageAlt: 'Campaña CAM',
  },
]

export default function ProjectsSection() {
  const { ref: headingRef, controls: headingControls } = useScrollAnimation()
  const trackRef = useRef(null)

  return (
    <section
      id="experiencia"
      style={{
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 'clamp(4rem, 10vw, 7rem)',
        paddingBottom: 'clamp(4rem, 10vw, 7rem)',
      }}
    >
      {/* Heading */}
      <div
        style={{
          maxWidth: 'var(--container)',
          marginInline: 'auto',
          paddingInline: 'var(--container-pad)',
          marginBottom: 'clamp(2.5rem, 5vw, 4rem)',
        }}
      >
        <motion.div
          ref={headingRef}
          initial="hidden"
          animate={headingControls}
          variants={staggerContainer(0.12)}
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
            Creados para ti
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
            <span style={{ color: 'var(--c-lime)', WebkitTextStroke: '2px var(--c-lime)', WebkitTextFillColor: 'transparent' }}>
              PROYECTOS
            </span>
          </motion.h2>
        </motion.div>
      </div>

      {/* Horizontal scroll track */}
      <div
        style={{
          paddingInline: 'var(--container-pad)',
          maxWidth: 'calc(var(--container) + 2 * var(--container-pad))',
          marginInline: 'auto',
        }}
      >
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: '1.5rem',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            paddingBottom: '1rem',
            cursor: 'grab',
          }}
          onMouseDown={e => {
            const el = trackRef.current
            el.dataset.dragging = 'true'
            el.dataset.startX = e.pageX - el.offsetLeft
            el.dataset.scrollLeft = el.scrollLeft
            el.style.cursor = 'grabbing'
          }}
          onMouseMove={e => {
            if (trackRef.current.dataset.dragging !== 'true') return
            e.preventDefault()
            const x = e.pageX - trackRef.current.offsetLeft
            const walk = (x - Number(trackRef.current.dataset.startX)) * 1.5
            trackRef.current.scrollLeft = Number(trackRef.current.dataset.scrollLeft) - walk
          }}
          onMouseUp={() => {
            if (trackRef.current) {
              trackRef.current.dataset.dragging = 'false'
              trackRef.current.style.cursor = 'grab'
            }
          }}
          onMouseLeave={() => {
            if (trackRef.current) {
              trackRef.current.dataset.dragging = 'false'
              trackRef.current.style.cursor = 'grab'
            }
          }}
        >
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.number}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ scrollSnapAlign: 'start' }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <p style={{
        textAlign: 'center',
        fontFamily: 'var(--font-body)',
        fontSize: '0.8rem',
        color: 'var(--c-muted)',
        marginTop: '1rem',
        letterSpacing: '0.04em',
      }}>
        ← Arrastra para explorar →
      </p>
    </section>
  )
}
