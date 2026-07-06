import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function TrajectorySection() {
  const [yearCount, setYearCount] = useState(2008);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);
  const targetYear = 2026;
  const startYear = 2008;
  const animationRef = useRef(null);
  const timeoutRef = useRef(null);

  const left = [
    {
      id: 1,
      title: "Más de 18 años de experiencia",
      icon: "/images/Nosotros/18 años de experiencia.svg",
    },
    {
      id: 2,
      title: "Clientes en varios países",
      icon: "/images/Nosotros/varios países.svg",
    },
    {
      id: 3,
      title: "Equipo interdisciplinario",
      icon: "/images/Nosotros/equipo especializado.svg",
    },
    {
      id: 4,
      title: "Desarrollo personalizado",
      icon: "/images/Nosotros/desarrollo personalizado.svg",
    },
    {
      id: 5,
      title: "Metodologías ágiles",
      icon: "/images/Nosotros/metodologías ágiles.svg",
    },
  ];

  const right = [
    {
      id: 6,
      title: "Acompañamiento permanente",
      icon: "/images/Nosotros/acompañamiento permanente.svg",
    },
    {
      id: 7,
      title: "Soluciones escalables",
      icon: "/images/Nosotros/soluciones escalables.svg",
    },
    {
      id: 8,
      title: "Servicio consultivo",
      icon: "/images/Nosotros/servicio cercano.svg",
    },
    {
      id: 9,
      title: "Compromiso con la innovación",
      icon: "/images/Nosotros/compromiso con la innovación.svg",
    },
    {
      id: 10,
      title: "Orientación a resultados",
      icon: "/images/Nosotros/orientación a resultados.svg",
    },
  ];

  const animateCounter = (from, to, duration, callback) => {
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentValue = from + (to - from) * eased;
      const rounded = Math.floor(currentValue);

      if (rounded <= to) {
        setYearCount(rounded);
      }

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(step);
      } else {
        setYearCount(to);
        if (callback) callback();
      }
    };

    animationRef.current = requestAnimationFrame(step);
  };

  const startLoop = () => {
    // Subir de 2008 a 2026 en 3 segundos
    animateCounter(startYear, targetYear, 3000, () => {
      // Esperar 1 segundo en 2026
      timeoutRef.current = setTimeout(() => {
        // Bajar a 2008 en 0.5 segundos (cambio rápido)
        animateCounter(targetYear, startYear, 500, () => {
          // Esperar 4 segundos en 2008
          timeoutRef.current = setTimeout(() => {
            startLoop(); // Repetir
          }, 4000);
        });
      }, 1000);
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 },
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      startLoop();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isVisible]);

  return (
    <section
      id="trajectory"
      style={{ paddingBlock: "clamp(3rem, 8vw, 5.5rem)" }}
    >
      <div
        style={{
          maxWidth: "var(--container)",
          marginInline: "auto",
          paddingInline: "var(--container-pad)",
        }}
      >
        <div
          ref={counterRef}
          style={{ textAlign: "center", marginBottom: "2rem" }}
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(3rem,8vw,6rem)",
              textTransform: "uppercase",
              color: "var(--c-lime)",
              margin: 0,
              lineHeight: 1,
            }}
          >
            {yearCount}
          </motion.h2>
          <p
            style={{
              marginTop: "0.25rem",
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(1rem,1.8vw,1.4rem)",
              color: "rgba(255,255,255,0.6)",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
            }}
          >
            DESDE 2008
          </p>
          <p
            style={{
              marginTop: "0.75rem",
              fontFamily: "var(--font-body)",
              fontSize: "clamp(0.95rem,1.2vw,1rem)",
              color: "rgba(255,255,255,0.82)",
              maxWidth: "min(56rem,100%)",
              marginInline: "auto",
            }}
          >
            Hemos construido relaciones de largo plazo basadas en confianza,
            calidad y resultados.
          </p>
        </div>

        <div className="trajectory-grid">
          <div className="trajectory-box">
            {left.map((item) => (
              <div key={item.id} className="trajectory-item">
                <div className="trajectory-icon">
                  <img src={item.icon} alt="" />
                </div>
                <div className="trajectory-text">{item.title}</div>
              </div>
            ))}
          </div>

          <div className="trajectory-box">
            {right.map((item) => (
              <div key={item.id} className="trajectory-item">
                <div className="trajectory-icon">
                  <img src={item.icon} alt="" />
                </div>
                <div className="trajectory-text">{item.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
