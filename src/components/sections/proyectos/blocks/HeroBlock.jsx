import { motion, useReducedMotion } from 'framer-motion'

const SOLID_STYLE = { color: 'var(--c-lime)', WebkitTextFillColor: 'transparent', WebkitTextStroke: '2px var(--c-lime)' }
const OUTLINE_STYLE = { color: 'var(--c-ink)' }

export default function HeroBlock({ eyebrowLime, eyebrowWhite, logo, logoAlt = '', art, artAlt = '' }) {
  const reduce = useReducedMotion()
  const rise = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  }
  return (
    <section className="relative overflow-hidden pt-[clamp(6rem,12vw,9rem)] pb-[clamp(2rem,5vw,3.5rem)] text-center">
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        className="mx-auto flex max-w-[var(--container)] flex-col items-center gap-[clamp(1.5rem,4vw,2.5rem)] px-[var(--container-pad)]"
      >
        <motion.h1 variants={rise} className="m-0 [font-family:var(--font-display)] text-[clamp(2.5rem,9vw,6rem)] font-black italic uppercase leading-[0.9] tracking-[-0.02em]">
          <span style={SOLID_STYLE}>{eyebrowLime}</span>
          <br />
          <span style={OUTLINE_STYLE}>{eyebrowWhite}</span>
        </motion.h1>
        {logo && <motion.img variants={rise} src={logo} alt={logoAlt} className="h-[clamp(2.5rem,7vw,4rem)] w-auto" />}
        {art && <motion.img variants={rise} src={art} alt={artAlt} className="h-auto w-[clamp(180px,40vw,320px)]" />}
      </motion.div>
    </section>
  )
}
