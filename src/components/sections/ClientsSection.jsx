import { motion } from 'framer-motion'

const CLIENTS = [
  { name: 'Pollocao',          src: '/images/HOME/WEB/Logos/pollocoa logo.svg' },
  { name: 'F-rixo',            src: '/images/HOME/WEB/Logos/frixo logo.svg' },
  { name: 'Chocolisto',        src: '/images/HOME/WEB/Logos/chocolisto logo.svg', filter: 'invert(1) grayscale(1)' },
  { name: 'Corona',            src: '/images/HOME/WEB/Logos/corona logo.svg',     filter: 'invert(1) grayscale(1)' },
  { name: 'Centro Automotriz', src: '/images/HOME/WEB/Logos/centro automotriz logo.svg' },
  { name: 'Brand Plus',        src: '/images/HOME/WEB/Logos/brand plus logo.svg' },
  { name: 'Grupointer',        src: '/images/HOME/WEB/Logos/grupointer logo.svg' },
  { name: 'Suimagen',          src: '/images/HOME/WEB/Logos/suimagen logo.svg' },
  { name: 'Biorgánicos',       src: '/images/HOME/WEB/Logos/biorganicos logo.svg' },
  { name: 'Única Fem',         src: '/images/HOME/WEB/Logos/unica fem logo.svg' },
]

export default function ClientsSection() {
  return (
    <section
      style={{
        paddingBlock: 'clamp(3rem, 7vw, 5rem)',
        position: 'relative',
        marginTop: '-1px',
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
        {/* Fade edges */}
        <div aria-hidden="true" style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '8rem',
          background: 'linear-gradient(to right, var(--c-bg), transparent)',
          zIndex: 2, pointerEvents: 'none',
        }} />
        <div aria-hidden="true" style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '8rem',
          background: 'linear-gradient(to left, var(--c-bg), transparent)',
          zIndex: 2, pointerEvents: 'none',
        }} />
        <MarqueeTrack />
        <MarqueeTrack offset={-20} />
      </div>
    </section>
  )
}

function MarqueeTrack({ offset = 0 }) {
  const doubled = [...CLIENTS, ...CLIENTS]
  return (
    <motion.div
      animate={{ x: ['0%', '-50%'] }}
      transition={{ repeat: Infinity, duration: 35, ease: 'linear', delay: offset < 0 ? Math.abs(offset) : 0 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '3.5rem',
        flexShrink: 0,
        willChange: 'transform',
        paddingInline: '2rem',
      }}
    >
      {doubled.map((client, i) => (
        <div
          key={`${client.name}-${i}`}
          style={{
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '3.5rem',
          }}
        >
          <img
            src={client.src}
            alt={client.name}
            style={{
              height: '2.25rem',
              width: 'auto',
              maxWidth: '120px',
              objectFit: 'contain',
              filter: client.filter ?? 'brightness(0) invert(1)',
              opacity: 0.65,
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '1' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '0.65' }}
          />
          <span aria-hidden="true" style={{ color: 'var(--c-lime)', fontSize: '0.4rem', opacity: 0.4 }}>◆</span>
        </div>
      ))}
    </motion.div>
  )
}
