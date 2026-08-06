import * as m from "motion/react-m";
import {
  useScrollAnimation,
  fadeUp,
  staggerContainer,
} from "../../../hooks/useScrollAnimation";
import {
  GalleryGrid,
  GalleryGridCell,
} from "../../blocks/cta-section-with-gallery";
const PHOTOS = [
  "/images/Servicios/creacion-desarrollo-marca/Fotos de la primera parte 1.webp",
  "/images/Servicios/creacion-desarrollo-marca/Fotos de la primera parte 2.webp",
  "/images/Servicios/creacion-desarrollo-marca/Fotos de la primera parte 3.webp",
  "/images/Servicios/creacion-desarrollo-marca/Fotos de la primera parte 4.webp",
];

const DEFAULT_TAGLINE =
  "Construimos marcas que conectan, diferencian y generan confianza.";
const DEFAULT_INTRO =
  "Una marca va mucho más allá de un logotipo. Es la manera en que una empresa se presenta al mundo, comunica su esencia y construye relaciones duraderas con sus clientes.";
const DEFAULT_ADDITIONAL_TEXT =
  "En Kubbox desarrollamos identidades de marca sólidas, coherentes y estratégicas, diseñadas para transmitir credibilidad, fortalecer el posicionamiento de las empresas y generar una experiencia consistente en todos los canales de comunicación. Nuestro proceso combina investigación, creatividad y estrategia para crear marcas que evolucionan junto con los objetivos del negocio.";

export default function DigitalServicesSection({
  tagline,
  introText,
  additionalText,
}) {
  const { ref, controls } = useScrollAnimation(0.15);
  const tLine = tagline || DEFAULT_TAGLINE;
  const intro = introText || DEFAULT_INTRO;
  const addText = additionalText || DEFAULT_ADDITIONAL_TEXT;

  return (
    <section
      className="mt-[clamp(-328px,-58vw,-248px)] min-[1280px]:mt-0"
      style={{ position: "relative", paddingBlock: "clamp(3rem, 7vw, 6.5rem)" }}
    >
      <div
        style={{
          maxWidth: "1400px",
          marginInline: "auto",
          paddingInline: "var(--container-pad)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <m.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={staggerContainer(0.12)}
          className="dd-grid"
        >
          <m.div
            variants={fadeUp}
            className="dd-photo-card"
            style={{ alignSelf: "center" }}
          >
            <GalleryGrid>
              {PHOTOS.map((imageUrl, index) => (
                <GalleryGridCell index={index} key={index}>
                  <img
                    className="size-full object-cover object-center"
                    width="100%"
                    height="100%"
                    src={imageUrl}
                    alt=""
                  />
                </GalleryGridCell>
              ))}
            </GalleryGrid>
          </m.div>

          <m.div variants={fadeUp}>
            <div
              style={{
                backgroundColor: "rgba(17, 28, 34, 0.85)",
                borderRadius: "1.5rem",
                padding: "clamp(1rem, 1.5vw, 1.8rem)",
                marginBottom: "clamp(2rem, 4.5vw, 3rem)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
              }}
            >
              <div className="dd-intro">
                <p className="dd-tagline">{tLine}</p>
                <span className="dd-intro-line" />
                <p className="dd-body" style={{ color: "var(--c-lime)" }}>
                  {intro}
                </p>
                <p
                  className="dd-additional-text"
                  style={{ color: "var(--c-ink)" }}
                >
                  {addText}
                </p>
              </div>
            </div>

            <div className="dd-brand-section">
              <h3 className="dd-brand-title">Imagen Corporativa</h3>
              <div className="dd-brand-text-wrapper">
                <p className="dd-brand-text">
                  Diseñamos identidades visuales que reflejan la personalidad,
                  los valores y el propósito de cada empresa.
                </p>
                <p className="dd-brand-text">
                  Desarrollamos todos los elementos necesarios para garantizar
                  una comunicación visual consistente y profesional, incluyendo:
                </p>
              </div>
            </div>
          </m.div>
        </m.div>
      </div>

      <style>{`
        .dd-grid {
          display: grid;
          grid-template-columns: 0.7fr 1.1fr;
          gap: clamp(2.5rem, 6vw, 4.5rem);
          align-items: start;
          margin-bottom: clamp(2.5rem, 6vw, 4rem);
        }
        .dd-photo-card {
          border-radius: 1.25rem;
          overflow: hidden;
          border: none;
          box-shadow: none;
          min-height: 550px;
          position: relative;
          padding: 0;
          background: transparent !important;
          align-self: center;
        }
        .dd-photo-card .grid {
          gap: 0.75rem;
        }
        .dd-photo-card .grid > div {
          border: none !important;
          background: transparent !important;
          box-shadow: none !important;
          border-radius: 1rem;
        }
        .dd-photo-card .grid > div img {
          border-radius: 1rem;
        }

        .dd-intro {
          text-align: left;
          max-width: 100%;
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
          text-align: left;
        }
        .dd-intro-line {
          display: block;
          width: clamp(70px, 11vw, 110px);
          height: 1.5px;
          background: linear-gradient(to right, transparent, var(--c-lime), transparent);
          margin: 0 0 1.1rem 0;
        }
        .dd-body {
          font-family: var(--font-body);
          font-style: italic;
          font-size: clamp(1rem, 1.3vw, 1.15rem);
          color: var(--c-lime);
          opacity: 0.9;
          line-height: 1.7;
          max-width: 100%;
          margin: 0 0 0.75rem 0;
          text-align: left;
        }
        .dd-additional-text {
          font-family: var(--font-body);
          font-size: clamp(0.95rem, 1.2vw, 1.1rem);
          color: var(--c-ink);
          opacity: 0.9;
          line-height: 1.7;
          max-width: 100%;
          margin: 0;
          text-align: left;
        }
        
        .dd-brand-section {
          margin-bottom: clamp(1.5rem, 3vw, 2rem);
          width: 100%;
        }
        .dd-brand-title {
          font-family: var(--font-display);
          font-weight: 800;
          font-style: italic;
          font-size: clamp(1.2rem, 2vw, 1.6rem);
          text-transform: uppercase;
          color: var(--c-lime);
          margin: 0 0 0.75rem 0;
          text-align: center;
        }
        .dd-brand-text-wrapper {
          width: 100%;
          margin: 0;
        }
        .dd-brand-text {
          font-family: var(--font-body);
          font-size: clamp(0.95rem, 1.2vw, 1.1rem);
          color: var(--c-ink);
          opacity: 0.9;
          line-height: 1.7;
          margin: 0 0 0.5rem 0;
          text-align: left;
        }

        @media (max-width: 880px) {
          section {
            margin-top: -4rem !important;
          }
          .dd-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .dd-photo-card {
            min-height: 400px;
            max-height: 600px;
            align-self: center;
            margin-bottom: 0;
          }
          .dd-intro {
            text-align: center;
          }
          .dd-tagline {
            text-align: center;
          }
          .dd-intro-line {
            margin: 0 auto 1.1rem;
          }
          .dd-body {
            text-align: center;
            margin: 0 auto 0.75rem;
          }
          .dd-additional-text {
            text-align: center;
          }
        }

        @media (max-width: 520px) {
          section {
            margin-top: -2rem !important;
          }
          .dd-photo-card {
            min-height: 400px;
            max-height: 500px;
            margin-bottom: 6rem;
          }
        }
      `}</style>
    </section>
  );
}
