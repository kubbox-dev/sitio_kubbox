"use client";

import * as React from "react";
import { AnimatePresence, useReducedMotion } from "framer-motion";
import * as m from "motion/react-m";
import { ChevronLeft, ChevronRight } from "lucide-react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

// 16 CARDS DE EJEMPLO
const PROJECTS = [
  {
    id: 1,
    title: "Kubbox",
    description:
      "Agencia de BRANDING, desarrollo web, poscionamiento y marketing predictivo",
    imageSrc: "/images/NUESTROS PROYECTOS/Fotos-Proyectos/Imagen-1.sasxpng.webp",
  },
  {
    id: 2,
    title: "Pollocoa",
    description: "Rediseño de identidad visual y estrategia digital",
    imageSrc:
      "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    title: "F-rixo",
    description: "E-commerce de alto rendimiento",
    imageSrc:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    title: "CAM",
    description: "Performance marketing con ROI duplicado",
    imageSrc:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    title: "Proyecto 5",
    description: "Descripción del proyecto 5",
    imageSrc:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop",
  },
  {
    id: 6,
    title: "Proyecto 6",
    description: "Descripción del proyecto 6",
    imageSrc:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop",
  },
  {
    id: 7,
    title: "Proyecto 7",
    description: "Descripción del proyecto 7",
    imageSrc:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop",
  },
  {
    id: 8,
    title: "Proyecto 8",
    description: "Descripción del proyecto 8",
    imageSrc:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop",
  },
  {
    id: 9,
    title: "Proyecto 9",
    description: "Descripción del proyecto 9",
    imageSrc:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&h=400&fit=crop",
  },
  {
    id: 10,
    title: "Proyecto 10",
    description: "Descripción del proyecto 10",
    imageSrc:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&fit=crop",
  },
  {
    id: 11,
    title: "Proyecto 11",
    description: "Descripción del proyecto 11",
    imageSrc:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
  },
  {
    id: 12,
    title: "Proyecto 12",
    description: "Descripción del proyecto 12",
    imageSrc:
      "https://images.unsplash.com/photo-1510797215324-95aa89f43c33?w=600&h=400&fit=crop",
  },
  {
    id: 13,
    title: "Proyecto 13",
    description: "Descripción del proyecto 13",
    imageSrc:
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=600&h=400&fit=crop",
  },
  {
    id: 14,
    title: "Proyecto 14",
    description: "Descripción del proyecto 14",
    imageSrc:
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=600&h=400&fit=crop",
  },
  {
    id: 15,
    title: "Proyecto 15",
    description: "Descripción del proyecto 15",
    imageSrc:
      "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=600&h=400&fit=crop",
  },
  {
    id: 16,
    title: "Proyecto 16",
    description: "Descripción del proyecto 16",
    imageSrc:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=400&fit=crop",
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
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <div className="relative z-10 flex h-full flex-col justify-end p-5">
        <div className="truncate text-lg font-semibold text-white">
          {item.title}
        </div>
        {item.description ? (
          <div className="mt-1 line-clamp-2 text-sm text-white/80">
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
  const showCounter = true; // 👈 Contador en lugar de dots

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

  // Formatear número con dos dígitos (01, 02, ... 16)
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

        {/* 👇 CONTADOR DE POSICIÓN CON FLECHAS */}
        {showCounter && (
          <div className="mt-6 flex items-center justify-center gap-4">
            {/* Botón anterior */}
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

            {/* Contador */}
            <div className="flex items-center gap-3">
              <span className="font-display text-lg font-bold text-white">
                {formatNumber(active + 1)}
              </span>
              <span className="text-white/30 text-lg font-light">/</span>
              <span className="font-display text-lg font-light text-white/50">
                {formatNumber(len)}
              </span>
            </div>

            {/* Botón siguiente */}
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
