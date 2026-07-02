import { writeFileSync } from 'node:fs'
import { projectList } from '../src/data/proyectos/index.js'

const DOMAIN = 'https://kubbox.com'

const staticRoutes = ['/', '/contacto/', '/servicios/desarrollo-digital/']
const projectRoutes = projectList.map((p) => `/proyectos/${p.slug}/`)
const routes = [...staticRoutes, ...projectRoutes]

const urlEntries = routes
  .map((route) => `  <url>\n    <loc>${DOMAIN}${route}</loc>\n  </url>`)
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`

writeFileSync('public/sitemap.xml', xml, 'utf-8')
console.log(`sitemap.xml generated with ${routes.length} routes`)
