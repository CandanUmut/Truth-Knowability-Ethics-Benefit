import { describe, it, expect } from 'vitest';
import { patternsFor, sourcesFor, searchSources, allThemes } from './sources';

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
