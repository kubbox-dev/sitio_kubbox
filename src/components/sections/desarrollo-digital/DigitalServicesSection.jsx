import { motion } from 'framer-motion'
import { useScrollAnimation, fadeUp, staggerContainer } from '../../../hooks/useScrollAnimation'

const ICON = (name) => encodeURI(`/images/DESARROLLO DIGITAL/WEB/Iconos/${name}.svg`)
const PHOTO = '/images/DESARROLLO DIGITAL/WEB/Fotos/Foto para slide.png'

const CARDS = [
  { icon: ICON('www'),       label: 'Sitios web corporativos y de marca' },
  { icon: ICON('celular'),   label: 'Plataformas a medida y web apps' },
  { icon: ICON('ecomerce'),  label: 'Ecomerce' },
  { icon: ICON('premio'),    label: 'Sistemas de registro, concursos y activaciones' },
]

export default function DigitalServicesSection() {
  const { ref, controls } = useScrollAnimation(0.15)

  return (
    <section style={{ position: 'relative' }}>
      <div
        style={{
          maxWidth: 'var(--container)',
          marginInline: 'auto',
          paddingInline: 'var(--container-pad)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={staggerContainer(0.12)}
          className="dd-grid"
        >
          {/* Columna izquierda: foto */}
          <motion.div variants={fadeUp} className="dd-photo-card">
            <img src={PHOTO} alt="Equipo de Kubbox desarrollando un proyecto digital" />
          </motion.div>

          {/* Columna derecha: intro + grid de iconos */}
          <motion.div variants={fadeUp}>
            <div className="dd-intro">
              <p className="dd-tagline">Diseñamos experiencias digitales que conectan marcas con personas.</p>
              <span className="dd-intro-line" />
              <p className="dd-body">
                Creamos y gestionamos productos digitales centrados en el usuario: sitios web, e-commerce,
                plataformas interactivas, web apps y sistemas personalizados con enfoque en diseño,
                performance y analítica.
              </p>
            </div>

            <div className="dd-icon-grid">
              {CARDS.map((card) => (
                <div key={card.label} className="dd-icon-card">
                  <img src={card.icon} alt="" aria-hidden="true" />
                  <span>{card.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="dd-statement"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="dd-corner dd-corner--tl" aria-hidden="true" />
          <span className="dd-corner dd-corner--br" aria-hidden="true" />

          <p className="dd-statement-text">
            En Kubbox combinamos diseño, código y estrategia para construir{' '}
            <span className="dd-statement-highlight">productos digitales que conviertan</span>.
            Cada proyecto pasa por un proceso de validación constante — prototipos, pruebas con usuarios
            reales y mejora continua — hasta lograr una experiencia que realmente funcione para tu negocio.
          </p>
        </motion.div>
      </div>

      <style>{`
        .dd-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: clamp(2.5rem, 6vw, 4.5rem);
          align-items: start;
          margin-bottom: clamp(2.5rem, 6vw, 4rem);
        }

        .dd-photo-card {
          border-radius: 1.25rem;
          overflow: hidden;
          border: 1px solid oklch(0.26 0.022 260);
          box-shadow: 0 30px 80px -30px oklch(0.03 0.02 260 / 0.85);
          min-height: 360px;
        }
        .dd-photo-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .dd-intro {
          text-align: center;
          margin-bottom: clamp(2rem, 4.5vw, 3rem);
        }
        .dd-tagline {
          font-family: var(--font-display);
          font-weight: 800;
          font-style: italic;
          font-size: clamp(1.4rem, 2.8vw, 1.85rem);
          text-transform: uppercase;
          letter-spacing: -0.01em;
          color: var(--c-lime);
          line-height: 1.22;
          margin: 0 0 1.1rem;
        }
        .dd-intro-line {
          display: block;
          width: clamp(70px, 11vw, 110px);
          height: 1.5px;
          background: linear-gradient(to right, transparent, var(--c-lime), transparent);
          margin: 0 auto 1.1rem;
        }
        .dd-body {
          font-family: var(--font-body);
          font-style: italic;
          font-size: clamp(1rem, 1.3vw, 1.15rem);
          color: var(--c-ink);
          opacity: 0.9;
          line-height: 1.7;
          max-width: 54ch;
          margin: 0 auto;
        }

        .dd-icon-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
        }
        .dd-icon-card {
          background: var(--c-surface);
          border: 1px solid oklch(0.26 0.022 260);
          border-radius: 1.1rem;
          padding: clamp(1.6rem, 2.6vw, 2.1rem) 1.4rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 1rem;
          transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
        }
        .dd-icon-card:hover {
          border-color: var(--c-lime);
          transform: translateY(-3px);
          box-shadow: 0 14px 36px -14px oklch(0.88 0.26 130 / 0.28);
        }
        .dd-icon-card img {
          width: 46px;
          height: 46px;
          object-fit: contain;
        }
        .dd-icon-card span {
          font-family: var(--font-display);
          font-weight: 800;
          font-style: italic;
          text-transform: uppercase;
          font-size: 0.98rem;
          letter-spacing: -0.005em;
          color: var(--c-lime);
          line-height: 1.32;
        }

        .dd-statement {
          position: relative;
          background: oklch(0.13 0.020 260 / 0.85);
          border: 1px solid oklch(0.26 0.022 260);
          border-radius: 1.5rem;
          backdrop-filter: blur(14px);
          box-shadow: 0 40px 110px -40px oklch(0.03 0.02 260 / 0.9);
          padding: clamp(2.5rem, 6vw, 4rem);
          overflow: hidden;
        }
        .dd-statement::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(to right, transparent 5%, var(--c-lime) 40%, var(--c-lime) 60%, transparent 95%);
          opacity: 0.6;
        }
        .dd-corner {
          position: absolute;
          width: 18px;
          height: 18px;
          border: 1.5px solid oklch(0.88 0.26 130 / 0.4);
          pointer-events: none;
          z-index: 2;
        }
        .dd-corner--tl { top: 16px; left: 16px; border-right: 0; border-bottom: 0; }
        .dd-corner--br { bottom: 16px; right: 16px; border-left: 0; border-top: 0; }
        .dd-statement-text {
          position: relative;
          z-index: 1;
          font-family: var(--font-body);
          font-style: italic;
          font-size: clamp(1.15rem, 2.1vw, 1.5rem);
          line-height: 1.62;
          color: var(--c-ink);
          opacity: 0.95;
          max-width: 66ch;
          margin: 0 auto;
          text-align: center;
          text-wrap: pretty;
        }
        .dd-statement-highlight {
          color: var(--c-lime);
          font-style: normal;
          font-weight: 600;
        }

        @media (max-width: 880px) {
          .dd-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .dd-photo-card {
            max-height: 360px;
            min-height: 0;
          }
        }

        @media (max-width: 520px) {
          .dd-icon-grid {
            grid-template-columns: 1fr;
          }
          .dd-statement {
            padding: clamp(2rem, 8vw, 2.5rem);
          }
        }
      `}</style>
    </section>
  )
}
