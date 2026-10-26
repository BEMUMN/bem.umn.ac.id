const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const base = process.env.QA_URL || "http://localhost:3000";
const output = process.env.QA_OUTPUT || "coverage/scroll-motion";

// Walks down in wheel-sized steps so the scroll engine sees every act.
async function scrollTo(page, end) {
    const max = await page.evaluate(
        () => document.documentElement.scrollHeight - innerHeight,
    );
    end = Math.min(end ?? max, max);
    const from = await page.evaluate(() => scrollY);
    for (let y = from; y <= end; y += 160) {
        await page.evaluate(
            (y) => window.scrollTo({ top: y, behavior: "instant" }),
            y,
        );
        await page.waitForTimeout(12);
    }
    await page.evaluate(
        (y) => window.scrollTo({ top: y, behavior: "instant" }),
        end,
    );
}

(async () => {
    fs.mkdirSync(output, { recursive: true });
    const browser = await chromium.launch({
        executablePath: process.env.CHROME_PATH,
        headless: true,
    });
    const errors = [];
    try {
        for (const width of [390, 1440]) {
            const page = await browser.newPage({
                viewport: { width, height: 900 },
            });
            page.on("pageerror", (e) => errors.push(e.message));
            for (const route of [
                "/",
                "/tentang-kami",
                "/divisi/bph",
                "/kegiatan",
            ]) {
                await page.goto(base + route);
                await page.waitForTimeout(route === "/" ? 1600 : 700);
                // The compact navbar stays put while reading.
                await page.evaluate(() => window.scrollTo(0, 650));
                await page.waitForTimeout(400);
                assert.equal(
                    await page
                        .locator("[data-nav-visible]")
                        .getAttribute("data-nav-visible"),
                    "true",
                    route,
                );
                assert(
                    (await page.locator("[data-motion-seen], .sc-in, html.sc-ready").count()) >
                        0,
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
                console.log(`PASS ${width} ${route}: navbar, content`);
            }

            // Home: the cover under the last fold is a preview, out of the tab
            // order; the footer copy is not a second set of tab stops.
            await page.goto(base + "/");
            await page.waitForTimeout(1600);
            const turn = page.locator(
                'section[aria-label="Kembali ke sampul"]',
            );
            assert.equal(
                await turn
                    .locator(".peel__under")
                    .first()
                    .getAttribute("inert"),
                "",
            );
            assert(
                await turn
                    .locator(".peel__sheet a")
                    .evaluateAll(
                        (links) =>
                            links.length > 0 &&
                            links.every((a) => a.tabIndex === -1),
                    ),
            );
            if (width === 1440) {
                // The Nilai gutter fills as the reader scrolls through it.
                await page.locator("#nilai").scrollIntoViewIfNeeded();
                for (let i = 0; i < 10; i++) {
                    await page.mouse.wheel(0, 120);
                    await page.waitForTimeout(40);
                }
                await page.waitForTimeout(600);
                const fill = await page
                    .locator(".thread__fill")
                    .evaluate(
                        (el) => new DOMMatrix(getComputedStyle(el).transform).d,
                    );
                assert(fill > 0.05 && fill <= 1, `thread fill ${fill}`);
                await page.screenshot({ path: `${output}/nilai-thread.png` });
            }
            // Reaching the end folds the footer away and lands on the cover.
            await page.evaluate(() => window.scrollTo(0, 0));
            await scrollTo(page);
            await page.waitForFunction(() => scrollY === 0, null, {
                timeout: 3000,
            });
            await page.waitForTimeout(300);
            assert.equal(new URL(page.url()).pathname, "/");
            await page.screenshot({ path: `${output}/loop-${width}.png` });
            console.log(`PASS ${width} /: end loops back to the cover`);

            // Division detail: the footer can be read before the turn starts.
            await page.goto(base + "/divisi/bph");
            await page.waitForTimeout(800);
            const footerTop = await page
                .locator("footer")
                .first()
                .evaluate((el) => el.getBoundingClientRect().top + scrollY);
            await scrollTo(page, footerTop);
            await page.waitForTimeout(900);
            assert.equal(new URL(page.url()).pathname, "/divisi/bph");
            assert(await page.locator("footer").first().isVisible());
            await scrollTo(page);
            await page.waitForURL("**/divisi/sukm", { timeout: 4000 });
            console.log(
                `PASS ${width} /divisi/bph: footer, then next division`,
            );
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
        assert.equal(await page.locator(".thread__drop").count(), 0);
        console.log("PASS reduced motion");
        assert.deepEqual(errors, []);
    } finally {
        await browser.close();
    }
})().catch((error) => {
    console.error(error);
    process.exit(1);
});
