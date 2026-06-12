import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import GlowOrb from '../ui/GlowOrb'
import Button from '../ui/Button'
import { useScrollAnimation, fadeUp, staggerContainer } from '../../hooks/useScrollAnimation'

const ICON = (name) => encodeURI(`/images/HOME/WEB/iconos/${name}.svg`)
const PHOTO = (name) => encodeURI(`/images/HOME/WEB/Fotos/${name}.png`)

const SERVICES = [
  {
    id: 'desarrollo',
    title: 'Desarrollo Digital',
    tagline: 'Diseñamos experiencias digitales que conectan marcas con personas.',
    body: 'Creamos y gestionamos productos digitales centrados en el usuario: sitios web, e-commerce, plataformas interactivas, web apps y sistemas personalizados con enfoque en diseño, performance y analítica.',
    icon: ICON('computador sin verde'),
    bullets: [
      'Sitios web corporativos y de marca',
      'E-commerce y tiendas online',
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

const SHOWCASE = [
  PHOTO('Celular IA'),
  PHOTO('Piedras con celular'),
  PHOTO('imagen escalera'),
  PHOTO('piedras'),
]

const PERSON_IMG = '/images/HOME/WEB/Ruleta/senora.png'

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
        overflow: 'hidden',
        paddingBlock: 'clamp(3.5rem, 7vw, 5.5rem)',
      }}
    >
      <GlowOrb color="lime" size={600} top="-5%"  right="-8%" opacity={0.7} blur={140} />
      <GlowOrb color="teal" size={460} bottom="2%" left="-6%" opacity={0.6} blur={120} />

      <div style={{ maxWidth: 'var(--container)', marginInline: 'auto', paddingInline: 'var(--container-pad)', position: 'relative', zIndex: 1, width: '100%' }}>

        {/* ── Heading editorial ───────── */}
        <motion.div
          ref={headRef}
          initial="hidden"
          animate={headControls}
          variants={staggerContainer(0.12)}
          className="svc-head"
          style={{ position: 'relative', marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)' }}
        >
          <motion.div variants={fadeUp} className="svc-label svc-label--tr">
            <span>Creados para ti</span>
            <span className="svc-label-line" />
          </motion.div>
          <motion.h2 variants={fadeUp} className="svc-word svc-word--solid">NUESTROS</motion.h2>
          <motion.div variants={fadeUp} className="svc-word svc-word--outline">SERVICIOS</motion.div>
          <motion.p variants={fadeUp} className="svc-label svc-label--bl">5 años encontrando identidad</motion.p>
        </motion.div>

        {/* ── Tagline ───────── */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="svc-impulsa"
        >
          IMPULSA TU <b>MARCA</b> CON <b>NUESTRAS SOLUCIONES</b>
        </motion.p>

        {/* ── Stage: ruleta + card ───────── */}
        <div
          className="svc-stage"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Hero: arco + círculo lime + iconos + señora */}
          <div className="svc-hero">
            <div aria-hidden="true" className="svc-arc" />
            <div aria-hidden="true" className="svc-limecircle" />

            {/* Iconos girando */}
            <div className="wheel-stage">
              <motion.div className="wheel-spin" animate={{ rotate: ringRot }} transition={spinTransition}>
                {SERVICES.map((s, i) => {
                  const isActive = i === active
                  return (
                    <div
                      key={s.id}
                      className="wheel-node"
                      style={{ transform: `rotate(${i * STEP}deg) translateY(calc(-1 * var(--wheel-r)))` }}
                    >
                      <div className="wheel-icon-pos">
                        <motion.button
                          onClick={() => goTo(i)}
                          aria-label={s.title}
                          className={`wheel-icon ${isActive ? 'is-active' : ''}`}
                          animate={{ rotate: reduce ? 0 : (turn - i) * STEP }}
                          transition={spinTransition}
                          whileHover={reduce ? undefined : { scale: isActive ? 1.0 : 1.08 }}
                          whileTap={reduce ? undefined : { scale: 0.94 }}
                        >
                          <span className="wheel-icon-inner">
                            <img src={s.icon} alt="" draggable="false" />
                          </span>
                        </motion.button>
                      </div>
                    </div>
                  )
                })}
              </motion.div>
            </div>

            {/* Etiqueta del servicio activo */}
            <div className="wheel-toplabel" aria-hidden="true">
              <AnimatePresence mode="wait">
                <motion.span
                  key={active}
                  initial={{ opacity: 0, y: reduce ? 0 : 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduce ? 0 : -5 }}
                  transition={{ duration: 0.3 }}
                >
                  {service.title}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Señora — estática (wrapper estático para no romper el centrado) */}
            <div className="wheel-person-wrap">
              <motion.img
                src={PERSON_IMG}
                alt="Soluciones digitales con tecnología de vanguardia"
                className="wheel-person"
                initial={{ opacity: 0, scale: 0.94 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                draggable="false"
              />
            </div>
          </div>

          {/* CARD */}
          <div className="svc-card">
            {/* Left — detalle del servicio */}
            <div className="svc-card-left">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h3 className="svc-card-title">{service.title}</h3>
                  <p className="svc-card-tagline">{service.tagline}</p>
                  <p className="svc-card-body">{service.body}</p>
                  <ul className="svc-card-bullets">
                    {service.bullets.map(b => (
                      <li key={b}>
                        <ChevronRight size={15} style={{ flexShrink: 0, marginTop: '0.15rem', color: 'var(--c-lime)' }} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="primary" size="md">Ver más</Button>
                </motion.div>
              </AnimatePresence>

              {/* Tabs */}
              <div className="svc-tabs">
                {SERVICES.map((s, i) => (
                  <motion.button
                    key={s.id}
                    onClick={() => goTo(i)}
                    whileHover={reduce ? undefined : { scale: 1.04 }}
                    whileTap={reduce ? undefined : { scale: 0.97 }}
                    className={`svc-tab ${i === active ? 'is-active' : ''}`}
                  >
                    {s.title}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Right — grid de showcase */}
            <div className="svc-card-right">
              {SHOWCASE.map((src, i) => (
                <motion.div
                  key={src}
                  className="svc-shot"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={reduce ? undefined : { scale: 1.04 }}
                >
                  <img src={src} alt="" draggable="false" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Dots de progreso */}
          <div className="wheel-dots">
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
      </div>

      {/* Fade hacia AISection */}
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%',
        background: 'linear-gradient(to bottom, transparent, var(--c-bg))',
        pointerEvents: 'none', zIndex: 2,
      }} />

      <style>{`
        /* ── Heading editorial ── */
        .svc-head { --svc-size: clamp(2.4rem, 10vw, 7.5rem); line-height: 0.82; padding-block: clamp(1rem, 2vw, 1.75rem); }
        .svc-word { font-family: var(--font-display); font-weight: 900; font-style: italic; font-size: var(--svc-size); letter-spacing: -0.03em; text-transform: uppercase; margin: 0; }
        .svc-word--solid { color: var(--c-ink); position: relative; z-index: 2; width: fit-content; }
        .svc-word--outline { color: transparent; -webkit-text-stroke: 1.5px oklch(0.98 0 0 / 0.65); margin-top: -0.18em; margin-left: clamp(2rem, 16vw, 14rem); width: fit-content; position: relative; z-index: 1; }
        .svc-label { font-family: var(--font-display); font-weight: 700; font-style: italic; font-size: clamp(0.7rem, 1.3vw, 0.95rem); letter-spacing: 0.14em; text-transform: uppercase; color: oklch(0.62 0.015 260); margin: 0; }
        .svc-label--tr { position: absolute; top: clamp(1rem, 3vw, 2.5rem); right: 0; display: flex; align-items: center; gap: 0.85rem; z-index: 3; }
        .svc-label-line { width: clamp(2.5rem, 8vw, 7rem); height: 1px; background: oklch(0.62 0.015 260 / 0.6); display: inline-block; }
        .svc-label--bl { position: absolute; left: 0; bottom: clamp(0.25rem, 1.5vw, 1rem); z-index: 3; }

        .svc-impulsa {
          text-align: center;
          font-family: var(--font-display); font-weight: 800; font-style: italic;
          font-size: clamp(1rem, 2.6vw, 2rem); letter-spacing: 0.01em; text-transform: uppercase;
          color: var(--c-ink); margin: 0 auto clamp(0.5rem, 1.5vw, 1rem);
        }
        .svc-impulsa b { color: var(--c-lime); font-weight: 800; }

        /* ── Stage ── */
        .svc-stage {
          --wheel-r: clamp(165px, 23vw, 285px);
          --node: clamp(44px, 5.4vw, 64px);
          --cx: 50%;
          --cy: clamp(155px, 20vw, 225px);
          position: relative;
          isolation: isolate;
        }

        /* Hero (capa de la ruleta + señora) */
        .svc-hero { position: relative; height: clamp(420px, 54vw, 600px); margin-top: clamp(30px, 5vw, 70px); z-index: 2; }

        .svc-arc {
          position: absolute;
          left: var(--cx); top: var(--cy);
          width: calc(var(--wheel-r) * 2 + var(--node) * 1.9);
          height: calc(var(--wheel-r) * 2 + var(--node) * 1.9);
          transform: translate(-50%, -50%);
          border-radius: 50%;
          clip-path: inset(0 0 48% 0);
          background:
            radial-gradient(circle at 50% 50%,
              transparent 56%,
              oklch(0.38 0.012 260 / 0.62) 58%,
              oklch(0.30 0.012 260 / 0.52) 80%,
              oklch(0.22 0.012 260 / 0.22) 94%,
              transparent 100%);
          z-index: 0;
          pointer-events: none;
        }
        .svc-limecircle {
          position: absolute;
          left: var(--cx); top: calc(var(--cy) + var(--wheel-r) * 0.08);
          width: clamp(185px, 25vw, 270px);
          aspect-ratio: 1;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: radial-gradient(circle, oklch(0.87 0.255 130) 0%, oklch(0.86 0.255 131) 64%, oklch(0.80 0.25 134) 100%);
          box-shadow: 0 0 45px oklch(0.88 0.26 130 / 0.30);
          z-index: 1;
          pointer-events: none;
        }

        .wheel-stage {
          position: absolute;
          left: var(--cx); top: var(--cy);
          width: calc(var(--wheel-r) * 2);
          height: calc(var(--wheel-r) * 2);
          transform: translate(-50%, -50%);
          z-index: 3;
          pointer-events: none;
        }
        .wheel-spin { position: absolute; inset: 0; }
        .wheel-node { position: absolute; top: 50%; left: 50%; width: 0; height: 0; }
        .wheel-icon-pos { position: absolute; top: 0; left: 0; width: var(--node); height: var(--node); transform: translate(-50%, -50%); }
        .wheel-icon { width: 100%; height: 100%; border: none; background: none; padding: 0; cursor: pointer; pointer-events: auto; display: block; }
        .wheel-icon-inner {
          display: flex; align-items: center; justify-content: center; width: 100%; height: 100%;
          border-radius: 50%;
          background: oklch(0.22 0.018 260 / 0.78);
          border: 1px solid oklch(0.34 0.020 260 / 0.7);
          backdrop-filter: blur(6px);
          transition: transform 0.3s var(--ease-out-quart), box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease;
        }
        .wheel-icon img { width: 58%; height: 58%; object-fit: contain; opacity: 0.92; transition: opacity 0.3s ease, filter 0.3s ease; }
        .wheel-icon.is-active .wheel-icon-inner {
          transform: scale(1.34);
          background: oklch(0.88 0.250 130);
          border-color: oklch(0.94 0.255 132);
          box-shadow: 0 0 0 5px oklch(0.88 0.260 130 / 0.22), 0 8px 28px oklch(0.88 0.260 130 / 0.45);
        }
        .wheel-icon.is-active img {
          opacity: 1;
          filter: brightness(0) saturate(100%) invert(9%) sepia(18%) saturate(1600%) hue-rotate(200deg);
        }
        .wheel-icon:not(.is-active):hover .wheel-icon-inner { border-color: var(--c-lime); box-shadow: 0 0 16px oklch(0.88 0.260 130 / 0.3); }

        .wheel-toplabel {
          position: absolute;
          left: var(--cx);
          top: calc(var(--cy) - var(--wheel-r) - var(--node) * 0.95);
          transform: translate(-50%, -50%);
          z-index: 4;
          font-family: var(--font-body); font-weight: 700; font-size: 0.72rem;
          letter-spacing: 0.05em; text-transform: uppercase;
          color: oklch(0.30 0.02 260); text-align: center; white-space: nowrap;
        }

        .wheel-person-wrap {
          position: absolute;
          left: 50%; bottom: 0;
          transform: translateX(-50%);
          height: 90%;
          z-index: 4;
          pointer-events: none;
          display: flex; align-items: flex-end; justify-content: center;
        }
        .wheel-person {
          height: 100%;
          width: auto; max-width: none;
          object-fit: contain;
          display: block;
          filter: drop-shadow(0 24px 40px oklch(0.04 0.02 260 / 0.55));
          -webkit-mask-image: linear-gradient(to bottom, black 80%, transparent 99%);
                  mask-image: linear-gradient(to bottom, black 80%, transparent 99%);
        }

        /* ── Card ── */
        .svc-card {
          position: relative;
          z-index: 1;
          margin-top: clamp(-130px, -16vw, -90px);
          background: oklch(0.12 0.020 260 / 0.82);
          border: 1px solid oklch(0.24 0.022 260);
          border-radius: 1.5rem;
          backdrop-filter: blur(14px);
          box-shadow: 0 40px 110px -40px oklch(0.03 0.02 260 / 0.9);
          display: grid;
          grid-template-columns: 1.05fr 0.62fr 1.1fr;
          align-items: stretch;
          gap: clamp(1rem, 2.5vw, 2.5rem);
          padding: clamp(1.5rem, 3vw, 2.75rem);
          padding-top: clamp(7rem, 13vw, 11rem);
        }
        .svc-card-left { grid-column: 1; display: flex; flex-direction: column; }
        .svc-card-title {
          font-family: var(--font-display); font-weight: 900;
          font-size: clamp(1.7rem, 3.4vw, 2.6rem); letter-spacing: -0.02em;
          text-transform: uppercase; line-height: 0.92;
          color: var(--c-ink); margin-bottom: 0.6rem;
        }
        .svc-card-title { color: var(--c-lime); }
        .svc-card-tagline {
          font-family: var(--font-body); font-style: italic; font-weight: 600;
          font-size: clamp(0.85rem, 1.3vw, 1rem);
          color: var(--c-lime); opacity: 0.78; margin-bottom: 1rem; max-width: 36ch;
        }
        .svc-card-body {
          font-family: var(--font-body); font-size: clamp(0.82rem, 1vw, 0.92rem);
          color: var(--c-muted); line-height: 1.6; margin-bottom: 1.25rem; max-width: 42ch;
        }
        .svc-card-bullets { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.75rem; }
        .svc-card-bullets li { display: flex; gap: 0.55rem; align-items: flex-start; }
        .svc-card-bullets span { font-family: var(--font-body); font-size: clamp(0.8rem, 1vw, 0.9rem); color: oklch(0.78 0.010 260); line-height: 1.45; }

        .svc-tabs { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: auto; padding-top: 1.75rem; }
        .svc-tab {
          background: var(--c-surface); border: 1px solid oklch(0.22 0.022 260);
          border-radius: 0.5rem; padding: 0.4rem 0.75rem; cursor: pointer;
          color: var(--c-muted); font-family: var(--font-body); font-size: 0.74rem; font-weight: 500;
          transition: all var(--transition-base);
        }
        .svc-tab.is-active { background: oklch(0.88 0.220 130 / 0.12); border-color: var(--c-lime); color: var(--c-lime); }

        .svc-card-right {
          grid-column: 3;
          display: grid; grid-template-columns: 1fr 1fr; grid-auto-rows: 1fr;
          gap: clamp(0.6rem, 1.2vw, 1rem);
          align-content: center;
        }
        .svc-shot {
          position: relative; overflow: hidden; border-radius: 0.875rem;
          aspect-ratio: 4 / 3;
          border: 1px solid oklch(0.26 0.025 260);
          background: oklch(0.16 0.022 260);
          cursor: pointer;
        }
        .svc-shot img { width: 100%; height: 100%; object-fit: cover; display: block; }

        .wheel-dots { position: absolute; bottom: clamp(0.9rem, 2vw, 1.4rem); right: clamp(1.2rem, 3vw, 2.5rem); display: flex; gap: 0.5rem; z-index: 5; }
        .wheel-dots button { width: 9px; height: 9px; border-radius: 50%; border: none; padding: 0; cursor: pointer; background: oklch(0.32 0.05 200); transition: all 0.3s var(--ease-out-quart); }
        .wheel-dots button.is-active { width: 26px; border-radius: 5px; background: var(--c-lime); box-shadow: 0 0 12px oklch(0.88 0.260 130 / 0.5); }

        /* ── Responsive ── */
        @media (max-width: 880px) {
          .svc-card { grid-template-columns: 1fr; gap: 1.5rem; padding-top: clamp(6rem, 30vw, 9rem); }
          .svc-card-left { grid-column: 1; }
          .svc-card-right { grid-column: 1; }
          .svc-hero { height: clamp(280px, 60vw, 360px); }
        }
        @media (max-width: 600px) {
          .svc-word--outline { margin-left: clamp(1rem, 8vw, 4rem); }
          .svc-label--tr { position: static; justify-content: flex-end; margin-bottom: 0.75rem; }
          .svc-label--bl { position: static; margin-top: 0.85rem; }
          .svc-card-right { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </section>
  )
}
