import { motion, useReducedMotion } from 'framer-motion'

export default function StatGridBlock({ stats = [] }) {
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
        {stats.map((s, i) => (
          <motion.div
            key={i}
            variants={card}
            className="flex items-center gap-4 rounded-[1.1rem] border p-[clamp(1.25rem,3vw,1.75rem)] [background:var(--c-surface)] [border-color:oklch(0.26_0.022_260)]"
          >
            {s.icon && <img src={s.icon} alt="" aria-hidden="true" className="h-10 w-10 shrink-0 object-contain" />}
            <div className="min-w-0">
              <div className="[font-family:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-black italic leading-none" style={{ color: 'var(--c-lime)' }}>
                {s.value}
              </div>
              <div className="mt-1 text-[0.78rem] font-medium uppercase tracking-[0.08em] [font-family:var(--font-body)]" style={{ color: 'var(--c-muted)' }}>
                {s.label}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
