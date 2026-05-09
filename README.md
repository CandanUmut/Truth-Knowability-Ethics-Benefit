# Truth · Ethics · Benefit — Deliberation

> A bilingual (Turkish + English), client-side-only deliberation tool that walks the user through a structured reflection when she faces a difficult decision. The output is a *deliberation map*, not a verdict.

This application implements the framework defended in the working paper *Truth, Ethics, and Benefit: A Multi-Source Framework for Practical Deliberation* by Umut Candan. The framework argues that truth-judgment, ethical-judgment, and benefit-judgment are three irreducible moments of one deliberative act, integrated through the agent's intentional orientation, operating within four mutually necessary but asymmetrically ordered sources: **revelation** (*waḥy*), **reason** (*ʿaql*), **sense-experience** (*tajriba*), and **conscience** (*qalb / ḍamīr*).

**Live site:** https://candanumut.github.io/Truth-Knowability-Ethics-Benefit/

**Paper:** [`research/truth-ethics-benefit-preprint.md`](research/truth-ethics-benefit-preprint.md)

---

## What this is

- A **decision-support tool** that walks the user through the framework's five-step procedure (Case → Truth-claims → Maqāṣid → Sources → Niyya) and returns a structured dossier with a confidence class (settled / qualified disagreement / open). A **Quick path** delivers a heuristic dossier in three screens by auto-deriving impact signals from the case and option text; the same dossier can be deepened any time by jumping into a specific step from the Refine panel.
- A **bilingual** interface in Turkish (default) and English (fallback), with vocabulary drawn from the paper's Turkish executive summary.
- A **client-side-only** application: no server, no analytics, no telemetry, no cookies. localStorage and IndexedDB only. Open source.

## What this is not

- **Not a fatwā service.** The output is never a verdict; it is a structured reflection.
- **Not a chatbot.** The application asks structured questions; it does not converse.
- **Not an AI advisor.** No LLM calls. No data leaves the device.
- **Not a substitute for scholarly consultation.** Every qualified-disagreement and open dossier explicitly recommends consulting a qualified scholar.

## Privacy

The application is engineered to be auditably private:

- **Zero server.** No `fetch()` calls to any external endpoint in production. The build artifact is fully static.
- **Zero analytics.** No Google Analytics, no Plausible, no PostHog, no Sentry, no Mixpanel.
- **Zero CDN dependencies.** Inter and Noto Naskh Arabic fonts are hosted locally.
- **localStorage and IndexedDB only.** No cookies. No fingerprinting.
- **Export / import.** The user can export her full history as a JSON file at any time; this is the only sync mechanism.
- **Open source.** Anyone can verify the privacy claims by reading the code.
- **CI privacy guard.** A grep-based check in `.github/workflows/deploy.yml` fails the build if the source ever contains an analytics or telemetry endpoint.

See `/privacy` in the running application or [`src/locales/en/privacy.json`](src/locales/en/privacy.json) for the seven-principle statement.

---

## Stack

- **Vite + React 18 + TypeScript** (strict, no `any`)
- **Tailwind CSS v3** with custom Apple-aesthetic design tokens
- **shadcn/ui** primitive shape (button, card, textarea, input, label, segmented, stepper-scale)
- **Framer Motion** for transitions (page transitions, step transitions, diagram entrance)
- **Recharts** for the per-option tetrad radar charts
- **react-i18next** with TR default, EN fallback (8 namespaces per locale)
- **Zustand** (preferences + active deliberation session) with `persist` to localStorage
- **Dexie** (IndexedDB wrapper) for the deliberation history
- **React Router v6** with lazy-loaded routes

## Local development

```bash
npm install
npm run dev          # vite dev server
```

Other scripts:

```bash
npm run build        # production build with chunking
npm run preview      # preview the production build locally
npm run typecheck    # strict TypeScript check
npm run lint         # ESLint, zero warnings
npm run test         # vitest, single run (42 tests across 6 files)
npm run test:watch   # vitest in watch mode
```

## Project layout

```
src/
  app/                     # App, Router (lazy-routed), entry
  components/
    ui/                    # button, card, input, textarea, label, segmented, stepper-scale
    layout/                # Shell, Header, Footer
    common/                # Logo, LangSwitch, ThemeToggle, PageHeader, SourceCard, diagrams
    deliberation/          # Step1Case, Step2Truth, Step3Maqasid, Step4Sources, Step5Niyya,
                           # Output, TetradRadar, StepIndicator
  pages/                   # Home, About, Method, Sources, Deliberate, History, Privacy, NotFound
  lib/
    scoring.ts             # the §7.2 scoring formula
    constraints.ts         # ḍarūrī hard-constraint filter
    niyya.ts               # post-scoring niyya multiplier
    classification.ts      # settled / qualified disagreement / open + runDeliberation pipeline
    sources.ts             # source library access + case-pattern matcher
    storage/
      preferences.ts       # theme (Zustand + localStorage)
      session.ts           # active deliberation (Zustand + localStorage)
      history.ts           # saved deliberations (Dexie / IndexedDB)
      export.ts            # versioned JSON export and import
  data/
    sources/
      quran.json           # ~58 verses with Pickthall + Diyanet translations
      hadith.json          # ~33 hadiths from the Sahihayn, Sunan, and Tirmidhi
      qawaid.json          # ~12 classical legal maxims (qawāʿid fiqhiyya)
      scholars.json        # ~20 scholarly opinions across schools and eras
      maqasid.json         # ontology of the classical five + Tāhā axes
    case-patterns.json     # ~30 patterns mapping keywords to source IDs
  locales/{tr,en}/         # 8 namespaces per language
  types/                   # deliberation.ts, sources.ts
  styles/globals.css       # Tailwind + design-token CSS variables + font-face
public/
  fonts/                   # Inter (Variable + Italic), Noto Naskh Arabic — locally hosted
  favicon.svg, 404.html    # SPA-routing redirect for GitHub Pages
  robots.txt, sitemap.xml
```

---

## The deliberation procedure (paper §7)

1. **Step 1 — Case Statement.** Free-text description (200–500 words), agents involved, options under consideration including inaction, time horizon, reversibility, stake ratings on the five protected goods and the three Tāhā axes.

2. **Step 2 — Truth-Claims at Issue.** For each fact-claim that, if false, would change the moral analysis: evidential basis (sense / demonstrative / *tawātur* / cumulative / single-source / intuition / none), confidence class (*yaqīn*=1.0, *ẓann_strong*=0.7, *ẓann*=0.5, *shakk*=0.3, *jahl*=0.0), sensitivity flag. **Commitment 2** is enforced: a sensitive critical claim with weak evidence raises a non-blocking warning.

3. **Step 3 — Maqāṣid Implicated.** Per option, per maqsad and per Tāhā axis: direction (positive / negative / no relation), tier (*ḍarūrī*=3 / *ḥājī*=2 / *taḥsīnī*=1), magnitude (1–5), causal confidence, affected party.

4. **Step 4 — Source Consultation.** The matcher surfaces Qur'ānic verses, hadiths, and classical sources from the seed library based on the case description. The user marks which bear on the case, writes her reading, and may explicitly follow a minority position with stated reasoning.

5. **Step 5 — Niyya Check.** Five reflective questions, presented one at a time. Answers are *not scored* — they are mirrored back. The algorithm uses the user's stated leaning to detect *tension* with the option scoring highest in the calculus, and flags it gently. A self-reported corrupt-motivation checkbox sets the niyya multiplier on the top option to 0.

### Scoring (paper §7.2)

```
Option_score = Σ over implicated maqāṣid (impact × tier_weight × causal_confidence)
             − Σ over harm vectors      (harm   × tier_weight × causal_confidence)
```

**Hard constraint.** An option whose negative impact on a *ḍarūrī* good is at *yaqīn*-level confidence with magnitude ≥ 4 is filtered before scoring.

**Niyya modifier.** Applied after scoring to the top non-filtered option only: clean = ×1.0, tension = ×0.7, corrupt = ×0.0.

**Output classification.**
- *Settled* — top option exceeds runner-up by > 50%, source convergence high, niyya clean.
- *Qualified disagreement* — multiple options within 20% of each other, OR known scholarly divergence, OR niyya shifts the top.
- *Open* — sensitive critical claims at *shakk* level, OR all options filtered.

### What the framework does not handle well

- The fine-grained *mandūb* / *mubāḥ* distinction is currently elided — the calculus is best calibrated to obligation/prohibition.
- A trained *niyya*-diagnosis (the classical Sufi diagnostic literature: al-Muḥāsibī, al-Ghazālī's *ʿAjāʾib al-Qalb*, Ibn ʿAṭāʾ Allāh) is more sophisticated than a software check can be.
- Users without baseline Islamic literacy will get less out of the tool than users formed in an interpretive tradition.

These limitations are surfaced in every dossier's footer (see [`src/locales/en/deliberate.json`](src/locales/en/deliberate.json) `output.dissenting`).

---

## Deployment

GitHub Pages, deployed from `main` via the workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). The workflow:

1. installs deps with `npm ci`,
2. runs `npm run lint`,
3. runs `npm run typecheck`,
4. runs `npm run test`,
5. runs the **privacy guard** (a grep that fails the build if any analytics endpoint is present in `src/`),
6. runs `npm run build`,
7. uploads `dist/` and deploys to Pages.

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for the contribution workflow and [`docs/scholar-review.md`](docs/scholar-review.md) for the workflow qualified scholars can use to review and correct the source library.

## License

Apache-2.0. See [`LICENSE`](LICENSE).

## Citation

If you cite the framework academically, the working paper is the canonical reference:

> Candan, Umut. *Truth, Ethics, and Benefit: A Multi-Source Framework for Practical Deliberation* (working paper, 2025).
