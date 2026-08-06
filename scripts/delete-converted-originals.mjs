import { readdirSync, statSync, unlinkSync, existsSync } from "node:fs";
import { join, extname } from "node:path";

const ROOT = "public/images";
let deleted = 0;
let freedBytes = 0;
let skipped = [];

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if ([".png", ".jpg", ".jpeg"].includes(extname(entry.name).toLowerCase())) {
      const webpPath = full.replace(/\.(png|jpg|jpeg)$/i, ".webp");
      if (existsSync(webpPath)) {
        freedBytes += statSync(full).size;
        unlinkSync(full);
        deleted++;
      } else {
        skipped.push(full);
      }
    }
  }
}

walk(ROOT);
console.log(`Deleted ${deleted} original files, freed ${(freedBytes / 1024 / 1024).toFixed(1)}MB`);
if (skipped.length) {
  console.log("Skipped (no .webp counterpart found):");
  skipped.forEach((s) => console.log(" -", s));
}
