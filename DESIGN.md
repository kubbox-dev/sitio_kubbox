# Design

## Color Palette

Mood: "Estudio creativo de Medellín de noche — energía coral vibrante, superficies oscuras sofisticadas, calidez humana en la tipografía"

Strategy: **Committed** — el coral-rojo lleva 40-50% del impacto visual contra fondo oscuro near-black.

```css
:root {
  --color-primary:  oklch(0.62 0.230 12);   /* coral-red vibrante — anchor del brand */
  --color-accent:   oklch(0.75 0.160 50);   /* amber-naranja — contraste cálido */
  --color-bg:       oklch(0.08 0.000 0);    /* near-black puro — fondo base */
  --color-surface:  oklch(0.13 0.008 12);   /* dark surface con toque del primary */
  --color-ink:      oklch(0.96 0.005 60);   /* near-white ligeramente cálido */
  --color-muted:    oklch(0.52 0.008 12);   /* texto secundario */
}
```

Text on primary fill: white (`--color-ink`). La regla Helmholtz-Kohlrausch aplica: L=0.62 + chroma 0.23 → siempre texto blanco.

## Typography

Display / headings: **Syne** (Google Fonts) — geométrica, moderna, con carácter propio. Weights: 700, 800.
Body: **Plus Jakarta Sans** — humanista, legible, cálida. Weights: 400, 500, 600.

```css
--font-display: 'Syne', sans-serif;
--font-body:    'Plus Jakarta Sans', sans-serif;
```

Scale: clamp-based. Display heading max: clamp(2.5rem, 6vw, 5.5rem). Body: 1rem / 1.65. Line length cap: 68ch.

## Motion

Library: Framer Motion. Filosofía: un reveal bien orquestado por sección > micro-interacciones dispersas.

- Scroll-triggered: fade-up con stagger en listas de features/servicios.
- Hero: entrada escalonada (headline → subline → CTA) con spring physics.
- Hover states: escala sutil (1.02–1.03) con ease-out-quart en cards y botones.
- `prefers-reduced-motion`: crossfade instantáneo, sin translate/scale.

## Layout

- Max-width contenedor: 1200px, con padding horizontal responsive.
- Grid 2D para secciones de features (auto-fit, minmax 280px, 1fr).
- Asimetría deliberada en el hero: texto a la izquierda, elemento visual a la derecha con grid-breaking overlay.
- Z-index escala semántica: overlay(10) → sticky-nav(20) → modal(30) → toast(40).

## Components

### Botón primario
```
background: var(--color-primary)
color: var(--color-ink)          /* blanco */
border-radius: 0.375rem
padding: 0.75rem 1.75rem
font: 600 var(--font-body)
hover: brightness(1.08) + scale(1.02)
```

### Card de servicio
```
background: var(--color-surface)
border: 1px solid oklch(0.20 0.008 12)
border-radius: 0.75rem
hover: border-color var(--color-primary) con transición 200ms
```

## Aesthetic Direction

Dark, committed, modern. El coral-rojo corta el oscuro con energía — no es frío (Vercel), es cálido-audaz (agencia creativa). Syne en los títulos aporta personalidad geométrica sin ser genérico. El movimiento reveal-and-stagger refuerza que la agencia cuida cada detalle.
