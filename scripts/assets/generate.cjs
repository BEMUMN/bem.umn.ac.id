const fs = require("node:fs/promises");
const path = require("node:path");
const sharp = require("sharp");
const ts = require("typescript");
const root = path.resolve(__dirname, "../..");
const escape = (value) =>
    value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");

async function main() {
    const css = await fs.readFile(path.join(root, "app/globals.css"), "utf8");
    const token = (name) =>
        css.match(new RegExp(`--${name}:\\s*(#[a-f\\d]+);`, "i"))[1];
    const paper = token("paper"),
        ink = token("ink"),
        blue = token("blue"),
        azure = token("azure");
    const source = await fs.readFile(
        path.join(root, "constants/divisionIndex.ts"),
        "utf8",
    );
    const compiled = ts.transpileModule(source, {
        compilerOptions: { module: ts.ModuleKind.CommonJS },
    }).outputText;
    const moduleData = {};
    new Function("exports", compiled)(moduleData);
    const routes = [
        ["home", "BEM UMN", "Generasi XVI"],
        ["tentang-kami", "Tentang kami", "BEM UMN Generasi XVI"],
        ["divisi", "Divisi & anggota", "BEM UMN Generasi XVI"],
        ["kegiatan", "Kegiatan &\nprogram kerja", "BEM UMN Generasi XVI"],
        ...moduleData.divisions.map((d) => [
            `divisi-${d.id.toLowerCase()}`,
            d.fullname,
            `${d.name} · BEM UMN Generasi XVI`,
        ]),
    ];
    const socialDir = path.join(root, "public/images/social");
    await fs.mkdir(socialDir, { recursive: true });
    const logoFile = path.join(root, "public/svgs/LOGO_BEM.svg");
    const logo = await sharp(logoFile)
        .resize(84, 84, { fit: "contain" })
        .png()
        .toBuffer();
    const fontfile = path.join(
        root,
        "public/fonts/Bricolage Grotesque Bold.ttf",
    );
    const text = async (value, size, width, color) =>
        sharp({
            text: {
                text: `<span foreground="${color}">${escape(value)}</span>`,
                font: `Bricolage Grotesque Bold ${size}`,
                fontfile,
                width,
                rgba: true,
            },
        })
            .png()
            .toBuffer();
    const manifest = [];
    for (const [name, source, width] of [
        ["bem-mark", "public/svgs/LOGO_BEM.svg", 128],
        ["cabinet-mark", "public/svgs/BEM_GEN_16_LOGO_DARK.svg", 336],
    ]) {
        const info = await sharp(path.join(root, source))
            .resize({ width })
            .webp({ lossless: true })
            .toFile(path.join(root, `public/images/${name}.webp`));
        manifest.push({
            file: `/images/${name}.webp`,
            bytes: info.size,
            width: info.width,
            height: info.height,
            source,
        });
    }
    // Geometry is fixed: no randomness or external assets are required.
    for (const [name, title, caption] of routes) {
        const background = Buffer.from(
            `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="${paper}"/><path d="M955 0h245v630H1080L955 420Z" fill="${ink}"/><path d="m955 0 125 420-210-75Z" fill="${blue}"/><path d="m1080 420-210-75 85-345Z" fill="${azure}"/></svg>`,
        );
        const titleImage = await text(
            title,
            title.length > 30 ? 61 : 80,
            760,
            ink,
        );
        const titleMeta = await sharp(titleImage).metadata();
        const file = `${name}.png`;
        const info = await sharp(background)
            .composite([
                { input: logo, left: 64, top: 54 },
                {
                    input: await text(caption, 23, 700, blue),
                    left: 174,
                    top: 82,
                },
                {
                    input: titleImage,
                    left: 64,
                    top: Math.round(300 - titleMeta.height / 2),
                },
                {
                    input: await text(
                        "Inclusive for Innovation",
                        27,
                        750,
                        blue,
                    ),
                    left: 64,
                    top: 518,
                },
            ])
            .png({ palette: true, quality: 90, effort: 10 })
            .toFile(path.join(socialDir, file));
        manifest.push({
            file: `/images/social/${file}`,
            bytes: info.size,
            width: info.width,
            height: info.height,
            source: "Official logo, repository titles, deterministic paper geometry",
        });
    }
    for (const [file, size] of [
        ["app/icon.png", 512],
        ["app/apple-icon.png", 180],
    ]) {
        const info = await sharp(logoFile)
            .resize(size, size, { fit: "contain" })
            .png({ palette: true })
            .toFile(path.join(root, file));
        manifest.push({
            file,
            bytes: info.size,
            width: size,
            height: size,
            source: "public/svgs/LOGO_BEM.svg",
        });
    }
    const png = await sharp(logoFile)
        .resize(48, 48, { fit: "contain" })
        .png()
        .toBuffer();
    const ico = Buffer.alloc(22);
    ico.writeUInt16LE(1, 2);
    ico.writeUInt16LE(1, 4);
    ico[6] = 48;
    ico[7] = 48;
    ico.writeUInt16LE(1, 10);
    ico.writeUInt16LE(32, 12);
    ico.writeUInt32LE(png.length, 14);
    ico.writeUInt32LE(22, 18);
    const favicon = Buffer.concat([ico, png]);
    await fs.writeFile(path.join(root, "app/favicon.ico"), favicon);
    manifest.push({
        file: "app/favicon.ico",
        bytes: favicon.length,
        width: 48,
        height: 48,
        source: "public/svgs/LOGO_BEM.svg",
    });
    await fs.writeFile(
        path.join(root, "scripts/assets/generated-manifest.json"),
        JSON.stringify(manifest, null, 2) + "\n",
    );
    console.log(
        `Generated ${manifest.length} social and icon assets; largest ${Math.max(...manifest.map((a) => a.bytes))} bytes.`,
    );
}
main().catch((error) => {
    console.error(error);
    process.exit(1);
});
