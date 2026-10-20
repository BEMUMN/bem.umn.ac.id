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
- Existing profile counts (10 Himpunan, 25+ Ormawa), institutional/legal wording, and historical date remain as supplied; redesign does not validate those institutional claims.
- New short navigation/status labels and 404 copy are editorial UI proposals; institutional review can adjust them without changing interaction logic.

## Full rollout and polish

- Profile now renders its history, vision/mission, logo philosophy, GSM palette and divisions on the server.
- Six real division photographs anchor the directory. Original member records, search, roster selection, profile dialogs and individual division URLs remain available.
- Activity catalog retains all six KEGMA, six programs, official outbound URLs, categories and full descriptions. Search, reset, keyboard tabs, native disclosure and deep-link anchors work together.
- Shared native dialog handles Escape, Tab/Shift+Tab, backdrop dismissal, body scroll lock and focus restoration. Returning from a roster restores focus to its division.
- Original legacy member redirects and unknown-division 404 behavior remain. Added a custom 404, ten local OG images and icons derived from the unchanged official logo.
- AVIF/WebP picture sources, real-width srcset descriptors, LQIP, explicit dimensions, image priority and lazy loading. Asset provenance, prompts, reproduction and exact sizes are in ASSETS.md.
- Removed three unreferenced legacy UI modules (Gallery, Member, MemberSwiper), including the gallery pointing to absent JPGs. Original data and source assets remain; installed libraries and lockfile remain unchanged.
- Formatted edited source using the existing Prettier configuration. Full lint explicitly includes layouts, clearing all ten inherited warnings.
- Performance follow-up: Newsreader reduced from 131,848 to 57,268 bytes by retaining only the used weight and optical-size axis. Native picture/img renders pre-encoded photographs before hydration; LQIP is reserved for noncritical images. Save-Data is applied in the document head before the first paint.
- Critical transfer follow-up: Bricolage reduced from 76,868 to 41,456 bytes with optical size 18 and variable weights 400–700. Small header/cabinet logos use lossless derivatives of unchanged official SVGs (8,124 and 11,864 bytes). Hero navigation no longer prefetches other pages during the initial load.

## Validation

See docs/redesign/QA.md for the final responsive matrix, interaction checks, accessibility audit, asset tests, before/after screenshots and Lighthouse comparison. Reports distinguish local lab results from field performance; INP requires real user observations.

## Asset budget note

New raster derivatives are below 150 KB each. Official legacy SVGs are preserved byte-for-byte, including variants above the proposed 15 KB/file budget; preserving exact institutional artwork takes precedence over destructive optimization. Initial transfer is measured separately in final QA. Full-resolution generated masters are ignored in assets-source/, with production files and candidate previews tracked.
