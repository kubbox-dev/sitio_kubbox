import { motion, useReducedMotion } from 'framer-motion'

const HOLLOW = { color: 'transparent', WebkitTextStroke: '1.5px oklch(0.98 0 0 / 0.6)' }

// eslint-disable-next-line no-unused-vars -- titleWhite kept for prop-contract parity with other blocks; unused by current Kellogg's content
export default function StatementBlock({ titleLime, titleWhite, tags = [], paragraphs = [], image, imageAlt = '' }) {
  const reduce = useReducedMotion()
  const rise = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  }

  // Layout with image: 2 columns — image (title overlaps its right edge) / tags+paragraphs.
  // Stacks as image, title, then text on mobile.
  if (image) {
    return (
      <section className="relative py-[clamp(2.5rem,6vw,4.5rem)]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="mx-auto grid max-w-[1440px] grid-cols-1 gap-[clamp(1.5rem,4vw,3rem)] px-[clamp(1rem,4vw,2rem)] min-[900px]:items-center min-[900px]:grid-cols-[1.3fr_1.1fr] min-[900px]:gap-x-[clamp(8rem,11vw,11.5rem)]"
        >
          <div className="relative">
            <motion.img variants={rise} src={image} alt={imageAlt} className="block h-auto w-full" />

            <motion.h2
              variants={rise}
              className="relative mt-[clamp(1rem,4vw,1.5rem)] [font-family:var(--font-display)] text-[clamp(2.2rem,5.5vw,3.5rem)] font-black italic uppercase leading-[0.92] tracking-[-0.025em] before:absolute before:inset-[-0.6rem] before:-z-10 before:rounded-[1rem] before:border before:[background:oklch(0.13_0.020_260_/_0.72)] before:[backdrop-filter:blur(8px)] before:[border-color:oklch(0.26_0.022_260)] min-[900px]:absolute min-[900px]:left-full min-[900px]:top-[60%] min-[900px]:mt-0 min-[900px]:w-[clamp(8.5rem,12vw,12.5rem)] min-[900px]:-translate-x-[15%] min-[900px]:-translate-y-1/2 min-[900px]:text-center"
              style={{ color: 'var(--c-lime)' }}
            >
              {titleLime}
            </motion.h2>
          </div>

          {/* Main text — tags act as its heading, paragraphs get the prominence */}
          <div>
            {tags.length > 0 && (
              <motion.h3 variants={rise} className="m-0 [font-family:var(--font-display)] text-[clamp(2.2rem,5.5vw,3.5rem)] font-black italic uppercase leading-[0.95] tracking-[-0.02em]" style={HOLLOW}>
                {tags.join(' · ')}
              </motion.h3>
            )}
            <motion.div variants={rise} aria-hidden="true" className="mt-4 h-[2px] w-[clamp(3rem,7vw,4.5rem)] [background:var(--c-lime)] opacity-80" />
            <div className="mt-6 flex max-w-[58ch] flex-col gap-5">
              {paragraphs.map((p, i) => (
                <motion.p key={i} variants={rise} className="m-0 text-[clamp(1.05rem,1.5vw,1.25rem)] italic leading-[1.7] [font-family:var(--font-body)]" style={{ color: 'var(--c-ink)', opacity: 0.92 }}>
                  {p}
                </motion.p>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    )
  }

  // Default layout (no image): title + tags | paragraphs
  return (
    <section className="relative py-[clamp(2.5rem,6vw,4.5rem)]">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        className="mx-auto grid max-w-[var(--container)] grid-cols-1 gap-[clamp(1.5rem,4vw,3rem)] px-[var(--container-pad)] min-[900px]:grid-cols-2 min-[900px]:items-center"
      >
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
