const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const base = process.env.QA_URL || "http://127.0.0.1:3100";
const output = path.resolve(__dirname, "../../docs/redesign/after");
const routes = [
    "/",
    "/tentang-kami",
    "/divisi",
    "/kegiatan",
    ...["bph", "sukm", "sufak", "sulso", "pr", "sukma"].map(
        (id) => `/divisi/${id}`,
    ),
];
const findings = {
    matrix: [],
    accessibility: [],
    interactions: [],
    errors: [],
};
const scrollPage = (page) =>
    page.evaluate(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += 600) {
            scrollTo(0, y);
            await new Promise((resolve) => setTimeout(resolve, 45));
        }
        await Promise.all(
            [...document.images]
                .filter((image) => image.currentSrc)
                .map((image) => image.decode().catch(() => {})),
        );
        scrollTo(0, 0);
    });

async function main() {
    await fs.mkdir(output, { recursive: true });
    if (process.env.QA_INTERACTIONS_ONLY) {
        Object.assign(
            findings,
            JSON.parse(
                await fs.readFile(
                    path.join(output, "browser-results.json"),
                    "utf8",
                ),
            ),
        );
        findings.interactions = [];
    }
    const browser = await chromium.launch({
        headless: true,
        executablePath: process.env.CHROME_PATH,
    });
    try {
        for (const width of process.env.QA_INTERACTIONS_ONLY
            ? []
            : [390, 768, 1024, 1440, 1920]) {
            const page = await browser.newPage({
                viewport: { width, height: width === 390 ? 844 : 1000 },
            });
            page.on("pageerror", (error) =>
                findings.errors.push(String(error)),
            );
            page.on("response", (response) => {
                if (response.status() >= 400)
                    findings.errors.push(
                        `${response.status()} ${response.url()}`,
                    );
            });
            for (const route of routes) {
                const response = await page.goto(base + route, {
                    waitUntil: "networkidle",
                });
                assert.equal(response.status(), 200, route);
                await page.evaluate(() =>
                    document.fonts.ready.then(() => true),
                );
                await scrollPage(page);
                const result = await page.evaluate(() => ({
                    overflow: document.documentElement.scrollWidth > innerWidth,
                    headings: [...document.querySelectorAll("main h1")].map(
                        (node) => node.textContent,
                    ),
                    brokenImages: [...document.images]
                        .filter(
                            (image) => image.currentSrc && !image.naturalWidth,
                        )
                        .map((image) => image.currentSrc),
                    title: document.title,
                    description: document.querySelector(
                        'meta[name="description"]',
                    )?.content,
                    social: document.querySelector('meta[property="og:image"]')
                        ?.content,
                    smallTargets: [
                        ...document.querySelectorAll("a,button,input,summary"),
                    ]
                        .filter((node) => {
                            const rect = node.getBoundingClientRect();
                            return (
                                rect.width &&
                                rect.height &&
                                (rect.height < 44 || rect.width < 44)
                            );
                        })
                        .map((node) => ({
                            text: node.textContent.trim(),
                            width: node.getBoundingClientRect().width,
                            height: node.getBoundingClientRect().height,
                        })),
                }));
                assert.equal(
                    result.overflow,
                    false,
                    `${route} overflow at ${width}`,
                );
                assert.equal(result.headings.length, 1, `${route} single h1`);
                assert.equal(result.brokenImages.length, 0, `${route} images`);
                assert.equal(
                    result.smallTargets.length,
                    0,
                    `${route} minimum 44px targets at ${width}`,
                );
                assert.ok(
                    result.title && result.description && result.social,
                    `${route} metadata`,
                );
                findings.matrix.push({ route, width, ...result });
                if (route === "/" || [390, 768, 1440].includes(width)) {
                    const name =
                        route === "/"
                            ? "home"
                            : route.slice(1).replaceAll("/", "-");
                    await page.screenshot({
                        path: path.join(output, `${name}-${width}-full.png`),
                        fullPage: true,
                    });
                    if (route === "/")
                        await page.screenshot({
                            path: path.join(output, `${name}-${width}.png`),
                        });
                }
                if (width === 390 && process.env.AXE_PATH) {
                    await page.addScriptTag({ path: process.env.AXE_PATH });
                    const audit = await page.evaluate(async () =>
                        window.axe.run(document, {
                            runOnly: {
                                type: "tag",
                                values: ["wcag2a", "wcag2aa", "wcag21aa"],
                            },
                        }),
                    );
                    findings.accessibility.push({
                        route,
                        violations: audit.violations.map((v) => ({
                            id: v.id,
                            impact: v.impact,
                            nodes: v.nodes.map((n) => ({
                                target: n.target,
                                summary: n.failureSummary,
                            })),
                        })),
                    });
                }
            }
            await page.close();
            console.log(`Responsive matrix passed: ${width}px.`);
        }
        const page = await browser.newPage({
            viewport: { width: 390, height: 844 },
            reducedMotion: "reduce",
            hasTouch: true,
        });
        await page.goto(base, { waitUntil: "networkidle" });
        await page.keyboard.press("Tab");
        assert.match(
            await page.locator(":focus").textContent(),
            /Langsung ke konten/,
        );
        await page.keyboard.press("Enter");
        assert.equal(
            await page
                .locator("main")
                .evaluate((node) => document.activeElement === node),
            true,
        );
        const toggle = page.getByRole("button", { name: "Buka menu navigasi" });
        await toggle.click();
        await page
            .getByRole("navigation", { name: "Navigasi seluler" })
            .waitFor();
        await page.keyboard.press("Escape");
        assert.equal(await toggle.getAttribute("aria-expanded"), "false");
        assert.equal(
            await toggle.evaluate((node) => node === document.activeElement),
            true,
        );
        const oldProgram = await page.locator(".program-name").textContent();
        await page
            .getByRole("button", { name: "Item kegiatan berikutnya" })
            .click();
        assert.notEqual(
            await page.locator(".program-name").textContent(),
            oldProgram,
        );
        await page
            .getByRole("button", { name: "Item kegiatan sebelumnya" })
            .click();
        assert.equal(
            await page.locator(".program-name").textContent(),
            oldProgram,
        );
        await page.locator(".program-window").evaluate((node) => {
            const start = new Touch({
                identifier: 1,
                target: node,
                clientX: 300,
                clientY: 100,
            });
            const end = new Touch({
                identifier: 1,
                target: node,
                clientX: 100,
                clientY: 100,
            });
            node.dispatchEvent(
                new TouchEvent("touchstart", {
                    bubbles: true,
                    touches: [start],
                }),
            );
            node.dispatchEvent(
                new TouchEvent("touchend", {
                    bubbles: true,
                    changedTouches: [end],
                }),
            );
        });
        assert.notEqual(
            await page.locator(".program-name").textContent(),
            oldProgram,
        );
        await page.getByRole("tab").first().focus();
        await page.keyboard.press("ArrowRight");
        assert.equal(
            await page.getByRole("tab").nth(1).getAttribute("aria-selected"),
            "true",
        );
        assert.equal(
            await page
                .locator(".hero-photo")
                .evaluate(
                    (node) => getComputedStyle(node, "::after").animationName,
                ),
            "none",
        );
        await page.addStyleTag({
            content:
                ".hero-fold, .value-entry img { visibility: hidden !important; }",
        });
        await page.evaluate(() => scrollTo(0, 0));
        await page.screenshot({
            path: path.join(
                output,
                "home-390-no-decoration-reduced-motion.png",
            ),
        });
        findings.interactions.push(
            "Skip link; mobile menu Escape/focus; carousel next/previous/swipe; keyboard tabs; reduced motion; decorative assets removed.",
        );

        await page.goto(`${base}/divisi`, { waitUntil: "networkidle" });
        await page
            .getByRole("button", {
                name: "Buka direktori Badan Pengurus Harian",
                exact: true,
            })
            .click();
        await page.getByRole("searchbox").fill("Josephin");
        assert.equal(await page.locator(".member-card").count(), 1);
        const opener = page.getByRole("button", {
            name: "Lihat profil Josephin Narumi S.",
        });
        await opener.click();
        for (let i = 0; i < 10; i++) {
            await page.keyboard.press(i % 2 ? "Shift+Tab" : "Tab");
            assert.equal(
                await page.evaluate(
                    () => !!document.activeElement.closest("dialog"),
                ),
                true,
            );
        }
        await page.keyboard.press("Escape");
        assert.equal(
            await opener.evaluate((node) => node === document.activeElement),
            true,
        );
        await page.getByRole("searchbox").fill("impossible-query");
        assert.equal(await page.locator(".member-card").count(), 0);
        await page.getByRole("button", { name: "Reset pencarian" }).click();
        assert.equal(await page.locator(".member-card").count(), 4);
        await page
            .getByRole("button", { name: "Kembali ke seluruh divisi" })
            .click();
        assert.equal(
            await page.locator(":focus").getAttribute("data-division"),
            "BPH",
        );
        findings.interactions.push(
            "Member search/empty/reset; modal Tab/Shift+Tab/Escape/focus restoration; division return focus.",
        );

        await page.goto(`${base}/kegiatan`, { waitUntil: "networkidle" });
        assert.equal(await page.locator(".kegma-row").count(), 6);
        assert.equal(await page.locator(".proker-entry").count(), 6);
        await page.getByRole("searchbox").fill("maxima");
        await page
            .getByRole("button", {
                name: "Buka rincian kegiatan MAXIMA",
                exact: true,
            })
            .click();
        assert.equal(
            await page
                .getByRole("link", { name: "Kunjungi website resmi" })
                .getAttribute("href"),
            "https://maxima.umn.ac.id/",
        );
        await page.screenshot({
            path: path.join(output, "kegiatan-modal-390.png"),
        });
        await page.mouse.click(1, 1);
        assert.equal(await page.getByRole("dialog").isVisible(), false);
        await page.getByRole("searchbox").fill("impossible-query");
        await page.getByRole("button", { name: "Reset pencarian" }).click();
        await page.getByRole("tab").first().focus();
        await page.keyboard.press("End");
        assert.equal(
            await page
                .getByRole("tab", { name: "Program kerja (6)" })
                .getAttribute("aria-selected"),
            "true",
        );
        await page.locator("summary").first().click();
        assert.equal(await page.locator("details[open]").count(), 1);
        await page.goto(`${base}/kegiatan#kegma-section`, {
            waitUntil: "networkidle",
        });
        assert.equal(
            await page
                .getByRole("tab", { name: "KEGMA (6)" })
                .getAttribute("aria-selected"),
            "true",
        );
        findings.interactions.push(
            "Catalog search/reset; tabs/keyboard; program disclosure; dialog outside click; official URL; category deep-link.",
        );
        for (const id of ["BPH", "SUKM", "SUFAK", "SULSO", "PR", "SUKMA"]) {
            await page.goto(`${base}/members/${id}`, {
                waitUntil: "networkidle",
            });
            assert.equal(
                new URL(page.url()).pathname,
                `/divisi/${id.toLowerCase()}`,
            );
        }
        for (const route of ["/halaman-tidak-ada", "/divisi/tidak-ada"]) {
            const response = await page.goto(base + route, {
                waitUntil: "networkidle",
            });
            assert.equal(response.status(), 404);
            assert.match(
                await page.locator("h1").textContent(),
                /Halaman belum ditemukan/,
            );
        }
        await page.screenshot({
            path: path.join(output, "404-390.png"),
            fullPage: true,
        });
        findings.interactions.push(
            "All six legacy redirects; unknown route and unknown division return HTTP 404.",
        );
        await page.close();

        const normal = await browser.newPage({
            viewport: { width: 1440, height: 1000 },
        });
        await normal.addInitScript(() => {
            window.transitionCalls = 0;
            const start = document.startViewTransition?.bind(document);
            if (start)
                document.startViewTransition = (callback) => {
                    window.transitionCalls++;
                    return start(callback);
                };
        });
        await normal.goto(base, { waitUntil: "networkidle" });
        await normal
            .locator(".desktop-nav")
            .getByRole("link", { name: "Divisi", exact: true })
            .click();
        await normal.waitForURL("**/divisi");
        assert.equal(await normal.evaluate(() => window.transitionCalls), 1);
        assert.equal(
            await normal
                .locator("main")
                .evaluate((node) => document.activeElement === node),
            true,
        );
        await normal.close();
        const saveData = await browser.newPage({
            viewport: { width: 390, height: 844 },
        });
        await saveData.addInitScript(() =>
            Object.defineProperty(navigator, "connection", {
                value: { saveData: true },
                configurable: true,
            }),
        );
        await saveData.goto(base, { waitUntil: "networkidle" });
        assert.equal(
            await saveData.locator("html").getAttribute("data-save-data"),
            "",
        );
        assert.equal(
            await saveData
                .locator(".hero-photo")
                .evaluate(
                    (node) => getComputedStyle(node, "::after").animationName,
                ),
            "none",
        );
        await saveData.close();
        findings.interactions.push(
            "Native View Transition and destination focus; Save-Data motion disabled.",
        );
        assert.equal(
            findings.errors.length,
            0,
            "No browser or resource errors",
        );
        const violations = findings.accessibility.flatMap((a) => a.violations);
        assert.equal(violations.length, 0, JSON.stringify(violations, null, 2));
        console.log("All route and interaction checks passed.");
    } finally {
        await fs.writeFile(
            path.join(output, "browser-results.json"),
            JSON.stringify(findings, null, 2) + "\n",
        );
        await browser.close();
    }
}
main().catch((error) => {
    console.error(error);
    process.exit(1);
});
