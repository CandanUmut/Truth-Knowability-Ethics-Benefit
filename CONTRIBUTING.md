# Contributing

Thank you for considering a contribution. This project's value depends on careful review by people whose judgment matters — engineers, philosophers, and qualified scholars. The most useful contributions are those that improve the framework's faithfulness to the paper, the source library's accuracy, or the application's privacy posture.

## Ground rules

1. **Read the paper first.** The application implements a specific philosophical framework. Suggested changes should be motivated by the framework, not by ergonomic preferences alone. The canonical reference is [`research/truth-ethics-benefit-preprint.md`](research/truth-ethics-benefit-preprint.md).
2. **Privacy is constitutive, not optional.** PRs that add analytics, telemetry, server-side state, third-party CDNs, cookies, or any "phone home" behavior will be declined. The CI privacy guard exists to catch these automatically.
3. **No fatwā features.** The application returns a deliberation map, never a verdict. PRs that move the output toward authoritative pronouncement (e.g. "the answer is X") miss the framework's design principles in §7.4.
4. **Surface qualified disagreement; do not collapse it.** If a contested matter has competent scholars on both sides, the application should present the disagreement honestly.
5. **Explanatory commits.** Each PR should include a clear, multi-paragraph commit message explaining *why* — what the framework requires, what the change does, and what remains open.

---

## Contribution kinds

### A. Code contributions

- Branch from `main`, open a PR against `main`.
- Run before pushing:
  ```bash
  npm run typecheck
  npm run lint
  npm run test
  npm run build
  ```
  All four must pass with zero errors and zero warnings (lint is `--max-warnings 0`).
- Keep dependencies minimal. Each new dependency carries a privacy and bundle-size cost.
- TypeScript is strict mode. Do not introduce `any`. The ESLint config enforces this.
- UI changes should respect the design tokens in `tailwind.config.ts` and `src/styles/globals.css`. Add new tokens rather than ad-hoc colors.
- Bilingual coverage is required. Every user-facing string lives in `src/locales/{tr,en}/<namespace>.json`. PRs that add only one language will be asked to add the other.
- Prefer editing existing components to adding new abstractions. Three similar lines is better than a premature wrapper.

### B. Source-library corrections

The seed source library in `src/data/sources/` is a first pass. We welcome corrections from qualified scholars on:

- Arabic vocalization or wording errors;
- Translation accuracy (Pickthall is the named English source for Qur'ān, Diyanet for Turkish — corrections that hew closer to those should cite the published edition);
- *Isnād* and authenticity grading on hadith;
- *Qaṭʿī* / *ẓannī* assertion-strength labels;
- *Tafsīr* references (extending or correcting the references in `tafsirRefs`);
- Theme tags and case-pattern bindings (the matcher is keyword-based; better tags improve recall).

The detailed scholar workflow is in [`docs/scholar-review.md`](docs/scholar-review.md). Corrections should change `reviewStatus` from `"seed"` to `"reviewed"` once a qualified scholar has signed off, and to `"verified"` once a senior reviewer confirms.

### C. New case-patterns

`src/data/case-patterns.json` maps user-typed keywords (in either language) to source IDs. To suggest a new pattern, open an issue using the **New case-pattern** template. Include:

- The pattern's name (kebab-case, e.g. `marriage-of-convenience`),
- A sample of representative case descriptions (English and Turkish),
- The set of source IDs you propose to surface,
- Reasoning for the inclusion of each source.

Patterns that overlap with existing ones can be merged or left distinct depending on the matcher's recall in practice.

### D. Methodological / philosophical objections

Open an issue using the **Philosophical objection** template. State:

- The framework's commitment you take to be unsound (one of the six in `method` page, or a general claim);
- Your reading of the paper passage that the commitment rests on;
- The counterexample, alternative reading, or steel-man challenge;
- What you propose should change in the application as a consequence.

We will engage seriously. The framework is committed but not infallible; §6 of the paper already reports one stress (slavery and abolition) where the framework strains. Other strains may exist.

---

## Style notes

- **Commit messages** describe *why* before *what*. The reader is a future contributor (or scholar) trying to reconstruct your reasoning. The reasoning matters more than the diff.
- **No emoji in production UI.** Internal docs may use them sparingly.
- **Be honest about uncertainty.** Mark seed entries as `reviewStatus: "seed"`. Annotate translations with `translatorNote` when verbatim attribution would be inaccurate.
- **Tone of UI copy is set in [`CLAUDE_CODE_PROMPT.md`](CLAUDE_CODE_PROMPT.md) §10.** Direct, unhurried, calm. No marketing language. No exclamation marks. Non-coercive ("you may want to consider…", not "you must consider…").

---

## Filing issues

The project uses the templates in `.github/ISSUE_TEMPLATE/` to keep issues actionable. The four kinds:

- **Bug report** — something the application does that contradicts its specification or the paper.
- **Source correction** — Arabic, transliteration, translation, *isnād*, or grading correction.
- **New case-pattern** — a class of cases the matcher should learn to surface.
- **Philosophical / methodological objection** — a claim that the framework or its operationalization is unsound.

If your issue does not fit any of these, open a blank issue and describe what kind of contribution you intend.

## Code of conduct

This project deals with subject matter many people care deeply about. Disagreements about Qur'ānic interpretation, hadith authenticity, *uṣūl al-fiqh*, secular ethics, and engineering trade-offs are real and welcome. Hostility, bad faith, or attempts to silence others are not. Be charitable. Steel-man before critique. The framework itself models this in §6.

---

## License

Contributions are licensed under Apache-2.0, the same license as the project. See [`LICENSE`](LICENSE).
