import { motion, useReducedMotion } from 'framer-motion'
import { Megaphone, Gamepad2, Trophy, Code2, Gauge } from 'lucide-react'

const ICONS = { megaphone: Megaphone, gamepad: Gamepad2, trophy: Trophy, code: Code2, gauge: Gauge }

export default function ServiceListBlock({ services = [] }) {
  const reduce = useReducedMotion()
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section className="relative py-[clamp(2rem,5vw,3.5rem)]">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        className="mx-auto max-w-[var(--container)] px-[var(--container-pad)]"
      >
        {services.map((s, i) => {
          const Icon = ICONS[s.icon] ?? Code2
          return (
            <motion.div
              key={i}
              variants={item}
              className="flex items-center gap-4 border-t py-[clamp(1rem,2.5vw,1.25rem)] [border-color:oklch(0.24_0.02_260)] last:border-b"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border" style={{ borderColor: 'var(--c-lime)', color: 'var(--c-lime)' }}>
                <Icon size={18} strokeWidth={2.25} />
              </span>
              <p className="m-0 text-[clamp(1rem,1.6vw,1.15rem)] [font-family:var(--font-body)]" style={{ color: 'var(--c-ink)' }}>
                {s.label}
              </p>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
