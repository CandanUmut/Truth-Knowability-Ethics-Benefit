/**
 * Source library access — pure data + a simple keyword matcher.
 *
 * The matcher is intentionally MVP: it checks the case description
 * (case-insensitive substring) against each pattern's keyword list and
 * surfaces the union of sourceIds. Scholar review (Phase 6) can refine
 * the keyword sets and pattern coverage over time.
 */
import quranJson from '@/data/sources/quran.json';
import hadithJson from '@/data/sources/hadith.json';
import maqasidJson from '@/data/sources/maqasid.json';
import casePatternsJson from '@/data/case-patterns.json';
import type {
  AnySource,
  CasePattern,
  CasePatternBinding,
  Hadith,
  MaqsidEntry,
  QuranVerse,
} from '@/types/sources';

export const QURAN: QuranVerse[] = quranJson as QuranVerse[];
export const HADITH: Hadith[] = hadithJson as Hadith[];
export const MAQASID_ONTOLOGY: MaqsidEntry[] = maqasidJson as MaqsidEntry[];
export const CASE_PATTERNS: CasePatternBinding[] = casePatternsJson as CasePatternBinding[];

const SOURCE_INDEX = new Map<string, AnySource>();
for (const v of QURAN) SOURCE_INDEX.set(v.id, { kind: 'quran', data: v });
for (const h of HADITH) SOURCE_INDEX.set(h.id, { kind: 'hadith', data: h });

export function getSource(id: string): AnySource | undefined {
  return SOURCE_INDEX.get(id);
}

export function listSources(): AnySource[] {
  return [
    ...QURAN.map((v) => ({ kind: 'quran' as const, data: v })),
    ...HADITH.map((h) => ({ kind: 'hadith' as const, data: h })),
  ];
}

export function patternsFor(text: string): CasePattern[] {
  if (!text.trim()) return ['general'];
  const lower = text.toLowerCase();
  const matched = new Set<CasePattern>();
  for (const binding of CASE_PATTERNS) {
    if (binding.pattern === 'general') continue;
    for (const kw of binding.keywords) {
      if (lower.includes(kw.toLowerCase())) {
        matched.add(binding.pattern);
        break;
      }
    }
  }
  if (matched.size === 0) matched.add('general');
  return [...matched];
}

export function sourcesFor(text: string): AnySource[] {
  const patterns = patternsFor(text);
  const ids = new Set<string>();
  for (const p of patterns) {
    const binding = CASE_PATTERNS.find((b) => b.pattern === p);
    if (!binding) continue;
    for (const id of binding.sourceIds) ids.add(id);
  }
  const result: AnySource[] = [];
  for (const id of ids) {
    const src = SOURCE_INDEX.get(id);
    if (src) result.push(src);
  }
  return result;
}

/** Theme-based search across both Qur'ān and hadith. */
export function searchSources(query: string): AnySource[] {
  if (!query.trim()) return listSources();
  const lower = query.toLowerCase();
  return listSources().filter((s) => {
    if (s.kind === 'quran') {
      const v = s.data;
      return (
        v.id.toLowerCase().includes(lower) ||
        v.themes.some((t) => t.toLowerCase().includes(lower)) ||
        Object.values(v.translations).some((t) => t?.toLowerCase().includes(lower)) ||
        v.transliteration.toLowerCase().includes(lower)
      );
    } else {
      const h = s.data;
      return (
        h.id.toLowerCase().includes(lower) ||
        h.themes.some((t) => t.toLowerCase().includes(lower)) ||
        Object.values(h.translations).some((t) => t?.toLowerCase().includes(lower)) ||
        h.transliteration.toLowerCase().includes(lower) ||
        h.narrator.toLowerCase().includes(lower)
      );
    }
  });
}

export function allThemes(): string[] {
  const set = new Set<string>();
  for (const v of QURAN) v.themes.forEach((t) => set.add(t));
  for (const h of HADITH) h.themes.forEach((t) => set.add(t));
  return [...set].sort((a, b) => a.localeCompare(b));
}
