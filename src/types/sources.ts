/**
 * Types for the source library — Qur'ān, hadith, classical maqāṣid texts.
 *
 * Each entry carries a `reviewStatus` field so that Phase 6's scholar-review
 * workflow (docs/scholar-review.md) can distinguish seed entries (the
 * framework team's first pass) from entries verified by a qualified scholar.
 */

export type ReviewStatus = 'seed' | 'reviewed' | 'verified';

export type AssertionStrength = 'qatʿi' | 'zanni';

export type CasePattern =
  | 'truth-disclosure'
  | 'honest-speech'
  | 'workplace-honesty'
  | 'organ-donation'
  | 'riba-finance'
  | 'family-conflict'
  | 'professional-ethics'
  | 'whistleblowing'
  | 'medical-decision'
  | 'inheritance-property'
  | 'religious-obligation'
  | 'community-harm'
  | 'sincerity-intention'
  | 'general';

export interface QuranVerse {
  id: string; // e.g. "Q.5.8"
  sura: number;
  aya: number;
  arabic: string;
  transliteration: string;
  translations: {
    /** English — Pickthall (1930), public domain in most jurisdictions. */
    pickthall?: string;
    /** English — Sahih International, used widely; cited in good faith. */
    sahihInt?: string;
    /** Turkish — Diyanet İşleri Başkanlığı (Turkish Religious Affairs). */
    diyanet?: string;
  };
  /** Tags that drive the case-pattern matcher. */
  themes: string[];
  /** Explicit case-pattern bindings (broader than themes). */
  casePatterns: CasePattern[];
  /** Classical tafsīr references for Phase 6 deepening. */
  tafsirRefs?: { tafsir: string; ref: string }[];
  /** qaṭʿī = decisive textual indication; ẓannī = open to interpretive variation. */
  assertionStrength: AssertionStrength;
  reviewStatus: ReviewStatus;
  /** Translator note when verbatim attribution would be inaccurate. */
  translatorNote?: string;
}

export interface Hadith {
  id: string; // e.g. "bukhari.1"
  collection: 'Bukhari' | 'Muslim' | 'Tirmidhi' | 'Abu Dawud' | 'Nasai' | 'Ibn Majah' | 'Malik';
  book?: string;
  number: number | string;
  /** Authenticity grade. The Sahihayn (Bukhari + Muslim) are sahih by default. */
  grade: 'sahih' | 'hasan' | 'daif' | 'mursal' | 'mawduʿ';
  narrator: string;
  arabic: string;
  transliteration: string;
  translations: {
    en?: string;
    tr?: string;
  };
  themes: string[];
  casePatterns: CasePattern[];
  assertionStrength: AssertionStrength;
  reviewStatus: ReviewStatus;
  translatorNote?: string;
}

export interface MaqsidEntry {
  id: 'din' | 'nafs' | 'aql' | 'nasl' | 'mal' | 'vital' | 'rational' | 'spiritual';
  family: 'classical-five' | 'taha-axis';
  arabic: string;
  /** i18n keys in deliberate.maqasid / deliberate.taha. */
  i18nKey: string;
  description: string;
}

export interface CasePatternBinding {
  pattern: CasePattern;
  /** Keywords (any language) that suggest this pattern when present in the case description. */
  keywords: string[];
  /** Source IDs (Quran or hadith) to surface for this pattern. */
  sourceIds: string[];
}

export type AnySource =
  | { kind: 'quran'; data: QuranVerse }
  | { kind: 'hadith'; data: Hadith };
