import { motion, useReducedMotion } from 'framer-motion'

const TILTS = [-2, 1.5, -1, 2, -1.5, 1]

export default function DeploymentBlock({ regions = [] }) {
  const reduce = useReducedMotion()

  return (
    <section className="relative py-[clamp(1.5rem,4vw,3rem)]">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
        className="mx-auto flex max-w-[var(--container)] flex-wrap justify-center gap-[clamp(0.75rem,2vw,1.25rem)] px-[var(--container-pad)]"
      >
        {regions.map((r, i) => {
          const tilt = reduce ? 0 : TILTS[i % TILTS.length]
          return (
            <motion.div
              key={r.code}
              variants={{
                hidden: { opacity: 0, y: reduce ? 0 : 16, scale: reduce ? 1 : 0.94, rotate: 0 },
                show: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  rotate: tilt,
                  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              whileHover={reduce ? undefined : { scale: 1.06, rotate: 0 }}
              className="flex min-w-[7.5rem] flex-col items-center gap-1 rounded-[0.85rem] border px-[clamp(1rem,2.5vw,1.5rem)] py-[clamp(1rem,2vw,1.35rem)] [background:var(--c-surface)] [border-color:oklch(0.28_0.022_260)] transition-colors duration-200 hover:[border-color:var(--c-lime)]"
            >
              <span className="[font-family:var(--font-display)] text-[clamp(1.75rem,4vw,2.25rem)] font-black italic leading-none" style={{ color: 'var(--c-lime)' }}>
                {r.code}
              </span>
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.1em] [font-family:var(--font-body)]" style={{ color: 'var(--c-muted)' }}>
                {r.name}
              </span>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
