import sharp from "sharp";
import { readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOT = "public/images";
const MAX_WIDTH = 1920;
const QUALITY = 80;

function collect(dir, acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) collect(full, acc);
    else if ([".png", ".jpg", ".jpeg"].includes(extname(entry.name).toLowerCase())) acc.push(full);
  }
  return acc;
}

const files = collect(ROOT);
let totalBefore = 0;
let totalAfter = 0;
let failed = [];

for (const filePath of files) {
  const before = statSync(filePath).size;
  const outPath = filePath.replace(/\.(png|jpg|jpeg)$/i, ".webp");
  try {
    await sharp(filePath)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outPath);
    const after = statSync(outPath).size;
    totalBefore += before;
    totalAfter += after;
    console.log(`${(before / 1024).toFixed(0).padStart(6)}KB -> ${(after / 1024).toFixed(0).padStart(6)}KB  ${filePath}`);
  } catch (err) {
    failed.push({ filePath, error: err.message });
    console.error(`FAILED: ${filePath} — ${err.message}`);
  }
}

console.log(`\n${files.length - failed.length}/${files.length} converted`);
console.log(`Total: ${(totalBefore / 1024 / 1024).toFixed(1)}MB -> ${(totalAfter / 1024 / 1024).toFixed(1)}MB`);
if (failed.length) {
  console.log("\nFailed files:");
  failed.forEach((f) => console.log(" -", f.filePath, f.error));
}
