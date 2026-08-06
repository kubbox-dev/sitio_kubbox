"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SquareArrowOutUpRight } from "lucide-react";
import { Link } from "react-router-dom";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const PROJECTS = [
  {
    id: 1,
    title: "Luxury Performance",
    description: "Experience the thrill of precision engineering",
    imageSrc:
      "https://i.pinimg.com/736x/e7/cf/cb/e7cfcbd7a8af10b8839c8d9a3d8eb4ce.jpg",
    href: "https://www.ruixen.com/",
  },
  {
    id: 2,
    title: "Elegant Design",
    description: "Where beauty meets functionality",
    imageSrc:
      "https://i.pinimg.com/736x/f4/b0/00/f4b000a6880f7e8d0c677812d789e001.jpg",
    href: "https://www.ruixen.com/",
  },
  {
    id: 3,
    title: "Power & Speed",
    description: "Unleash the true potential of the road",
    imageSrc:
      "https://i.pinimg.com/1200x/ae/cf/d7/aecfd72b2439914647ec06d19cb182b5.jpg",
    href: "https://www.ruixen.com/",
  },
  {
    id: 4,
    title: "Timeless Craftsmanship",
    description: "Built with passion, driven by excellence",
    imageSrc:
      "https://i.pinimg.com/736x/5d/f7/69/5df7696c4f24b7961c8c72748a355ff8.jpg",
    href: "https://www.ruixen.com/",
  },
  {
    id: 5,
    title: "Future of Mobility",
    description: "Innovation that moves you forward",
    imageSrc:
      "https://i.pinimg.com/736x/9c/f2/8b/9cf28b4df4e06e0ca34fbe87f25734b6.jpg",
    href: "https://www.ruixen.com/",
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

  // 👇 Responsive: detectar si es móvil
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 👇 Ajustar tamaños según dispositivo
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
  const showDots = true;

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

  const activeItem = PROJECTS[active];

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
                  <motion.div
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
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {showDots && (
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="flex items-center gap-2">
              {PROJECTS.map((it, idx) => {
                const isActive = idx === active;
                return (
                  <button
                    key={it.id}
                    onClick={() => setActive(idx)}
                    className={`h-2 rounded-full transition-all ${
                      isActive
                        ? "w-6 bg-[var(--c-lime)]"
                        : "w-2 bg-white/30 hover:bg-white/50"
                    }`}
                    aria-label={`Ir a ${it.title}`}
                  />
                );
              })}
            </div>
            {activeItem?.href && (
              <Link
                to={activeItem.href}
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 transition hover:text-white"
                aria-label="Abrir enlace"
              >
                <SquareArrowOutUpRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
