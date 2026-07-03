import { Link } from 'react-router-dom'

const SECTIONS = [
  {
    title: 'Servicios',
    links: [
      { label: 'Desarrollo Digital', href: '/servicios/desarrollo-digital' },
      { label: 'Nuestros Proyectos', href: '/proyectos' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Experiencia',  href: '/'         },
      { label: 'Blog',         href: '#'          },
      { label: 'Contacto',     href: '/contacto'  },
    ],
  },
]

const SOCIAL = [
  { Icon: IconInstagram, href: '#', label: 'Instagram' },
  { Icon: IconFacebook,  href: '#', label: 'Facebook'  },
  { Icon: IconLinkedin,  href: '#', label: 'LinkedIn'  },
]

export default function Footer() {
  return (
    <footer className="relative [background:oklch(0.07_0.020_260)]">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 block h-px opacity-70 [background:linear-gradient(to_right,transparent_5%,var(--c-lime)_40%,var(--c-lime)_60%,transparent_95%)]"
      />

      <div className="mx-auto max-w-[var(--container)] px-[var(--container-pad)] py-[clamp(3rem,6vw,5rem)]">

        {/* ── Main row: left brand + right sections ── */}
        <div className="flex w-full flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">

          {/* Left: logo + tagline + social */}
          <div className="flex flex-col gap-5 lg:max-w-[300px]">
            <Link to="/" className="block no-underline">
              <img
                src="/images/LOGO BUENO KUBBOX/Recurso 52.svg"
                alt="Kubbox"
                style={{ height: '3.2rem', width: 'auto', display: 'block' }}
              />
            </Link>

            <p
              className="text-[0.83rem] leading-relaxed"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--c-muted)' }}
            >
              Agencia de marketing digital y desarrollo web para marcas colombianas que quieren crecer en serio.
            </p>

            <div className="flex items-center gap-3">
              {SOCIAL.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-200"
                  style={{ borderColor: 'oklch(0.22 0.020 260)', color: 'var(--c-muted)' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color        = 'var(--c-lime)'
                    e.currentTarget.style.borderColor  = 'var(--c-lime)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color        = 'var(--c-muted)'
                    e.currentTarget.style.borderColor  = 'oklch(0.22 0.020 260)'
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Right: link sections */}
          <div className="grid grid-cols-2 gap-8 sm:gap-16">
            {SECTIONS.map(({ title, links }) => (
              <div key={title}>
                <h3
                  className="mb-4 text-[0.72rem] uppercase tracking-[0.10em]"
                  style={{ fontFamily: 'var(--font-body)', fontWeight: 700, color: 'var(--c-ink)' }}
                >
                  {title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        to={href}
                        className="text-[0.85rem] font-medium no-underline transition-colors duration-200"
                        style={{ fontFamily: 'var(--font-body)', color: 'var(--c-muted)' }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--c-ink)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--c-muted)')}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* ── Bottom bar ── */}
        <div
          className="mt-10 flex flex-col items-center justify-between gap-3 border-t pt-8 md:flex-row"
          style={{ borderColor: 'oklch(0.14 0.022 260)' }}
        >
          <p
            className="text-[0.78rem]"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--c-muted)' }}
          >
            © {new Date().getFullYear()} Kubbox. Todos los derechos reservados.
          </p>
          <p
            className="text-[0.78rem] tracking-[0.04em]"
            style={{ fontFamily: 'var(--font-body)', color: 'oklch(0.38 0.014 260)' }}
          >
            Agencia creativa · Medellín, Colombia
          </p>
        </div>

      </div>
    </footer>
  )
}

/* ── Inline brand icons ────────────────────────────────────────── */

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
