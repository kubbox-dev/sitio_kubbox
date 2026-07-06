---
target: src/components/sections/landing/ServicesSection.jsx
total_score: 26
p0_count: 1
p1_count: 2
timestamp: 2026-07-06T14-01-45Z
slug: rc-components-sections-landing-servicessection-jsx
---
#### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Active tab/dot/wheel-icon and "03/08" counter are clear; no visible pause/play state for autoplay |
| 2 | Match System / Real World | 3 | Plain Spanish labels; wheel icons have no visible caption except the active one |
| 3 | User Control and Freedom | 2 | Autoplay only pauses on `mouseenter` — touch users have no way to stop it |
| 4 | Consistency and Standards | 2 | Three different UI idioms (wheel, dots, text tabs) all do the same job |
| 5 | Error Prevention | 4 | Nothing destructive; n/a |
| 6 | Recognition Rather Than Recall | 2 | 7 of 8 wheel icons show no visible label — pure icon-guessing |
| 7 | Flexibility and Efficiency | 2 | No keyboard path, no "see all 8 at once" option for scanners |
| 8 | Aesthetic and Minimalist Design | 2 | Core issue — 3 redundant selectors + oversized fixed-height card |
| 9 | Error Recovery | 4 | n/a |
| 10 | Help and Documentation | 2 | Kicker sentence is split across two opposite corners of the block |
| **Total** | | **26/40** | **Acceptable — significant improvements needed** |

#### Anti-Patterns Verdict

**LLM assessment**: Not generic AI-slop — the rotating wheel + real photography + editorial type pairing is a genuine, on-brand differentiator, not a templated icon grid. The problem is pure feature creep: 8 services accumulated over time, each wired into three separate navigation mechanisms that all point at the same list.

**Deterministic scan**: `detect.mjs` on this file returned zero findings (no gradient text, no side-stripe borders, no eyderow spam). Clean on the mechanical checks; the real issues here are structural/IA, which the detector doesn't check.

#### Overall Impression

The visual identity is strong and distinctive. The problem is that the same "pick 1 of 8" decision is offered through three different controls at once (wheel icons, progress dots, and a row of 8 full-title text tabs), on an 8-item list that already exceeds the comfortable working-memory range. That's classic scope creep: each service was probably added with "let's also add a tab for it" without removing anything.

#### What's Working

- **The wheel + photo motif** is a real signature, not a generic 3-icon grid — worth protecting as the primary selector.
- **Editorial heading pairing** (solid "NUESTROS" + outline "SERVICIOS") is bold and on-brand, consistent with the Hero.
- **Bullet lists inside each service** are well-chunked (≤5 items, consistent icon treatment) — this part scales fine.

#### Priority Issues

**[P0] Autoplay never stops for touch users**
- File: `ServicesSection.jsx:148-158` (`setInterval` + `onMouseEnter`/`onMouseLeave` pause)
- Why it matters: mobile has no hover, so the carousel yanks to the next service every 4.2s while someone is still reading — it fights the user's own reading pace, not helps it.
- Fix: pause permanently after first manual interaction, or pause via `touchstart`/scroll-into-view instead of hover-only.
- Suggested command: `/impeccable adapt`

**[P1] Nav has no backdrop in the gap between logo and link-pill, so the giant heading bleeds through**
- File: `Navbar.jsx` (bare logo, separate from the link pill) — visible on `#servicios` because `NUESTROS` is tall enough to reach the fixed nav's height.
- Why it matters: the wordmark visually collides with "NUESTROS," hurting legibility and looking like a layout bug rather than a deliberate composition.
- Fix: either keep giant headings from starting that close to the fold, or give the nav a full-width transparent-to-solid gradient backdrop instead of two disconnected pills.
- Suggested command: `/impeccable layout`

**[P1] Three redundant selectors for one 8-item decision**
- File: `ServicesSection.jsx:289-301` (tabs), `343-379` (wheel), `396-406` (dots)
- Why it matters: violates Aesthetic/Minimalist heuristic and the ≤7-item working-memory guideline; the uneven tab-grid wrapping (2/1/2/2 rows) reads as unfinished rather than designed.
- Fix: keep the wheel as the primary, on-brand selector; drop the text-tab row entirely (or fold it into a simple "ver todos los servicios →" link to the full list); keep the dots only as a lightweight secondary indicator.
- Suggested command: `/impeccable distill`

**[P2] Wheel icons have no visible label for non-active items**
- File: `ServicesSection.jsx:349-378`
- Why it matters: only the active/center icon shows a text caption; the other 7 are icon-only with an `aria-label` that's invisible to sighted users, forcing guesswork.
- Fix: add a small on-hover/focus caption near the ring, matching the pattern already used for the active center label.
- Suggested command: `/impeccable clarify`

#### Persona Red Flags

**Jordan (First-Timer)**: Lands on the section, sees 8 icons in a circle with no labels, a row of 8 buttons below with long wrapped text, and 8 dots — three different things asking "pick one" with no indication of which is authoritative. Likely picks the text tabs (most familiar pattern) and never notices the wheel is interactive too.

**Casey (Distracted Mobile User)**: Starts reading the "Campañas Digitales para Activación de Ventas en Retail" body copy; before finishing the second sentence, autoplay swaps the card to service #4 (no way to pause via touch). Has to manually tap back to #3 and re-read, then it happens again 4.2s later.

#### Minor Observations

- The kicker sentence is split across two opposite corners of the `.svc-head` block: "Nuestro enfoque combina" (top-right) ... "creatividad, experiencia técnica..." (bottom-left), with the giant headline physically between them. Reads as two disconnected fragments rather than one sentence.
- `ServicesSection.jsx:240` has a leftover dev comment (`// ← Agregar aquí`) and a hardcoded `minHeight: '410px'` — a sign of ad hoc patching rather than a deliberate constraint; shorter service bodies (e.g. "Posicionamiento SEO") leave visible dead space at the bottom of the card.
- `.svc-card-new` has a hardcoded `min-height: 700px` for the same reason.

#### Questions to Consider

- Do all 8 services need to live in a single-select carousel, or do some (e.g. "Desarrollo Digital," which already has its own route) belong in a simple list/grid instead of competing for the one active slot?
- If the wheel is the brand signature, should the text tabs exist at all — or would a simple "ver todos" link into a full services page serve the scanning user better than a third selector?
