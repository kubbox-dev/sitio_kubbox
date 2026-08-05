import { motion } from "framer-motion";
import { CoverflowCarousel } from "../../ui/coverflow-carousel";
import { useScrollAnimation, fadeUp } from "../../../hooks/useScrollAnimation";
import { useState, useEffect, useCallback, useRef } from "react";

// Usando la misma imagen de Unsplash que sí funciona
const IMAGE_URL =
  "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=400&h=400&fit=crop";

const SOUVENIR_SLIDES = [
  {
    src: IMAGE_URL,
    alt: "Bolígrafos personalizados con logo de la marca",
    title: "Bolígrafos Personalizados",
    subtitle: "",
    meta: [],
  },
  {
    src: IMAGE_URL,
    alt: "Tazas corporativas con diseño exclusivo",
    title: "Tazas Corporativas",
    subtitle: "",
    meta: [],
  },
  {
    src: IMAGE_URL,
    alt: "Cuadernos personalizados para eventos",
    title: "Cuadernos Personalizados",
    subtitle: "",
    meta: [],
  },
  {
    src: IMAGE_URL,
    alt: "Bolsas ecológicas con branding",
    title: "Bolsas Ecológicas",
    subtitle: "",
    meta: [],
  },
  {
    src: IMAGE_URL,
    alt: "Memorias USB personalizadas",
    title: "Memorias USB",
    subtitle: "",
    meta: [],
  },
  {
    src: IMAGE_URL,
    alt: "Termos personalizados para promociones",
    title: "Termos Personalizados",
    subtitle: "",
    meta: [],
  },
];

export default function SouvenirCarrouselProducts() {
  const { ref, controls } = useScrollAnimation(0.15);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);
  const isInteractingRef = useRef(false);
  const lastIndexRef = useRef(0);

  const goToNext = useCallback(() => {
    if (!isInteractingRef.current) {
      setCurrentIndex((prev) => (prev + 1) % SOUVENIR_SLIDES.length);
    }
  }, []);

  // Auto-play cada 3 segundos
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    intervalRef.current = setInterval(goToNext, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [goToNext]);

  // Cuando el usuario interactúa manualmente
  const handleIndexChange = useCallback((newIndex) => {
    // Solo actualizar si el índice realmente cambió y es diferente al último registrado
    if (newIndex !== lastIndexRef.current) {
      lastIndexRef.current = newIndex;

      // Marcar que el usuario está interactuando
      isInteractingRef.current = true;

      // Actualizar el índice
      setCurrentIndex(newIndex);

      // Limpiar timeout anterior
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Después de 3 segundos sin interacción, permitir auto-play de nuevo
      timeoutRef.current = setTimeout(() => {
        isInteractingRef.current = false;
      }, 3000);
    }
  }, []);

  // Limpiar al desmontar
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        paddingBlock: "clamp(3rem, 7vw, 6rem)",
        background: "transparent",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "100%",
          paddingInline: "0",
          position: "relative",
          zIndex: 1,
        }}
      >
        <CoverflowCarousel
          slides={SOUVENIR_SLIDES}
          showCaption={true}
          showNavigation={true}
          showPagination={true}
          rotate={35}
          depth={0.5}
          cardWidth="clamp(200px, 28vw, 350px)"
          label="Souvenirs corporativos"
          className="w-full py-4"
          cardClassName="border-2 border-[#90B20A]/20"
          currentIndex={currentIndex}
          onIndexChange={handleIndexChange}
        />
      </div>

      <style jsx>{`
        :global(.text-\\[15px\\]) {
          font-size: clamp(0.75rem, 1.2vw, 1.3rem) !important;
          font-family: var(--font-display) !important;
          font-weight: 700 !important;
          font-style: italic !important;
          color: var(--c-ink) !important;
          letter-spacing: -0.02em !important;
          text-transform: uppercase !important;
          margin-top: 0.2rem !important;
          line-height: 1.2 !important;
        }

        :global(.mt-2) {
          margin-top: 0.3rem !important;
        }

        :global(.text-muted-foreground) {
          display: none !important;
        }

        :global(dl) {
          display: none !important;
        }
      `}</style>
    </section>
  );
}
