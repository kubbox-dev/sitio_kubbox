import { Camera, Users, Briefcase } from 'lucide-react'

const LINKS = [
  { label: 'Experiencia', href: '#experiencia' },
  { label: 'Servicios',   href: '#servicios' },
  { label: 'Contacto',    href: '#contacto' },
]

const SOCIAL = [
  { icon: Camera,   href: '#', label: 'Instagram' },
  { icon: Users,    href: '#', label: 'Facebook' },
  { icon: Briefcase, href: '#', label: 'LinkedIn' },
]

export default function Footer() {
  return (
    <footer
      style={{
        background: 'oklch(0.07 0.020 260)',
        borderTop: '1px solid oklch(0.16 0.025 260)',
        padding: '3rem var(--container-pad)',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--container)',
          marginInline: 'auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1.5rem',
        }}
      >
        {/* Logo */}
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: '1.5rem',
            color: 'var(--c-ink)',
            letterSpacing: '-0.01em',
          }}
        >
          kubbox
        </span>

        {/* Nav links */}
        <nav style={{ display: 'flex', gap: '2rem' }} aria-label="Footer navigation">
          {LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                fontWeight: 500,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--c-muted)',
                textDecoration: 'none',
                transition: 'color var(--transition-base)',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--c-ink)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--c-muted)')}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Social icons */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          {SOCIAL.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '2.25rem',
                height: '2.25rem',
                borderRadius: '50%',
                border: '1px solid oklch(0.22 0.020 260)',
                color: 'var(--c-muted)',
                textDecoration: 'none',
                transition: 'color var(--transition-base), border-color var(--transition-base)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--c-lime)'
                e.currentTarget.style.borderColor = 'var(--c-lime)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'var(--c-muted)'
                e.currentTarget.style.borderColor = 'oklch(0.22 0.020 260)'
              }}
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>

      <p
        style={{
          maxWidth: 'var(--container)',
          marginInline: 'auto',
          marginTop: '2rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid oklch(0.14 0.022 260)',
          fontFamily: 'var(--font-body)',
          fontSize: '0.8rem',
          color: 'var(--c-muted)',
          textAlign: 'center',
        }}
      >
        © {new Date().getFullYear()} Kubbox. Todos los derechos reservados.
      </p>
    </footer>
  )
}
