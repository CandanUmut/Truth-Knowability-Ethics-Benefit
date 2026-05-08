/**
 * Hard constraints — paper §7.2.
 *
 *   Before scoring, the algorithm checks whether any option violates a ḍarūrī
 *   prohibition with high (yaqīn) confidence. If so, the option is filtered:
 *   it is not returned to the user as a permissible choice.
 *
 * In practice we surface filtered options in the dossier (so the user sees
 * what was considered and why), but they cannot win the calculus.
 */
import type { DeliberationOption, OptionScore } from '@/types/deliberation';

export interface FilterResult {
  filtered: boolean;
  reason?: string;
}

/**
 * Returns whether an option violates a ḍarūrī prohibition under yaqīn-level
 * confidence. The signal: any negative impact on a ḍarūrī good with
 * causalConfidence === 'yaqin' AND magnitude >= 4 (severe).
 *
 * Magnitude < 4 is read as a manageable cost, not a clear violation.
 * Confidence below yaqīn is read as ẓann — the paper requires *certainty*
 * before the hard-constraint filter applies.
 */
export function evaluateHardConstraints(option: DeliberationOption): FilterResult {
  for (const impact of option.maqasidImpacts) {
    if (
      impact.direction === 'negative' &&
      impact.tier === 'daruri' &&
      impact.causalConfidence === 'yaqin' &&
      impact.magnitude >= 4
    ) {
      return {
        filtered: true,
        reason: `daruri.${impact.maqsad}`,
      };
    }
  }
  return { filtered: false };
}

/** Apply hard constraints across all options and return per-option filter state. */
export function applyHardConstraints(
  options: DeliberationOption[]
): Map<string, FilterResult> {
  const result = new Map<string, FilterResult>();
  for (const option of options) {
    result.set(option.id, evaluateHardConstraints(option));
  }
  return result;
}

/** True if every score belongs to a filtered option. */
export function allFiltered(scores: OptionScore[]): boolean {
  return scores.length > 0 && scores.every((s) => s.filtered);
}
