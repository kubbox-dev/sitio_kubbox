import { readFileSync, writeFileSync } from "node:fs";

const files = process.argv.slice(2);
const pattern = /\.(png|jpe?g)(["'`])/gi;
let totalReplacements = 0;

for (const file of files) {
  const content = readFileSync(file, "utf-8");
  let count = 0;
  const updated = content.replace(pattern, (_match, _ext, quote) => {
    count++;
    return `.webp${quote}`;
  });
  if (count > 0) {
    writeFileSync(file, updated, "utf-8");
    console.log(`${count.toString().padStart(3)}  ${file}`);
    totalReplacements += count;
  }
}

console.log(`\nTotal: ${totalReplacements} references updated across ${files.length} files`);
