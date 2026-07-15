import { Link } from "react-router-dom";
import React, { useRef, useEffect, useState } from "react";

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
      { name: "Nosotros", href: "/nosotros" },
      { name: "Experiencia", href: "/" },
      { name: "Blog", href: "/blog" },
      { name: "Clientes", href: "/clientes" },
    ],
  },
  {
    title: "Contacto",
    links: [
      { name: "sellerup@kubbox.com", href: "mailto:sellerup@kubbox.com" },
      { name: "3104255766", href: "tel:3104255766" },
      {
        name: "Cra 48 # 25B Sur 12, Oficina 202, Envigado – Antioquia",
        href: "https://maps.google.com/?q=Cra+48+%23+25B+Sur+12+Envigado+Antioquia",
      },
    ],
  },
];

const SOCIAL = [
  { Icon: IconInstagram, href: "#", label: "Instagram" },
  { Icon: IconFacebook, href: "#", label: "Facebook" },
  { Icon: IconLinkedin, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  const svgRef = useRef(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  return (
    <footer className="relative w-full bg-black">
      <div className="relative z-10 mx-auto w-[80%] px-[var(--container-pad)] py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12">
          {/* Left: logo + tagline + social */}
          <div className="flex flex-col space-y-4">
            <Link to="/" className="block no-underline">
              <img
                src="/images/LOGO BUENO KUBBOX/Recurso 52.svg"
                alt="Kubbox"
                style={{ height: "4rem", width: "auto", display: "block" }}
              />
            </Link>
            <p
              className="text-sm leading-relaxed"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--c-muted)",
              }}
            >
              Agencia de marketing digital y desarrollo web para marcas
              colombianas que quieren crecer en serio.
            </p>
            <ul className="flex space-x-6 text-gray-400">
              {SOCIAL.map(({ Icon, href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    className="hover:text-[#a3e635] transition-colors"
                  >
                    <Icon size={20} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer link sections */}
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h4
                className="text-white text-lg font-semibold mb-6"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="hover:text-[#a3e635] transition-colors"
                      style={{
                        fontFamily: "var(--font-body)",
                        color: "var(--c-muted)",
                      }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="border-t border-gray-700 my-8" />

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
          <p
            className="text-center md:text-left"
            style={{ fontFamily: "var(--font-body)", color: "var(--c-muted)" }}
          >
            © {new Date().getFullYear()} Kubbox. Todos los derechos reservados.
          </p>
          <p
            className="text-center md:text-left tracking-[0.04em]"
            style={{
              fontFamily: "var(--font-body)",
              color: "oklch(0.38 0.014 260)",
            }}
          >
            Agencia creativa · Medellín, Colombia
          </p>
        </div>
      </div>

      {/* Text hover effect - brillo que sigue al cursor */}
      <div className="lg:flex hidden h-[22rem] -mt-16 -mb-16">
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          viewBox="0 0 500 140"
          xmlns="http://www.w3.org/2000/svg"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
          className="select-none cursor-pointer"
        >
          <defs>
            <linearGradient
              id="textGradient"
              gradientUnits="userSpaceOnUse"
              cx="50%"
              cy="50%"
              r="25%"
            >
              {hovered && (
                <>
                  <stop offset="0%" stopColor="#a3e635" />
                  <stop offset="50%" stopColor="#84cc16" />
                  <stop offset="100%" stopColor="#65a30d" />
                </>
              )}
            </linearGradient>

            <radialGradient
              id="revealMask"
              gradientUnits="userSpaceOnUse"
              r="20%"
              cx={maskPosition.cx}
              cy={maskPosition.cy}
            >
              <stop offset="0%" stopColor="white" />
              <stop offset="100%" stopColor="black" />
            </radialGradient>
            <mask id="textMask">
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill="url(#revealMask)"
              />
            </mask>
          </defs>

          {/* Texto base (sombra) */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            strokeWidth="0.3"
            className="fill-transparent stroke-neutral-800 font-bold text-9xl"
            style={{
              fontFamily: "var(--font-display)",
              opacity: hovered ? 0.7 : 0,
            }}
          >
            KUBBOX
          </text>

          {/* Texto con borde verde - un poquititio más grueso */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            strokeWidth="0.8"
            className="fill-transparent font-bold text-9xl"
            style={{
              fontFamily: "var(--font-display)",
              stroke: "var(--c-lime)",
              WebkitTextStroke: "0.9px var(--c-lime)",
              opacity: 0.6,
            }}
          >
            KUBBOX
          </text>

          {/* Texto con gradiente - SOLO LA ZONA DEL HOVER */}
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            mask="url(#textMask)"
            className="fill-transparent font-bold text-9xl"
            style={{
              fontFamily: "var(--font-display)",
              fill: "url(#textGradient)",
            }}
          >
            KUBBOX
          </text>
        </svg>
      </div>
    </footer>
  );
}

/* ── Inline brand icons ────────────────────────────────────────── */

function IconInstagram({ size = 20 }) {
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

function IconFacebook({ size = 20 }) {
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

function IconLinkedin({ size = 20 }) {
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
