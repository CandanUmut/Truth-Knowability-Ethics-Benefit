/**
 * Plain-language consequence catalog used by Step 3.
 *
 * Each entry is an everyday phrasing of a possible harm or help; the
 * application maps it transparently to the underlying maqāṣid / Tāhā
 * schema so the engine receives the same data structure as the original
 * technical form. The user never sees the underlying terms unless she
 * opens the glossary.
 */
import type { Maqsad, TahaAxis } from '@/types/deliberation';

export interface ConsequenceTemplate {
  id: string;
  /** i18n key under deliberate.consequence.<harm|help>.<id>. */
  i18nLabel: string;
  i18nDesc: string;
  /** When set, creates a MaqsidImpact for this maqsad. */
  maqsad?: Maqsad;
  /** When set, creates a TahaImpact for this axis. */
  taha?: TahaAxis;
}

/**
 * Severity → tier heuristic. Magnitude 4-5 (a lot / severe) implies a
 * ḍarūrī-tier impact; 2-3 (a little / somewhat) implies ḥājī; 1 (hardly)
 * implies taḥsīnī. This is the bridge between the plain-language scale
 * the user sees and the tier_weight in the scoring formula.
 */
export function tierForMagnitude(magnitude: 1 | 2 | 3 | 4 | 5): 'daruri' | 'haji' | 'tahsini' {
  if (magnitude >= 4) return 'daruri';
  if (magnitude >= 2) return 'haji';
  return 'tahsini';
}

/**
 * Plain-language sureness → Confidence enum. The PlainScale "sureness"
 * variant uses 1=No idea, 5=Certain, mapped to the §7.2 confidence scale.
 */
export const SURENESS_TO_CONFIDENCE: Record<1 | 2 | 3 | 4 | 5, 'jahl' | 'shakk' | 'zann' | 'zann_strong' | 'yaqin'> = {
  1: 'jahl',
  2: 'shakk',
  3: 'zann',
  4: 'zann_strong',
  5: 'yaqin',
};

export const HARM_CONSEQUENCES: ConsequenceTemplate[] = [
  {
    id: 'risk_life',
    i18nLabel: 'consequence.harm.risk_life.label',
    i18nDesc: 'consequence.harm.risk_life.desc',
    maqsad: 'nafs',
  },
  {
    id: 'damage_integrity',
    i18nLabel: 'consequence.harm.damage_integrity.label',
    i18nDesc: 'consequence.harm.damage_integrity.desc',
    maqsad: 'din',
  },
  {
    id: 'mind_wellbeing',
    i18nLabel: 'consequence.harm.mind_wellbeing.label',
    i18nDesc: 'consequence.harm.mind_wellbeing.desc',
    maqsad: 'aql',
  },
  {
    id: 'family_future',
    i18nLabel: 'consequence.harm.family_future.label',
    i18nDesc: 'consequence.harm.family_future.desc',
    maqsad: 'nasl',
  },
  {
    id: 'money_property',
    i18nLabel: 'consequence.harm.money_property.label',
    i18nDesc: 'consequence.harm.money_property.desc',
    maqsad: 'mal',
  },
  {
    id: 'spiritual_cost',
    i18nLabel: 'consequence.harm.spiritual_cost.label',
    i18nDesc: 'consequence.harm.spiritual_cost.desc',
    taha: 'spiritual',
  },
  {
    id: 'lost_opportunity',
    i18nLabel: 'consequence.harm.lost_opportunity.label',
    i18nDesc: 'consequence.harm.lost_opportunity.desc',
    taha: 'rational',
  },
];

export const HELP_CONSEQUENCES: ConsequenceTemplate[] = [
  {
    id: 'protect_life',
    i18nLabel: 'consequence.help.protect_life.label',
    i18nDesc: 'consequence.help.protect_life.desc',
    maqsad: 'nafs',
  },
  {
    id: 'serve_integrity',
    i18nLabel: 'consequence.help.serve_integrity.label',
    i18nDesc: 'consequence.help.serve_integrity.desc',
    maqsad: 'din',
  },
  {
    id: 'support_wellbeing',
    i18nLabel: 'consequence.help.support_wellbeing.label',
    i18nDesc: 'consequence.help.support_wellbeing.desc',
    maqsad: 'aql',
  },
  {
    id: 'serve_family',
    i18nLabel: 'consequence.help.serve_family.label',
    i18nDesc: 'consequence.help.serve_family.desc',
    maqsad: 'nasl',
  },
  {
    id: 'gain_resources',
    i18nLabel: 'consequence.help.gain_resources.label',
    i18nDesc: 'consequence.help.gain_resources.desc',
    maqsad: 'mal',
  },
  {
    id: 'spiritual_growth',
    i18nLabel: 'consequence.help.spiritual_growth.label',
    i18nDesc: 'consequence.help.spiritual_growth.desc',
    taha: 'spiritual',
  },
  {
    id: 'rational_growth',
    i18nLabel: 'consequence.help.rational_growth.label',
    i18nDesc: 'consequence.help.rational_growth.desc',
    taha: 'rational',
  },
];

export function findConsequence(id: string): ConsequenceTemplate | undefined {
  return [...HARM_CONSEQUENCES, ...HELP_CONSEQUENCES].find((c) => c.id === id);
}
