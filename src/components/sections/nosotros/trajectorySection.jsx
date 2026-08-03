import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TrajectorySection() {
  const [yearCount, setYearCount] = useState(2008);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef(null);
  const targetYear = 2026;
  const startYear = 2008;
  const animationRef = useRef(null);
  const timeoutRef = useRef(null);
  const initialDelayRef = useRef(null);

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

  const isGoingUp = yearCount > startYear;

  const animateCounter = (from, to, duration, callback) => {
    let startTime = null;
    const startValue = from;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing: suave al inicio, rápido en el medio, suave al final
      const eased =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      const currentValue = startValue + (to - startValue) * eased;
      const rounded = Math.round(currentValue);

      if (to > from) {
        setYearCount(Math.min(rounded, to));
      } else {
        setYearCount(Math.max(rounded, to));
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
    animateCounter(startYear, targetYear, 5000, () => {
      timeoutRef.current = setTimeout(() => {
        animateCounter(targetYear, startYear, 1000, () => {
          timeoutRef.current = setTimeout(() => {
            startLoop();
          }, 3000);
        });
      }, 1500);
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
      initialDelayRef.current = setTimeout(() => {
        startLoop();
      }, 4000);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (initialDelayRef.current) {
        clearTimeout(initialDelayRef.current);
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
          marginBottom: "120px",
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
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={isGoingUp ? "hasta" : "desde"}
                initial={{ opacity: 0, x: isGoingUp ? 40 : -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isGoingUp ? -40 : 40 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                style={{
                  fontSize: "clamp(2rem,5vw,4rem)",
                  display: "inline-block",
                  minWidth: "clamp(4rem,8vw,6rem)",
                  textAlign: "right",
                }}
              >
                {isGoingUp ? "Hasta" : "Desde"}
              </motion.span>
            </AnimatePresence>

            <span
              style={{
                display: "inline-block",
                minWidth: "clamp(4rem,8vw,6rem)",
                textAlign: "left",
              }}
            >
              {yearCount}
            </span>
          </motion.h2>

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
