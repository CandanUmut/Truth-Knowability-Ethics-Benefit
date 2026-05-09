/**
 * Type system for the Truth-Ethics-Benefit deliberation framework.
 * The vocabulary follows §7 of the working paper exactly.
 */

export type Confidence = 'yaqin' | 'zann_strong' | 'zann' | 'shakk' | 'jahl';

export const CONFIDENCE_SCORE: Record<Confidence, number> = {
  yaqin: 1.0,
  zann_strong: 0.7,
  zann: 0.5,
  shakk: 0.3,
  jahl: 0.0,
};

export type Tier = 'daruri' | 'haji' | 'tahsini';

export const TIER_WEIGHT: Record<Tier, number> = {
  daruri: 3,
  haji: 2,
  tahsini: 1,
};

export type Maqsad = 'din' | 'nafs' | 'aql' | 'nasl' | 'mal';
export const MAQASID: readonly Maqsad[] = ['din', 'nafs', 'aql', 'nasl', 'mal'] as const;

export type TahaAxis = 'vital' | 'rational' | 'spiritual';
export const TAHA_AXES: readonly TahaAxis[] = ['vital', 'rational', 'spiritual'] as const;

export type EvidentialBasis =
  | 'sense'
  | 'demonstrative'
  | 'tawatur'
  | 'single_source'
  | 'cumulative'
  | 'intuition'
  | 'none';

/** Default mapping from evidential basis to a suggested confidence class. */
export const BASIS_DEFAULT_CONFIDENCE: Record<EvidentialBasis, Confidence> = {
  sense: 'yaqin',
  demonstrative: 'yaqin',
  tawatur: 'yaqin',
  cumulative: 'zann_strong',
  single_source: 'zann',
  intuition: 'shakk',
  none: 'jahl',
};

export type Direction = 'positive' | 'negative' | 'neutral';

export type AgentKind = 'self' | 'family' | 'employer' | 'community' | 'society' | 'other';

export type TimeHorizon = 'hours' | 'days' | 'weeks' | 'months' | 'years';

export type AffectedParty = 'self' | 'family' | 'community' | 'society';
export const AFFECTED_PARTIES: readonly AffectedParty[] = ['self', 'family', 'community', 'society'] as const;

export type Magnitude = 1 | 2 | 3 | 4 | 5;
export type Reversibility = 1 | 2 | 3 | 4 | 5;
export type Stake = 1 | 2 | 3 | 4 | 5;

export interface MaqsidImpact {
  id: string;
  maqsad: Maqsad;
  direction: Direction;
  tier: Tier;
  magnitude: Magnitude;
  causalConfidence: Confidence;
  affected: AffectedParty[];
  notes?: string;
}

export interface TahaImpact {
  id: string;
  axis: TahaAxis;
  direction: Direction;
  tier: Tier;
  magnitude: Magnitude;
  causalConfidence: Confidence;
}

export interface DeliberationOption {
  id: string;
  label: string;
  description?: string;
  isInaction?: boolean;
  maqasidImpacts: MaqsidImpact[];
  tahaImpacts: TahaImpact[];
}

export interface CaseAgent {
  id: string;
  kind: AgentKind;
  label?: string;
}

export interface DeliberationCase {
  description: string;
  agents: CaseAgent[];
  options: DeliberationOption[];
  timeHorizon: TimeHorizon | null;
  reversibility: Reversibility | null;
  stakes: {
    maqasid: Partial<Record<Maqsad, Stake>>;
    taha: Partial<Record<TahaAxis, Stake>>;
  };
}

export interface TruthClaim {
  id: string;
  text: string;
  basis: EvidentialBasis | null;
  confidence: Confidence | null;
  sensitivity: boolean;
}

export interface SourceConsultation {
  id: string;
  /** Source library id (Phase 4) or free-text identifier the user typed. */
  sourceId: string;
  /** Human-readable label shown to the user when this is a free-text source. */
  citation?: string;
  bearsOnCase: 'yes' | 'no' | 'unsure' | null;
  reasoning?: string;
  /** If user is following a minority position on this source. */
  followsMinority?: boolean;
  minorityReasoning?: string;
}

export interface NiyyaCheck {
  /** Primary outcome the user most wants, prior to moral analysis. */
  q1: string;
  /** Would I still choose this if a major worldly benefit were removed? */
  q2: string;
  /** What would I not want others to know about my motivation? */
  q3: string;
  /** What would I say to a person I respect for sincerity? */
  q4: string;
  /** What does conscience report when imagining this choice before God? */
  q5: string;
  /** Tone variant for q5. The paper offers a secular-friendly variant ("kendi vicdanım önünde"). */
  toneVariant?: 'religious' | 'secular';
  /** Self-reported flag that the user judges their own motivation corrupt. */
  selfReportedCorrupt?: boolean;
  /** Optional note: which option does the user feel drawn to before scoring? */
  leaningOptionId?: string;
}

export type DeliberationStatus = 'draft' | 'final';

/**
 * Quick = a single-screen Express path that auto-derives maqāṣid impacts
 * from the case + option text and surfaces a heuristic dossier.
 * Deep = the original five-step flow with explicit weighting at every axis.
 *
 * Older deliberations (before this field existed) are treated as 'deep'.
 */
export type DeliberationMode = 'quick' | 'deep';

export type ClassificationClass = 'settled' | 'qualified_disagreement' | 'open';

export interface OptionScore {
  optionId: string;
  rawPositive: number;
  rawNegative: number;
  rawScore: number;
  /** True if hard-constraint filter applied. */
  filtered: boolean;
  filterReason?: string;
  /** Multiplier from niyya check (only applied to top option). */
  niyyaMultiplier: number;
  finalScore: number;
}

export interface DeliberationResult {
  scores: OptionScore[];
  classification: ClassificationClass;
  classificationReason: string;
  /** Top option id (after filtering and niyya modifier). */
  topOptionId: string | null;
  /** Recommended consultation messages (i18n keys + interpolation values). */
  recommendations: string[];
  /** Whether top option score exceeds runner-up by > T1 (50% by default). */
  scoreGapPasses: boolean;
  /** True if the user's stated leaning conflicts with the top scoring option. */
  niyyaTension: boolean;
}

export interface Deliberation {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: DeliberationStatus;
  /** Optional human-friendly title supplied by user, defaults to a short slice of the case. */
  title?: string;
  /** Path the user took. Undefined = legacy deep-mode deliberation. */
  mode?: DeliberationMode;
  case: DeliberationCase;
  claims: TruthClaim[];
  consultations: SourceConsultation[];
  niyya: NiyyaCheck;
  result?: DeliberationResult;
}

/** Empty defaults used when starting a new deliberation. */
export function emptyNiyya(): NiyyaCheck {
  return {
    q1: '',
    q2: '',
    q3: '',
    q4: '',
    q5: '',
    toneVariant: 'religious',
  };
}

export function emptyCase(): DeliberationCase {
  return {
    description: '',
    agents: [],
    options: [],
    timeHorizon: null,
    reversibility: null,
    stakes: { maqasid: {}, taha: {} },
  };
}
