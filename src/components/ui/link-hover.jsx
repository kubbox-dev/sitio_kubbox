"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const DefaultImg =
  "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=400&q=80";

const DefaultItems = [
  {
    imgUrl:
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&q=80",
    title: "Home",
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=400&q=80",
    title: "Blog",
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80",
    title: "About",
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1510797215324-95aa89f43c33?w=400&q=80",
    title: "Projects",
  },
  {
    imgUrl:
      "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=400&q=80",
    title: "Contacts",
  },
];

export default function ImageHover({ items = DefaultItems }) {
  const sectionRef = useRef(null);
  const previewContainerRef = useRef(null);
  const newImgRef = useRef(null);

  // Detectar si es móvil (ancho < 768px)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Estado para el índice actual de la imagen en móvil
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef(null);

  // Autoplay en móvil: cambia la imagen cada 3 segundos
  useEffect(() => {
    if (!isMobile) return;
    if (!isAutoPlaying) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 3000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isMobile, isAutoPlaying, items.length]);

  // Función para cambiar la imagen manualmente (click en un ítem)
  const handleItemClick = (index) => {
    setCurrentIndex(index);
    // Reiniciar el autoplay
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 100); // Pequeño delay para evitar conflictos
  };

  // --- GSAP para escritorio (hover) ---
  useGSAP(
    () => {
      if (isMobile) return; // No ejecutar GSAP en móvil
      if (!sectionRef.current) return;
      const previewContainer = previewContainerRef.current;
      const menuLinkItems =
        sectionRef.current.querySelectorAll(".menu-link-item");

      let lastHoveredIndex = null;

      const handleMouseOver = (index) => {
        if (index !== lastHoveredIndex) {
          // Crear contenedor de imagen temporal (sin rotación)
          const imgContainer = document.createElement("div");
          imgContainer.style.position = "absolute";
          imgContainer.style.bottom = "-100%";
          imgContainer.style.left = "0";
          imgContainer.style.width = "100%";
          imgContainer.style.height = "100%";
          imgContainer.style.overflow = "hidden";
          imgContainer.style.transition = "none";
          imgContainer.style.zIndex = "10";

          const img = document.createElement("img");
          img.src = items[index].imgUrl;
          img.alt = "";
          img.style.width = "100%";
          img.style.height = "100%";
          img.style.objectFit = "cover";
          imgContainer.appendChild(img);
          previewContainer.appendChild(imgContainer);

          // Animación GSAP: sube desde abajo sin rotación
          gsap.to(imgContainer, {
            bottom: "0%",
            duration: 0.9,
            ease: "power3.out",
            onComplete: () => {
              gsap.delayedCall(1.5, () => {
                const allContainers =
                  previewContainer.querySelectorAll(".temp-image");
                if (allContainers.length > 1) {
                  Array.from(allContainers)
                    .slice(0, -1)
                    .forEach((container) => {
                      setTimeout(() => {
                        container.remove();
                      }, 400);
                    });
                }
              });
            },
          });

          imgContainer.classList.add("temp-image");
          lastHoveredIndex = index;
        }
      };

      menuLinkItems.forEach((item, index) => {
        item.addEventListener("mouseover", () => handleMouseOver(index));
      });

      return () => {
        menuLinkItems.forEach((item, index) => {
          item.removeEventListener("mouseover", () => handleMouseOver(index));
        });
      };
    },
    { scope: sectionRef, dependencies: [sectionRef, items, isMobile] },
  );

  // Renderizado condicional según sea móvil o no
  if (isMobile) {
    // Versión móvil: texto arriba, imagen abajo, click y autoplay
    return (
      <div className="w-full max-w-4xl mx-auto">
        {/* Lista de textos (arriba) */}
        <ul className="flex flex-col gap-3 mb-6 text-lg font-medium text-gray-400 md:hidden">
          {items.map((item, idx) => (
            <li
              key={idx}
              className={`menu-link-item cursor-pointer transition hover:text-white ${
                idx === currentIndex ? "text-white font-bold" : ""
              }`}
              onClick={() => handleItemClick(idx)}
            >
              {item.title}
            </li>
          ))}
        </ul>

        {/* Imagen (abajo) con transición suave */}
        <div className="relative w-full max-w-md mx-auto overflow-hidden rounded-2xl border border-gray-700/50 shadow-2xl aspect-[1.5/1]">
          <img
            src={items[currentIndex].imgUrl}
            alt={items[currentIndex].title}
            className="h-full w-full object-cover transition-opacity duration-500"
          />
          {/* Indicador opcional de autoplay o de número de slide */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2">
            {items.map((_, idx) => (
              <button
                key={idx}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentIndex
                    ? "bg-[var(--c-lime)] w-4"
                    : "bg-white/40"
                }`}
                onClick={() => handleItemClick(idx)}
                aria-label={`Ir a slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- Versión escritorio (original con hover) ---
  return (
    <section
      ref={sectionRef}
      className="flex w-full items-center justify-center gap-6 px-4 py-10 md:gap-10 md:px-6 md:py-14"
    >
      <div className="flex-1">
        <ul className="flex flex-col gap-3 text-lg font-medium text-gray-400 transition-all md:gap-4 md:text-xl lg:text-2xl [&>li]:cursor-pointer [&>li]:transition [&>li]:hover:text-white">
          {items.map(({ title }) => (
            <li key={title} className="menu-link-item">
              {title}
            </li>
          ))}
        </ul>
      </div>

      <div
        ref={previewContainerRef}
        className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-gray-700/50 shadow-2xl aspect-[1.5/1] md:max-w-md lg:max-w-lg"
      >
        <img src={DefaultImg} alt="" className="h-full w-full object-cover" />
        <div
          ref={newImgRef}
          className="absolute bottom-0 left-0 h-full w-full"
          style={{ transform: "translateY(100%)" }}
        >
          <img
            src={items[1]?.imgUrl || DefaultImg}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
