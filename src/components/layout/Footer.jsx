import { Link } from "react-router-dom";

const SECTIONS = [
  {
    title: "Servicios",
    links: [
      { name: "Desarrollo Digital", href: "/servicios/desarrollo-digital" },
      { name: "Nuestros Proyectos", href: "/proyectos" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { name: "Experiencia", href: "/" },
      { name: "Blog", href: "#" },
    ],
  },
  {
    title: "Contacto",
    links: [
      { name: "sellerup@kubbox.com", href: "/privacidad" },
      { name: "3104255766", href: "/terminos" },
    ],
  },
];

const SOCIAL = [
  { Icon: IconInstagram, href: "#", label: "Instagram" },
  { Icon: IconFacebook, href: "#", label: "Facebook" },
  { Icon: IconLinkedin, href: "#", label: "LinkedIn" },
];

const LEGAL_LINKS = [
  { name: "Términos y Condiciones", href: "/terminos" },
  { name: "Política de Privacidad", href: "/privacidad" },
];

export default function Footer() {
  return (
    <footer className="relative w-full [background:oklch(0.07_0.020_260)]">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 block h-px opacity-70 [background:linear-gradient(to_right,transparent_5%,var(--c-lime)_40%,var(--c-lime)_60%,transparent_95%)]"
      />

      <div className="mx-auto w-[80%] px-[var(--container-pad)] py-32">
        <div className="flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-center lg:text-left">
          {/* Left: logo + tagline + social */}
          <div className="flex w-full flex-col justify-between gap-6 lg:items-start lg:max-w-[35%]">
            <Link to="/" className="block no-underline">
              <img
                src="/images/LOGO BUENO KUBBOX/Recurso 52.svg"
                alt="Kubbox"
                style={{ height: "3.2rem", width: "auto", display: "block" }}
              />
            </Link>
            <p
              className="max-w-[80%] text-sm"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--c-muted)",
              }}
            >
              Agencia de marketing digital y desarrollo web para marcas
              colombianas que quieren crecer en serio.
            </p>
            <ul
              className="flex items-center space-x-6"
              style={{ color: "var(--c-muted)" }}
            >
              {SOCIAL.map(({ Icon, href, label }, idx) => (
                <li
                  key={idx}
                  className="font-medium transition-colors duration-200 hover:text-primary"
                >
                  <a
                    href={href}
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-200"
                    style={{ borderColor: "oklch(0.22 0.020 260)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--c-lime)";
                      e.currentTarget.style.borderColor = "var(--c-lime)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--c-muted)";
                      e.currentTarget.style.borderColor =
                        "oklch(0.22 0.020 260)";
                    }}
                  >
                    <Icon size={16} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: link sections - alineado perfectamente con el logo */}
          <div className="grid w-full gap-6 md:grid-cols-3 lg:max-w-[55%] lg:gap-16">
            {SECTIONS.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3
                  className="mb-4 font-bold"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--c-ink)",
                    marginTop: 0,
                    paddingTop: 0,
                    lineHeight: 1.2,
                  }}
                >
                  {section.title}
                </h3>
                <ul
                  className="space-y-3 text-sm"
                  style={{ color: "var(--c-muted)" }}
                >
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium transition-colors duration-200 hover:text-primary"
                    >
                      <Link
                        to={link.href}
                        className="no-underline transition-colors duration-200"
                        style={{
                          fontFamily: "var(--font-body)",
                          color: "var(--c-muted)",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "var(--c-ink)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "var(--c-muted)")
                        }
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div
          className="mt-8 flex flex-col justify-between gap-4 border-t py-8 text-xs font-medium md:flex-row md:items-center md:text-left"
          style={{
            borderColor: "oklch(0.14 0.022 260)",
            color: "var(--c-muted)",
          }}
        >
          <p
            className="order-2 lg:order-1"
            style={{ fontFamily: "var(--font-body)" }}
          >
            © {new Date().getFullYear()} Kubbox. Todos los derechos reservados.
          </p>
          <p
            className="order-1 text-xs tracking-[0.04em] md:order-2"
            style={{
              fontFamily: "var(--font-body)",
              color: "oklch(0.38 0.014 260)",
            }}
          >
            Agencia creativa · Medellín, Colombia
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ── Inline brand icons ────────────────────────────────────────── */

function IconInstagram({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function IconFacebook({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function IconLinkedin({ size = 16 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
