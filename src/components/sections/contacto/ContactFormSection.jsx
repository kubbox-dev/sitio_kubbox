import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Camera, Send, Check, User, Mail, MessageSquare } from 'lucide-react'

import Button from '../../ui/Button'
import { Input } from '../../ui/Input'
import { Textarea } from '../../ui/Textarea'
import { useScrollAnimation, fadeUp, staggerContainer } from '../../../hooks/useScrollAnimation'

const ADDRESS = 'Cra. 48 #25B Sur 12, Zona 1, Envigado, Antioquia'
const MAP_SRC = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS + ', Colombia')}&output=embed`

const SOCIAL = [
  { Icon: Users,  href: '#', label: 'Facebook' },
  { Icon: Camera, href: '#', label: 'Instagram' },
]

export default function ContactFormSection() {
  const { ref, controls } = useScrollAnimation(0.15)
  const [form, setForm] = useState({ nombre: '', correo: '', mensaje: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section style={{ position: 'relative', paddingBlock: 'clamp(2.5rem, 6vw, 5rem)' }}>
      <div
        style={{
          maxWidth: 'var(--container)',
          marginInline: 'auto',
          paddingInline: 'var(--container-pad)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={staggerContainer(0.12)}
          className="contact-grid"
        >
          {/* ── Panel izquierdo: datos + mapa ── */}
          <motion.div variants={fadeUp} className="contact-panel">
            <span className="contact-corner contact-corner--tl" aria-hidden="true" />
            <span className="contact-corner contact-corner--br" aria-hidden="true" />

            <h3 className="contact-panel-heading">Encuéntranos</h3>
            <p className="contact-panel-sub">Así nos puedes ubicar y seguir de cerca.</p>

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
                <a key={label} href={href} aria-label={label} className="contact-social-ic">
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
                style={{ width: '100%', height: '100%', border: 0, display: 'block' }}
              />
            </div>
          </motion.div>

          {/* ── Panel derecho: formulario ── */}
          <motion.div variants={fadeUp} className="contact-panel contact-panel--form">
            <span className="contact-corner contact-corner--tl" aria-hidden="true" />
            <span className="contact-corner contact-corner--br" aria-hidden="true" />

            <h2 className="contact-heading-outline">Contáctanos</h2>
            <p className="contact-panel-sub">Cuéntanos en qué podemos ayudarte, te respondemos rápido.</p>

            <form onSubmit={handleSubmit} className="contact-form">
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

              <Textarea
                icon={MessageSquare}
                label="Mensaje"
                name="mensaje"
                rows={5}
                value={form.mensaje}
                onChange={handleChange}
                required
              />

              <div className="contact-form-footer">
                <Button type="submit" size="md" variant="primary" className="gap-2 w-full" disabled={sent}>
                  {sent ? (
                    <>
                      ¡Mensaje enviado! <Check size={16} />
                    </>
                  ) : (
                    <>
                      Enviar mensaje <Send size={16} />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(1.5rem, 3.5vw, 2.5rem);
          align-items: stretch;
        }

        /* ── Panel base — mismo lenguaje visual que .svc-card-new ── */
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

        .contact-watermark {
          position: absolute;
          right: -1.5rem;
          bottom: -1.5rem;
          color: var(--c-lime);
          opacity: 0.06;
          pointer-events: none;
          z-index: 0;
        }

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
          font-size: clamp(1.85rem, 4vw, 2.75rem);
          letter-spacing: -0.02em;
          text-transform: uppercase;
          color: transparent;
          -webkit-text-stroke: 1.5px oklch(0.98 0 0 / 0.85);
          line-height: 1;
          margin: 0 0 0.5rem;
          position: relative;
          z-index: 1;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 2rem;
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

        .contact-status-line {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-body);
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.02em;
          color: var(--c-muted);
          margin: 0;
        }
        .contact-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--c-lime);
          box-shadow: 0 0 8px var(--c-lime);
          flex-shrink: 0;
          animation: contact-pulse 2s ease-in-out infinite;
        }
        @keyframes contact-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
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
  )
}
