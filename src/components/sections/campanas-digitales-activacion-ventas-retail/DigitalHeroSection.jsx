import * as m from "motion/react-m";

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
  let line1 = "CAMPAÑAS DIGITALES PARA";
  let line2 = "ACTIVACIÓN DE";
  let line3 = "VENTAS EN RETAIL";

  if (title) {
    const upperTitle = title.toUpperCase();
    if (
      upperTitle.includes("ACTIVACIÓN") &&
      upperTitle.includes("VENTAS EN RETAIL")
    ) {
      line1 = "CAMPAÑAS DIGITALES PARA";
      line2 = "ACTIVACIÓN DE";
      line3 = "VENTAS EN RETAIL";
    } else {
      const words = upperTitle.split(" ");
      const mid = Math.ceil(words.length / 2);
      line1 = words.slice(0, mid).join(" ");
      line2 = words.slice(mid).join(" ");
      line3 = "";
    }
  }

  return (
    <section
      className="
        relative
        overflow-hidden
        flex
        items-center
        min-[1280px]:items-start
        min-h-[clamp(620px,145vw,820px)]
        min-[1280px]:min-h-[920px]
        py-12
        min-[1280px]:pt-[10rem]
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
        style={{ minHeight: "clamp(620px, 145vw, 920px)" }}
      >
        <img
          src="/images/Servicios/campanas-digitales-activacion-ventas-retail/arriba_1.webp"
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
          src="/images/Servicios/campanas-digitales-activacion-ventas-retail/Abajo.webp"
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

      <style>{`
        @media (min-width: 600px) and (max-width: 1279px) {
          .absolute.inset-0.z-\\[1\\] img:first-child {
            right: 0px !important;
            top: 0px !important;
            height: 50% !important;
          }
          .absolute.inset-0.z-\\[1\\] img:last-child {
            left: auto !important;
            right: 0px !important;
            bottom: 40% !important;
            height: 35% !important;
          }
          section {
            padding-bottom: 12rem !important;
            margin-bottom: 4rem !important;
          }
        }
      `}</style>

      <div
        className="
          relative
          z-[10]
          max-w-[950px]
          px-[clamp(1.5rem,6vw,5rem)]
          ml-0 min-[1280px]:ml-50
          -mt-72
          min-[1280px]:mt-0
        "
      >
        <div className="overflow-hidden">
          <m.h1
            variants={lineReveal(0)}
            initial="hidden"
            animate="visible"
            className="
              [font-family:var(--font-display)]
              font-black
              italic
              uppercase
              m-0
              leading-[0.95]
              tracking-[-0.025em]
              text-[clamp(1.8rem,5vw,3.8rem)]
              min-[1280px]:text-[clamp(2.5rem,4.5vw,4.8rem)]
              px-[0.08em]
              whitespace-nowrap
            "
            style={NEON_STYLE}
          >
            {line1}
          </m.h1>
        </div>

        <div className="overflow-hidden mt-1">
          <m.h2
            variants={lineReveal(0.12)}
            initial="hidden"
            animate="visible"
            className="
              [font-family:var(--font-display)]
              font-black
              italic
              uppercase
              m-0
              leading-[0.95]
              tracking-[-0.025em]
              text-[clamp(1.8rem,5vw,3.8rem)]
              min-[1280px]:text-[clamp(2.5rem,4.5vw,4.8rem)]
              ml-[0.15em]
              min-[1280px]:ml-[0.2em]
              whitespace-nowrap
            "
            style={{ color: "var(--c-ink)" }}
          >
            {line2}
          </m.h2>
        </div>

        {line3 && (
          <div className="overflow-hidden mt-1">
            <m.h3
              variants={lineReveal(0.24)}
              initial="hidden"
              animate="visible"
              className="
                [font-family:var(--font-display)]
                font-black
                italic
                uppercase
                m-0
                leading-[0.95]
                tracking-[-0.025em]
                text-[clamp(1.8rem,5vw,3.8rem)]
                min-[1280px]:text-[clamp(2.5rem,4.5vw,4.8rem)]
                ml-[0.3em]
                min-[1280px]:ml-[0.4em]
                whitespace-nowrap
              "
              style={{ color: "var(--c-ink)" }}
            >
              {line3}
            </m.h3>
          </div>
        )}
      </div>
    </section>
  );
}
