import { motion } from "framer-motion";
import {
  useScrollAnimation,
  fadeUp,
  staggerContainer,
} from "../../../hooks/useScrollAnimation";

const PHOTO = "/images/DESARROLLO DIGITAL/WEB/Fotos/Foto para slide.png";

const DEFAULT_TAGLINE =
  "Ayudamos a que las empresas aparezcan cuando sus clientes buscan sus productos o servicios en Google.";
const DEFAULT_INTRO =
  "Nuestro servicio de SEO combina estrategia, contenido, optimización técnica y análisis permanente para mejorar el posicionamiento orgánico y aumentar el tráfico de calidad.";
const DEFAULT_STATEMENT =
  "El objetivo es aumentar la visibilidad de la empresa y generar oportunidades comerciales de forma sostenida.";

const DEFAULT_BULLETS = [
  {
    icon: encodeURI(
      "/images/Servicios/posicionamiento-SEO/Optimización de velocidad.svg",
    ),
    label: "Optimización de velocidad",
  },
  {
    icon: encodeURI("/images/Servicios/posicionamiento-SEO/Auditoria seo.svg"),
    label: "Auditoría SEO",
  },
  {
    icon: encodeURI(
      "/images/Servicios/posicionamiento-SEO/Estrategia de palabras clave.svg",
    ),
    label: "Estrategia de palabras clave",
  },
  {
    icon: encodeURI(
      "/images/Servicios/posicionamiento-SEO/monitoreo de resultado.svg",
    ),
    label: "Monitoreo de resultados",
  },
];

// Solo los que NO están en los principales
const SUB_BULLETS = [
  "SEO técnico",
  "Optimización On Page",
  "Arquitectura web",
  "SEO local",
  "Creación de contenido optimizado",
];

export default function DigitalServicesSection({
  tagline,
  introText,
  bullets,
  statement,
}) {
  const { ref, controls } = useScrollAnimation(0.15);
  const cards = bullets || DEFAULT_BULLETS;
  const tLine = tagline || DEFAULT_TAGLINE;
  const intro = introText || DEFAULT_INTRO;
  const closing = statement || DEFAULT_STATEMENT;

  return (
    <section
      className="mt-[clamp(-328px,-58vw,-248px)] min-[1280px]:mt-0"
      style={{ position: "relative", paddingBlock: "clamp(3rem, 7vw, 6.5rem)" }}
    >
      <div
        style={{
          maxWidth: "var(--container)",
          marginInline: "auto",
          paddingInline: "var(--container-pad)",
          position: "relative",
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
          <motion.div variants={fadeUp} className="dd-photo-card">
            <img
              src={PHOTO}
              alt="Equipo de Kubbox desarrollando un proyecto digital"
            />
          </motion.div>

          <motion.div variants={fadeUp}>
            <div className="dd-intro">
              <p className="dd-tagline">{tLine}</p>
              <span className="dd-intro-line" />
              <p className="dd-body">{intro}</p>
            </div>

            <div className="dd-icon-grid">
              {cards.map((card) => (
                <div key={card.label} className="dd-icon-card">
                  <img src={card.icon} alt="" aria-hidden="true" />
                  <span>{card.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Sub-bullets section - servicios adicionales */}
        <motion.div
          className="dd-sub-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="dd-sub-header">
            <span className="dd-sub-line" />
            <span className="dd-sub-title">Servicios Adicionales</span>
            <span className="dd-sub-line" />
          </div>
          <ul className="dd-sub-grid">
            {SUB_BULLETS.map((item, idx) => (
              <li key={idx} className="dd-sub-item">
                <span className="dd-sub-dot" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
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
          <p className="dd-statement-text">{closing}</p>
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

        /* Sub-bullets section */
        .dd-sub-section {
          margin: clamp(2rem, 4vw, 3rem) 0;
          padding: clamp(1.5rem, 3vw, 2.5rem);
          background: oklch(0.13 0.020 260 / 0.5);
          border: 1px solid oklch(0.26 0.022 260);
          border-radius: 1rem;
          backdrop-filter: blur(8px);
        }
        .dd-sub-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }
        .dd-sub-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, transparent, oklch(0.88 0.26 130 / 0.3), transparent);
        }
        .dd-sub-title {
          font-family: var(--font-display);
          font-weight: 800;
          font-style: italic;
          font-size: clamp(0.9rem, 1.6vw, 1.2rem);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--c-lime);
          white-space: nowrap;
        }
        .dd-sub-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 0.5rem 1.5rem;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .dd-sub-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-family: var(--font-body);
          font-size: clamp(0.8rem, 1vw, 0.9rem);
          color: oklch(0.82 0.010 260);
          padding: 0.3rem 0;
        }
        .dd-sub-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--c-lime);
          flex-shrink: 0;
          box-shadow: 0 0 6px var(--c-lime);
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
          .dd-sub-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
