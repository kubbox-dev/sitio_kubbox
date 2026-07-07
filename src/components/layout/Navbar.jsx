import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";

const NAV_LINKS = [
  { label: "Experiencia", href: "/", section: "experiencia" },
  { label: "Servicios", href: "/servicios", section: "servicios", dropdown: true },
  { label: "Nosotros", href: "/nosotros", section: "nosotros" },
  { label: "Contacto", href: "/contacto", section: "contacto" },
];

const SERVICES_MENU = [
  {
    label: "Servicios",
    desc: "Soluciones de marketing y desarrollo web",
    isSubmenu: true,
    items: [
      {
        label: "Desarrollo de Software a la Medida",
        href: "/servicios/desarrollo-software-medida",
        desc: "Software personalizado para tu organización",
      },
      {
        label: "Posicionamiento SEO",
        href: "/servicios/posicionamiento-seo",
        desc: "Aumentamos la visibilidad de tu empresa en Google",
      },
      {
        label: "Hosting Empresarial y Registro de Dominios",
        href: "/servicios/hosting-empresarial-registro-dominios",
        desc: "Infraestructura tecnológica confiable para tu negocio.",
      },
    ],
  },
  {
    label: "Nuestros Proyectos",
    href: "/proyectos",
    desc: "Casos de éxito y trabajos realizados",
  },
];

const PILL_BASE = {
  background: "oklch(0.11 0.025 260 / 0.72)",
  border: "1px solid oklch(0.26 0.022 260 / 0.60)",
  backdropFilter: "blur(22px) saturate(1.4)",
};

const PILL_SCROLLED = {
  background: "oklch(0.11 0.028 260 / 0.95)",
  boxShadow:
    "0 8px 48px oklch(0.04 0.02 260 / 0.75), 0 1px 0 oklch(0.32 0.020 260 / 0.12) inset",
};

const PILL_DEFAULT = {
  boxShadow:
    "0 4px 24px oklch(0.04 0.02 260 / 0.45), 0 1px 0 oklch(0.28 0.018 260 / 0.10) inset",
};

export default function Navbar() {
  const location = useLocation();
  const pathname = location.pathname || "/";
  let CURRENT_PAGE = "experiencia";
  if (pathname === "/contacto") CURRENT_PAGE = "contacto";
  else if (
    pathname.startsWith("/servicios") ||
    pathname.startsWith("/proyectos")
  )
    CURRENT_PAGE = "servicios";
  else if (pathname.startsWith("/nosotros")) CURRENT_PAGE = "nosotros";

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [svcExpanded, setSvcExpanded] = useState(false);
  const [subDropdownOpen, setSubDropdownOpen] = useState(false);
  const [subSvcExpanded, setSubSvcExpanded] = useState(false);
  const lastScrollY = useRef(0);
  const dropdownTimer = useRef(null);
  const subDropdownTimer = useRef(null);

  /* ── Scroll ── */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const maxY = document.documentElement.scrollHeight - window.innerHeight;
      const mobile = window.innerWidth < 768;

      setScrollProgress(maxY > 0 ? Math.min(y / maxY, 1) : 0);
      setScrolled(y > 60);

      if (mobile && y > 280) {
        if (y > lastScrollY.current + 8) setHidden(true);
        if (y < lastScrollY.current - 8) setHidden(false);
      } else {
        setHidden(false);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Close menu on resize to desktop ── */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
        setSvcExpanded(false);
        setSubSvcExpanded(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ── Dropdown con delay para no cortar accidentalmente ── */
  const openDropdown = () => {
    clearTimeout(dropdownTimer.current);
    setDropdownOpen(true);
  };
  const closeDropdown = () => {
    dropdownTimer.current = setTimeout(() => {
      setDropdownOpen(false);
      setSubDropdownOpen(false);
    }, 150);
  };

  const openSubDropdown = () => {
    clearTimeout(dropdownTimer.current);
    clearTimeout(subDropdownTimer.current);
    setSubDropdownOpen(true);
  };
  const closeSubDropdown = () => {
    subDropdownTimer.current = setTimeout(() => setSubDropdownOpen(false), 150);
  };

  const pillStyle = {
    ...PILL_BASE,
    ...(scrolled ? PILL_SCROLLED : PILL_DEFAULT),
    transition: "background 0.5s ease, box-shadow 0.5s ease",
    padding: "5px",
  };

  return (
    <>
      {/* Scrim */}
      <div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-40 pointer-events-none"
        style={{
          height: "6.5rem",
          background:
            "linear-gradient(to bottom, oklch(0.06 0.018 260 / 0.62) 0%, oklch(0.06 0.018 260 / 0.30) 55%, transparent 100%)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
        }}
      />

      {/* ══════════ DESKTOP standalone logo (md+) ══════════ */}
      <motion.div
        initial={{ y: -96, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-5 z-50 hidden md:block"
        style={{ left: "clamp(1.5rem, 4vw, 3rem)" }}
      >
        <Link to="/" className="block no-underline">
          <img
            src="/images/LOGO BUENO KUBBOX/Recurso 52.svg"
            alt="Kubbox"
            className="block transition-transform duration-300 hover:scale-[1.03]"
            style={{ height: "3.4rem", width: "auto" }}
          />
        </Link>
      </motion.div>

      <motion.div
        initial={{ y: -96, opacity: 0 }}
        animate={{ y: hidden ? -120 : 0, opacity: hidden ? 0 : 1 }}
        transition={
          hidden
            ? { duration: 0.28, ease: [0.4, 0, 1, 1] }
            : { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
        }
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50"
      >
        {/* ══════════ DESKTOP pill (md+) ══════════ */}
        <div
          className="hidden md:flex items-center rounded-full relative"
          style={pillStyle}
        >
          <PillDecorations scrollProgress={scrollProgress} />

          {/* Links */}
          {NAV_LINKS.map((link) =>
            link.dropdown ? (
              <div
                key={link.section}
                className="relative"
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdown}
              >
                <Link
                  to={link.href}
                  className="group relative rounded-full no-underline flex items-center gap-1"
                  style={{
                    padding: "0.48rem 1.1rem",
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "0.78rem",
                    letterSpacing: "0.10em",
                    textTransform: "uppercase",
                    color: CURRENT_PAGE === link.section ? "var(--c-ink)" : "oklch(0.46 0.014 260)",
                    transition: "color 0.2s ease",
                    zIndex: 1,
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    if (CURRENT_PAGE !== link.section) {
                      e.currentTarget.style.color = "oklch(0.82 0.008 260)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (CURRENT_PAGE !== link.section) {
                      e.currentTarget.style.color = "oklch(0.46 0.014 260)";
                    }
                  }}
                >
                  {CURRENT_PAGE !== link.section && (
                    <span
                      className="absolute inset-0 rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{ background: "oklch(0.16 0.024 260 / 0.7)" }}
                    />
                  )}

                  {CURRENT_PAGE === link.section && (
                    <motion.span
                      layoutId="tube-pill"
                      className="absolute inset-0 rounded-full -z-10"
                      style={{ background: "oklch(0.17 0.030 260 / 0.95)" }}
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          position: "absolute",
                          top: -3,
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "1.5rem",
                          height: "3px",
                          background: "var(--c-lime)",
                          borderRadius: "0 0 3px 3px",
                          boxShadow: "0 0 10px var(--c-lime)",
                        }}
                      />
                      <span
                        aria-hidden="true"
                        style={{
                          position: "absolute",
                          top: -22,
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "4rem",
                          height: "2rem",
                          background: "oklch(0.88 0.26 130 / 0.13)",
                          borderRadius: "50%",
                          filter: "blur(12px)",
                        }}
                      />
                      <span
                        aria-hidden="true"
                        style={{
                          position: "absolute",
                          top: -11,
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "2rem",
                          height: "1rem",
                          background: "oklch(0.88 0.26 130 / 0.28)",
                          borderRadius: "50%",
                          filter: "blur(5px)",
                        }}
                      />
                    </motion.span>
                  )}

                  {link.label}
                  <ChevronDown 
                    size={11} 
                    style={{ 
                      opacity: 0.55, 
                      flexShrink: 0,
                      transition: "transform 0.25s ease",
                      transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                    }} 
                  />
                </Link>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      key="dropdown"
                      initial={{ opacity: 0, x: "-50%", y: -6, scale: 0.97 }}
                      animate={{ opacity: 1, x: "-50%", y: 0, scale: 1 }}
                      exit={{ opacity: 0, x: "-50%", y: -4, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      onMouseEnter={openDropdown}
                      onMouseLeave={closeDropdown}
                      style={{
                        position: "absolute",
                        top: "calc(100% + 0.85rem)",
                        left: "50%",
                        minWidth: "270px",
                        background: "oklch(0.10 0.026 260 / 0.98)",
                        border: "1px solid oklch(0.22 0.020 260)",
                        borderRadius: "1rem",
                        backdropFilter: "blur(24px)",
                        zIndex: 100,
                      }}
                    >
                      <div
                        style={{
                          height: "2px",
                          background:
                            "linear-gradient(to right, transparent 5%, var(--c-lime) 40%, var(--c-lime) 60%, transparent 95%)",
                          opacity: 0.65,
                        }}
                      />
                      <div style={{ padding: "0.4rem" }}>
                        {SERVICES_MENU.map((svc, i) => {
                          if (svc.isSubmenu) {
                            return (
                              <div
                                key={svc.label}
                                className="relative"
                                onMouseEnter={openSubDropdown}
                                onMouseLeave={closeSubDropdown}
                              >
                                <div
                                  className="flex items-center justify-between rounded-lg no-underline cursor-pointer"
                                  style={{
                                    padding: "0.55rem 0.75rem",
                                    transition: "background 0.15s ease",
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.background =
                                      "oklch(0.16 0.024 260 / 0.8)";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.background =
                                      "transparent";
                                  }}
                                >
                                  <div className="flex flex-col">
                                    <span
                                      style={{
                                        fontFamily: "var(--font-display)",
                                        fontWeight: 700,
                                        fontSize: "0.82rem",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.05em",
                                        color: "var(--c-ink)",
                                      }}
                                    >
                                      {svc.label}
                                    </span>
                                    <span
                                      style={{
                                        fontFamily: "var(--font-body)",
                                        fontSize: "0.71rem",
                                        color: "oklch(0.46 0.014 260)",
                                        marginTop: "0.1rem",
                                      }}
                                    >
                                      {svc.desc}
                                    </span>
                                  </div>
                                  <ChevronRight
                                    size={13}
                                    style={{
                                      color: "oklch(0.46 0.014 260)",
                                      opacity: 0.8,
                                      marginLeft: "0.5rem",
                                    }}
                                  />
                                </div>

                                <AnimatePresence>
                                  {subDropdownOpen && (
                                    <motion.div
                                      initial={{ opacity: 0, x: 8, scale: 0.97 }}
                                      animate={{ opacity: 1, x: 0, scale: 1 }}
                                      exit={{ opacity: 0, x: 6, scale: 0.98 }}
                                      transition={{
                                        duration: 0.2,
                                        ease: [0.16, 1, 0.3, 1],
                                      }}
                                      onMouseEnter={openSubDropdown}
                                      onMouseLeave={closeSubDropdown}
                                      style={{
                                        position: "absolute",
                                        top: 0,
                                        left: "100%",
                                        minWidth: "250px",
                                        background: "oklch(0.10 0.026 260 / 0.98)",
                                        border: "1px solid oklch(0.22 0.020 260)",
                                        borderRadius: "1rem",
                                        backdropFilter: "blur(24px)",
                                        padding: "0.4rem",
                                        zIndex: 110,
                                        boxShadow: "0 8px 32px oklch(0.04 0.02 260 / 0.5)",
                                      }}
                                    >
                                      {svc.items.map((subSvc) => (
                                        <Link
                                          key={subSvc.label}
                                          to={subSvc.href}
                                          onClick={() => {
                                            setDropdownOpen(false);
                                            setSubDropdownOpen(false);
                                          }}
                                          className="flex flex-col rounded-lg no-underline"
                                          style={{
                                            padding: "0.55rem 0.75rem",
                                            transition: "background 0.15s ease",
                                            cursor: "pointer",
                                          }}
                                          onMouseEnter={(e) => {
                                            e.currentTarget.style.background =
                                              "oklch(0.16 0.024 260 / 0.8)";
                                          }}
                                          onMouseLeave={(e) => {
                                            e.currentTarget.style.background =
                                              "transparent";
                                          }}
                                        >
                                          <span
                                            style={{
                                              fontFamily: "var(--font-display)",
                                              fontWeight: 700,
                                              fontSize: "0.82rem",
                                              textTransform: "uppercase",
                                              letterSpacing: "0.05em",
                                              color: "var(--c-ink)",
                                            }}
                                          >
                                            {subSvc.label}
                                          </span>
                                          <span
                                            style={{
                                              fontFamily: "var(--font-body)",
                                              fontSize: "0.71rem",
                                              color: "oklch(0.46 0.014 260)",
                                              marginTop: "0.1rem",
                                            }}
                                          >
                                            {subSvc.desc}
                                          </span>
                                        </Link>
                                      ))}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          }

                          const SvcComp = svc.href ? Link : "a";
                          const svcNavProps = svc.href
                            ? {
                                to: svc.href,
                                onClick: () => setDropdownOpen(false),
                              }
                            : { onClick: (e) => e.preventDefault() };
                          return (
                            <motion.div
                              key={svc.label}
                              initial={{ opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.04, duration: 0.25 }}
                            >
                              <SvcComp
                                {...svcNavProps}
                                className="flex flex-col rounded-lg no-underline"
                                style={{
                                  padding: "0.55rem 0.75rem",
                                  transition: "background 0.15s ease",
                                  cursor: "pointer",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background =
                                    "oklch(0.16 0.024 260 / 0.8)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background =
                                    "transparent";
                                }}
                              >
                                <span
                                  style={{
                                    fontFamily: "var(--font-display)",
                                    fontWeight: 700,
                                    fontSize: "0.82rem",
                                    textTransform: "uppercase",
                                    letterSpacing: "0.05em",
                                    color: "var(--c-ink)",
                                  }}
                                >
                                  {svc.label}
                                </span>
                                <span
                                  style={{
                                    fontFamily: "var(--font-body)",
                                    fontSize: "0.71rem",
                                    color: "oklch(0.46 0.014 260)",
                                    marginTop: "0.1rem",
                                  }}
                                >
                                  {svc.desc}
                                </span>
                              </SvcComp>
                            </motion.div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.section}
                to={link.href}
                className="group relative rounded-full no-underline flex items-center gap-1"
                style={{
                  padding: "0.48rem 1.1rem",
                  fontFamily: "var(--font-body)",
                  fontWeight: 600,
                  fontSize: "0.78rem",
                  letterSpacing: "0.10em",
                  textTransform: "uppercase",
                  color: CURRENT_PAGE === link.section ? "var(--c-ink)" : "oklch(0.46 0.014 260)",
                  transition: "color 0.2s ease",
                  zIndex: 1,
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  if (CURRENT_PAGE !== link.section) {
                    e.currentTarget.style.color = "oklch(0.82 0.008 260)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (CURRENT_PAGE !== link.section) {
                    e.currentTarget.style.color = "oklch(0.46 0.014 260)";
                  }
                }}
              >
                {CURRENT_PAGE !== link.section && (
                  <span
                    className="absolute inset-0 rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    style={{ background: "oklch(0.16 0.024 260 / 0.7)" }}
                  />
                )}

                {CURRENT_PAGE === link.section && (
                  <motion.span
                    layoutId="tube-pill"
                    className="absolute inset-0 rounded-full -z-10"
                    style={{ background: "oklch(0.17 0.030 260 / 0.95)" }}
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        top: -3,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "1.5rem",
                        height: "3px",
                        background: "var(--c-lime)",
                        borderRadius: "0 0 3px 3px",
                        boxShadow: "0 0 10px var(--c-lime)",
                      }}
                    />
                    <span
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        top: -22,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "4rem",
                        height: "2rem",
                        background: "oklch(0.88 0.26 130 / 0.13)",
                        borderRadius: "50%",
                        filter: "blur(12px)",
                      }}
                    />
                    <span
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        top: -11,
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "2rem",
                        height: "1rem",
                        background: "oklch(0.88 0.26 130 / 0.28)",
                        borderRadius: "50%",
                        filter: "blur(5px)",
                      }}
                    />
                  </motion.span>
                )}

                {link.label}
              </Link>
            ),
          )}
        </div>

        {/* ══════════ MOBILE pill (<md) ══════════ */}
        <div
          className="flex md:hidden items-center justify-between rounded-full"
          style={{
            ...PILL_BASE,
            background: "oklch(0.11 0.025 260 / 0.92)",
            boxShadow: "0 4px 24px oklch(0.04 0.02 260 / 0.55)",
            padding: "6px 8px 6px 14px",
            width: "90vw",
          }}
        >
          <Link
            to="/"
            className="block no-underline"
            onClick={() => setMenuOpen(false)}
          >
            <img
              src="/images/LOGO BUENO KUBBOX/Recurso 52.svg"
              alt="Kubbox"
              style={{ height: "1.75rem", width: "auto", display: "block" }}
            />
          </Link>

          <button
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center justify-center p-[7px] rounded-full border-none cursor-pointer"
            style={{
              background: menuOpen
                ? "oklch(0.88 0.26 130 / 0.12)"
                : "oklch(0.17 0.024 260)",
              color: menuOpen ? "var(--c-lime)" : "var(--c-ink)",
              border: `1px solid ${menuOpen ? "oklch(0.88 0.26 130 / 0.25)" : "oklch(0.24 0.020 260)"}`,
              transition: "all 0.2s ease",
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.16 }}
                  style={{ display: "flex" }}
                >
                  <X size={17} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.16 }}
                  style={{ display: "flex" }}
                >
                  <Menu size={17} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.div>

      {/* ══════════ MOBILE MENU overlay ══════════ */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => {
                setMenuOpen(false);
                setSvcExpanded(false);
                setSubSvcExpanded(false);
              }}
              className="fixed inset-0 md:hidden"
              style={{
                zIndex: 40,
                background: "oklch(0.06 0.025 260 / 0.85)",
                backdropFilter: "blur(10px)",
              }}
            />

            <motion.nav
              key="panel"
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="fixed md:hidden rounded-2xl overflow-hidden"
              style={{
                top: "5rem",
                left: "1rem",
                right: "1rem",
                zIndex: 41,
                background: "oklch(0.10 0.026 260 / 0.98)",
                border: "1px solid oklch(0.22 0.020 260)",
                backdropFilter: "blur(24px)",
              }}
            >
              <div
                style={{
                  height: "2px",
                  background:
                    "linear-gradient(to right, transparent 5%, var(--c-lime) 40%, var(--c-lime) 60%, transparent 95%)",
                  opacity: 0.7,
                }}
              />

              <div style={{ padding: "0.5rem 1.5rem 1.5rem" }}>
                {NAV_LINKS.map((link, i) =>
                  link.dropdown ? (
                    <motion.div
                      key={link.section}
                      initial={{ opacity: 0, x: -18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.08 + i * 0.07,
                        duration: 0.38,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <button
                        onClick={() => setSvcExpanded((v) => !v)}
                        className="flex items-center justify-between w-full border-none cursor-pointer"
                        style={{
                          padding: "1.1rem 0",
                          borderBottom: "1px solid oklch(0.20 0.018 260)",
                          background: "transparent",
                          textAlign: "left",
                        }}
                      >
                        <div className="flex items-baseline gap-4">
                          <span
                            style={{
                              fontFamily: "var(--font-body)",
                              fontSize: "0.68rem",
                              fontWeight: 600,
                              letterSpacing: "0.14em",
                              color: "oklch(0.35 0.014 260)",
                            }}
                          >
                            0{i + 1}
                          </span>
                          <span
                            style={{
                              fontFamily: "var(--font-display)",
                              fontWeight: 800,
                              fontSize: "clamp(1.5rem, 6vw, 1.85rem)",
                              textTransform: "uppercase",
                              color: "var(--c-ink)",
                              letterSpacing: "-0.01em",
                            }}
                          >
                            {link.label}
                          </span>
                        </div>
                        <motion.span
                          animate={{ rotate: svcExpanded ? 180 : 0 }}
                          transition={{ duration: 0.25 }}
                          style={{
                            color: svcExpanded
                              ? "var(--c-lime)"
                              : "oklch(0.30 0.016 260)",
                            display: "flex",
                          }}
                        >
                          <ChevronDown size={18} />
                        </motion.span>
                      </button>

                      <AnimatePresence>
                        {svcExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.28,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            style={{ overflow: "hidden" }}
                          >
                            <div
                              style={{
                                padding: "0.5rem 0 0.75rem 1rem",
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.1rem",
                              }}
                            >
                              {SERVICES_MENU.map((svc, si) => {
                                if (svc.isSubmenu) {
                                  return (
                                    <div
                                      key={svc.label}
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                      }}
                                    >
                                      <button
                                        onClick={() => setSubSvcExpanded((v) => !v)}
                                        className="flex items-center justify-between w-full border-none cursor-pointer"
                                        style={{
                                          padding: "0.6rem 0.5rem",
                                          background: "transparent",
                                          textAlign: "left",
                                        }}
                                      >
                                        <div className="flex items-center gap-2">
                                          <span
                                            style={{
                                              width: "4px",
                                              height: "4px",
                                              borderRadius: "50%",
                                              background: "var(--c-lime)",
                                              flexShrink: 0,
                                              boxShadow: "0 0 5px var(--c-lime)",
                                            }}
                                          />
                                          <span
                                            style={{
                                              fontFamily: "var(--font-body)",
                                              fontSize: "0.9rem",
                                              fontWeight: 500,
                                              color: "oklch(0.72 0.010 260)",
                                            }}
                                          >
                                            {svc.label}
                                          </span>
                                        </div>
                                        <motion.span
                                          animate={{ rotate: subSvcExpanded ? 180 : 0 }}
                                          transition={{ duration: 0.25 }}
                                          style={{
                                            color: subSvcExpanded
                                              ? "var(--c-lime)"
                                              : "oklch(0.30 0.016 260)",
                                            display: "flex",
                                          }}
                                        >
                                          <ChevronDown size={14} />
                                        </motion.span>
                                      </button>

                                      <AnimatePresence>
                                        {subSvcExpanded && (
                                          <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{
                                              duration: 0.28,
                                              ease: [0.16, 1, 0.3, 1],
                                            }}
                                            style={{ overflow: "hidden" }}
                                          >
                                            <div
                                              style={{
                                                padding: "0.2rem 0 0.5rem 1.5rem",
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: "0.1rem",
                                              }}
                                            >
                                              {svc.items.map((subSvc) => (
                                                <Link
                                                  key={subSvc.label}
                                                  to={subSvc.href}
                                                  onClick={() => {
                                                    setMenuOpen(false);
                                                    setSvcExpanded(false);
                                                    setSubSvcExpanded(false);
                                                  }}
                                                  className="flex items-center gap-2 no-underline rounded-lg"
                                                  style={{
                                                    padding: "0.45rem 0.5rem",
                                                    transition: "background 0.15s ease",
                                                  }}
                                                  onMouseEnter={(e) =>
                                                    (e.currentTarget.style.background =
                                                      "oklch(0.16 0.024 260 / 0.7)")
                                                  }
                                                  onMouseLeave={(e) =>
                                                    (e.currentTarget.style.background =
                                                      "transparent")
                                                  }
                                                >
                                                  <span
                                                    style={{
                                                      width: "3px",
                                                      height: "3px",
                                                      borderRadius: "50%",
                                                      background: "var(--c-lime)",
                                                      flexShrink: 0,
                                                    }}
                                                  />
                                                  <span
                                                    style={{
                                                      fontFamily: "var(--font-body)",
                                                      fontSize: "0.85rem",
                                                      fontWeight: 500,
                                                      color: "oklch(0.60 0.010 260)",
                                                    }}
                                                  >
                                                    {subSvc.label}
                                                  </span>
                                                </Link>
                                              ))}
                                            </div>
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </div>
                                  );
                                }

                                const SvcMobComp = svc.href ? Link : "a";
                                const svcMobNavProps = svc.href
                                  ? {
                                      to: svc.href,
                                      onClick: () => {
                                        setMenuOpen(false);
                                        setSvcExpanded(false);
                                      },
                                    }
                                  : {
                                      onClick: (e) => {
                                        e.preventDefault();
                                        setMenuOpen(false);
                                      },
                                    };
                                return (
                                  <motion.div
                                    key={svc.label}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                      delay: si * 0.05,
                                      duration: 0.25,
                                    }}
                                  >
                                    <SvcMobComp
                                      {...svcMobNavProps}
                                      className="flex items-center gap-2 no-underline rounded-lg"
                                      style={{
                                        padding: "0.45rem 0.5rem",
                                        transition: "background 0.15s ease",
                                      }}
                                      onMouseEnter={(e) =>
                                        (e.currentTarget.style.background =
                                          "oklch(0.16 0.024 260 / 0.7)")
                                      }
                                      onMouseLeave={(e) =>
                                        (e.currentTarget.style.background =
                                          "transparent")
                                      }
                                    >
                                      <span
                                        style={{
                                          width: "4px",
                                          height: "4px",
                                          borderRadius: "50%",
                                          background: "var(--c-lime)",
                                          flexShrink: 0,
                                          boxShadow: "0 0 5px var(--c-lime)",
                                        }}
                                      />
                                      <span
                                        style={{
                                          fontFamily: "var(--font-body)",
                                          fontSize: "0.9rem",
                                          fontWeight: 500,
                                          color: "oklch(0.72 0.010 260)",
                                        }}
                                      >
                                        {svc.label}
                                      </span>
                                    </SvcMobComp>
                                  </motion.div>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={link.section}
                      initial={{ opacity: 0, x: -18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.08 + i * 0.07,
                        duration: 0.38,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <Link
                        to={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="group flex items-center justify-between no-underline"
                        style={{
                          padding: "1.1rem 0",
                          borderBottom:
                            i < NAV_LINKS.length - 1
                              ? "1px solid oklch(0.20 0.018 260)"
                              : "none",
                        }}
                      >
                        <div className="flex items-baseline gap-4">
                          <span
                            style={{
                              fontFamily: "var(--font-body)",
                              fontSize: "0.68rem",
                              fontWeight: 600,
                              letterSpacing: "0.14em",
                              color: "oklch(0.35 0.014 260)",
                            }}
                          >
                            0{i + 1}
                          </span>
                          <span
                            style={{
                              fontFamily: "var(--font-display)",
                              fontWeight: 800,
                              fontSize: "clamp(1.5rem, 6vw, 1.85rem)",
                              textTransform: "uppercase",
                              color:
                                CURRENT_PAGE === link.section
                                  ? "var(--c-lime)"
                                  : "var(--c-ink)",
                              letterSpacing: "-0.01em",
                              transition: "color 0.2s ease",
                            }}
                          >
                            {link.label}
                          </span>
                        </div>
                        <span
                          className="transition-transform duration-200 group-hover:translate-x-1.5"
                          style={{
                            color:
                              CURRENT_PAGE === link.section
                                ? "var(--c-lime)"
                                : "oklch(0.30 0.016 260)",
                            fontSize: "1.1rem",
                          }}
                        >
                          →
                        </span>
                      </Link>
                    </motion.div>
                  ),
                )}
              </div>

              <div
                style={{
                  padding: "0.75rem 1.5rem",
                  borderTop: "1px solid oklch(0.18 0.018 260)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "var(--c-lime)",
                    boxShadow: "0 0 8px var(--c-lime)",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.72rem",
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    color: "oklch(0.38 0.014 260)",
                  }}
                >
                  Agencia creativa · Medellín, Colombia
                </span>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Subcomponentes ─────────────────────────────── */

function PillDecorations({ scrollProgress }) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(to right, transparent 8%, oklch(0.50 0.015 260 / 0.30) 40%, oklch(0.50 0.015 260 / 0.30) 60%, transparent 92%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "2px",
          width: `${scrollProgress * 100}%`,
          background:
            "linear-gradient(to right, oklch(0.88 0.26 130 / 0.5), oklch(0.88 0.26 130 / 0.95))",
          transition: "width 0.12s linear",
          borderRadius: "0 2px 0 0",
        }}
      />
    </div>
  );
}