# Widget flotante de WhatsApp — Diseño

## Contexto

El sitio necesita un botón flotante de WhatsApp (la típica "ventana de chat" que despliegan la mayoría de sitios) para que los visitantes puedan escribir directo por WhatsApp desde cualquier página. No requiere integración de backend ni webhook: es un enlace `wa.me` con un mensaje predefinido.

Se evaluó instalar `@digicroz/react-floating-whatsapp` (y alternativas similares: `react-floating-whatsapp`, `@dxkit-org/react-floating-whatsapp`, `@harisenin/react-floating-whatsapp`). Se descartó instalar cualquiera de estos paquetes por:
- Bajo peso justificado: ~405KB sin comprimir para un componente que en la práctica es un botón + un panel.
- Baja adopción / riesgo de supply-chain para una pieza tan simple del sitio.
- Estética genérica que habría que sobre-escribir por completo para calzar con la identidad de marca (neon-lima, navy, Barlow Condensed) — entrando en conflicto con la convención del proyecto de estilizar solo con Tailwind ([CLAUDE.md](../../../CLAUDE.md)).

Se construye un componente propio, reutilizando dependencias ya instaladas (Tailwind, Framer Motion, lucide-react).

## Componente

`src/components/layout/WhatsAppWidget.jsx` — archivo único y autocontenido, mismo patrón que `Navbar.jsx` / `Footer.jsx`. Sin props externas: la configuración (número de WhatsApp, texto del mensaje, copy del saludo) vive como constantes en el propio archivo. Estado local (`useState`) para abierto/cerrado del panel. Sin dependencias nuevas.

## Datos y enlace de WhatsApp

- Número: `+57 310 425 5766` (el mismo publicado en el footer del sitio), formateado como `573104255766` para el enlace.
- Mensaje predefinido (URL-encoded): `Hola, quiero información sobre los servicios de Kubbox`.
- Enlace final: `https://wa.me/573104255766?text=<mensaje-encoded>`, abierto con un `<a target="_blank" rel="noopener noreferrer">` real (no `window.open` desde `onClick`, para mantener el comportamiento nativo de "abrir en pestaña nueva" accesible y bloqueable por el navegador de forma estándar).

## Estados visuales

### Cerrado — botón flotante
- Posición: `fixed bottom-6 right-6`, círculo de ~60px.
- Fondo: lime (`--color-cta-bg` / `bg-[#a3e635]`, coherente con el CTA del formulario de `Footer.jsx`).
- Ícono: glifo de WhatsApp como SVG inline (mismo patrón que el ícono de check inline que ya usa `Footer.jsx`), color navy oscuro (`--color-cta-ink`) para cumplir la nota de contraste de `DESIGN.md` (nunca texto/ícono blanco sobre superficie lime).
- Halo: `--glow-lime` detrás del botón, con `animate-pulse` lento y sutil (no un `ping` agresivo).
- Hover: `whileHover` scale 1.05 vía Framer Motion.

### Abierto — panel de chat
- Tarjeta anclada al botón: `absolute bottom-20 right-0`, ancho `w-[calc(100vw-2rem)] max-w-[320px]` (responsive en móvil).
- Superficie: `--color-surface`, borde sutil lime/teal, `rounded-2xl`.
- Header: glifo de WhatsApp + wordmark "Kubbox" (Barlow Condensed, consistente con el resto de headings) + punto teal de "en línea" + botón cerrar (ícono `X` de `lucide-react`).
- Burbuja de saludo (Barlow, sobre `--color-surface2`): *"Hola 👋 ¿en qué podemos ayudarte? Escríbenos y te respondemos por WhatsApp."*
- CTA `Escribir por WhatsApp`: fill lime / texto navy, mismo patrón que el botón de envío del formulario de contacto en `Footer.jsx`.

## Interacciones y animación

- `AnimatePresence` + spring para la entrada/salida del panel, `transform-origin` en la esquina inferior derecha (crece desde el botón, no desde el centro de la pantalla).
- El ícono del botón alterna entre el glifo de WhatsApp y una `X` al abrir/cerrar el panel.
- `Escape` cierra el panel si está abierto.

## Accesibilidad

- Botón real: `<button aria-expanded={open} aria-label="Abrir chat de WhatsApp">`.
- El CTA del panel es un `<a>` real, navegable por teclado.
- Contraste verificado según `DESIGN.md` (ink navy sobre fondo lime en todos los elementos con fill lime).

## Montaje

Se monta una única vez en `src/router/index.jsx`, junto a `<Navbar />` / `<Footer />`, fuera de `<Routes>` — visible en **todas** las páginas del sitio con una sola instancia (decisión confirmada: alcance global, no por-página). `z-index` en `z-50`, consistente con los elementos fixed del `Navbar` (que llegan hasta `z-50`).

## Fuera de alcance (YAGNI)

No se implementa, porque no fue solicitado y añade complejidad sin necesidad:
- Sonido de notificación.
- Efecto de "escribiendo…".
- Badge de notificación / contador.
- Cierre automático por temporizador.
- Integración real de mensajería (webhook, API de WhatsApp Business, etc.) — es solo un enlace `wa.me`.

## Testing

No hay suite de tests en el proyecto para componentes de UI. Verificación manual con el servidor de desarrollo (`npm run dev`): confirmar apertura/cierre del panel, el enlace `wa.me` correcto (número y mensaje), contraste de color, comportamiento responsive en móvil, y que el widget aparece en todas las rutas.
