import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Experiencia', href: '#experiencia', section: 'experiencia' },
  { label: 'Servicios',   href: '#servicios',   section: 'servicios'   },
  { label: 'Contacto',    href: '#contacto',    section: 'contacto'    },
]

export default function Navbar() {
  const [scrolled,      setScrolled]      = useState(false)
  const [menuOpen,      setMenuOpen]      = useState(false)
  const [activeSection, setActiveSection] = useState('')

  /* Scroll blur + active section via IntersectionObserver */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })

    const sections = document.querySelectorAll('section[id]')
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) })
      },
      { threshold: 0.35 },
    )
    sections.forEach(s => io.observe(s))

    return () => {
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 'var(--z-sticky)',
        padding: '0.75rem var(--container-pad)',
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        transition: 'background var(--transition-base), backdrop-filter var(--transition-base), border-bottom-color var(--transition-base)',
        background: scrolled ? 'oklch(0.09 0.025 260 / 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid oklch(0.20 0.020 260)' : '1px solid transparent',
      }}
    >
      {/* Logo — columna izquierda */}
      <a href="#" style={{ justifySelf: 'start', display: 'flex', alignItems: 'center', textDecoration: 'none', lineHeight: 0 }}>
        <img
          src="/images/LOGO BUENO KUBBOX/LOGO KUBBOX BUENO.svg"
          alt="Kubbox Marketing Digital"
          style={{ height: '2.75rem', width: 'auto' }}
        />
      </a>

      {/* Nav links — columna central */}
      <nav aria-label="Navegación principal" style={{ display: 'flex', gap: '2.5rem' }} className="hidden-mobile">
        {NAV_LINKS.map(({ label, href, section }) => (
          <NavLink key={href} href={href} active={activeSection === section}>
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Mobile toggle — columna derecha */}
      <div style={{ justifySelf: 'end' }}>
        <button
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setMenuOpen(v => !v)}
          style={{
            background: 'none', border: 'none',
            color: 'var(--c-ink)', cursor: 'pointer', padding: '0.25rem',
            display: 'none',
          }}
          className="show-mobile"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              gridColumn: '1 / -1',
              position: 'absolute',
              top: '100%', left: 0, right: 0,
              background: 'oklch(0.10 0.025 260 / 0.97)',
              backdropFilter: 'blur(16px)',
              borderBottom: '1px solid oklch(0.20 0.020 260)',
              padding: '1.5rem var(--container-pad)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            {NAV_LINKS.map(({ label, href, section }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: activeSection === section ? 'var(--c-lime)' : 'var(--c-ink)',
                  textDecoration: 'none',
                }}
              >
                {label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

function NavLink({ href, children, active }) {
  return (
    <a
      href={href}
      style={{
        fontFamily: 'var(--font-body)',
        fontWeight: 500,
        fontSize: '0.9rem',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: active ? 'var(--c-ink)' : 'var(--c-muted)',
        textDecoration: 'none',
        position: 'relative',
        paddingBottom: '3px',
        transition: 'color var(--transition-base)',
      }}
      onMouseEnter={e => (e.currentTarget.style.color = 'var(--c-ink)')}
      onMouseLeave={e => (e.currentTarget.style.color = active ? 'var(--c-ink)' : 'var(--c-muted)')}
    >
      {children}
      {/* Underline activo — barra lime */}
      {active && (
        <motion.span
          layoutId="nav-underline"
          style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: '2px',
            background: 'var(--c-lime)',
            borderRadius: '1px',
          }}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
    </a>
  )
}
