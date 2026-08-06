"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
      "13.234 participantes. Se capturó esta base de datos de mujeres colombianas, para continuar activándolas con la marca.",
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
      "Sitio web – Chocolates Jet – Campamento Jet. Landing page concurso de marca.",
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
      "La gerencia esperaba obtener 1.000 en 6 meses. Se obtuvieron 1.000 a los 3 meses.",
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

function MobileProjectCard({ project }) {
  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden shadow-2xl border-2 border-white/10">
      <div className="absolute inset-0">
        <img
          src={project.imageSrc}
          alt={project.title}
          className="h-full w-full object-cover"
          draggable={false}
          loading="lazy"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 via-40% to-transparent to-70%" />
      <div className="relative z-10 flex h-full flex-col justify-end p-5">
        <h3 className="text-xl font-bold text-white drop-shadow-lg">
          {project.title}
        </h3>
        {project.description && (
          <p className="mt-1 text-sm text-white/90 drop-shadow-md line-clamp-3">
            {project.description}
          </p>
        )}
      </div>
    </div>
  );
}

export default function MobileProjectsGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Auto-play
  useEffect(() => {
    if (!isMobile) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % PROJECTS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isMobile]);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % PROJECTS.length);
  };

  // Si no es móvil/tablet, no renderizar nada
  if (!isMobile) return null;

  return (
    <section className="w-full py-8 px-4 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white font-display">
            Nuestros <span className="text-[var(--c-lime)]">Proyectos</span>
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-white/50 text-sm font-light">
              {String(currentIndex + 1).padStart(2, "0")}/
              {String(PROJECTS.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="relative w-full">
          <div className="w-full h-[300px] md:h-[350px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  duration: 0.4,
                }}
                className="absolute inset-0"
              >
                <MobileProjectCard project={PROJECTS[currentIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Flechas de navegación */}
          <button
            onClick={goToPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Indicadores (dots) */}
        <div className="flex justify-center gap-2 mt-4">
          {PROJECTS.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "w-8 bg-[var(--c-lime)]"
                  : "w-2 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Ir al proyecto ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
