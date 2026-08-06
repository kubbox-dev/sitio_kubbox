import { AnimatePresence } from "framer-motion";
import * as m from "motion/react-m";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play, X } from "lucide-react";
import Button from "../../ui/Button";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

const squareData = [
  {
    id: 1,
    src: "/images/Nosotros/proyectos/armorall.webp",
    videoUrl: "/images/Nosotros/proyectos/Videos/armorall.webm",
  },
  {
    id: 2,
    src: "/images/Nosotros/proyectos/comida-saludable_1.webp",
    videoUrl: "/images/Nosotros/proyectos/Videos/el de comida saludable.webm",
  },
  {
    id: 3,
    src: "/images/Nosotros/proyectos/cooper-tires-1.webp",
    videoUrl: "/images/Nosotros/proyectos/Videos/cooper.webm",
  },
  {
    id: 4,
    src: "/images/Nosotros/proyectos/kubbox.webp",
    videoUrl: "/images/Nosotros/proyectos/Videos/10 mandamientos -1 (2).webm",
  },
  {
    id: 5,
    src: "/images/Nosotros/proyectos/duracell_1.webp",
    videoUrl: "/images/Nosotros/proyectos/Videos/duracell.webm",
  },
  {
    id: 6,
    src: "/images/Nosotros/proyectos/cooper-tires-2.webp",
    videoUrl:
      "/images/Nosotros/proyectos/Videos/el otro video de cooper tires.webm",
  },
  {
    id: 7,
    src: "/images/Nosotros/proyectos/perrito.webp",
    videoUrl: "/images/Nosotros/proyectos/Videos/El video del perrito.webm",
  },
  {
    id: 8,
    src: "/images/Nosotros/proyectos/llantin_1.webp",
    videoUrl: "/images/Nosotros/proyectos/Videos/video llantin.gif",
  },
  {
    id: 9,
    src: "/images/Nosotros/proyectos/tiro-de-arrastre.webp",
    videoUrl: "/images/Nosotros/proyectos/Videos/Tiros de arrastre.webm",
  },
];

const shuffle = (array) => {
  const copy = [...array];
  let currentIndex = copy.length;
  let randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    [copy[currentIndex], copy[randomIndex]] = [
      copy[randomIndex],
      copy[currentIndex],
    ];
  }
  return copy;
};

// Función para detectar si la URL es un GIF
const isGif = (url) => {
  return url && url.toLowerCase().includes(".gif");
};

const generateSquares = (onCardClick) =>
  shuffle(squareData).map((sq) => (
    <m.div
      key={sq.id}
      layout
      transition={{ duration: 1.2, type: "spring", bounce: 0.28 }}
      className="group relative aspect-square min-h-[7rem]"
    >
      <m.div
        className="relative h-full w-full cursor-pointer rounded-2xl border-2 border-white/30 bg-cover bg-center bg-no-repeat shadow-xl transition-all"
        style={{ backgroundImage: `url(${sq.src})` }}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 8px 32px rgba(163, 230, 53, 0.4)",
          borderColor: "#a3e635",
          transition: { duration: 0.2, ease: "easeOut" },
        }}
        onClick={() => onCardClick(sq.videoUrl)}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
          <Play className="h-10 w-10 text-white drop-shadow-lg md:h-12 md:w-12" />
          <span className="mt-1.5 text-sm font-medium text-white/90 md:text-base">
            Ver video
          </span>
        </div>
      </m.div>
    </m.div>
  ));

const ShuffleBoard = ({ onCardClick }) => {
  const timeoutRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [squares, setSquares] = useState(() => generateSquares(onCardClick));

  const scheduleShuffle = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (!isHovering) {
      timeoutRef.current = setTimeout(() => {
        setSquares(generateSquares(onCardClick));
        scheduleShuffle();
      }, 3000);
    }
  };

  useEffect(() => {
    scheduleShuffle();
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isHovering, onCardClick]);

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div
      className="nosotros-shuffle-grid"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {squares}
    </div>
  );
};

export default function TeamWorkSection() {
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleCardClick = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  return (
    <section
      id="team-work"
      style={{
        position: "relative",
        overflow: "hidden",
        paddingBlock: "clamp(5rem, 10vw, 7rem)",
        marginTop: "-1px",
      }}
    >
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "var(--container)",
          marginInline: "auto",
          paddingInline: "var(--container-pad)",
        }}
      >
        <div
          className="nosotros-team-grid"
          style={{
            gap: "clamp(2rem, 5vw, 4rem)",
            alignItems: "center",
          }}
        >
          {/* Columna izquierda (texto) */}
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.24 }}
            variants={fadeUp}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                justifyContent: "flex-start",
                alignSelf: "flex-start",
                width: "100%",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  fontStyle: "normal",
                  fontSize: "clamp(2.5rem, 1.9vw, 1.5rem)",
                  letterSpacing: "-0.03em",
                  textTransform: "uppercase",
                  color: "var(--c-lime)",
                  WebkitTextFillColor: "transparent",
                  WebkitTextStroke: "1.8px var(--c-lime)",
                  textShadow: "0 0 24px rgba(140, 255, 95, 0.24)",
                  marginBottom: "-0.35rem",
                }}
              >
                Identidad con propósito
              </span>
            </div>

            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(2.5rem, 5.5vw, 4.8rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
                color: "#ffffff",
                margin: 0,
              }}
            >
              NUESTRO EQUIPO <br /> DE TRABAJO
            </h2>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(1rem, 1.6vw, 1.1rem)",
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.82)",
                maxWidth: "min(42rem, 100%)",
              }}
            >
              Cada proyecto es desarrollado por un equipo multidisciplinario de
              diseñadores, desarrolladores, estrategas digitales y especialistas
              en marketing de desempeño que trabajan de forma integrada para
              entregar soluciones escalables, seguras y orientadas al
              crecimiento.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              <Button
                size="lg"
                onClick={() => navigate("/proyectos")}
                style={{ color: "#ffffff", textTransform: "uppercase" }}
              >
                Ver proyectos
              </Button>
            </div>

            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(0.95rem, 1.6vw, 1.15rem)",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.9)",
                margin: 0,
                lineHeight: 1.3,
                whiteSpace: "nowrap",
              }}
            >
              COMPROMISO CON EL VALOR{" "}
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  fontStyle: "normal",
                  letterSpacing: "-0.03em",
                  color: "var(--c-lime)",
                  textShadow: "0 0 24px rgba(140, 255, 95, 0.24)",
                }}
              >
                DE TU INVERSIÓN
              </span>
            </p>
          </m.div>

          {/* Columna derecha (grid shuffle) */}
          <m.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.24 }}
            variants={fadeUp}
            transition={{ delay: 0.1 }}
            style={{ width: "100%" }}
          >
            <div
              style={{ minHeight: "24rem" }}
              className="nosotros-shuffle-wrapper"
            >
              <ShuffleBoard onCardClick={handleCardClick} />
            </div>
          </m.div>
        </div>
      </div>

      {/* Modal de video mejorado - soporte para GIF y videos */}
      <AnimatePresence>
        {selectedVideo && (
          <m.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <m.div
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-video w-full bg-black flex items-center justify-center">
                {isGif(selectedVideo) ? (
                  // Si es GIF, usar <img>
                  <img
                    src={selectedVideo}
                    alt="Video del proyecto"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  // Si es video, usar <video>
                  <video
                    src={selectedVideo}
                    className="h-full w-full"
                    controls
                    autoPlay
                    playsInline
                  />
                )}
              </div>
              <button
                className="absolute right-2 top-2 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70"
                onClick={closeModal}
              >
                <X className="h-6 w-6" />
              </button>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>

      <style>{`
        .nosotros-shuffle-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
          width: 100%;
          max-width: 550px;
          margin: 0 auto;
        }

        .nosotros-shuffle-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        @media (max-width: 768px) {
          .nosotros-team-grid {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .nosotros-team-grid > div:first-child {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .nosotros-team-grid > div:first-child > div:first-child {
            justify-content: center !important;
            align-self: center !important;
          }

          .nosotros-team-grid > div:first-child h2 {
            text-align: center;
          }

          .nosotros-team-grid > div:first-child p {
            text-align: center;
            margin: 0 auto;
          }

          .nosotros-team-grid > div:first-child > div:nth-child(4) {
            justify-content: center;
          }

          .nosotros-team-grid > div:first-child > p:last-child {
            white-space: normal !important;
            text-align: center;
            max-width: 100%;
          }

          .nosotros-shuffle-grid {
            max-width: 100%;
            gap: 0.5rem;
          }
        }

        @media (max-width: 480px) {
          .nosotros-shuffle-grid {
            gap: 0.3rem;
          }
        }
      `}</style>
    </section>
  );
}
