import { motion, useReducedMotion } from 'framer-motion'

export default function MediaGalleryBlock({ items = [], columns = 2 }) {
  const reduce = useReducedMotion()
  const card = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  }
  return (
    <section className="relative py-[clamp(1.5rem,4vw,3rem)]">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        className="mx-auto grid max-w-[var(--container)] grid-cols-1 gap-[clamp(1.25rem,3vw,2rem)] px-[var(--container-pad)] min-[700px]:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))]"
        style={{ '--cols': columns }}
      >
        {items.map((it, i) => (
          <motion.figure
            key={i}
            variants={card}
            className="relative m-0 overflow-hidden rounded-[1.1rem] border [background:oklch(0.13_0.020_260_/_0.7)] [backdrop-filter:blur(10px)] [border-color:oklch(0.26_0.022_260)]"
          >
            <img src={it.src} alt={it.alt || ''} className="block h-auto w-full" />
          </motion.figure>
        ))}
      </motion.div>
    </section>
  )
}
