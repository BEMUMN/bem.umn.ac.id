const sharp = require("sharp");
const fs = require("node:fs/promises");
const path = require("node:path");
const root = path.resolve(__dirname, "../..");

async function main() {
    const files = [
        "docs/redesign/candidates/open-leaf.webp",
        "docs/redesign/candidates/shared-sheets.webp",
        "docs/redesign/candidates/paper-horizon.webp",
        "public/images/social/home.png",
        "public/images/pelantikan-480.webp",
        ...["bph", "sukm", "sufak", "lso", "pr", "sukma"].map(
            (id) => `public/images/divisi-${id}-480.webp`,
        ),
        "public/svgs/BEM_GEN_16_LOGO_DARK.svg",
        ...[
            "SOLID_supergrafik_4",
            "INNOVATIVE_supergrafik_3",
            "COLLABORATIVE_supergrafik_1",
            "INCLUSIVE_supergrafik_2",
        ].map((name) => `public/svgs/${name}.svg`),
    ];
    const css = await fs.readFile(path.join(root, "app/globals.css"), "utf8");
    const paper = css.match(/--paper:\s*(#[a-f\d]+);/i)[1];
    const composites = await Promise.all(
        files.map(async (file, i) => ({
            input: await sharp(path.join(root, file))
                .resize(360, 270, { fit: "contain", background: paper })
                .png()
                .toBuffer(),
            left: (i % 4) * 400 + 20,
            top: Math.floor(i / 4) * 310 + 20,
        })),
    );
    await sharp({
        create: { width: 1600, height: 1240, channels: 3, background: paper },
    })
        .composite(composites)
        .webp({ quality: 85 })
        .toFile(path.join(root, "docs/redesign/asset-contact-sheet.webp"));
}
main().catch((error) => {
    console.error(error);
    process.exit(1);
});
