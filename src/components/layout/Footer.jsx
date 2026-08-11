import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import ReCAPTCHA from "react-google-recaptcha";

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
  const [phoneError, setPhoneError] = useState("");
  const [telefono, setTelefono] = useState("");
  const [countryCode, setCountryCode] = useState("+57");
  const [customCode, setCustomCode] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null);
  const [captchaError, setCaptchaError] = useState(false);

  // Site Key de reCAPTCHA
  const RECAPTCHA_SITE_KEY = "6LcK1IAtAAAAACdTO15skeBRg3SXlHYZ85Foo8Qm";

  const validatePhone = (value) => {
    if (!value || value.length === 0) {
      setPhoneError("");
      return true;
    }
    const digits = value.replace(/\D/g, "");
    if (digits.length === 0) {
      setPhoneError("");
      return true;
    }
    if (digits.length < 7) {
      setPhoneError("El número debe tener al menos 7 dígitos");
      return false;
    }
    if (digits.length > 15) {
      setPhoneError("El número no puede tener más de 15 dígitos");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const handleCountryCodeChange = (e) => {
    const value = e.target.value;
    setCountryCode(value);
    if (value !== "otro") {
      setCustomCode("");
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 15) {
      setTelefono(value);
      validatePhone(value);
    }
  };

  const handleBlur = (e) => {
    validatePhone(e.target.value);
  };

  const onCaptchaChange = (value) => {
    setCaptchaValue(value);
    setCaptchaError(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validar captcha
    if (!captchaValue) {
      setCaptchaError(true);
      return;
    }

    if (telefono && !validatePhone(telefono)) {
      return;
    }

    handleSubmit(e);
  };

  if (state.succeeded) {
    return (
      <div className="text-[#a3e635] text-sm font-medium text-center py-4">
        ✅ ¡Mensaje enviado con éxito! En breve nos pondremos en contacto.
      </div>
    );
  }

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4">
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

      {/* Teléfono con código de país */}
      <div>
        <div className="flex gap-2">
          <div className="flex-shrink-0 w-28">
            <select
              value={countryCode}
              onChange={handleCountryCodeChange}
              className="w-full px-3 py-3 bg-[#1a1a1a] border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-[#a3e635] transition-colors text-sm appearance-none"
              style={{ fontFamily: "var(--font-body)" }}
            >
              <option value="+1">+1 (EE.UU)</option>
              <option value="+34">+34 (España)</option>
              <option value="+52">+52 (México)</option>
              <option value="+54">+54 (Argentina)</option>
              <option value="+56">+56 (Chile)</option>
              <option value="+57">+57 (Colombia)</option>
              <option value="+58">+58 (Venezuela)</option>
              <option value="+591">+591 (Bolivia)</option>
              <option value="+593">+593 (Ecuador)</option>
              <option value="+598">+598 (Uruguay)</option>
              <option value="+502">+502 (Guatemala)</option>
              <option value="+503">+503 (El Salvador)</option>
              <option value="+504">+504 (Honduras)</option>
              <option value="+505">+505 (Nicaragua)</option>
              <option value="+506">+506 (Costa Rica)</option>
              <option value="+507">+507 (Panamá)</option>
              <option value="otro">✏️ Otro</option>
            </select>
          </div>

          <div className="flex-1">
            <input
              type="tel"
              name="telefono"
              placeholder="Teléfono"
              value={telefono}
              onChange={handlePhoneChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-[#a3e635] transition-colors text-sm ${
                phoneError && telefono.length > 0
                  ? "border-red-500 focus:border-red-500"
                  : "border-white/10"
              }`}
              style={{ fontFamily: "var(--font-body)" }}
            />
          </div>
        </div>

        {countryCode === "otro" && (
          <div className="mt-2">
            <input
              type="text"
              placeholder="Ingresa tu código (ej: +123)"
              value={customCode}
              onChange={(e) => setCustomCode(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-[#a3e635] transition-colors text-sm"
              style={{ fontFamily: "var(--font-body)" }}
            />
          </div>
        )}

        {phoneError && telefono.length > 0 && (
          <p className="text-red-400 text-xs mt-1 font-medium">
            ⚠️ {phoneError}
          </p>
        )}
        {!phoneError && telefono.length > 0 && (
          <p className="text-green-400 text-xs mt-1">✅ Teléfono válido</p>
        )}
        <p className="text-white/40 text-xs mt-1">
          Mínimo 7 dígitos, máximo 15
        </p>
      </div>

      {/* reCAPTCHA */}
      <div className="flex justify-center">
        <ReCAPTCHA
          sitekey={RECAPTCHA_SITE_KEY}
          onChange={onCaptchaChange}
          theme="dark"
          size="normal"
          hl="es"
        />
      </div>
      {captchaError && (
        <p className="text-red-400 text-xs text-center font-medium">
          ⚠️ Por favor, confirma que no eres un robot.
        </p>
      )}

      <button
        type="submit"
        disabled={state.submitting || (telefono.length > 0 && !!phoneError)}
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
