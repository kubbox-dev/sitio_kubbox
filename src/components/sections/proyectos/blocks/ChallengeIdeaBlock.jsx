import { motion, useReducedMotion } from 'framer-motion'

const HOLLOW = { color: 'transparent', WebkitTextStroke: '1.5px oklch(0.98 0 0 / 0.6)' }
const GHOST_NUM = { color: 'transparent', WebkitTextStroke: '1.5px var(--c-lime)', opacity: 0.55 }

function Column({ data, reveal }) {
  return (
    <motion.div variants={reveal}>
      <span aria-hidden="true" className="block [font-family:var(--font-display)] text-[clamp(3rem,8vw,4.5rem)] font-black italic leading-none" style={GHOST_NUM}>
        {data.number}
      </span>
      <h3 className="mt-2 [font-family:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-black italic uppercase leading-[0.95] tracking-[-0.02em]" style={{ color: 'var(--c-lime)' }}>
        {data.title}
      </h3>
      {data.tags?.length > 0 && (
        <p className="mt-1 [font-family:var(--font-display)] text-[clamp(1.2rem,3vw,1.6rem)] font-black italic uppercase leading-[0.95] tracking-[-0.02em]" style={HOLLOW}>
          {data.tags.join(' · ')}
        </p>
      )}
      <div className="mt-5 flex max-w-[46ch] flex-col gap-4">
        {data.paragraphs.map((p, i) => (
          <p key={i} className="m-0 text-[clamp(1rem,1.4vw,1.1rem)] italic leading-[1.7] [font-family:var(--font-body)]" style={{ color: 'var(--c-ink)', opacity: 0.9 }}>
            {p}
          </p>
        ))}
      </div>
    </motion.div>
  )
}

export default function ChallengeIdeaBlock({ challenge, idea, image, imageAlt = '' }) {
  const reduce = useReducedMotion()
  const rise = {
    hidden: { opacity: 0, y: reduce ? 0 : 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  }

  return (
    <section className="relative py-[clamp(2.5rem,6vw,4.5rem)]">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
        className="mx-auto grid max-w-[var(--container)] grid-cols-1 gap-x-[clamp(2rem,6vw,5rem)] gap-y-[clamp(2.5rem,6vw,3.5rem)] px-[var(--container-pad)] min-[860px]:grid-cols-2"
      >
        <Column data={challenge} reveal={rise} />
        <Column data={idea} reveal={rise} />
      </motion.div>

      {image && (
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto mt-[clamp(2.5rem,6vw,4rem)] max-w-[var(--container)] px-[var(--container-pad)]"
        >
          <div className="relative overflow-hidden rounded-[1.25rem] border [border-color:oklch(0.26_0.022_260)] [background:var(--c-surface)]">
            <img src={image} alt={imageAlt} className="block h-auto w-full" />
            <span aria-hidden="true" className="pointer-events-none absolute left-4 top-4 h-[18px] w-[18px] border-[1.5px] border-b-0 border-r-0 [border-color:oklch(0.88_0.26_130_/_0.4)]" />
            <span aria-hidden="true" className="pointer-events-none absolute bottom-4 right-4 h-[18px] w-[18px] border-[1.5px] border-l-0 border-t-0 [border-color:oklch(0.88_0.26_130_/_0.4)]" />
          </div>
        </motion.div>
      )}
    </section>
  )
}
