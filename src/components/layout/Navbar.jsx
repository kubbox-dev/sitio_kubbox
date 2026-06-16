import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Experiencia', href: null, section: 'experiencia' },
  { label: 'Servicios',   href: null, section: 'servicios'   },
  { label: 'Contacto',    href: null, section: 'contacto'    },
]

// Página actual — cambiar al crear nuevas páginas
const CURRENT_PAGE = 'experiencia'

export default function Navbar() {
  const [scrolled,       setScrolled]       = useState(false)
  const [hidden,         setHidden]         = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const lastScrollY = useRef(0)

  /* ── Scroll: progress + opacity + auto-hide (mobile only) ── */
  useEffect(() => {
    const onScroll = () => {
      const y      = window.scrollY
      const maxY   = document.documentElement.scrollHeight - window.innerHeight
      const mobile = window.innerWidth < 768

      setScrollProgress(maxY > 0 ? Math.min(y / maxY, 1) : 0)
      setScrolled(y > 60)

      if (mobile && y > 280) {
        if (y > lastScrollY.current + 8) setHidden(true)
        if (y < lastScrollY.current - 8) setHidden(false)
      } else {
        setHidden(false)
      }

      lastScrollY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
    <style>{`
      @media (max-width: 430px) {
        .nb-link {
          padding: 0.26rem 0.32rem !important;
          font-size: 0.5rem !important;
          letter-spacing: 0.02em !important;
        }
        .nb-logo-wrap { padding: 0.12rem 0.3rem 0.12rem 0.22rem !important; }
        .nb-logo-wrap img { height: 1.15rem !important; }
        .nb-divider { margin-right: 0.08rem !important; }
      }
    `}</style>
    <motion.div
      initial={{ y: -96, opacity: 0 }}
      animate={{ y: hidden ? -120 : 0, opacity: hidden ? 0 : 1 }}
      transition={hidden
        ? { duration: 0.28, ease: [0.4, 0, 1, 1] }
        : { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
      }
      className="fixed top-5 left-1/2 -translate-x-1/2 z-50"
    >
      <div
        className="flex items-center rounded-full relative"
        style={{
          padding: '5px',
          background: scrolled
            ? 'oklch(0.11 0.028 260 / 0.95)'
            : 'oklch(0.11 0.025 260 / 0.68)',
          border: '1px solid oklch(0.26 0.022 260 / 0.60)',
          backdropFilter: 'blur(22px) saturate(1.4)',
          boxShadow: scrolled
            ? '0 8px 48px oklch(0.04 0.02 260 / 0.75), 0 1px 0 oklch(0.32 0.020 260 / 0.12) inset, 0 -1px 0 oklch(0.08 0.020 260 / 0.6) inset'
            : '0 4px 24px oklch(0.04 0.02 260 / 0.45), 0 1px 0 oklch(0.28 0.018 260 / 0.10) inset',
          transition: 'background 0.5s ease, box-shadow 0.5s ease',
        }}
      >
        {/* Decorativos en su propio wrapper — no recorta el contenido */}
        <div aria-hidden="true" className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
          {/* Shimmer superior */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
            background: 'linear-gradient(to right, transparent 8%, oklch(0.50 0.015 260 / 0.30) 40%, oklch(0.50 0.015 260 / 0.30) 60%, transparent 92%)',
          }} />
          {/* Barra de progreso */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0,
            height: '2px',
            width: `${scrollProgress * 100}%`,
            background: 'linear-gradient(to right, oklch(0.88 0.26 130 / 0.5), oklch(0.88 0.26 130 / 0.95))',
            transition: 'width 0.12s linear',
            borderRadius: '0 2px 0 0',
          }} />
        </div>

        {/* Logo */}
        <a
          href="#"
          className="nb-logo-wrap group relative flex items-center shrink-0 no-underline rounded-full"
          style={{ padding: '0.22rem 0.75rem 0.22rem 0.6rem' }}
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: 'oklch(0.88 0.26 130 / 0.07)', filter: 'blur(10px)' }}
          />
          <img
            src="/images/LOGO BUENO KUBBOX/LOGO KUBBOX BUENO.svg"
            alt="Kubbox"
            className="relative w-auto transition-transform duration-300 group-hover:scale-[1.04]"
            style={{ height: '1.9rem' }}
          />
        </a>

        {/* Divider */}
        <span
          aria-hidden="true"
          className="nb-divider w-px shrink-0"
          style={{
            height: '1.1rem',
            marginRight: '0.25rem',
            background: 'oklch(0.26 0.018 260 / 0.75)',
          }}
        />

        {/* Links */}
        {NAV_LINKS.map(({ label, href, section }) => (
          <TubeLink key={section} href={href} active={CURRENT_PAGE === section}>
            {label}
          </TubeLink>
        ))}
      </div>
    </motion.div>
    </>
  )
}

/* ── TubeLink ───────────────────────────────────── */
function TubeLink({ href, children, active }) {
  return (
    <a
      href={href ?? undefined}
      onClick={href ? undefined : e => e.preventDefault()}
      className="nb-link group relative rounded-full no-underline"
      style={{
        padding: '0.48rem 1.1rem',
        fontFamily: 'var(--font-body)',
        fontWeight: 600,
        fontSize: '0.78rem',
        letterSpacing: '0.10em',
        textTransform: 'uppercase',
        color: active ? 'var(--c-ink)' : 'oklch(0.46 0.014 260)',
        transition: 'color 0.2s ease',
        zIndex: 1,
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.color = 'oklch(0.82 0.008 260)' }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'oklch(0.46 0.014 260)' }}
    >
      {/* Hover bg (solo no-activo) */}
      {!active && (
        <span
          className="absolute inset-0 rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ background: 'oklch(0.16 0.024 260 / 0.7)' }}
        />
      )}

      {/* Active pill + tubelight */}
      {active && (
        <motion.span
          layoutId="tube-pill"
          className="absolute inset-0 rounded-full -z-10"
          style={{ background: 'oklch(0.17 0.030 260 / 0.95)' }}
          transition={{ type: 'spring', stiffness: 400, damping: 34 }}
        >
          {/* Barra lamp */}
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: -3,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '1.5rem',
              height: '3px',
              background: 'var(--c-lime)',
              borderRadius: '0 0 3px 3px',
              boxShadow: '0 0 10px var(--c-lime)',
            }}
          />
          {/* Halo exterior */}
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: -22,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '4rem',
              height: '2rem',
              background: 'oklch(0.88 0.26 130 / 0.13)',
              borderRadius: '50%',
              filter: 'blur(12px)',
            }}
          />
          {/* Halo interior */}
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: -11,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '2rem',
              height: '1rem',
              background: 'oklch(0.88 0.26 130 / 0.28)',
              borderRadius: '50%',
              filter: 'blur(5px)',
            }}
          />
        </motion.span>
      )}

      {children}
    </a>
  )
}
