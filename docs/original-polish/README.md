# Original design, refined

The user preferred the original design and requested restoration with modest polish. App, components, and layouts were restored from 3227a0d in commit dd9b72f. The rejected redesign remains on feature/lembar-terbuka-redesign. Original fonts, colors, capsule navigation, centered cabinet logo, section order, photos and content are retained.

Refinements:
- Register the missing navy-dark Tailwind color so existing backgrounds and button text render as intended.
- Use a stable mobile viewport height, balance headings, and tighten mobile section spacing.
- Keep scroll reveals visible after their first entrance; preserve native touch scrolling and respect reduced motion.
- Add active navigation, visible keyboard focus, 44px mobile menu targets, Escape with focus restoration, and outside-click closing.
- Allow text selection and wrap catalog filters on narrow screens.

Validation: production build and lint pass. Browser checks cover five routes (home, profile, directory, catalog, BPH detail) at 320, 390, 768, 1024 and 1440px; mobile menu Escape and focus restoration are exercised. Screenshots and machine results sit alongside this file. No Lighthouse score is claimed for this restored design; the previous redesign’s reports do not describe it. Remaining routes and original data were restored without content edits.

Run locally: `npm run dev`, then open http://localhost:3000. No new dependencies or deployment.
