import { Link } from 'react-router-dom'

const LINKS = [
  { label: 'Experiencia', href: '/' },
  { label: 'Servicios',   href: '/servicios/desarrollo-digital' },
  { label: 'Contacto',    href: '/contacto' },
]

const SOCIAL = [
  { Icon: IconInstagram, href: '#', label: 'Instagram' },
  { Icon: IconFacebook,  href: '#', label: 'Facebook' },
  { Icon: IconLinkedin,  href: '#', label: 'LinkedIn' },
]

export default function Footer() {
  return (
    <footer className="relative [background:oklch(0.07_0.020_260)]">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 block h-px opacity-70 [background:linear-gradient(to_right,transparent_5%,var(--c-lime)_40%,var(--c-lime)_60%,transparent_95%)]"
      />

      <div className="mx-auto grid max-w-[var(--container)] grid-cols-1 items-center justify-center gap-10 px-[var(--container-pad)] py-[clamp(2.5rem,5vw,3.5rem)] text-center min-[700px]:grid-cols-3 min-[700px]:items-start min-[700px]:text-left">
        {/* Logo + tagline */}
        <div className="flex flex-col items-center gap-2 min-[700px]:items-start min-[700px]:justify-self-start">
          <Link to="/" className="block no-underline">
            <img
              src="/images/LOGO BUENO KUBBOX/Recurso 52.svg"
              alt="Kubbox"
              style={{ height: '2.5rem', width: 'auto', display: 'block' }}
            />
          </Link>
          <span className="text-[0.78rem] tracking-[0.04em]" style={{ fontFamily: 'var(--font-body)', color: 'var(--c-muted)' }}>
            Agencia creativa · Medellín, Colombia
          </span>
        </div>

        {/* Nav links */}
        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-8 gap-y-2 min-[700px]:justify-self-center">
          {LINKS.map(({ label, href }) => (
            <Link
              key={href}
              to={href}
              className="text-[0.85rem] font-medium uppercase tracking-[0.06em] no-underline transition-colors duration-200"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--c-muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--c-ink)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--c-muted)')}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Social icons */}
        <div className="flex justify-center gap-3 min-[700px]:justify-self-end">
          {SOCIAL.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-200"
              style={{ borderColor: 'oklch(0.22 0.020 260)', color: 'var(--c-muted)' }}
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
        className="mx-auto max-w-[var(--container)] border-t px-[var(--container-pad)] py-6 text-center text-[0.78rem]"
        style={{ borderColor: 'oklch(0.14 0.022 260)', fontFamily: 'var(--font-body)', color: 'var(--c-muted)' }}
      >
        © {new Date().getFullYear()} Kubbox. Todos los derechos reservados.
      </p>
    </footer>
  )
}

/* ── Brand icons (lucide-react ships no brand glyphs; matched to its stroke style) ── */

function IconInstagram({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function IconFacebook({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function IconLinkedin({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}
