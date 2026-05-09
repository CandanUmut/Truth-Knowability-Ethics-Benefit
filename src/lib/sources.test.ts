import { describe, it, expect } from 'vitest';
import { patternsFor, sourcesFor, searchSources, allThemes, QAWAID, SCHOLARS, listSources } from './sources';

describe('patternsFor', () => {
  it('returns general for empty input', () => {
    expect(patternsFor('')).toEqual(['general']);
  });

  it('matches workplace-honesty on English keywords', () => {
    const matched = patternsFor('My employer asked me to omit a defect from the safety report');
    expect(matched).toContain('workplace-honesty');
  });

  it('matches riba-finance on Turkish keywords', () => {
    const matched = patternsFor('Konvansiyonel ipotek almayı düşünüyorum');
    expect(matched).toContain('riba-finance');
  });

  it('matches family-conflict and truth-disclosure simultaneously', () => {
    const matched = patternsFor('I want to disclose to my family that I have changed my mind');
    expect(matched).toContain('family-conflict');
    expect(matched).toContain('truth-disclosure');
  });

  it('returns general when nothing matches', () => {
    expect(patternsFor('quantum chromodynamics seminar')).toEqual(['general']);
  });
});

describe('sourcesFor', () => {
  it('surfaces the niyya hadith for a sincerity case', () => {
    const sources = sourcesFor('Should I do this; my motivation feels mixed — niyya');
    const ids = sources.map((s) => s.data.id);
    expect(ids).toContain('bukhari.1');
  });

  it('surfaces the change-evil hadith for a whistleblowing case', () => {
    const sources = sourcesFor('My employer is shipping a defective product. I want to whistleblow.');
    const ids = sources.map((s) => s.data.id);
    expect(ids).toContain('muslim.49');
  });

  it('falls back to general sources when nothing matches', () => {
    const sources = sourcesFor('quantum chromodynamics seminar');
    expect(sources.length).toBeGreaterThan(0);
  });
});

describe('searchSources', () => {
  it('finds verse Q.5.8 by id substring', () => {
    expect(searchSources('Q.5.8').some((s) => s.data.id === 'Q.5.8')).toBe(true);
  });
  it('finds entries by theme keyword', () => {
    const matches = searchSources('niyya');
    expect(matches.some((s) => s.data.id === 'bukhari.1')).toBe(true);
  });
});

describe('allThemes', () => {
  it('returns a non-empty unique list', () => {
    const themes = allThemes();
    expect(themes.length).toBeGreaterThan(5);
    expect(new Set(themes).size).toBe(themes.length);
  });
});

describe('expanded library', () => {
  it('includes the five major qawāʿid', () => {
    const ids = QAWAID.map((q) => q.id);
    expect(ids).toContain('qaida.intentions');
    expect(ids).toContain('qaida.no-harm');
    expect(ids).toContain('qaida.hardship-eases');
    expect(ids).toContain('qaida.necessity');
    expect(ids).toContain('qaida.certainty-doubt');
    expect(ids).toContain('qaida.custom');
  });

  it('includes both classical and modern scholarly entries', () => {
    expect(SCHOLARS.some((s) => s.era === 'classical')).toBe(true);
    expect(SCHOLARS.some((s) => s.era === 'modern')).toBe(true);
  });

  it('listSources returns entries of all four kinds', () => {
    const kinds = new Set(listSources().map((s) => s.kind));
    expect(kinds.has('quran')).toBe(true);
    expect(kinds.has('hadith')).toBe(true);
    expect(kinds.has('qaida')).toBe(true);
    expect(kinds.has('scholar')).toBe(true);
  });

  it('searchSources finds a scholar by name', () => {
    const matches = searchSources('Ghazālī');
    expect(matches.some((s) => s.kind === 'scholar' && s.data.scholar.includes('Ghazālī'))).toBe(true);
  });

  it('sourcesFor surfaces a qāʿida for a medical-decision case', () => {
    const sources = sourcesFor('I need to decide whether to consent to a risky surgery for my elderly father');
    expect(sources.some((s) => s.kind === 'qaida' && s.data.id === 'qaida.no-harm')).toBe(true);
  });
});

describe('new case patterns', () => {
  it('matches charity-zakat on English keyword', () => {
    expect(patternsFor('Should I give a larger sadaqa this year')).toContain('charity-zakat');
  });

  it('matches digital-online on social-media context', () => {
    expect(patternsFor('Should I share this leaked data on twitter anonymously')).toContain('digital-online');
  });

  it('matches consultation-shura on Turkish keyword', () => {
    expect(patternsFor('Önemli bir karar için kiminle istişâre etmeliyim')).toContain('consultation-shura');
  });

  it('matches conflict-resolution on a reconcile-family scenario', () => {
    expect(patternsFor('I need to reconcile two siblings who have stopped speaking')).toContain('conflict-resolution');
  });
});
