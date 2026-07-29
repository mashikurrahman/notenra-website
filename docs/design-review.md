# NOTENRA — Design Review

**Scope:** visual design of the homepage (`/`), with supporting notes on shared components.
**Date:** 2026-07-29
**Build reviewed:** Next.js 16.2.12, post colour-system refresh.
**Method:** rendered-page measurement via Chrome DevTools Protocol at 1440×900 and 390×844 — computed styles, real keyboard tabbing, and pixel inspection. Numbers below are measured, not estimated.

---

## 1. Rating

### Visual design — the focus of this review

| Area | Score | Verdict |
|---|:---:|---|
| Colour palette | **7 / 10** | Disciplined and brand-correct. The strongest part of the design. |
| Typography | **4 / 10** | 13 sizes in use, body copy too small, over-bolded throughout. |
| Layout & composition | **4 / 10** | Large dead zones; paired columns unbalanced. |
| Surface & depth | **3 / 10** | Seven consecutive pure-white sections — no tonal separation. |
| Consistency | **5 / 10** | Four card treatments and three icon-tile styles in a single grid. |
| Detail craft | **5 / 10** | Ragged row alignment, orphaned words, split accent underline. |

### **Overall visual: 5 / 10**

> Competent and tidy, but flat and under-designed. It reads like a strong wireframe that never received its final art pass. Nothing is ugly; nothing is memorable either. The palette and the code are ahead of the composition.

### Non-visual (context only — out of scope, see Appendix A)

| Area | Score |
|---|:---:|
| Code quality | 8 / 10 |
| Accessibility | 5 / 10 |
| Information architecture | 3 / 10 |
| Trust & credibility | 2 / 10 |

---

## 2. Issues

Ordered by visual impact. Severity: **High** = makes the page look unfinished · **Medium** = noticeable to a designer · **Low** = polish.

---

### V1 — No tonal separation between sections · **High**

All seven `<section>` elements compute to `rgb(255, 255, 255)`. Sections are divided only by a 1px `#DFE2E6` hairline, so the page reads as one undifferentiated scroll with no rhythm or resting points.

*Origin: introduced during this project while removing a cool/warm tint. The tint was correctly removed; the tone was removed along with it. This is a regression, not an original condition.*

---

### V2 — Cards have almost no presence · **High**

White cards sit on white sections with a `#DFE2E6` hairline. Contrast between card and ground is **1.18:1**. They register as faint rectangles rather than objects, which flattens every card-based section (stats, features, bento, steps).

Directly caused by V1 — fixing V1 fixes most of this.

---

### V3 — Large dead zones inside and below components · **High**

The single biggest contributor to the "unfinished" impression. Measured on the current build at 1440px:

| Location | Empty space |
|---|---|
| Stat cards (SocialProof) | ~80px below the label in every card |
| Specialties detail panel | Content ends 520px, panel ends 550px, section runs to 680px — a half-empty panel plus a ~130px void |
| How it works | Right panel ends ~90px above the left rail, then ~120px empty below both |
| Feature grid, row 2 | ~90px at the bottom of each card |

Cause: fixed `min-h-*` values on cards and panels sized for the longest possible content, plus `py-32` section padding on sections with little content.

---

### V4 — Ragged alignment across card rows · **Medium**

Card titles wrap to one or two lines depending on length — "Medical Coding Engine" (1 line) vs "Revenue & Payroll Intelligence" (2 lines) — so body copy starts at different heights across a row and footer text sits at different heights. The row never settles into a grid.

Affects: FeatureGrid, SocialProof, bento cards 2–4.

---

### V5 — Headline wrap and the split accent underline · **Medium**

Hero: *"Documentation that / moves at the **speed** / **of care.**"* — "of care." is orphaned on line three with a large gap to its right. The coral `.accent-underline` breaks into **two disconnected bars of different lengths**, which reads as a rendering error rather than a deliberate accent.

Same class of problem in the CTA: *"Give your physicians **their** / **evenings back.**"* — "their" is stranded at the end of line one.

---

### V6 — Typography scale is undisciplined · **Medium**

Measured census of rendered text nodes on `/`:

| Size | Nodes |
|---|---|
| 9px | 3 |
| 10px | 8 |
| 11px | 7 |
| **12px** | **96** |
| 14px | 20 |
| 16px | 17 |
| 18px | 15 |
| 20px | 4 |
| 24px | 7 |
| 30px | 6 |
| 36px | 1 |
| 48px | 4 |
| 60px | 2 |

**13 distinct sizes.** 114 of ~182 text nodes are ≤12px, and 18 are below 12px. For a product sold to physicians and practice managers — an audience skewing 45+ — the default reading size is too small.

Font weights: **700 → 70 nodes, 800 → 34, 600 → 11, 500 → 4, 400 → 63.** 104 of 182 nodes are 700 or heavier. When almost everything is bold, nothing reads as emphasis and hierarchy collapses.

---

### V7 — Too many surface and icon treatments in the bento grid · **Medium**

One grid contains four different card surfaces:

1. Solid navy (`surface-navy`) — card 1
2. Grey + hairline (`bg-slate-50`) — cards 2, 3, 4, 5
3. Solid teal (`surface-teal`) — card 6
4. White + hairline — nested stat boxes inside card 5

Plus three icon-tile styles: translucent teal (`bg-brand-teal/10`), pale teal + border (`bg-brand-teal-50`), and solid teal (`bg-brand-teal`), and a fourth on the navy card (`bg-white/15`).

It reads as four design decisions rather than one system.

---

### V8 — Header pill loses definition · **Low**

A white pill on a white page is defined only by its hairline and a small shadow. The floating-pill concept needs contrast beneath it to work; with V1 fixed, this partly resolves on its own.

---

### V9 — Hero visual is over-detailed · **Low**

The right-hand mockup contains five nested panels, a three-tab strip, two badges, a waveform, four data rows and a footer bar — with four different corner radii nested inside each other (`rounded-3xl` → `2xl` → `xl` → `lg`). It tries to show the entire product in one frame and reads as busy at a glance.

---

### V10 — Stat values are formatted inconsistently · **Low**

"2.8 Hours" · "< 45 Seconds" · "99.4%" · "+38%" · "98% CSAT" — five different value shapes in one row (unit-suffixed, operator-prefixed, bare percentage, signed percentage, percentage-with-acronym). "< 45 Seconds" is the only one that wraps to two lines, which is what breaks that row's alignment.

---

### Checked and found NOT to be a problem

- **Bento grid column alignment.** The row seams appear to shift between the `2+1+1` and `1+2+1` rows. Measured column edges: **110 / 414 / 718 / 1022 / 1326** — both rows sit exactly on the 4-column grid. No change needed.
- **Colour contrast.** A full sweep of every rendered text node against its computed background returned **zero** WCAG AA failures.
- **Horizontal overflow.** At 390px: `innerWidth 390 / scrollWidth 390 / bodyWidth 390`. Clean.

---

## 3. Fixes

### Phase 1 — Restore depth and rhythm *(highest impact, lowest risk)*

**F1. Alternate section grounds.** → *fixes V1, V2, V8*
Introduce a neutral grey band and alternate it with white. Neutral, not tinted — hue in the background is what caused the earlier "foggy" problem.

```
--color-canvas: #F8F9FA   /* neutral grey band */
```

Homepage order becomes: Hero `white` → SocialProof `grey` → FeatureGrid `white` → Specialties `grey` → BentoGrid `white` → HowItWorks `grey` → CTA `white` → Footer `navy`.

**F2. Invert card fill against its ground.**
A card is always the opposite tone to the section it sits in: white cards on grey bands, `#F8F9FA` cards on white bands. Card-to-ground contrast rises from 1.18:1 to a visible step, and cards stop needing a shadow to be seen.

**F3. Remove fixed heights; let content size the box.** → *fixes V3*
Drop `min-h-95`, `min-h-105`, `min-h-55` and equivalents. Where a row must stay even, use `items-stretch` with `mt-auto` on the footer element instead of a hard height. Reduce section padding from `py-24 sm:py-32` to `py-20 sm:py-24`.

**F4. Balance the paired columns.** → *fixes V3*
In HowItWorks and Specialties, the sticky right panel is shorter than the left rail. Vertically centre it (`self-center`) rather than top-aligning, and trim the trailing section padding that follows it.

---

### Phase 2 — Typographic discipline

**F5. Collapse to a six-step scale.** → *fixes V6*

| Token | Size | Use |
|---|---|---|
| `xs` | 12px | eyebrows, chips, captions — **floor** |
| `sm` | 14px | secondary body, card copy |
| `base` | 16px | body copy (currently 12–14px) |
| `lg` | 20px | card titles |
| `2xl` | 30px | sub-section headings |
| `4xl` | 48px | section headings |

Retire all 9px, 10px and 11px values (18 nodes). Nothing below 12px.

**F6. Halve the bold.** → *fixes V6*
Section headings stay `800`. Card titles drop `700 → 600`. Eyebrows, chips, stat labels and nav drop to `500`. Body copy stays `400`.

**F7. Control the headline break.** → *fixes V5*
Add `text-balance` and a `max-w-[15ch]`-style measure to the H1 and CTA headline so they break evenly across two lines with no orphan. Apply the accent underline only to a phrase guaranteed to sit on one line — otherwise colour the words and drop the underline.

---

### Phase 3 — System consistency

**F8. Two surfaces, one icon tile.** → *fixes V7*
Bento reduces to: one navy hero tile + all others on the standard card surface from F2. A single icon-tile style — solid `brand-teal` with white glyph — used everywhere, including nested stat boxes.

**F9. Normalise corner radii.** → *fixes V9*
Two radii only: `rounded-2xl` for cards and panels, `rounded-lg` for controls and inner chips. No nesting deeper than two levels.

**F10. Simplify the hero mockup.** → *fixes V9*
Reduce to the SOAP note plus the waveform strip. Drop the tab row and one nested panel layer.

**F11. Normalise the stat row.** → *fixes V10, V4*
One value shape across all five: a number plus a short unit. Replace "< 45 Seconds" with "45 Seconds" (qualifier moves to the label) so no value wraps and the row aligns.

---

## 4. Recommended order

| Phase | Fixes | Effort | Visual gain |
|---|---|---|---|
| **1** | F1 – F4 | Low | **Large** — resolves the "unfinished" read |
| **2** | F5 – F7 | Medium | Large |
| **3** | F8 – F11 | Medium | Moderate |

Phase 1 alone should move the visual score from 5 to roughly 7. It is almost entirely spacing and surface values, so the risk of regression is low and it is trivially revertible.

---

## Appendix A — Non-visual issues (out of scope, recorded so they are not lost)

These were found during an earlier functional pass. They do not affect how the site *looks* but are launch-blocking.

1. **Eight broken navigation links.** `#coding`, `#billing`, `#payroll` do not exist anywhere in the codebase — verified. They are referenced from three header dropdown items and three footer links. Privacy Policy and Terms of Service are `href="#"`.
2. **Both forms are decorative.** `handleSubmit` in `contact/page.tsx` and `DemoModal.tsx` is `e.preventDefault(); setSubmitted(true)`. No endpoint. Users see a success confirmation for data that was discarded.
3. **All statistics are unverified placeholders** — 99.4% accuracy, 2.8 hrs/day, +38% yield, 98% CSAT, SOC 2 Type II, "board-certified reviewers." On a HIPAA product these are a legal exposure until substantiated.
4. **FAQ accordions have no visible focus indicator.** `focus:outline-none` with no replacement, in `FaqSection.tsx` and `DocFaq.tsx`. Confirmed by dispatching real Tab keypresses — all four returned no outline and no ring. WCAG 2.4.7 (AA) failure. *Note: an initial automated pass flagged 36 elements; that was a false positive caused by programmatic `.focus()` not triggering `:focus-visible`. Under real keyboard navigation only the accordions fail.*
5. **Accordions and tab strips lack ARIA.** `FaqSection` has no `aria-expanded` / `aria-controls`. The Specialties, DocTypes and DocProcess selectors use plain buttons — **zero** `role="tablist" / "tab" / "tabpanel"` site-wide — and no arrow-key navigation.
6. **No product imagery.** Zero `<img>` elements site-wide; every "screenshot" is a CSS mockup.
7. **1.4 MB of JavaScript** for a static marketing site.
8. **Unconfirmed sign-in URL.** `https://app.notenra.com/login` in `Header.tsx`, versus the "Anot Health" account name seen on the client's Play Console.

---

## Appendix B — Measurement notes

- Rendering: headless Edge 150 via CDP, `Emulation.setDeviceMetricsOverride` at 1440×900 (desktop) and 390×844 DPR 2 (mobile).
- Sections using `whileInView` do not render in single-shot full-page captures; all captures scroll the full document first to trigger `IntersectionObserver`. A blank band in a raw capture is a capture artifact, not a layout fault.
- Contrast computed per WCAG 2.1 relative luminance, walking up the DOM to the first opaque ancestor background.
- Focus visibility tested with `Input.dispatchKeyEvent` Tab presses, not `element.focus()`, so `:focus-visible` resolves as it would for a real keyboard user.

---

## Appendix C — Rollback

A full pre-refresh snapshot of `src/`, `public/` and the config files is at:

```
.backup-2026-07-29-pre-refresh/
```

To restore:

```bash
rm -rf src && cp -r .backup-2026-07-29-pre-refresh/src src
```

The directory is dot-prefixed, so Next.js, TypeScript and ESLint all skip it.
