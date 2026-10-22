> Historical record: the Lembar Terbuka redesign was superseded at the user’s request. The active UI restores the original design with small refinements; see [current notes](docs/original-polish/README.md). Performance scores below describe the previous redesign, not the restored UI.

# Lembar Terbuka

## Thesis

Filosofi kertas terlipat XVI menjadi susunan lembar editorial yang membuka akses ke kerja dan orang-orang BEM. Tipografi besar, foto asli yang terlihat jelas, dan informasi praktis mendahului uraian kelembagaan. Arah disetujui pengguna; instruksi lanjut sampai akhir mencakup pemilihan kandidat dan rollout tanpa gerbang review tambahan.

## Identitas yang dipertahankan

GEN XVI, Inclusive for Innovation, logo BEM/UMN dan logo kegiatan, empat supergrafik, palet GSM, seluruh data kepengurusan dan program. Newsreader menggantikan Apple Garamond sebagai deviasi tipografi yang disetujui, karena lisensi Apple Garamond tidak terdokumentasi. Bricolage tetap menjadi text face.

## Tokens

Sumber implementasi: `app/globals.css`, bukan warna inline di komponen.

- Paper #EEE5D9, paper light #F6F1E9, paper deep #D2C7B8.
- Ink #0F1E3F, action blue #2F486D, azure #B3C3D1.
- Steel #6D86A0, brown #6C4D38, camel #997953 disediakan untuk identitas resmi.
- Kontras ink/paper 13.18:1, action/paper 7.43:1, white/action 9.26:1.
- Display: Newsreader 400; text: Bricolage Grotesque 400–700. Self-hosted WOFF2 Latin, next/font/local, swap.
- Newsreader uses optical size 48 for display; Bricolage uses optical size 18 for the reading/UI face. Both avoid shipping unused optical variants.
- Hero clamp(3.25rem, 7.4vw, 7.4rem), leading .98, tracking -.045em.
- Section clamp(2.5rem, 5vw, 5rem), leading 1.05, tracking -.03em.
- Title clamp(1.5rem, 2.3vw, 2.5rem), leading 1.15.
- Body clamp(1rem, .95rem + .25vw, 1.125rem), leading 1.6.
- Small clamp(.875rem, .83rem + .2vw, 1rem), leading 1.45.
- Spacing 4/8/12/16/24/32/48/72/112/160 px; fluid section gap 72–144 px.
- Shared frame: fluid gutter, max-width 1440 px. Asymmetry lives inside the frame.
- UI corner radius 4 px, photo corners square, touch target ≥44 px.

## Motion

One signature: a paper plane opens over the hero photograph once, with transform only. Never animates the official logo. Controls use small arrow translations and press feedback; directory photographs have a restrained zoom. Native View Transitions enhance eligible internal navigation; browser support, reduced motion, and Save-Data determine availability. Ordinary links remain the fallback.

Duration tokens: 120 ms press, 220 ms controls, 150 ms route, 640 ms hero, 900 ms photo. Easing cubic-bezier(.22,1,.36,1). No scroll interception or JS-dependent reveal visibility. `prefers-reduced-motion` and Save-Data remove expressive motion. Text remains visible on first paint.

A small head script sets the Save-Data root attribute before first paint. Root hydration warning suppression is limited to that intentional attribute difference. The hero photograph uses native eager decoding without a client-controlled placeholder.

## Asset style lock

Editorial folded-paper compositions derived from the idea of opening a shared page: broad rectangular sheets, deliberate creases and crisp edges, matte uncoated paper with restrained fine grain, navy #0F1E3F and blue #2F486D against linen #EEE5D9, with sparse azure #B3C3D1. Soft directional light from the upper left, shallow physical relief, generous negative space and asymmetric balance. Tactile, youthful and institutional; no lettering, logos, people, glossy surfaces or decorative blobs.

## Composition and component rules

- Hero: live text with offset second line, actual group documentation, small official cabinet logo, one primary link. Generated paper remains decorative and separate from documentary photography.
- Work: dark editorial field with three categories, one selected program, all titles directly selectable, previous/next and swipe. No duplicated DOM track or repeated event photograph.
- Profile preview: statement and mission list, no numbered cards.
- Directory: large group portraits; BPH is the lead, other divisions form a staggered spread. Mobile gets one reading column.
- Values: official motifs explain actual named values. They are not ambient moving watermarks.
- Catalog: meaningful logos, searchable rows and full descriptions; no invented event dates.
- Dialogs: native dialog for focus containment, Escape, restoration, visible close button and scrollable content.
- Missing individual portraits use initials derived from existing names. Original data/files remain untouched; no synthetic faces.
- Footer: address, existing channels, navigation, then a large live-text BEM UMN close. Placeholder channels stay explicit and non-clickable.

## Information order

Home: identity and original documentation → programs and activities → institutional profile → division links → four cabinet values → contact. Programs move ahead of long institutional explanation because they serve recurring student visits. Division detail is one click from the homepage directory; the full roster and activity catalog remain top-level navigation destinations.

Profile uses a dated history spread, a dark vision/mission field, the official logo and GSM palette, values, then division links. Directory uses the original group portraits; catalog uses original event logos with searchable descriptions. News and aspiration destinations remain content TODOs because the existing repo provides neither source nor functioning routes.

## Asset delivery

One image-generated paper composition, real institutional photographs, unchanged official marks, and deterministic paper geometry for 404/social previews. ASSETS.md contains complete prompts, source/license records, file dimensions and sizes. Images use AVIF/WebP with local LQIP; social images are generated PNGs outside the page's critical render path.

Small navigation and cabinet marks use proportionate lossless raster derivatives of the original SVGs. Large original files remain available and are retained in the institutional profile/footer where relevant. Hero links do not prefetch destination pages, leaving the initial mobile connection available for visible content.

## Updating content

Member records live in constants/divisionMembers.ts, divisions in constants/divisionIndex.ts, activities/programs in constants/workIndex.ts and contact channels in constants/contactIndex.ts. Institutional narrative stays in TentangKamiContent and AboutPreview. Replace source group photographs at their existing paths, then run scripts/assets/optimize.cjs. Update metadata/social previews with scripts/assets/generate.cjs. No animation logic needs editing for a new member or program.

## Do / don't

Use original photos, real data, semantically named sections, predictable links, visible focus, explicit dimensions, and lazy loading below the fold. Keep content in existing constants and JSX; adding content must not require changing animation logic.

Do not distort/recolor/crop official logos, invent people or channels, use the same photo as evidence for unrelated events, add decorative glass/gradients/shadows, block text selection, or hide information behind a scroll sequence.

## References

- Siena Film Foundation: a material idea organizes the interface, with a dominant real image. https://www.awwwards.com/sites/siena-film-foundation
- Typography Principles: decisive type scale and asymmetric composition. https://www.awwwards.com/sites/typography-principles

Principles only; no reference assets or layout copies. User brief overrides attached taste-skill where necessary. The supplied skill's inspection scripts were absent; real-browser inspection is recorded in docs/redesign.
