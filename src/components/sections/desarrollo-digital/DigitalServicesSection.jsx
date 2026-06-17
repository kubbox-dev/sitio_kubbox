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
    <section style={{ position: 'relative', paddingBlock: 'clamp(2.5rem, 6vw, 5rem)' }}>
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

        <motion.p
          className="dd-closing"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          En Kubbox combinamos diseño, código y estrategia para construir productos digitales que no solo se
          vean bien, sino que conviertan. Cada proyecto pasa por un proceso de validación constante —
          prototipos, pruebas con usuarios reales y mejora continua— hasta lograr una experiencia que
          realmente funcione para tu negocio.
        </motion.p>
      </div>

      <style>{`
        .dd-grid {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: clamp(2rem, 5vw, 3.5rem);
          align-items: start;
          margin-bottom: clamp(2rem, 5vw, 3.5rem);
        }

        .dd-photo-card {
          border-radius: 1.25rem;
          overflow: hidden;
          border: 1px solid oklch(0.26 0.022 260);
          box-shadow: 0 30px 80px -30px oklch(0.03 0.02 260 / 0.85);
        }
        .dd-photo-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .dd-intro {
          text-align: center;
          margin-bottom: clamp(1.75rem, 4vw, 2.5rem);
        }
        .dd-tagline {
          font-family: var(--font-display);
          font-weight: 800;
          font-style: italic;
          font-size: clamp(1.15rem, 2.2vw, 1.4rem);
          text-transform: uppercase;
          letter-spacing: -0.01em;
          color: var(--c-lime);
          line-height: 1.25;
          margin: 0 0 1rem;
        }
        .dd-intro-line {
          display: block;
          width: clamp(60px, 10vw, 100px);
          height: 1.5px;
          background: linear-gradient(to right, transparent, var(--c-lime), transparent);
          margin: 0 auto 1rem;
        }
        .dd-body {
          font-family: var(--font-body);
          font-style: italic;
          font-size: clamp(0.92rem, 1.1vw, 1.02rem);
          color: var(--c-ink);
          opacity: 0.9;
          line-height: 1.7;
          max-width: 52ch;
          margin: 0 auto;
        }

        .dd-icon-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        .dd-icon-card {
          background: var(--c-surface);
          border: 1px solid oklch(0.26 0.022 260);
          border-radius: 1rem;
          padding: clamp(1.25rem, 2vw, 1.5rem) 1.1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 0.75rem;
          transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
        }
        .dd-icon-card:hover {
          border-color: var(--c-lime);
          transform: translateY(-3px);
          box-shadow: 0 12px 32px -12px oklch(0.88 0.26 130 / 0.25);
        }
        .dd-icon-card img {
          width: 34px;
          height: 34px;
          object-fit: contain;
        }
        .dd-icon-card span {
          font-family: var(--font-display);
          font-weight: 800;
          font-style: italic;
          text-transform: uppercase;
          font-size: 0.86rem;
          letter-spacing: -0.005em;
          color: var(--c-lime);
          line-height: 1.3;
        }

        .dd-closing {
          font-family: var(--font-body);
          font-style: italic;
          font-size: clamp(0.9rem, 1.1vw, 1rem);
          color: var(--c-muted);
          line-height: 1.75;
          text-align: center;
          max-width: 70ch;
          margin-inline: auto;
          text-wrap: pretty;
        }

        @media (max-width: 880px) {
          .dd-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .dd-photo-card {
            max-height: 360px;
          }
        }

        @media (max-width: 520px) {
          .dd-icon-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  )
}
