# Página "Nuestros Proyectos" — Diseño

Fecha: 2026-06-19
Estado: aprobado (diseño), pendiente plan de implementación

## Resumen

Construir la sección "Nuestros Proyectos": un sistema donde cada proyecto (caso de
éxito) tiene su propia página de detalle, enlazable por URL, armada a partir de una
**lista de bloques componibles** declarada en datos. La primera entrega incluye toda la
arquitectura más el caso **Kellogg's "Códigos Secretos"** con contenido real. Los demás
casos del carrusel (Pollocao, F-rixo, CAM) se agregarán después como archivos de datos
usando los mismos bloques.

## Decisiones tomadas (brainstorming)

- **Estructura flexible por proyecto**: cada proyecto puede tener secciones distintas y en
  distinto orden, compartiendo un mismo kit de estilo. → arquitectura de bloques, no
  plantilla rígida ni plantilla-por-proyecto duplicada.
- **Edición por código/datos** (sin CMS): un proyecto nuevo es un archivo de datos en el
  repo.
- **URL propia por proyecto**: `/proyectos/:slug`. `/proyectos` entra al proyecto por
  defecto.
- **Primera entrega**: sistema + Kellogg's completo. Otros 3 casos, después.
- **Gráficas como imagen**: usar los PNG ya diseñados (`grafica 1`, `grafica 2`) tal cual,
  sin librería de charts.

## Objetivos / No-objetivos

**Objetivos**
- Arquitectura de bloques reutilizable: agregar un proyecto = escribir datos, nunca
  duplicar archivos de plantilla.
- Una página de detalle por proyecto, enlazable y compartible (`/proyectos/:slug`).
- Caso Kellogg's con contenido real, fiel al mockup.
- Todo en Tailwind y consistente con el estilo del sitio (lima neón, navy, Barlow
  Condensed, motivo corner-bracket HUD). Cumple `prefers-reduced-motion`.

**No-objetivos (esta entrega)**
- Selector de proyectos (UI para elegir qué caso ver desde la propia página). Diferido
  explícitamente por el usuario. Por ahora se entra vía el carrusel del landing o URL
  directa.
- CMS / panel de administración.
- Los casos Pollocao, F-rixo y CAM con contenido real (se stubbean/omiten; se agregan
  luego con los mismos bloques cuando haya assets).
- Gráficas en vivo/animadas.

## Arquitectura

### Modelo de datos (bloques componibles)

Cada proyecto es un objeto de datos:

```js
// data/proyectos/kelloggs.js
export default {
  slug: 'kelloggs',
  name: "Kellogg's",
  title: 'Códigos Secretos',
  meta: { category: 'Campaña Digital · Centroamérica', /* para cards/SEO */ },
  blocks: [
    { type: 'hero',           props: { /* logo, personaje, empaques, título */ } },
    { type: 'statement',      props: { /* título grande + tags + párrafos */ } },
    { type: 'sectionHeading', props: { lime: 'RESULTADOS DE', white: 'LA CAMPAÑA' } },
    { type: 'textPanel',      props: { /* prosa en panel de vidrio */ } },
    { type: 'mediaGallery',   props: { images: ['grafica 1.png', 'grafica 2.png'] } },
    { type: 'statGrid',       props: { stats: [/* icono, label, número */] } },
    { type: 'regionCards',    props: { regions: [/* bandera, stats por país */] } },
  ],
}
```

El orden y la presencia de cada bloque son por proyecto. Reordenar/añadir/quitar una
sección = editar el array `blocks`.

### Registro y renderizador

- `data/proyectos/index.js`: importa cada proyecto, exporta un mapa `slug → datos`, una
  lista ordenada (para futuro selector) y `defaultSlug`.
- `components/sections/proyectos/blocks/registry.js`: mapa `tipo (string) → Componente`.
- `ProjectRenderer.jsx`: recibe `blocks[]`, recorre y pinta cada bloque vía el registro:
  `blocks.map(b => { const C = registry[b.type]; return C ? <C key={i} {...b.props}/> : null })`.
  Un `type` desconocido (typo) **no rompe** la página: se omite (en dev, opcionalmente un
  `console.warn`).

### Página de detalle

- `pages/proyectos/index.jsx` (`ProjectDetailPage`): lee `:slug` con `useParams`, busca en
  el registro. Si no existe el slug → redirige al `defaultSlug` (o muestra "no encontrado",
  a decidir en el plan; por defecto: redirige). Renderiza `<ProjectRenderer blocks={...} />`
  dentro del shell de página estándar (CustomCursor + MorphicBackground + main), igual que
  las páginas existentes.

### Rutas (router/index.jsx)

- `const ProyectoPage = lazy(() => import('../pages/proyectos'))`
- `<Route path="/proyectos/:slug" element={<ProyectoPage />} />`
- `<Route path="/proyectos" element={<Navigate to={'/proyectos/' + defaultSlug} replace />} />`
- Wiring de entrada:
  - Carrusel del landing ([ProjectsSection.jsx](../../../src/components/sections/landing/ProjectsSection.jsx)):
    el botón "Ver proyecto" (`href="#"`) pasa a `Link` a `/proyectos/<slug>` por proyecto.
    Requiere añadir `slug` a cada objeto del array `PROJECTS` existente.
  - Navbar: el item "Nuestros Proyectos" (`href: null`) pasa a `/proyectos`.

## Librería inicial de bloques

Derivada del mockup del caso Kellogg's. Cada uno es un componente autocontenido en
`components/sections/proyectos/blocks/`, en Tailwind, con su variante reduced-motion.

1. **HeroBlock** — logo de marca + personaje/empaques + tratamiento del título de página
   ("NUESTROS PROYECTOS" lima-hueco + blanco).
2. **StatementBlock** — título grande del proyecto ("CÓDIGOS SECRETOS") + tags de
   servicio/tech como display ("API", "WHATSAPP") + párrafos de descripción.
3. **SectionHeadingBlock** — heading partido lima-hueco + blanco, reutilizable como
   separador de sección ("RESULTADOS DE LA CAMPAÑA").
4. **TextPanelBlock** — panel de vidrio (navy translúcido + blur + corner brackets, mismo
   motivo de `DigitalServicesSection`/`DigitalPlatformsSection`) con prosa.
5. **MediaGalleryBlock** — una o más imágenes (las gráficas) dentro de panel(es) de vidrio.
6. **StatGridBlock** — grid de tarjetas: ícono + label + número grande (usuarios
   registrados, códigos registrados, premios entregados).
7. **RegionCardsBlock** — tarjetas con bandera + varias stats por país (Guatemala, El
   Salvador, Costa Rica).

## Cómo se agrega un proyecto nuevo (flujo objetivo)

1. Crear `data/proyectos/<slug>.js` exportando `{ slug, name, title, meta, blocks: [...] }`.
2. Registrarlo en `data/proyectos/index.js`.
3. Componer la página listando bloques en `blocks` (reordenar/añadir/quitar = editar el
   array). Si hace falta un tipo de sección nuevo, se escribe **un** componente de bloque y
   queda disponible para todos los proyectos.

Sin duplicar archivos de página, sin "elegir plantilla".

## Assets

- Caso Kellogg's: `public/images/NUESTROS PROYECTOS/WEB/` — `Logos/`, `Fotos/`
  (collages, `grafica 1.png`, `grafica 2.png`, `bob esponja.png`), `Recursos/`,
  `Iconos/` (usuario, code, medalla, banderas Guatemala/El Salvador/Costa Rica),
  `Fondo/`.
- Referencia de diseño: mockup mobile `MOBILE/Pantallazo mobile/Sobre-nosotros-pantallazo.png`
  y (pendiente de agregar por el usuario) versión PC en `WEB/Pantallazo`.

## Riesgos / puntos abiertos

- **Navegación entre proyectos sin selector**: con el selector diferido y `/proyectos`
  redirigiendo al default, el usuario solo llega a otros casos vía el carrusel del landing
  o URL directa. Aceptable para la primera entrega; el selector se diseña después.
- **Slug no encontrado**: por defecto redirige al `defaultSlug`. Confirmar en el plan si se
  prefiere una vista "no encontrado".
- Los números reales de las stats/regiones del caso Kellogg's se toman del mockup; si hay
  datos oficiales distintos, se ajustan en el archivo de datos.
