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
import qawaidJson from '@/data/sources/qawaid.json';
import scholarsJson from '@/data/sources/scholars.json';
import casePatternsJson from '@/data/case-patterns.json';
import type {
  AnySource,
  CasePattern,
  CasePatternBinding,
  Hadith,
  MaqsidEntry,
  QaidaEntry,
  QuranVerse,
  ScholarEntry,
} from '@/types/sources';

export const QURAN: QuranVerse[] = quranJson as QuranVerse[];
export const HADITH: Hadith[] = hadithJson as Hadith[];
export const QAWAID: QaidaEntry[] = qawaidJson as QaidaEntry[];
export const SCHOLARS: ScholarEntry[] = scholarsJson as ScholarEntry[];
export const MAQASID_ONTOLOGY: MaqsidEntry[] = maqasidJson as MaqsidEntry[];
export const CASE_PATTERNS: CasePatternBinding[] = casePatternsJson as CasePatternBinding[];

const SOURCE_INDEX = new Map<string, AnySource>();
for (const v of QURAN) SOURCE_INDEX.set(v.id, { kind: 'quran', data: v });
for (const h of HADITH) SOURCE_INDEX.set(h.id, { kind: 'hadith', data: h });
for (const q of QAWAID) SOURCE_INDEX.set(q.id, { kind: 'qaida', data: q });
for (const s of SCHOLARS) SOURCE_INDEX.set(s.id, { kind: 'scholar', data: s });

export function getSource(id: string): AnySource | undefined {
  return SOURCE_INDEX.get(id);
}

export function listSources(): AnySource[] {
  return [
    ...QURAN.map((v) => ({ kind: 'quran' as const, data: v })),
    ...HADITH.map((h) => ({ kind: 'hadith' as const, data: h })),
    ...QAWAID.map((q) => ({ kind: 'qaida' as const, data: q })),
    ...SCHOLARS.map((s) => ({ kind: 'scholar' as const, data: s })),
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

/** Theme-based search across all source kinds. */
export function searchSources(query: string): AnySource[] {
  if (!query.trim()) return listSources();
  const lower = query.toLowerCase();
  return listSources().filter((s) => {
    const idMatch = s.data.id.toLowerCase().includes(lower);
    const themeMatch = s.data.themes.some((t) => t.toLowerCase().includes(lower));
    if (idMatch || themeMatch) return true;
    if (s.kind === 'quran' || s.kind === 'hadith') {
      const v = s.data;
      if (Object.values(v.translations).some((t) => t?.toLowerCase().includes(lower))) return true;
      if (v.transliteration.toLowerCase().includes(lower)) return true;
      if (s.kind === 'hadith' && s.data.narrator.toLowerCase().includes(lower)) return true;
    }
    if (s.kind === 'qaida') {
      const q = s.data;
      if (Object.values(q.translations).some((t) => t?.toLowerCase().includes(lower))) return true;
      if (Object.values(q.explanation).some((t) => t?.toLowerCase().includes(lower))) return true;
      if (q.transliteration.toLowerCase().includes(lower)) return true;
    }
    if (s.kind === 'scholar') {
      const sc = s.data;
      if (sc.scholar.toLowerCase().includes(lower)) return true;
      if (sc.work.toLowerCase().includes(lower)) return true;
      if (sc.school.toLowerCase().includes(lower)) return true;
      if (Object.values(sc.summary).some((t) => t?.toLowerCase().includes(lower))) return true;
    }
    return false;
  });
}

export function allThemes(): string[] {
  const set = new Set<string>();
  for (const v of QURAN) v.themes.forEach((t) => set.add(t));
  for (const h of HADITH) h.themes.forEach((t) => set.add(t));
  for (const q of QAWAID) q.themes.forEach((t) => set.add(t));
  for (const s of SCHOLARS) s.themes.forEach((t) => set.add(t));
  return [...set].sort((a, b) => a.localeCompare(b));
}
