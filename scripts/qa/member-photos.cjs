const fs = require("node:fs");
const path = require("node:path");
const assert = require("node:assert/strict");
const ts = require("typescript");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const source = fs.readFileSync("constants/divisionMembers.ts", "utf8");
const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;
const data = { exports: {} };
new Function("exports", compiled)(data.exports);
const { divisionMembers } = data.exports;
const base = process.env.QA_URL || "http://localhost:3000";
const output = process.env.QA_OUTPUT || "coverage/member-photos";
fs.mkdirSync(output, { recursive: true });
(async () => {
    const all = Object.values(divisionMembers).flat();
    assert.equal(all.length, 22);
    assert.equal(all.filter((m) => m.imageUrl).length, 21);
    assert.deepEqual(
        all.filter((m) => !m.imageUrl).map((m) => m.name),
        ["Josyca Nauli P."],
    );
    const images = all.flatMap((m) => m.photos || []);
    assert.equal(new Set(images).size, 41);
    for (const [division, members] of Object.entries(divisionMembers)) {
        for (const m of members) {
            if (!m.imageUrl) continue;
            assert.equal(m.imageUrl, m.photos[0]);
            for (const url of m.photos) {
                assert(url.includes(`/${division.toLowerCase()}/`));
                assert(fs.existsSync(`public${url}`));
            }
        }
    }
    const browser = await chromium.launch({
        executablePath: process.env.CHROME_PATH,
        headless: true,
    });
    const errors = [],
        checks = [];
    try {
        for (const width of [390, 1440]) {
            const page = await browser.newPage({
                viewport: { width, height: 900 },
                reducedMotion: "reduce",
            });
            page.on("pageerror", (e) => errors.push(e.message));
            for (const [division, members] of Object.entries(divisionMembers)) {
                const response = await page.goto(
                    `${base}/divisi/${division.toLowerCase()}`,
                );
                assert.equal(response.status(), 200);
                const cards = page.getByRole("button", {
                    name: /^Lihat profil /,
                });
                assert.equal(await cards.count(), members.length);
                for (const m of members) {
                    const card = page.getByRole("button", {
                        name: `Lihat profil ${m.name}`,
                        exact: true,
                    });
                    await card.scrollIntoViewIfNeeded();
                    if (m.imageUrl) {
                        const img = card.locator("img");
                        await img.evaluate((el) => el.decode());
                        assert(await img.evaluate((el) => el.naturalWidth > 0));
                    }
                    await card.click();
                    const dialog = page.getByRole("dialog");
                    await dialog.waitFor();
                    for (let tab = 0; tab < 5; tab++) {
                        await page.keyboard.press("Tab");
                        assert(
                            await dialog.evaluate((el) =>
                                el.contains(document.activeElement),
                            ),
                        );
                    }

                    assert.equal(
                        await dialog
                            .locator("#modal-member-name")
                            .textContent(),
                        m.name,
                    );
                    if (m.photos?.length > 1) {
                        await dialog
                            .getByRole("button", {
                                name: `Lihat foto 2 ${m.name}`,
                                exact: true,
                            })
                            .click();
                        const photo = dialog.getByAltText(
                            `Potret ${m.name}, foto 2`,
                        );
                        await photo.evaluate((el) => el.decode());
                        assert(
                            (await photo.getAttribute("src")).includes(
                                encodeURIComponent(m.photos[1]),
                            ),
                        );
                    }
                    if (division === "BPH" && m === members[0])
                        await page.screenshot({
                            path: path.join(output, `profile-${width}.png`),
                        });
                    await page.keyboard.press("Escape");
                    assert.equal(await page.getByRole("dialog").count(), 0);
                    assert(
                        await card.evaluate(
                            (el) => el === document.activeElement,
                        ),
                    );
                }
                assert.equal(
                    await page.evaluate(
                        () => document.documentElement.scrollWidth > innerWidth,
                    ),
                    false,
                );
                if (division === "BPH") {
                    await cards.first().scrollIntoViewIfNeeded();
                    await page.screenshot({
                        path: path.join(output, `members-${width}.png`),
                    });
                }
                checks.push({ division, width, members: members.length });
            }
            await page.close();
        }
        assert.deepEqual(errors, []);
        fs.writeFileSync(
            path.join(output, "results.json"),
            JSON.stringify(
                { checks, errors, members: all.length, photos: images.length },
                null,
                2,
            ),
        );
        console.log(
            "PASS: 22 members, 41 photos, 6 divisions × 2 widths; image loading, alternate photos, Escape/focus, no overflow or browser errors.",
        );
    } finally {
        await browser.close();
    }
})().catch((error) => {
    console.error(error);
    process.exit(1);
});
