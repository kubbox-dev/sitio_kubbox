import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'
import { chromium } from 'playwright'
import { preview } from 'vite'
import { projectList } from '../src/data/proyectos/index.js'

const PORT = 4173
const ROUTES = [
  '/',
  '/contacto',
  '/servicios/desarrollo-digital',
  ...projectList.map((p) => `/proyectos/${p.slug}`),
]

async function main() {
  const server = await preview({
    preview: { port: PORT, strictPort: true },
  })
  const url = server.resolvedUrls.local[0]
  const baseUrl = url.replace(/\/$/, '')

  try {
    const browser = await chromium.launch()
    const page = await browser.newPage()

    for (const route of ROUTES) {
      await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle' })
      await page.waitForSelector('h1', { timeout: 15000 })
      const html = await page.content()

      const outPath = route === '/' ? 'dist/index.html' : `dist${route}/index.html`
      mkdirSync(dirname(outPath), { recursive: true })
      writeFileSync(outPath, html, 'utf-8')
      console.log(`Prerendered ${route} -> ${outPath}`)
    }

    await browser.close()
  } finally {
    await server.close()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
