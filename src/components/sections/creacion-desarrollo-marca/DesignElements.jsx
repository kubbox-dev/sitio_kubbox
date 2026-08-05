import { motion } from "framer-motion";
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
      delay: i * 0.1,
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
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={staggerContainer(0.1)}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "0",
            borderRadius: "1.5rem",
            overflow: "hidden",
          }}
        >
          {LOGOS.map((item, index) => (
            <motion.div
              key={item.id}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "clamp(2rem, 3vw, 3.5rem) clamp(1rem, 2vw, 2rem)",
                textAlign: "center",
                position: "relative",
                minHeight: "240px",
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
              {/* Línea vertical separadora */}
              {index < LOGOS.length - 1 && (
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "15%",
                    height: "70%",
                    width: "3px",
                    background: "rgba(255, 255, 255, 0.25)",
                    borderRadius: "2px",
                  }}
                />
              )}

              {/* Contenedor del icono con tamaño fijo */}
              <motion.div
                style={{
                  width: "clamp(70px, 8vw, 100px)",
                  height: "clamp(70px, 8vw, 100px)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.25rem",
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
              </motion.div>

              {/* Contenedor del texto con altura fija para alineación */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "clamp(60px, 8vh, 80px)",
                  width: "100%",
                }}
              >
                <motion.p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "clamp(0.85rem, 1.1vw, 1.05rem)",
                    color: "rgba(255, 255, 255, 0.85)",
                    lineHeight: 1.5,
                    maxWidth: "28ch",
                    margin: 0,
                    transition: "color 0.3s ease",
                  }}
                  whileHover={{
                    color: "#a3e635",
                    transition: { duration: 0.3 },
                  }}
                >
                  {item.text}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .design-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .design-grid > div:nth-child(2) .linea-separadora {
            display: none !important;
          }
          .design-grid > div:nth-child(4) .linea-separadora {
            display: none !important;
          }
        }

        @media (max-width: 480px) {
          .design-grid {
            grid-template-columns: 1fr !important;
          }
          .design-grid > div .linea-separadora {
            display: none !important;
          }
          .design-grid > div {
            border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
          }
          .design-grid > div:last-child {
            border-bottom: none !important;
          }
        }
      `}</style>
    </section>
  );
}
