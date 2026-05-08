import { describe, it, expect } from 'vitest';
import { classify, runDeliberation } from './classification';
import type {
  Deliberation,
  DeliberationOption,
  MaqsidImpact,
  OptionScore,
  TruthClaim,
} from '@/types/deliberation';
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

function mkClaim(p: Partial<TruthClaim>): TruthClaim {
  return {
    id: 'c-1',
    text: '',
    basis: 'sense',
    confidence: 'yaqin',
    sensitivity: false,
    ...p,
  };
}

describe('classify', () => {
  it('all options filtered → open', () => {
    const out = classify({
      scores: [mkScore('a', 10, true), mkScore('b', 5, true)],
      topOptionId: null,
      claims: [],
    });
    expect(out.classification).toBe('open');
  });

  it('a sensitive critical claim at shakk level → open', () => {
    const out = classify({
      scores: [mkScore('a', 10), mkScore('b', 5)],
      topOptionId: 'a',
      claims: [mkClaim({ sensitivity: true, confidence: 'shakk' })],
    });
    expect(out.classification).toBe('open');
  });

  it('settled when top exceeds runner-up by > 50% (gap ratio > T1)', () => {
    const out = classify({
      scores: [mkScore('a', 10), mkScore('b', 4)],
      topOptionId: 'a',
      claims: [],
    });
    expect(out.classification).toBe('settled');
  });

  it('qualified disagreement when scores within 20% of each other', () => {
    const out = classify({
      scores: [mkScore('a', 10), mkScore('b', 9)],
      topOptionId: 'a',
      claims: [],
    });
    expect(out.classification).toBe('qualified_disagreement');
  });

  it('qualified disagreement when source library flags scholarly divergence', () => {
    const out = classify({
      scores: [mkScore('a', 10), mkScore('b', 4)],
      topOptionId: 'a',
      claims: [],
      scholarlyDivergence: true,
    });
    expect(out.classification).toBe('qualified_disagreement');
  });

  it('settled when only one viable option remains', () => {
    const out = classify({
      scores: [mkScore('a', 5), mkScore('b', 5, true)],
      topOptionId: 'a',
      claims: [],
    });
    expect(out.classification).toBe('settled');
  });
});

describe('runDeliberation', () => {
  function mkOpt(id: string, impacts: Partial<MaqsidImpact>[]): DeliberationOption {
    return {
      id,
      label: id,
      maqasidImpacts: impacts.map((i, idx) => ({
        id: `${id}-${idx}`,
        maqsad: 'nafs',
        direction: 'positive',
        tier: 'daruri',
        magnitude: 3,
        causalConfidence: 'yaqin',
        affected: ['self'],
        ...i,
      })),
      tahaImpacts: [],
    };
  }
  function mkDeliberation(options: DeliberationOption[]): Deliberation {
    return {
      id: 'd-1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'draft',
      case: {
        description: '',
        agents: [],
        options,
        timeHorizon: 'days',
        reversibility: 3,
        stakes: { maqasid: {}, taha: {} },
      },
      claims: [],
      consultations: [],
      niyya: emptyNiyya(),
    };
  }

  it('end-to-end: scores, filters, applies niyya, classifies', () => {
    const a = mkOpt('a', [{ direction: 'positive', tier: 'daruri', magnitude: 5, causalConfidence: 'yaqin' }]);
    const b = mkOpt('b', [
      { direction: 'positive', tier: 'haji', magnitude: 3, causalConfidence: 'zann' },
      { direction: 'negative', tier: 'daruri', magnitude: 5, causalConfidence: 'yaqin', maqsad: 'din' },
    ]);
    const result = runDeliberation(mkDeliberation([a, b]));
    expect(result.scores.find((s) => s.optionId === 'b')?.filtered).toBe(true);
    expect(result.topOptionId).toBe('a');
    expect(result.classification).toBe('settled');
  });
});
