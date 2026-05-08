import { describe, it, expect } from 'vitest';
import { evaluateHardConstraints, applyHardConstraints, allFiltered } from './constraints';
import type { DeliberationOption, OptionScore, MaqsidImpact } from '@/types/deliberation';

function mkOption(id: string, impacts: Partial<MaqsidImpact>[]): DeliberationOption {
  return {
    id,
    label: id,
    maqasidImpacts: impacts.map((i, idx) => ({
      id: `${id}-i-${idx}`,
      maqsad: 'nafs',
      direction: 'negative',
      tier: 'daruri',
      magnitude: 5,
      causalConfidence: 'yaqin',
      affected: ['self'],
      ...i,
    })),
    tahaImpacts: [],
  };
}

describe('evaluateHardConstraints', () => {
  it('filters an option that violates a ḍarūrī prohibition with yaqīn at magnitude 5', () => {
    const opt = mkOption('a', [
      { direction: 'negative', tier: 'daruri', causalConfidence: 'yaqin', magnitude: 5, maqsad: 'nafs' },
    ]);
    expect(evaluateHardConstraints(opt)).toEqual({ filtered: true, reason: 'daruri.nafs' });
  });

  it('does not filter on ḍarūrī violation under ẓann (paper requires yaqīn)', () => {
    const opt = mkOption('a', [
      { direction: 'negative', tier: 'daruri', causalConfidence: 'zann', magnitude: 5 },
    ]);
    expect(evaluateHardConstraints(opt).filtered).toBe(false);
  });

  it('does not filter on ḥājī-tier negative impact even at yaqīn', () => {
    const opt = mkOption('a', [
      { direction: 'negative', tier: 'haji', causalConfidence: 'yaqin', magnitude: 5 },
    ]);
    expect(evaluateHardConstraints(opt).filtered).toBe(false);
  });

  it('does not filter on a low-magnitude ḍarūrī cost (paper distinguishes severe violation)', () => {
    const opt = mkOption('a', [
      { direction: 'negative', tier: 'daruri', causalConfidence: 'yaqin', magnitude: 2 },
    ]);
    expect(evaluateHardConstraints(opt).filtered).toBe(false);
  });

  it('positive ḍarūrī impact never triggers the filter', () => {
    const opt = mkOption('a', [
      { direction: 'positive', tier: 'daruri', causalConfidence: 'yaqin', magnitude: 5 },
    ]);
    expect(evaluateHardConstraints(opt).filtered).toBe(false);
  });
});

describe('applyHardConstraints', () => {
  it('returns per-option filter results', () => {
    const a = mkOption('a', [{ direction: 'negative', tier: 'daruri', causalConfidence: 'yaqin', magnitude: 5 }]);
    const b = mkOption('b', [{ direction: 'positive', tier: 'daruri', causalConfidence: 'yaqin', magnitude: 5 }]);
    const map = applyHardConstraints([a, b]);
    expect(map.get('a')?.filtered).toBe(true);
    expect(map.get('b')?.filtered).toBe(false);
  });
});

describe('allFiltered', () => {
  const score = (id: string, filtered: boolean): OptionScore => ({
    optionId: id, rawPositive: 0, rawNegative: 0, rawScore: 0, filtered, niyyaMultiplier: 1, finalScore: 0,
  });
  it('true when every option filtered', () => {
    expect(allFiltered([score('a', true), score('b', true)])).toBe(true);
  });
  it('false when any option survives', () => {
    expect(allFiltered([score('a', true), score('b', false)])).toBe(false);
  });
  it('false on empty list (no options to evaluate)', () => {
    expect(allFiltered([])).toBe(false);
  });
});
