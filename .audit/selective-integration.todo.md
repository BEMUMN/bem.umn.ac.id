# Selective B to A integration

- [x] 1. Ground.
  - The user narrowed the integration to `/divisi` and `/divisi/[id]`. The existing `DivisionKey` roster remains the domain boundary.
- [x] 2. Sketch.
  - Candidate A ports Project B wholesale. Rejected because the user wants the other pages to remain on Project A.
  - Candidate B imports only the Divisi list, detail, roster, dialog, data, and portrait assets. Selected.
- [x] 3. Agree.
  - The user selected a selective integration. Work proceeds on this isolated branch without a commit or push.
- [x] 4. Implement.
  - Add portrait assets and roster metadata.
  - Add dialog, portrait, roster, and division image primitives.
  - Port the Divisi list and direct detail route only.
  - Restore all non-Divisi pages and shared global files to Project A.
- [x] 5. Scrap.
  - The selected modules coexist with Project A's non-Divisi pages, so no redesign was needed.
- [x] Throughput checkpoint.
  - The changed import graph resolves, roster media paths resolve, and `git diff --check` passes. Lint is blocked because dependencies are absent.
