import { useState } from 'react'
import { motion } from 'framer-motion'
import { Users, Camera, Send, Check } from 'lucide-react'

import Button from '../../ui/Button'
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
          {/* ── Columna izquierda: datos + mapa ── */}
          <motion.div variants={fadeUp}>
            <div style={{ marginBottom: '1.5rem' }}>
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

            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.75rem' }}>
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

          {/* ── Columna derecha: formulario ── */}
          <motion.div variants={fadeUp}>
            <h2 className="contact-heading-outline">Contáctanos</h2>

            <form onSubmit={handleSubmit} className="contact-form">
              <label className="contact-field">
                <span>Nombre:</span>
                <input
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                />
              </label>

              <label className="contact-field">
                <span>Correo:</span>
                <input
                  type="email"
                  name="correo"
                  value={form.correo}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </label>

              <label className="contact-field">
                <span>Mensaje:</span>
                <textarea
                  name="mensaje"
                  rows={5}
                  value={form.mensaje}
                  onChange={handleChange}
                  required
                />
              </label>

              <Button type="submit" size="md" variant="primary" className="gap-2" disabled={sent}>
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
            </form>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2rem, 5vw, 4rem);
          align-items: start;
        }

        .contact-info-line {
          font-family: var(--font-body);
          font-size: clamp(0.9rem, 1.1vw, 1rem);
          color: var(--c-muted);
          line-height: 1.7;
          margin: 0;
        }
        .contact-info-line strong {
          color: var(--c-ink);
          font-weight: 700;
        }

        .contact-social-ic {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.4rem;
          height: 2.4rem;
          border-radius: 50%;
          border: 1px solid oklch(0.28 0.020 260);
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
          border-radius: 1rem;
          overflow: hidden;
          border: 1px solid oklch(0.26 0.022 260);
          height: clamp(220px, 28vw, 320px);
          box-shadow: 0 24px 60px -24px oklch(0.03 0.02 260 / 0.85);
        }

        .contact-heading-outline {
          font-family: var(--font-display);
          font-weight: 900;
          font-style: italic;
          font-size: clamp(2.1rem, 5vw, 3.25rem);
          letter-spacing: -0.02em;
          text-transform: uppercase;
          color: transparent;
          -webkit-text-stroke: 1.5px oklch(0.98 0 0 / 0.85);
          line-height: 1;
          margin: 0 0 1.75rem;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .contact-field {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .contact-field span {
          font-family: var(--font-body);
          font-weight: 700;
          font-style: italic;
          font-size: 0.92rem;
          color: var(--c-ink);
        }
        .contact-field input,
        .contact-field textarea {
          background: oklch(0.15 0.024 260);
          border: 1px solid oklch(0.26 0.022 260);
          border-radius: 0.6rem;
          padding: 0.85rem 1rem;
          color: var(--c-ink);
          font-family: var(--font-body);
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .contact-field textarea {
          resize: vertical;
          min-height: 130px;
        }
        .contact-field input:focus,
        .contact-field textarea:focus {
          border-color: var(--c-lime);
          box-shadow: 0 0 0 3px oklch(0.88 0.26 130 / 0.15);
        }

        @media (max-width: 880px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }
      `}</style>
    </section>
  )
}
