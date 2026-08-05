import { motion } from "framer-motion";
import { useScrollAnimation, fadeUp } from "../../../hooks/useScrollAnimation";

const transparent = "transparent";

const lineReveal = (delay = 0) => ({
  hidden: { y: "110%", opacity: 0, skewY: 1 },
  visible: {
    y: "0%",
    opacity: 1,
    skewY: 0,
    transition: {
      delay,
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1],
    },
  },
});

const OUTLINE_STYLE = {
  color: "transparent",
  WebkitTextStroke: "2px var(--c-ink)",
};

export default function SentenseValue() {
  const { ref, controls } = useScrollAnimation(0.15);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        paddingBlock: "clamp(3rem, 7vw, 6rem)",
        marginTop: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          marginInline: "auto",
          paddingInline: "var(--container-pad)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="overflow-hidden" style={{ textAlign: "center" }}>
          <motion.h2
            variants={lineReveal(0)}
            initial="hidden"
            animate={controls}
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontStyle: "italic",
              fontSize: "clamp(2rem, 5vw, 4.5rem)",
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              margin: 0,
              ...OUTLINE_STYLE,
            }}
          >
            CREAMOS MARCAS PENSADAS PARA
            <br />
            MANTENERSE VIGENTES
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={controls}
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontStyle: "italic",
              fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
              color: "var(--c-ink)",
              opacity: 0.85,
              lineHeight: 1.4,
              maxWidth: "80ch",
              margin: "1.5rem auto 0",
              letterSpacing: "0.02em",
            }}
          >
            Nos adaptamos a diferentes formatos para fortalecer el
            reconocimiento de la empresa.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
