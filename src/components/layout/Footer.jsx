import { Link } from "react-router-dom";
import React from "react";
import { useForm, ValidationError } from "@formspree/react";

// ============ DATOS DEL FOOTER ============
const SECTIONS = [
  {
    title: "Inicio",
    links: [
      { name: "Experiencia", href: "/" },
      { name: "Servicios", href: "/servicios/desarrollo-digital" },
      { name: "Nosotros", href: "/nosotros" },
      { name: "Contacto", href: "/contacto" },
    ],
  },
  {
    title: "Trabajamos con:",
    links: [
      { name: "Wordpress", href: "#", icon: "/images/Footer/Wordpress.svg" },
      { name: "Kommo", href: "#", icon: "/images/Footer/kommo.svg" },
      { name: "WhatsApp", href: "#", icon: "/images/Footer/Whatsapp.svg" },
      { name: "Shopify", href: "#", icon: "/images/Footer/Shopify.svg" },
      {
        name: "Woo Commerce",
        href: "#",
        icon: "/images/Footer/Woo commerce.svg",
      },
      { name: "Elementor", href: "#", icon: "/images/Footer/Elementor.svg" },
    ],
  },
];

// ============ COMPONENTE DE CONTACTO CON FORMSPREE ============
function ContactForm() {
  const [state, handleSubmit] = useForm("xgoggjqr");

  if (state.succeeded) {
    return (
      <div className="text-[#a3e635] text-sm font-medium text-center py-4">
        ✅ ¡Mensaje enviado con éxito! En breve nos pondremos en contacto.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="_captcha" value="true" />

      <div>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          required
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-[#a3e635] transition-colors text-sm"
          style={{ fontFamily: "var(--font-body)" }}
        />
        <ValidationError
          prefix="Nombre"
          field="nombre"
          errors={state.errors}
          className="text-red-400 text-xs mt-1 block"
        />
      </div>
      <div>
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          required
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-[#a3e635] transition-colors text-sm"
          style={{ fontFamily: "var(--font-body)" }}
        />
        <ValidationError
          prefix="Correo"
          field="correo"
          errors={state.errors}
          className="text-red-400 text-xs mt-1 block"
        />
      </div>
      <div>
        <input
          type="tel"
          name="telefono"
          placeholder="Teléfono"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-[#a3e635] transition-colors text-sm"
          style={{ fontFamily: "var(--font-body)" }}
        />
      </div>
      <button
        type="submit"
        disabled={state.submitting}
        className="w-full px-4 py-3 bg-[#a3e635] hover:bg-[#84cc16] text-black font-semibold rounded-lg transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {state.submitting ? "Enviando..." : "Enviar"}
      </button>
    </form>
  );
}

// ============ FOOTER PRINCIPAL ============
export default function Footer() {
  return (
    <footer className="relative w-full bg-black">
      <div className="relative z-10 mx-auto w-[80%] px-[var(--container-pad)] py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12">
          {/* Left: Información */}
          <div className="flex flex-col">
            <h2
              className="text-white text-lg font-semibold mb-6"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Información
            </h2>
            <p
              className="text-sm leading-relaxed"
              style={{
                fontFamily: "var(--font-body)",
                color: "rgba(255, 255, 255, 0.7)",
              }}
            >
              Cra. 48 #25B SUR 12, Zona 2, Envigado, Antioquia
            </p>
            <p
              className="text-sm leading-relaxed mt-3"
              style={{
                fontFamily: "var(--font-body)",
                color: "rgba(255, 255, 255, 0.7)",
              }}
            >
              Horario de atención
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{
                fontFamily: "var(--font-body)",
                color: "rgba(255, 255, 255, 0.7)",
              }}
            >
              Contáctanos, estamos disponibles para atenderte
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{
                fontFamily: "var(--font-body)",
                color: "rgba(255, 255, 255, 0.7)",
              }}
            >
              Lunes a viernes 8:00AM - 6:00PM
            </p>
            <p
              className="text-sm leading-relaxed mt-3"
              style={{
                fontFamily: "var(--font-body)",
                color: "rgba(255, 255, 255, 0.7)",
              }}
            >
              Teléfono: +57 3104255766
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{
                fontFamily: "var(--font-body)",
                color: "rgba(255, 255, 255, 0.7)",
              }}
            >
              cfernandez@kubbox.com
            </p>
          </div>

          {/* Footer link sections */}
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h3
                className="text-white text-lg font-semibold mb-6"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name} className="flex items-center gap-2">
                    {section.title === "Inicio" && (
                      <span className="text-white text-sm flex-shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="9 12 11.5 14.5 16 9.5" />
                        </svg>
                      </span>
                    )}
                    {section.title === "Trabajamos con:" && link.icon ? (
                      <img
                        src={link.icon}
                        alt={link.name}
                        className="w-auto object-contain hover:opacity-80 transition-opacity"
                        style={{
                          height:
                            link.name === "Wordpress"
                              ? "24px"
                              : link.name === "Kommo"
                                ? "15px"
                                : link.name === "WhatsApp"
                                  ? "24px"
                                  : link.name === "Shopify"
                                    ? "22px"
                                    : link.name === "Woo Commerce"
                                      ? "22px"
                                      : link.name === "Elementor"
                                        ? "26px"
                                        : "24px",
                        }}
                      />
                    ) : (
                      <Link
                        to={link.href}
                        className="hover:text-[#a3e635] transition-colors"
                        style={{
                          fontFamily: "var(--font-body)",
                          color: "rgba(255, 255, 255, 0.7)",
                        }}
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* ¡Pongámonos en contacto! - Formulario con Formspree */}
          <div>
            <h3
              className="text-white text-lg font-semibold mb-6"
              style={{ fontFamily: "var(--font-body)" }}
            >
              ¡Pongámonos en contacto!
            </h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </footer>
  );
}
