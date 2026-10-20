const { spawn, execFileSync } = require("node:child_process");
const fs = require("node:fs/promises");
const path = require("node:path");
const root = path.resolve(__dirname, "../..");
const output = path.join(root, "docs/redesign/performance-series");
const after = path.join(root, "docs/redesign/after");
const cli = process.env.LIGHTHOUSE_CLI;
if (!cli)
    throw new Error(
        "Set LIGHTHOUSE_CLI to an existing lighthouse/cli/index.js installation.",
    );

async function main() {
    await fs.mkdir(output, { recursive: true });
    const runs = [];
    for (let i = 1; i <= 3; i++) {
        const prefix = path.join(output, `run-${i}`);
        await new Promise((resolve, reject) => {
            const child = spawn(
                process.execPath,
                [
                    cli,
                    process.env.QA_URL || "http://127.0.0.1:3100/",
                    "--chrome-flags=--headless --no-sandbox",
                    "--output=json",
                    "--output=html",
                    `--output-path=${prefix}`,
                    "--quiet",
                ],
                { stdio: "inherit" },
            );
            child.on("error", reject);
            child.on("exit", (code) =>
                code === 0
                    ? resolve()
                    : reject(new Error(`Lighthouse exited ${code}`)),
            );
        });
        const report = JSON.parse(
            await fs.readFile(`${prefix}.report.json`, "utf8"),
        );
        const run = {
            run: i,
            prefix,
            score: report.categories.performance.score * 100,
            lcp: report.audits["largest-contentful-paint"].numericValue,
            tbt: report.audits["total-blocking-time"].numericValue,
            benchmarkIndex: report.environment.benchmarkIndex,
        };
        runs.push(run);
        console.log(JSON.stringify(run));
    }
    const representative = [...runs].sort((a, b) => a.score - b.score)[1];
    const report = JSON.parse(
        await fs.readFile(`${representative.prefix}.report.json`, "utf8"),
    );
    for (const extension of ["json", "html"])
        await fs.copyFile(
            `${representative.prefix}.report.${extension}`,
            path.join(after, `lighthouse-mobile.report.${extension}`),
        );
    const summary = {
        commit: execFileSync("git", ["rev-parse", "HEAD"], {
            cwd: root,
            encoding: "utf8",
        }).trim(),
        lighthouseVersion: report.lighthouseVersion,
        fetchTime: report.fetchTime,
        settings: report.configSettings,
        environment: report.environment,
        representativeRun: representative.run,
        selection:
            "Middle run when sorted by Performance score; never the best run.",
        runs: runs.map(({ prefix, ...run }) => ({
            ...run,
            report: path.relative(root, `${prefix}.report.json`),
        })),
        scores: Object.fromEntries(
            Object.entries(report.categories).map(([key, category]) => [
                key,
                category.score * 100,
            ]),
        ),
        metrics: Object.fromEntries(
            [
                "first-contentful-paint",
                "largest-contentful-paint",
                "speed-index",
                "total-blocking-time",
                "cumulative-layout-shift",
                "total-byte-weight",
            ].map((key) => [
                key,
                {
                    numericValue: report.audits[key].numericValue,
                    displayValue: report.audits[key].displayValue,
                },
            ]),
        ),
        resources: report.audits["resource-summary"].details.items,
    };
    await fs.writeFile(
        path.join(after, "lighthouse-summary.json"),
        JSON.stringify(summary, null, 2) + "\n",
    );
    console.log(
        `Representative report: run ${representative.run}, Performance ${representative.score}.`,
    );
}
main().catch((error) => {
    console.error(error);
    process.exit(1);
});
