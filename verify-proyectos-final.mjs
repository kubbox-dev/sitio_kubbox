import { chromium } from "playwright";
const shotDir = "C:\\Users\\SOFIAA~1\\AppData\\Local\\Temp\\claude\\c--Users-Sofia-A-OneDrive---Universidad-EAFIT-Escritorio-sitio-kubbox\\3ccfa102-bae6-412d-ac2a-cccaa63fcd40\\scratchpad";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errors = [];
page.on("console", (msg) => { if (msg.type() === "error") errors.push(msg.text()); });
await page.goto("http://localhost:5173/proyectos/", { waitUntil: "networkidle" });
await page.waitForSelector("h1");
await page.waitForTimeout(800);
await page.screenshot({ path: `${shotDir}\\proyectos-review1.png` });

// advance the carousel a few times to see different cards
for (let i = 0; i < 4; i++) {
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(600);
}
await page.screenshot({ path: `${shotDir}\\proyectos-review2.png` });

console.log("ERRORS:", JSON.stringify(errors));
await browser.close();
