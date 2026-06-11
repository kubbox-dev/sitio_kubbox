# Design

## Color Palette

Mood: "Pantalla de monitoreo nocturno en un estudio creativo de Bogotá — energía neon-lima electrizante, fondos navy profundos, acento teal como segundo voltaje"

Strategy: **Committed** — el neon-lima lleva ~45% del impacto visual; el navy oscuro es el escenario; el teal complementa sin competir.

Reference anchor: Liquid Death acid-green energy × Vercel dark precision.

```css
:root {
  /* Brand anchors */
  --color-lime:     oklch(0.88 0.260 130);   /* neon lime — texto de impacto, CTAs borde */
  --color-teal:     oklch(0.72 0.150 190);   /* teal secundario — acentos, glows */

  /* Surfaces */
  --color-bg:       oklch(0.09 0.025 260);   /* dark navy — fondo base */
  --color-surface:  oklch(0.14 0.028 260);   /* navy card surface */
  --color-surface2: oklch(0.18 0.025 260);   /* hover/elevated surface */

  /* Text */
  --color-ink:      oklch(0.98 0.000 0);     /* blanco puro para texto principal */
  --color-muted:    oklch(0.56 0.018 260);   /* texto secundario / muted */

  /* CTA fill (lime como background de botón — texto dark) */
  --color-cta-bg:   oklch(0.88 0.220 130);   /* lime ligeramente reducido para fills */
  --color-cta-ink:  oklch(0.09 0.025 260);   /* navy oscuro como texto sobre lime */

  /* Glows */
  --glow-lime:      oklch(0.88 0.260 130 / 0.18);
  --glow-teal:      oklch(0.72 0.150 190 / 0.15);
}
```

**Nota de contraste**:
- `--color-ink` sobre `--color-bg`: WCAG AA ✓ (≥7:1 estimado)
- `--color-lime` como texto sobre `--color-bg`: contraste visual alto — lime en dark navy es la firma del diseño
- Texto sobre `--color-cta-bg`: usar `--color-cta-ink` (navy), nunca blanco — L=0.88 es superficie clara

## Typography

Brand voice words: **"eléctrica, audaz, nocturna"**

Physical object reference: Un letrero luminoso en una carretera industrial de noche — condensado, contundente, diseñado para impactar a velocidad.

- Display: **Barlow Condensed** (ExtraBold 800, Black 900) — industrial condensado, no en lista de rechazo, alto impacto en dark surfaces
- Body: **Barlow** (Regular 400, Medium 500, SemiBold 600) — misma familia superfont, cohesión máxima, calidez humanista

```css
--font-display: 'Barlow Condensed', sans-serif;
--font-body:    'Barlow', sans-serif;
```

**Google Fonts import**:
```
Barlow Condensed: wght@700;800;900
Barlow: wght@400;500;600
```

Scale fluid (clamp):
- Hero display: `clamp(3rem, 8vw, 5.5rem)` — uppercase, letter-spacing -0.02em
- Section heading: `clamp(2rem, 5vw, 3.5rem)`
- Subheading: `clamp(1.25rem, 2.5vw, 1.75rem)`
- Body: `1rem / 1.65`
- Line length cap: 68ch
- Dark-on-dark rule: line-height aumentado +0.08 vs equivalente light theme

## Motion

Library: **Framer Motion** (ya instalado).
Smooth scroll: **Lenis** (instalar).

Filosofía: cada sección tiene su propia entrada — no el mismo fade-up repetido. La firma de la marca es el movimiento con energía.

### Patrones por sección

| Sección | Entrada | Detalle |
|---|---|---|
| Hero | Stagger escalonado | headline split por palabras, delay 0.1s/palabra, spring physics |
| Projects | Slide horizontal | scroll-driven horizontal reveal con clip-path |
| Services | Zoom-in from darkness | imagen central escala de 0.85→1, backdrop blur desvanece |
| AI Section | Text reveal + float | "IA" se revela por clip-path de abajo, elemento 3D flota |
| Philosophy | Fade escalonado | cubos y quotes aparecen por stagger |
| Clients | Ticker continuo | logos en marquee horizontal infinito |
| CTA final | Scale up dramatic | gráfico 3D sube desde fuera del viewport |

Hover states:
- Cards: `scale(1.02)` + `border-color → --color-lime` en 200ms ease-out-quart
- Botones primarios: `brightness(1.08)` + sombra `--glow-lime`
- Nav links: underline que se dibuja de izq a der con clip-path

`prefers-reduced-motion`: opacity crossfade, sin transform/scale, sin ticker.

## Layout

- Contenedor max-width: `1200px`, padding inline: `clamp(1rem, 5vw, 3rem)`
- Grid 2D para servicios: `repeat(auto-fit, minmax(280px, 1fr))`
- Hero: asimétrico — texto izquierda 55%, elemento visual derecha 45% con overlap
- Secciones full-viewport con `min-height: 100svh` donde aplica
- Z-index semántico: `overlay 10 · sticky-nav 20 · modal-bg 30 · modal 40 · toast 50`

## Component Architecture (modular)

```
src/
  components/
    layout/
      Navbar.jsx        ← sticky, blur backdrop, nav links animados
      Footer.jsx        ← dark, links, social icons
    sections/
      HeroSection.jsx   ← hero full-screen, stagger de palabras
      ProjectsSection.jsx  ← carousel horizontal con ProjectCard
      ServicesSection.jsx  ← grid + imagen central con AR glasses
      AISection.jsx     ← "IA" reveal + copy + phone imagery
      PhilosophySection.jsx  ← cubos 3D + quotes + frases de marca
      ClientsSection.jsx   ← marquee de logos
      CTASection.jsx    ← headline final + chart + CTA
    ui/
      Button.jsx        ← variantes: primary (lime fill), outline (lime border), ghost
      ProjectCard.jsx   ← imagen + número + título + descripción
      ServiceCard.jsx   ← icon + título + bullets
      GlowOrb.jsx       ← elemento decorativo: orb con blur radial
      AnimatedWord.jsx  ← helper para word-by-word stagger
  hooks/
    useScrollAnimation.js   ← hook reutilizable para inView triggers
  styles/
    tokens.css          ← todas las CSS custom properties + @import fuentes
  App.jsx
  main.jsx
```

## Aesthetic Direction

Cyber-nocturno comprometido. El navy profundo es el escenario; el neon-lima es la electricidad que corre por él. Barlow Condensed en mayúsculas masivas lleva la voz — directa, contundente, sin adornos. Los orbs de glow teal y lime en los fondos crean profundidad atmosférica sin convertirse en decoración superficial. El movimiento es deliberado: cada sección tiene su firma de entrada, no una fórmula repetida.

Lo que distingue este sitio: la energía de una agencia que practica lo que predica — si prometen diseño de alto impacto, el sitio tiene que ser la prueba más convincente de eso.
