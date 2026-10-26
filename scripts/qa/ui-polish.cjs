const { chromium } = require(process.env.PLAYWRIGHT_MODULE || "playwright");
const assert = require("node:assert/strict");
const base = process.env.QA_URL || "http://localhost:3000";
(async () => {
    const browser = await chromium.launch({
        executablePath: process.env.CHROME_PATH,
        headless: true,
    });
    try {
        for (const width of [320, 1440]) {
            const page = await browser.newPage({
                viewport: { width, height: 740 },
            });
            await page.goto(base + "/divisi/sukma");
            await page
                .getByRole("textbox", { name: "Cari pengurus" })
                .fill("Hanna");
            assert.equal(
                await page
                    .getByRole("button", { name: /^Lihat profil / })
                    .count(),
                1,
            );
            await page.goto(base + "/kegiatan");
            const filter = page.getByRole("group", {
                name: "Kategori Kegiatan & Program Kerja",
            });
            assert.equal(
                await page
                    .getByRole("button", { name: /^Buka rincian kegiatan / })
                    .count(),
                6,
            );
            await filter.getByRole("button", { name: /KEGMA/ }).click();
            const query = page.getByRole("textbox", {
                name: "Cari kegiatan atau program kerja",
            });
            await query.fill("zzzz-tidak-ada");
            await page
                .getByRole("heading", { name: "Agenda Tidak Ditemukan" })
                .waitFor();
            await page
                .getByRole("button", { name: "Reset Pencarian & Filter" })
                .click();
            await query.fill("MAXIMA");
            const maxima = page.getByRole("button", {
                name: "Buka rincian kegiatan MAXIMA",
                exact: true,
            });
            await maxima.click();
            const dialog = page.getByRole("dialog");
            await dialog.waitFor();
            for (let n = 0; n < 7; n++) {
                await page.keyboard.press(n % 2 ? "Shift+Tab" : "Tab");
                assert(
                    await dialog.evaluate((el) =>
                        el.contains(document.activeElement),
                    ),
                );
            }
            assert(
                (
                    await dialog
                        .getByRole("link", { name: "Kunjungi Website Resmi" })
                        .getAttribute("href")
                ).startsWith("https://"),
            );
            await page.keyboard.press("Escape");
            assert(
                await maxima.evaluate((el) => el === document.activeElement),
            );
            await maxima.click();
            await page.mouse.click(2, 2);
            assert.equal(await page.getByRole("dialog").count(), 0);
            await page
                .getByRole("button", {
                    name: "Bersihkan pencarian",
                    exact: true,
                })
                .click();
            await filter.getByRole("button", { name: /PROKER/ }).click();
            await query.fill("zzzz-tidak-ada");
            await page
                .getByRole("heading", { name: "Agenda Tidak Ditemukan" })
                .waitFor();
            assert.equal(
                await page.evaluate(
                    () => document.documentElement.scrollWidth > innerWidth,
                ),
                false,
            );
            await page.goto(base + "/");
            await page
                .locator("#kegiatan")
                .getByRole("button", {
                    name: "Kegiatan Mahasiswa",
                    exact: true,
                })
                .click();
            await page
                .locator("#kegiatan")
                .getByRole("heading", {
                    name: "Kegiatan Mahasiswa",
                    exact: true,
                })
                .waitFor();
            await page.close();
        }
        console.log(
            "PASS: roster search, catalog filters/empty results/dialog, external URL, keyboard and homepage categories at 320/1440px.",
        );
    } finally {
        await browser.close();
    }
})().catch((error) => {
    console.error(error);
    process.exit(1);
});
