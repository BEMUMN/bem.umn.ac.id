const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const fs = require("node:fs"),
    path = require("node:path"),
    assert = require("node:assert/strict");
const base = process.env.QA_URL || "http://localhost:3000",
    output = process.env.QA_OUTPUT || "coverage/division-photos";
fs.mkdirSync(output, { recursive: true });
(async () => {
    const browser = await chromium.launch({
        executablePath: process.env.CHROME_PATH,
        headless: true,
    });
    const errors = [],
        checks = [];
    try {
        for (const width of [320, 390, 768, 1024, 1440]) {
            const page = await browser.newPage({
                viewport: { width, height: 900 },
                reducedMotion: "reduce",
            });
            page.on("pageerror", (e) => errors.push(e.message));
            await page.goto(base + "/divisi");
            const photos = page.getByRole("button", {
                name: /^Perbesar foto /,
            });
            assert.equal(await photos.count(), 6);
            for (let i = 0; i < 6; i++) {
                const photo = photos.nth(i);
                await photo.scrollIntoViewIfNeeded();
                await photo.locator("img").evaluate((img) => img.decode());
                const rect = await photo.boundingBox();
                assert(rect.width > (width >= 1024 ? 450 : 250));
                if (width === 1440)
                    await photo.screenshot({
                        path: path.join(output, `crop-${i}.png`),
                    });
                await photo.click();
                const dialog = page.getByRole("dialog");
                await dialog.waitFor();
                await dialog.locator("img").evaluate((img) => img.decode());
                assert.equal(
                    await dialog
                        .locator("img")
                        .evaluate((img) => getComputedStyle(img).objectFit),
                    "contain",
                );
                const full = await dialog
                    .getByRole("link", { name: "Buka ukuran asli" })
                    .getAttribute("href");
                assert(full.startsWith("/pngs/members/divisi/"));
                await page.keyboard.press("Tab");
                await page.keyboard.press("Tab");
                assert(
                    await dialog.evaluate((el) =>
                        el.contains(document.activeElement),
                    ),
                );
                await page.keyboard.press("Escape");
                assert(
                    await photo.evaluate((el) => el === document.activeElement),
                );
            }
            assert.equal(
                await page.evaluate(
                    () => document.documentElement.scrollWidth > innerWidth,
                ),
                false,
            );
            const first = page.locator('[data-division-id="BPH"]');
            await first.click();
            assert.equal(
                await page
                    .getByRole("button", { name: /^Lihat profil / })
                    .count(),
                4,
            );
            const banner = page.getByRole("button", {
                name: /^Perbesar foto /,
            });
            await banner.scrollIntoViewIfNeeded();
            await banner.screenshot({
                path: path.join(output, `header-${width}.png`),
            });
            await banner.click();
            await page
                .getByRole("button", { name: "Tutup foto divisi" })
                .click();
            await page
                .getByRole("button", {
                    name: "Kembali ke Seluruh Divisi",
                    exact: true,
                })
                .click();
            await page.waitForFunction(
                () =>
                    document.activeElement?.getAttribute("data-division-id") ===
                    "BPH",
            );
            checks.push({ width, photos: 6, overflow: false });
            await page.close();
        }
        const page = await browser.newPage({
            viewport: { width: 1440, height: 900 },
        });
        for (const id of ["bph", "sukm", "sufak", "sulso", "pr", "sukma"]) {
            await page.goto(base + "/divisi/" + id);
            const banner = page.getByRole("button", {
                name: /^Perbesar foto /,
            });
            await banner.scrollIntoViewIfNeeded();
            await banner.locator("img").evaluate((img) => img.decode());
            await banner.screenshot({
                path: path.join(output, `wide-${id}.png`),
            });
        }
        await page.close();
        assert.deepEqual(errors, []);
        fs.writeFileSync(
            path.join(output, "results.json"),
            JSON.stringify({ checks, errors }, null, 2),
        );
        console.log(
            "PASS: six division photos at five widths; full-photo viewer, keyboard/focus, member navigation and six detail banners.",
        );
    } finally {
        await browser.close();
    }
})().catch((e) => {
    console.error(e);
    process.exit(1);
});
