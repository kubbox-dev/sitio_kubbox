import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export default function ProjectCard({ number, title, category, description, imageSrc, imageAlt }) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
      style={{
        flexShrink: 0,
        width: 'clamp(300px, 38vw, 520px)',
        background: 'var(--c-surface)',
        borderRadius: '1rem',
        overflow: 'hidden',
        border: '1px solid oklch(0.20 0.022 260)',
        cursor: 'pointer',
        transition: 'border-color var(--transition-base)',
        position: 'relative',
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--c-lime)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'oklch(0.20 0.022 260)')}
    >
      {/* Image */}
      <div style={{ aspectRatio: '16/9', overflow: 'hidden', background: 'oklch(0.12 0.022 260)' }}>
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt || title}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
            onMouseEnter={e => (e.target.style.transform = 'scale(1.04)')}
            onMouseLeave={e => (e.target.style.transform = 'scale(1)')}
          />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, oklch(0.14 0.028 260), oklch(0.18 0.030 200))',
            }}
          >
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '3rem', color: 'oklch(0.28 0.025 260)' }}>
              {number}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
          <div>
            {category && (
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--c-lime)',
                display: 'block',
                marginBottom: '0.375rem',
              }}>
                {category}
              </span>
            )}
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(1.25rem, 2.5vw, 1.625rem)',
              letterSpacing: '-0.01em',
              color: 'var(--c-ink)',
              lineHeight: 1.2,
            }}>
              {title}
            </h3>
          </div>
          <div style={{
            flexShrink: 0,
            width: '2.25rem',
            height: '2.25rem',
            border: '1px solid oklch(0.25 0.022 260)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--c-muted)',
            marginLeft: '1rem',
          }}>
            <ArrowUpRight size={16} />
          </div>
        </div>
        {description && (
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            color: 'var(--c-muted)',
            lineHeight: 1.6,
            maxWidth: '52ch',
          }}>
            {description}
          </p>
        )}
      </div>

      {/* Number badge */}
      <div style={{
        position: 'absolute',
        bottom: '1rem',
        right: '1.5rem',
        fontFamily: 'var(--font-display)',
        fontWeight: 900,
        fontSize: '4rem',
        lineHeight: 1,
        color: 'oklch(0.22 0.022 260)',
        userSelect: 'none',
        pointerEvents: 'none',
      }}>
        {String(number).padStart(2, '0')}
      </div>
    </motion.article>
  )
}
