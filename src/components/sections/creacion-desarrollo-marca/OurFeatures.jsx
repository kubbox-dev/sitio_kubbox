import { motion, useMotionValue, useSpring } from "framer-motion";
import React, { useRef, useEffect } from "react";
import {
  useScrollAnimation,
  fadeUp,
  staggerContainer,
} from "../../../hooks/useScrollAnimation";

const PHOTO =
  "/images/Servicios/creacion-desarrollo-marca/Foto para las del iman 1.webp";

const SERVICES_LIST = [
  "Desarrollo de Personajes de Marca",
  "Brochures Corporativos",
  "Catálogos de Productos y Ventas",
  "Material publicitario en gran formato",
];

const DEFAULT_INTRO =
  "Diseñamos piezas de alto impacto visual para fortalecer la presencia de la marca en espacios físicos y eventos.";
const DEFAULT_ADDITIONAL_TEXT =
  "Cada diseño mantiene la coherencia gráfica de la identidad corporativa y está orientado a captar la atención del público.";

const BULLETS = [
  "Pendones.",
  "Banners.",
  "Vallas publicitarias.",
  "Backings.",
  "Avisos.",
  "Señalización corporativa.",
  "Stands para ferias y exhibiciones.",
  "Material POP.",
];

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
        background: "#90B20A",
        boxShadow: "0 0 30px rgba(144, 178, 10, 0.4)",
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
      className="green-dot"
    />
  );
};

export default function DigitalServicesSection({
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
      size: "clamp(65px, 7vw, 95px)",
      position: { top: "3%", right: "3%" },
      index: 0,
    },
    {
      size: "clamp(45px, 5.5vw, 70px)",
      position: { bottom: "3%", left: "3%" },
      index: 1,
    },
    {
      size: "clamp(30px, 4vw, 50px)",
      position: { top: "22%", left: "3%" },
      index: 2,
    },
  ];

  return (
    <section
      className="mt-[clamp(-328px,-58vw,-248px)] min-[1280px]:mt-0"
      style={{
        position: "relative",
        paddingBlock: "clamp(3rem, 7vw, 6.5rem)",
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
                  minHeight: "370px",
                  maxHeight: "470px",
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

          {/* TEXTO - FORZADO A LA IZQUIERDA */}
          <motion.div
            variants={fadeUp}
            style={{ textAlign: "left", width: "100%" }}
          >
            <div className="dd-intro">
              <div className="dd-services-list">
                {SERVICES_LIST.map((service, index) => (
                  <p key={index} className="dd-tagline">
                    {service}
                  </p>
                ))}
              </div>
              <span className="dd-intro-line" />
              <p className="dd-body">{intro}</p>
              <ul className="dd-bullets">
                {BULLETS.map((bullet, index) => (
                  <li key={index} className="dd-bullet-item">
                    <span className="dd-bullet-dot" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <p className="dd-additional-text">{addText}</p>
            </div>
          </motion.div>
        </motion.div>
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
          overflow: visible;
          border: none;
          box-shadow: none;
          min-height: 370px;
          max-height: 470px;
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
          min-height: 370px;
          max-height: 470px;
          border-radius: 1.25rem;
          overflow: visible;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .dd-image-wrapper img {
          border-radius: 1.25rem;
          min-height: 370px;
          max-height: 470px;
          object-fit: contain;
          width: 100%;
          height: auto;
        }

        /* Estilo de las bolas verdes */
        .green-dot {
          border: 2px solid rgba(255, 255, 255, 0.15);
          transition: box-shadow 0.3s ease;
        }

        /* Efecto de pulso sutil */
        .green-dot::after {
          content: '';
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 1px solid rgba(144, 178, 10, 0.2);
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
          max-width: 100%;
          display: flex !important;
          flex-direction: column !important;
          align-items: flex-start !important;
          text-align: left !important;
        }
        .dd-services-list {
          margin-bottom: 1.1rem;
          display: flex !important;
          flex-direction: column !important;
          align-items: flex-start !important;
          width: 100%;
          text-align: left !important;
        }
        .dd-tagline {
          font-family: var(--font-display);
          font-weight: 600;
          font-style: italic;
          font-size: clamp(1.1rem, 2.2vw, 1.5rem);
          text-transform: uppercase;
          letter-spacing: -0.01em;
          color: var(--c-lime);
          line-height: 1.3;
          margin: 0 0 0.2rem 0;
          text-align: left !important;
          width: 100%;
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
          color: var(--c-ink);
          opacity: 0.9;
          line-height: 1.7;
          max-width: 100%;
          margin: 0 0 0.75rem 0;
          text-align: left !important;
          width: 100%;
        }
        .dd-bullets {
          list-style: none;
          padding: 0;
          margin: 0 0 0.75rem 0;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.1rem 1.5rem;
          text-align: left !important;
          justify-items: start !important;
          width: 100%;
        }
        .dd-bullet-item {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          font-family: var(--font-body);
          font-size: clamp(0.9rem, 1.1vw, 1rem);
          color: var(--c-ink);
          opacity: 0.85;
          line-height: 1.6;
          margin-bottom: 0.25rem;
          text-align: left !important;
          justify-content: flex-start !important;
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
          font-size: clamp(0.95rem, 1.2vw, 1.1rem);
          color: var(--c-ink);
          opacity: 0.9;
          line-height: 1.7;
          max-width: 100%;
          margin: 0;
          text-align: left !important;
          width: 100%;
        }

        @media (max-width: 880px) {
          section {
            margin-top: 4rem !important;
          }
          .dd-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
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

          .green-dot {
            width: clamp(55px, 6.5vw, 72px) !important;
            height: clamp(55px, 6.5vw, 72px) !important;
            top: 3% !important;
            right: 3% !important;
          }
          .green-dot:nth-child(2) {
            width: clamp(38px, 4.5vw, 50px) !important;
            height: clamp(38px, 4.5vw, 50px) !important;
            bottom: 3% !important;
            left: 3% !important;
          }
          .green-dot:nth-child(3) {
            width: clamp(25px, 3vw, 35px) !important;
            height: clamp(25px, 3vw, 35px) !important;
            top: 24% !important;
            left: 3% !important;
          }
        }

        @media (max-width: 520px) {
          section {
            margin-top: -4rem !important;
          }
          .dd-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .dd-photo-card {
            min-height: 250px;
            max-height: 320px;
          }
          .dd-image-wrapper {
            min-height: 250px;
            max-height: 320px;
          }
          .dd-image-wrapper img {
            min-height: 250px;
            max-height: 320px;
          }
          .dd-tagline {
            font-size: clamp(0.9rem, 2vw, 1.1rem);
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
            width: clamp(45px, 7vw, 55px) !important;
            height: clamp(45px, 7vw, 55px) !important;
          }
          .green-dot:nth-child(2) {
            width: clamp(32px, 5vw, 40px) !important;
            height: clamp(32px, 5vw, 40px) !important;
          }
          .green-dot:nth-child(3) {
            width: clamp(22px, 3.5vw, 28px) !important;
            height: clamp(22px, 3.5vw, 28px) !important;
          }
        }
      `}</style>
    </section>
  );
}
