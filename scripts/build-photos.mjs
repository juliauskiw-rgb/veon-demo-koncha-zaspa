// Crops and processes the client's own photos for the homepage (design/notes/photo-plan.md).
// Sources: design/photo-src (covers of the client's YouTube channel) and audit/screens (client site screenshot).
// Uniform treatment "чистий денний світ": saturation -8 % (collage -15 %), contrast +5 %, light sharpening,
// never shown larger than the natural size on a 1x desktop screen. Output: AVIF q55 + WebP q80 in public/img.
// Run from site/: node scripts/build-photos.mjs
import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const site = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const root = path.resolve(site, "..");
const out = path.join(site, "public", "img");
const src = (p) => path.join(root, p);

const jobs = [
  // name, source, crop [x1, y1, x2, y2], output width (null = native), saturation
  ["hero-korpus", "design/photo-src/yt-CaOvhujnWig.jpg", [125, 0, 740, 332], null, 0.92],
  ["hero-korpus-m", "design/photo-src/yt-CaOvhujnWig.jpg", [125, 0, 520, 332], null, 0.92],
  ["spa-basein", "audit/screens/ua-desktop-full.png", [135, 4033, 497, 4228], null, 0.85],
  ["floating", "design/photo-src/yt-k0ASzb3599s.jpg", [40, 45, 400, 315], 240, 0.92],
  ["lis-teritoriya", "audit/screens/ua-desktop-full.png", [185, 200, 400, 420], null, 0.85],
  ["ozero-mistok", "audit/screens/ua-desktop-full.png", [0, 1010, 576, 1188], null, 0.85],
];

for (const [name, file, [x1, y1, x2, y2], width, sat] of jobs) {
  const base = sharp(src(file))
    .extract({ left: x1, top: y1, width: x2 - x1, height: y2 - y1 })
    .resize(width ? { width, kernel: "lanczos3" } : undefined)
    .modulate({ saturation: sat })
    .linear(1.05, -(128 * 0.05))
    .sharpen({ sigma: 0.6, m1: 0.4, m2: 0.4 });
  const meta = await base.clone().toBuffer({ resolveWithObject: true });
  await base.clone().avif({ quality: 55 }).toFile(path.join(out, `${name}.avif`));
  await base.clone().webp({ quality: 80 }).toFile(path.join(out, `${name}.webp`));
  console.log(name, `${meta.info.width}x${meta.info.height}`);
}
