import { describe, it, expect } from 'vitest';
import { assessNiyya, applyNiyyaToScores } from './niyya';
import type { NiyyaCheck, OptionScore } from '@/types/deliberation';
import { emptyNiyya } from '@/types/deliberation';

function mkScore(id: string, raw: number, filtered = false): OptionScore {
  return {
    optionId: id,
    rawPositive: raw > 0 ? raw : 0,
    rawNegative: raw < 0 ? -raw : 0,
    rawScore: raw,
    filtered,
    niyyaMultiplier: 1.0,
    finalScore: filtered ? 0 : raw,
  };
}

describe('assessNiyya', () => {
  it('clean alignment (no leaning given) → 1.0', () => {
    expect(assessNiyya(emptyNiyya(), 'a')).toEqual({ multiplier: 1.0, reason: 'clean', leaningTension: false });
  });

  it('matching leaning → 1.0', () => {
    const niyya: NiyyaCheck = { ...emptyNiyya(), leaningOptionId: 'a' };
    expect(assessNiyya(niyya, 'a')).toEqual({ multiplier: 1.0, reason: 'clean', leaningTension: false });
  });

  it('leaning differs from top option → 0.7 with tension flag', () => {
    const niyya: NiyyaCheck = { ...emptyNiyya(), leaningOptionId: 'b' };
    expect(assessNiyya(niyya, 'a')).toEqual({ multiplier: 0.7, reason: 'tension', leaningTension: true });
  });

  it('self-reported corrupt motivation → 0.0 with corrupt flag', () => {
    const niyya: NiyyaCheck = { ...emptyNiyya(), selfReportedCorrupt: true, leaningOptionId: 'a' };
    expect(assessNiyya(niyya, 'a')).toEqual({ multiplier: 0.0, reason: 'corrupt', leaningTension: false });
  });
});

describe('applyNiyyaToScores', () => {
  it('applies multiplier only to the top non-filtered option', () => {
    const scores = [mkScore('a', 10), mkScore('b', 6), mkScore('c', 4)];
    const niyya: NiyyaCheck = { ...emptyNiyya(), leaningOptionId: 'b' };
    const { topOptionId, assessment } = applyNiyyaToScores(scores, niyya);
    expect(topOptionId).toBe('a');
    expect(assessment.reason).toBe('tension');
    expect(scores.find((s) => s.optionId === 'a')?.finalScore).toBe(7); // 10 × 0.7
    expect(scores.find((s) => s.optionId === 'b')?.finalScore).toBe(6);
    expect(scores.find((s) => s.optionId === 'c')?.finalScore).toBe(4);
  });

  it('skips filtered options when picking top', () => {
    const scores = [mkScore('a', 100, true), mkScore('b', 5)];
    const niyya = emptyNiyya();
    const { topOptionId } = applyNiyyaToScores(scores, niyya);
    expect(topOptionId).toBe('b');
    expect(scores.find((s) => s.optionId === 'a')?.finalScore).toBe(0);
    expect(scores.find((s) => s.optionId === 'b')?.finalScore).toBe(5);
  });

  it('handles all-filtered case gracefully', () => {
    const scores = [mkScore('a', 10, true)];
    const { topOptionId } = applyNiyyaToScores(scores, emptyNiyya());
    expect(topOptionId).toBeNull();
  });
});
