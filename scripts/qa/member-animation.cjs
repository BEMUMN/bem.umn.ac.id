const assert = require("node:assert/strict");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
(async () => {
    const browser = await chromium.launch({
        executablePath: process.env.CHROME_PATH,
        headless: true,
    });
    try {
        const page = await browser.newPage({
            viewport: { width: 1440, height: 1000 },
        });
        await page.goto(
            `${process.env.QA_URL || "http://localhost:3000"}/divisi/bph`,
        );
        await page
            .getByRole("button", { name: "Jeda pergantian foto" })
            .scrollIntoViewIfNeeded();
        const states = () =>
            page
                .locator("[data-gesture-visible]")
                .evaluateAll((nodes) =>
                    nodes.map((n) => n.dataset.gestureVisible),
                );
        assert.deepEqual(await states(), ["false", "false", "false", "false"]);
        await page.waitForFunction(() =>
            [...document.querySelectorAll("[data-gesture-visible]")].every(
                (n) => n.dataset.gestureVisible === "true",
            ),
        );
        assert.deepEqual(await states(), ["true", "true", "true", "true"]);
        await page
            .getByRole("button", { name: "Jeda pergantian foto" })
            .click();
        await page.waitForTimeout(5600);
        assert.deepEqual(await states(), ["true", "true", "true", "true"]);
        await page.screenshot({
            path: "coverage/gesture-portraits/animation-gesture.png",
        });
        await page
            .getByRole("button", { name: "Putar pergantian foto" })
            .click();
        await page.waitForFunction(() =>
            [...document.querySelectorAll("[data-gesture-visible]")].every(
                (n) => n.dataset.gestureVisible === "false",
            ),
        );
        await page
            .getByRole("button", {
                name: "Lihat profil Josephin Narumi Setiawan",
                exact: true,
            })
            .click();
        await page.waitForTimeout(5600);
        assert.deepEqual(await states(), ["false", "false", "false", "false"]);
        await page.keyboard.press("Escape");
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.waitForTimeout(5600);
        assert.deepEqual(await states(), ["false", "false", "false", "false"]);
        console.log(
            "PASS: ordinary → gesture → ordinary synchronized; pause, dialog pause, reduced motion.",
        );
    } finally {
        await browser.close();
    }
})().catch((e) => {
    console.error(e);
    process.exit(1);
});
