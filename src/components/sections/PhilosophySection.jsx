import { motion } from 'framer-motion'


const BELIEFS = [
  {
    number: '01',
    title: 'Diseño con propósito',
    quote: 'Lo visual no es un adorno,\nes la forma en que se entienden.',
    accent: 'var(--c-lime)',
  },
  {
    number: '02',
    title: 'Identidad que permanece',
    quote: 'Cuando la identidad se construye bien,\nla marca encuentra su rol en el mundo.',
    accent: 'var(--c-teal)',
  },
  {
    number: '03',
    title: 'Detalles que importan',
    quote: 'Cada detalle cuenta cuando\nse diseña con intención.',
    accent: 'var(--c-lime)',
  },
]

const TAGLINE =
  'Nuestro trabajo es que esa historia se vea, se sienta y permanezca. Por eso acompañamos a cada marca en procesos creativos que deben comunicar y reforzar su presencia. Ofrecemos soluciones visuales para que cada identidad tenga las formas que le funcionan.'

export default function PhilosophySection() {
  return (
    <section style={{ paddingBlock: 'clamp(4rem, 10vw, 7rem)', position: 'relative', overflow: 'hidden', background: 'var(--c-bg)', marginTop: '-1px' }}>
      

      {/* Subtle dot-grid texture */}
      <div aria-hidden="true" className="phil-grid-bg" />

      <div style={{ maxWidth: 'var(--container)', marginInline: 'auto', paddingInline: 'var(--container-pad)', position: 'relative', zIndex: 1 }}>

        {/* ── Editorial heading ─────────────────────────────────── */}
        <div className="phil-head">
          <div className="phil-kicker">
            <span className="phil-kicker-line" />
            <span>Identidad y Propósito</span>
          </div>
          <div className="phil-headline-block">
            <motion.h2
              className="phil-heading-solid"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              NUESTRA
            </motion.h2>
            <motion.span
              className="phil-heading-outline"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            >
              FILOSOFÍA
            </motion.span>
          </div>
        </div>

        {/* ── Belief cards ─────────────────────────────────────── */}
        <motion.div
          className="phil-beliefs"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.14 } } }}
        >
          {BELIEFS.map(({ number, title, quote, accent }) => (
            <motion.div
              key={number}
              className="phil-card"
              style={{ '--accent': accent }}
              variants={{
                hidden: { opacity: 0, y: 36 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              <div className="phil-card-top">
                <span className="phil-card-number">{number}</span>
                <div className="phil-card-accent-line" />
              </div>
              <h3 className="phil-card-title">{title}</h3>
              <p className="phil-card-quote">{quote}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Tagline ───────────────────────────────────────────── */}
        <motion.div
          className="phil-tagline-wrap"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div aria-hidden="true" className="phil-tagline-deco">◆</div>
          <p className="phil-tagline">{TAGLINE}</p>
        </motion.div>
      </div>

      <style>{`
        /* Subtle grid lines */
        .phil-grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(oklch(0.30 0.02 260 / 0.07) 1px, transparent 1px),
            linear-gradient(90deg, oklch(0.30 0.02 260 / 0.07) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 80%);
          pointer-events: none;
          z-index: 0;
        }

        /* Editorial heading */
        .phil-head { margin-bottom: clamp(2rem, 5vw, 3.5rem); }

        .phil-kicker {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          margin-bottom: 0.5rem;
        }
        .phil-kicker-line {
          width: clamp(2rem, 6vw, 4rem);
          height: 1px;
          background: oklch(0.62 0.015 260 / 0.6);
          display: inline-block;
        }
        .phil-kicker span:last-child {
          font-family: var(--font-display);
          font-weight: 700;
          font-style: italic;
          font-size: clamp(0.65rem, 1.2vw, 0.85rem);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: oklch(0.62 0.015 260);
        }

        .phil-headline-block {
          display: flex;
          flex-direction: column;
        }
        .phil-heading-solid {
          font-family: var(--font-display);
          font-weight: 900;
          font-style: italic;
          font-size: clamp(2.75rem, 13vw, 12rem);
          letter-spacing: -0.03em;
          text-transform: uppercase;
          color: var(--c-ink);
          margin: 0;
          line-height: 0.86;
        }
        .phil-heading-outline {
          display: block;
          font-family: var(--font-display);
          font-weight: 900;
          font-style: italic;
          font-size: clamp(2.5rem, 12.5vw, 11.5rem);
          letter-spacing: -0.03em;
          text-transform: uppercase;
          color: transparent;
          -webkit-text-stroke: clamp(1px, 0.18vw, 2.5px) oklch(0.98 0 0 / 0.65);
          line-height: 0.86;
          align-self: flex-end;
          margin-top: -0.1em;
        }

        /* Belief cards */
        .phil-beliefs {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(1rem, 2.5vw, 1.75rem);
          margin-bottom: clamp(2.5rem, 6vw, 4.5rem);
        }

        .phil-card {
          background: oklch(0.13 0.020 260 / 0.78);
          border: 1px solid oklch(0.26 0.022 260 / 0.7);
          border-radius: 1rem;
          padding: clamp(1.5rem, 3vw, 2.25rem);
          backdrop-filter: blur(14px);
          position: relative;
          overflow: hidden;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }
        /* Top accent stripe */
        .phil-card::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: var(--accent);
          border-radius: 1rem 1rem 0 0;
        }
        /* Corner radial glow */
        .phil-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 0% 0%, var(--accent) 0%, transparent 55%);
          opacity: 0.07;
          pointer-events: none;
        }
        .phil-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 28px 70px -18px oklch(0.04 0.02 260 / 0.7),
                      0 0 0 1px oklch(0.88 0.26 130 / 0.08);
        }

        .phil-card-top {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.25rem;
        }
        .phil-card-number {
          font-family: var(--font-display);
          font-weight: 900;
          font-style: italic;
          font-size: clamp(2.5rem, 5vw, 4rem);
          line-height: 1;
          color: transparent;
          -webkit-text-stroke: 1.5px var(--accent);
          opacity: 0.5;
          flex-shrink: 0;
        }
        .phil-card-accent-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right, var(--accent), transparent);
          opacity: 0.45;
        }
        .phil-card-title {
          font-family: var(--font-display);
          font-weight: 800;
          font-style: italic;
          font-size: clamp(1.1rem, 2vw, 1.45rem);
          text-transform: uppercase;
          letter-spacing: -0.01em;
          color: var(--c-ink);
          margin-bottom: 0.85rem;
          line-height: 1.1;
        }
        .phil-card-quote {
          font-family: var(--font-body);
          font-style: italic;
          font-size: clamp(0.88rem, 1.3vw, 1.02rem);
          color: oklch(0.68 0.010 260);
          line-height: 1.65;
          white-space: pre-line;
        }

        /* Tagline */
        .phil-tagline-wrap { text-align: center; }
        .phil-tagline-deco {
          color: var(--c-lime);
          font-size: 0.5rem;
          margin-bottom: 1.25rem;
          opacity: 0.55;
        }
        .phil-tagline {
          font-family: var(--font-body);
          font-size: clamp(1rem, 1.8vw, 1.15rem);
          color: var(--c-muted);
          line-height: 1.75;
          max-width: 68ch;
          margin-inline: auto;
          text-wrap: pretty;
        }

        /* Responsive */
        @media (max-width: 880px) {
          .phil-beliefs { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 520px) {
          .phil-beliefs { grid-template-columns: 1fr; }
          .phil-heading-outline { align-self: flex-start; }
        }
      `}</style>
    </section>
  )
}
