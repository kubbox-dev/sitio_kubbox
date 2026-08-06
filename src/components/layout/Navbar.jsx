import { useState, useEffect, useRef } from "react";
import { AnimatePresence, useReducedMotion } from "framer-motion";
import * as m from "motion/react-m";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

const NAV_LINKS = [
  { label: "Experiencia", href: "/", section: "experiencia" },
  {
    label: "Servicios",
    href: "/servicios",
    section: "servicios",
    dropdown: true,
  },
  { label: "Nosotros", href: "/nosotros", section: "nosotros" },
  { label: "Contacto", href: "/contacto", section: "contacto" },
];

/* Los 10 servicios agrupados por categoría — un solo nivel, sin submenús.
   Reparto 4 / 4 / 2: la tercera columna queda corta a propósito, la
   asimetría da ritmo y evita el bloque de tres columnas idénticas. */
const SERVICE_GROUPS = [
  {
    title: "Marketing y Publicidad",
    items: [
      { label: "Posicionamiento SEO", href: "/servicios/posicionamiento-seo" },
      { label: "Google Ads y Meta Ads", href: "/servicios/google-ads-meta-ads" },
      {
        label: "Campañas Digitales para Retail",
        href: "/servicios/campanas-digitales-activacion-ventas-retail",
      },
      {
        label: "Automatización y Campañas por WhatsApp",
        href: "/servicios/automatizacion-campanas-whatsapp",
      },
    ],
  },
  {
    title: "Desarrollo y Software",
    items: [
      {
        label: "Diseño y Desarrollo de Sitios Web",
        href: "/servicios/diseno-desarrollo-sitios-web",
      },
      {
        label: "Desarrollo de Software a la Medida",
        href: "/servicios/desarrollo-a-la-medida",
      },
      {
        label: "Desarrollo de Aplicaciones Móviles",
        href: "/servicios/desarrollo-aplicaciones-moviles",
      },
      {
        label: "Hosting Empresarial y Dominios",
        href: "/servicios/hosting-empresarial-registro-dominios",
      },
    ],
  },
  {
    title: "Marca e Identidad",
    items: [
      {
        label: "Creación y Desarrollo de Marca",
        href: "/servicios/creacion-desarrollo-marca",
      },
      {
        label: "Carnés Digitales y Tarjetas Inteligentes",
        href: "/servicios/carnes-digitales-tarjetas-contacto-inteligente",
      },
    ],
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

/* Hairline lima que corona el panel — firma de marca, se conserva */
const LIME_HAIRLINE =
  "linear-gradient(to right, transparent 5%, var(--c-lime) 40%, var(--c-lime) 60%, transparent 95%)";

/* Subrayado degradado bajo cada encabezado de categoría */
const CATEGORY_RULE =
  "linear-gradient(to right, oklch(0.88 0.26 130 / 0.45), oklch(0.88 0.26 130 / 0.07) 72%, transparent)";

export default function Navbar() {
  const location = useLocation();
  const pathname = location.pathname || "/";
  const reduceMotion = useReducedMotion();

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
  const lastScrollY = useRef(0);
  const dropdownTimer = useRef(null);
  const servicesTriggerRef = useRef(null);
  const megaPanelRef = useRef(null);
  /* Escape devuelve el foco al disparador, y ese focus() volvería a abrir
     el panel. Esta ventana corta ignora ese reenfoque sin bloquear el hover. */
  const reopenGuard = useRef(0);

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
    dropdownTimer.current = setTimeout(() => setDropdownOpen(false), 150);
  };
  const closeDropdownNow = () => {
    clearTimeout(dropdownTimer.current);
    setDropdownOpen(false);
  };

  /* Solo abre por foco si el foco llegó por teclado, no por el reenfoque
     que dispara Escape al cerrar. */
  const openDropdownFromFocus = () => {
    if (Date.now() < reopenGuard.current) return;
    openDropdown();
  };

  /* ── Escape cierra el panel; devuelve el foco al disparador solo si el
       foco estaba dentro del panel (si se abrió con el mouse, no lo roba) ── */
  useEffect(() => {
    if (!dropdownOpen) return;
    const onKeyDown = (e) => {
      if (e.key !== "Escape") return;
      const focusWasInside = megaPanelRef.current?.contains(
        document.activeElement,
      );
      reopenGuard.current = Date.now() + 400;
      closeDropdownNow();
      if (focusWasInside) servicesTriggerRef.current?.focus();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [dropdownOpen]);

  /* ── Si el foco sale de la píldora por completo, cierra ── */
  const handlePillBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) closeDropdownNow();
  };

  const closeMobileMenu = () => {
    setMenuOpen(false);
    setSvcExpanded(false);
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
      <m.div
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
      </m.div>

      <m.div
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
          onBlur={handlePillBlur}
        >
          <PillDecorations scrollProgress={scrollProgress} />

          {/* Links */}
          {NAV_LINKS.map((link) =>
            link.dropdown ? (
              /* Wrapper sin `position` propio: el panel se ancla contra la
                 píldora (que sí es relative) y queda centrado en pantalla,
                 pero en el DOM va justo tras su disparador para que el
                 orden de tabulación sea el natural. */
              <div
                key={link.section}
                onMouseEnter={openDropdown}
                onMouseLeave={closeDropdown}
              >
                <Link
                  ref={servicesTriggerRef}
                  to={link.href}
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                  aria-controls="mega-servicios"
                  onFocus={openDropdownFromFocus}
                  className="group relative rounded-full no-underline flex items-center gap-1"
                  style={{
                    padding: "0.48rem 1.1rem",
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "0.78rem",
                    letterSpacing: "0.10em",
                    textTransform: "uppercase",
                    color:
                      CURRENT_PAGE === link.section
                        ? "var(--c-ink)"
                        : "oklch(0.46 0.014 260)",
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
                    <m.span
                      layoutId="tube-pill"
                      className="absolute inset-0 rounded-full -z-10"
                      style={{ background: "oklch(0.17 0.030 260 / 0.95)" }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 34,
                      }}
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
                    </m.span>
                  )}

                  {link.label}
                  <ChevronDown
                    size={11}
                    aria-hidden="true"
                    style={{
                      opacity: 0.55,
                      flexShrink: 0,
                      transition: "transform 0.25s ease",
                      transform: dropdownOpen
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                    }}
                  />
                </Link>

                {/* ── Puente invisible: deja viajar el mouse del disparador
                       al panel sin cruzar una zona muerta ── */}
                {dropdownOpen && (
                  <div
                    aria-hidden="true"
                    className="absolute left-0 right-0 top-full h-4"
                  />
                )}

                {/* ══════════ MEGA MENÚ ══════════ */}
                <AnimatePresence>
                  {dropdownOpen && (
                    <m.div
                      key="mega-servicios"
                      id="mega-servicios"
                      initial={
                        reduceMotion
                          ? { opacity: 0, x: "-50%" }
                          : { opacity: 0, x: "-50%", y: -8, scale: 0.98 }
                      }
                      animate={
                        reduceMotion
                          ? { opacity: 1, x: "-50%" }
                          : { opacity: 1, x: "-50%", y: 0, scale: 1 }
                      }
                      exit={
                        reduceMotion
                          ? { opacity: 0, x: "-50%" }
                          : { opacity: 0, x: "-50%", y: -6, scale: 0.985 }
                      }
                      transition={{
                        duration: reduceMotion ? 0.15 : 0.22,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      onMouseEnter={openDropdown}
                      onMouseLeave={closeDropdown}
                      ref={megaPanelRef}
                      /* Fondo opaco a propósito: con alfa 0.98 el titular
                         lima del hero se fantasmeaba a través del panel. */
                      className="absolute left-1/2 top-full mt-3 overflow-hidden rounded-[1.15rem] border border-[oklch(0.22_0.020_260)] bg-[oklch(0.105_0.026_260)] shadow-[0_24px_64px_oklch(0.03_0.02_260_/_0.7)] w-[min(920px,calc(100vw-2.5rem))] z-[60] [transform-origin:top_center]"
                    >
                      <div
                        aria-hidden="true"
                        className="h-[2px] opacity-65"
                        style={{ background: LIME_HAIRLINE }}
                      />

                      {/* Columnas de categorías */}
                      <div className="grid [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))] gap-x-[clamp(1rem,2.5vw,2.25rem)] gap-y-7 px-7 pt-6 pb-5">
                        {SERVICE_GROUPS.map((group, gi) => (
                          <m.div
                            key={group.title}
                            initial={
                              reduceMotion
                                ? { opacity: 0 }
                                : { opacity: 0, y: 6 }
                            }
                            animate={
                              reduceMotion
                                ? { opacity: 1 }
                                : { opacity: 1, y: 0 }
                            }
                            transition={{
                              delay: reduceMotion ? 0 : 0.05 + gi * 0.04,
                              duration: 0.28,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                          >
                            <h3 className="m-0 text-[0.66rem] font-bold uppercase tracking-[0.16em] text-[var(--c-lime)] [font-family:var(--font-display)]">
                              {group.title}
                            </h3>
                            <div
                              aria-hidden="true"
                              className="mt-[0.45rem] mb-[0.35rem] h-px"
                              style={{ background: CATEGORY_RULE }}
                            />
                            <ul className="m-0 list-none p-0">
                              {group.items.map((item) => (
                                <li key={item.href}>
                                  <Link
                                    to={item.href}
                                    onClick={closeDropdownNow}
                                    className="block rounded-lg px-3 py-[0.55rem] text-[0.875rem] font-medium leading-snug no-underline [font-family:var(--font-body)] text-[oklch(0.78_0.010_260)] transition-colors duration-150 hover:bg-[oklch(0.17_0.026_260)] hover:text-[var(--c-lime)] focus-visible:bg-[oklch(0.17_0.026_260)] focus-visible:text-[var(--c-lime)] focus-visible:outline-none"
                                  >
                                    {item.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </m.div>
                        ))}
                      </div>

                      {/* Barra inferior — dos accesos con peso de CTA, no
                          texto de pie de página. Asimétrica a propósito:
                          Proyectos lleva el acento lima porque es el destino
                          que más vende (principio "conversión primero"). */}
                      <div className="grid grid-cols-2 gap-3 border-t border-[oklch(0.19_0.018_260)] bg-[oklch(0.075_0.024_260)] p-4">
                        <Link
                          to="/servicios"
                          onClick={closeDropdownNow}
                          className="group/f flex items-center gap-3 rounded-xl border border-[oklch(0.27_0.022_260)] bg-[oklch(0.14_0.028_260)] px-4 py-3 no-underline transition-colors duration-150 hover:border-[oklch(0.42_0.060_130)] hover:bg-[oklch(0.16_0.030_260)] focus-visible:border-[oklch(0.55_0.120_130)] focus-visible:outline-none"
                        >
                          <span
                            aria-hidden="true"
                            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[oklch(0.22_0.026_260)] text-[oklch(0.80_0.010_260)] transition-colors duration-150 group-hover/f:bg-[var(--c-lime)] group-hover/f:text-[var(--c-cta-ink)]"
                          >
                            <span
                              aria-hidden="true"
                              className="inline-block transition-transform duration-200 group-hover/f:translate-x-0.5"
                            >
                              →
                            </span>
                          </span>
                          <span className="flex flex-col leading-tight">
                            <span className="text-[0.92rem] font-semibold [font-family:var(--font-body)] text-[var(--c-ink)]">
                              Ver todos los servicios
                            </span>
                            <span className="mt-[0.1rem] text-[0.72rem] [font-family:var(--font-body)] text-[oklch(0.62_0.016_260)]">
                              Las 10 soluciones completas
                            </span>
                          </span>
                        </Link>

                        <Link
                          to="/proyectos"
                          onClick={closeDropdownNow}
                          className="group/p flex items-center gap-3 rounded-xl border border-[oklch(0.40_0.090_130)] bg-[oklch(0.155_0.034_150)] px-4 py-3 no-underline transition-colors duration-150 hover:border-[oklch(0.60_0.150_130)] hover:bg-[oklch(0.185_0.040_150)] focus-visible:border-[oklch(0.70_0.180_130)] focus-visible:outline-none"
                        >
                          <span
                            aria-hidden="true"
                            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[var(--c-lime)] text-[var(--c-cta-ink)] shadow-[0_0_12px_var(--glow-lime)]"
                          >
                            <span
                              aria-hidden="true"
                              className="inline-block transition-transform duration-200 group-hover/p:translate-x-0.5"
                            >
                              →
                            </span>
                          </span>
                          <span className="flex flex-col leading-tight">
                            <span className="text-[0.92rem] font-semibold [font-family:var(--font-body)] text-[var(--c-ink)]">
                              Nuestros Proyectos
                            </span>
                            <span className="mt-[0.1rem] text-[0.72rem] [font-family:var(--font-body)] text-[oklch(0.75_0.130_130)]">
                              Casos de éxito reales
                            </span>
                          </span>
                        </Link>
                      </div>
                    </m.div>
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
                  color:
                    CURRENT_PAGE === link.section
                      ? "var(--c-ink)"
                      : "oklch(0.46 0.014 260)",
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
                  <m.span
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
                  </m.span>
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
                <m.span
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.16 }}
                  style={{ display: "flex" }}
                >
                  <X size={17} />
                </m.span>
              ) : (
                <m.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.16 }}
                  style={{ display: "flex" }}
                >
                  <Menu size={17} />
                </m.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </m.div>

      {/* ══════════ MOBILE MENU overlay ══════════ */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <m.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={closeMobileMenu}
              className="fixed inset-0 md:hidden"
              style={{
                zIndex: 40,
                background: "oklch(0.06 0.025 260 / 0.85)",
                backdropFilter: "blur(10px)",
              }}
            />

            <m.nav
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
                maxHeight: "calc(100dvh - 6.5rem)",
                overflowY: "auto",
                overscrollBehavior: "contain",
              }}
              data-lenis-prevent
            >
              <div
                aria-hidden="true"
                style={{
                  height: "2px",
                  background: LIME_HAIRLINE,
                  opacity: 0.7,
                }}
              />

              <div style={{ padding: "0.5rem 1.5rem 1.5rem" }}>
                {NAV_LINKS.map((link, i) =>
                  link.dropdown ? (
                    <m.div
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
                        aria-expanded={svcExpanded}
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
                        <m.span
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
                        </m.span>
                      </button>

                      {/* Un solo nivel: categorías + servicios, sin submenú */}
                      <AnimatePresence>
                        {svcExpanded && (
                          <m.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.28,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            style={{ overflow: "hidden" }}
                          >
                            <div className="flex flex-col gap-5 pt-4 pb-3 pl-1">
                              {SERVICE_GROUPS.map((group) => (
                                <div key={group.title}>
                                  <h3 className="m-0 mb-[0.4rem] text-[0.63rem] font-bold uppercase tracking-[0.16em] text-[var(--c-lime)] [font-family:var(--font-display)]">
                                    {group.title}
                                  </h3>
                                  <div
                                    aria-hidden="true"
                                    className="mb-[0.3rem] h-px"
                                    style={{ background: CATEGORY_RULE }}
                                  />
                                  <div className="flex flex-col">
                                    {group.items.map((item) => (
                                      <Link
                                        key={item.href}
                                        to={item.href}
                                        onClick={closeMobileMenu}
                                        className="rounded-lg px-2 py-[0.55rem] text-[0.9rem] font-medium leading-snug no-underline [font-family:var(--font-body)] text-[oklch(0.78_0.010_260)] transition-colors duration-150 active:bg-[oklch(0.17_0.026_260)] active:text-[var(--c-lime)]"
                                      >
                                        {item.label}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}

                              <Link
                                to="/proyectos"
                                onClick={closeMobileMenu}
                                className="flex items-center justify-between gap-3 rounded-lg border-t border-[oklch(0.20_0.018_260)] px-2 pt-4 pb-1 no-underline"
                              >
                                <span className="flex items-center gap-2">
                                  <span
                                    aria-hidden="true"
                                    className="inline-block h-[5px] w-[5px] flex-shrink-0 rounded-full bg-[var(--c-lime)] shadow-[0_0_6px_var(--c-lime)]"
                                  />
                                  <span className="text-[0.9rem] font-semibold [font-family:var(--font-body)] text-[oklch(0.82_0.010_260)]">
                                    Nuestros Proyectos
                                  </span>
                                </span>
                                <span
                                  aria-hidden="true"
                                  className="text-[oklch(0.45_0.016_260)]"
                                >
                                  →
                                </span>
                              </Link>
                            </div>
                          </m.div>
                        )}
                      </AnimatePresence>
                    </m.div>
                  ) : (
                    <m.div
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
                    </m.div>
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
            </m.nav>
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
