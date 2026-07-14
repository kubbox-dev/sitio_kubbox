import { motion } from "framer-motion";

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

const NEON_STYLE = {
  color: "var(--c-lime)",
  WebkitTextFillColor: transparent,
  WebkitTextStroke: "2px var(--c-lime)",
};

const BACKDROP_STYLE = {
  background:
    "radial-gradient(ellipse 95% 85% at 26% 38%, oklch(0.13 0.030 250 / 0.96) 0%, oklch(0.09 0.024 250 / 0.88) 55%, oklch(0.07 0.020 250 / 0.35) 100%)",
  maskImage:
    "linear-gradient(to bottom, black 0%, black 50%, transparent 100%)",
  WebkitMaskImage:
    "linear-gradient(to bottom, black 0%, black 50%, transparent 100%)",
};

export default function DigitalHeroSection({ title }) {
  const words = title ? title.toUpperCase().split(" ") : null;
  const mid = words ? Math.ceil(words.length / 2) : 0;
  const line1 = words ? words.slice(0, mid).join(" ") : "HOSTING";
  const line2 = words ? words.slice(mid).join(" ") : "EMPRESARIAL";

  return (
    <section
      className="
        relative
        overflow-hidden
        flex
        items-start
        min-[1280px]:items-center
        min-h-[clamp(620px,145vw,820px)]
        min-[1280px]:min-h-[920px]
        pt-[5.5rem]
        min-[1280px]:pt-[clamp(6.5rem,9vw,8.5rem)]
        pb-8
        min-[1280px]:pb-0
      "
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={BACKDROP_STYLE}
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] pointer-events-none"
      >
        <img
          src="/images/DESARROLLO DIGITAL/WEB/Fotos/foto arriba.png"
          alt=""
          className="
            absolute
            right-[-10%]
            top-[4%]
            h-[50%]
            w-auto
            object-contain
            min-[1280px]:right-[16px]
            min-[1280px]:top-[0px]
            min-[1280px]:h-[690px]
          "
        />

        <img
          src="/images/DESARROLLO DIGITAL/WEB/Fotos/foto abajo.png"
          alt=""
          className="
            absolute
            left-[13%]
            bottom-[40%]
            h-[35%]
            w-auto
            object-contain
            min-[1280px]:left-auto
            min-[1280px]:right-[-5px]
            min-[1280px]:bottom-[156px]
            min-[1280px]:h-[490px]
          "
        />
      </div>

      <div
        className="
          relative
          z-[2]
          max-w-[760px]
          px-[clamp(1.5rem,6vw,5rem)]
          pt-10
          min-[1280px]:mt-[-25rem]
          ml-0 min-[1280px]:ml-50
        "
      >
        <div className="overflow-hidden">
          <motion.h1
            variants={lineReveal(0)}
            initial="hidden"
            animate="visible"
            className="
              [font-family:var(--font-display)]
              font-black
              italic
              uppercase
              m-0
              leading-[0.92]
              tracking-[-0.025em]
              text-[clamp(1.8rem,7vw,5rem)]
              min-[1280px]:text-[clamp(2.8rem,5vw,5.5rem)]
              px-[0.08em]
            "
            style={NEON_STYLE}
          >
            {line1}
          </motion.h1>
        </div>

        <div className="overflow-hidden">
          <motion.h2
            variants={lineReveal(0.12)}
            initial="hidden"
            animate="visible"
            className="
              [font-family:var(--font-display)]
              font-black
              italic
              uppercase
              m-0
              leading-[0.92]
              tracking-[-0.025em]
              text-[clamp(1.8rem,5vw,3.5rem)]
              min-[1280px]:text-[clamp(2.8rem,5vw,5.5rem)]
              ml-[0.6em]
              min-[1280px]:ml-[0.85em]
            "
            style={{ color: "var(--c-ink)" }}
          >
            {line2}
          </motion.h2>
        </div>
      </div>
    </section>
  );
}
