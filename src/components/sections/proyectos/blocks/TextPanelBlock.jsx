import { motion } from 'framer-motion'

export default function TextPanelBlock({ eyebrow, text }) {
  return (
    <section className="relative py-[clamp(2rem,5vw,3.5rem)]">
      <div className="mx-auto max-w-[var(--container)] px-[var(--container-pad)]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[1.5rem] border px-[clamp(2rem,5vw,3.5rem)] py-[clamp(2.5rem,6vw,3.5rem)] text-center [background:oklch(0.13_0.020_260_/_0.85)] [backdrop-filter:blur(14px)] [border-color:oklch(0.26_0.022_260)] [box-shadow:0_40px_110px_-40px_oklch(0.03_0.02_260_/_0.9)]"
        >
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px] opacity-60 [background:linear-gradient(to_right,transparent_5%,var(--c-lime)_40%,var(--c-lime)_60%,transparent_95%)]" />
          <span aria-hidden="true" className="absolute left-4 top-4 h-[18px] w-[18px] border-[1.5px] border-b-0 border-r-0 [border-color:oklch(0.88_0.26_130_/_0.4)]" />
          <span aria-hidden="true" className="absolute bottom-4 right-4 h-[18px] w-[18px] border-[1.5px] border-l-0 border-t-0 [border-color:oklch(0.88_0.26_130_/_0.4)]" />

          {eyebrow && (
            <p className="mb-3 [font-family:var(--font-display)] text-[0.9rem] font-bold uppercase tracking-[0.12em]" style={{ color: 'var(--c-lime)' }}>
              {eyebrow}
            </p>
          )}
          <p className="m-0 mx-auto max-w-[60ch] text-[clamp(1.05rem,1.8vw,1.4rem)] italic leading-[1.62] [font-family:var(--font-body)] [text-wrap:pretty]" style={{ color: 'var(--c-ink)', opacity: 0.95 }}>
            {text}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
