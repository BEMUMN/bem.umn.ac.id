const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const fs = require("fs");
const assert = require("assert/strict");
(async () => {
    const browser = await chromium.launch({
        executablePath: process.env.CHROME_PATH,
        headless: true,
    });
    const results = [];
    const errors = [];
    try {
        for (const width of [320, 390, 768, 1024, 1440]) {
            const page = await browser.newPage({
                viewport: { width, height: 900 },
                reducedMotion: "reduce",
            });
            page.on("pageerror", (e) => errors.push(e.message));
            for (const route of [
                "/",
                "/tentang-kami",
                "/divisi",
                "/kegiatan",
                "/divisi/bph",
            ]) {
                const r = await page.goto(
                    (process.env.QA_URL || "http://127.0.0.1:3101") + route,
                );
                await page.waitForTimeout(350);
                assert.equal(r.status(), 200);
                const overflow = await page.evaluate(
                    () => document.documentElement.scrollWidth > innerWidth,
                );
                assert.equal(overflow, false, `${route} ${width} overflow`);
                results.push({ route, width, overflow });
                if (route === "/" && [390, 1440].includes(width))
                    await page.screenshot({
                        path: `docs/original-polish/home-${width}.png`,
                    });
            }
            if (width === 390) {
                await page.goto(process.env.QA_URL || "http://127.0.0.1:3101/");
                const toggle = page.getByRole("button", {
                    name: "Buka menu navigasi",
                });
                await toggle.click();
                await page
                    .getByRole("button", { name: "Tutup menu navigasi" })
                    .waitFor();
                await page.keyboard.press("Escape");
                assert.equal(
                    await toggle.getAttribute("aria-expanded"),
                    "false",
                );
                assert.equal(
                    await toggle.evaluate((e) => e === document.activeElement),
                    true,
                );
            }
            await page.close();
        }
        assert.deepEqual(errors, []);
        fs.writeFileSync(
            "docs/original-polish/browser-results.json",
            JSON.stringify(
                { results, errors, menuEscapeAndFocus: "passed" },
                null,
                2,
            ),
        );
        console.log(
            "PASS: 25 responsive checks; menu Escape and focus; no browser errors.",
        );
    } finally {
        await browser.close();
    }
})().catch((e) => {
    console.error(e);
    process.exit(1);
});
