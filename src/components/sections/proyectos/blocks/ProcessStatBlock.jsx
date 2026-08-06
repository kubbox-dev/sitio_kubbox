import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function ProcessStatBlock({ steps = [] }) {
  const reduce = useReducedMotion()
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section className="relative py-[clamp(2rem,5vw,3.5rem)]">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        className="mx-auto flex max-w-[var(--container)] flex-col items-stretch gap-4 px-[var(--container-pad)] min-[860px]:flex-row min-[860px]:items-center"
      >
        {steps.map((step, i) => (
          <motion.div key={i} variants={item} className="flex flex-1 items-center gap-4">
            <div className="flex-1 rounded-[1.1rem] border p-[clamp(1.5rem,3vw,2rem)] [background:var(--c-surface)] [border-color:oklch(0.26_0.022_260)]">
              {step.stat ? (
                <>
                  <p className="m-0 [font-family:var(--font-display)] text-[clamp(2.75rem,6vw,3.75rem)] font-black italic leading-none" style={{ color: 'var(--c-lime)' }}>
                    {step.stat}
                  </p>
                  <p className="mt-2 text-[0.78rem] font-semibold uppercase tracking-[0.08em] [font-family:var(--font-body)]" style={{ color: 'var(--c-muted)' }}>
                    {step.label}
                  </p>
                </>
              ) : (
                <>
                  <p className="m-0 [font-family:var(--font-display)] text-[1.1rem] font-bold uppercase tracking-[0.02em]" style={{ color: 'var(--c-ink)' }}>
                    {step.label}
                  </p>
                  <p className="mt-2 text-[0.95rem] italic leading-[1.6] [font-family:var(--font-body)]" style={{ color: 'var(--c-ink)', opacity: 0.8 }}>
                    {step.text}
                  </p>
                </>
              )}
            </div>
            {i < steps.length - 1 && (
              <ArrowRight aria-hidden="true" size={22} className="hidden shrink-0 min-[860px]:block" style={{ color: 'var(--c-lime)', opacity: 0.5 }} />
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
