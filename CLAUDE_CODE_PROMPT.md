# Claude Code Build Prompt: Truth–Ethics–Benefit Deliberation Web Application

> **Hand this entire file to Claude Code as the primary instruction.** Claude Code should treat this as the authoritative spec for the build. Where this document and the user's verbal instructions disagree, ask the user.

---

## 0. Read the research first

Before touching any code, locate and read the philosophical research paper that lives in this repository. The file is somewhere in the repo root or a `docs/`, `research/`, or `paper/` folder, and its name will contain some combination of the words "truth", "ethics", "benefit", "preprint", or "what truth". It is a markdown file (~17,000 words) that defines the philosophical framework the application implements. **Do not skip this step.** Specifically, you must understand:

- **§5: Integration: Intention as Hinge** — the six falsifiable commitments. The application encodes these.
- **§7: Operationalization** — the five-step deliberation procedure, the scoring formula, the hard constraints, the *niyya* check, the output classification (settled / qualified disagreement / open). This *is* the application's logic.
- **§7.4: Design Principles — what the tool refuses** — the application MUST refuse to issue *fatāwā*, MUST recommend scholarly consultation, MUST surface qualified disagreement rather than collapse it, and MUST NOT collect personal data on a server.
- **§7.5: Three worked examples** — these are the seed test cases for the deliberation flow.
- **The Turkish executive summary** — for Turkish UI copy, take vocabulary directly from there (*hak, yakîn, hüsün/kubuh, maslahat, niyet, makâsıd, zarûriyyât, hâciyyât, tahsîniyyât, fetva*). Don't invent terminology.

If you cannot find the research file, stop and ask the user for the filename. Do not proceed without reading it. The application's content depends on this paper's vocabulary, examples, and commitments being preserved.

---

## 1. What we are building

A bilingual (Turkish + English), client-side-only web application that walks a user through a structured deliberation when she faces a difficult decision. The user enters a dilemma; the app asks her structured questions across five steps; at the end, the app returns a *deliberation map* — not a verdict.

This is **not a fatwa generator**. It is **not a chatbot**. It is **not an AI advisor**. It is a structured reflection tool. The user makes the decision. The app structures her thinking.

The user's data never leaves her device. There is no server, no analytics, no tracking, no account system. localStorage and IndexedDB only. Export-as-JSON for portability.

The aesthetic is **Apple/iOS-inspired**: heavy use of whitespace, fine but precise typography, soft shadows, 12–16px rounded corners, near-zero decoration, micro-animations only where they aid comprehension. Think Stoic, Reflectly, or Apple's own Health app — calm, premium, contemplative. **Light mode is default; dark mode is mandatory and equally polished.**

---

## 2. Stack and architecture

- **Vite + React 18 + TypeScript** — strict mode TS, no `any`.
- **Tailwind CSS v3** for styling. Custom theme defined in `tailwind.config.ts` — see §5 below for design tokens.
- **shadcn/ui** for primitive components (Button, Card, Dialog, Tabs, Tooltip, etc.). Install via the official shadcn CLI; do not vendor a copy.
- **Framer Motion** for transitions. Use sparingly — page transitions, step transitions in the deliberation flow, dossier reveal. No bouncing, no parallax, no decoration.
- **react-i18next** for i18n. Default language Turkish (`tr`). Fallback English (`en`). Locale files in `src/locales/{tr,en}/{namespace}.json`.
- **Zustand** for app state (the active deliberation session, user preferences, theme). Persist via Zustand's `persist` middleware to localStorage.
- **Dexie.js** (IndexedDB wrapper) for the deliberation history — saved dossiers, drafts, etc. Cleaner API than raw IndexedDB.
- **React Router v6** in declarative mode.
- **No analytics. No tracking. No telemetry. No external API calls of any kind in production.** This is non-negotiable; see §4.

### File structure

```
src/
  app/
    App.tsx
    Router.tsx
  components/
    ui/                 # shadcn components live here
    layout/             # Shell, Header, Footer
    deliberation/       # Step1Case, Step2Truth, Step3Maqasid, Step4Sources, Step5Niyya, Output
    common/             # LangSwitch, ThemeToggle, etc.
  pages/
    Home.tsx
    About.tsx
    Method.tsx          # the philosophical framework explained
    Deliberate.tsx      # the deliberation flow entry point
    History.tsx         # past dossiers
    Sources.tsx         # the source library (Qur'an verses, hadith, classical texts)
    Privacy.tsx
  lib/
    scoring.ts          # the algorithm from paper §7.2
    classification.ts   # output class logic (settled / qualified / open)
    constraints.ts      # hard constraints (darurî prohibitions)
    storage/
      session.ts        # Zustand store
      history.ts        # Dexie schema and queries
      export.ts         # JSON export/import
  data/
    sources/            # JSON files: quran.json, hadith.json, maqasid.json
    case-patterns.json  # case-pattern → relevant sources mapping
    examples/           # the three worked examples from paper §7.5
  locales/
    tr/
    en/
  types/
    deliberation.ts     # full type definitions for Case, Option, Maqsid, etc.
  styles/
    globals.css
  assets/
public/
  fonts/                # Inter (locally hosted, no Google Fonts CDN)
```

---

## 3. The deliberation flow — implementing paper §7

This is the heart of the application. Implement it exactly as the paper specifies. **Do not improvise.** If something in the paper is ambiguous, surface it to the user as a question; do not guess.

### Step 1 — Case Statement
- Free-text case description (textarea, 200–500 words guidance)
- Agents involved (multi-select chips: self / family / employer / community / society / +custom)
- Options under consideration (dynamic list; user adds 2+ options including "do nothing" if applicable)
- Time horizon (segmented control: hours / days / weeks / months / years)
- Reversibility slider (1–5)
- Stakes ratings (1–5) on each of the five protected goods (*dīn, nafs, ʿaql, nasl, māl*) and on the three Tāhā axes (vital, rational, spiritual)

### Step 2 — Truth-Claims at Issue
For each fact-claim that, if false, would change the moral analysis:
- Claim text (free text)
- Evidential basis (radio: sense / demonstrative reason / *tawātur* / single-source / cumulative case / intuition only / no basis)
- Confidence class — auto-suggested from evidential basis but user-editable: *yaqīn* (1.0), *ẓann_strong* (0.7), *ẓann* (0.5), *shakk* (0.3), *jahl* (0.0)
- Sensitivity flag (toggle: would the moral analysis change if this claim were wrong?)

**Critical UX rule:** if a claim has high sensitivity AND confidence below *ẓann_strong*, surface a non-blocking warning: *"This decision rests on a critical claim with weak evidence. Consider further investigation before deciding."* This implements Commitment 2.

### Step 3 — Maqāṣid Implicated
For each option (from Step 1), present the five protected goods (*ḍarūriyyāt*) plus the three Tāhā axes. For each:
- Impact direction (positive / negative / no significant relation)
- Tier (*ḍarūrī* / *ḥājī* / *taḥsīnī*) — the user assigns this contextually; the app explains the distinction in tooltip
- Magnitude (1–5)
- Causal confidence (same scale as Step 2)
- Affected party (multi-select)

### Step 4 — Source Consultation
Based on case-pattern matching (see §6 on the source library), surface relevant Qur'anic verses, hadiths, and classical *maqāṣid* analyses. For each surfaced source:
- Display: original Arabic + transliteration + translation, with translator named
- Show the major interpretive traditions on that source
- Label as *qaṭʿī* (decisive) or *ẓannī* (open to interpretive variation)
- Allow user to mark: bears on case / does not bear on case / unsure
- For sources the user marks as bearing on the case, optional free-text field: "How does this source apply, in your reading?"

**The user is allowed to follow a minority position** on any contested matter, but the app records both the choice and the user's reasoning in the dossier.

### Step 5 — Niyya Check
A sequence of reflective questions, presented one at a time on a calm screen with plenty of whitespace. The questions are **invitations to self-examination, not interrogations**. The user types short answers.

The five questions, exactly:

1. *What outcome do I most want from this decision, prior to the moral analysis?*
2. *Would I still choose this course if a major worldly benefit were removed?*
3. *What would I not want others to know about my motivation here?*
4. *If a person I respect for sincerity asked me why I am leaning this way, what would I say?*
5. *What does my conscience report when I imagine making this choice and standing with it before God?*

(Translate carefully to Turkish using vocabulary from the paper's Turkish summary. The fifth question's "before God" formulation can also be translated as "kendi vicdanım önünde" in a secular-friendly variant; offer both as a tone toggle in the i18n layer.)

After the user finishes, the app does **not score** the answers. It presents them back to the user as a mirror in the dossier. The app *does* algorithmically check for one thing: whether the apparent *niyya* contradicts the option that scores highest in the calculus. If yes, surface this gently: *"There appears to be tension between your stated direction and the option scoring highest in the calculus. You may want to revise either, or explicitly accept the tension."*

### Decision logic — implement exactly

```typescript
// lib/scoring.ts pseudocode
type Confidence = 'yaqin' | 'zann_strong' | 'zann' | 'shakk' | 'jahl';
const confidenceScore: Record<Confidence, number> = {
  yaqin: 1.0, zann_strong: 0.7, zann: 0.5, shakk: 0.3, jahl: 0.0
};

type Tier = 'daruri' | 'haji' | 'tahsini';
const tierWeight: Record<Tier, number> = { daruri: 3, haji: 2, tahsini: 1 };

function scoreOption(option: Option, claims: Claim[]): number {
  const positive = option.maqasidImpacts
    .filter(m => m.direction === 'positive')
    .reduce((sum, m) => sum + m.magnitude * tierWeight[m.tier] * confidenceScore[m.causalConfidence], 0);
  const harm = option.maqasidImpacts
    .filter(m => m.direction === 'negative')
    .reduce((sum, m) => sum + m.magnitude * tierWeight[m.tier] * confidenceScore[m.causalConfidence], 0);
  return positive - harm;
}
```

**Hard constraints (filter before scoring):** an option that violates a *ḍarūrī* prohibition with *yaqīn*-level confidence is removed from the result set. The app shows it but labels it "filtered: violates a *ḍarūrī* prohibition under conditions of certainty."

**Niyya modifier:** applied *after* scoring, to the highest-scoring option only. Default 1.0; tension flagged → 0.7 with explanation; user explicitly indicates corrupt motivation → 0.0 with warning.

**Output classification:**
- **Settled** — top option exceeds runner-up by > 50% of runner-up's score, source convergence is high, niyya is clean.
- **Qualified disagreement** — multiple options within 20% of each other, OR known scholarly divergence (flagged in the source library).
- **Open** — literature too thin, or critical claims at *shakk* level.

### The deliberation dossier — output

A single screen, printable and exportable as JSON, containing:
- Case statement
- **Tetrad map**: for each option, four-axis evaluation (truth-claims with confidence, ethical considerations with basis, benefit calculus, intention check) — visualized as a small radar chart per option
- **Source map**: every source consulted, citation, the user's interpretation
- **Maqāṣid ranking**: visual showing which protected goods each option affects
- **Intention profile**: the user's Step 5 answers, presented as quoted reflection
- **Confidence class**: settled / qualified disagreement / open, prominently displayed
- **Recommended consultations**: in qualified-disagreement and open cases, suggest the type of scholar/expert to consult
- **Dissenting views**: even in settled cases, a "What this framework does not include" footer

---

## 4. Privacy and trust principles — encode these in code, not just policy

These are not optional. They are constitutive.

1. **Zero server.** No fetch() calls to any external endpoint in production. The build artifact is fully static.
2. **Zero analytics.** No Google Analytics, no Plausible, no PostHog, no Sentry, no nothing. If a feature requires telemetry, the feature does not ship.
3. **Zero CDN dependencies.** Inter font is locally hosted in `public/fonts/`. No Google Fonts CDN. (Privacy regulations in some EU jurisdictions classify Google Fonts CDN as a personal data transfer; we avoid it.)
4. **localStorage and IndexedDB only.** No cookies. No fingerprinting.
5. **Export/import.** User can export her full history as a JSON file at any time and import it on another device. This is the only "sync" mechanism.
6. **Privacy page (`/privacy`).** State all of the above plainly.
7. **Open source.** The repo is public. Anyone can verify the privacy claims by reading the code.

When the build runs, add a CI check (see §8) that fails if any production code contains a hardcoded URL to an analytics or telemetry endpoint.

---

## 5. Design system

### Typography
- **Inter** (locally hosted). Variable font, weights 400/500/600/700 used. Fallback: `-apple-system, BlinkMacSystemFont, sans-serif`.
- Base size 16px. Line-height 1.6 for body, 1.2 for headings.
- Headings use feature-settings: `'ss01' on, 'cv11' on` for the slightly more "Apple-like" Inter variant.
- Arabic text uses **Noto Naskh Arabic** (locally hosted), only on screens where Arabic appears. Auto-detect direction with `dir="auto"`.

### Color tokens (Tailwind config)

Light mode:
```
--background: 0 0% 100%        /* pure white */
--foreground: 240 10% 4%       /* near-black, slight cool */
--muted: 240 5% 96%
--muted-foreground: 240 4% 46%
--border: 240 6% 90%
--accent: 211 100% 50%         /* Apple-style blue, used sparingly */
--success: 142 71% 45%
--warning: 38 92% 50%
--destructive: 0 72% 51%
```

Dark mode:
```
--background: 240 10% 4%
--foreground: 0 0% 98%
--muted: 240 6% 10%
--muted-foreground: 240 5% 65%
--border: 240 6% 16%
--accent: 211 100% 60%
```

### Spacing and layout
- 8px base unit (Tailwind defaults work).
- Maximum content width 720px for prose, 960px for forms, 1200px for landing.
- Generous vertical rhythm — sections separated by 96px+ on desktop, 64px on mobile.
- Card components: 16px border radius, soft shadow `shadow-sm` light / no shadow dark with 1px border.

### Motion
- Page transitions: 200ms fade + 8px slide up.
- Step transitions in deliberation flow: 300ms with `ease-out`.
- Button hover: 150ms color/transform.
- **No spring animations. No bounces. No parallax.** Apple's HIG: motion serves comprehension or it does not appear.
- Respect `prefers-reduced-motion` — disable all but essential transitions.

### Components — Apple-vari conventions
- Buttons: pill-shaped (`rounded-full`) for primary actions, `rounded-lg` for secondary, no harsh borders, generous padding (`px-6 py-3`).
- Forms: labels above inputs, never floating; help text below, muted color; errors red but never aggressive.
- Cards: subtle border in light mode, slightly elevated background in dark mode. Never both border and shadow.
- Dialogs: centered, max-width 420px for confirms, 720px for full-content. Backdrop is true black at 40% opacity in light, 60% in dark.

---

## 6. The source library

`src/data/sources/` contains JSON files that drive Step 4. Build this carefully — wrong sources are worse than no sources.

### `quran.json` schema
```json
[
  {
    "id": "Q.17.81",
    "sura": 17,
    "aya": 81,
    "arabic": "وَقُلْ جَاءَ الْحَقُّ وَزَهَقَ الْبَاطِلُ ...",
    "transliteration": "Wa-qul jāʾa al-ḥaqqu wa-zahaqa al-bāṭilu ...",
    "translations": {
      "asad": "And say: 'The truth has now come, and falsehood has withered away ...'",
      "pickthall": "...",
      "diyanet": "..."
    },
    "tafsir_refs": [
      { "tafsir": "al-Razi", "ref": "Mafātīḥ al-Ghayb, vol. X, on Q. 17:81" }
    ],
    "themes": ["haqq", "truth", "batil"],
    "casePatterns": ["truth-disclosure", "honest-speech"]
  }
]
```

For Phase 4 (the source library page), seed at minimum these verses: **Q. 2:42, 2:147, 2:170, 2:275-280, 4:36, 4:135, 5:2, 5:8, 5:32, 5:90-91, 6:115, 6:152, 9:119, 10:36, 16:90, 16:106, 17:36, 17:81, 22:6, 22:62, 25:43, 33:72, 41:53, 49:6, 49:12, 51:56, 53:28, 92:20**. These are the verses cited in the paper plus a small set on truthfulness, justice, *amāna*, *taqwā* that any deliberation tool needs.

### `hadith.json` schema
```json
[
  {
    "id": "bukhari-1",
    "collection": "Bukhari",
    "book": "Bad' al-Wahy",
    "number": 1,
    "grade": "sahih",
    "narrator": "Umar ibn al-Khattab",
    "arabic": "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ ...",
    "transliteration": "Innamā al-aʿmālu bi-l-niyyāt ...",
    "translation": "Actions are only by intentions ...",
    "themes": ["niyya", "intention"],
    "casePatterns": ["any"]
  }
]
```

Seed minimum: the *niyya* hadith (Bukhari 1 / Muslim 1907), the change-evil hadith (Muslim 49), the *Ḥadīth Jibrīl* (Muslim 8), the "religion is sincere counsel" hadith (Muslim 55), and 5–10 others on truthfulness, justice, harm-prevention, and intention from the *Sahihayn*.

### `maqasid.json` schema
A small ontology of the protected goods, the three tiers, and the Tāhā axes, with i18n labels and tooltip explanations.

### `case-patterns.json`
A mapping from common case-patterns ("workplace honesty," "organ donation," "ribā-adjacent finance," "family conflict over religion," "professional opportunity vs. ethical concern," etc.) to the relevant source IDs. The matching algorithm in Step 4 is keyword-based for the MVP; it can be improved later.

**Important:** for the seed, use the worked examples from the paper's §7.5 as the first three case-patterns. Make them complete — every claim in the paper's worked example walkthrough should be reproducible by the actual app.

---

## 7. Build phases — commit at the end of each

Each phase ends with a single commit, descriptive message, no work-in-progress commits visible in history. Use `git add -A && git commit -m "Phase N: ..."`. Push after each phase.

### Phase 1: Foundation
**Goal:** repo bootstrapped, build pipeline working, deployed to GitHub Pages with a placeholder homepage.

- `npm create vite@latest .` (React + TypeScript, strict)
- Install: `tailwindcss postcss autoprefixer i18next react-i18next zustand dexie framer-motion react-router-dom lucide-react clsx tailwind-merge class-variance-authority`
- Configure `vite.config.ts` with `base: '/REPO_NAME/'` (replace with actual repo name) so GitHub Pages routing works
- Set up Tailwind with the design tokens from §5
- Install shadcn/ui via official CLI: `npx shadcn@latest init` (choose default colors, slate base, CSS variables yes)
- Add Inter and Noto Naskh Arabic fonts to `public/fonts/`, register with `@font-face` in `globals.css`
- Set up i18n with two empty namespace files for tr and en
- Create the Router and a placeholder Home page
- Configure GitHub Actions deployment (see §8)
- Ensure `npm run build && npm run preview` works locally
- Commit: `Phase 1: Foundation — Vite/React/TS/Tailwind/shadcn scaffolded, GitHub Pages deployment configured`

### Phase 2: Static content + design system
**Goal:** all the non-deliberation pages exist, fully styled, fully bilingual.

- Implement Header (logo, nav, language switch, theme toggle) and Footer
- Build pages: Home, About, Method, Sources (placeholder for now), History (empty state), Privacy
- Home: hero with the application's mission in one sentence, three explainer cards (truth / ethics / benefit), CTA to "Start a deliberation"
- About: who built this, why, the philosophical commitments — direct from the paper's introduction
- Method: explanation of the four-source framework, the five protected goods, the niyya hinge — with diagrams (use Framer Motion for entrance, simple SVG for the diagrams)
- Privacy: state the principles from §4 plainly
- Theme toggle works with `prefers-color-scheme` default and persists via localStorage
- Language switch: tr default; persists; respects `<html lang="...">` updates
- All copy translated for both languages, vocabulary from the paper's Turkish summary
- Commit: `Phase 2: Static content and design system — bilingual, themed, accessible`

### Phase 3: The deliberation flow
**Goal:** the five-step flow works end-to-end, produces a real dossier.

- Implement the full type system in `src/types/deliberation.ts`
- Build `src/lib/scoring.ts`, `classification.ts`, `constraints.ts` with unit tests (use Vitest)
- Build the five step components in `components/deliberation/`
- Build the Output (dossier) component with the radar chart per option (use Recharts or build a simple SVG component)
- Wire everything together in `pages/Deliberate.tsx` with a stepper UI
- Step transitions use Framer Motion
- State managed by Zustand store with localStorage persistence (so a refresh doesn't lose the in-progress deliberation)
- "Save draft" and "Save final" both write to Dexie via `lib/storage/history.ts`
- Implement export-as-JSON
- Implement import-from-JSON
- Add the "What this framework does not handle well" disclaimer at the bottom of every dossier
- Commit: `Phase 3: Deliberation flow — five-step procedure, scoring engine, dossier output, local persistence`

### Phase 4: Source library
**Goal:** Step 4 surfaces real sources; the Sources page lets users browse the library.

- Populate `data/sources/quran.json`, `hadith.json`, `maqasid.json` with the seed data from §6
- Build the case-pattern matching algorithm (keyword + theme matching for MVP)
- Wire Step 4 to surface matched sources with proper Arabic rendering (RTL, Noto Naskh Arabic font)
- Build the Sources page: searchable, filterable by theme, beautiful Arabic typography
- Each source has its own detail view with full citations, multiple translations, classical interpretive notes
- Each source detail view has a "When this source applies" section listing the case-patterns it bears on
- Commit: `Phase 4: Source library — Qur'an, hadith, and maqāṣid sources with case-pattern matching`

### Phase 5: Polish and accessibility
**Goal:** Lighthouse 95+ on all metrics, WCAG AA compliance, no jank.

- Run `npm run build` and audit bundle size; lazy-load heavy routes if total > 250KB initial
- Lighthouse audit (mobile + desktop) — target 95+ on all four metrics
- Accessibility audit: keyboard navigation works on every page, every interactive element has visible focus, every form input has a proper label, color contrast passes AA on both themes, screen reader works on the deliberation flow
- Add `prefers-reduced-motion` overrides
- Add a sitemap.xml and robots.txt
- Add OpenGraph and Twitter Card meta tags
- Add a 404 page in app style
- Test the full flow on mobile Safari, mobile Chrome, desktop Safari, desktop Chrome, desktop Firefox
- Commit: `Phase 5: Polish — accessibility, performance, cross-browser`

### Phase 6: Documentation
**Goal:** the repo is contributable; future developers and scholars can extend it.

- Write a thorough `README.md`: what this is, what it isn't, philosophical foundations (link to the paper), tech stack, how to run locally, how to deploy, how to contribute
- Write `CONTRIBUTING.md`: how to propose new sources, how to suggest case-patterns, how scholars can review and correct content
- Write `LICENSE` (recommend MIT or AGPL-3.0; ask user — AGPL is more aligned with the project's open-source-as-trust principle)
- Write `docs/scholar-review.md`: a workflow for qualified scholars to review the source library and submit corrections via PR
- Write `docs/architecture.md`: brief technical overview for new contributors
- Add issue templates: bug report, source correction, new case-pattern, philosophical/methodological objection
- Commit: `Phase 6: Documentation and contribution workflow`

---

## 8. GitHub Actions deployment

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - name: Privacy guard
        run: |
          # Fail the build if any production source contains analytics endpoints
          if grep -r -E "(google-analytics|googletagmanager|plausible\.io|posthog|sentry\.io|mixpanel)" src/ --include="*.ts" --include="*.tsx"; then
            echo "Privacy guard FAILED: analytics or telemetry endpoint detected in source"
            exit 1
          fi
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Add `package.json` scripts:
```json
"lint": "eslint src --max-warnings 0",
"test": "vitest run",
"test:watch": "vitest",
"typecheck": "tsc --noEmit"
```

In the GitHub repository settings, enable Pages with source set to "GitHub Actions."

For Vite + React Router on GitHub Pages: also add a `404.html` redirect trick (the standard SPA-on-Pages workaround) so that deep links work.

---

## 9. What this app must NEVER do

Encode these as both code-level checks and prominent UX:

1. **Never call something a *fatwā* or a religious ruling.** The output is always called a "deliberation map" or "structured reflection," never a verdict.
2. **Never hide qualified disagreement.** When the framework's honest output is "competent reasoners disagree," the app surfaces this prominently, not as fine print.
3. **Never collect user data on a server.** Privacy guard in CI enforces this.
4. **Never represent itself as a substitute for scholarly consultation.** Every qualified-disagreement and open-output dossier must include a recommendation to consult a qualified scholar, with clear language: "This is not a substitute for personal consultation."
5. **Never use AI/LLM features that require sending user data anywhere.** If you ever consider adding AI-generated content, it must be for *reading* the seed source library, not for processing user input. (A future version could include a local LLM integration but only if it runs entirely in-browser.)
6. **Never gamify the experience.** No streaks, no badges, no scores presented as "your wisdom rating." The deliberation is between the user and her conscience; the app is a mirror, not a coach.

---

## 10. Tone of UI copy

Take this seriously — the copy *is* the product as much as the algorithm.

- **Direct, unhurried, calm.** No marketing language. No exclamation marks. No emojis in production UI (an exception: the dossier may use one neutral icon per section header).
- **Second-person singular but respectful.** Turkish: *sen* form is fine but the register is high — formal but not stiff. English: "you," straightforward.
- **No technical jargon without explanation.** The first time *maqāṣid* appears in UI, it has a tooltip with a one-sentence definition. Same for *yaqīn*, *niyya*, *ḍarūrī*, *ḥājī*, *taḥsīnī*.
- **Non-coercive.** "You may want to consider..." not "You must consider..." The user is an adult.
- **Honest about limits.** Don't oversell. The app is a deliberation aid; it does not produce wisdom; the user does.
- **No theological assertions in the UI chrome.** The Method page can quote the paper, but the homepage tagline is not "The Islamic answer to deliberation." Something like "A structured space to think clearly about hard decisions" is right — it invites Muslim and non-Muslim readers equally.

Sample homepage tagline (English): *"A quiet place to think carefully about hard decisions."*
Turkish: *"Zor kararlar üzerinde dingin bir biçimde düşünmek için bir alan."*

The hero subhead can then say: *"Built on a multi-source framework drawing from analytic philosophy and classical Islamic intellectual tradition. Your data never leaves your device. Open source."*

---

## 11. Working style for Claude Code

- **Read the research paper first. Then plan. Then execute.**
- Work phase by phase. Do not jump ahead. Do not start Phase 3 features in Phase 2.
- At the end of each phase, run `npm run build && npm run typecheck && npm run lint && npm run test` and ensure all pass before committing.
- Use descriptive commit messages — they will be public.
- If something in this spec is unclear, **ask the user** before improvising. The user has already done substantial work on the philosophical framework; he doesn't want it inadvertently rewritten by the codegen process.
- If you find a bug or limitation in your own implementation, fix it before moving on. Do not paper over it with `// TODO`.
- Keep dependencies minimal. Each dependency added has a privacy and bundle-size cost. Justify additions.
- The user is technically literate (automation engineer) but does not want hand-holding for trivial decisions. Make decisions on file naming, internal architecture, component breakdown, etc., without asking. Save questions for genuine ambiguities.

---

## 12. Acceptance criteria — when is this "done"?

Phase 6 is complete and the app meets all of the following:

- [ ] Deployed to GitHub Pages, accessible publicly
- [ ] Both Turkish and English UI work end-to-end
- [ ] All five deliberation steps produce a coherent dossier
- [ ] The three worked examples from paper §7.5 can be reproduced exactly by entering the case data and stepping through
- [ ] Lighthouse: 95+ on Performance, Accessibility, Best Practices, SEO (mobile and desktop)
- [ ] Privacy guard CI check passes; no telemetry in source
- [ ] Export and import of dossiers as JSON works
- [ ] Light and dark modes both polished
- [ ] No console errors or warnings in any browser
- [ ] README, CONTRIBUTING, LICENSE all present and substantive
- [ ] Repo is publishable as a portfolio piece for a thoughtful engineer

---

## 13. Final note for Claude Code

This is the user's most important project of the year. The philosophical work behind it has been refined across many conversations and tested against primary sources. The user wants the application to be a faithful, beautiful, lasting expression of that work — something he can leave behind that helps people think more carefully.

Build it like that.

If you find yourself rushing, slow down. If you find yourself adding a feature the spec did not request, stop and ask. If you find a place where the spec contradicts itself, surface it.

When you finish a phase, write a short summary in the commit message of what you built and what's coming next. This is how the user (and any future contributor) will understand the history of the build.

Take care of the user's data. Take care of his text. Take care of the Arabic.

Begin Phase 1 when ready.
