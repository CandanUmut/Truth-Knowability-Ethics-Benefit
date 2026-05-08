# Architecture

A short technical overview for contributors who already know modern React/TypeScript and want to navigate the codebase efficiently.

## Goals that constrain the architecture

1. **Client-side only.** No server, no fetch to external endpoints in production. The build artifact must be deployable to a static host with no backend.
2. **Bilingual at every layer.** Turkish is the default, English the fallback. No string literals in components.
3. **Faithful to the paper.** The framework in `research/truth-ethics-benefit-preprint.md` §7 is implemented verbatim; in particular `lib/scoring.ts`, `lib/constraints.ts`, `lib/niyya.ts`, and `lib/classification.ts` should not drift from the paper without an explicit philosophical reason.
4. **Privacy-respecting.** No analytics, no CDN deps, no telemetry. The CI privacy guard enforces this at build time.

## Layered structure

```
   pages/                  Routed surfaces — page-level layout, wires lib + UI
        ↓
   components/{layout,common,deliberation,ui}    Presentational + small interaction logic
        ↓
   lib/{scoring,constraints,niyya,classification,sources,storage/*}
                                      Pure logic + framework-faithful engine
        ↓
   data/                   Versioned source library (Qur'ān, hadith, maqāṣid, patterns)
        ↓
   types/                  Discriminated unions and constants shared across layers
```

`pages` import freely from `components`, `lib`, and `types`. `components` import freely from `lib`, `types`, `locales`. `lib` is pure: it imports only `types` and `data`. The data files are static JSON imports, resolved at build time.

## Engine flow

Phase 3 implements the §7.2 calculus exactly. Reading top-to-bottom of `lib/classification.ts::runDeliberation()`:

1. **Filter** with `applyHardConstraints()` — every option is checked for severe (≥4 magnitude) negative impacts on a *ḍarūrī* good at *yaqīn* confidence. Filtered options remain visible to the user but cannot win.
2. **Score** every option with `scoreOption()` — `Σ(impact × tier_weight × causal_confidence)` for positive, minus the same for negative.
3. **Niyya** — `applyNiyyaToScores()` finds the top non-filtered option and applies the multiplier from `assessNiyya()` (clean = 1.0, tension = 0.7, corrupt = 0.0). Tension is detected when the user's stated leaning differs from the top scorer.
4. **Classify** with `classify()` — open / qualified disagreement / settled per the §7.2 thresholds (T1=0.5, T2=0.2), with two early-exit conditions (all-filtered ⇒ open; sensitive-claim-at-shakk ⇒ open) that implement Commitment 2 at the classification layer.
5. **Recommend** — i18n keys are pushed onto a recommendation list based on the classification, niyya state, and any open conditions.

The engine is fully unit-tested (`*.test.ts` files alongside their modules) and exercised end-to-end in `runDeliberation()` tests.

## State

There are two stores, both Zustand-backed:

- `lib/storage/preferences.ts` — theme. Persisted to localStorage at key `teb.preferences.theme`.
- `lib/storage/session.ts` — the active deliberation session (the in-progress draft). Persisted to localStorage at key `teb.session.active`. A page refresh does not lose work-in-progress.

Saved deliberations (drafts and finals) live in IndexedDB via Dexie:

- `lib/storage/history.ts` — database `teb.history`, table `deliberations`. Schema versioned at v1.

JSON export and import (`lib/storage/export.ts`) carry a `schema: "teb-deliberation"` envelope and a `schemaVersion`, so future schema migrations have a defined contract.

## i18n

`react-i18next` is initialized in `src/i18n/config.ts`. Eight namespaces per language: `common`, `home`, `about`, `method`, `sources`, `history`, `privacy`, `deliberate`. Language detection order is `localStorage → navigator`, persisted at key `teb.lang`. The `<html lang>` attribute is updated reactively from `i18n.language` in `App.tsx`.

Vocabulary discipline: Turkish copy uses the paper's Turkish executive summary (`hak`, `yakîn`, `hüsün/kubuh`, `maslahat`, `niyet`, `makâsıd`, `zarûriyyât/hâciyyât/tahsîniyyât`, `fetva`). English copy uses the paper's main text (`ḥaqq`, `ṣidq`, `yaqīn`, *etc.*). Inventing new terms is avoided.

## Build profile

`vite.config.ts` declares manual chunks:

- `react-vendor` — React, ReactDOM, React Router
- `i18n-vendor` — i18next, react-i18next, language-detector
- `motion-vendor` — Framer Motion
- `charts-vendor` — Recharts (only loaded with `/deliberate`)
- `storage-vendor` — Dexie + Zustand

Plus `React.lazy` on every non-Home route. Initial gzipped JS hovers around 144 KB; Recharts only ships when the user enters the deliberation flow. The build target is ES2020.

## CI

`.github/workflows/deploy.yml` runs on every push to `main`:

1. `npm ci`,
2. `npm run lint` (`--max-warnings 0`),
3. `npm run typecheck`,
4. `npm run test`,
5. **Privacy guard** — a grep over `src/` that fails the build if `google-analytics`, `googletagmanager`, `plausible.io`, `posthog`, `sentry.io`, or `mixpanel` appears anywhere.
6. `npm run build`,
7. upload the `dist/` artifact to GitHub Pages and deploy.

## Adding a new page

1. `pages/MyPage.tsx` — standard React component. Use `PageHeader` for the top.
2. Locale namespace `mypage` in `src/locales/{tr,en}/mypage.json`. Register in `src/i18n/config.ts`.
3. Lazy-import in `app/Router.tsx` and add a `<Route>`.
4. If the page should appear in nav, add to `navItems` in `components/layout/Header.tsx` and to `Footer.tsx` if appropriate.
5. Add a `<url>` entry to `public/sitemap.xml`.

## Adding a new source

1. Add the JSON entry to `src/data/sources/quran.json` or `src/data/sources/hadith.json`.
2. Tag with `themes` and `casePatterns` so the matcher surfaces it appropriately.
3. Set `reviewStatus: "seed"` until a qualified scholar has reviewed it (see `docs/scholar-review.md`).
4. If the source maps to a new case-pattern not yet present, add the pattern to `src/data/case-patterns.json` with its keywords.

## Adding a new type / engine rule

1. Define the type in `src/types/deliberation.ts` (or a new file under `types/`). Prefer string-literal unions and `Record` constants over enums, for tree-shake friendliness.
2. If the rule is part of the §7 algorithm, implement it under `src/lib/` with a unit test alongside.
3. Surface in the relevant step component and in `Output` if it changes the dossier.
4. Add the i18n strings.

## Things that are deliberately *not* abstracted

- The five steps are five distinct components. They share primitives (Segmented, StepperScale, Label, Textarea) but each step's logic is local. Avoid building a "form schema engine" — the steps are different enough that abstraction would obscure them.
- The dossier (`Output.tsx`) computes derived values inline. The radar formula is documented in the file's `deriveRadars()` JSDoc. If the formula changes, the formula and its motivation should be updated together.
- The case-pattern matcher is intentionally simple substring matching. Replacing it with embeddings or an LLM would violate the privacy posture.
