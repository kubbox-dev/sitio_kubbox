// src/components/ui/ExpandableGallery.jsx
"use client";

import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import React, { useState, useId, useRef } from "react";

const transition = {
  type: "spring",
  stiffness: 160,
  damping: 18,
  mass: 1,
};

export default function ExpandableGallery({ items = [], title = "Servicios" }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const layoutGroupId = useId();
  const containerRef = useRef(null);

  // Si no hay items, no renderizar nada
  if (!items || items.length === 0) return null;

  // Solo mostrar primeros 3 en el stack, todos al expandir
  const displayItems = isExpanded ? items : items.slice(0, 3);

  return (
    <section className="relative w-full px-4 md:px-8 flex flex-col items-center justify-start min-h-[300px] overflow-hidden">
      <LayoutGroup id={layoutGroupId}>
        <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
          <div className="w-full h-12 flex items-center justify-between px-4 mb-2">
            <AnimatePresence>
              {isExpanded && (
                <motion.button
                  key="back-button"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  onClick={() => setIsExpanded(false)}
                  className="flex items-center gap-2 text-white/50 hover:text-white transition-all group z-50"
                >
                  <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 12H5" />
                      <path d="M12 19l-7-7 7-7" />
                    </svg>
                  </div>
                  <span className="font-medium">Volver</span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <motion.div
            ref={containerRef}
            layout
            className={`relative w-full ${
              isExpanded
                ? "grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4"
                : "flex flex-col items-center justify-start pt-4"
            }`}
            transition={transition}
          >
            <div
              className={`relative ${
                isExpanded
                  ? "contents"
                  : "h-[300px] w-full flex items-center justify-center mb-4"
              }`}
            >
              {displayItems.map((item, index) => {
                const rotation = isExpanded ? 0 : (index - 1) * 8;
                const xOffset = isExpanded ? 0 : (index - 1) * 30;
                const yOffset = isExpanded ? 0 : (index - 1) * -5;
                const zIndex = isExpanded ? 10 : 20 - index * 5;

                return (
                  <motion.div
                    key={`card-${item.id || index}`}
                    layoutId={`card-container-${item.id || index}`}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      rotate: rotation,
                      x: xOffset,
                      y: yOffset,
                      zIndex: zIndex,
                    }}
                    transition={transition}
                    whileHover={
                      !isExpanded
                        ? {
                            scale: 1.05,
                            y: yOffset - 15,
                            rotate: rotation * 0.8,
                            zIndex: 50,
                            transition: {
                              type: "spring",
                              stiffness: 400,
                              damping: 25,
                            },
                          }
                        : { scale: 1.02 }
                    }
                    className={`cursor-pointer overflow-hidden bg-[#1F1F1F] ${
                      isExpanded
                        ? "relative aspect-square rounded-[2rem] md:rounded-[3rem] border-4 md:border-[6px] border-[#2a2a2a] shadow-lg flex items-center justify-center"
                        : "absolute w-32 h-32 md:w-44 md:h-44 rounded-[2.5rem] md:rounded-[3rem] border-[4px] border-[#2a2a2a] shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex items-center justify-center"
                    }`}
                    onClick={() => !isExpanded && setIsExpanded(true)}
                  >
                    <motion.div
                      layoutId={`image-inner-${item.id || index}`}
                      layout="position"
                      className="w-full h-full flex flex-col items-center justify-center p-4"
                      transition={transition}
                    >
                      {item.icon && (
                        <img
                          src={item.icon}
                          alt={item.label}
                          className="w-12 h-12 md:w-16 md:h-16 object-contain mb-2"
                        />
                      )}
                      <span className="text-white text-xs md:text-sm font-medium text-center">
                        {item.label}
                      </span>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            <AnimatePresence>
              {!isExpanded && (
                <motion.div
                  key="stack-content"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center max-w-2xl space-y-4"
                >
                  <button
                    onClick={() => setIsExpanded(true)}
                    className="rounded-full cursor-pointer py-2 px-6 border border-white/20 bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-all duration-300"
                  >
                    Ver todos los servicios
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </LayoutGroup>
    </section>
  );
}
