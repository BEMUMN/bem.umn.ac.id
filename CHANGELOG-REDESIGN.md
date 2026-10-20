# Redesign changelog

## Scope

Branch: feature/lembar-terbuka-redesign, derived from the user's active branch at 3227a0d. No push or deployment. User approved the thesis and authorized completion without additional design gates.

## Baseline

Audit, screenshots, Lighthouse report and source inventory: docs/redesign/before/. Production mobile baseline: Performance 75, Accessibility 96, LCP 11.7 s, CLS 0, TBT 35 ms, transfer 2,237 KiB. npm lint passed; direct lint including layouts found 10 inherited warnings.

## Foundation and vertical slice

- Newsreader + Bricolage local OFL fonts, shared semantic tokens, paper/ink palette.
- Reworked navigation/footer, visible keyboard focus, skip link, touch targets and reduced-motion/Save-Data handling.
- One generated paper artwork selected from three candidates; original hero documentation retained.
- Homepage server-rendered shell; removed homepage Lenis/GSAP orchestration and duplicate carousel DOM while retaining selection, previous/next and touch navigation.
- Optimized original photos and activity logos into local derivatives; no source file or data schema overwritten.
- No new dependencies. Asset tooling uses sharp already installed through the locked Next.js dependency tree. Native CSS, View Transitions and dialog avoid a new animation/modal library.

## TODO: konfirmasi konten

- Actual individual portraits: existing data points to a meme test image. UI uses neutral initials; source remains intact.
- Official email/LINE/WhatsApp, TikTok/Facebook and an aspiration destination. Existing placeholders remain; no fabricated links or form backend.
- News/announcements source and whether adding those routes is in scope. No new news/aspiration routes are introduced.
- Period 2026 vs 2026/2027, OMB vs UMN NEXT, name spelling discrepancies between reference document and active constants. Active data remains authoritative for rendering.
- Existing homepage descriptions of supergraphic shapes differ from GSM; wording retained pending confirmation.

## Asset budget note

New raster derivatives are below 150 KB each. Official legacy SVGs are preserved byte-for-byte, including variants above the proposed 15 KB/file budget; preserving exact institutional artwork takes precedence over destructive optimization. Initial transfer is measured separately in final QA. Full-resolution generated masters are ignored in assets-source/, with production files and candidate previews tracked.
