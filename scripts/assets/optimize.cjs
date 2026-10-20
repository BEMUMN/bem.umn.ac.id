const sharp = require("sharp");
const fs = require("node:fs/promises");
const path = require("node:path");
const root = path.resolve(__dirname, "../..");
const output = path.join(root, "public/images");
const widths = [480, 960, 1600];

async function main() {
    await fs.mkdir(output, { recursive: true });
    await fs.mkdir(path.join(root, "docs/redesign/candidates"), { recursive: true });
    const entries = [
        ["pelantikan", "public/pngs/gallery/background.webp"],
        ...["BPH", "SUKM", "SUFAK", "LSO", "PR", "SUKMA"].map(id => [`divisi-${id.toLowerCase()}`, `public/pngs/members/divisi/DIVISI_${id}.webp`]),
    ];
    try { await fs.access(path.join(root, "assets-source/shared-sheets.png")); entries.push(["shared-sheets", "assets-source/shared-sheets.png"]); } catch { console.log("Generated master absent; retaining committed production artwork."); }
    const manifest = [];
    for (const [name, source] of entries) {
        for (const width of widths) {
            for (const format of ["webp", "avif"]) {
                const file = `${name}-${width}.${format}`;
                const image = sharp(path.join(root, source)).rotate().resize({ width, withoutEnlargement: true });
                if (name === "shared-sheets") image.modulate({ saturation: .85, brightness: .98 });
                const info = await image[format]({ quality: format === "avif" ? 44 : 68, effort: 5 }).toFile(path.join(output, file));
                manifest.push({ file: `/images/${file}`, source, bytes: info.size, width: info.width, height: info.height });
            }
        }
    }
    for (const name of ["open-leaf", "shared-sheets", "paper-horizon"]) {
        try { await sharp(path.join(root, `assets-source/${name}.png`)).resize(720).webp({ quality: 75 }).toFile(path.join(root, `docs/redesign/candidates/${name}.webp`)); } catch { /* Candidate previews are already committed when masters are absent. */ }
    }
    for (const file of await fs.readdir(path.join(root, "public/svgs/logo_kegma"))) {
        const name = file.replace(".webp", "").toLowerCase();
        const info = await sharp(path.join(root, "public/svgs/logo_kegma", file)).resize({ width: 320, height: 320, fit: "inside", withoutEnlargement: true }).webp({ quality: 80 }).toFile(path.join(output, `${name}.webp`));
        manifest.push({ file: `/images/${name}.webp`, source: `public/svgs/logo_kegma/${file}`, bytes: info.size, width: info.width, height: info.height });
    }
    await fs.writeFile(path.join(root, "scripts/assets/manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
    console.log(`${manifest.length} optimized files; largest ${Math.max(...manifest.map(x => x.bytes))} bytes`);
}
main().catch(error => { console.error(error); process.exit(1); });
