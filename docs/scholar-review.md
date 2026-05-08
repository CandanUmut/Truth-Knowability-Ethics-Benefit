# Scholar Review Workflow

The seed source library in `src/data/sources/` is a first pass by the framework team. Its accuracy is essential to the application's value; its current state is unverified. This document describes how qualified scholars can review and correct the library.

## Why scholar review matters

The deliberation tool's Step 4 surfaces Qur'ānic verses, hadiths, and classical sources to users at the moment they are deciding how to act. If the surfaced material is mis-cited, mis-translated, or mis-classified, real people will reason from corrupted material. The application acknowledges this responsibility — every entry in the seed dataset carries `reviewStatus: "seed"`, every Sources page footer announces the seed status, and the application's design principles (§7.4 of the paper) require honest disclosure of the framework's limits.

Scholar review converts seed entries into reviewed and verified entries. The application's UI shows the current status of every source, and search results from the library will eventually allow the user to filter by review status.

---

## Scope of review

The seed library covers:

| Asset | Path | Scope |
|-------|------|-------|
| Qur'ān | `src/data/sources/quran.json` | 26 verses; the spec's required minimum |
| Hadith | `src/data/sources/hadith.json` | 8 entries from the Sahihayn and Sunan |
| Maqāṣid ontology | `src/data/sources/maqasid.json` | The classical five + the three Tāhā axes |
| Case-patterns | `src/data/case-patterns.json` | 14 patterns mapping keywords to source IDs |

Each source entry has the following review-relevant fields:

- **`arabic`** — the Arabic text. Errors here are the most consequential.
- **`transliteration`** — IJMES transliteration of the Arabic.
- **`translations.pickthall`** / `.diyanet` / `.sahihInt` / `.en` / `.tr` — the published translations as cited. Corrections should bring the text closer to the published edition.
- **`themes`** — informal tags driving search and pattern matching.
- **`casePatterns`** — explicit pattern bindings used by Step 4's matcher.
- **`tafsirRefs`** *(Qur'ān only)* — classical *tafsīr* references for context.
- **`assertionStrength`** — `qatʿi` (decisive) or `zanni` (open to interpretive variation).
- **`grade`** *(hadith only)* — sahih / hasan / daif / mursal / mawduʿ.
- **`reviewStatus`** — `seed` / `reviewed` / `verified`.
- **`translatorNote`** — explanatory note when the translation is paraphrased rather than verbatim from the named translator.

Reviewer corrections to any of these are welcome.

---

## Reviewer profile

A productive review is most likely to come from someone with at least one of:

- A degree (or equivalent classical formation) in *uṣūl al-fiqh*, *tafsīr*, *ʿulūm al-ḥadīth*, or *maqāṣid* studies.
- Demonstrated publishing history in Islamic ethics, comparative philosophy of religion, or Qur'ānic / hadith studies.
- Prior work on a published critical translation of the Qur'ān or a hadith collection.

Reviewers who do not meet these criteria are still welcome to flag *suspected* errors via issues, which a qualified reviewer can then triage.

---

## Workflow

### 1. Open or claim an issue

Existing review issues live under the **Source correction** template. If your suggested correction does not have an open issue, file one before making the change. The issue should:

- name the source ID (e.g. `Q.5.8` or `bukhari.1`);
- name the field being corrected (e.g. `arabic`, `translations.diyanet`, `assertionStrength`);
- state the proposed correction;
- cite the published edition or critical reference being followed (e.g. "Mushaf al-Madinah, 1985 edition" or "Pickthall, *The Meaning of the Glorious Koran*, Knopf, 1930").

### 2. Branch and edit

Branch from `main`, named `review/<source-id>` or `review/<topic>`. Keep one logical correction per PR — bundling many independent corrections in one PR makes review harder.

When editing a source entry, also:

- update `reviewStatus`:
  - `"seed"` → `"reviewed"` when a qualified scholar has signed off on the correction;
  - `"reviewed"` → `"verified"` when a senior reviewer (a recognized authority in the relevant sub-discipline) has independently confirmed.
- if you add a `translatorNote`, keep it brief and factual.

### 3. Open the PR

Use the PR template. Include in the body:

- the source ID and field changed;
- the published reference;
- the reviewer's qualification (in one sentence);
- a brief explanation of *why* the correction matters for users of Step 4.

The framework team reads every review PR. Substantive changes are merged. Where the team disagrees with a proposed correction, the disagreement is recorded in the PR thread and (where appropriate) preserved as a `translatorNote` so future readers see both readings.

### 4. After merge

The corrected entry ships in the next deployment to GitHub Pages. The `reviewStatus` field is visible to users on the Sources page, so reviewers' contributions are public-facing.

---

## What we will *not* do

- We will not produce a single "official" reading of contested verses or hadiths. The application's design principle (§7.4) requires that qualified disagreement be surfaced rather than collapsed.
- We will not strip out classical interpretive traditions to favor a modernist reading, or vice versa. Where two well-supported readings exist, we will record both.
- We will not accept reviewer changes that are not anchored in published sources. "I think the better reading is…" is not enough — the citation must be traceable.

---

## Open questions for senior reviewers

Some review-design questions remain genuinely open. Senior reviewers' input on these would shape the project:

1. **Should hadith grades be conservative (the Sahihayn baseline) or critical (e.g. al-Albānī's gradings, where they diverge)?** The seed defaults to the Sahihayn-baseline grades.
2. **Should *qaṭʿī*/*ẓannī* be encoded at the source level (as it currently is) or at the source-on-this-pattern level (since some otherwise *qaṭʿī* texts are *ẓannī* in their application to a particular case)?** The seed encodes at the source level for simplicity.
3. **Should the *tafsīr* references be expanded (e.g. add Ibn Kathīr, al-Qurṭubī, al-Bayḍāwī, Sayyid Quṭb, Tāhā ʿAbd al-Raḥmān where relevant) or kept minimal (the paper's references only)?** The seed is currently minimal.
4. **Should Twelver Shīʿī sources be added explicitly, or kept implicit through the framework's general principle of presenting major interpretive traditions?** The seed is Sunni-leaning by default.

We welcome reviewers' positions on these and will revise the schema if the answers warrant.

---

## Contact

For questions on the workflow itself, open an issue with the `meta` label. For substantive reviews, follow the four steps above.
