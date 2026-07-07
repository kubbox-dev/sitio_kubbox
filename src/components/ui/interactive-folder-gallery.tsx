"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

export interface GalleryPhoto {
  id: string | number;
  image: string;
  title?: string;
  description?: string;
  icon?: string;
  bullets?: string[];
  color?: string;
}

const defaultPhotos: GalleryPhoto[] = [
  {
    id: 1,
    image: "",
    title: "Diseño y Desarrollo de Sitios Web",
    description:
      "Creamos sitios web modernos, rápidos, seguros y completamente personalizados.",
    icon: "/images/Servicios/Diseño y Desarrollo de Sitios Web.svg",
    bullets: [
      "Sitios web corporativos",
      "Landing Pages",
      "Portales empresariales",
      "Tiendas virtuales",
    ],
  },
  {
    id: 2,
    image: "",
    title: "Desarrollo de Aplicaciones Móviles",
    description:
      "Diseñamos y desarrollamos aplicaciones móviles para iPhone y Android.",
    icon: "/images/Servicios/Desarrollo de Aplicaciones Móviles.svg",
    bullets: [
      "Empresas",
      "Comercio electrónico",
      "Logística",
      "Gestión interna",
    ],
  },
  {
    id: 3,
    image: "",
    title: "Campañas Digitales para Retail",
    description:
      "Creamos campañas digitales enfocadas en generar tráfico hacia puntos de venta físicos.",
    icon: "/images/Servicios/Campañas Digitales para Activaciónde Ventas en Retail.svg",
    bullets: [
      "Retail",
      "Cadenas comerciales",
      "Centros comerciales",
      "Marcas de consumo masivo",
    ],
  },
  {
    id: 4,
    image: "",
    title: "Google Ads y Meta Ads",
    description: "Diseñamos campañas publicitarias enfocadas en resultados.",
    icon: "/images/Servicios/Google Ads y Meta Ads.svg",
    bullets: ["Meta Ads", "Google Search", "Generación de leads", "ROI"],
  },
  {
    id: 5,
    image: "",
    title: "Posicionamiento SEO",
    description:
      "Ayudamos a que las empresas aparezcan cuando sus clientes buscan en Google.",
    icon: "/images/Servicios/Posicionamiento SEO.svg",
    bullets: [
      "Auditoría SEO",
      "SEO técnico",
      "Optimización de velocidad",
      "SEO local",
    ],
  },
];

export interface InteractiveFolderGalleryProps {
  photos?: GalleryPhoto[];
  folderName?: React.ReactNode;
  dragHintText?: string;
  className?: string;
  visibleStack?: number;
  maxOpenWidth?: string;
}

export function InteractiveFolderGallery({
  photos = defaultPhotos,
  folderName = "Photography.gallery",
  dragHintText = "Arrastra cualquier servicio hacia abajo para cerrar",
  className,
  visibleStack = 5,
  maxOpenWidth = "90%",
}: InteractiveFolderGalleryProps) {
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const [hoverFolder, setHoverFolder] = useState(false);

  const totalPhotos = photos.length;
  const centerIndex = Math.floor(totalPhotos / 2);

  const stackPhotos = photos.slice(0, visibleStack);
  const stackCenterIndex = Math.floor(stackPhotos.length / 2);

  const displayPhotos = isFolderOpen ? photos : stackPhotos;
  const activeCenterIndex = isFolderOpen ? centerIndex : stackCenterIndex;

  const getOpenX = (offset: number, total: number) => {
    if (!isFolderOpen) return offset * 130;
    const spacing = total > 7 ? 90 : 130;
    return offset * spacing;
  };

  return (
    <div className={`w-full py-32 relative ${className || ""}`}>
      <div className="relative w-full min-h-[500px] flex flex-col items-center justify-center">
        <div
          className="relative h-[500px] flex justify-center pointer-events-none z-0 transition-all duration-500"
          style={{
            width: isFolderOpen ? maxOpenWidth : "400px",
            maxWidth: isFolderOpen ? maxOpenWidth : "400px",
            margin: "0 auto",
          }}
        >
          <div
            className={`relative w-full h-full flex justify-center ${isFolderOpen ? "overflow-visible" : ""}`}
          >
            <motion.div
              className="absolute bottom-6 w-80 h-56 drop-shadow-2xl left-1/2 -translate-x-1/2"
              animate={{
                opacity: isFolderOpen ? 0 : 1,
                scale: isFolderOpen ? 0.9 : 1,
              }}
            >
              <div className="absolute top-0 left-0 w-32 h-10 bg-[#1e1e1e] rounded-t-xl border-t border-l border-r border-white/10" />
              <div className="absolute top-8 left-0 right-0 bottom-0 bg-black rounded-b-xl rounded-tr-xl border border-[#1e1e1e] shadow-[inset_0_0_40px_rgba(0,0,0,0.8)]" />
              <div className="absolute top-10 left-2 right-2 bottom-2 bg-black/80 rounded-lg shadow-inner pointer-events-none" />
            </motion.div>

            <div
              className={`absolute bottom-10 z-10 flex justify-center ${isFolderOpen ? "w-full" : ""}`}
            >
              {displayPhotos.map((photo, i) => {
                const offset = i - activeCenterIndex;

                const stackY = hoverFolder ? offset * -10 - 40 : offset * -5;
                const stackX = hoverFolder ? offset * 30 : offset * 3;
                const stackRotate = hoverFolder ? offset * 8 : offset * 3;
                const stackScale = 1 - Math.abs(offset) * 0.03;

                const openY = -130;
                const openX = getOpenX(offset, displayPhotos.length);
                const openRotate = 0;
                const openScale = 1.05;

                return (
                  <motion.div
                    key={photo.id}
                    drag={isFolderOpen ? true : false}
                    dragSnapToOrigin={true}
                    onDragEnd={(e, info) => {
                      if (info.offset.y > 100 && isFolderOpen) {
                        setIsFolderOpen(false);
                        setHoverFolder(false);
                      }
                    }}
                    className={`absolute bottom-0 w-56 h-72 rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden origin-bottom border-t-[2px] border-t-[#90B20A] ${
                      isFolderOpen
                        ? "cursor-grab active:cursor-grabbing pointer-events-auto"
                        : "pointer-events-none"
                    }`}
                    style={{
                      background: "#1F1F1F",
                    }}
                    animate={
                      !isFolderOpen
                        ? {
                            y: stackY,
                            x: stackX,
                            rotate: stackRotate,
                            scale: stackScale,
                            zIndex: i + 10,
                          }
                        : {
                            y: openY,
                            x: openX,
                            rotate: openRotate,
                            scale: openScale,
                            zIndex: 50,
                          }
                    }
                    whileHover={
                      isFolderOpen
                        ? { scale: openScale + 0.05, zIndex: 100 }
                        : {}
                    }
                    whileDrag={
                      isFolderOpen
                        ? { scale: openScale + 0.1, rotate: 5, zIndex: 150 }
                        : {}
                    }
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  >
                    <div className="w-full h-full p-4 flex flex-col justify-center items-start text-left overflow-hidden">
                      {photo.icon && (
                        <div className="w-10 h-10 mb-2 flex-shrink-0">
                          <img
                            src={photo.icon}
                            alt={photo.title || "Icono de servicio"}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                      {photo.title && (
                        <h3 className="text-white text-sm font-bold leading-tight mb-1">
                          {photo.title}
                        </h3>
                      )}
                      {photo.description && (
                        <p className="text-white/50 text-[11px] leading-relaxed text-left mb-2 line-clamp-2">
                          {photo.description}
                        </p>
                      )}
                      {photo.bullets && photo.bullets.length > 0 && (
                        <ul className="space-y-0.5 w-full">
                          {photo.bullets.slice(0, 4).map((bullet, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-1.5 text-[10px] text-white/50"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#90B20A] flex-shrink-0 mt-1" />
                              <span className="leading-tight">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              className="absolute bottom-0 w-[340px] h-44 drop-shadow-[0_-20px_40px_rgba(0,0,0,0.8)] cursor-pointer z-20 pointer-events-auto left-1/2 -translate-x-1/2"
              style={{ transformOrigin: "bottom" }}
              animate={{
                opacity: isFolderOpen ? 0 : 1,
                rotateX: hoverFolder ? -25 : 0,
                y: hoverFolder ? 10 : 0,
                pointerEvents: isFolderOpen ? "none" : "auto",
              }}
              onMouseEnter={() => setHoverFolder(true)}
              onMouseLeave={() => setHoverFolder(false)}
              onClick={() => setIsFolderOpen(true)}
            >
              <div className="w-full h-full bg-black rounded-2xl border border-[#1e1e1e] shadow-[inset_0_2px_10px_rgba(255,255,255,0.05)] relative overflow-hidden flex items-end justify-center pb-8">
                <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent" />

                <div className="px-5 py-2.5 bg-[#1e1e1e] rounded-lg border border-[#2a2a2a] shadow-inner flex items-center justify-center backdrop-blur-md">
                  <span className="text-white/90 text-sm font-medium tracking-wide">
                    {folderName}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          animate={{ opacity: isFolderOpen ? 1 : 0, y: isFolderOpen ? 0 : 50 }}
          className="absolute bottom-10 px-6 py-3 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 backdrop-blur-md text-[var(--c-lime)] text-sm font-medium uppercase tracking-widest pointer-events-none"
        >
          {dragHintText}
        </motion.div>
      </div>
    </div>
  );
}

export { InteractiveFolderGallery as Component };
