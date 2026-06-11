import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Experiencia', href: '#experiencia' },
  { label: 'Servicios',   href: '#servicios' },
  { label: 'Contacto',    href: '#contacto' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 'var(--z-sticky)',
        padding: '0.875rem var(--container-pad)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: '100%',
        transition: 'background var(--transition-base), backdrop-filter var(--transition-base), border-bottom-color var(--transition-base)',
        background: scrolled ? 'oklch(0.09 0.025 260 / 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid oklch(0.20 0.020 260)' : '1px solid transparent',
      }}
    >
      {/* Logo */}
      <a
        href="#"
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 900,
          fontSize: '1.5rem',
          letterSpacing: '-0.01em',
          color: 'var(--c-ink)',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            width: '1.75rem',
            height: '1.75rem',
            background: 'var(--c-lime)',
            borderRadius: '0.25rem',
            transform: 'rotate(12deg)',
          }}
        />
        kubbox
      </a>

      {/* Desktop nav */}
      <nav aria-label="Navegación principal" style={{ display: 'flex', gap: '2.5rem' }} className="hidden-mobile">
        {NAV_LINKS.map(({ label, href }) => (
          <NavLink key={href} href={href}>{label}</NavLink>
        ))}
      </nav>

      {/* Mobile toggle */}
      <button
        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        onClick={() => setMenuOpen(v => !v)}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--c-ink)',
          cursor: 'pointer',
          padding: '0.25rem',
          display: 'none',
        }}
        className="show-mobile"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'oklch(0.10 0.025 260 / 0.97)',
              backdropFilter: 'blur(16px)',
              borderBottom: '1px solid oklch(0.20 0.020 260)',
              padding: '1.5rem var(--container-pad)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            {NAV_LINKS.map(({ label, href }) => (
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
                  color: 'var(--c-ink)',
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

function NavLink({ href, children }) {
  return (
    <a
      href={href}
      style={{
        fontFamily: 'var(--font-body)',
        fontWeight: 500,
        fontSize: '0.9rem',
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        color: 'var(--c-muted)',
        textDecoration: 'none',
        position: 'relative',
        transition: 'color var(--transition-base)',
      }}
      onMouseEnter={e => (e.currentTarget.style.color = 'var(--c-ink)')}
      onMouseLeave={e => (e.currentTarget.style.color = 'var(--c-muted)')}
    >
      {children}
    </a>
  )
}
