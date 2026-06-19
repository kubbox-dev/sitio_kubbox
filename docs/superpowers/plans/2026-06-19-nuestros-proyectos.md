# Nuestros Proyectos — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir la sección "Nuestros Proyectos" con páginas de detalle por proyecto (`/proyectos/:slug`) armadas desde una lista de bloques componibles declarada en datos, e implementar el caso Kellogg's "Códigos Secretos" completo.

**Architecture:** Cada proyecto es un objeto de datos con un array `blocks`. Un registro mapea `tipo → componente` y un `ProjectRenderer` recorre `blocks[]` pintando cada bloque. La página de detalle lee `:slug`, busca los datos y renderiza el renderizador dentro del shell de página estándar. Agregar un proyecto = escribir datos; agregar un tipo de sección = escribir un componente de bloque.

**Tech Stack:** React 19, React Router 7 (`react-router-dom`), Framer Motion 12, Tailwind CSS v4 (clases utilitarias, sin `<style>` blocks), Vite 8.

## Global Constraints

- **Styling: solo Tailwind** (regla de [CLAUDE.md](../../../CLAUDE.md)). Nada de `<style>` blocks ni CSS nuevo. Valores no estándar con brackets (`text-[clamp(...)]`, `min-[1280px]:`, `[clip-path:...]`). Excepciones permitidas como objetos `style={{...}}`: gradientes multi-stop, `mask-image`, y combos de texto hueco (`WebkitTextStroke` + fill transparente).
- **Gotcha Tailwind:** usar `[font-family:var(--font-display)]`, NO `font-[var(--font-display)]` (no aplica). Utilidades numéricas fuera de la escala por defecto (`pt-22`) no generan regla → usar brackets (`pt-[5.5rem]`).
- **Tokens:** `var(--c-lime)`, `var(--c-ink)`, `var(--c-muted)`, `var(--c-bg)`, `var(--c-surface)`; `var(--font-display)` = Barlow Condensed (italic/uppercase/900), `var(--font-body)` = Barlow. `var(--container)` = 1200px, `var(--container-pad)`.
- **Estilo del sitio:** lima neón sobre navy oscuro; motivo corner-bracket HUD (esquinas en L lima translúcidas) ya usado en `DigitalServicesSection`/`DigitalPlatformsSection`; heading partido lima-hueco + blanco-hueco.
- **Motion:** Framer Motion para reveals; cada animación con alternativa `prefers-reduced-motion` (usar `useReducedMotion()`).
- **No hay framework de tests unitarios.** Verificación = `npm run build` (atrapa imports/sintaxis), `npm run lint`, y carga de ruta + screenshot Playwright vía dev server. Los scripts Playwright son temporales: crearlos como `_tmp_*.mjs`, ejecutarlos con `node`, y borrarlos al terminar cada tarea (patrón ya usado en el repo). Usar `playwright-core` (`import { chromium } from 'playwright-core'`).
- **Git:** el repo está en `main`. NO commitear directo a `main` ni hacer push sin que el usuario lo pida: si se va a commitear, primero crear una rama. Mensajes de commit terminan con la línea `Co-Authored-By`. Confirmar con el usuario antes del primer commit.
- **Slugs de proyecto** (del array `PROJECTS` existente en `ProjectsSection.jsx`): Kellogg's→`kelloggs`, Pollocao→`pollocao`, F-rixo→`frixo`, CAM→`cam`. `defaultSlug = 'kelloggs'`.
- **Assets Kellogg's:** `public/images/NUESTROS PROYECTOS/WEB/` (`Logos/Kelloggs logo.svg`, `Fotos/grafica 1.png`, `Fotos/grafica 2.png`, `Fotos/bob esponja.png`, `Iconos/Icono usuario.svg`, `Iconos/icono code.svg`, `Iconos/icono medalla.svg`, `Iconos/Guatemala.svg`, `Iconos/El salvador.svg`, `Iconos/Costa rica.svg`). Las rutas con espacios se usan tal cual en `src` (`/images/NUESTROS PROYECTOS/...`); en URLs de Playwright se codifican con `%20`.

---

## File Structure

- `src/data/proyectos/index.js` — registro: importa cada proyecto, exporta `projectsBySlug`, `projectList` (ordenado), `defaultSlug`, y helper `getProject(slug)`.
- `src/data/proyectos/kelloggs.js` — datos del caso Kellogg's: `{ slug, name, title, meta, blocks: [...] }`.
- `src/components/sections/proyectos/blocks/registry.js` — mapa `tipo → componente`.
- `src/components/sections/proyectos/ProjectRenderer.jsx` — recorre `blocks[]` y pinta vía registro.
- `src/components/sections/proyectos/blocks/SectionHeadingBlock.jsx`
- `src/components/sections/proyectos/blocks/HeroBlock.jsx`
- `src/components/sections/proyectos/blocks/StatementBlock.jsx`
- `src/components/sections/proyectos/blocks/TextPanelBlock.jsx`
- `src/components/sections/proyectos/blocks/MediaGalleryBlock.jsx`
- `src/components/sections/proyectos/blocks/StatGridBlock.jsx`
- `src/components/sections/proyectos/blocks/RegionCardsBlock.jsx`
- `src/pages/proyectos/index.jsx` — `ProjectDetailPage`.
- `src/router/index.jsx` — MODIFICAR: rutas `/proyectos/:slug` y `/proyectos`.
- `src/components/sections/landing/ProjectsSection.jsx` — MODIFICAR: `slug` por proyecto + "Ver proyecto" como `Link`.
- `src/components/layout/Navbar.jsx` — MODIFICAR: item "Nuestros Proyectos" `href: '/proyectos'`.

---

## Task 1: Motor de bloques + slice vertical (página renderiza un bloque)

Construye el engine (registro + renderizador), el primer bloque (`SectionHeadingBlock`), los datos mínimos y las rutas, de modo que `/proyectos` redirija a `/proyectos/kelloggs` y se vea un heading. Slice vertical end-to-end.

**Files:**
- Create: `src/components/sections/proyectos/blocks/SectionHeadingBlock.jsx`
- Create: `src/components/sections/proyectos/blocks/registry.js`
- Create: `src/components/sections/proyectos/ProjectRenderer.jsx`
- Create: `src/data/proyectos/kelloggs.js`
- Create: `src/data/proyectos/index.js`
- Create: `src/pages/proyectos/index.jsx`
- Modify: `src/router/index.jsx`

**Interfaces:**
- Produces:
  - `SectionHeadingBlock({ lime, white })` — heading partido.
  - `registry` (default export object) — `{ [tipo]: Componente }`.
  - `ProjectRenderer({ blocks })` — renderiza la lista.
  - `getProject(slug)` → objeto proyecto | `undefined`; `defaultSlug` (string); `projectList` (array); `projectsBySlug` (objeto).
  - `kelloggs` data object con `slug='kelloggs'`, `blocks` array.

- [ ] **Step 1: `SectionHeadingBlock.jsx`**

```jsx
const SOLID_STYLE = {
  color: 'var(--c-lime)',
  WebkitTextFillColor: 'transparent',
  WebkitTextStroke: '1.5px var(--c-lime)',
}
const OUTLINE_STYLE = {
  color: 'transparent',
  WebkitTextStroke: '1.5px oklch(0.98 0 0 / 0.85)',
}

export default function SectionHeadingBlock({ lime, white }) {
  return (
    <div className="mx-auto max-w-[var(--container)] px-[var(--container-pad)] py-[clamp(2.5rem,6vw,4.5rem)] text-center">
      <h2 className="m-0 [font-family:var(--font-display)] text-[clamp(2rem,6vw,3.5rem)] font-black italic uppercase leading-none tracking-[-0.02em]">
        <span style={SOLID_STYLE}>{lime}</span>{' '}
        <span style={OUTLINE_STYLE}>{white}</span>
      </h2>
    </div>
  )
}
```

- [ ] **Step 2: `registry.js`**

```js
import SectionHeadingBlock from './SectionHeadingBlock'

const registry = {
  sectionHeading: SectionHeadingBlock,
}

export default registry
```

- [ ] **Step 3: `ProjectRenderer.jsx`** (tipo desconocido → se omite, no rompe)

```jsx
import registry from './blocks/registry'

export default function ProjectRenderer({ blocks = [] }) {
  return (
    <>
      {blocks.map((block, i) => {
        const Block = registry[block.type]
        if (!Block) {
          if (import.meta.env.DEV) console.warn(`[ProjectRenderer] tipo de bloque desconocido: "${block.type}"`)
          return null
        }
        return <Block key={i} {...block.props} />
      })}
    </>
  )
}
```

- [ ] **Step 4: `kelloggs.js`** (mínimo, un solo bloque por ahora)

```js
export default {
  slug: 'kelloggs',
  name: "Kellogg's",
  title: 'Códigos Secretos',
  meta: { category: 'Campaña Digital · Centroamérica' },
  blocks: [
    { type: 'sectionHeading', props: { lime: 'NUESTROS', white: 'PROYECTOS' } },
  ],
}
```

- [ ] **Step 5: `data/proyectos/index.js`**

```js
import kelloggs from './kelloggs'

const projectList = [kelloggs]

export const projectsBySlug = Object.fromEntries(projectList.map((p) => [p.slug, p]))
export const defaultSlug = 'kelloggs'
export const getProject = (slug) => projectsBySlug[slug]
export { projectList }
```

- [ ] **Step 6: `pages/proyectos/index.jsx`**

```jsx
import { useParams, Navigate } from 'react-router-dom'
import CustomCursor from '../../components/ui/CustomCursor'
import MorphicBackground from '../../components/layout/fondo'
import ProjectRenderer from '../../components/sections/proyectos/ProjectRenderer'
import { getProject, defaultSlug } from '../../data/proyectos'

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const project = getProject(slug)

  if (!project) return <Navigate to={`/proyectos/${defaultSlug}`} replace />

  return (
    <>
      <CustomCursor />
      <MorphicBackground />
      <main>
        <ProjectRenderer blocks={project.blocks} />
      </main>
    </>
  )
}
```

- [ ] **Step 7: Modificar `router/index.jsx`** — añadir import lazy y rutas

Añadir junto a los otros lazy imports (después de la línea de `DesarrolloDigitalPage`):

```jsx
const ProyectoPage = lazy(() => import('../pages/proyectos'))
```

Añadir `Navigate` al import de `react-router-dom` (la línea pasa a):

```jsx
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
```

Importar `defaultSlug` arriba:

```jsx
import { defaultSlug } from '../data/proyectos'
```

Añadir dentro de `<Routes>` (después de la ruta de desarrollo-digital):

```jsx
<Route path="/proyectos/:slug" element={<ProyectoPage />} />
<Route path="/proyectos" element={<Navigate to={`/proyectos/${defaultSlug}`} replace />} />
```

- [ ] **Step 8: Verificar build + lint**

Run: `npm run build`
Expected: build exitoso, sin errores de import/sintaxis.

Run: `npm run lint`
Expected: sin errores nuevos en archivos creados.

- [ ] **Step 9: Verificar ruta + render con Playwright**

Crear `_tmp_verify.mjs` (ajustar el puerto al que imprime `npm run dev`, p.ej. 5173/5174):

```js
import { chromium } from 'playwright-core'
const browser = await chromium.launch()
const page = await browser.newPage()
await page.setViewportSize({ width: 1280, height: 800 })
await page.goto('http://localhost:5174/proyectos', { waitUntil: 'networkidle' })
await page.waitForTimeout(500)
console.log('URL final:', page.url())   // debe terminar en /proyectos/kelloggs
await page.screenshot({ path: 'C:/Users/Sofia A/verify_t1.png' })
await browser.close()
```

Run: `npm run dev` (en background) y luego `node _tmp_verify.mjs`
Expected: `URL final` termina en `/proyectos/kelloggs`; el screenshot muestra el heading "NUESTROS PROYECTOS" (lima hueco + blanco hueco). Leer el screenshot para confirmar. Borrar `_tmp_verify.mjs` y el PNG al terminar.

- [ ] **Step 10: Commit** (solo si el usuario lo aprobó; primero crear rama si está en `main`)

```bash
git add src/components/sections/proyectos src/data/proyectos src/pages/proyectos src/router/index.jsx
git commit -m "feat(proyectos): motor de bloques + ruta /proyectos/:slug con slice vertical"
```

---

## Task 2: Wire de entradas (carrusel del landing + navbar)

Conecta los puntos de entrada a las páginas de proyecto.

**Files:**
- Modify: `src/components/sections/landing/ProjectsSection.jsx`
- Modify: `src/components/layout/Navbar.jsx`

**Interfaces:**
- Consumes: ruta `/proyectos/:slug` (Task 1).

- [ ] **Step 1: Añadir `slug` a cada proyecto del array `PROJECTS`** en `ProjectsSection.jsx`

En el array `PROJECTS` (empieza en línea 7), añadir la propiedad `slug` a cada objeto:
- Kellogg's → `slug: 'kelloggs'`
- Pollocao → `slug: 'pollocao'`
- F-rixo → `slug: 'frixo'`
- CAM → `slug: 'cam'`

Ejemplo (primer objeto):

```jsx
{
  number: '01',
  slug: 'kelloggs',
  title: "Kellogg's",
  // ...resto igual
},
```

- [ ] **Step 2: Importar `Link`** en `ProjectsSection.jsx`

Añadir al inicio del archivo:

```jsx
import { Link } from 'react-router-dom'
```

- [ ] **Step 3: Convertir el CTA "Ver proyecto" en `Link`**

Reemplazar el `<motion.a ... href="#" className="proj-cta">` por un `Link` (usando `motion(Link)` para conservar el variant). En la parte superior del archivo, tras los imports, crear el componente animable una sola vez:

```jsx
import { motion } from 'framer-motion'
const MotionLink = motion(Link)
```

Y el CTA pasa a:

```jsx
<MotionLink variants={contentItem} to={`/proyectos/${project.slug}`} className="proj-cta">
  Ver proyecto
  <ArrowUpRight size={16} strokeWidth={2.5} className="proj-cta-arrow" />
</MotionLink>
```

(Si `motion` ya está importado, no duplicar el import; solo añadir la línea `const MotionLink = motion(Link)`.)

- [ ] **Step 4: Navbar — item "Nuestros Proyectos" apunta a `/proyectos`**

En `src/components/layout/Navbar.jsx`, en el array `SERVICES`, cambiar `href: null` del item "Nuestros Proyectos" por `href: '/proyectos'`:

```jsx
{ label: 'Nuestros Proyectos',    href: '/proyectos',    desc: 'Casos de éxito y trabajos realizados' }
```

(El dropdown ya usa el patrón polimórfico `SvcComp = svc.href ? Link : 'a'`, así que con `href` no nulo se vuelve un `Link` automáticamente.)

- [ ] **Step 5: Verificar build**

Run: `npm run build`
Expected: build exitoso.

- [ ] **Step 6: Verificar navegación con Playwright**

Crear `_tmp_verify.mjs`:

```js
import { chromium } from 'playwright-core'
const browser = await chromium.launch()
const page = await browser.newPage()
await page.setViewportSize({ width: 1280, height: 800 })
await page.goto('http://localhost:5174/', { waitUntil: 'networkidle' })
await page.waitForTimeout(500)
// El primer proyecto del carrusel es kelloggs; click en "Ver proyecto"
await page.getByText('Ver proyecto').first().click()
await page.waitForTimeout(600)
console.log('URL tras click:', page.url())   // .../proyectos/kelloggs
await browser.close()
```

Run: `node _tmp_verify.mjs`
Expected: `URL tras click` termina en `/proyectos/kelloggs`. Borrar `_tmp_verify.mjs`.

- [ ] **Step 7: Commit** (con las salvedades de git del Global Constraints)

```bash
git add src/components/sections/landing/ProjectsSection.jsx src/components/layout/Navbar.jsx
git commit -m "feat(proyectos): enlazar carrusel del landing y navbar a /proyectos/:slug"
```

---

## Task 3: HeroBlock (hero del caso)

Hero del proyecto: tratamiento del título de página + logo de marca + imagen del personaje/empaques.

**Files:**
- Create: `src/components/sections/proyectos/blocks/HeroBlock.jsx`
- Modify: `src/components/sections/proyectos/blocks/registry.js`
- Modify: `src/data/proyectos/kelloggs.js`

**Interfaces:**
- Produces: `HeroBlock({ eyebrowLime, eyebrowWhite, logo, logoAlt, art, artAlt })`.
- Consumes: `registry` (Task 1).

- [ ] **Step 1: `HeroBlock.jsx`**

```jsx
import { motion, useReducedMotion } from 'framer-motion'

const SOLID_STYLE = { color: 'var(--c-lime)', WebkitTextFillColor: 'transparent', WebkitTextStroke: '2px var(--c-lime)' }
const OUTLINE_STYLE = { color: 'var(--c-ink)' }

export default function HeroBlock({ eyebrowLime, eyebrowWhite, logo, logoAlt = '', art, artAlt = '' }) {
  const reduce = useReducedMotion()
  const rise = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  }
  return (
    <section className="relative overflow-hidden pt-[clamp(6rem,12vw,9rem)] pb-[clamp(2rem,5vw,3.5rem)] text-center">
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        className="mx-auto flex max-w-[var(--container)] flex-col items-center gap-[clamp(1.5rem,4vw,2.5rem)] px-[var(--container-pad)]"
      >
        <motion.h1 variants={rise} className="m-0 [font-family:var(--font-display)] text-[clamp(2.5rem,9vw,6rem)] font-black italic uppercase leading-[0.9] tracking-[-0.02em]">
          <span style={SOLID_STYLE}>{eyebrowLime}</span>
          <br />
          <span style={OUTLINE_STYLE}>{eyebrowWhite}</span>
        </motion.h1>
        {logo && <motion.img variants={rise} src={logo} alt={logoAlt} className="h-[clamp(2.5rem,7vw,4rem)] w-auto" />}
        {art && <motion.img variants={rise} src={art} alt={artAlt} className="h-auto w-[clamp(180px,40vw,320px)]" />}
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Registrar el bloque** en `registry.js`

```js
import SectionHeadingBlock from './SectionHeadingBlock'
import HeroBlock from './HeroBlock'

const registry = {
  sectionHeading: SectionHeadingBlock,
  hero: HeroBlock,
}

export default registry
```

- [ ] **Step 3: Usar el bloque en `kelloggs.js`** — reemplazar el array `blocks` por:

```js
  blocks: [
    {
      type: 'hero',
      props: {
        eyebrowLime: 'NUESTROS',
        eyebrowWhite: 'PROYECTOS',
        logo: '/images/NUESTROS PROYECTOS/WEB/Logos/Kelloggs logo.svg',
        logoAlt: "Kellogg's",
        art: '/images/NUESTROS PROYECTOS/WEB/Fotos/bob esponja.png',
        artAlt: 'Bob Esponja, personaje de la campaña Códigos Secretos',
      },
    },
  ],
```

- [ ] **Step 4: Verificar build + screenshot**

Run: `npm run build` → exitoso.

Crear `_tmp_verify.mjs` (viewport desktop y mobile), navegar a `http://localhost:5174/proyectos/kelloggs`, esperar 700ms, screenshot a `C:/Users/Sofia A/hero_desktop.png` (1280px) y `hero_mobile.png` (390px). Leer ambos: el hero muestra título "NUESTROS / PROYECTOS", logo de Kellogg's y el personaje, sin desbordes. Borrar temporales.

- [ ] **Step 5: Commit** (con salvedades de git)

```bash
git add src/components/sections/proyectos/blocks/HeroBlock.jsx src/components/sections/proyectos/blocks/registry.js src/data/proyectos/kelloggs.js
git commit -m "feat(proyectos): HeroBlock + hero del caso Kellogg's"
```

---

## Task 4: StatementBlock (título grande + tags + descripción)

Bloque con el nombre grande del proyecto, los servicios/tech como display, y párrafos de descripción.

**Files:**
- Create: `src/components/sections/proyectos/blocks/StatementBlock.jsx`
- Modify: `src/components/sections/proyectos/blocks/registry.js`
- Modify: `src/data/proyectos/kelloggs.js`

**Interfaces:**
- Produces: `StatementBlock({ titleLime, titleWhite, tags = [], paragraphs = [] })`.

- [ ] **Step 1: `StatementBlock.jsx`**

```jsx
import { motion, useReducedMotion } from 'framer-motion'

const HOLLOW = { color: 'transparent', WebkitTextStroke: '1.5px oklch(0.98 0 0 / 0.6)' }

export default function StatementBlock({ titleLime, titleWhite, tags = [], paragraphs = [] }) {
  const reduce = useReducedMotion()
  const rise = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  }
  return (
    <section className="relative py-[clamp(2.5rem,6vw,4.5rem)]">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        className="mx-auto grid max-w-[var(--container)] gap-[clamp(1.5rem,4vw,3rem)] px-[var(--container-pad)] min-[900px]:grid-cols-2 min-[900px]:items-center"
      >
        <div>
          <motion.h2 variants={rise} className="m-0 [font-family:var(--font-display)] text-[clamp(2.2rem,7vw,4.5rem)] font-black italic uppercase leading-[0.92] tracking-[-0.025em]" style={{ color: 'var(--c-lime)' }}>
            {titleLime}
          </motion.h2>
          {tags.length > 0 && (
            <motion.p variants={rise} className="mt-1 [font-family:var(--font-display)] text-[clamp(1.5rem,5vw,3rem)] font-black italic uppercase leading-[0.95] tracking-[-0.02em]" style={HOLLOW}>
              {tags.join(' · ')}
            </motion.p>
          )}
        </div>
        <div className="flex flex-col gap-4">
          {paragraphs.map((p, i) => (
            <motion.p key={i} variants={rise} className="m-0 text-[clamp(1rem,1.4vw,1.15rem)] italic leading-[1.7] [font-family:var(--font-body)]" style={{ color: 'var(--c-ink)', opacity: 0.9 }}>
              {p}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Registrar** `statement: StatementBlock` en `registry.js` (añadir import y entrada, conservando las anteriores).

- [ ] **Step 3: Añadir el bloque a `kelloggs.js`** — insertar tras el bloque `hero` dentro de `blocks`:

```js
    {
      type: 'statement',
      props: {
        titleLime: 'Códigos Secretos',
        tags: ['API', 'WhatsApp'],
        paragraphs: [
          'Desarrollamos una campaña retail con presencia en Costa Rica, Guatemala y El Salvador, diseñada para incentivar la compra en el punto de venta.',
          'El objetivo principal fue doble: generar un incremento directo en las ventas y, simultáneamente, implementar un sistema de captura de datos estratégicos tales como el perfil del consumidor y el ticket promedio. Esto permitió transformar una transacción masiva en información accionable para futuras decisiones de marca.',
        ],
      },
    },
```

- [ ] **Step 4: Verificar build + screenshot** (desktop 1280 + mobile 390 en `/proyectos/kelloggs`). Confirmar: título grande lima, "API · WHATSAPP" hueco, párrafos legibles (contraste OK), sin desbordes. Borrar temporales.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/proyectos/blocks/StatementBlock.jsx src/components/sections/proyectos/blocks/registry.js src/data/proyectos/kelloggs.js
git commit -m "feat(proyectos): StatementBlock + contenido Kellogg's"
```

---

## Task 5: TextPanelBlock (panel de vidrio con prosa)

Panel de vidrio con corner brackets (motivo HUD) que envuelve un párrafo destacado. Reutiliza el lenguaje visual de `DigitalServicesSection`/`DigitalPlatformsSection`.

**Files:**
- Create: `src/components/sections/proyectos/blocks/TextPanelBlock.jsx`
- Modify: `src/components/sections/proyectos/blocks/registry.js`
- Modify: `src/data/proyectos/kelloggs.js`

**Interfaces:**
- Produces: `TextPanelBlock({ eyebrow, text })`.

- [ ] **Step 1: `TextPanelBlock.jsx`**

```jsx
import { motion } from 'framer-motion'

export default function TextPanelBlock({ eyebrow, text }) {
  return (
    <section className="relative py-[clamp(2rem,5vw,3.5rem)]">
      <div className="mx-auto max-w-[var(--container)] px-[var(--container-pad)]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[1.5rem] border px-[clamp(2rem,5vw,3.5rem)] py-[clamp(2.5rem,6vw,3.5rem)] text-center [background:oklch(0.13_0.020_260_/_0.85)] [backdrop-filter:blur(14px)] [border-color:oklch(0.26_0.022_260)] [box-shadow:0_40px_110px_-40px_oklch(0.03_0.02_260_/_0.9)]"
        >
          <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[2px] opacity-60 [background:linear-gradient(to_right,transparent_5%,var(--c-lime)_40%,var(--c-lime)_60%,transparent_95%)]" />
          <span aria-hidden="true" className="absolute left-4 top-4 h-[18px] w-[18px] border-[1.5px] border-b-0 border-r-0 [border-color:oklch(0.88_0.26_130_/_0.4)]" />
          <span aria-hidden="true" className="absolute bottom-4 right-4 h-[18px] w-[18px] border-[1.5px] border-l-0 border-t-0 [border-color:oklch(0.88_0.26_130_/_0.4)]" />

          {eyebrow && (
            <p className="mb-3 [font-family:var(--font-display)] text-[0.9rem] font-bold uppercase tracking-[0.12em]" style={{ color: 'var(--c-lime)' }}>
              {eyebrow}
            </p>
          )}
          <p className="m-0 mx-auto max-w-[60ch] text-[clamp(1.05rem,1.8vw,1.4rem)] italic leading-[1.62] [font-family:var(--font-body)] [text-wrap:pretty]" style={{ color: 'var(--c-ink)', opacity: 0.95 }}>
            {text}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Registrar** `textPanel: TextPanelBlock` en `registry.js`.

- [ ] **Step 3: Añadir a `kelloggs.js`** tras el bloque `statement`:

```js
    { type: 'sectionHeading', props: { lime: 'RESULTADOS DE', white: 'LA CAMPAÑA' } },
    {
      type: 'textPanel',
      props: {
        eyebrow: 'Resultados',
        text: 'La campaña logró un incremento sostenido en las ventas y, a la vez, construyó una base de datos accionable de consumidores y ticket promedio en los tres países de Centroamérica.',
      },
    },
```

- [ ] **Step 4: Verificar build + screenshot.** Confirmar panel de vidrio con corner brackets, barra lima superior y texto legible. Borrar temporales.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/proyectos/blocks/TextPanelBlock.jsx src/components/sections/proyectos/blocks/registry.js src/data/proyectos/kelloggs.js
git commit -m "feat(proyectos): TextPanelBlock + sección resultados Kellogg's"
```

---

## Task 6: MediaGalleryBlock (gráficas como imagen)

Una o más imágenes (las gráficas PNG) en panel(es) de vidrio.

**Files:**
- Create: `src/components/sections/proyectos/blocks/MediaGalleryBlock.jsx`
- Modify: `src/components/sections/proyectos/blocks/registry.js`
- Modify: `src/data/proyectos/kelloggs.js`

**Interfaces:**
- Produces: `MediaGalleryBlock({ items = [], columns = 2 })` donde `items = [{ src, alt }]`.

- [ ] **Step 1: `MediaGalleryBlock.jsx`**

```jsx
import { motion, useReducedMotion } from 'framer-motion'

export default function MediaGalleryBlock({ items = [], columns = 2 }) {
  const reduce = useReducedMotion()
  const card = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  }
  return (
    <section className="relative py-[clamp(1.5rem,4vw,3rem)]">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        className="mx-auto grid max-w-[var(--container)] gap-[clamp(1.25rem,3vw,2rem)] px-[var(--container-pad)]"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
      >
        {items.map((it, i) => (
          <motion.figure
            key={i}
            variants={card}
            className="relative m-0 overflow-hidden rounded-[1.1rem] border [background:oklch(0.13_0.020_260_/_0.7)] [backdrop-filter:blur(10px)] [border-color:oklch(0.26_0.022_260)]"
          >
            <img src={it.src} alt={it.alt || ''} className="block h-auto w-full" />
          </motion.figure>
        ))}
      </motion.div>
    </section>
  )
}
```

Nota responsive: en pantallas angostas, `repeat(N, ...)` puede apretar las imágenes. Añadir override mobile con clase: envolver `style` columns solo para `min-[700px]`. Implementación: usar `className="grid grid-cols-1 min-[700px]:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))]"` y pasar `style={{ '--cols': columns }}`. Reescribir el `<motion.div>` así:

```jsx
        className="mx-auto grid max-w-[var(--container)] grid-cols-1 gap-[clamp(1.25rem,3vw,2rem)] px-[var(--container-pad)] min-[700px]:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))]"
        style={{ '--cols': columns }}
```

(usar esta versión; elimina el `style` con `gridTemplateColumns` directo).

- [ ] **Step 2: Registrar** `mediaGallery: MediaGalleryBlock` en `registry.js`.

- [ ] **Step 3: Añadir a `kelloggs.js`** tras el bloque `textPanel`:

```js
    {
      type: 'mediaGallery',
      props: {
        columns: 2,
        items: [
          { src: '/images/NUESTROS PROYECTOS/WEB/Fotos/grafica 1.png', alt: 'Gráfica de usuarios registrados por día durante la campaña' },
          { src: '/images/NUESTROS PROYECTOS/WEB/Fotos/grafica 2.png', alt: 'Gráfica de códigos registrados por día durante la campaña' },
        ],
      },
    },
```

- [ ] **Step 4: Verificar build + screenshot** (desktop: 2 columnas; mobile 390: 1 columna apilada). Borrar temporales.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/proyectos/blocks/MediaGalleryBlock.jsx src/components/sections/proyectos/blocks/registry.js src/data/proyectos/kelloggs.js
git commit -m "feat(proyectos): MediaGalleryBlock + gráficas Kellogg's"
```

---

## Task 7: StatGridBlock (tarjetas de métricas)

Grid de tarjetas: ícono + label + número grande.

**Files:**
- Create: `src/components/sections/proyectos/blocks/StatGridBlock.jsx`
- Modify: `src/components/sections/proyectos/blocks/registry.js`
- Modify: `src/data/proyectos/kelloggs.js`

**Interfaces:**
- Produces: `StatGridBlock({ stats = [] })` donde `stats = [{ icon, label, value }]`.

- [ ] **Step 1: `StatGridBlock.jsx`**

```jsx
import { motion, useReducedMotion } from 'framer-motion'

export default function StatGridBlock({ stats = [] }) {
  const reduce = useReducedMotion()
  const card = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  }
  return (
    <section className="relative py-[clamp(1.5rem,4vw,3rem)]">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        className="mx-auto grid max-w-[var(--container)] grid-cols-1 gap-[clamp(1rem,2.5vw,1.5rem)] px-[var(--container-pad)] min-[640px]:grid-cols-3"
      >
        {stats.map((s, i) => (
          <motion.div
            key={i}
            variants={card}
            className="flex items-center gap-4 rounded-[1.1rem] border p-[clamp(1.25rem,3vw,1.75rem)] [background:var(--c-surface)] [border-color:oklch(0.26_0.022_260)]"
          >
            {s.icon && <img src={s.icon} alt="" aria-hidden="true" className="h-10 w-10 shrink-0 object-contain" />}
            <div className="min-w-0">
              <div className="[font-family:var(--font-display)] text-[clamp(1.75rem,4vw,2.5rem)] font-black italic leading-none" style={{ color: 'var(--c-lime)' }}>
                {s.value}
              </div>
              <div className="mt-1 text-[0.78rem] font-medium uppercase tracking-[0.08em] [font-family:var(--font-body)]" style={{ color: 'var(--c-muted)' }}>
                {s.label}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Registrar** `statGrid: StatGridBlock` en `registry.js`.

- [ ] **Step 3: Añadir a `kelloggs.js`** tras el bloque `mediaGallery`:

```js
    {
      type: 'statGrid',
      props: {
        stats: [
          { icon: '/images/NUESTROS PROYECTOS/WEB/Iconos/Icono usuario.svg', label: 'Total usuarios registrados', value: '8.652' },
          { icon: '/images/NUESTROS PROYECTOS/WEB/Iconos/icono code.svg', label: 'Total códigos registrados', value: '24.918' },
          { icon: '/images/NUESTROS PROYECTOS/WEB/Iconos/icono medalla.svg', label: 'Total premios entregados', value: '2.547' },
        ],
      },
    },
```

(Los números son del mockup; el usuario confirma/ajusta los valores oficiales en este archivo de datos.)

- [ ] **Step 4: Verificar build + screenshot** (desktop: 3 columnas; mobile: 1 columna). Confirmar contraste del label muted ≥ legible. Borrar temporales.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/proyectos/blocks/StatGridBlock.jsx src/components/sections/proyectos/blocks/registry.js src/data/proyectos/kelloggs.js
git commit -m "feat(proyectos): StatGridBlock + métricas Kellogg's"
```

---

## Task 8: RegionCardsBlock (tarjetas por país)

Tarjetas con bandera + varias stats por país.

**Files:**
- Create: `src/components/sections/proyectos/blocks/RegionCardsBlock.jsx`
- Modify: `src/components/sections/proyectos/blocks/registry.js`
- Modify: `src/data/proyectos/kelloggs.js`

**Interfaces:**
- Produces: `RegionCardsBlock({ regions = [] })` donde `regions = [{ flag, name, stats: [{ label, value }] }]`.

- [ ] **Step 1: `RegionCardsBlock.jsx`**

```jsx
import { motion, useReducedMotion } from 'framer-motion'

export default function RegionCardsBlock({ regions = [] }) {
  const reduce = useReducedMotion()
  const card = {
    hidden: { opacity: 0, y: reduce ? 0 : 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  }
  return (
    <section className="relative py-[clamp(1.5rem,4vw,3rem)]">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
        className="mx-auto grid max-w-[var(--container)] grid-cols-1 gap-[clamp(1rem,2.5vw,1.5rem)] px-[var(--container-pad)] min-[640px]:grid-cols-3"
      >
        {regions.map((r, i) => (
          <motion.div
            key={i}
            variants={card}
            className="rounded-[1.1rem] border p-[clamp(1.25rem,3vw,1.75rem)] [background:var(--c-surface)] [border-color:oklch(0.26_0.022_260)]"
          >
            <div className="mb-4 flex items-center gap-3">
              {r.flag && <img src={r.flag} alt="" aria-hidden="true" className="h-7 w-auto shrink-0" />}
              <span className="[font-family:var(--font-display)] text-[1.1rem] font-bold uppercase tracking-[0.04em]" style={{ color: 'var(--c-ink)' }}>
                {r.name}
              </span>
            </div>
            <dl className="m-0 flex flex-col gap-2">
              {r.stats.map((s, j) => (
                <div key={j} className="flex items-baseline justify-between gap-3">
                  <dt className="text-[0.78rem] uppercase tracking-[0.06em] [font-family:var(--font-body)]" style={{ color: 'var(--c-muted)' }}>{s.label}</dt>
                  <dd className="m-0 [font-family:var(--font-display)] text-[1.15rem] font-black italic" style={{ color: 'var(--c-lime)' }}>{s.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Registrar** `regionCards: RegionCardsBlock` en `registry.js`.

- [ ] **Step 3: Añadir a `kelloggs.js`** tras el bloque `statGrid` (último bloque):

```js
    {
      type: 'regionCards',
      props: {
        regions: [
          { flag: '/images/NUESTROS PROYECTOS/WEB/Iconos/Guatemala.svg', name: 'Guatemala', stats: [
            { label: 'Usuarios', value: '3.120' }, { label: 'Códigos', value: '9.840' }, { label: 'Premios', value: '910' },
          ] },
          { flag: '/images/NUESTROS PROYECTOS/WEB/Iconos/El salvador.svg', name: 'El Salvador', stats: [
            { label: 'Usuarios', value: '2.480' }, { label: 'Códigos', value: '7.260' }, { label: 'Premios', value: '720' },
          ] },
          { flag: '/images/NUESTROS PROYECTOS/WEB/Iconos/Costa rica.svg', name: 'Costa Rica', stats: [
            { label: 'Usuarios', value: '3.052' }, { label: 'Códigos', value: '7.818' }, { label: 'Premios', value: '917' },
          ] },
        ],
      },
    },
```

(Números del mockup; el usuario ajusta los oficiales en datos.)

- [ ] **Step 4: Verificar build + screenshot** (desktop: 3 columnas; mobile: 1 columna). Borrar temporales.

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/proyectos/blocks/RegionCardsBlock.jsx src/components/sections/proyectos/blocks/registry.js src/data/proyectos/kelloggs.js
git commit -m "feat(proyectos): RegionCardsBlock + desglose por país Kellogg's"
```

---

## Task 9: Pase final — página completa + responsive + lint

Revisión integral de la página completa de Kellogg's contra el mockup, ajustes de ritmo/espaciado entre bloques y verificación responsive final.

**Files:**
- Modify (si hace falta tras revisión): cualquier `blocks/*.jsx` o `kelloggs.js`.

- [ ] **Step 1: Screenshot de página completa** desktop (1280) y mobile (390) en `/proyectos/kelloggs`, capturando `fullPage: true`. Leer ambos y comparar con el mockup `MOBILE/Pantallazo mobile/Sobre-nosotros-pantallazo.png` (y la versión PC en `WEB/Pantallazo` si el usuario ya la agregó).

- [ ] **Step 2: Ajustar ritmo entre bloques si hace falta** — verificar que el espaciado vertical entre secciones se siente consistente (los `py-[clamp(...)]` de cada bloque no se duplican feo). Si dos bloques contiguos generan demasiado aire (p.ej. `sectionHeading` + `textPanel`), ajustar el `py` del bloque afectado. Aplicar solo cambios necesarios.

- [ ] **Step 3: Verificar contraste de textos muted** sobre navy (labels de `statGrid`/`regionCards`): deben ser legibles (≥ 4.5:1 aprox para body). Si `var(--c-muted)` queda muy bajo, subir hacia `oklch(0.65 0.02 260)` en el bloque afectado.

- [ ] **Step 4: Reduced motion** — correr el verify con `page.emulateMedia({ reducedMotion: 'reduce' })` y confirmar que la página renderiza completa (sin secciones en blanco por animaciones que no disparan).

- [ ] **Step 5: `npm run build` + `npm run lint`** — ambos limpios.

- [ ] **Step 6: Borrar todos los temporales** (`_tmp_*.mjs`, PNGs de verificación).

- [ ] **Step 7: Commit final**

```bash
git add -A
git commit -m "feat(proyectos): pase final responsive y de pulido del caso Kellogg's"
```

---

## Notas de cierre

- El selector de proyectos (UI para cambiar de caso desde la página) queda **fuera de alcance** (diferido). Entradas actuales: carrusel del landing + navbar + URL directa.
- Casos Pollocao / F-rixo / CAM: se agregan después creando `data/proyectos/<slug>.js` y registrándolos en `data/proyectos/index.js`, reutilizando los bloques de esta entrega. Sus links del carrusel ya apuntan a `/proyectos/<slug>`; hasta que existan, esos slugs redirigen al default (`kelloggs`) por el fallback de `ProjectDetailPage`.
- Cualquier número de stats/regiones es editable en `kelloggs.js` sin tocar componentes.
