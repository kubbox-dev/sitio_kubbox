import sharp from "sharp";
import { statSync } from "node:fs";

const targets = [
  { src: "public/images/HOME/WEB/Clientes/kelloggs.jpg", out: "public/images/HOME/WEB/Clientes/kelloggs.webp", width: 1500 },
  { src: "public/images/HOME/WEB/Clientes/armorall.jpg", out: "public/images/HOME/WEB/Clientes/armorall.webp", width: 1500 },
  { src: "public/images/HOME/WEB/Ruleta/senora.png", out: "public/images/HOME/WEB/Ruleta/senora.webp", width: 700 },
];

for (const t of targets) {
  const before = statSync(t.out).size;
  await sharp(t.src)
    .resize({ width: t.width, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(t.out + ".tmp");
  const { renameSync } = await import("node:fs");
  renameSync(t.out + ".tmp", t.out);
  const after = statSync(t.out).size;
  console.log(`${t.out}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB (width ${t.width}px)`);
}
