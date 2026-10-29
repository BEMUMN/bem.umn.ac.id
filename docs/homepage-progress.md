# Homepage BEM UMN Gen XVI: progress and known issues

Date: 2026-10-29

Status: WIP. This branch records the current implementation for continued review. It is not ready for production release.

## Changes included

- Compose the homepage as Hero, BEM Introduction, Kegiatan Highlight, and the existing shared Footer.
- Keep the navy brand palette, local typography, paper material, supergraphics, and the existing one-time typing animation.
- Adapt the geometric paper peel from the Vassel snapshot's `components/Peel.tsx` and `lib/peel.ts`. Separate the hero sheet, SVG flap, and cast shadow; drive geometry using the installed ScrollTrigger.
- Add a homepage narrative animation boundary with scoped cleanup and a static reduced-motion fallback.
- Present a short BEM introduction with the Gen XVI group photograph, rounded image corners, subtle corner lines, and a CTA to `/tentang-kami`.
- Present six existing Kegma logos around the central `/kegiatan` CTA, with center-to-outward motion and subtle drift. Reset transforms before measuring logo origins on refresh.
- Add optional homepage-specific navigation visibility after the hero.
- Include the group photograph and light Gen XVI wordmark used by the homepage.

## Open issues reported by the project owner

These issues remain open. The screenshot supplied in the conversation is visual evidence from the owner's browser; the exact root causes have not yet been confirmed through a reproducible browser test.

| ID | Priority | Issue | Area to investigate | Completion criteria |
| --- | --- | --- | --- | --- |
| HOME-01 | P1 | The paper-fold opening completes, but its handoff to the following section is not smooth. | `layouts/home-page/HomeNarrative.tsx`, `layouts/home-page/homePeel.ts`, and hero/intro positioning in `app/homepage.css`. | Forward and reverse scrolling reveal the actual introduction continuously, with no jump, blank gap, or broken clipping. |
| HOME-02 | P2 | The BEM introduction's image and information layout is accepted in principle but needs visual polish. | `layouts/home-page/AboutPreview.tsx` and introduction/photo/CTA styles in `app/homepage.css`. | Spacing, typography, image treatment, and button states are balanced at mobile, tablet, and desktop sizes. |
| HOME-03 | P2 | Kegiatan Mahasiswa motion needs further polish. | `layouts/home-page/Work.tsx` and Kegma styles in `app/homepage.css`. | All six logos visibly spread from the center, settle without overlap, and retain calm motion while the heading and CTA remain readable. |
| HOME-04 | P1 | Homepage content and footer appear cut off, with an unintended light band between Kegiatan and the footer in the supplied screenshot. | Section heights, overflow, stacking contexts, negative margins in `app/homepage.css`, and shared footer spacing in `layouts/Footer.tsx`. These are investigation targets, not confirmed causes. | The complete content and footer remain reachable and visible, without clipping or unintended gaps, across viewport sizes and scroll positions. |

## Verification and next review

Type checking and linting are recorded in the commit message after execution. Passing code checks do not close the visual issues above.

Before these issues can be closed, review scroll forward/reverse, resize during the fold, restored scroll position, keyboard focus, and reduced motion. Check 375 x 812, 390 x 844, 768 x 1024, 1366 x 768, 1920 x 1080, and 2560 x 1440.

No footer redesign or routing change is part of this checkpoint. Other uncommitted Divisi/member work and local instruction files are outside this commit's scope.
