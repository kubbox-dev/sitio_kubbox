import { motion } from 'framer-motion'

const transparent = 'transparent'

const lineReveal = (delay = 0) => ({
  hidden: { y: '110%', opacity: 0, skewY: 1 },
  visible: {
    y: '0%',
    opacity: 1,
    skewY: 0,
    transition: {
      delay,
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1],
    },
  },
})

const NEON_STYLE = {
  color: 'var(--c-lime)',
  WebkitTextFillColor: transparent,
  WebkitTextStroke: '2px var(--c-lime)',
}

const BACKDROP_STYLE = {
  background:
    'radial-gradient(ellipse 95% 85% at 26% 38%, oklch(0.13 0.030 250 / 0.96) 0%, oklch(0.09 0.024 250 / 0.88) 55%, oklch(0.07 0.020 250 / 0.35) 100%)',
  maskImage:
    'linear-gradient(to bottom, black 0%, black 80%, transparent 100%)',
  WebkitMaskImage:
    'linear-gradient(to bottom, black 0%, black 80%, transparent 100%)',
}

export default function DigitalHeroSection() {
  return (
    <section
      className="
        relative
        overflow-hidden
        flex
        items-start
        min-[901px]:items-center
        min-h-[clamp(620px,145vw,820px)]
        min-[901px]:min-h-[clamp(560px,63vw,920px)]
        pt-[5.5rem]
        min-[901px]:pt-[clamp(6.5rem,9vw,8.5rem)]
        pb-8
        min-[901px]:pb-0
      "
    >
      {/* BACKDROP */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 pointer-events-none"
        style={BACKDROP_STYLE}
      />

      {/* IMÁGENES */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] pointer-events-none"
      >
        {/* TRIÁNGULO SUPERIOR */}
        <img
          src="/images/DESARROLLO DIGITAL/WEB/Fotos/foto arriba.png"
          alt=""
          className="
            absolute
            right-[-10%]
            top-[4%]
            h-[52%]
            w-auto
            object-contain

            min-[901px]:right-[1%]
            min-[901px]:top-[0%]
            min-[901px]:h-[75%]
          "
        />

        {/* TRIÁNGULO INFERIOR */}
        <img
          src="/images/DESARROLLO DIGITAL/WEB/Fotos/foto abajo.png"
          alt=""
          className="
            absolute
            left-[2%]
            bottom-[3%]
            h-[40%]
            w-auto
            object-contain

            min-[901px]:left-[38%]
            min-[901px]:bottom-[15%]
            min-[901px]:h-[55%]
          "
        />
      </div>

      {/* TEXTO */}
      <div
        className="
          relative
          z-[2]
          max-w-[760px]
          px-[clamp(1.5rem,6vw,5rem)]
          pt-10
          min-[901px]:pt-0
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
              text-[clamp(3rem,8vw,7.5rem)]
              px-[0.08em]
            "
            style={NEON_STYLE}
          >
            DESARROLLO
          </motion.h1>
        </div>

        <div className="overflow-hidden">
          <motion.h1
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
              text-[clamp(3rem,8vw,7.5rem)]
              ml-[0.6em]
              min-[901px]:ml-[0.85em]
            "
            style={{ color: 'var(--c-ink)' }}
          >
            DIGITAL
          </motion.h1>
        </div>
      </div>
    </section>
  )
}