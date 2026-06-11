import { motion } from 'framer-motion'

const CLIENTS = ['Pollocao', 'F-rixo', 'CAM', "Kellogg's", 'Pollocao', 'F-rixo', 'CAM', "Kellogg's"]

export default function ClientsSection() {
  return (
    <section
      style={{
        paddingBlock: 'clamp(3rem, 7vw, 5rem)',
        borderTop: '1px solid oklch(0.16 0.022 260)',
        borderBottom: '1px solid oklch(0.16 0.022 260)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 'var(--container)', marginInline: 'auto', paddingInline: 'var(--container-pad)', marginBottom: '2.5rem', textAlign: 'center' }}>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.8rem',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--c-muted)',
        }}>
          Marcas que confían en nosotros
        </p>
      </div>

      {/* Marquee */}
      <div style={{ position: 'relative', display: 'flex', overflow: 'hidden' }}>
        <MarqueeTrack />
        <MarqueeTrack delay={-20} />
      </div>
    </section>
  )
}

function MarqueeTrack({ delay = 0 }) {
  return (
    <motion.div
      animate={{ x: ['0%', '-50%'] }}
      transition={{ repeat: Infinity, duration: 30, ease: 'linear', delay }}
      style={{
        display: 'flex',
        gap: '4rem',
        flexShrink: 0,
        willChange: 'transform',
        paddingInline: '2rem',
      }}
    >
      {[...CLIENTS, ...CLIENTS].map((name, i) => (
        <div
          key={`${name}-${i}`}
          style={{
            flexShrink: 0,
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: 'clamp(1.25rem, 3vw, 2rem)',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: i % 3 === 0 ? 'var(--c-ink)' : 'var(--c-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          {name}
          <span style={{ color: 'var(--c-lime)', fontSize: '0.5em' }}>◆</span>
        </div>
      ))}
    </motion.div>
  )
}
