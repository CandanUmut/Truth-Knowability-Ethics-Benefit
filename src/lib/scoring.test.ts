import { describe, it, expect } from 'vitest';
import { scoreOption } from './scoring';
import type { DeliberationOption, MaqsidImpact } from '@/types/deliberation';

function mkOption(impacts: Partial<MaqsidImpact>[]): DeliberationOption {
  return {
    id: 'opt-1',
    label: 'Test',
    maqasidImpacts: impacts.map((i, idx) => ({
      id: `i-${idx}`,
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

describe('scoreOption', () => {
  it('positive ḍarūrī yaqīn impact: magnitude 3 × tier 3 × confidence 1.0 = 9', () => {
    const score = scoreOption(mkOption([{ direction: 'positive', tier: 'daruri', magnitude: 3, causalConfidence: 'yaqin' }]));
    expect(score.rawPositive).toBe(9);
    expect(score.rawNegative).toBe(0);
    expect(score.rawScore).toBe(9);
  });

  it('zann (0.5) halves the contribution of a 5-magnitude ḥājī (weight 2): 5 × 2 × 0.5 = 5', () => {
    const score = scoreOption(mkOption([{ direction: 'positive', tier: 'haji', magnitude: 5, causalConfidence: 'zann' }]));
    expect(score.rawPositive).toBe(5);
  });

  it('negative impacts are subtracted', () => {
    const score = scoreOption(mkOption([
      { direction: 'positive', tier: 'daruri', magnitude: 3, causalConfidence: 'yaqin' }, // +9
      { direction: 'negative', tier: 'haji', magnitude: 4, causalConfidence: 'zann_strong' }, // -5.6
    ]));
    expect(score.rawPositive).toBe(9);
    expect(score.rawNegative).toBeCloseTo(5.6, 5);
    expect(score.rawScore).toBeCloseTo(3.4, 5);
  });

  it('jahl confidence yields zero contribution', () => {
    const score = scoreOption(mkOption([{ direction: 'positive', magnitude: 5, tier: 'daruri', causalConfidence: 'jahl' }]));
    expect(score.rawScore).toBe(0);
  });

  it('neutral direction is ignored', () => {
    const score = scoreOption(mkOption([{ direction: 'neutral', magnitude: 5, tier: 'daruri', causalConfidence: 'yaqin' }]));
    expect(score.rawScore).toBe(0);
  });

  it('tier weights: ḍarūrī=3, ḥājī=2, taḥsīnī=1', () => {
    const a = scoreOption(mkOption([{ tier: 'daruri', magnitude: 1, causalConfidence: 'yaqin' }]));
    const b = scoreOption(mkOption([{ tier: 'haji', magnitude: 1, causalConfidence: 'yaqin' }]));
    const c = scoreOption(mkOption([{ tier: 'tahsini', magnitude: 1, causalConfidence: 'yaqin' }]));
    expect(a.rawScore).toBe(3);
    expect(b.rawScore).toBe(2);
    expect(c.rawScore).toBe(1);
  });

  it('Tāhā impacts are aggregated identically to maqāṣid impacts', () => {
    const opt: DeliberationOption = {
      id: 'opt-1',
      label: 'Test',
      maqasidImpacts: [],
      tahaImpacts: [
        { id: 't-1', axis: 'spiritual', direction: 'positive', tier: 'daruri', magnitude: 2, causalConfidence: 'yaqin' },
      ],
    };
    expect(scoreOption(opt).rawScore).toBe(6);
  });
});
