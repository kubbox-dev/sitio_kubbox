import { useState, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, ChevronUp, ChevronDown } from 'lucide-react'
import GlowOrb from '../ui/GlowOrb'
import { useScrollAnimation, fadeUp, staggerContainer } from '../../hooks/useScrollAnimation'

const PROJECTS = [
  {
    number: '01',
    title: "Kellogg's",
    subtitle: 'Códigos secretos',
    category: 'Campaña Digital · Centroamérica',
    description: 'Desarrollamos una campaña retail con presencia en Costa Rica, Guatemala y El Salvador, diseñada para revolucionar la categoría y aumentar el engagement en el punto de venta.',
    tags: ['Estrategia', 'Pauta Digital', 'Contenido'],
    screenshot: null,
    imgBg: 'linear-gradient(135deg, oklch(0.55 0.18 30), oklch(0.35 0.12 20))',
    accent: 'oklch(0.75 0.20 50)',
    logo: '/images/NUESTROS PROYECTOS/WEB/Logos/Kelloggs logo.svg',
  },
  {
    number: '02',
    title: 'Pollocao',
    subtitle: 'Identidad Visual',
    category: 'Identidad de Marca · Colombia',
    description: 'Rediseño completo de identidad visual y estrategia digital para conectar con nuevas generaciones de consumidores colombianos, aumentando el reconocimiento de marca en un 40%.',
    tags: ['Branding', 'Redes Sociales', 'Web Design'],
    screenshot: null,
    imgBg: 'linear-gradient(135deg, oklch(0.50 0.16 145), oklch(0.30 0.10 155))',
    accent: 'oklch(0.78 0.22 145)',
    logo: '/images/HOME/WEB/Logos/pollocoa logo.svg',
  },
  {
    number: '03',
    title: 'F-rixo',
    subtitle: 'E-commerce',
    category: 'Desarrollo Web · E-commerce',
    description: 'Sitio web e-commerce de alto rendimiento con integración de pagos, sistema de inventario y experiencia de usuario optimizada que triplicó las ventas online en el primer trimestre.',
    tags: ['E-commerce', 'UI/UX', 'SEO'],
    screenshot: null,
    imgBg: 'linear-gradient(135deg, oklch(0.45 0.15 270), oklch(0.28 0.12 255))',
    accent: 'oklch(0.70 0.18 270)',
    logo: '/images/HOME/WEB/Logos/frixo logo.svg',
  },
  {
    number: '04',
    title: 'CAM',
    subtitle: 'Performance Marketing',
    category: 'Performance Marketing',
    description: 'Campaña de performance marketing que duplicó el ROI en menos de tres meses a través de segmentación estratégica, A/B testing y optimización continua de creativos.',
    tags: ['Meta Ads', 'Google Ads', 'Analytics'],
    screenshot: null,
    imgBg: 'linear-gradient(135deg, oklch(0.42 0.14 200), oklch(0.25 0.10 210))',
    accent: 'oklch(0.72 0.150 190)',
    logo: '/images/HOME/WEB/Logos/centro automotriz logo.svg',
  },
]

const DUR  = 0.85
const EASE = [0.76, 0, 0.24, 1]

export default function ProjectsSection() {
  const [[idx, dir], setPage] = useState([0, 1])
  const { ref: headRef, controls: headControls } = useScrollAnimation()
  const reduce = useReducedMotion()
  const project = PROJECTS[idx]

  const paginate = useCallback((newDir) => {
    setPage(([prev]) => [((prev + newDir) + PROJECTS.length) % PROJECTS.length, newDir])
  }, [])
  const goTo = (i) => setPage([i, i >= idx ? 1 : -1])

  // Imagen: gira en eje X (entra desde abajo, sale hacia arriba)
  const imgV = reduce
    ? { enter: { opacity: 0 }, center: { opacity: 1, transition: { duration: 0.4 } }, exit: { opacity: 0, transition: { duration: 0.3 } } }
    : {
        enter: (d) => ({ rotateX: d > 0 ?  90 : -90 }),
        center:      { rotateX: 0, transition: { duration: DUR, ease: EASE } },
        exit:  (d) => ({ rotateX: d > 0 ? -90 :  90, transition: { duration: DUR, ease: EASE } }),
      }
  // Info: sentido opuesto (entra desde arriba, sale hacia abajo)
  const infoV = reduce
    ? imgV
    : {
        enter: (d) => ({ rotateX: d > 0 ? -90 :  90 }),
        center:      { rotateX: 0, transition: { duration: DUR, ease: EASE } },
        exit:  (d) => ({ rotateX: d > 0 ?  90 : -90, transition: { duration: DUR, ease: EASE } }),
      }

  // Contenido interno: stagger que se re-dispara en cada slide
  const contentStagger = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: reduce ? 0 : 0.32 } } }
  const contentItem = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.3 } } }
    : { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } } }

  return (
    <section
      id="experiencia"
      style={{
        position: 'relative',
        overflow: 'hidden',
        paddingBlock: 'clamp(4rem, 10vw, 7rem)',
      }}
    >
      {/* ── Atmósfera ─────────────────────────── */}
      <GlowOrb color="lime" size={520} top="6%"   right="-8%" opacity={0.55} blur={150} />
      <GlowOrb color="teal" size={420} bottom="2%" left="-6%" opacity={0.6}  blur={130} />

      <div style={{ maxWidth: 'var(--container)', marginInline: 'auto', paddingInline: 'var(--container-pad)', position: 'relative', zIndex: 1 }}>

        {/* ── Heading ───────────────────────────── */}
        <motion.div
          ref={headRef}
          initial="hidden"
          animate={headControls}
          variants={staggerContainer(0.1)}
          style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}
        >
          

          {/* Contador editorial */}
          <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', fontFamily: 'var(--font-display)', fontWeight: 900, lineHeight: 1 }}>
            <AnimatePresence mode="popLayout">
              <motion.span
                key={project.number}
                initial={{ y: reduce ? 0 : 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: reduce ? 0 : -14, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'var(--c-lime)' }}
              >
                {project.number}
              </motion.span>
            </AnimatePresence>
            <span style={{ fontSize: '1.25rem', color: 'var(--c-muted)' }}>
              / {String(PROJECTS.length).padStart(2, '0')}
            </span>
          </motion.div>
        </motion.div>

        {/* ── Card split ────────────────────────── */}
        <motion.div
          className="proj-card"
          whileHover={reduce ? undefined : { borderColor: 'oklch(0.88 0.260 130 / 0.45)' }}
          transition={{ duration: 0.3 }}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            borderRadius: '1.25rem',
            overflow: 'hidden',
            border: '1px solid oklch(0.22 0.022 260)',
            minHeight: 'clamp(320px, 44vw, 520px)',
            position: 'relative',
            background: 'var(--c-surface)',
            boxShadow: '0 40px 120px -40px oklch(0.04 0.02 260 / 0.9)',
          }}
        >
          {/* ── Panel izquierdo: imagen ─────────── */}
          <div className="proj-img-panel" style={{
            position: 'relative',
            overflow: 'hidden',
            perspective: '1200px',
            perspectiveOrigin: '50% 50%',
            background: 'var(--c-bg)',
          }}>
            <AnimatePresence initial={false} custom={dir}>
              <motion.div
                key={`img-${idx}`}
                custom={dir}
                variants={imgV}
                initial="enter"
                animate="center"
                exit="exit"
                style={{
                  position: 'absolute', inset: 0,
                  transformOrigin: '50% 50%',
                  backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
                }}
              >
                {project.screenshot ? (
                  <img src={project.screenshot} alt={project.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: project.imgBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={project.logo} alt={project.title}
                      style={{ maxWidth: '50%', maxHeight: '40%', objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.88 }} />
                  </div>
                )}
                {/* Blend hacia la info */}
                <div aria-hidden="true" style={{
                  position: 'absolute', inset: 0, pointerEvents: 'none',
                  background: 'linear-gradient(to right, transparent 68%, oklch(0.14 0.028 260 / 0.55) 100%)',
                }} />
              </motion.div>
            </AnimatePresence>

            {/* HUD — esquinas de "pantalla de monitoreo" */}
            <div aria-hidden="true" className="proj-hud">
              {['tl', 'tr', 'bl', 'br'].map(pos => (
                <span key={pos} className={`proj-corner proj-corner--${pos}`} />
              ))}
            </div>

            {/* Scanlines sutiles */}
            <div aria-hidden="true" style={{
              position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2, opacity: 0.5,
              backgroundImage: 'repeating-linear-gradient(to bottom, transparent 0 3px, oklch(0 0 0 / 0.10) 3px 4px)',
              mixBlendMode: 'overlay',
            }} />
          </div>

          {/* ── Panel derecho: info ─────────────── */}
          <div style={{
            position: 'relative',
            overflow: 'hidden',
            perspective: '1200px',
            perspectiveOrigin: '50% 50%',
            backgroundColor: 'var(--c-surface)',
          }}>
            <AnimatePresence initial={false} custom={dir}>
              <motion.div
                key={`info-${idx}`}
                custom={dir}
                variants={infoV}
                initial="enter"
                animate="center"
                exit="exit"
                style={{
                  position: 'absolute', inset: 0,
                  transformOrigin: '50% 50%',
                  backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
                  display: 'flex', flexDirection: 'column', justifyContent: 'center',
                  padding: 'clamp(1.5rem, 3vw, 2.75rem)',
                  paddingRight: 'clamp(2.5rem, 5vw, 4.5rem)',
                  overflow: 'hidden',
                }}
              >
                {/* Número watermark */}
                <div aria-hidden="true" style={{
                  position: 'absolute', bottom: '-1.25rem', right: '2rem',
                  fontFamily: 'var(--font-display)', fontWeight: 900,
                  fontSize: 'clamp(6rem, 13vw, 11rem)', lineHeight: 1,
                  color: 'transparent', WebkitTextStroke: '1.5px oklch(0.88 0.260 130 / 0.08)',
                  userSelect: 'none', pointerEvents: 'none',
                }}>
                  {project.number}
                </div>

                {/* Contenido con stagger */}
                <motion.div
                  variants={contentStagger}
                  initial="hidden"
                  animate="show"
                  style={{ position: 'relative', zIndex: 1 }}
                >
                  <motion.p variants={contentItem} style={{
                    fontFamily: 'var(--font-body)', fontSize: '0.74rem', fontWeight: 600,
                    letterSpacing: '0.13em', textTransform: 'uppercase',
                    color: 'var(--c-lime)', marginBottom: '0.7rem',
                    display: 'inline-flex', alignItems: 'center', gap: '0.55rem',
                  }}>
                    <span style={{ width: '1.4rem', height: '1px', background: 'var(--c-lime)', display: 'inline-block' }} />
                    {project.category}
                  </motion.p>

                  <motion.h3 variants={contentItem} style={{
                    fontFamily: 'var(--font-display)', fontWeight: 900,
                    fontSize: 'clamp(1.9rem, 3.8vw, 3.25rem)', letterSpacing: '-0.025em',
                    textTransform: 'uppercase', lineHeight: 0.92,
                    color: 'var(--c-lime)', marginBottom: '0.4rem',
                  }}>
                    {project.title}
                  </motion.h3>

                  <motion.p variants={contentItem} style={{
                    fontFamily: 'var(--font-body)', fontStyle: 'italic', fontWeight: 600,
                    fontSize: 'clamp(0.9rem, 1.3vw, 1.1rem)',
                    color: 'var(--c-lime)', opacity: 0.72, marginBottom: '1.25rem',
                  }}>
                    {project.subtitle}
                  </motion.p>

                  <motion.p variants={contentItem} style={{
                    fontFamily: 'var(--font-body)', fontStyle: 'italic',
                    fontSize: 'clamp(0.82rem, 1.1vw, 0.94rem)',
                    color: 'var(--c-ink)', lineHeight: 1.75,
                    maxWidth: '42ch', marginBottom: '1.5rem',
                    textWrap: 'pretty', opacity: 0.85,
                  }}>
                    {project.description}
                  </motion.p>

                  <motion.div variants={contentItem} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.75rem' }}>
                    {project.tags.map(tag => (
                      <span key={tag} style={{
                        fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 500,
                        color: 'var(--c-muted)', border: '1px solid oklch(0.24 0.020 260)',
                        borderRadius: '2rem', padding: '0.22rem 0.7rem',
                      }}>
                        {tag}
                      </span>
                    ))}
                  </motion.div>

                  <motion.a
                    variants={contentItem}
                    href="#"
                    className="proj-cta"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                      color: 'var(--c-cta-ink)', background: 'var(--c-cta-bg)',
                      fontFamily: 'var(--font-display)', fontWeight: 800,
                      fontSize: '0.9rem', letterSpacing: '0.02em', textTransform: 'uppercase',
                      textDecoration: 'none', padding: '0.6rem 1.1rem', borderRadius: '0.5rem',
                      width: 'fit-content',
                    }}
                  >
                    Ver proyecto
                    <ArrowUpRight size={16} strokeWidth={2.5} className="proj-cta-arrow" />
                  </motion.a>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* ── Dots de navegación — borde derecho ── */}
            <div style={{
              position: 'absolute', right: '1rem', top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex', flexDirection: 'column', gap: '0.55rem', zIndex: 20,
            }}>
              {PROJECTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Proyecto ${i + 1}`}
                  style={{
                    width: '8px',
                    height: i === idx ? '1.85rem' : '8px',
                    borderRadius: '4px',
                    background: i === idx ? 'var(--c-lime)' : 'oklch(0.30 0.018 260)',
                    boxShadow: i === idx ? '0 0 12px oklch(0.88 0.260 130 / 0.55)' : 'none',
                    border: 'none', cursor: 'pointer', padding: 0,
                    transition: 'all 0.35s var(--ease-out-quart)',
                  }}
                />
              ))}
            </div>

            {/* ── Botones prev / next ── */}
            <div style={{
              position: 'absolute', bottom: '1.25rem', right: '1.25rem',
              display: 'flex', flexDirection: 'column', gap: '0.45rem', zIndex: 20,
            }}>
              {[
                { Icon: ChevronUp,   d: -1, label: 'Proyecto anterior'  },
                { Icon: ChevronDown, d:  1, label: 'Proyecto siguiente' },
              ].map(({ Icon, d, label }) => (
                <motion.button
                  key={label}
                  onClick={() => paginate(d)}
                  aria-label={label}
                  whileHover={reduce ? undefined : { scale: 1.1 }}
                  whileTap={reduce ? undefined : { scale: 0.9 }}
                  className="proj-nav-btn"
                  style={{
                    width: '2.4rem', height: '2.4rem', borderRadius: '50%',
                    background: 'oklch(0.12 0.022 260 / 0.85)',
                    border: '1px solid oklch(0.26 0.022 260)',
                    color: 'var(--c-muted)', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(10px)',
                    transition: 'border-color 0.2s ease, color 0.2s ease, box-shadow 0.25s ease',
                  }}
                >
                  <Icon size={16} strokeWidth={2.25} />
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .proj-corner {
          position: absolute;
          width: 18px; height: 18px;
          border: 2px solid oklch(0.88 0.260 130 / 0.55);
          z-index: 3; pointer-events: none;
        }
        .proj-corner--tl { top: 14px; left: 14px; border-right: 0; border-bottom: 0; }
        .proj-corner--tr { top: 14px; right: 14px; border-left: 0; border-bottom: 0; }
        .proj-corner--bl { bottom: 14px; left: 14px; border-right: 0; border-top: 0; }
        .proj-corner--br { bottom: 14px; right: 14px; border-left: 0; border-top: 0; }

        .proj-cta { transition: filter 0.2s ease, box-shadow 0.25s ease; }
        .proj-cta:hover {
          filter: brightness(1.08);
          box-shadow: 0 8px 24px oklch(0.88 0.260 130 / 0.3);
        }
        .proj-cta-arrow { transition: transform 0.25s var(--ease-out-quart); }
        .proj-cta:hover .proj-cta-arrow { transform: translate(2px, -2px); }

        .proj-nav-btn:hover {
          border-color: var(--c-lime) !important;
          color: var(--c-lime) !important;
          box-shadow: 0 0 16px oklch(0.88 0.260 130 / 0.25);
        }

        @media (max-width: 640px) {
          .proj-card { grid-template-columns: 1fr !important; }
          .proj-img-panel { min-height: 240px; }
        }
      `}</style>
    </section>
  )
}
