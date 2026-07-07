import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

const squareData = [
  { id: 1, src: "" },
  { id: 2, src: "" },
  { id: 3, src: "" },
  { id: 4, src: "" },
  { id: 5, src: "" },
  { id: 6, src: "" },
  { id: 7, src: "" },
  { id: 8, src: "" },
  { id: 9, src: "" },
];

const shuffle = (array) => {
  const copy = [...array];
  let currentIndex = copy.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    [copy[currentIndex], copy[randomIndex]] = [
      copy[randomIndex],
      copy[currentIndex],
    ];
  }

  return copy;
};

const generateSquares = () =>
  shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.2, type: "spring", bounce: 0.28 }}
      style={{
        aspectRatio: "1 / 1",
        minHeight: "7rem",
        borderRadius: "1rem",
        background: sq.src
          ? `url(${sq.src}) center/cover no-repeat`
          : "#ffffff",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.08)",
      }}
    />
  ));

const ShuffleBoard = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    const shuffleSquares = () => {
      setSquares(generateSquares());
      timeoutRef.current = setTimeout(shuffleSquares, 3000);
    };

    shuffleSquares();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return <div className="nosotros-shuffle-grid">{squares}</div>;
};

export default function TeamWorkSection() {
  const navigate = useNavigate();

  return (
    <section
      id="team-work"
      style={{
        position: "relative",
        overflow: "hidden",
        paddingBlock: "clamp(5rem, 10vw, 7rem)",
        marginTop: "-1px",
      }}
    >
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "var(--container)",
          marginInline: "auto",
          paddingInline: "var(--container-pad)",
        }}
      >
        <div
          className="nosotros-team-grid"
          style={{
            gap: "clamp(2rem, 5vw, 4rem)",
            alignItems: "center",
          }}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.24 }}
            variants={fadeUp}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                justifyContent: "flex-start",
                alignSelf: "flex-start",
                width: "100%",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  fontStyle: "normal",
                  fontSize: "clamp(2.5rem, 1.9vw, 1.5rem)",
                  letterSpacing: "-0.03em",
                  textTransform: "uppercase",
                  color: "var(--c-lime)",
                  WebkitTextFillColor: "transparent",
                  WebkitTextStroke: "1.8px var(--c-lime)",
                  textShadow: "0 0 24px rgba(140, 255, 95, 0.24)",
                  marginBottom: "-0.35rem",
                }}
              >
                Identidad con propósito
              </span>
            </div>

            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "clamp(2.5rem, 5.5vw, 4.8rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
                textTransform: "uppercase",
                color: "#ffffff",
                margin: 0,
              }}
            >
              NUESTRO EQUIPO <br /> DE TRABAJO
            </h2>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "clamp(1rem, 1.6vw, 1.1rem)",
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.82)",
                maxWidth: "min(42rem, 100%)",
              }}
            >
              Cada proyecto es desarrollado por un equipo multidisciplinario de
              diseñadores, desarrolladores, estrategas digitales y especialistas
              en marketing de desempeño que trabajan de forma integrada para
              entregar soluciones escalables, seguras y orientadas al
              crecimiento.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              <Button
                size="lg"
                onClick={() => navigate("/proyectos")}
                style={{ color: "#ffffff", textTransform: "uppercase" }}
              >
                Ver proyectos
              </Button>
            </div>

            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(0.95rem, 1.6vw, 1.15rem)",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.9)",
                margin: 0,
                lineHeight: 1.3,
                whiteSpace: "nowrap",
              }}
            >
              COMPROMISO CON EL VALOR{" "}
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  fontStyle: "normal",
                  letterSpacing: "-0.03em",
                  color: "var(--c-lime)",
                  textShadow: "0 0 24px rgba(140, 255, 95, 0.24)",
                }}
              >
                DE TU INVERSIÓN
              </span>
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.24 }}
            variants={fadeUp}
            transition={{ delay: 0.1 }}
            style={{ width: "100%" }}
          >
            <div
              style={{ minHeight: "24rem" }}
              className="nosotros-shuffle-wrapper"
            >
              <ShuffleBoard />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
