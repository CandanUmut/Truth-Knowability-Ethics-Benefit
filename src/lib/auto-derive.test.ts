import { describe, it, expect } from 'vitest';
import { deriveAllOptions, deriveImpactsForOption, ensureBaseline, hasAutoDerivedImpacts } from './auto-derive';
import type { DeliberationOption } from '@/types/deliberation';

function emptyOption(label = '', description = ''): DeliberationOption {
  return { id: 'opt', label, description, maqasidImpacts: [], tahaImpacts: [] };
}

describe('deriveImpactsForOption', () => {
  it('infers a nafs-negative when the option text mentions risk to life', () => {
    const opt = emptyOption('refuse the surgery', 'I would risk my life by refusing this');
    const { maqasidImpacts } = deriveImpactsForOption(opt, { caseDescription: '' });
    expect(maqasidImpacts.some((i) => i.maqsad === 'nafs' && i.direction === 'negative')).toBe(true);
  });

  it('infers a din-positive when the option mentions truthful disclosure', () => {
    const opt = emptyOption('be honest with my employer');
    const { maqasidImpacts } = deriveImpactsForOption(opt, { caseDescription: 'Should I be honest?' });
    expect(maqasidImpacts.some((i) => i.maqsad === 'din' && i.direction === 'positive')).toBe(true);
  });

  it('infers a mal-negative on bankruptcy / debt language', () => {
    const opt = emptyOption('take the loan');
    const { maqasidImpacts } = deriveImpactsForOption(opt, {
      caseDescription: 'I am worried this loan could lead to bankruptcy',
    });
    expect(maqasidImpacts.some((i) => i.maqsad === 'mal' && i.direction === 'negative')).toBe(true);
  });

  it('does not duplicate impacts when an existing one already covers the maqsad+direction', () => {
    const opt: DeliberationOption = {
      ...emptyOption('refuse the surgery'),
      maqasidImpacts: [
        {
          id: 'existing',
          maqsad: 'nafs',
          direction: 'negative',
          tier: 'haji',
          magnitude: 3,
          causalConfidence: 'zann_strong',
          affected: ['self'],
          notes: 'manual',
        },
      ],
    };
    const { maqasidImpacts } = deriveImpactsForOption(opt, {
      caseDescription: 'risk to life is real here',
    });
    expect(maqasidImpacts.find((i) => i.maqsad === 'nafs' && i.direction === 'negative')).toBeUndefined();
  });

  it('matches Turkish keywords (sağlık)', () => {
    const opt = emptyOption('tedaviyi kabul et');
    const { maqasidImpacts } = deriveImpactsForOption(opt, {
      caseDescription: 'Sağlık durumum için bu kararı vermem gerekiyor',
    });
    expect(maqasidImpacts.some((i) => i.maqsad === 'nafs' && i.direction === 'positive')).toBe(true);
  });
});

describe('ensureBaseline', () => {
  it('adds a tahsini aql-positive when an option has no impacts at all', () => {
    const opt = emptyOption('do nothing');
    const { maqasidImpacts } = ensureBaseline(opt);
    expect(maqasidImpacts).toHaveLength(1);
    expect(maqasidImpacts[0].maqsad).toBe('aql');
    expect(maqasidImpacts[0].direction).toBe('positive');
    expect(maqasidImpacts[0].tier).toBe('tahsini');
  });

  it('adds nothing when impacts already exist', () => {
    const opt: DeliberationOption = {
      ...emptyOption('do nothing'),
      maqasidImpacts: [
        {
          id: 'existing',
          maqsad: 'nafs',
          direction: 'positive',
          tier: 'haji',
          magnitude: 3,
          causalConfidence: 'zann',
          affected: ['self'],
        },
      ],
    };
    const { maqasidImpacts } = ensureBaseline(opt);
    expect(maqasidImpacts).toHaveLength(0);
  });
});

describe('deriveAllOptions', () => {
  it('returns a copy with derived impacts populated for every option', () => {
    const options: DeliberationOption[] = [
      { id: 'a', label: 'tell my employer the truth', maqasidImpacts: [], tahaImpacts: [] },
      { id: 'b', label: 'do nothing', maqasidImpacts: [], tahaImpacts: [] },
    ];
    const derived = deriveAllOptions(options, {
      caseDescription: 'My employer is shipping a defect that could risk safety.',
    });
    // Option A should pick up nafs-negative or din-positive at minimum.
    expect(derived[0].maqasidImpacts.length).toBeGreaterThan(0);
    // Option B has no signal in its label/description; baseline should kick in.
    expect(derived[1].maqasidImpacts.length).toBeGreaterThan(0);
  });
});

describe('hasAutoDerivedImpacts', () => {
  it('detects auto-derived impacts via the notes prefix', () => {
    const derived = deriveAllOptions(
      [{ id: 'a', label: 'tell the truth', maqasidImpacts: [], tahaImpacts: [] }],
      { caseDescription: '' },
    );
    expect(hasAutoDerivedImpacts(derived[0])).toBe(true);
  });
});
