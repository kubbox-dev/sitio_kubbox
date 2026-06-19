import { motion, useReducedMotion } from 'framer-motion'

export default function RegionCardsBlock({ regions = [] }) {
  const reduce = useReducedMotion()
  const card = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  }
  return (
    <section className="relative py-[clamp(1.5rem,4vw,3rem)]">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        className="mx-auto grid max-w-[var(--container)] grid-cols-1 gap-[clamp(1rem,2.5vw,1.5rem)] px-[var(--container-pad)] min-[640px]:grid-cols-3"
      >
        {regions.map((r, i) => (
          <motion.div
            key={i}
            variants={card}
            className="rounded-[1.1rem] border p-[clamp(1.25rem,3vw,1.75rem)] [background:var(--c-surface)] [border-color:oklch(0.26_0.022_260)]"
          >
            <div className="mb-4 flex items-center gap-3">
              {r.flag && <img src={r.flag} alt="" aria-hidden="true" className="h-7 w-auto shrink-0" />}
              <span className="[font-family:var(--font-display)] text-[1.1rem] font-bold uppercase tracking-[0.04em]" style={{ color: 'var(--c-ink)' }}>
                {r.name}
              </span>
            </div>
            <dl className="m-0 flex flex-col gap-2">
              {r.stats.map((s, j) => (
                <div key={j} className="flex items-baseline justify-between gap-3">
                  <dt className="text-[0.78rem] uppercase tracking-[0.06em] [font-family:var(--font-body)]" style={{ color: 'var(--c-muted)' }}>{s.label}</dt>
                  <dd className="m-0 [font-family:var(--font-display)] text-[1.15rem] font-black italic" style={{ color: 'var(--c-lime)' }}>{s.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
