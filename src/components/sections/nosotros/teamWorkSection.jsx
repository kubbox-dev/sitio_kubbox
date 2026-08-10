import { AnimatePresence } from "framer-motion";
import * as m from "motion/react-m";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Play, X, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
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

// ===== COMPONENTE DE VIDEO PLAYER PERSONALIZADO =====
const VideoPlayer = ({ videoUrl, onClose }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    const updateDuration = () => {
      setDuration(video.duration);
    };

    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("loadedmetadata", updateDuration);

    return () => {
      video.removeEventListener("timeupdate", updateProgress);
      video.removeEventListener("loadedmetadata", updateDuration);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const video = videoRef.current;
    if (video && video.duration) {
      video.currentTime = x * video.duration;
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    const container = document.querySelector(".video-modal-content");
    if (!container) return;
    if (!document.fullscreenElement) {
      container.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <m.div
      className="video-modal-content relative w-full max-w-4xl overflow-hidden rounded-2xl bg-black shadow-2xl"
      initial={{ scale: 0.9, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.9, y: 20 }}
      onClick={(e) => e.stopPropagation()}
    >
      {isGif(videoUrl) ? (
        <div className="aspect-video w-full bg-black flex items-center justify-center">
          <img
            src={videoUrl}
            alt="Video del proyecto"
            className="max-h-full max-w-full object-contain"
          />
        </div>
      ) : (
        <div className="relative aspect-video w-full bg-black">
          <video
            ref={videoRef}
            src={videoUrl}
            className="h-full w-full"
            autoPlay
            playsInline
            onClick={togglePlay}
          />

          {/* Overlay de play/pausa centrado */}
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity hover:bg-black/40 group"
          >
            {!isPlaying && (
              <div className="rounded-full bg-[var(--c-lime)]/20 p-4 backdrop-blur-sm transition-transform group-hover:scale-110">
                <Play className="h-12 w-12 text-white drop-shadow-lg md:h-16 md:w-16" />
              </div>
            )}
          </button>

          {/* Controles personalizados */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-3 pt-8 md:p-4 md:pt-12">
            {/* Barra de progreso */}
            <div
              className="group relative mb-2 h-1 cursor-pointer rounded-full bg-white/30 hover:h-1.5 transition-all"
              onClick={handleProgressClick}
            >
              <div
                className="h-full rounded-full bg-[var(--c-lime)] transition-all"
                style={{ width: `${progress}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-[var(--c-lime)] opacity-0 shadow-lg group-hover:opacity-100 transition-opacity"
                style={{ left: `calc(${progress}% - 6px)` }}
              />
            </div>

            {/* Botones de control */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 md:gap-4">
                <button
                  onClick={togglePlay}
                  className="text-white transition hover:text-[var(--c-lime)]"
                >
                  {isPlaying ? (
                    <Pause className="h-4 w-4 md:h-5 md:w-5" />
                  ) : (
                    <Play className="h-4 w-4 md:h-5 md:w-5" />
                  )}
                </button>

                <div className="flex items-center gap-1 text-xs text-white/70 md:text-sm">
                  <span>{formatTime(videoRef.current?.currentTime || 0)}</span>
                  <span>/</span>
                  <span>{formatTime(duration)}</span>
                </div>

                <button
                  onClick={toggleMute}
                  className="text-white transition hover:text-[var(--c-lime)]"
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4 md:h-5 md:w-5" />
                  ) : (
                    <Volume2 className="h-4 w-4 md:h-5 md:w-5" />
                  )}
                </button>
              </div>

              <div className="flex items-center gap-2 md:gap-4">
                <button
                  onClick={toggleFullscreen}
                  className="text-white transition hover:text-[var(--c-lime)]"
                >
                  <Maximize className="h-4 w-4 md:h-5 md:w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Botón cerrar */}
      <button
        className="absolute right-2 top-2 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70 hover:text-[var(--c-lime)]"
        onClick={onClose}
      >
        <X className="h-5 w-5 md:h-6 md:w-6" />
      </button>
    </m.div>
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

      <AnimatePresence>
        {selectedVideo && (
          <m.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <VideoPlayer videoUrl={selectedVideo} onClose={closeModal} />
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
