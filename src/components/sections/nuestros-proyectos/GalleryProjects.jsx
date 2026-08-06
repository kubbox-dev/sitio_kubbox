"use client";

import * as React from "react";
import { AnimatePresence, useReducedMotion } from "framer-motion";
import * as m from "motion/react-m";
import { ChevronLeft, ChevronRight } from "lucide-react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// 18 CARDS DE EJEMPLO
const PROJECTS = [
  {
    id: 1,
    title: "SELLO ROJO",
    description:
      "Campañas de la marca para incentivar la compra de productos y capturar datos de los consumidores finales.",
    imageSrc: "/images/NUESTROS PROYECTOS/Fotos-Proyectos/sello rojo.webp",
  },
  {
    id: 2,
    title: "Doria",
    description:
      "Campaña online para registro de compras de productos en retail. Captura de datos de consumidores finales y estrategia concurso de la marca.",
    imageSrc: "/images/NUESTROS PROYECTOS/Fotos-Proyectos/doria.webp",
  },
  {
    id: 3,
    title: "ARDEN FOR MEN",
    description: "Sitio web – Campaña de marca.",
    imageSrc: "/images/NUESTROS PROYECTOS/Fotos-Proyectos/arden for men.webp",
  },
  {
    id: 4,
    title: "BOGOTANEAR",
    description:
      "5 años consecutivos haciendo campañas de Bogotanear. La campaña ha sido un éxito, superando expecativas de la marca y cumpliendo con los objetivos de negocio en 2 semanas.",
    imageSrc: "/images/NUESTROS PROYECTOS/Fotos-Proyectos/bogotanear.webp",
  },
  {
    id: 5,
    title: "Ranchera",
    description:
      "Sitio para Salchicha Ranchera. Campaña de incentivo de compras de la marca. - Landing page. - Generación de códigos para impresión en empaques. - Registro de clientes finales",
    imageSrc: "/images/NUESTROS PROYECTOS/Fotos-Proyectos/ranchera.webp",
  },
  {
    id: 6,
    title: "CHOCAFEST",
    description:
      "Campañas de la marca (CHOCOLISTO) para incentivar la compra de productos y capturar datos de los consumidores finales.",
    imageSrc: "/images/NUESTROS PROYECTOS/Fotos-Proyectos/chocafest.webp",
  },
  {
    id: 7,
    title: "EMP",
    description: "",
    imageSrc: "/images/NUESTROS PROYECTOS/Fotos-Proyectos/epm.webp",
  },
  {
    id: 8,
    title: "Syngenta",
    description:
      "App para seguimiento actividades de ventas y gestion con clientes.",
    imageSrc: "/images/NUESTROS PROYECTOS/Fotos-Proyectos/syngenta.webp",
  },
  {
    id: 9,
    title: "COVERGIRL",
    description:
      "13.234 participantes. Se capturó esta base de datos de mujeres colombianas, para continuar activándolas con la marca. ",
    imageSrc: "/images/NUESTROS PROYECTOS/Fotos-Proyectos/covergirl.webp",
  },
  {
    id: 10,
    title: "PROPLAS",
    description: "",
    imageSrc: "/images/NUESTROS PROYECTOS/Fotos-Proyectos/proplas.webp",
  },
  {
    id: 11,
    title: "JET",
    description:
      "Sitio web – Chocolates Jet – Campamento Jet. Langind page concurso de marca, para incentivar la compra de productos de la marca a través de campaña digital.",
    imageSrc: "/images/NUESTROS PROYECTOS/Fotos-Proyectos/jet.webp",
  },
  {
    id: 12,
    title: "NUTRESA",
    description: "",
    imageSrc: "/images/NUESTROS PROYECTOS/Fotos-Proyectos/gana.webp",
  },
  {
    id: 13,
    title: "POLLOCOA",
    description: "Tienda online",
    imageSrc: "/images/NUESTROS PROYECTOS/Fotos-Proyectos/pollocoa.webp",
  },
  {
    id: 14,
    title: "MISIÓN MEGA",
    description: "Solución para motivar el equipo comercial.",
    imageSrc: "/images/NUESTROS PROYECTOS/Fotos-Proyectos/mision mega.webp",
  },
  {
    id: 15,
    title: "SAPOLIN",
    description:
      "La gerencia esperaba obtener 1.000 en 6 meses. Se obtuvieron 1.000 a los 3 meses, la estrategia pasó a ser algo temporal a un sitio constante de capacitaciones. Ya se están desarrollando en línea 2 niveles cada 1 de 15 módulos.",
    imageSrc: "images/NUESTROS PROYECTOS/Fotos-Proyectos/Imagen-1.sasxpng.webp",
  },
  {
    id: 16,
    title: "FRIXO",
    description: "",
    imageSrc: "images/NUESTROS PROYECTOS/Fotos-Proyectos/Frixo.webp",
  },
  {
    id: 17,
    title: "FUNAT",
    description: "Tienda online",
    imageSrc: "images/NUESTROS PROYECTOS/Fotos-Proyectos/funat.webp",
  },
  {
    id: 18,
    title: "5S100",
    description:
      "20.715 participantes en el concurso. Aumento de frecuencia a 5 compras en el período.",
    imageSrc: "images/NUESTROS PROYECTOS/Fotos-Proyectos/sstop.webp",
  },
];

function wrapIndex(n, len) {
  if (len <= 0) return 0;
  return ((n % len) + len) % len;
}

function signedOffset(i, active, len, loop) {
  const raw = i - active;
  if (!loop || len <= 1) return raw;
  const alt = raw > 0 ? raw - len : raw + len;
  return Math.abs(alt) < Math.abs(raw) ? alt : raw;
}

function DefaultFanCard({ item }) {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0">
        {item.imageSrc ? (
          <img
            src={item.imageSrc}
            alt={item.title}
            className="h-full w-full object-cover"
            draggable={false}
            loading="eager"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-secondary text-sm text-muted-foreground">
            No image
          </div>
        )}
      </div>
      {/* Gradiente más fuerte y oscuro para mejor visibilidad */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 via-40% to-transparent to-70%" />

      {/* Contenido con mejor visibilidad y textos más grandes */}
      <div className="relative z-10 flex h-full flex-col justify-end p-5">
        <div className="text-xl font-bold text-white drop-shadow-lg md:text-2xl">
          {item.title}
        </div>
        {item.description ? (
          <div className="mt-1 text-sm text-white/90 drop-shadow-md md:text-base">
            {item.description}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function GalleryProjects() {
  const reduceMotion = useReducedMotion();
  const len = PROJECTS.length;
  const [active, setActive] = React.useState(0);
  const [hovering, setHovering] = React.useState(false);

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const cardWidth = isMobile ? 280 : 520;
  const cardHeight = isMobile ? 180 : 320;
  const maxVisible = isMobile ? 3 : 5;
  const overlap = isMobile ? 0.35 : 0.48;
  const spreadDeg = isMobile ? 30 : 48;
  const maxOffset = Math.max(0, Math.floor(maxVisible / 2));

  const perspectivePx = 1100;
  const depthPx = isMobile ? 80 : 140;
  const tiltXDeg = 12;
  const activeLiftPx = isMobile ? 12 : 22;
  const activeScale = 1.03;
  const inactiveScale = 0.94;
  const springStiffness = 280;
  const springDamping = 28;
  const loop = true;
  const autoAdvance = true;
  const intervalMs = 2000;
  const pauseOnHover = true;
  const showCounter = true;

  const cardSpacing = Math.max(10, Math.round(cardWidth * (1 - overlap)));
  const stepDeg = maxOffset > 0 ? spreadDeg / maxOffset : 0;

  const canGoPrev = loop || active > 0;
  const canGoNext = loop || active < len - 1;

  const prev = React.useCallback(() => {
    if (!len) return;
    if (!canGoPrev) return;
    setActive((a) => wrapIndex(a - 1, len));
  }, [canGoPrev, len]);

  const next = React.useCallback(() => {
    if (!len) return;
    if (!canGoNext) return;
    setActive((a) => wrapIndex(a + 1, len));
  }, [canGoNext, len]);

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  React.useEffect(() => {
    if (!autoAdvance) return;
    if (reduceMotion) return;
    if (!len) return;
    if (pauseOnHover && hovering) return;

    const id = window.setInterval(
      () => {
        if (loop || active < len - 1) next();
      },
      Math.max(700, intervalMs),
    );

    return () => window.clearInterval(id);
  }, [
    autoAdvance,
    intervalMs,
    hovering,
    pauseOnHover,
    reduceMotion,
    len,
    loop,
    active,
    next,
  ]);

  if (!len) return null;

  const formatNumber = (num) => String(num).padStart(2, "0");

  return (
    <section
      className="relative w-full py-8 md:py-16 mb-12 md:mb-32"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="mx-auto w-full max-w-7xl px-3 md:px-8">
        <div
          className="relative w-full"
          style={{ height: Math.max(280, cardHeight + 60) }}
          tabIndex={0}
          onKeyDown={onKeyDown}
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-6 mx-auto h-32 w-[70%] rounded-full bg-black/5 blur-3xl dark:bg-white/5"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-28 w-[76%] rounded-full bg-black/10 blur-3xl dark:bg-black/30"
            aria-hidden="true"
          />

          <div
            className="absolute inset-0 flex items-end justify-center"
            style={{
              perspective: `${perspectivePx}px`,
            }}
          >
            <AnimatePresence initial={false}>
              {PROJECTS.map((item, i) => {
                const off = signedOffset(i, active, len, loop);
                const abs = Math.abs(off);
                const visible = abs <= maxOffset;

                if (!visible) return null;

                const rotateZ = off * stepDeg;
                const x = off * cardSpacing;
                const y = abs * 8;
                const z = -abs * depthPx;

                const isActive = off === 0;

                const scale = isActive ? activeScale : inactiveScale;
                const lift = isActive ? -activeLiftPx : 0;
                const rotateX = isActive ? 0 : tiltXDeg;
                const zIndex = 100 - abs;

                const dragProps = isActive
                  ? {
                      drag: "x",
                      dragConstraints: { left: 0, right: 0 },
                      dragElastic: 0.18,
                      onDragEnd: (_e, info) => {
                        if (reduceMotion) return;
                        const travel = info.offset.x;
                        const v = info.velocity.x;
                        const threshold = Math.min(120, cardWidth * 0.22);

                        if (travel > threshold || v > 650) prev();
                        else if (travel < -threshold || v < -650) next();
                      },
                    }
                  : {};

                return (
                  <m.div
                    key={item.id}
                    className={cn(
                      "absolute bottom-0 overflow-hidden rounded-2xl border-4 border-white/10 shadow-xl will-change-transform select-none",
                      isActive
                        ? "cursor-grab active:cursor-grabbing"
                        : "cursor-pointer",
                    )}
                    style={{
                      width: cardWidth,
                      height: cardHeight,
                      zIndex,
                      transformStyle: "preserve-3d",
                    }}
                    initial={
                      reduceMotion
                        ? false
                        : {
                            opacity: 0,
                            y: y + 40,
                            x,
                            rotateZ,
                            rotateX,
                            scale,
                          }
                    }
                    animate={{
                      opacity: 1,
                      x,
                      y: y + lift,
                      rotateZ,
                      rotateX,
                      scale,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: springStiffness,
                      damping: springDamping,
                    }}
                    onClick={() => setActive(i)}
                    {...dragProps}
                  >
                    <div
                      className="h-full w-full"
                      style={{
                        transform: `translateZ(${z}px)`,
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <DefaultFanCard item={item} />
                    </div>
                  </m.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {showCounter && (
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={prev}
              disabled={!canGoPrev}
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full border border-white/20 transition-all",
                canGoPrev
                  ? "hover:bg-white/10 hover:border-[var(--c-lime)] hover:text-[var(--c-lime)] cursor-pointer"
                  : "opacity-30 cursor-not-allowed",
              )}
              aria-label="Anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <span className="font-display text-lg font-bold text-white">
                {formatNumber(active + 1)}
              </span>
              <span className="text-white/30 text-lg font-light">/</span>
              <span className="font-display text-lg font-light text-white/50">
                {formatNumber(len)}
              </span>
            </div>

            <button
              onClick={next}
              disabled={!canGoNext}
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full border border-white/20 transition-all",
                canGoNext
                  ? "hover:bg-white/10 hover:border-[var(--c-lime)] hover:text-[var(--c-lime)] cursor-pointer"
                  : "opacity-30 cursor-not-allowed",
              )}
              aria-label="Siguiente"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
