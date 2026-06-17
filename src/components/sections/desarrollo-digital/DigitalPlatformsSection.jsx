import { motion } from 'framer-motion'

const LOGOS = [
  { src: '/images/DESARROLLO DIGITAL/WEB/logos/laravel.svg', alt: 'Laravel' },
  { src: '/images/DESARROLLO DIGITAL/WEB/logos/php.svg', alt: 'PHP' },
  { src: '/images/DESARROLLO DIGITAL/WEB/logos/wordpress.svg', alt: 'WordPress' },
]

export default function DigitalPlatformsSection() {
  return (
    <section style={{ position: 'relative', paddingBlock: 'clamp(2.5rem, 6vw, 4.5rem)', textAlign: 'center' }}>
      <div
        style={{
          maxWidth: 'var(--container)',
          marginInline: 'auto',
          paddingInline: 'var(--container-pad)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <motion.h2
          className="dd-platforms-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="dd-platforms-solid">NUESTRAS</span>{' '}
          <span className="dd-platforms-outline">PLATAFORMAS</span>
        </motion.h2>

        <motion.div
          className="dd-logos-row"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } }}
        >
          {LOGOS.map((logo) => (
            <motion.img
              key={logo.alt}
              src={logo.src}
              alt={logo.alt}
              className="dd-logo"
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
              }}
            />
          ))}
        </motion.div>
      </div>

      <style>{`
        .dd-platforms-heading {
          font-family: var(--font-display);
          font-weight: 900;
          font-style: italic;
          font-size: clamp(2rem, 6vw, 3.5rem);
          letter-spacing: -0.02em;
          line-height: 1;
          margin: 0 0 clamp(2rem, 4vw, 3rem);
        }
        .dd-platforms-solid {
          color: var(--c-lime);
          -webkit-text-stroke: 1.5px var(--c-lime);
        }
        .dd-platforms-outline {
          color: transparent;
          -webkit-text-stroke: 1.5px oklch(0.98 0 0 / 0.85);
        }

        .dd-logos-row {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: clamp(2.5rem, 6vw, 4.5rem);
        }
        .dd-logo {
          height: clamp(28px, 4vw, 40px);
          width: auto;
          opacity: 0.92;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .dd-logo:hover {
          opacity: 1;
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  )
}
