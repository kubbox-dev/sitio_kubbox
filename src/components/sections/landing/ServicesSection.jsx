import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronRight, ArrowUpRight } from 'lucide-react'
import Button from '../../ui/Button'
import { useScrollAnimation, fadeUp, staggerContainer } from '../../../hooks/useScrollAnimation'

const ICON = (name) => encodeURI(`/images/HOME/WEB/iconos/${name}.svg`)
const PERSON_IMG = '/images/HOME/WEB/Ruleta/senora.png'

const SERVICES = [
  {
    id: 'desarrollo',
    title: 'Desarrollo Digital',
    tagline: 'Diseñamos experiencias digitales que conectan marcas con personas.',
    body: 'Creamos y gestionamos productos digitales centrados en el usuario: sitios web, e-commerce, plataformas interactivas, web apps y sistemas personalizados con enfoque en diseño, performance y analítica.',
    icon: ICON('computador sin verde'),
    bullets: [
      'Sitios web corporativos y de marca',
      'Plataformas a medida y web apps',
      'Sistemas de registro, concursos y activaciones',
    ],
  },
  {
    id: 'marketing',
    title: 'Marketing Digital',
    tagline: 'Estrategias que ponen tu marca frente a la audiencia correcta.',
    body: 'Diseñamos y ejecutamos estrategias de comunicación que conectan con tu audiencia y generan resultados medibles, desde la creatividad hasta la pauta y la conversión.',
    icon: ICON('redes sin vered'),
    bullets: [
      'Estrategia y gestión de redes sociales',
      'Campañas de pauta digital (Meta, Google)',
      'Email marketing y automatización',
      'Contenido y copywriting estratégico',
    ],
  },
  {
    id: 'performance',
    title: 'Performance & Data',
    tagline: 'Decisiones guiadas por datos para crecer de forma rentable.',
    body: 'Medimos, analizamos y optimizamos cada punto del embudo para que cada peso invertido rinda más, con reportes claros y accionables.',
    icon: ICON('escaleras sin verde'),
    bullets: [
      'Analítica web y reportes de ROI',
      'Optimización de conversiones (CRO)',
      'Auditorías y diagnósticos digitales',
      'Reportes claros y accionables',
    ],
  },
  {
    id: 'seo',
    title: 'SEO & Posicionamiento',
    tagline: 'Que te encuentren justo cuando te están buscando.',
    body: 'Trabajamos el posicionamiento orgánico de tu marca para que aparezcas en los primeros resultados y atraigas tráfico de calidad de forma sostenible.',
    icon: ICON('lupa sin verde'),
    bullets: [
      'SEO técnico y de contenidos',
      'Investigación de palabras clave',
      'Posicionamiento en Google',
      'Optimización on-page y off-page',
    ],
  },
  {
    id: 'ia',
    title: 'IA & Automatización',
    tagline: 'Inteligencia artificial al servicio de tus resultados.',
    body: 'Integramos inteligencia artificial y automatización para acelerar procesos, personalizar experiencias y liberar tiempo de tu equipo.',
    icon: ICON('bombillo sin verde'),
    bullets: [
      'Flujos automatizados con IA',
      'Chatbots y asistentes digitales',
      'Generación de contenido asistida',
      'Integraciones y herramientas custom',
    ],
  },
]

const N = SERVICES.length
const STEP = 360 / N
const AUTOPLAY_MS = 4200

const shortestDelta = (from, to) => {
  let d = (to - from) % N
  if (d >  N / 2) d -= N
  if (d < -N / 2) d += N
  return d
}

export default function ServicesSection() {
  const [turn, setTurn] = useState(0)
  const [paused, setPaused] = useState(false)
  const { ref: headRef, controls: headControls } = useScrollAnimation()
  const reduce = useReducedMotion()

  const active = ((turn % N) + N) % N
  const service = SERVICES[active]

  const goTo = useCallback((j) => {
    setTurn((t) => t + shortestDelta(((t % N) + N) % N, j))
  }, [])
  const advance = useCallback(() => setTurn((t) => t + 1), [])

  const pausedRef = useRef(paused)
  useEffect(() => { pausedRef.current = paused }, [paused])
  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => { if (!pausedRef.current) advance() }, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [reduce, advance])

  const ringRot = reduce ? 0 : -turn * STEP
  const spinTransition = reduce ? { duration: 0 } : { duration: 0.9, ease: [0.34, 1.2, 0.4, 1] }

  return (
    <section
      id="servicios"
      style={{
        position: 'relative',
        paddingBlock: 'clamp(3.5rem, 7vw, 5.5rem)',
        marginTop: '-1px',
      }}
    >
      

      <div style={{ maxWidth: 'var(--container)', marginInline: 'auto', paddingInline: 'var(--container-pad)', position: 'relative', zIndex: 1, width: '100%' }}>

        {/* ── Heading editorial exactamente como en ServicesHero ───────── */}
        <div className="svc-head">
          {/* Top-right kicker */}
          <div className="svc-kicker-top">
            <span>Creados para ti</span>
            <span className="svc-kicker-line" />
          </div>

          {/* Headline block */}
          <div className="svc-headline-block">
            <h2 className="svc-heading-solid">NUESTROS</h2>
            <span className="svc-heading-outline">SERVICIOS</span>
          </div>

          {/* Lower-left label with vertical divider */}
          <div className="svc-years">
            <span className="svc-years-line" />
            <span>10 años encontrando identidad</span>
          </div>
        </div>

        <motion.p
          className="svc-impulsa"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
        >
          IMPULSA TU <b>MARCA</b> CON <b>NUESTRAS SOLUCIONES</b>
        </motion.p>

        {/* ── Card con 2 columnas (texto izquierda | ruleta derecha) ───────── */}
        <motion.div
          className="svc-card-new"
          layout
          transition={{ layout: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Columna izquierda - Detalle del servicio */}
          <motion.div className="svc-card-left-new" layout transition={{ layout: { duration: 0.42, ease: [0.16, 1, 0.3, 1] } }}>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={active}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              >
                  <span className="svc-card-kicker">
                    {String(active + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
                  </span>
                  <h3 className="svc-card-title-new">{service.title}</h3>
                  <p className="svc-card-tagline-new">{service.tagline}</p>
                  <p className="svc-card-body-new">{service.body}</p>
                  <motion.ul
                    className="svc-card-bullets-new"
                    initial="hidden"
                    animate="visible"
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09, delayChildren: 0.18 } } }}
                  >
                    {service.bullets.map(b => (
                      <motion.li
                        key={b}
                        variants={{
                          hidden: { opacity: 0, x: -12 },
                          visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
                        }}
                      >
                        <ChevronRight size={15} className="svc-bullet-ic" />
                        <span>{b}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
            </AnimatePresence>

            {/* Tabs */}
            <div className="svc-tabs-new">
              {SERVICES.map((s, i) => (
                <motion.button
                  key={s.id}
                  onClick={() => goTo(i)}
                  whileHover={reduce ? undefined : { scale: 1.04 }}
                  whileTap={reduce ? undefined : { scale: 0.97 }}
                  className={`svc-tab-new ${i === active ? 'is-active' : ''}`}
                >
                  {s.title}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Columna derecha - Ruleta + Señora */}
          <div className="svc-card-right-new">
            {/* Ruleta container */}
            <div className="wheel-stage-new" style={{
              '--wheel-r': 'clamp(115px, 16vw, 165px)',
              '--node': 'clamp(46px, 5.6vw, 58px)',
            }}>
              {/* Anillo decorativo */}
              <div className="wheel-ring-bg" />
              
              {/* Núcleo central con ícono activo */}
              <div className="wheel-core-new">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    className="wheel-core-inner"
                    initial={{ opacity: 0, scale: 0.8, rotate: reduce ? 0 : -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.35 }}
                  >
                    <img src={service.icon} alt="" className="wheel-core-icon" draggable="false" />
                    <span className="wheel-core-label">{service.title}</span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Iconos giratorios */}
              <motion.div className="wheel-spin-new" animate={{ rotate: ringRot }} transition={spinTransition}>
                {SERVICES.map((s, i) => {
                  const isActive = i === active
                  return (
                    <div
                      key={s.id}
                      className="wheel-node-new"
                      style={{ transform: `rotate(${i * STEP}deg) translateY(calc(-1 * var(--wheel-r)))` }}
                    >
                      <div className="wheel-icon-pos-new">
                        <motion.button
                          onClick={() => goTo(i)}
                          aria-label={s.title}
                          className={`wheel-icon-new ${isActive ? 'is-active' : ''}`}
                          animate={{ rotate: reduce ? 0 : (turn - i) * STEP }}
                          transition={spinTransition}
                          whileHover={reduce ? undefined : { scale: isActive ? 1 : 1.1 }}
                          whileTap={reduce ? undefined : { scale: 0.94 }}
                        >
                          <span className="wheel-icon-inner-new">
                            <img src={s.icon} alt="" draggable="false" />
                          </span>
                        </motion.button>
                      </div>
                    </div>
                  )
                })}
              </motion.div>

              {/* Señora */}
              <div className="wheel-person-wrap-new">
                <motion.img
                  src={PERSON_IMG}
                  alt="Soluciones digitales con tecnología de vanguardia"
                  className="wheel-person-new"
                  initial={{ opacity: 0, scale: 0.94 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  draggable="false"
                />
              </div>
            </div>

            {/* Dots de progreso */}
            <div className="wheel-dots-new">
              {SERVICES.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => goTo(i)}
                  aria-label={`Ir a ${s.title}`}
                  className={i === active ? 'is-active' : ''}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Fade hacia AISection */}
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '10%',
        background: 'linear-gradient(to bottom, transparent, var(--c-bg))',
        pointerEvents: 'none', zIndex: 2,
      }} />

      <style>{`
        /* ── Heading editorial estilo ServicesHero ── */
        .svc-head {
          position: relative;
          margin-bottom: clamp(2rem, 5vw, 3.5rem);
          padding-block: clamp(1rem, 2vw, 1.75rem);
          min-height: clamp(180px, 22vw, 260px);
        }

        /* Top-right kicker */
        .svc-kicker-top {
          position: absolute;
          top: clamp(0.5rem, 2vw, 1rem);
          right: 0;
          display: flex;
          align-items: center;
          gap: 0.85rem;
          z-index: 3;
        }
        .svc-kicker-top span:first-child {
          font-family: var(--font-display);
          font-weight: 700;
          font-style: italic;
          font-size: clamp(0.65rem, 1.2vw, 0.85rem);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: oklch(0.62 0.015 260);
        }
        .svc-kicker-line {
          width: clamp(2.5rem, 8vw, 6rem);
          height: 1px;
          background: oklch(0.62 0.015 260 / 0.6);
          display: inline-block;
        }

        /* Headline block */
        .svc-headline-block {
          display: flex;
          flex-direction: column;
          margin-top: clamp(0.5rem, 2vw, 1rem);
        }
        .svc-heading-solid {
          font-family: var(--font-display);
          font-weight: 900;
          font-style: italic;
          font-size: clamp(2.75rem, 13vw, 12rem);
          letter-spacing: -0.03em;
          text-transform: uppercase;
          color: var(--c-ink);
          margin: 0;
          line-height: 0.86;
        }
        .svc-heading-outline {
          font-family: var(--font-display);
          font-weight: 900;
          font-style: italic;
          font-size: clamp(2.5rem, 12.5vw, 11.5rem);
          letter-spacing: -0.03em;
          text-transform: uppercase;
          color: transparent;
          -webkit-text-stroke: clamp(1px, 0.18vw, 2.5px) oklch(0.98 0 0 / 0.65);
          line-height: 0.86;
          align-self: flex-end;
          margin-top: -0.1em;
        }

        /* Lower-left label with vertical divider */
        .svc-years {
          position: absolute;
          left: 0;
          bottom: clamp(0.25rem, 1.5vw, 1rem);
          display: flex;
          align-items: center;
          gap: 0.85rem;
          z-index: 3;
        }
        .svc-years-line {
          height: clamp(2rem, 6vh, 4rem);
          width: 1px;
          background: oklch(0.62 0.015 260 / 0.6);
          display: inline-block;
        }
        .svc-years span:last-child {
          font-family: var(--font-display);
          font-weight: 700;
          font-style: italic;
          font-size: clamp(0.55rem, 1vw, 0.8rem);
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: oklch(0.62 0.015 260);
        }

        .svc-impulsa {
          text-align: center;
          font-family: var(--font-display);
          font-weight: 800;
          font-style: italic;
          font-size: clamp(1rem, 2.6vw, 2rem);
          letter-spacing: 0.01em;
          text-transform: uppercase;
          color: var(--c-ink);
          margin: 0 auto clamp(1.5rem, 3vw, 2.5rem);
        }
        .svc-impulsa b { color: var(--c-lime); font-weight: 800; }

        /* ── Card (2 columnas: texto | ruleta) ── */
        .svc-card-new {
          margin-bottom: clamp(2rem, 5vw, 3.5rem);
          position: relative;
          background: oklch(0.13 0.020 260 / 0.85);
          border: 1px solid oklch(0.26 0.022 260);
          border-radius: 1.5rem;
          backdrop-filter: blur(14px);
          box-shadow: 0 40px 110px -40px oklch(0.03 0.02 260 / 0.9);
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          align-items: center;
          gap: clamp(1.5rem, 4vw, 3.5rem);
          padding: clamp(1.75rem, 4vw, 3.25rem);
          overflow: hidden;
        }

        /* Columna izquierda - texto */
        .svc-card-left-new {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
        }

        .svc-card-kicker {
          font-family: var(--font-body);
          font-weight: 700;
          font-size: 0.78rem;
          letter-spacing: 0.18em;
          color: var(--c-lime);
          display: block;
          margin-bottom: 0.6rem;
        }

        .svc-card-title-new {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: clamp(1.7rem, 3.4vw, 2.6rem);
          letter-spacing: -0.02em;
          text-transform: uppercase;
          line-height: 0.95;
          color: var(--c-ink);
          margin: 0 0 0.6rem;
        }

        .svc-card-tagline-new {
          font-family: var(--font-body);
          font-style: italic;
          font-weight: 600;
          font-size: clamp(0.9rem, 1.3vw, 1.05rem);
          color: var(--c-lime);
          opacity: 0.85;
          margin: 0 0 1rem;
          max-width: 38ch;
        }

        .svc-card-body-new {
          font-family: var(--font-body);
          font-size: clamp(0.85rem, 1vw, 0.95rem);
          color: var(--c-muted);
          line-height: 1.6;
          margin: 0 0 1.25rem;
          max-width: 44ch;
        }

        .svc-card-bullets-new {
          list-style: none;
          padding: 0;
          margin: 0 0 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .svc-card-bullets-new li {
          display: flex;
          gap: 0.55rem;
          align-items: flex-start;
        }

        .svc-bullet-ic {
          flex-shrink: 0;
          margin-top: 0.15rem;
          color: var(--c-lime);
        }

        .svc-card-bullets-new span {
          font-family: var(--font-body);
          font-size: clamp(0.82rem, 1vw, 0.92rem);
          color: oklch(0.82 0.010 260);
          line-height: 1.45;
        }

        .svc-btn-new {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          width: fit-content;
        }

        .svc-tabs-new {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: auto;
          padding-top: 1.75rem;
        }

        .svc-tab-new {
          background: var(--c-surface);
          border: 1px solid oklch(0.28 0.022 260);
          border-radius: 0.5rem;
          padding: 0.4rem 0.75rem;
          cursor: pointer;
          color: var(--c-muted);
          font-family: var(--font-body);
          font-size: 0.74rem;
          font-weight: 500;
          transition: all 0.25s ease;
        }

        .svc-tab-new:hover {
          border-color: oklch(0.45 0.08 140);
          color: var(--c-ink);
        }

        .svc-tab-new.is-active {
          background: oklch(0.88 0.22 130 / 0.12);
          border-color: var(--c-lime);
          color: var(--c-lime);
        }

        /* Columna derecha - Ruleta */
        .svc-card-right-new {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .wheel-stage-new {
          --wheel-r: clamp(115px, 16vw, 165px);
          --node: clamp(46px, 5.6vw, 58px);
          position: relative;
          width: calc(var(--wheel-r) * 2 + var(--node));
          height: calc(var(--wheel-r) * 2 + var(--node));
          display: grid;
          place-items: center;
        }

        .wheel-ring-bg {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: calc(var(--wheel-r) * 2);
          height: calc(var(--wheel-r) * 2);
          border-radius: 50%;
          border: 1px dashed oklch(0.45 0.02 260 / 0.6);
          pointer-events: none;
        }

        .wheel-core-new {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: clamp(155px, 22vw, 215px);
          aspect-ratio: 1;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 30%, oklch(0.92 0.235 128), oklch(0.84 0.25 134) 70%);
          box-shadow: 0 0 55px oklch(0.88 0.26 130 / 0.35), inset 0 0 40px oklch(0.70 0.22 138 / 0.35);
          display: grid;
          place-items: center;
          z-index: 10;
        }

        .wheel-core-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          color: oklch(0.16 0.05 150);
          text-align: center;
          padding: 0 1rem;
        }

        .wheel-core-icon {
          width: 40px;
          height: 40px;
          object-fit: contain;
          filter: brightness(0) invert(0);
        }

        .wheel-core-label {
          font-family: var(--font-display);
          font-weight: 900;
          font-style: italic;
          font-size: clamp(0.8rem, 1.4vw, 1rem);
          text-transform: uppercase;
          line-height: 1;
          letter-spacing: -0.01em;
        }

        .wheel-spin-new {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 0;
          height: 0;
          z-index: 5;
        }

        .wheel-node-new {
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 0;
        }

        .wheel-icon-pos-new {
          position: absolute;
          top: 0;
          left: 0;
          width: var(--node);
          height: var(--node);
          transform: translate(-50%, -50%);
        }

        .wheel-icon-new {
          width: 100%;
          height: 100%;
          border: none;
          background: none;
          padding: 0;
          cursor: pointer;
          display: block;
        }

        .wheel-icon-inner-new {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: oklch(0.22 0.018 260 / 0.85);
          border: 1px solid oklch(0.34 0.020 260 / 0.8);
          backdrop-filter: blur(6px);
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease;
        }

        .wheel-icon-inner-new img {
          width: 58%;
          height: 58%;
          object-fit: contain;
          opacity: 0.92;
          transition: opacity 0.3s ease, filter 0.3s ease;
        }

        .wheel-icon-new.is-active .wheel-icon-inner-new {
          transform: scale(1.18);
          background: var(--c-lime);
          border-color: oklch(0.94 0.255 132);
          box-shadow: 0 0 0 5px oklch(0.88 0.26 130 / 0.20), 0 8px 28px oklch(0.88 0.26 130 / 0.45);
        }

        .wheel-icon-new.is-active .wheel-icon-inner-new img {
          opacity: 1;
          filter: brightness(0) saturate(100%) invert(9%) sepia(18%) saturate(1600%) hue-rotate(200deg);
        }

        .wheel-icon-new:not(.is-active):hover .wheel-icon-inner-new {
          border-color: var(--c-lime);
          box-shadow: 0 0 16px oklch(0.88 0.26 130 / 0.3);
        }

        .wheel-icon-new:not(.is-active):hover .wheel-icon-inner-new img {
          opacity: 1;
        }

        .wheel-person-wrap-new {
          position: absolute;
          left: 50%;
          bottom: -20%;
          transform: translateX(-50%);
          height: 85%;
          z-index: 15;
          pointer-events: none;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }

        .wheel-person-new {
          height: 100%;
          width: auto;
          max-width: none;
          object-fit: contain;
          display: block;
          filter: drop-shadow(0 24px 40px oklch(0.04 0.02 260 / 0.55));
          -webkit-mask-image: linear-gradient(to bottom, black 80%, transparent 99%);
          mask-image: linear-gradient(to bottom, black 80%, transparent 99%);
        }

        .wheel-dots-new {
          display: flex;
          gap: 0.5rem;
        }

        .wheel-dots-new button {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          border: none;
          padding: 0;
          cursor: pointer;
          background: oklch(0.40 0.02 260);
          transition: all 0.3s ease;
        }

        .wheel-dots-new button.is-active {
          width: 26px;
          border-radius: 5px;
          background: var(--c-lime);
          box-shadow: 0 0 12px oklch(0.88 0.26 130 / 0.5);
        }

        /* Responsive */
        @media (max-width: 880px) {
          .svc-card-new {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .svc-card-right-new {
            order: -1;
          }
          .wheel-person-wrap-new {
            bottom: -10%;
          }
        }

        @media (max-width: 640px) {
          .svc-kicker-top {
            position: static;
            justify-content: flex-end;
            margin-bottom: 1rem;
          }
          .svc-headline-block {
            margin-top: 0;
          }
          .svc-years {
            position: static;
            margin-top: 1rem;
          }
          .wheel-person-wrap-new {
            bottom: -5%;
            height: 75%;
          }
        }
      `}</style>
    </section>
  )
}