import { readFileSync, writeFileSync } from "node:fs";

// ProjectsSection.jsx also does `motion(Link)` (function-call form) to wrap
// react-router's Link, not just `motion.tag` JSX usage — keep its `motion`
// import alongside the new `m` import instead of removing it.
const KEEP_MOTION_IMPORT = new Set([
  "src/components/sections/landing/ProjectsSection.jsx",
]);

const files = process.argv.slice(2);
const importRe = /import\s*\{\s*([^}]*?)\s*\}\s*from\s*(['"])(framer-motion|motion\/react)\2(;?)/;

let changed = 0;

for (const file of files) {
  const original = readFileSync(file, "utf-8");
  const m = original.match(importRe);
  if (!m) {
    console.log(`SKIP (no matching import): ${file}`);
    continue;
  }

  const [fullMatch, namedList, quote, source, semi] = m;
  const items = namedList.split(",").map((s) => s.trim()).filter(Boolean);
  if (!items.includes("motion")) {
    console.log(`SKIP (no bare 'motion' import): ${file}`);
    continue;
  }

  const keepMotion = KEEP_MOTION_IMPORT.has(file.replace(/\\/g, "/"));
  const remaining = keepMotion ? items : items.filter((i) => i !== "motion");

  const mImportLine = `import * as m from ${quote}motion/react-m${quote}${semi}`;
  let replacement;
  if (remaining.length === 0) {
    replacement = mImportLine;
  } else {
    const originalImportLine = `import { ${remaining.join(", ")} } from ${quote}${source}${quote}${semi}`;
    replacement = `${originalImportLine}\n${mImportLine}`;
  }

  let updated = original.replace(fullMatch, replacement);

  // Rename JSX/property usage `motion.xxx` -> `m.xxx` (does NOT touch
  // `motion(Component)` calls, or identifiers like useMotionValue).
  updated = updated.replace(/\bmotion\.(?=[a-zA-Z])/g, "m.");

  writeFileSync(file, updated, "utf-8");
  changed++;
  console.log(`OK: ${file}`);
}

console.log(`\n${changed}/${files.length} files migrated`);
