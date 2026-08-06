import { motion, useMotionValue, useSpring } from "framer-motion";
import React, { useRef, useEffect } from "react";
import {
  useScrollAnimation,
  fadeUp,
  staggerContainer,
} from "../../../hooks/useScrollAnimation";

const PHOTO =
  "/images/Servicios/creacion-desarrollo-marca/Foto para las del iman 2.webp";

const DEFAULT_INTRO = "";
const DEFAULT_ADDITIONAL_TEXT = "";

const BULLETS = [];

// Componente GreenDot con el mismo efecto que FloatingIconsHero
const GreenDot = ({ mouseX, mouseY, size, position, index }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  useEffect(() => {
    const handleMouseMove = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const distance = Math.sqrt(
          Math.pow(mouseX.current - (rect.left + rect.width / 2), 2) +
            Math.pow(mouseY.current - (rect.top + rect.height / 2), 2),
        );
        if (distance < 150) {
          const angle = Math.atan2(
            mouseY.current - (rect.top + rect.height / 2),
            mouseX.current - (rect.left + rect.width / 2),
          );
          const force = (1 - distance / 150) * 50;
          x.set(-Math.cos(angle) * force);
          y.set(-Math.sin(angle) * force);
        } else {
          x.set(0);
          y.set(0);
        }
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y, mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      style={{
        x: springX,
        y: springY,
        position: "absolute",
        width: size,
        height: size,
        ...position,
        zIndex: 10,
        cursor: "pointer",
        borderRadius: "50%",
        background: "#1C4964",
        boxShadow: "0 0 30px rgba(28, 73, 100, 0.4)",
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
      className="green-dot"
    />
  );
};

export default function ConsistentBrand({
  tagline,
  introText,
  additionalText,
}) {
  const { ref, controls } = useScrollAnimation(0.15);
  const intro = introText || DEFAULT_INTRO;
  const addText = additionalText || DEFAULT_ADDITIONAL_TEXT;
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  const handleMouseMove = (event) => {
    mouseX.current = event.clientX;
    mouseY.current = event.clientY;
  };

  // Configuración de las bolas verdes - superpuestas a la imagen
  const greenDots = [
    {
      size: "clamp(75px, 8vw, 105px)",
      position: { top: "2%", right: "2%" },
      index: 0,
    },
    {
      size: "clamp(50px, 6vw, 75px)",
      position: { bottom: "2%", left: "2%" },
      index: 1,
    },
    {
      size: "clamp(35px, 4.5vw, 55px)",
      position: { top: "24%", left: "2%" },
      index: 2,
    },
  ];

  // Variantes para el texto con efecto de aparición escalonada
  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      rotateX: 20,
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.1 + 0.3,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  // Dividir el texto en palabras
  const words = "Una marca coherente genera mejores resultados.".split(" ");

  return (
    <section
      className="mt-[clamp(-328px,-58vw,-248px)] min-[1280px]:mt-0"
      style={{
        position: "relative",
        paddingBlock: "clamp(3rem, 7vw, 6.5rem)",
        background: "#000000",
      }}
      onMouseMove={handleMouseMove}
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
          variants={staggerContainer(0.12)}
          className="dd-grid"
        >
          {/* Texto - Izquierda con efecto de palabras escalonadas */}
          <motion.div variants={fadeUp}>
            <div className="dd-intro">
              <div className="dd-words-container">
                {words.map((word, i) => (
                  <motion.span
                    key={i}
                    className="dd-word"
                    custom={i}
                    variants={wordVariants}
                    initial="hidden"
                    animate={controls}
                  >
                    {word}
                  </motion.span>
                ))}
              </div>

              {intro && (
                <p className="dd-body" style={{ color: "var(--c-ink)" }}>
                  {intro}
                </p>
              )}
              {BULLETS.length > 0 && (
                <ul className="dd-bullets">
                  {BULLETS.map((bullet, index) => (
                    <li key={index} className="dd-bullet-item">
                      <span className="dd-bullet-dot" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
              {addText && (
                <p
                  className="dd-additional-text"
                  style={{ color: "var(--c-ink)" }}
                >
                  {addText}
                </p>
              )}
            </div>
          </motion.div>

          {/* Imagen - Derecha */}
          <motion.div
            variants={fadeUp}
            className="dd-photo-card"
            style={{ alignSelf: "center", position: "relative" }}
          >
            {/* Contenedor de la imagen con las bolas */}
            <div className="dd-image-wrapper">
              <img
                src={PHOTO}
                alt="Creación y Desarrollo de Marca"
                style={{
                  width: "100%",
                  height: "100%",
                  minHeight: "420px",
                  maxHeight: "520px",
                  objectFit: "contain",
                  display: "block",
                  borderRadius: "1.25rem",
                }}
              />

              {/* Bolas verdes alrededor de la imagen */}
              {greenDots.map((dot, index) => (
                <GreenDot
                  key={index}
                  mouseX={mouseX}
                  mouseY={mouseY}
                  size={dot.size}
                  position={dot.position}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .dd-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2.5rem, 6vw, 4.5rem);
          align-items: center;
          margin-bottom: clamp(2.5rem, 6vw, 4rem);
        }
        .dd-photo-card {
          border-radius: 1.25rem;
          overflow: visible;
          border: none;
          box-shadow: none;
          min-height: 420px;
          max-height: 520px;
          position: relative;
          padding: 0;
          background: transparent !important;
          align-self: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .dd-image-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 420px;
          max-height: 520px;
          border-radius: 1.25rem;
          overflow: visible;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .dd-image-wrapper img {
          border-radius: 1.25rem;
          min-height: 420px;
          max-height: 520px;
          object-fit: contain;
          width: 100%;
          height: auto;
        }

        /* Estilo de las bolas verdes - ahora color #1C4964 */
        .green-dot {
          border: 2px solid rgba(255, 255, 255, 0.15);
          transition: box-shadow 0.3s ease;
        }
        
        /* Efecto de pulso sutil con el nuevo color */
        .green-dot::after {
          content: '';
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 1px solid rgba(28, 73, 100, 0.2);
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        .dd-intro {
          text-align: center;
          max-width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
        }

        /* Contenedor de palabras - efecto de aparición escalonada */
        .dd-words-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 0.3rem 0.6rem;
          min-height: 100px;
          padding: 1rem 0;
        }

        .dd-word {
          font-family: var(--font-display);
          font-weight: 700;
          font-style: italic;
          font-size: clamp(2.75rem, 5vw, 4.5rem);
          color: #ffffff;
          line-height: 1.15;
          letter-spacing: -0.02em;
          display: inline-block;
          transform-origin: center bottom;
          backface-visibility: hidden;
        }

        .dd-body {
          font-family: var(--font-body);
          font-style: italic;
          font-size: clamp(1.15rem, 1.5vw, 1.35rem);
          color: #ffffff;
          opacity: 0.9;
          line-height: 1.7;
          max-width: 100%;
          margin: 0 0 0.75rem 0;
          text-align: center;
        }
        .dd-bullets {
          list-style: none;
          padding: 0;
          margin: 0 0 0.75rem 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.1rem 1.5rem;
        }
        .dd-bullet-item {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          font-family: var(--font-body);
          font-size: clamp(1.05rem, 1.3vw, 1.2rem);
          color: #ffffff;
          opacity: 0.85;
          line-height: 1.6;
          margin-bottom: 0.25rem;
          text-align: center;
        }
        .dd-bullet-dot {
          display: inline-block;
          width: 10px;
          height: 10px;
          min-width: 10px;
          border-radius: 50%;
          background: var(--c-lime);
          margin-top: 0.45rem;
          flex-shrink: 0;
        }
        .dd-additional-text {
          font-family: var(--font-body);
          font-size: clamp(1.1rem, 1.4vw, 1.25rem);
          color: #ffffff;
          opacity: 0.9;
          line-height: 1.7;
          max-width: 100%;
          margin: 0;
          text-align: center;
        }

        @media (max-width: 880px) {
          .dd-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
            margin-top: 2rem;
          }
          .dd-photo-card {
            min-height: 320px;
            max-height: 400px;
            align-self: center;
          }
          .dd-image-wrapper {
            min-height: 320px;
            max-height: 400px;
          }
          .dd-image-wrapper img {
            min-height: 320px;
            max-height: 400px;
          }
          .dd-intro {
            text-align: center;
          }
          .dd-word {
            font-size: clamp(2.5rem, 6vw, 3.8rem);
          }
          .dd-body {
            text-align: center;
            margin: 0 auto 0.75rem;
            color: #ffffff;
          }
          .dd-bullets {
            grid-template-columns: 1fr 1fr;
            justify-items: center;
          }
          .dd-bullet-item {
            text-align: center;
            justify-content: center;
            color: #ffffff;
          }
          .dd-bullet-dot {
            margin-top: 0.4rem;
          }
          .dd-additional-text {
            text-align: center;
            color: #ffffff;
          }
          
          /* Ajuste de posición y tamaño de bolas en mobile */
          .green-dot {
            width: clamp(60px, 7vw, 80px) !important;
            height: clamp(60px, 7vw, 80px) !important;
            top: 2% !important;
            right: 2% !important;
          }
          .green-dot:nth-child(2) {
            width: clamp(42px, 5vw, 55px) !important;
            height: clamp(42px, 5vw, 55px) !important;
            bottom: 2% !important;
            left: 2% !important;
          }
          .green-dot:nth-child(3) {
            width: clamp(28px, 3.5vw, 40px) !important;
            height: clamp(28px, 3.5vw, 40px) !important;
            top: 24% !important;
            left: 2% !important;
          }
        }

        @media (max-width: 520px) {
          .dd-grid {
            margin-top: 8rem;
          }
          .dd-photo-card {
            min-height: 240px;
            max-height: 300px;
          }
          .dd-image-wrapper {
            min-height: 240px;
            max-height: 300px;
          }
          .dd-image-wrapper img {
            min-height: 240px;
            max-height: 300px;
          }
          .dd-word {
            font-size: clamp(2.2rem, 6vw, 2.8rem);
          }
          .dd-bullets {
            grid-template-columns: 1fr;
          }
          .dd-bullet-dot {
            width: 8px;
            height: 8px;
            min-width: 8px;
            margin-top: 0.5rem;
          }
          .green-dot {
            width: clamp(50px, 8vw, 60px) !important;
            height: clamp(50px, 8vw, 60px) !important;
          }
          .green-dot:nth-child(2) {
            width: clamp(35px, 5.5vw, 42px) !important;
            height: clamp(35px, 5.5vw, 42px) !important;
          }
          .green-dot:nth-child(3) {
            width: clamp(24px, 4vw, 30px) !important;
            height: clamp(24px, 4vw, 30px) !important;
          }
        }
      `}</style>
    </section>
  );
}
