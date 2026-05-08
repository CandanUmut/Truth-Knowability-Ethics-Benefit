/**
 * Niyya modifier. Paper §7.2 — applied AFTER scoring, only to the top option.
 *
 *   - clean alignment              → multiplier 1.0
 *   - tension (stated direction != top option, OR weak self-reflection) → 0.7
 *   - self-reported corrupt motivation → 0.0
 */
import type { NiyyaCheck, OptionScore } from '@/types/deliberation';

export interface NiyyaAssessment {
  multiplier: number;
  reason: 'clean' | 'tension' | 'corrupt';
  /** If true, the stated leaning differed from the top scoring option. */
  leaningTension: boolean;
}

const CLEAN = 1.0;
const TENSION = 0.7;
const CORRUPT = 0.0;

/**
 * Return the niyya multiplier and reason for a given top option.
 * `niyya.leaningOptionId`, when present, is compared to topOptionId to detect
 * the tension the paper flags in §7.1.
 */
export function assessNiyya(
  niyya: NiyyaCheck,
  topOptionId: string | null
): NiyyaAssessment {
  if (niyya.selfReportedCorrupt) {
    return { multiplier: CORRUPT, reason: 'corrupt', leaningTension: false };
  }
  const leaningTension =
    !!niyya.leaningOptionId && !!topOptionId && niyya.leaningOptionId !== topOptionId;
  if (leaningTension) {
    return { multiplier: TENSION, reason: 'tension', leaningTension: true };
  }
  return { multiplier: CLEAN, reason: 'clean', leaningTension: false };
}

/** Apply niyya multiplier to the top non-filtered option, in place. */
export function applyNiyyaToScores(
  scores: OptionScore[],
  niyya: NiyyaCheck
): { topOptionId: string | null; assessment: NiyyaAssessment } {
  const eligible = scores.filter((s) => !s.filtered);
  if (eligible.length === 0) {
    return {
      topOptionId: null,
      assessment: { multiplier: CLEAN, reason: 'clean', leaningTension: false },
    };
  }

  let topIdx = 0;
  for (let i = 1; i < eligible.length; i++) {
    if (eligible[i].rawScore > eligible[topIdx].rawScore) {
      topIdx = i;
    }
  }
  const topOption = eligible[topIdx];
  const assessment = assessNiyya(niyya, topOption.optionId);

  for (const s of scores) {
    if (s.optionId === topOption.optionId && !s.filtered) {
      s.niyyaMultiplier = assessment.multiplier;
      s.finalScore = s.rawScore * assessment.multiplier;
    } else {
      s.niyyaMultiplier = 1.0;
      s.finalScore = s.filtered ? 0 : s.rawScore;
    }
  }
  return { topOptionId: topOption.optionId, assessment };
}
