import { chromium } from 'playwright-core'
const browser = await chromium.launch()
const page = await browser.newPage()
for (const [w,h,name] of [[1280,900,'t7_desktop'],[390,900,'t7_mobile']]) {
  await page.setViewportSize({ width: w, height: h })
  await page.goto('http://localhost:5174/proyectos/kelloggs', { waitUntil: 'networkidle' })
  await page.waitForTimeout(700)
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await page.waitForTimeout(600)
  await page.screenshot({ path: `C:/Users/Sofia A/${name}.png` })
}
await browser.close()
