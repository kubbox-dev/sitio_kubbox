import { useState } from "react";
import * as m from "motion/react-m";
import {
  Users,
  Camera,
  Send,
  Check,
  User,
  Mail,
  MessageSquare,
  Phone,
} from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";

import Button from "../../ui/Button";
import { Input } from "../../ui/Input";
import { Textarea } from "../../ui/Textarea";
import {
  useScrollAnimation,
  fadeUp,
  staggerContainer,
} from "../../../hooks/useScrollAnimation";

const ADDRESS = "Cra. 48 #25B Sur 12, Zona 1, Envigado, Antioquia";
const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS + ", Colombia")}&output=embed`;

const SOCIAL = [
  { Icon: Users, href: "#", label: "Facebook" },
  { Icon: Camera, href: "#", label: "Instagram" },
];

export default function ContactFormSection() {
  const { ref, controls } = useScrollAnimation(0.15);
  const [state, handleSubmit] = useForm("xgoggjqr");

  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    mensaje: "",
  });

  const [countryCode, setCountryCode] = useState("+57");
  const [customCode, setCustomCode] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [showPhoneError, setShowPhoneError] = useState(false);

  const validatePhone = (value) => {
    if (!value || value.length === 0) {
      return true;
    }
    const digits = value.replace(/\D/g, "");
    if (digits.length === 0) {
      return true;
    }
    if (digits.length < 7) {
      return false;
    }
    if (digits.length > 15) {
      return false;
    }
    return true;
  };

  const handleCountryCodeChange = (e) => {
    const value = e.target.value;
    setCountryCode(value);
    if (value !== "otro") {
      setCustomCode("");
    }
  };

  const getFinalCountryCode = () => {
    if (countryCode === "otro" && customCode) {
      return customCode;
    }
    return countryCode;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "telefono") {
      const digits = value.replace(/\D/g, "");
      if (digits.length <= 15) {
        setForm((f) => ({ ...f, [name]: digits }));
        setShowPhoneError(false);
      }
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Validar teléfono solo al enviar
    if (form.telefono && !validatePhone(form.telefono)) {
      setShowPhoneError(true);
      if (form.telefono.length < 7) {
        setPhoneError("El número debe tener al menos 7 dígitos");
      } else if (form.telefono.length > 15) {
        setPhoneError("El número no puede tener más de 15 dígitos");
      }
      return;
    }

    setShowPhoneError(false);
    handleSubmit(e);
  };

  if (state.succeeded) {
    return (
      <section
        style={{
          position: "relative",
          paddingBlock: "clamp(2.5rem, 6vw, 5rem)",
        }}
      >
        <div
          style={{
            maxWidth: "var(--container)",
            marginInline: "auto",
            paddingInline: "var(--container-pad)",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div className="contact-grid">
            <div
              className="contact-panel contact-panel--form"
              style={{ gridColumn: "1 / -1" }}
            >
              <span
                className="contact-corner contact-corner--tl"
                aria-hidden="true"
              />
              <span
                className="contact-corner contact-corner--br"
                aria-hidden="true"
              />

              <div className="text-center py-12">
                <div className="text-[#a3e635] text-5xl mb-4">✅</div>
                <h3
                  className="text-white text-2xl font-bold mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  ¡Mensaje enviado!
                </h3>
                <p
                  className="text-white/70"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  En breve nos pondremos en contacto contigo. 📩
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      style={{ position: "relative", paddingBlock: "clamp(2.5rem, 6vw, 5rem)" }}
    >
      <div
        style={{
          maxWidth: "var(--container)",
          marginInline: "auto",
          paddingInline: "var(--container-pad)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <m.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={staggerContainer(0.12)}
          className="contact-grid"
        >
          {/* ── Panel izquierdo: datos + mapa ── */}
          <m.div variants={fadeUp} className="contact-panel">
            <span
              className="contact-corner contact-corner--tl"
              aria-hidden="true"
            />
            <span
              className="contact-corner contact-corner--br"
              aria-hidden="true"
            />

            <h3 className="contact-panel-heading">Encuéntranos</h3>
            <p className="contact-panel-sub">
              Así nos puedes ubicar y seguir de cerca.
            </p>

            <div className="contact-info-block">
              <p className="contact-info-line">
                <strong>Celular:</strong> 310 4255766
              </p>
              <p className="contact-info-line">
                <strong>Email:</strong> cfernandez@kubbox.com
              </p>
              <p className="contact-info-line">
                <strong>Dirección:</strong> {ADDRESS}
              </p>
            </div>

            <div className="contact-social-row">
              {SOCIAL.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="contact-social-ic"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>

            <div className="contact-map-wrap">
              <iframe
                src={MAP_SRC}
                title="Ubicación Kubbox"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{
                  width: "100%",
                  height: "100%",
                  border: 0,
                  display: "block",
                }}
              />
            </div>
          </m.div>

          {/* ── Panel derecho: formulario ── */}
          <m.div
            variants={fadeUp}
            className="contact-panel contact-panel--form"
          >
            <span
              className="contact-corner contact-corner--tl"
              aria-hidden="true"
            />
            <span
              className="contact-corner contact-corner--br"
              aria-hidden="true"
            />

            <h2 className="contact-heading-outline">Contáctanos</h2>
            <p className="contact-panel-sub">
              Cuéntanos en qué podemos ayudarte.
            </p>

            <form onSubmit={handleFormSubmit} className="contact-form">
              <input type="hidden" name="_captcha" value="true" />

              <div>
                <Input
                  icon={User}
                  label="Nombre"
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                />
                <ValidationError
                  prefix="Nombre"
                  field="nombre"
                  errors={state.errors}
                  className="text-red-400 text-xs mt-1 block"
                />
              </div>

              <div>
                <Input
                  icon={Mail}
                  label="Correo"
                  type="email"
                  name="correo"
                  value={form.correo}
                  onChange={handleChange}
                  required
                  autoComplete="email"
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
                <div className="flex gap-2 w-full items-end">
                  <div className="flex-shrink-0 w-32">
                    <select
                      name="codigo_pais"
                      value={countryCode}
                      onChange={handleCountryCodeChange}
                      className="w-full px-4 py-3 bg-[#050C16] border-0 border-b-2 border-white/10 rounded-none text-white placeholder:text-white/50 focus:outline-none focus:border-[#a3e635] transition-colors text-sm appearance-none custom-select h-[52px]"
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

                  <div className="flex-1 min-w-0">
                    <Input
                      icon={Phone}
                      label="Teléfono"
                      type="tel"
                      name="telefono"
                      value={form.telefono}
                      onChange={handleChange}
                      autoComplete="tel"
                      className={
                        showPhoneError &&
                        form.telefono &&
                        form.telefono.length > 0
                          ? "border-red-500 focus:border-red-500"
                          : ""
                      }
                    />
                  </div>
                </div>

                {countryCode === "otro" && (
                  <div className="mt-2">
                    <input
                      type="text"
                      name="codigo_personalizado"
                      placeholder="Ingresa tu código de país (ej: +123)"
                      value={customCode}
                      onChange={(e) => setCustomCode(e.target.value)}
                      className="w-full px-4 py-3 bg-[#050C16] border border-white/10 rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:border-[#a3e635] transition-colors text-sm"
                      style={{ fontFamily: "var(--font-body)" }}
                      required={countryCode === "otro"}
                    />
                    <input
                      type="hidden"
                      name="codigo_pais_final"
                      value={getFinalCountryCode()}
                    />
                  </div>
                )}

                {showPhoneError && form.telefono && form.telefono.length > 0 ? (
                  <p className="text-red-400 text-xs mt-1 font-medium">
                    ⚠️ {phoneError}
                  </p>
                ) : (
                  <p className="text-white/40 text-xs mt-1">
                    Mínimo 7 dígitos, máximo 15
                  </p>
                )}
                <ValidationError
                  prefix="Teléfono"
                  field="telefono"
                  errors={state.errors}
                  className="text-red-400 text-xs mt-1 block"
                />
              </div>

              <div>
                <Textarea
                  icon={MessageSquare}
                  label="Mensaje"
                  name="mensaje"
                  rows={5}
                  value={form.mensaje}
                  onChange={handleChange}
                  required
                />
                <ValidationError
                  prefix="Mensaje"
                  field="mensaje"
                  errors={state.errors}
                  className="text-red-400 text-xs mt-1 block"
                />
              </div>

              <div className="contact-form-footer">
                <Button
                  type="submit"
                  size="md"
                  variant="primary"
                  className="gap-2 w-full"
                  disabled={state.submitting}
                >
                  {state.submitting ? (
                    <>
                      Enviando... <Send size={16} className="animate-spin" />
                    </>
                  ) : (
                    <>
                      Enviar mensaje <Send size={16} />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </m.div>
        </m.div>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(1.5rem, 3.5vw, 2.5rem);
          align-items: stretch;
        }

        .contact-panel {
          position: relative;
          background: oklch(0.13 0.020 260 / 0.85);
          border: 1px solid oklch(0.26 0.022 260);
          border-radius: 1.5rem;
          backdrop-filter: blur(14px);
          box-shadow: 0 40px 110px -40px oklch(0.03 0.02 260 / 0.9);
          padding: clamp(1.75rem, 3vw, 2.5rem);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .contact-panel::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(to right, transparent 5%, var(--c-lime) 40%, var(--c-lime) 60%, transparent 95%);
          opacity: 0.6;
        }

        .contact-corner {
          position: absolute;
          width: 18px;
          height: 18px;
          border: 1.5px solid oklch(0.88 0.26 130 / 0.4);
          pointer-events: none;
          z-index: 2;
        }
        .contact-corner--tl { top: 16px; left: 16px; border-right: 0; border-bottom: 0; }
        .contact-corner--br { bottom: 16px; right: 16px; border-left: 0; border-top: 0; }

        .contact-panel-heading {
          font-family: var(--font-display);
          font-weight: 800;
          font-style: italic;
          font-size: clamp(1.4rem, 2.8vw, 1.85rem);
          letter-spacing: -0.01em;
          text-transform: uppercase;
          color: var(--c-ink);
          line-height: 1;
          margin: 0 0 0.5rem;
          position: relative;
          z-index: 1;
        }
        .contact-panel-sub {
          font-family: var(--font-body);
          font-size: 0.88rem;
          color: var(--c-muted);
          line-height: 1.6;
          margin: 0 0 1.75rem;
          max-width: 38ch;
          position: relative;
          z-index: 1;
        }

        .contact-info-block {
          margin-bottom: 1.5rem;
          position: relative;
          z-index: 1;
        }
        .contact-info-line {
          font-family: var(--font-body);
          font-size: clamp(0.88rem, 1.05vw, 0.98rem);
          color: var(--c-muted);
          line-height: 1.75;
          margin: 0;
        }
        .contact-info-line strong {
          color: var(--c-ink);
          font-weight: 700;
        }

        .contact-social-row {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1.75rem;
          position: relative;
          z-index: 1;
        }
        .contact-social-ic {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.4rem;
          height: 2.4rem;
          border-radius: 50%;
          border: 1px solid oklch(0.30 0.020 260);
          color: var(--c-muted);
          text-decoration: none;
          transition: color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .contact-social-ic:hover {
          color: var(--c-lime);
          border-color: var(--c-lime);
          box-shadow: 0 0 16px oklch(0.88 0.26 130 / 0.25);
        }

        .contact-map-wrap {
          border-radius: 0.85rem;
          overflow: hidden;
          flex: 1;
          min-height: clamp(180px, 22vw, 260px);
          position: relative;
          z-index: 1;
          filter: saturate(0.9);
        }

        .contact-heading-outline {
          font-family: var(--font-display);
          font-weight: 900;
          font-style: italic;
          font-size: clamp(1.5rem, 2.6vw, 2.15rem);
          letter-spacing: -0.01em;
          text-transform: uppercase;
          color: transparent;
          -webkit-text-stroke: 1.5px oklch(0.98 0 0 / 0.85);
          line-height: 1;
          margin: 0 0 0.5rem;
          padding-right: 0.15em;
          position: relative;
          z-index: 1;
          white-space: nowrap;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          position: relative;
          z-index: 1;
          flex: 1;
        }
        .contact-form input,
        .contact-form textarea {
          font-family: var(--font-body);
        }
        .contact-form textarea {
          min-height: 120px;
        }

        .contact-form-footer {
          margin-top: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .custom-select {
          background-color: #050C16;
          color: white;
          border-bottom: 2px solid rgba(255, 255, 255, 0.1) !important;
        }

        .custom-select:focus {
          border-bottom: 2px solid #a3e635 !important;
          outline: none !important;
          box-shadow: none !important;
        }

        .custom-select option {
          background-color: #050C16;
          color: white;
          padding: 8px 12px;
        }

        .custom-select option:hover {
          background-color: #1C4964;
        }

        @media (max-width: 880px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 1.75rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .contact-status-dot { animation: none; }
        }
      `}</style>
    </section>
  );
}
