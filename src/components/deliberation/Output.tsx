import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, AlertCircle, HelpCircle, Scale, Quote } from 'lucide-react';
import { useSession } from '@/lib/storage/session';
import { runDeliberation } from '@/lib/classification';
import { CONFIDENCE_SCORE, type Deliberation, type DeliberationResult, type Maqsad, MAQASID } from '@/types/deliberation';
import { TetradRadar, type TetradPoint } from './TetradRadar';
import { GlossaryTerm } from '@/components/common/GlossaryTerm';
import { cn } from '@/lib/utils';

interface DerivedRadar {
  optionId: string;
  points: TetradPoint[];
}

/**
 * Derive the four-axis radar values from the deliberation, on a 0..1 scale.
 * The maqāṣid score itself is the underlying calculus; the radar is a
 * presentation aid showing each option on the four moments named in §7.3.
 */
function deriveRadars(d: Deliberation, result: DeliberationResult): DerivedRadar[] {
  const claims = d.claims;
  const sensitivityWeightSum =
    claims.reduce((sum, c) => sum + (c.sensitivity ? 2 : 1), 0) || 1;
  const truthAxis =
    claims.reduce(
      (sum, c) =>
        sum +
        (c.confidence ? CONFIDENCE_SCORE[c.confidence] : 0) *
          (c.sensitivity ? 2 : 1),
      0
    ) / sensitivityWeightSum;

  const maxRawPositive =
    Math.max(0, ...result.scores.map((s) => s.rawPositive)) || 1;

  return result.scores.map((s) => {
    const benefit = s.filtered ? 0 : Math.min(1, s.rawPositive / maxRawPositive);
    const harmRatio =
      s.rawPositive + s.rawNegative > 0
        ? s.rawNegative / (s.rawPositive + s.rawNegative)
        : 0;
    const ethics = s.filtered ? 0 : Math.max(0, 1 - harmRatio);
    const intention = s.filtered ? 0 : s.niyyaMultiplier;
    return {
      optionId: s.optionId,
      points: [
        { axis: 'truth', value: truthAxis },
        { axis: 'ethics', value: ethics },
        { axis: 'benefit', value: benefit },
        { axis: 'intention', value: intention },
      ],
    };
  });
}

interface OutputProps {
  /** Optional override; when set, the dossier renders this deliberation instead of the active session. */
  deliberation?: Deliberation;
}

export function Output({ deliberation }: OutputProps = {}) {
  const { t } = useTranslation('deliberate');
  const sessionCurrent = useSession((s) => s.current);
  const current = deliberation ?? sessionCurrent;

  const result = useMemo(() => (current ? runDeliberation(current) : null), [current]);

  if (!current || !result) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-8 text-center">
        <p className="text-sm text-muted-foreground">{t('output.empty')}</p>
      </div>
    );
  }

  const radars = deriveRadars(current, result);
  const options = current.case.options;
  const topOption = options.find((o) => o.id === result.topOptionId);
  const sortedScores = [...result.scores].sort((a, b) => b.finalScore - a.finalScore);

  return (
    <div className="space-y-10">
      <ClassificationBadge result={result} />

      <CaseSummary deliberation={current} />

      <section className="space-y-5">
        <h2 className="text-xl font-semibold tracking-tight">{t('output.tetradMap.title')}</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">{t('output.tetradMap.body')}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {options.map((opt, idx) => {
            const score = sortedScores.find((s) => s.optionId === opt.id);
            const radar = radars.find((r) => r.optionId === opt.id);
            const isTop = topOption?.id === opt.id;
            return (
              <div
                key={opt.id}
                className={cn(
                  'rounded-2xl border p-5 space-y-3',
                  isTop ? 'border-foreground/40 bg-secondary/20' : 'border-border'
                )}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      {t('output.option')} {String.fromCharCode(65 + idx)}{' '}
                      {isTop && (
                        <span className="ml-1 text-foreground font-medium">· {t('output.topOption')}</span>
                      )}
                    </p>
                    <p className="text-base font-semibold mt-0.5">
                      {opt.label || t('step3.untitled')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{t('output.score')}</p>
                    <p className="text-lg font-semibold tabular-nums">
                      {score ? score.finalScore.toFixed(1) : '—'}
                    </p>
                  </div>
                </div>
                {score?.filtered && (
                  <div className="flex gap-2 rounded-xl bg-destructive/10 border border-destructive/30 p-3">
                    <AlertCircle size={16} className="text-destructive shrink-0 mt-0.5" aria-hidden="true" />
                    <p className="text-xs text-foreground leading-relaxed">
                      {t('output.filtered.title')}{' '}
                      <span className="text-muted-foreground">
                        ({t(`output.filtered.${score.filterReason ?? 'generic'}`, { defaultValue: t('output.filtered.generic') })})
                      </span>
                    </p>
                  </div>
                )}
                {radar && <TetradRadar data={radar.points} filtered={score?.filtered} />}
                <div className="text-xs text-muted-foreground space-y-0.5">
                  <p>
                    {t('output.rawPositive')}: <span className="tabular-nums">{score?.rawPositive.toFixed(1) ?? '—'}</span>
                  </p>
                  <p>
                    {t('output.rawNegative')}: <span className="tabular-nums">{score?.rawNegative.toFixed(1) ?? '—'}</span>
                  </p>
                  {score && score.niyyaMultiplier !== 1 && (
                    <p>
                      <GlossaryTerm term="niyya">{t('output.niyyaMultiplier')}</GlossaryTerm>:{' '}
                      <span className="tabular-nums">×{score.niyyaMultiplier.toFixed(2)}</span>
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <MaqasidRanking deliberation={current} />

      <SourceMap deliberation={current} />

      <IntentionProfile deliberation={current} />

      <Recommendations result={result} />

      <DissentingFooter />
    </div>
  );
}

function ClassificationBadge({ result }: { result: DeliberationResult }) {
  const { t } = useTranslation('deliberate');
  const Icon = result.classification === 'settled' ? CheckCircle2 : result.classification === 'qualified_disagreement' ? Scale : HelpCircle;
  return (
    <div className="rounded-2xl border border-border p-5 flex items-start gap-4">
      <Icon size={24} className="text-foreground shrink-0 mt-0.5" aria-hidden="true" />
      <div>
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          {t(`classification.${classKey(result.classification)}.tag`, { ns: 'method' })}
        </p>
        <p className="text-lg font-semibold mt-0.5">
          {t(`classification.${classKey(result.classification)}.title`, { ns: 'method' })}
        </p>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          {t(`classification.${classKey(result.classification)}.body`, { ns: 'method' })}
        </p>
        <p className="mt-3 text-xs text-muted-foreground/80 italic">
          {t('output.classificationReason')}: {t(`output.${result.classificationReason}`, { defaultValue: result.classificationReason })}
        </p>
      </div>
    </div>
  );
}

function classKey(c: DeliberationResult['classification']): 'settled' | 'qualified' | 'open' {
  return c === 'qualified_disagreement' ? 'qualified' : c;
}

function CaseSummary({ deliberation }: { deliberation: Deliberation }) {
  const { t } = useTranslation('deliberate');
  const c = deliberation.case;
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold tracking-tight">{t('output.caseSummary.title')}</h2>
      {c.description ? (
        <p className="text-foreground leading-relaxed whitespace-pre-line">{c.description}</p>
      ) : (
        <p className="text-muted-foreground italic">{t('output.caseSummary.empty')}</p>
      )}
      <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-muted-foreground pt-2">
        {c.timeHorizon && (
          <span>
            <span className="uppercase tracking-wider">{t('step1.timeHorizonLabel')}: </span>
            {t(`step1.timeHorizon.${c.timeHorizon}`)}
          </span>
        )}
        {c.reversibility !== null && (
          <span>
            <span className="uppercase tracking-wider">{t('step1.reversibilityLabel')}: </span>
            {c.reversibility}/5
          </span>
        )}
      </div>
    </section>
  );
}

function MaqasidRanking({ deliberation }: { deliberation: Deliberation }) {
  const { t } = useTranslation('deliberate');
  const data = useMemo(() => {
    const acc: Record<Maqsad, { positive: number; negative: number }> = {
      din: { positive: 0, negative: 0 },
      nafs: { positive: 0, negative: 0 },
      aql: { positive: 0, negative: 0 },
      nasl: { positive: 0, negative: 0 },
      mal: { positive: 0, negative: 0 },
    };
    for (const opt of deliberation.case.options) {
      for (const i of opt.maqasidImpacts) {
        if (i.direction === 'positive') acc[i.maqsad].positive += i.magnitude;
        if (i.direction === 'negative') acc[i.maqsad].negative += i.magnitude;
      }
    }
    return acc;
  }, [deliberation]);

  const max = Math.max(
    1,
    ...MAQASID.flatMap((m) => [data[m].positive, data[m].negative])
  );

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">{t('output.maqasidRanking.title')}</h2>
      <p className="text-sm text-muted-foreground leading-relaxed">{t('output.maqasidRanking.body')}</p>
      <div className="space-y-3">
        {MAQASID.map((m) => (
          <div key={m} className="flex items-center gap-4">
            <p className="text-sm font-medium w-24 shrink-0">{t(`maqasid.${m}.label`, { ns: 'method' })}</p>
            <div className="flex-1 grid grid-cols-2 gap-1 h-3">
              <div className="relative bg-secondary rounded-l-full overflow-hidden">
                <div
                  className="absolute right-0 top-0 h-full bg-destructive/70 rounded-l-full"
                  style={{ width: `${(data[m].negative / max) * 100}%` }}
                />
              </div>
              <div className="relative bg-secondary rounded-r-full overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full bg-success/70 rounded-r-full"
                  style={{ width: `${(data[m].positive / max) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-muted-foreground/80 pl-28 pr-1">
        <span>{t('output.maqasidRanking.harm')}</span>
        <span>{t('output.maqasidRanking.benefit')}</span>
      </div>
    </section>
  );
}

function SourceMap({ deliberation }: { deliberation: Deliberation }) {
  const { t } = useTranslation('deliberate');
  if (deliberation.consultations.length === 0) {
    return (
      <section className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight">{t('output.sourceMap.title')}</h2>
        <p className="text-sm text-muted-foreground italic">{t('output.sourceMap.empty')}</p>
      </section>
    );
  }
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">{t('output.sourceMap.title')}</h2>
      <div className="space-y-3">
        {deliberation.consultations.map((c) => (
          <div key={c.id} className="rounded-xl border border-border p-4">
            <p className="text-sm font-medium text-foreground">{c.citation || c.sourceId || t('step4.untitledSource')}</p>
            {c.bearsOnCase && (
              <p className="text-xs text-muted-foreground mt-1">
                {t(`output.sourceMap.bears.${c.bearsOnCase}`)}
                {c.followsMinority && ` · ${t('output.sourceMap.minority')}`}
              </p>
            )}
            {c.reasoning && (
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{c.reasoning}</p>
            )}
            {c.followsMinority && c.minorityReasoning && (
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed italic">{c.minorityReasoning}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function IntentionProfile({ deliberation }: { deliberation: Deliberation }) {
  const { t } = useTranslation('deliberate');
  const niyya = deliberation.niyya;
  const tone = niyya.toneVariant ?? 'religious';
  const qs: { key: 'q1' | 'q2' | 'q3' | 'q4' | 'q5'; question: string; answer: string }[] = [
    { key: 'q1', question: t('step5.questions.q1.text'), answer: niyya.q1 },
    { key: 'q2', question: t('step5.questions.q2.text'), answer: niyya.q2 },
    { key: 'q3', question: t('step5.questions.q3.text'), answer: niyya.q3 },
    { key: 'q4', question: t('step5.questions.q4.text'), answer: niyya.q4 },
    { key: 'q5', question: t(`step5.questions.q5.${tone}`), answer: niyya.q5 },
  ];

  const allEmpty = qs.every((q) => !q.answer.trim());
  if (allEmpty) {
    return (
      <section className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight">{t('output.intention.title')}</h2>
        <p className="text-sm text-muted-foreground italic">{t('output.intention.empty')}</p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold tracking-tight">{t('output.intention.title')}</h2>
      <p className="text-sm text-muted-foreground leading-relaxed">{t('output.intention.body')}</p>
      <div className="space-y-4">
        {qs.map((q) => q.answer.trim() && (
          <div key={q.key} className="rounded-xl border border-border p-4">
            <div className="flex gap-2">
              <Quote size={14} className="text-muted-foreground/70 mt-1 shrink-0" aria-hidden="true" />
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{q.question}</p>
                <p className="text-foreground leading-relaxed">{q.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Recommendations({ result }: { result: DeliberationResult }) {
  const { t } = useTranslation('deliberate');
  if (result.recommendations.length === 0) return null;
  return (
    <section className="space-y-3 rounded-2xl border border-border bg-secondary/30 p-5">
      <h2 className="text-base font-semibold tracking-tight">{t('output.recommendations.title')}</h2>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {result.recommendations.map((r) => (
          <li key={r} className="leading-relaxed">{t(`output.${r}`, { defaultValue: r })}</li>
        ))}
      </ul>
    </section>
  );
}

function DissentingFooter() {
  const { t } = useTranslation('deliberate');
  return (
    <section className="rounded-2xl border border-dashed border-border p-5 text-sm text-muted-foreground">
      <p className="font-medium text-foreground mb-2">{t('output.dissenting.title')}</p>
      <p className="leading-relaxed whitespace-pre-line">{t('output.dissenting.body')}</p>
    </section>
  );
}
