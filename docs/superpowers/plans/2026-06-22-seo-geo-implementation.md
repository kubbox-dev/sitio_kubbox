# SEO/GEO Técnico Sitewide — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Hacer que kubbox.com sea correctamente indexable y citable tanto por buscadores tradicionales (Google) como por crawlers de motores generativos de IA (GPTBot, ClaudeBot, PerplexityBot, etc.), partiendo de un SPA 100% client-rendered sin ningún meta tag, robots.txt, sitemap, datos estructurados ni estrategia de crawlability, desplegado en hosting estático cPanel.

**Architecture:** Sin tocar el modelo de SPA existente (Vite + React + react-router-dom), se añade: (1) una capa de meta tags/JSON-LD por ruta vía un hook ligero (`useDocumentMeta`, sin dependencias nuevas en runtime), (2) archivos estáticos de descubrimiento (`robots.txt`, `sitemap.xml` generado, `llms.txt`), (3) un fallback de enrutamiento Apache (`.htaccess`) para que recargar/enlazar directo a cualquier ruta funcione en cPanel, y (4) un paso de **pre-renderizado en build-time** con Playwright que snapshotea el HTML ya hidratado de cada ruta real y lo guarda como archivo estático (`dist/<ruta>/index.html`), de forma que un crawler que no ejecute JS (o lo haga de forma limitada) reciba contenido completo sin necesitar un servidor Node corriendo en producción.

**Tech Stack:** Vite 8, React 19, react-router-dom 7, Node ESM (`"type": "module"` en package.json), Playwright (nueva devDependency, solo para el script de pre-renderizado — no se usa en runtime del sitio).

## Global Constraints

- **Dominio de producción:** `https://kubbox.com` (confirmado por el usuario). Todas las URLs absolutas (canonical, OG, sitemap, JSON-LD) usan este dominio con `https://` y sin `www`.
- **Hosting:** cPanel, no se confirmó soporte de "Setup Node.js App" → todo debe funcionar sirviendo `dist/` como archivos 100% estáticos vía Apache/LiteSpeed. No se asume ningún proceso Node corriendo en producción.
- **Sin framework de tests:** este proyecto no tiene `vitest`/`jest`/ningún test runner configurado (confirmado en `package.json`). La verificación de cada tarea es: `npm run build` debe pasar sin errores, más el chequeo manual/comando exacto descrito en cada tarea. No introducir un test runner nuevo como parte de este plan.
- **Fuera de alcance explícitamente:** no tocar code-splitting/lazy-loading de `physics-*.js` / `@splinetool/react-spline` (los chunks de ~2MB). El usuario pidió dejarlo fuera para no arriesgar romper algo.
- **No inventar datos:** usar únicamente el NAP (Name/Address/Phone) ya presente en el código: teléfono `310 4255766`, email `cfernandez@kubbox.com`, dirección `Cra. 48 #25B Sur 12, Zona 1, Envigado, Antioquia` (de `src/components/sections/contacto/ContactFormSection.jsx`), tagline `Agencia creativa · Medellín, Colombia` (Footer/Navbar). Los enlaces sociales en `Footer.jsx` son placeholders `href="#"` — no inventar URLs de redes sociales; se omiten del JSON-LD (`sameAs`) hasta que existan URLs reales.
- **GSC/GA4 sin credenciales reales todavía:** los placeholders se dejan **comentados/inactivos** en el HTML con instrucciones exactas de dónde obtener el valor real y qué reemplazar — nunca se envían eventos de analytics falsos a producción.
- **Cambio de `base` en `vite.config.js`:** pasa de `'./'` (relativo) a `'/'` (absoluto). Es necesario para que las páginas pre-renderizadas en subcarpetas (`dist/contacto/index.html`, etc.) referencien `/assets/...` correctamente en vez de `./assets/...` (que resolvería mal desde una subcarpeta). Esto asume que el sitio se sirve desde la raíz del dominio (`kubbox.com/`, no `kubbox.com/algun-subpath/`), que es el escenario estándar de un dominio principal en cPanel.

---

## Task 1: Fix de `index.html` — lang, título base, meta description, Organization JSON-LD, placeholders GSC/GA4

**Files:**
- Modify: `index.html`

**Interfaces:**
- Produces: el `<head>` base que toda página hereda antes de que `useDocumentMeta` (Task 3) lo sobreescriba por ruta. El JSON-LD de `Organization`/`LocalBusiness` es estático (no cambia por ruta) y vive solo aquí.

- [ ] **Step 1: Reemplazar el contenido completo de `index.html`**

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Kubbox es una agencia de marketing digital y desarrollo web en Medellín, Colombia. Creamos campañas digitales, plataformas y sitios web que convierten." />
    <link rel="canonical" href="https://kubbox.com/" />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Kubbox" />
    <meta property="og:title" content="Kubbox — Agencia de Marketing Digital y Desarrollo Web" />
    <meta property="og:description" content="Kubbox es una agencia de marketing digital y desarrollo web en Medellín, Colombia. Creamos campañas digitales, plataformas y sitios web que convierten." />
    <meta property="og:url" content="https://kubbox.com/" />
    <meta property="og:image" content="https://kubbox.com/images/HOME/WEB/Pantallazo/pantallazo-home.png" />
    <meta name="twitter:card" content="summary_large_image" />

    <title>Kubbox — Agencia de Marketing Digital y Desarrollo Web</title>

    <!-- TODO(SEO): Reemplazar con el código real de Google Search Console.
         1. Entrar a https://search.google.com/search-console
         2. Agregar propiedad -> dominio kubbox.com -> método de verificación "Etiqueta HTML"
         3. Copiar el valor completo del atributo content (el string largo que Google te da)
         4. Pegarlo abajo y quitar el comentario que envuelve la etiqueta <meta> -->
    <!-- <meta name="google-site-verification" content="REEMPLAZAR_CON_CODIGO_REAL" /> -->

    <!-- TODO(SEO): Reemplazar G-XXXXXXXXXX con el Measurement ID real de GA4.
         1. Entrar a https://analytics.google.com -> Admin -> Flujos de datos -> tu flujo web
         2. Copiar el "ID de medición" (formato G-XXXXXXXXXX)
         3. Reemplazar las DOS apariciones de G-XXXXXXXXXX abajo
         4. Quitar las etiquetas <!-- y --> que envuelven el bloque de scripts -->
    <!--
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXXXXX');
    </script>
    -->

    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Kubbox",
      "description": "Agencia de marketing digital y desarrollo web en Medellín, Colombia.",
      "url": "https://kubbox.com/",
      "logo": "https://kubbox.com/images/LOGO%20BUENO%20KUBBOX/LOGO%20KUBBOX%20BUENO.svg",
      "image": "https://kubbox.com/images/HOME/WEB/Pantallazo/pantallazo-home.png",
      "telephone": "+57 310 4255766",
      "email": "cfernandez@kubbox.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Cra. 48 #25B Sur 12, Zona 1",
        "addressLocality": "Envigado",
        "addressRegion": "Antioquia",
        "addressCountry": "CO"
      },
      "areaServed": "Medellín, Colombia"
    }
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 2: Verificar que el build sigue pasando**

Run: `npm run build`
Expected: termina con `✓ built in <tiempo>` y sin errores (el warning preexistente de chunks >500kB es esperado y no se debe tocar).

- [ ] **Step 3: Verificar el HTML servido**

Run: `npm run preview` (déjalo corriendo) y en otra terminal: `curl -s http://localhost:4173/ | grep -o '<title>[^<]*</title>'`
Expected: `<title>Kubbox — Agencia de Marketing Digital y Desarrollo Web</title>`

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat(seo): fix index.html lang, title, meta description, OG tags and LocalBusiness JSON-LD"
```

---

## Task 2: Fallback de enrutamiento SPA para Apache/cPanel (`.htaccess`)

**Files:**
- Create: `public/.htaccess`

**Interfaces:**
- Produces: regla de rewrite que Apache/LiteSpeed aplican en cPanel. Sin esta tarea, recargar la página (F5) o entrar directo a una URL como `https://kubbox.com/contacto` da 404 en hosting estático, porque Apache busca un archivo/carpeta literal `contacto` que no existe (react-router-dom solo intercepta la navegación si JS ya cargó la SPA desde `/`).

- [ ] **Step 1: Crear `public/.htaccess`**

```apache
# SPA fallback: si el archivo/carpeta pedido no existe físicamente,
# sirve index.html y deja que react-router-dom resuelva la ruta en el cliente.
# Las rutas que el Task 8 (prerender) ya generó como carpetas reales
# (ej. dist/contacto/index.html) se siguen sirviendo directo por Apache
# ANTES de llegar a esta regla, porque Apache prioriza archivos/carpetas reales.
RewriteEngine On
RewriteBase /
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [L]

# Cache de assets versionados por hash (Vite ya les pone hash en el nombre,
# así que es seguro cachearlos agresivamente).
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
```

- [ ] **Step 2: Verificar que Vite lo copia al build**

Run: `npm run build && ls dist/.htaccess`
Expected: el comando `ls` muestra `dist/.htaccess` (Vite copia todo `public/` a `dist/` tal cual, incluyendo archivos que empiezan con punto).

- [ ] **Step 3: Commit**

```bash
git add public/.htaccess
git commit -m "feat(seo): add Apache SPA routing fallback for cPanel static hosting"
```

---

## Task 3: Hook `useDocumentMeta` — meta tags y JSON-LD por ruta

**Files:**
- Create: `src/hooks/useDocumentMeta.js`

**Interfaces:**
- Consumes: nada de tareas anteriores (es independiente).
- Produces: `useDocumentMeta({ title, description, path, structuredData })` — hook sin valor de retorno, se llama una vez por componente de página. `title` (string, requerido) y `description` (string, requerido) — `path` (string, requerido, ej. `'/contacto'`, usado para construir el canonical y `og:url` con el dominio del Global Constraints) — `structuredData` (objeto o array de objetos, opcional, cada uno con su propio `"@type"`) para JSON-LD específico de esa ruta (ej. `BreadcrumbList`, `Service`). Páginas posteriores (Task 4) llaman esto exactamente así.

- [ ] **Step 1: Crear `src/hooks/useDocumentMeta.js`**

```js
import { useEffect } from 'react'

const SITE_NAME = 'Kubbox'
const DOMAIN = 'https://kubbox.com'

function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function setRouteStructuredData(structuredData) {
  document.head.querySelectorAll('script[data-route-schema="true"]').forEach((el) => el.remove())
  if (!structuredData) return
  const items = Array.isArray(structuredData) ? structuredData : [structuredData]
  items.forEach((item) => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.setAttribute('data-route-schema', 'true')
    script.textContent = JSON.stringify({ '@context': 'https://schema.org', ...item })
    document.head.appendChild(script)
  })
}

/**
 * Sets document.title, meta description, canonical, Open Graph tags and
 * optional route-specific JSON-LD for the current page.
 * Usage: useDocumentMeta({ title: 'Contacto', description: '...', path: '/contacto' })
 */
export function useDocumentMeta({ title, description, path, structuredData, noindex = false }) {
  useEffect(() => {
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`
    document.title = fullTitle

    upsertMeta('name', 'description', description)
    upsertCanonical(`${DOMAIN}${path}`)
    upsertMeta('property', 'og:title', fullTitle)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:url', `${DOMAIN}${path}`)

    if (noindex) {
      upsertMeta('name', 'robots', 'noindex, nofollow')
    } else {
      const existing = document.head.querySelector('meta[name="robots"]')
      if (existing) existing.remove()
    }

    setRouteStructuredData(structuredData)

    return () => setRouteStructuredData(null)
  }, [title, description, path, structuredData, noindex])
}
```

- [ ] **Step 2: Verificar que no hay errores de build/lint**

Run: `npm run build && npm run lint`
Expected: ambos comandos terminan sin errores (el hook todavía no se usa en ninguna página, así que no cambia ningún comportamiento visible todavía).

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useDocumentMeta.js
git commit -m "feat(seo): add useDocumentMeta hook for per-route meta tags and JSON-LD"
```

---

## Task 4: Aplicar `useDocumentMeta` a las 5 páginas existentes

**Files:**
- Modify: `src/pages/landing/index.jsx`
- Modify: `src/pages/contacto/index.jsx`
- Modify: `src/pages/servicios/desarrollo-digital/index.jsx`
- Modify: `src/pages/proyectos/index.jsx`
- Modify: `src/pages/not-found/index.jsx`

**Interfaces:**
- Consumes: `useDocumentMeta` de Task 3, con la firma exacta `useDocumentMeta({ title, description, path, structuredData?, noindex? })`.

- [ ] **Step 1: Modificar `src/pages/landing/index.jsx`**

Agregar el import y la llamada al hook dentro del componente, antes del `return`:

```jsx
import { useDocumentMeta } from '../../hooks/useDocumentMeta'
```

(agregar junto a los otros imports al inicio del archivo)

```jsx
export default function LandingPage() {
  useDocumentMeta({
    title: 'Kubbox — Agencia de Marketing Digital y Desarrollo Web',
    description: 'Kubbox es una agencia de marketing digital y desarrollo web en Medellín, Colombia. Creamos campañas digitales, plataformas y sitios web que convierten.',
    path: '/',
  })

  const darkZoneRef = useRef(null)
  // ... el resto del componente queda exactamente igual
```

(la línea `useDocumentMeta(...)` va como primera línea dentro de la función, antes de `const darkZoneRef = useRef(null)`)

- [ ] **Step 2: Modificar `src/pages/contacto/index.jsx`**

```jsx
import ContactHeroSection from '../../components/sections/contacto/ContactHeroSection'
import ContactFormSection from '../../components/sections/contacto/ContactFormSection'
import CustomCursor       from '../../components/ui/CustomCursor'
import MorphicBackground  from '../../components/layout/fondo'
import { useDocumentMeta } from '../../hooks/useDocumentMeta'

export default function ContactPage() {
  useDocumentMeta({
    title: 'Contacto',
    description: 'Escríbenos y hablemos de tu próximo proyecto digital. Kubbox, agencia de marketing en Envigado, Medellín.',
    path: '/contacto',
  })

  return (
    <>
      <CustomCursor />
      <MorphicBackground />
      <main>
        <ContactHeroSection />
        <ContactFormSection />
      </main>
    </>
  )
}
```

- [ ] **Step 3: Modificar `src/pages/servicios/desarrollo-digital/index.jsx`**

```jsx
import DigitalHeroSection     from '../../../components/sections/desarrollo-digital/DigitalHeroSection'
import DigitalServicesSection from '../../../components/sections/desarrollo-digital/DigitalServicesSection'
import DigitalPlatformsSection from '../../../components/sections/desarrollo-digital/DigitalPlatformsSection'
import CustomCursor      from '../../../components/ui/CustomCursor'
import MorphicBackground from '../../../components/layout/fondo'
import { useDocumentMeta } from '../../../hooks/useDocumentMeta'

export default function DesarrolloDigitalPage() {
  useDocumentMeta({
    title: 'Desarrollo Digital',
    description: 'Plataformas, sitios web y productos digitales a la medida. Servicio de desarrollo digital de Kubbox.',
    path: '/servicios/desarrollo-digital',
    structuredData: {
      '@type': 'Service',
      serviceType: 'Desarrollo de plataformas y sitios web',
      provider: { '@type': 'LocalBusiness', name: 'Kubbox', url: 'https://kubbox.com/' },
      areaServed: 'Medellín, Colombia',
    },
  })

  return (
    <>
      <CustomCursor />
      <MorphicBackground />
      <main>
        <DigitalHeroSection />
        <DigitalServicesSection />
        <DigitalPlatformsSection />
      </main>
    </>
  )
}
```

- [ ] **Step 4: Modificar `src/pages/proyectos/index.jsx`**

```jsx
import { useParams, Navigate } from 'react-router-dom'
import CustomCursor from '../../components/ui/CustomCursor'
import MorphicBackground from '../../components/layout/fondo'
import ProjectRenderer from '../../components/sections/proyectos/ProjectRenderer'
import { getProject, defaultSlug } from '../../data/proyectos'
import { useDocumentMeta } from '../../hooks/useDocumentMeta'

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const project = getProject(slug)

  useDocumentMeta({
    title: project ? `${project.title} · ${project.name}` : 'Proyecto',
    description: project ? `${project.name} — ${project.meta.category}. Caso de éxito de Kubbox.` : 'Caso de éxito de Kubbox.',
    path: `/proyectos/${slug}`,
    structuredData: project ? {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://kubbox.com/' },
        { '@type': 'ListItem', position: 2, name: project.name, item: `https://kubbox.com/proyectos/${slug}` },
      ],
    } : undefined,
  })

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

Nota: el hook se llama **antes** del `if (!project) return <Navigate .../>` para que el título quede seteado correctamente incluso en el primer render del slug inválido (el `Navigate` redirige de inmediato, así que ese caso es transitorio y no afecta nada visible).

- [ ] **Step 5: Modificar `src/pages/not-found/index.jsx`**

```jsx
import NotFoundSection from '../../components/sections/not-found/NotFoundSection'
import CustomCursor from '../../components/ui/CustomCursor'
import MorphicBackground from '../../components/layout/fondo'
import { useDocumentMeta } from '../../hooks/useDocumentMeta'

export default function NotFoundPage() {
  useDocumentMeta({
    title: 'Página no encontrada',
    description: 'Esta página no existe, se movió o nunca estuvo aquí.',
    path: '/404',
    noindex: true,
  })

  return (
    <>
      <CustomCursor />
      <MorphicBackground />
      <main>
        <NotFoundSection />
      </main>
    </>
  )
}
```

- [ ] **Step 6: Verificar en el navegador que el título cambia por ruta**

Run: `npm run dev` y abrir `http://localhost:5173/`, luego navegar a `/contacto`, `/servicios/desarrollo-digital`, `/proyectos/kelloggs` y a una ruta inexistente como `/xyz`.
Expected: la pestaña del navegador muestra un título distinto en cada ruta (`Kubbox — Agencia...`, `Contacto | Kubbox`, `Desarrollo Digital | Kubbox`, `Códigos Secretos · Kellogg's | Kubbox`, `Página no encontrada | Kubbox`). Inspeccionar el `<head>` con devtools en `/xyz` y confirmar que aparece `<meta name="robots" content="noindex, nofollow">`.

- [ ] **Step 7: Commit**

```bash
git add src/pages/
git commit -m "feat(seo): apply per-route meta tags and structured data to all pages"
```

---

## Task 5: Auditoría de jerarquía de headings y alt text

**Files:**
- No se sabe de antemano qué archivos se van a modificar — depende de los hallazgos de la auditoría. El criterio de fix está fijado abajo (no es un placeholder: es el criterio exacto a aplicar a cualquier hallazgo).

**Interfaces:**
- No produce ni consume nada de otras tareas, pero la Task 8 (prerender) depende de que **cada página tenga exactamente un `<h1>` visible al cargar** — esta tarea debe completarse antes de la Task 8.

- [ ] **Step 1: Dispatch a un agente de solo-lectura para la auditoría**

Usar el Agent tool con `subagent_type: "Explore"` (o un agente general de solo-lectura) con este prompt:

```
Audita src/components/sections/**/*.jsx y src/pages/**/*.jsx en este proyecto
(Vite + React). Para cada una de estas 5 rutas/páginas, identifica todos los
componentes de sección que renderiza y reporta:

1. ¿Cuántos elementos <h1> o <motion.h1> aparecen en total al renderizar esa
   página completa (sumando todas sus secciones)? Debe ser exactamente 1.
   Si es 0 o más de 1, dilo explícitamente con el archivo y línea de cada uno.
   Rutas a revisar:
   - "/" -> src/pages/landing/index.jsx (HeroSection, ProjectsSection,
     ServicesSection, AISection, PhilosophySection, ClientsSection, CTASection)
   - "/contacto" -> src/pages/contacto/index.jsx (ContactHeroSection, ContactFormSection)
   - "/servicios/desarrollo-digital" -> src/pages/servicios/desarrollo-digital/index.jsx
     (DigitalHeroSection, DigitalServicesSection, DigitalPlatformsSection)
   - "/proyectos/:slug" -> los bloques en src/components/sections/proyectos/blocks/
     usados por src/data/proyectos/kelloggs.js (hero, statement, sectionHeading,
     textPanel, mediaGallery, statGrid, regionCards)
   - "/404" -> src/pages/not-found/index.jsx (NotFoundSection)

2. Todas las etiquetas <img> o <motion.img> en esos mismos archivos/componentes
   que NO tengan el atributo alt en absoluto (distinto de alt="" vacío a propósito
   — eso es válido cuando la imagen es decorativa y hay texto equivalente al lado,
   como el logo en Navbar/Footer). Reporta archivo, línea, y el src de la imagen.

3. Cualquier <img>/<motion.img> cuyo alt actual sea genérico o no descriptivo
   (ej. alt="imagen", alt="foto", alt="img") en vez de describir el contenido real.

Reporta en una lista concisa por archivo. No modifiques ningún archivo.
```

- [ ] **Step 2: Aplicar los fixes según los hallazgos**

Para cada hallazgo del agente, aplicar exactamente uno de estos criterios (no hay otros casos válidos):

- **Página con 0 `<h1>`:** convertir el heading principal más prominente de esa página (normalmente el de su Hero section) de `<h2>`/`<motion.h2>` a `<h1>`/`<motion.h1>`, manteniendo todas las clases y props tal cual — solo cambia la etiqueta.
- **Página con más de 1 `<h1>`:** mantener el `<h1>` de la sección Hero (la primera que se renderiza) y bajar los demás a `<h2>`.
- **`<img>` sin atributo `alt`:** agregar `alt="<descripción concreta y corta del contenido visual real de esa imagen, en español>"` — describir lo que se ve, no "imagen de X" ni texto genérico. Si la imagen es puramente decorativa y no aporta información (ej. una textura de fondo `aria-hidden`), usar `alt=""` y agregar `aria-hidden="true"` si no lo tiene ya.
- **`alt` genérico existente:** reemplazar por una descripción concreta del contenido real de esa imagen específica.

- [ ] **Step 3: Verificar build**

Run: `npm run build`
Expected: sin errores.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "fix(seo): ensure single h1 per page and descriptive alt text on content images"
```

(Si la auditoría no encontró ningún problema, omitir este commit y anotarlo en el reporte de la tarea — no crear un commit vacío.)

---

## Task 6: `robots.txt` y `llms.txt` estáticos

**Files:**
- Create: `public/robots.txt`
- Create: `public/llms.txt`

**Interfaces:**
- Ninguna — son archivos estáticos que Vite copia tal cual de `public/` a `dist/`.

- [ ] **Step 1: Crear `public/robots.txt`**

```
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /

Sitemap: https://kubbox.com/sitemap.xml
```

- [ ] **Step 2: Crear `public/llms.txt`**

```markdown
# Kubbox

> Agencia de marketing digital y desarrollo web en Medellín, Colombia. Ayudamos a PYMEs, startups y marcas personales colombianas a crecer digitalmente con campañas de marketing efectivas y desarrollo web profesional.

Kubbox combina la energía de un estudio creativo joven con la capacidad de una agencia senior: campañas digitales, desarrollo de plataformas y sitios web, y estrategia de marca para negocios que buscan más ventas, más alcance y mejor presencia digital.

## Servicios

- Campañas de marketing digital (retail, redes sociales, captura de datos de consumidor)
- Desarrollo de plataformas y sitios web a la medida (ver /servicios/desarrollo-digital)
- Estrategia de marca y contenido

## Casos de éxito

- Kellogg's — "Códigos Secretos": campaña retail en Costa Rica, Guatemala y El Salvador (ver /proyectos/kelloggs)

## Contacto

- Email: cfernandez@kubbox.com
- Teléfono: +57 310 4255766
- Ubicación: Envigado, Antioquia, Colombia (área metropolitana de Medellín)
- Sitio: https://kubbox.com
```

- [ ] **Step 3: Verificar que ambos quedan en el build**

Run: `npm run build && ls dist/robots.txt dist/llms.txt`
Expected: ambos archivos listados sin error.

- [ ] **Step 4: Commit**

```bash
git add public/robots.txt public/llms.txt
git commit -m "feat(seo): add robots.txt with AI-crawler rules and llms.txt"
```

---

## Task 7: Generador de `sitemap.xml`

**Files:**
- Create: `scripts/generate-sitemap.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: `projectList` exportado por `src/data/proyectos/index.js` (ya existe, exporta `[{ slug: 'kelloggs', ... }]`).
- Produces: `public/sitemap.xml`, regenerado en cada build — si se agrega un proyecto nuevo a `projectList`, su ruta aparece automáticamente en el próximo build sin tocar este script.

- [ ] **Step 1: Crear `scripts/generate-sitemap.mjs`**

```js
import { writeFileSync } from 'node:fs'
import { projectList } from '../src/data/proyectos/index.js'

const DOMAIN = 'https://kubbox.com'

const staticRoutes = ['/', '/contacto', '/servicios/desarrollo-digital']
const projectRoutes = projectList.map((p) => `/proyectos/${p.slug}`)
const routes = [...staticRoutes, ...projectRoutes]

const urlEntries = routes
  .map((route) => `  <url>\n    <loc>${DOMAIN}${route}</loc>\n  </url>`)
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`

writeFileSync('public/sitemap.xml', xml, 'utf-8')
console.log(`sitemap.xml generated with ${routes.length} routes`)
```

- [ ] **Step 2: Agregar el script `prebuild` en `package.json`**

Modificar el bloque `"scripts"` de `package.json` para que quede:

```json
  "scripts": {
    "dev": "vite",
    "prebuild": "node scripts/generate-sitemap.mjs",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
```

(npm corre `prebuild` automáticamente antes de `build` cada vez que se ejecuta `npm run build` — no hace falta llamarlo a mano.)

- [ ] **Step 3: Verificar que se genera correctamente**

Run: `npm run build && cat public/sitemap.xml`
Expected: el XML impreso contiene `<loc>https://kubbox.com/</loc>`, `<loc>https://kubbox.com/contacto</loc>`, `<loc>https://kubbox.com/servicios/desarrollo-digital</loc>` y `<loc>https://kubbox.com/proyectos/kelloggs</loc>` — 4 entradas en total (el número de entradas debe coincidir con `3 + projectList.length`).

- [ ] **Step 4: Commit**

```bash
git add scripts/generate-sitemap.mjs package.json public/sitemap.xml
git commit -m "feat(seo): generate sitemap.xml dynamically from real routes on every build"
```

---

## Task 8: Pre-renderizado en build-time para crawlability sin SSR

**Files:**
- Create: `scripts/prerender.mjs`
- Modify: `package.json`
- Modify: `vite.config.js`

**Interfaces:**
- Consumes: `projectList` de `src/data/proyectos/index.js` (mismo patrón que Task 7, para no mantener la lista de rutas en dos lugares).
- Produces: `dist/index.html`, `dist/contacto/index.html`, `dist/servicios/desarrollo-digital/index.html`, `dist/proyectos/<slug>/index.html` por cada slug — cada uno con el HTML completo ya hidratado (head con meta tags correctos de Task 3/4, contenido visible de la página, sin necesitar que el crawler ejecute JS para verlo).

- [ ] **Step 1: Cambiar `base` en `vite.config.js`**

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: '/',
})
```

- [ ] **Step 2: Instalar Playwright como devDependency**

Run: `npm install -D playwright && npx playwright install chromium`
Expected: ambos comandos terminan sin error. El segundo descarga el binario de Chromium headless (puede tardar uno o dos minutos la primera vez).

- [ ] **Step 3: Crear `scripts/prerender.mjs`**

```js
import { spawn } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import { chromium } from 'playwright'
import { projectList } from '../src/data/proyectos/index.js'

const PORT = 4173
const BASE_URL = `http://localhost:${PORT}`
const ROUTES = [
  '/',
  '/contacto',
  '/servicios/desarrollo-digital',
  ...projectList.map((p) => `/proyectos/${p.slug}`),
]

function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now()
  return new Promise((resolve, reject) => {
    const tryFetch = () => {
      fetch(url)
        .then(() => resolve())
        .catch(() => {
          if (Date.now() - start > timeoutMs) reject(new Error('Preview server did not start in time'))
          else setTimeout(tryFetch, 500)
        })
    }
    tryFetch()
  })
}

async function main() {
  const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], {
    stdio: 'inherit',
    shell: true,
  })

  try {
    await waitForServer(BASE_URL)
    const browser = await chromium.launch()
    const page = await browser.newPage()

    for (const route of ROUTES) {
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' })
      await page.waitForSelector('h1', { timeout: 15000 })
      const html = await page.content()

      const outPath = route === '/' ? 'dist/index.html' : `dist${route}/index.html`
      mkdirSync(dirname(outPath), { recursive: true })
      writeFileSync(outPath, html, 'utf-8')
      console.log(`Prerendered ${route} -> ${outPath}`)
    }

    await browser.close()
  } finally {
    server.kill()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
```

- [ ] **Step 4: Agregar el script `postbuild` en `package.json`**

```json
  "scripts": {
    "dev": "vite",
    "prebuild": "node scripts/generate-sitemap.mjs",
    "build": "vite build",
    "postbuild": "node scripts/prerender.mjs",
    "lint": "eslint .",
    "preview": "vite preview"
  },
```

- [ ] **Step 5: Correr el pipeline completo y verificar**

Run: `npm run build`
Expected: corre `prebuild` (sitemap) → `vite build` → `postbuild` (prerender), termina sin errores, e imprime 4 líneas `Prerendered <ruta> -> dist/...` (una por cada ruta en `ROUTES`).

Run: `grep -c 'Cra. 48' dist/contacto/index.html`
Expected: `1` o más — confirma que el HTML pre-renderizado de `/contacto` contiene el texto real de la dirección (no solo el `<div id="root"></div>` vacío del shell original).

Run: `grep -o '<title>[^<]*</title>' dist/proyectos/kelloggs/index.html`
Expected: `<title>Códigos Secretos · Kellogg's | Kubbox</title>` — confirma que el meta tag dinámico de Task 4 quedó horneado en el HTML estático.

- [ ] **Step 6: Verificar que la navegación client-side normal sigue funcionando**

Run: `npm run preview`, abrir `http://localhost:4173/` en el navegador, y hacer click en los links del Navbar para ir a `/contacto` y `/proyectos/kelloggs`.
Expected: la navegación es instantánea (sin recarga de página completa), exactamente igual que antes de esta tarea — el pre-renderizado solo afecta la primera carga/HTML crudo, no el comportamiento de React Router en el cliente.

- [ ] **Step 7: Commit**

```bash
git add scripts/prerender.mjs package.json vite.config.js
git commit -m "feat(seo): prerender real routes to static HTML at build time for crawlability"
```

---

## Notas de despliegue (no son una tarea de código, son para cuando subas esto a cPanel)

- Sube el contenido de `dist/` (no la carpeta `dist` en sí, su **contenido**) a la carpeta raíz del dominio en cPanel (normalmente `public_html/` o `public_html/kubbox.com/` si es un addon domain).
- Confirma que `.htaccess` se subió (algunos clientes FTP ocultan archivos que empiezan con punto por defecto — revisa la opción "mostrar archivos ocultos").
- Verifica que el certificado SSL de `kubbox.com` esté activo antes de promover canonical/OG con `https://` — si todavía no lo está, todo este plan asume que sí lo estará para cuando esto se publique.
- Cuando tengas el código real de Google Search Console y el Measurement ID de GA4, descomenta los bloques marcados `TODO(SEO)` en `index.html` (Task 1) y vuelve a correr `npm run build`.
