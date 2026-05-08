/**
 * Output classification. Paper §7.2:
 *
 *   - Settled: top option exceeds runner-up by > T1 (default 50% of runner-up's
 *              score), source convergence high, niyya clean.
 *   - Qualified disagreement: multiple options within T2 (default 20% of each
 *              other), or known scholarly divergence flagged in the source library.
 *   - Open: literature too thin, OR critical claims at shakk level.
 */
import {
  CONFIDENCE_SCORE,
  type ClassificationClass,
  type Deliberation,
  type DeliberationResult,
  type OptionScore,
  type TruthClaim,
} from '@/types/deliberation';
import { applyHardConstraints, allFiltered } from './constraints';
import { scoreOption } from './scoring';
import { applyNiyyaToScores } from './niyya';

export const T1 = 0.5; // settled threshold: top exceeds runner-up by > 50%
export const T2 = 0.2; // qualified-disagreement threshold: within 20%

interface ClassifyInputs {
  scores: OptionScore[];
  topOptionId: string | null;
  claims: TruthClaim[];
  /** True if any consulted source is marked as having scholarly divergence. */
  scholarlyDivergence?: boolean;
}

export interface ClassifyOutcome {
  classification: ClassificationClass;
  classificationReason: string;
  scoreGapPasses: boolean;
}

/**
 * Pure-data classifier. The `_reason` strings are i18n keys, not natural-language
 * messages, so the UI can render them in either language.
 */
export function classify({
  scores,
  topOptionId,
  claims,
  scholarlyDivergence,
}: ClassifyInputs): ClassifyOutcome {
  if (allFiltered(scores)) {
    return {
      classification: 'open',
      classificationReason: 'reason.allFiltered',
      scoreGapPasses: false,
    };
  }

  const sensitiveWeak = claims.filter(
    (c) => c.sensitivity && c.confidence !== null && CONFIDENCE_SCORE[c.confidence] <= 0.3
  );
  if (sensitiveWeak.length > 0) {
    return {
      classification: 'open',
      classificationReason: 'reason.sensitiveClaimWeak',
      scoreGapPasses: false,
    };
  }

  const eligible = scores.filter((s) => !s.filtered);
  if (eligible.length <= 1) {
    return {
      classification: 'settled',
      classificationReason: 'reason.singleViableOption',
      scoreGapPasses: true,
    };
  }

  const sorted = [...eligible].sort((a, b) => b.finalScore - a.finalScore);
  const top = sorted[0];
  const runnerUp = sorted[1];

  if (top.optionId !== topOptionId) {
    return {
      classification: 'qualified_disagreement',
      classificationReason: 'reason.niyyaShiftedTop',
      scoreGapPasses: false,
    };
  }

  if (scholarlyDivergence) {
    return {
      classification: 'qualified_disagreement',
      classificationReason: 'reason.scholarlyDivergence',
      scoreGapPasses: false,
    };
  }

  const denom = Math.abs(runnerUp.finalScore);
  const gap = top.finalScore - runnerUp.finalScore;

  if (denom < 1e-6) {
    return {
      classification: 'settled',
      classificationReason: 'reason.runnerUpZero',
      scoreGapPasses: true,
    };
  }

  const gapRatio = gap / denom;
  if (gapRatio > T1) {
    return {
      classification: 'settled',
      classificationReason: 'reason.scoreGapWide',
      scoreGapPasses: true,
    };
  }
  if (gapRatio < T2) {
    return {
      classification: 'qualified_disagreement',
      classificationReason: 'reason.scoreGapNarrow',
      scoreGapPasses: false,
    };
  }
  return {
    classification: 'qualified_disagreement',
    classificationReason: 'reason.scoreGapNarrow',
    scoreGapPasses: false,
  };
}

/**
 * Run the full deliberation pipeline:
 * score → filter → apply niyya → classify → recommend.
 */
export function runDeliberation(deliberation: Deliberation): DeliberationResult {
  const filterMap = applyHardConstraints(deliberation.case.options);

  const scores: OptionScore[] = deliberation.case.options.map((opt) => {
    const base = scoreOption(opt);
    const filterResult = filterMap.get(opt.id) ?? { filtered: false };
    return {
      ...base,
      filtered: filterResult.filtered,
      filterReason: filterResult.reason,
      niyyaMultiplier: 1.0,
      finalScore: filterResult.filtered ? 0 : base.rawScore,
    };
  });

  const { topOptionId, assessment } = applyNiyyaToScores(scores, deliberation.niyya);

  const scholarlyDivergence = deliberation.consultations.some(
    (c) => c.followsMinority === true
  );

  const { classification, classificationReason, scoreGapPasses } = classify({
    scores,
    topOptionId,
    claims: deliberation.claims,
    scholarlyDivergence,
  });

  const recommendations: string[] = [];
  if (classification !== 'settled') {
    recommendations.push('rec.consultScholar');
  }
  if (assessment.reason === 'tension') {
    recommendations.push('rec.niyyaTension');
  }
  if (assessment.reason === 'corrupt') {
    recommendations.push('rec.niyyaCorrupt');
  }
  if (classification === 'open') {
    recommendations.push('rec.investigateFurther');
  }

  return {
    scores,
    classification,
    classificationReason,
    topOptionId,
    recommendations,
    scoreGapPasses,
    niyyaTension: assessment.leaningTension,
  };
}
