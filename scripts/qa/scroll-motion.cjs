const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const base = process.env.QA_URL || "http://localhost:3000";
(async () => {
    const browser = await chromium.launch({
        executablePath: process.env.CHROME_PATH,
        headless: true,
    });
    try {
        for (const width of [390, 1440]) {
            const page = await browser.newPage({
                viewport: { width, height: 900 },
            });
            for (const route of [
                "/",
                "/tentang-kami",
                "/divisi",
                "/divisi/bph",
                "/kegiatan",
            ]) {
                await page.goto(base + route);
                await page.waitForTimeout(700);
                assert(
                    !(await page.locator("body").innerText()).includes("//"),
                    route,
                );
                if (route === "/") {
                    assert.equal(
                        await page
                            .locator("[data-hero-decorations]")
                            .getAttribute("data-dismissed"),
                        "false",
                    );
                    if (width === 1440) {
                        fs.mkdirSync("coverage/scroll-motion", {
                            recursive: true,
                        });
                        await page.screenshot({
                            path: "coverage/scroll-motion/hero-initial.png",
                        });
                    }
                }
                if (route === "/" && width === 1440) {
                    await page.evaluate(() => window.scrollTo(0, 100));
                    await page.waitForTimeout(200);
                    assert(
                        await page
                            .locator("[data-hero-decorations] > div")
                            .evaluateAll((elements) =>
                                elements.every(
                                    (el) =>
                                        getComputedStyle(el).visibility ===
                                        "visible",
                                ),
                            ),
                    );
                }
                await page.evaluate(() => window.scrollTo(0, 650));
                await page.waitForTimeout(700);
                assert.equal(
                    await page
                        .locator("[data-nav-visible]")
                        .getAttribute("data-nav-visible"),
                    "false",
                    route,
                );
                if (route === "/" && width === 1440) {
                    const motifs = page.locator(
                        "[data-hero-decorations] > div",
                    );
                    assert.equal(
                        await motifs
                            .first()
                            .evaluate((el) => getComputedStyle(el).visibility),
                        "hidden",
                    );
                    assert.equal(
                        await motifs
                            .last()
                            .evaluate((el) => getComputedStyle(el).visibility),
                        "visible",
                    );
                    await page.evaluate(() =>
                        window.scrollTo(
                            0,
                            document
                                .querySelector("#hero")
                                .getBoundingClientRect().bottom +
                                window.scrollY +
                                1,
                        ),
                    );
                    await page.waitForTimeout(200);
                    assert.equal(
                        await page
                            .locator("[data-hero-decorations]")
                            .getAttribute("data-dismissed"),
                        "true",
                    );
                }
                await page.evaluate(() => window.scrollBy(0, -150));
                await page.waitForTimeout(400);
                assert.equal(
                    await page
                        .locator("[data-nav-visible]")
                        .getAttribute("data-nav-visible"),
                    "true",
                    route,
                );
                assert(
                    (await page.locator("[data-motion-seen]").count()) > 0,
                    route,
                );
                if (route === "/kegiatan") {
                    const filter = page.locator("[data-agenda-filter]");
                    assert.equal(
                        await filter.evaluate(
                            (el) => getComputedStyle(el).position,
                        ),
                        "relative",
                    );
                    await page.evaluate(() => window.scrollTo(0, 1300));
                    await page.waitForTimeout(400);
                    assert(
                        await filter.evaluate(
                            (el) => el.getBoundingClientRect().bottom < 0,
                        ),
                    );
                }
                await page.evaluate(() => window.scrollTo(0, 0));
                await page.waitForTimeout(400);
                if (route === "/" && width === 1440)
                    assert.equal(
                        await page
                            .locator("[data-hero-decorations]")
                            .getAttribute("data-dismissed"),
                        "true",
                    );
                console.log(`PASS ${width} ${route}: navbar, content, scroll`);
            }
            await page.close();
        }
        const page = await browser.newPage({ reducedMotion: "reduce" });
        await page.addInitScript(() => {
            window.motionCalls = 0;
            const original = Element.prototype.animate;
            Element.prototype.animate = function (...args) {
                window.motionCalls++;
                return original.apply(this, args);
            };
        });
        await page.goto(base + "/");
        await page.waitForTimeout(700);
        await page.evaluate(() => window.scrollTo(0, 900));
        await page.waitForTimeout(500);
        assert.equal(await page.evaluate(() => window.motionCalls), 0);
        console.log("PASS reduced motion");
    } finally {
        await browser.close();
    }
})().catch((error) => {
    console.error(error);
    process.exit(1);
});
