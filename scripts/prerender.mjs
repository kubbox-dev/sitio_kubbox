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
