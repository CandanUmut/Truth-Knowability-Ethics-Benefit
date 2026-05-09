/**
 * Auto-derivation of maqāṣid impacts from free text.
 *
 * The Quick path lets the user produce a deliberation dossier from just
 * a case description and a list of options. To honour the framework's
 * §7.2 calculus we still need impacts on the five maqāṣid; rather than
 * ask the user to fill out a 5×N matrix, we infer plausible impacts by
 * scanning option text + the case description for keywords that the
 * framework has mapped to specific maqāṣid signals.
 *
 * The derivation is conservative: it picks medium magnitude (3) and
 * medium confidence (ẓann) by default — the user can refine afterwards.
 * The result is a usable, but explicitly heuristic, first pass.
 */
import type {
  DeliberationOption,
  Magnitude,
  Maqsad,
  MaqsidImpact,
  TahaImpact,
} from '@/types/deliberation';

interface KeywordSignal {
  /** Substrings (any language) that, when present, suggest this signal. */
  keywords: string[];
  maqsad?: Maqsad;
  taha?: 'vital' | 'rational' | 'spiritual';
  direction: 'positive' | 'negative';
}

/**
 * The signal table. Keep entries short and high-precision; we scan
 * substrings case-insensitive across both the option text and the
 * case description.
 */
const SIGNALS: KeywordSignal[] = [
  // — nafs (life/body) —
  { keywords: ['kill', 'death', 'die', 'hurt myself', 'suicide', 'harm', 'injur', 'unsafe', 'risk life', 'risk to life', 'risk my life', 'risk her life', 'risk his life', 'overdose', 'starve', 'öldür', 'ölüm', 'kendime zarar', 'intihar', 'tehlike', 'yarala', 'açlık'], maqsad: 'nafs', direction: 'negative' },
  { keywords: ['save life', 'protect', 'health', 'medicine', 'cure', 'heal', 'feed', 'shelter', 'safe', 'kurtar', 'koru', 'sağlık', 'tedavi', 'iyileş', 'beslen', 'barınma', 'güvenli'], maqsad: 'nafs', direction: 'positive' },

  // — aql (mind/wellbeing) —
  { keywords: ['stress', 'depress', 'anxiety', 'burn out', 'burnout', 'mental break', 'overwork', 'sleeplessness', 'addict', 'intoxicat', 'drunk', 'high on', 'stres', 'depres', 'kaygı', 'anksiyete', 'tükenmişlik', 'uyumam', 'bağımlılık', 'sarhoş'], maqsad: 'aql', direction: 'negative' },
  { keywords: ['learn', 'study', 'understand', 'clarity', 'wisdom', 'reason', 'think clearly', 'rest', 'meditate', 'reflect', 'öğren', 'çalış', 'anla', 'bilgelik', 'akıl', 'düşün', 'dinlen', 'mütalaa', 'tefekkür'], maqsad: 'aql', direction: 'positive' },

  // — din (integrity / faith / commitments) —
  { keywords: ['lie', 'deceive', 'cheat', 'pretend', 'hypocris', 'sin', 'forbidden', 'haram', 'ribā', 'riba', 'usury', 'idolat', 'apostas', 'betray', 'yalan', 'aldat', 'haram', 'faiz', 'günah', 'iki yüz', 'ihanet', 'kandır'], maqsad: 'din', direction: 'negative' },
  { keywords: ['truthful', 'honest', 'pray', 'fast', 'zakat', 'charity', 'sincere', 'tawba', 'repent', 'fulfill promise', 'keep my word', 'doğru söyle', 'dürüst', 'namaz', 'oruç', 'zekat', 'sadaka', 'samimi', 'tövbe', 'sözümü tut'], maqsad: 'din', direction: 'positive' },

  // — nasl (family / future / lineage) —
  { keywords: ['hurt my child', 'abandon child', 'broken family', 'divorce', 'estrange', 'parental neglect', 'abuse', 'dishonor parents', 'çocuğum incinir', 'aileyi terk', 'boşan', 'ihmal', 'istismar', 'aileye ihanet'], maqsad: 'nasl', direction: 'negative' },
  { keywords: ['raise child', 'family time', 'support spouse', 'reconcile family', 'honor parents', 'kinship', 'çocuk yetiştir', 'aile birlikte', 'eşi destekle', 'ebeveyn hakkı', 'akrabalık'], maqsad: 'nasl', direction: 'positive' },

  // — mal (property / livelihood) —
  { keywords: ['lose money', 'bankrupt', 'debt', 'financial ruin', 'unemployed', 'poverty', 'expensive', 'wasted money', 'para kayb', 'iflas', 'borç', 'işsiz', 'fakir', 'pahalı', 'israf'], maqsad: 'mal', direction: 'negative' },
  { keywords: ['earn', 'income', 'savings', 'investment', 'livelihood', 'income source', 'pay off debt', 'kazan', 'gelir', 'birikim', 'yatırım', 'geçim', 'borç kapat'], maqsad: 'mal', direction: 'positive' },

  // — Tāhā vital —
  { keywords: ['exhaust', 'drained', 'sick', 'fatigue', 'burnout', 'yorgun', 'tükenmiş', 'hasta', 'bitkin'], taha: 'vital', direction: 'negative' },
  { keywords: ['energiz', 'recover', 'flourish', 'thriv', 'enerji', 'iyileş', 'gelişme', 'mutluluk'], taha: 'vital', direction: 'positive' },

  // — Tāhā rational —
  { keywords: ['confused', 'irrational', 'lost direction', 'kafa karış', 'yön yitir'], taha: 'rational', direction: 'negative' },
  { keywords: ['clear thinking', 'good reason', 'understand better', 'açık düşün', 'iyi bir gerekçe', 'daha iyi anla'], taha: 'rational', direction: 'positive' },

  // — Tāhā spiritual —
  { keywords: ['spiritual cost', 'alienat', 'distant from God', 'lose faith', 'maneviyat', 'Allah\'tan uzak', 'iman zayıf'], taha: 'spiritual', direction: 'negative' },
  { keywords: ['closer to God', 'spiritual growth', 'peace of heart', 'tumaninah', 'tranquil', 'manevi gelişim', 'kalp huzuru', 'huzur', 'Allah\'a yakın'], taha: 'spiritual', direction: 'positive' },
];

interface DeriveContext {
  /** The case description as written by the user. */
  caseDescription: string;
}

interface DerivedImpacts {
  maqasidImpacts: MaqsidImpact[];
  tahaImpacts: TahaImpact[];
}

/**
 * Derive maqāṣid + Tāhā impacts for a single option.
 *
 * The function only writes new impacts that don't already exist on the
 * option (matched by maqsad/axis + direction). This means subsequent
 * manual editing in Step 3 will not be clobbered if the user re-runs
 * derivation later.
 *
 * @returns A patch of impacts to merge onto the option.
 */
export function deriveImpactsForOption(
  option: DeliberationOption,
  ctx: DeriveContext,
): DerivedImpacts {
  const haystack = `${option.label}\n${option.description ?? ''}\n${ctx.caseDescription}`.toLowerCase();
  const seenMaqsadKey = new Set<string>(); // dedupe by `${maqsad}|${direction}`
  const seenTahaKey = new Set<string>();
  const maqasidImpacts: MaqsidImpact[] = [];
  const tahaImpacts: TahaImpact[] = [];

  // Honor any existing impacts so we don't double-add.
  for (const i of option.maqasidImpacts) {
    seenMaqsadKey.add(`${i.maqsad}|${i.direction}`);
  }
  for (const i of option.tahaImpacts) {
    seenTahaKey.add(`${i.axis}|${i.direction}`);
  }

  for (const sig of SIGNALS) {
    const hit = sig.keywords.some((kw) => haystack.includes(kw.toLowerCase()));
    if (!hit) continue;

    if (sig.maqsad) {
      const key = `${sig.maqsad}|${sig.direction}`;
      if (seenMaqsadKey.has(key)) continue;
      seenMaqsadKey.add(key);
      maqasidImpacts.push({
        id: crypto.randomUUID(),
        maqsad: sig.maqsad,
        direction: sig.direction,
        tier: 'haji',
        magnitude: 3 as Magnitude,
        causalConfidence: 'zann',
        affected: ['self'],
        notes: 'auto:quick',
      });
    } else if (sig.taha) {
      const key = `${sig.taha}|${sig.direction}`;
      if (seenTahaKey.has(key)) continue;
      seenTahaKey.add(key);
      tahaImpacts.push({
        id: `auto:${sig.taha}:${sig.direction}`,
        axis: sig.taha,
        direction: sig.direction,
        tier: 'haji',
        magnitude: 3 as Magnitude,
        causalConfidence: 'zann',
      });
    }
  }

  return { maqasidImpacts, tahaImpacts };
}

/**
 * If an option has no impacts at all, give it a single neutral baseline
 * so it doesn't score zero against options that did derive signals.
 *
 * The baseline is a small positive on aql (because the option exists at
 * all is at least an attempted use of reason) — and nothing else. This
 * ensures the calculus doesn't strand options the heuristic missed.
 */
export function ensureBaseline(option: DeliberationOption): DerivedImpacts {
  if (option.maqasidImpacts.length > 0 || option.tahaImpacts.length > 0) {
    return { maqasidImpacts: [], tahaImpacts: [] };
  }
  return {
    maqasidImpacts: [
      {
        id: crypto.randomUUID(),
        maqsad: 'aql',
        direction: 'positive',
        tier: 'tahsini',
        magnitude: 1 as Magnitude,
        causalConfidence: 'shakk',
        affected: ['self'],
        notes: 'auto:baseline',
      },
    ],
    tahaImpacts: [],
  };
}

/**
 * Derive impacts for every option of a case in one pass and return a
 * fresh options array. Pure — the caller persists the result.
 */
export function deriveAllOptions(
  options: DeliberationOption[],
  ctx: DeriveContext,
): DeliberationOption[] {
  return options.map((opt) => {
    const heuristic = deriveImpactsForOption(opt, ctx);
    const merged: DeliberationOption = {
      ...opt,
      maqasidImpacts: [...opt.maqasidImpacts, ...heuristic.maqasidImpacts],
      tahaImpacts: [...opt.tahaImpacts, ...heuristic.tahaImpacts],
    };
    const baseline = ensureBaseline(merged);
    return {
      ...merged,
      maqasidImpacts: [...merged.maqasidImpacts, ...baseline.maqasidImpacts],
      tahaImpacts: [...merged.tahaImpacts, ...baseline.tahaImpacts],
    };
  });
}

/**
 * True when the option has impacts that came from the auto-deriver.
 * Used by the Output's "refine" panel to decide what to suggest.
 */
export function hasAutoDerivedImpacts(option: DeliberationOption): boolean {
  return (
    option.maqasidImpacts.some((i) => i.notes?.startsWith('auto:')) ||
    option.tahaImpacts.some((i) => i.id.startsWith('auto:'))
  );
}
