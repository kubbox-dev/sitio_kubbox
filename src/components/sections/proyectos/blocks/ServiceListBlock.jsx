import { useReducedMotion } from 'framer-motion'
import * as m from 'motion/react-m'
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
      <m.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        className="relative mx-auto max-w-[var(--container)] overflow-hidden rounded-[1.5rem] border px-[clamp(1.5rem,4vw,2.5rem)] py-[clamp(1.5rem,4vw,2.25rem)] [background:oklch(0.13_0.020_260_/_0.85)] [backdrop-filter:blur(14px)] [border-color:oklch(0.26_0.022_260)] [box-shadow:0_40px_110px_-40px_oklch(0.03_0.02_260_/_0.9)]"
      >
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[2px] opacity-60 [background:linear-gradient(to_right,transparent_5%,var(--c-lime)_40%,var(--c-lime)_60%,transparent_95%)]" />
        <span aria-hidden="true" className="pointer-events-none absolute left-4 top-4 h-[18px] w-[18px] border-[1.5px] border-b-0 border-r-0 [border-color:oklch(0.88_0.26_130_/_0.4)]" />
        <span aria-hidden="true" className="pointer-events-none absolute bottom-4 right-4 h-[18px] w-[18px] border-[1.5px] border-l-0 border-t-0 [border-color:oklch(0.88_0.26_130_/_0.4)]" />

        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-10">
          {services.map((s, i) => {
            const Icon = ICONS[s.icon] ?? Code2
            return (
              <m.div
                key={i}
                variants={item}
                whileHover={reduce ? undefined : { x: 4 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-4 border-b py-[clamp(1.1rem,2.5vw,1.4rem)] [border-color:oklch(0.24_0.02_260)]"
              >
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                  style={{ background: 'var(--c-cta-bg)', boxShadow: '0 0 22px var(--glow-lime)' }}
                >
                  <Icon size={20} strokeWidth={2.25} style={{ color: 'var(--c-cta-ink)' }} />
                </span>
                <p className="m-0 text-[clamp(1rem,1.6vw,1.15rem)] leading-snug [font-family:var(--font-body)]" style={{ color: 'var(--c-ink)' }}>
                  <span className="mr-2 [font-family:var(--font-display)] font-bold" style={{ color: 'var(--c-muted)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {s.label}
                </p>
              </m.div>
            )
          })}
        </div>
      </m.div>
    </section>
  )
}
