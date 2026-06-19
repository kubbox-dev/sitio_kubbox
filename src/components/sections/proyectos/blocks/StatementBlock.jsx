import { motion, useReducedMotion } from 'framer-motion'

const HOLLOW = { color: 'transparent', WebkitTextStroke: '1.5px oklch(0.98 0 0 / 0.6)' }

// eslint-disable-next-line no-unused-vars -- titleWhite kept for prop-contract parity with other blocks; unused by current Kellogg's content
export default function StatementBlock({ titleLime, titleWhite, tags = [], paragraphs = [], image, imageAlt = '' }) {
  const reduce = useReducedMotion()
  const rise = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  }
  return (
    <section className="relative py-[clamp(2.5rem,6vw,4.5rem)]">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        className={`mx-auto grid max-w-[var(--container)] grid-cols-1 gap-[clamp(1.5rem,4vw,3rem)] px-[var(--container-pad)] min-[900px]:items-center ${image ? 'min-[900px]:[grid-template-columns:1.3fr_1fr_1.05fr]' : 'min-[900px]:grid-cols-2'}`}
      >
        {image && (
          <motion.img variants={rise} src={image} alt={imageAlt} className="block h-auto w-full" />
        )}
        <div>
          <motion.h2 variants={rise} className="m-0 [font-family:var(--font-display)] text-[clamp(2.2rem,7vw,4.5rem)] font-black italic uppercase leading-[0.92] tracking-[-0.025em]" style={{ color: 'var(--c-lime)' }}>
            {titleLime}
          </motion.h2>
          {tags.length > 0 && (
            <motion.p variants={rise} className="mt-1 [font-family:var(--font-display)] text-[clamp(1.5rem,5vw,3rem)] font-black italic uppercase leading-[0.95] tracking-[-0.02em]" style={HOLLOW}>
              {tags.join(' · ')}
            </motion.p>
          )}
        </div>
        <div className="flex flex-col gap-4">
          {paragraphs.map((p, i) => (
            <motion.p key={i} variants={rise} className="m-0 text-[clamp(1rem,1.4vw,1.15rem)] italic leading-[1.7] [font-family:var(--font-body)]" style={{ color: 'var(--c-ink)', opacity: 0.9 }}>
              {p}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
