/**
 * Scoring engine. Implements paper §7.2 verbatim:
 *
 *   Option_score =
 *     Σ over implicated maqāṣid (impact × tier_weight × causal_confidence)
 *   − Σ over harm vectors (harm × tier_weight × causal_confidence)
 *
 * positive impacts contribute to rawPositive; negative impacts to rawNegative.
 * Tāhā axis impacts (vital / rational / spiritual) are aggregated identically.
 */
import {
  CONFIDENCE_SCORE,
  TIER_WEIGHT,
  type DeliberationOption,
  type MaqsidImpact,
  type TahaImpact,
  type OptionScore,
} from '@/types/deliberation';

function impactValue(impact: MaqsidImpact | TahaImpact): number {
  return impact.magnitude * TIER_WEIGHT[impact.tier] * CONFIDENCE_SCORE[impact.causalConfidence];
}

export function scoreOption(option: DeliberationOption): Omit<OptionScore, 'finalScore' | 'niyyaMultiplier' | 'filtered' | 'filterReason'> {
  const allImpacts: Array<MaqsidImpact | TahaImpact> = [
    ...option.maqasidImpacts,
    ...option.tahaImpacts,
  ];

  let rawPositive = 0;
  let rawNegative = 0;
  for (const impact of allImpacts) {
    if (impact.direction === 'positive') {
      rawPositive += impactValue(impact);
    } else if (impact.direction === 'negative') {
      rawNegative += impactValue(impact);
    }
  }
  return {
    optionId: option.id,
    rawPositive,
    rawNegative,
    rawScore: rawPositive - rawNegative,
  };
}
