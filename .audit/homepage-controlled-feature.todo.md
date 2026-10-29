# Homepage controlled feature

- [x] Blocking first steps. Read the approved design direction, project instructions, current diff, and required skills.
- [ ] Independent workstreams. The navbar boundary and homepage visual files have different owners but share the active worktree. Serialize writes.
- [ ] Shared mutable state. Preserve the user's staged Divisi work and unrelated assets. Only edit homepage files and the shared Navbar component.
- [ ] Smallest safe decomposition. One owner completes the coupled homepage and Navbar change because the page imports the new optional Navbar behavior and requires one integrated browser check.
- [x] Implement the Navbar reveal boundary and homepage stylesheet.
- [x] Run type, lint, production build, and rendered homepage checks.
- [x] Inspect the diff and record remaining risks.
