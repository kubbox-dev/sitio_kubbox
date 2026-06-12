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
    imgBg: 'linear-gradient(135deg, oklch(0.55 0.18 30), oklch(0.35 0.12 20))',
    logo: '/images/NUESTROS PROYECTOS/WEB/Logos/Kelloggs logo.svg',
  },
  {
    number: '02',
    title: 'Pollocao',
    subtitle: 'Identidad Visual',
    category: 'Identidad de Marca · Colombia',
    description: 'Rediseño completo de identidad visual y estrategia digital para conectar con nuevas generaciones de consumidores colombianos, aumentando el reconocimiento de marca en un 40%.',
    tags: ['Branding', 'Redes Sociales', 'Web Design'],
    imgBg: 'linear-gradient(135deg, oklch(0.50 0.16 145), oklch(0.30 0.10 155))',
    logo: '/images/HOME/WEB/Logos/pollocoa logo.svg',
  },
  {
    number: '03',
    title: 'F-rixo',
    subtitle: 'E-commerce',
    category: 'Desarrollo Web · E-commerce',
    description: 'Sitio web e-commerce de alto rendimiento con integración de pagos, sistema de inventario y experiencia de usuario optimizada que triplicó las ventas online en el primer trimestre.',
    tags: ['E-commerce', 'UI/UX', 'SEO'],
    imgBg: 'linear-gradient(135deg, oklch(0.45 0.15 270), oklch(0.28 0.12 255))',
    logo: '/images/HOME/WEB/Logos/frixo logo.svg',
  },
  {
    number: '04',
    title: 'CAM',
    subtitle: 'Performance Marketing',
    category: 'Performance Marketing',
    description: 'Campaña de performance marketing que duplicó el ROI en menos de tres meses a través de segmentación estratégica, A/B testing y optimización continua de creativos.',
    tags: ['Meta Ads', 'Google Ads', 'Analytics'],
    imgBg: 'linear-gradient(135deg, oklch(0.42 0.14 200), oklch(0.25 0.10 210))',
    logo: '/images/HOME/WEB/Logos/centro automotriz logo.svg',
  },
]

const DUR = 0.75
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

  const imgV = reduce
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1, transition: { duration: 0.4 } },
        exit: { opacity: 0, transition: { duration: 0.3 } },
      }
    : {
        enter: (d) => ({ rotateX: d > 0 ? 90 : -90, opacity: 0 }),
        center: { rotateX: 0, opacity: 1, transition: { duration: DUR, ease: EASE } },
        exit: (d) => ({ rotateX: d > 0 ? -90 : 90, opacity: 0, transition: { duration: DUR, ease: EASE } }),
      }

  const infoV = reduce
    ? imgV
    : {
        enter: (d) => ({ rotateX: d > 0 ? -90 : 90, opacity: 0 }),
        center: { rotateX: 0, opacity: 1, transition: { duration: DUR, ease: EASE } },
        exit: (d) => ({ rotateX: d > 0 ? 90 : -90, opacity: 0, transition: { duration: DUR, ease: EASE } }),
      }

  const contentStagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: reduce ? 0 : 0.28 } },
  }
  const contentItem = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.3 } } }
    : {
        hidden: { opacity: 0, y: 18 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
      }

  return (
    <section id="experiencia" style={{ position: 'relative', overflow: 'hidden', paddingBlock: 'clamp(3rem, 8vw, 6rem)' }}>
      <GlowOrb color="lime" size={520} top="6%" right="-8%" opacity={0.55} blur={150} />
      <GlowOrb color="teal" size={420} bottom="2%" left="-6%" opacity={0.6} blur={130} />

      <div className="proj-shell">
        {/* Heading / contador */}
        <div className="proj-head">
          <div className="proj-counter">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={project.number}
                initial={{ y: reduce ? 0 : 14, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: reduce ? 0 : -14, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="proj-counter-current"
              >
                {project.number}
              </motion.span>
            </AnimatePresence>
            <span className="proj-counter-total">/ {String(PROJECTS.length).padStart(2, '0')}</span>
          </div>
          <p className="proj-head-label">Nuestros proyectos</p>
        </div>

        {/* Card split */}
        <div className="proj-card">
          {/* Panel imagen */}
          <div className="proj-img-panel">
            <AnimatePresence initial={false} custom={dir}>
              <motion.div
                key={`img-${idx}`}
                custom={dir}
                variants={imgV}
                initial="enter"
                animate="center"
                exit="exit"
                className="proj-anim-layer"
              >
                <div className="proj-img-fill" style={{ background: project.imgBg }}>
                  <img 
                    src={project.logo} 
                    alt={project.title}
                    className="proj-logo"
                  />
                </div>
                <div aria-hidden="true" className="proj-img-blend" />
              </motion.div>
            </AnimatePresence>

            {/* HUD esquinas */}
            <div aria-hidden="true" className="proj-hud">
              {['tl', 'tr', 'bl', 'br'].map((pos) => (
                <span key={pos} className={`proj-corner proj-corner--${pos}`} />
              ))}
            </div>
            <div aria-hidden="true" className="proj-scanlines" />
          </div>

          {/* Panel info */}
          <div className="proj-info-panel">
            <AnimatePresence initial={false} custom={dir}>
              <motion.div
                key={`info-${idx}`}
                custom={dir}
                variants={infoV}
                initial="enter"
                animate="center"
                exit="exit"
                className="proj-anim-layer proj-info-layer"
              >
                <div aria-hidden="true" className="proj-watermark">
                  {project.number}
                </div>

                <motion.div variants={contentStagger} initial="hidden" animate="show" className="proj-content">
                  <motion.p variants={contentItem} className="proj-category">
                    <span className="proj-category-dash" />
                    {project.category}
                  </motion.p>

                  <motion.h3 variants={contentItem} className="proj-title">
                    {project.title}
                  </motion.h3>

                  <motion.p variants={contentItem} className="proj-subtitle">
                    {project.subtitle}
                  </motion.p>

                  <motion.p variants={contentItem} className="proj-desc">
                    {project.description}
                  </motion.p>

                  <motion.div variants={contentItem} className="proj-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="proj-tag">
                        {tag}
                      </span>
                    ))}
                  </motion.div>

                  <motion.a variants={contentItem} href="#" className="proj-cta">
                    Ver proyecto
                    <ArrowUpRight size={16} strokeWidth={2.5} className="proj-cta-arrow" />
                  </motion.a>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controles: dots + prev/next */}
          <div className="proj-controls">
            <div className="proj-dots">
              {PROJECTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Proyecto ${i + 1}`}
                  className={`proj-dot ${i === idx ? 'is-active' : ''}`}
                />
              ))}
            </div>
            <div className="proj-nav">
              {[
                { Icon: ChevronUp, d: -1, label: 'Proyecto anterior' },
                { Icon: ChevronDown, d: 1, label: 'Proyecto siguiente' },
              ].map(({ Icon, d, label }) => (
                <motion.button
                  key={label}
                  onClick={() => paginate(d)}
                  aria-label={label}
                  whileHover={reduce ? undefined : { scale: 1.1 }}
                  whileTap={reduce ? undefined : { scale: 0.9 }}
                  className="proj-nav-btn"
                >
                  <Icon size={16} strokeWidth={2.25} />
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .proj-shell {
          width: 100%;
          max-width: 96rem;
          margin-inline: auto;
          padding-inline: clamp(1rem, 4vw, 2.5rem);
          position: relative;
          z-index: 1;
        }

        .proj-head {
          margin-bottom: clamp(1.75rem, 4vw, 3rem);
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }
        .proj-counter {
          display: flex;
          align-items: baseline;
          gap: 0.4rem;
          font-weight: 900;
          line-height: 1;
        }
        .proj-counter-current {
          display: inline-block;
          font-size: clamp(2.25rem, 8vw, 3.5rem);
          color: #a3e635;
        }
        .proj-counter-total {
          font-size: clamp(1rem, 3vw, 1.25rem);
          color: oklch(0.70 0.02 260);
        }
        .proj-head-label {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: oklch(0.70 0.02 260);
        }

        .proj-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-radius: 1.5rem;
          overflow: hidden;
          border: 1px solid oklch(0.30 0.02 260);
          background: oklch(0.20 0.020 260);
          position: relative;
          box-shadow: 0 40px 120px -40px oklch(0.04 0.02 260 / 0.9);
        }

        .proj-anim-layer {
          position: absolute;
          inset: 0;
          transform-origin: 50% 50%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        /* ---- Imagen ---- */
        .proj-img-panel {
          position: relative;
          overflow: hidden;
          perspective: 1200px;
          background: oklch(0.16 0.018 260);
          min-height: clamp(360px, 45vw, 560px);
        }
        .proj-img-fill {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .proj-logo {
          max-width: 55%;
          max-height: 45%;
          object-fit: contain;
          filter: brightness(0) invert(1);
          opacity: 0.88;
        }
        .proj-img-blend {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(to right, transparent 68%, oklch(0.20 0.020 260) 100%);
        }
        .proj-scanlines {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 2;
          opacity: 0.5;
          background-image: repeating-linear-gradient(to bottom, transparent 0 3px, oklch(0 0 0 / 0.10) 3px 4px);
          mix-blend-mode: overlay;
        }

        /* ---- Info ---- */
        .proj-info-panel {
          position: relative;
          overflow: hidden;
          perspective: 1200px;
          background: oklch(0.20 0.020 260);
          min-height: clamp(360px, 45vw, 560px);
        }
        .proj-info-layer {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(2rem, 4vw, 3.5rem);
          padding-right: clamp(4rem, 6vw, 5rem);
        }
        .proj-watermark {
          position: absolute;
          bottom: -1.25rem;
          right: 1.5rem;
          font-weight: 900;
          font-size: clamp(6rem, 15vw, 12rem);
          line-height: 1;
          color: transparent;
          -webkit-text-stroke: 1.5px oklch(0.88 0.26 130 / 0.08);
          user-select: none;
          pointer-events: none;
        }
        .proj-content {
          position: relative;
          z-index: 1;
        }
        .proj-category {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: #a3e635;
          margin-bottom: 0.85rem;
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
        }
        .proj-category-dash {
          width: 1.4rem;
          height: 1px;
          background: #a3e635;
          display: inline-block;
        }
        .proj-title {
          font-weight: 900;
          font-size: clamp(2.2rem, 7vw, 3.8rem);
          letter-spacing: -0.025em;
          text-transform: uppercase;
          line-height: 0.92;
          color: #a3e635;
          margin-bottom: 0.5rem;
        }
        .proj-subtitle {
          font-style: italic;
          font-weight: 600;
          font-size: clamp(1rem, 2.8vw, 1.2rem);
          color: #a3e635;
          opacity: 0.72;
          margin-bottom: 1.25rem;
        }
        .proj-desc {
          font-style: italic;
          font-size: clamp(0.9rem, 2.2vw, 1rem);
          color: oklch(0.96 0.01 260);
          line-height: 1.7;
          max-width: 48ch;
          margin-bottom: 1.5rem;
          text-wrap: pretty;
          opacity: 0.85;
        }
        .proj-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.75rem;
        }
        .proj-tag {
          font-size: 0.75rem;
          font-weight: 500;
          color: oklch(0.70 0.02 260);
          border: 1px solid oklch(0.30 0.02 260);
          border-radius: 2rem;
          padding: 0.25rem 0.85rem;
        }
        .proj-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: oklch(0.16 0.018 260);
          background: #a3e635;
          font-weight: 800;
          font-size: 0.95rem;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 0.7rem 1.3rem;
          border-radius: 0.5rem;
          width: fit-content;
          transition: filter 0.2s ease, box-shadow 0.25s ease;
        }
        .proj-cta:hover {
          filter: brightness(1.08);
          box-shadow: 0 8px 24px oklch(0.88 0.26 130 / 0.3);
        }
        .proj-cta-arrow {
          transition: transform 0.25s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .proj-cta:hover .proj-cta-arrow {
          transform: translate(2px, -2px);
        }

        /* ---- Controles ---- */
        .proj-controls {
          position: absolute;
          right: 1.5rem;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          z-index: 20;
        }
        .proj-dots {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        .proj-dot {
          width: 9px;
          height: 9px;
          border-radius: 4px;
          background: oklch(0.30 0.018 260);
          border: none;
          cursor: pointer;
          padding: 0;
          transition: all 0.35s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .proj-dot.is-active {
          height: 2rem;
          background: #a3e635;
          box-shadow: 0 0 12px oklch(0.88 0.26 130 / 0.55);
        }
        .proj-nav {
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
        }
        .proj-nav-btn {
          width: 2.6rem;
          height: 2.6rem;
          border-radius: 50%;
          background: oklch(0.12 0.022 260 / 0.85);
          border: 1px solid oklch(0.30 0.02 260);
          color: oklch(0.70 0.02 260);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
          transition: border-color 0.2s ease, color 0.2s ease, box-shadow 0.25s ease;
        }
        .proj-nav-btn:hover {
          border-color: #a3e635;
          color: #a3e635;
          box-shadow: 0 0 16px oklch(0.88 0.26 130 / 0.25);
        }

        /* ---- HUD ---- */
        .proj-corner {
          position: absolute;
          width: 20px;
          height: 20px;
          border: 2px solid oklch(0.88 0.26 130 / 0.55);
          z-index: 3;
          pointer-events: none;
        }
        .proj-corner--tl { top: 16px; left: 16px; border-right: 0; border-bottom: 0; }
        .proj-corner--tr { top: 16px; right: 16px; border-left: 0; border-bottom: 0; }
        .proj-corner--bl { bottom: 16px; left: 16px; border-right: 0; border-top: 0; }
        .proj-corner--br { bottom: 16px; right: 16px; border-left: 0; border-top: 0; }

        /* ============ RESPONSIVE ============ */
        @media (max-width: 768px) {
          .proj-card {
            grid-template-columns: 1fr;
          }
          .proj-img-panel {
            min-height: clamp(200px, 40vw, 260px);
          }
          .proj-info-panel {
            min-height: 0;
            display: grid;
          }
          .proj-info-layer {
            position: relative;
            inset: auto;
            padding: 1.75rem 1.75rem 5rem;
          }
          .proj-img-blend {
            background: linear-gradient(to bottom, transparent 70%, oklch(0.20 0.020 260) 100%);
          }
          .proj-controls {
            top: auto;
            bottom: 1.25rem;
            right: 1.25rem;
            transform: none;
            flex-direction: row-reverse;
            align-items: center;
            gap: 0.85rem;
          }
          .proj-dots {
            flex-direction: row;
            align-items: center;
          }
          .proj-dot.is-active {
            height: 9px;
            width: 2rem;
          }
          .proj-nav {
            flex-direction: row;
          }
          .proj-watermark {
            font-size: clamp(4rem, 20vw, 6rem);
            bottom: 0.25rem;
            opacity: 0.6;
          }
        }

        @media (max-width: 480px) {
          .proj-info-layer {
            padding: 1.25rem 1.25rem 4.5rem;
          }
          .proj-desc {
            max-width: none;
          }
          .proj-nav-btn {
            width: 2.2rem;
            height: 2.2rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .proj-cta-arrow,
          .proj-dot,
          .proj-nav-btn {
            transition: none;
          }
        }
      `}</style>
    </section>
  )
}