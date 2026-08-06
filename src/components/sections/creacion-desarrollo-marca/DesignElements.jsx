import * as m from "motion/react-m";
import {
  useScrollAnimation,
  fadeUp,
  staggerContainer,
} from "../../../hooks/useScrollAnimation";

const LOGOS = [
  {
    id: 1,
    src: "/images/Servicios/creacion-desarrollo-marca/Diseño logotipo icono.svg",
    text: "Diseño de logotipo y manual de marca.",
  },
  {
    id: 2,
    src: "/images/Servicios/creacion-desarrollo-marca/paleta de colores icono.svg",
    text: "Paleta de colores y sistema de identidad visual.",
  },
  {
    id: 3,
    src: "/images/Servicios/creacion-desarrollo-marca/Tipografía corporativa icono.svg",
    text: "Tipografías corporativas.",
  },
  {
    id: 4,
    src: "/images/Servicios/creacion-desarrollo-marca/lineamientos icono.svg",
    text: "Lineamientos para el uso correcto de la marca.",
  },
  {
    id: 5,
    src: "/images/Servicios/creacion-desarrollo-marca/aplicaciones gráficas iconos.svg",
    text: "Aplicaciones gráficas para medios impresos y digitales.",
  },
];

// Variants para animación escalonada de cada item
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export default function DesignElements() {
  const { ref, controls } = useScrollAnimation(0.15);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        paddingBlock: "clamp(0.25rem, 0.5vw, 0.5rem)",
        marginTop: "-10rem",
      }}
      className="design-elements-section"
    >
      <div
        style={{
          maxWidth: "1400px",
          marginInline: "auto",
          paddingInline: "clamp(1rem, 4vw, 2rem)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <m.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={staggerContainer(0.08)}
          className="design-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "0",
            borderRadius: "clamp(1rem, 1.5vw, 1.5rem)",
            overflow: "hidden",
          }}
        >
          {LOGOS.map((item, index) => (
            <m.div
              key={item.id}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
              }}
              className="design-item"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding:
                  "clamp(1.5rem, 2.5vw, 3.5rem) clamp(0.8rem, 1.5vw, 2rem)",
                textAlign: "center",
                position: "relative",
                minHeight: "clamp(200px, 25vw, 240px)",
                cursor: "default",
                transition: "background 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(163, 230, 53, 0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              {/* Línea vertical separadora - desktop */}
              {index < LOGOS.length - 1 && (
                <div
                  className="linea-separadora"
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "15%",
                    height: "70%",
                    width: "2px",
                    background: "rgba(255, 255, 255, 0.2)",
                    borderRadius: "2px",
                  }}
                />
              )}

              {/* Contenedor del icono */}
              <m.div
                style={{
                  width: "clamp(55px, 7vw, 100px)",
                  height: "clamp(55px, 7vw, 100px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "clamp(0.75rem, 1.2vw, 1.25rem)",
                  flexShrink: 0,
                }}
                whileHover={{
                  scale: 1.15,
                  rotate: 5,
                  transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                }}
              >
                <img
                  src={item.src}
                  alt={item.text}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    filter: "brightness(0) invert(1)",
                    transition: "filter 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter =
                      "brightness(0) invert(1) drop-shadow(0 0 12px rgba(163, 230, 53, 0.4))";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = "brightness(0) invert(1)";
                  }}
                />
              </m.div>

              {/* Contenedor del texto */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "clamp(50px, 6vh, 80px)",
                  width: "100%",
                }}
              >
                <m.p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "clamp(0.7rem, 1vw, 1.05rem)",
                    color: "rgba(255, 255, 255, 0.85)",
                    lineHeight: 1.4,
                    maxWidth: "clamp(20ch, 25ch, 28ch)",
                    margin: 0,
                    transition: "color 0.3s ease",
                  }}
                  whileHover={{
                    color: "#a3e635",
                    transition: { duration: 0.3 },
                  }}
                >
                  {item.text}
                </m.p>
              </div>
            </m.div>
          ))}
        </m.div>
      </div>

      <style>{`
        /* Desktop - 5 columnas */
        .design-grid {
          grid-template-columns: repeat(5, 1fr) !important;
        }

        /* Tablet - 3 columnas */
        @media (max-width: 1024px) {
          .design-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            border-radius: 1rem !important;
          }
          .design-grid .design-item:nth-child(3) .linea-separadora {
            display: none !important;
          }
          .design-grid .design-item:nth-child(4) {
            border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
          }
          .design-grid .design-item:nth-child(5) {
            border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
          }
        }

        /* Móvil - 2 columnas con espacio y texto más grande */
        @media (max-width: 768px) {
          .design-elements-section {
            margin-top: -4rem !important;
            padding-block: clamp(0.5rem, 1vw, 1rem) !important;
          }
          
          .design-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            border-radius: 0.75rem !important;
          }
          .design-grid .design-item .linea-separadora {
            display: none !important;
          }
          .design-grid .design-item:nth-child(2) {
            border-right: none !important;
          }
          .design-grid .design-item:nth-child(4) {
            border-right: none !important;
          }
          .design-grid .design-item:nth-child(3) {
            border-top: 1px solid rgba(255, 255, 255, 0.06) !important;
          }
          .design-grid .design-item:nth-child(4) {
            border-top: 1px solid rgba(255, 255, 255, 0.06) !important;
          }
          .design-grid .design-item:nth-child(5) {
            border-top: 1px solid rgba(255, 255, 255, 0.06) !important;
            grid-column: span 2 !important;
          }
          .design-grid .design-item {
            min-height: 190px !important;
            padding: 1.5rem 1rem !important;
          }
          .design-grid .design-item p {
            font-size: clamp(0.8rem, 2.5vw, 0.95rem) !important;
          }
        }

        /* Móvil pequeño - 2 columnas más compacto */
        @media (max-width: 400px) {
          .design-elements-section {
            margin-top: -3rem !important;
          }
          .design-grid .design-item {
            min-height: 160px !important;
            padding: 1rem 0.5rem !important;
          }
          .design-grid .design-item img {
            width: 40px !important;
            height: 40px !important;
          }
          .design-grid .design-item p {
            font-size: clamp(0.7rem, 2vw, 0.8rem) !important;
          }
        }
      `}</style>
    </section>
  );
}
