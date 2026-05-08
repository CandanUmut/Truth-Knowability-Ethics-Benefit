import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ConversationalScreen } from './ConversationalScreen';
import { PlainScale } from '@/components/ui/plain-scale';
import { useSession } from '@/lib/storage/session';
import {
  HARM_CONSEQUENCES,
  HELP_CONSEQUENCES,
  SURENESS_TO_CONFIDENCE,
  tierForMagnitude,
  findConsequence,
  type ConsequenceTemplate,
} from '@/data/consequences';
import type {
  DeliberationOption,
  Magnitude,
  MaqsidImpact,
  TahaImpact,
} from '@/types/deliberation';
import { cn } from '@/lib/utils';

interface Props {
  onComplete: () => void;
  onBackToPrevious?: () => void;
}

/**
 * Each option contributes 2 + (#harms) + 2 + (#helps) sub-screens.
 * Sub-screens within a single option, in order:
 *   - harm-pick: multi-select of harm consequences
 *   - for each picked harm: detail (severity + sureness)
 *   - help-pick: multi-select of help consequences
 *   - for each picked help: detail (severity + sureness)
 *
 * We compute a flat plan of screens at render time from the persisted state.
 */

interface ScreenPlan {
  optionIndex: number;
  optionId: string;
  kind: 'harm-pick' | 'help-pick' | 'harm-detail' | 'help-detail';
  consequenceId?: string;
}

function planFor(options: DeliberationOption[]): ScreenPlan[] {
  const plan: ScreenPlan[] = [];
  options.forEach((opt, optionIndex) => {
    plan.push({ optionIndex, optionId: opt.id, kind: 'harm-pick' });
    const harmIds = opt.maqasidImpacts
      .filter((i) => i.direction === 'negative')
      .map((i) => (i.notes ?? '').replace(/^cid:/, ''))
      .filter(Boolean)
      .concat(
        opt.tahaImpacts.filter((i) => i.direction === 'negative').map((i) => (i.id))
      );
    // We index detail-screens by the consequence template id, derived from impact.notes ('cid:<id>').
    for (const impact of opt.maqasidImpacts.filter((i) => i.direction === 'negative')) {
      const cid = (impact.notes ?? '').replace(/^cid:/, '');
      if (cid) plan.push({ optionIndex, optionId: opt.id, kind: 'harm-detail', consequenceId: cid });
    }
    for (const impact of opt.tahaImpacts.filter((i) => i.direction === 'negative')) {
      // notes don't exist on TahaImpact in the type; we use the impact.id stored as the consequence template id.
      const cid = harmIdsCidForTaha(impact.id, opt);
      if (cid) plan.push({ optionIndex, optionId: opt.id, kind: 'harm-detail', consequenceId: cid });
    }
    plan.push({ optionIndex, optionId: opt.id, kind: 'help-pick' });
    for (const impact of opt.maqasidImpacts.filter((i) => i.direction === 'positive')) {
      const cid = (impact.notes ?? '').replace(/^cid:/, '');
      if (cid) plan.push({ optionIndex, optionId: opt.id, kind: 'help-detail', consequenceId: cid });
    }
    for (const impact of opt.tahaImpacts.filter((i) => i.direction === 'positive')) {
      const cid = harmIdsCidForTaha(impact.id, opt);
      if (cid) plan.push({ optionIndex, optionId: opt.id, kind: 'help-detail', consequenceId: cid });
    }
    void harmIds;
  });
  return plan;
}

/** Resolve the consequence template id stored on a Tāhā impact. We persist
 * the template id in the impact's `id` field, prefixed with 'cid:' for clarity. */
function harmIdsCidForTaha(impactId: string, _opt: DeliberationOption): string | undefined {
  if (impactId.startsWith('cid:')) return impactId.slice(4);
  return undefined;
}

export function Step3Maqasid({ onComplete, onBackToPrevious }: Props) {
  const { t } = useTranslation('deliberate');
  const subStep = useSession((s) => s.subStep);
  const setSubStep = useSession((s) => s.setSubStep);
  const current = useSession((s) => s.current);
  const updateCase = useSession((s) => s.updateCase);

  const options = useMemo(
    () => current?.case.options ?? [],
    [current?.case.options]
  );
  const plan = useMemo(() => planFor(options), [options]);
  const idx = Math.min(Math.max(subStep, 1), Math.max(plan.length, 1)) - 1;

  // Normalize "last sub-step" sentinel from retreatStep().
  useEffect(() => {
    if (subStep > plan.length && plan.length > 0) {
      setSubStep(plan.length);
    }
  }, [subStep, plan.length, setSubStep]);

  if (!current || options.length < 2 || plan.length === 0) {
    return (
      <ConversationalScreen
        title={t('step3.empty.title')}
        subtitle={t('step3.empty.body')}
        onBack={onBackToPrevious}
        onContinue={onComplete}
      >
        <div />
      </ConversationalScreen>
    );
  }

  const screen = plan[idx];
  const option = options[screen.optionIndex];

  const onAdvance = () => {
    if (idx + 1 >= plan.length) onComplete();
    else setSubStep(idx + 2);
  };
  const onRetreat = () => {
    if (idx === 0) onBackToPrevious?.();
    else setSubStep(idx);
  };

  return (
    <>
      {screen.kind === 'harm-pick' && (
        <ConsequencePickScreen
          progressLabel={t('step3.progress', {
            optionLetter: String.fromCharCode(65 + screen.optionIndex),
            total: options.length,
          })}
          option={option}
          direction="negative"
          consequences={HARM_CONSEQUENCES}
          onAdvance={onAdvance}
          onRetreat={onRetreat}
          onUpdate={(patch) => updateCase({ options: options.map((o) => (o.id === option.id ? { ...o, ...patch } : o)) })}
        />
      )}
      {screen.kind === 'help-pick' && (
        <ConsequencePickScreen
          progressLabel={t('step3.progress', {
            optionLetter: String.fromCharCode(65 + screen.optionIndex),
            total: options.length,
          })}
          option={option}
          direction="positive"
          consequences={HELP_CONSEQUENCES}
          onAdvance={onAdvance}
          onRetreat={onRetreat}
          onUpdate={(patch) => updateCase({ options: options.map((o) => (o.id === option.id ? { ...o, ...patch } : o)) })}
        />
      )}
      {(screen.kind === 'harm-detail' || screen.kind === 'help-detail') && screen.consequenceId && (
        <ConsequenceDetailScreen
          progressLabel={t('step3.progress', {
            optionLetter: String.fromCharCode(65 + screen.optionIndex),
            total: options.length,
          })}
          option={option}
          consequenceId={screen.consequenceId}
          direction={screen.kind === 'harm-detail' ? 'negative' : 'positive'}
          onAdvance={onAdvance}
          onRetreat={onRetreat}
          onUpdate={(patch) => updateCase({ options: options.map((o) => (o.id === option.id ? { ...o, ...patch } : o)) })}
        />
      )}
    </>
  );
}

/* --------- Consequence multi-pick screen --------- */

interface PickProps {
  progressLabel: string;
  option: DeliberationOption;
  direction: 'positive' | 'negative';
  consequences: ConsequenceTemplate[];
  onAdvance: () => void;
  onRetreat: () => void;
  onUpdate: (patch: Partial<DeliberationOption>) => void;
}

function ConsequencePickScreen({
  progressLabel,
  option,
  direction,
  consequences,
  onAdvance,
  onRetreat,
  onUpdate,
}: PickProps) {
  const { t } = useTranslation('deliberate');
  const titleKey = direction === 'negative' ? 'step3.harmPick.title' : 'step3.helpPick.title';
  const subtitleKey = direction === 'negative' ? 'step3.harmPick.subtitle' : 'step3.helpPick.subtitle';
  const helperKey = direction === 'negative' ? 'step3.harmPick.helper' : 'step3.helpPick.helper';

  const selectedIds = collectSelectedConsequenceIds(option, direction);

  const toggle = (template: ConsequenceTemplate) => {
    const isSelected = selectedIds.has(template.id);
    if (isSelected) {
      onUpdate(removeConsequence(option, template, direction));
    } else {
      onUpdate(addConsequence(option, template, direction));
    }
  };

  return (
    <ConversationalScreen
      progress={progressLabel}
      title={
        <>
          {t(titleKey, { option: option.label || t('step3.untitledOption') })}
        </>
      }
      subtitle={t(subtitleKey)}
      helper={t(helperKey)}
      helpKey={direction === 'negative' ? 'step3.harmPick' : 'step3.helpPick'}
      onBack={onRetreat}
      onContinue={onAdvance}
      continueLabel={selectedIds.size === 0 ? t('step3.skipNothingFits') : undefined}
    >
      <div className="space-y-3 mx-auto max-w-md">
        {consequences.map((c) => {
          const active = selectedIds.has(c.id);
          return (
            <button
              key={c.id}
              type="button"
              role="checkbox"
              aria-checked={active}
              onClick={() => toggle(c)}
              className={cn(
                'w-full rounded-2xl border p-4 text-left transition-colors',
                active
                  ? 'bg-foreground text-background border-foreground'
                  : 'bg-background border-border hover:border-foreground/40'
              )}
            >
              <p className="text-sm font-semibold">{t(c.i18nLabel)}</p>
              <p className={cn('text-xs mt-1', active ? 'text-background/80' : 'text-muted-foreground')}>
                {t(c.i18nDesc)}
              </p>
            </button>
          );
        })}
      </div>
    </ConversationalScreen>
  );
}

/* --------- Consequence detail screen (severity + sureness) --------- */

interface DetailProps {
  progressLabel: string;
  option: DeliberationOption;
  consequenceId: string;
  direction: 'positive' | 'negative';
  onAdvance: () => void;
  onRetreat: () => void;
  onUpdate: (patch: Partial<DeliberationOption>) => void;
}

function ConsequenceDetailScreen({
  progressLabel,
  option,
  consequenceId,
  direction,
  onAdvance,
  onRetreat,
  onUpdate,
}: DetailProps) {
  const { t } = useTranslation('deliberate');
  const template = findConsequence(consequenceId);
  if (!template) return null;

  const impact = findImpactFor(option, template, direction);

  const setMagnitude = (v: 1 | 2 | 3 | 4 | 5) => {
    if (template.maqsad) {
      const next = option.maqasidImpacts.map((i) => {
        if (i.id !== impact?.id) return i;
        return { ...i, magnitude: v as Magnitude, tier: tierForMagnitude(v) };
      });
      onUpdate({ maqasidImpacts: next });
    } else if (template.taha) {
      const next = option.tahaImpacts.map((i) => {
        if (i.id !== impact?.id) return i;
        return { ...i, magnitude: v as Magnitude, tier: tierForMagnitude(v) };
      });
      onUpdate({ tahaImpacts: next });
    }
  };

  const setSureness = (v: 1 | 2 | 3 | 4 | 5) => {
    const conf = SURENESS_TO_CONFIDENCE[v];
    if (template.maqsad) {
      const next = option.maqasidImpacts.map((i) => {
        if (i.id !== impact?.id) return i;
        return { ...i, causalConfidence: conf };
      });
      onUpdate({ maqasidImpacts: next });
    } else if (template.taha) {
      const next = option.tahaImpacts.map((i) => {
        if (i.id !== impact?.id) return i;
        return { ...i, causalConfidence: conf };
      });
      onUpdate({ tahaImpacts: next });
    }
  };

  const titleKey = direction === 'negative' ? 'step3.detail.harmTitle' : 'step3.detail.helpTitle';
  const magLabel = direction === 'negative' ? 'severity' : 'help';

  return (
    <ConversationalScreen
      progress={progressLabel}
      title={t(titleKey, { label: t(template.i18nLabel) })}
      subtitle={t('step3.detail.subtitle')}
      helpKey="step3.detail"
      onBack={onRetreat}
      onContinue={onAdvance}
      continueDisabled={!impact?.magnitude || !impact?.causalConfidence}
    >
      <div className="mx-auto max-w-md space-y-10">
        <div>
          <p className="text-sm font-medium mb-3 text-center">
            {direction === 'negative' ? t('step3.detail.howBigHarm') : t('step3.detail.howBigHelp')}
          </p>
          <PlainScale
            value={(impact?.magnitude ?? null) as 1 | 2 | 3 | 4 | 5 | null}
            onChange={setMagnitude}
            variant={magLabel}
            ariaLabel={direction === 'negative' ? t('step3.detail.howBigHarm') : t('step3.detail.howBigHelp')}
          />
        </div>
        <div>
          <p className="text-sm font-medium mb-3 text-center">{t('step3.detail.howSure')}</p>
          <PlainScale
            value={(confidenceToSureness(impact?.causalConfidence) ?? null) as 1 | 2 | 3 | 4 | 5 | null}
            onChange={setSureness}
            variant="sureness"
            ariaLabel={t('step3.detail.howSure')}
          />
        </div>
      </div>
    </ConversationalScreen>
  );
}

function confidenceToSureness(c: MaqsidImpact['causalConfidence'] | undefined): 1 | 2 | 3 | 4 | 5 | undefined {
  if (!c) return undefined;
  const map: Record<string, 1 | 2 | 3 | 4 | 5> = {
    jahl: 1,
    shakk: 2,
    zann: 3,
    zann_strong: 4,
    yaqin: 5,
  };
  return map[c];
}

/* --------- Helpers: stable consequence ↔ impact mapping --------- */

function impactCidForMaqasid(impact: MaqsidImpact): string | undefined {
  if (impact.notes && impact.notes.startsWith('cid:')) return impact.notes.slice(4);
  return undefined;
}

function impactCidForTaha(impact: TahaImpact): string | undefined {
  if (impact.id.startsWith('cid:')) return impact.id.slice(4);
  return undefined;
}

function collectSelectedConsequenceIds(
  option: DeliberationOption,
  direction: 'positive' | 'negative'
): Set<string> {
  const set = new Set<string>();
  for (const i of option.maqasidImpacts) {
    if (i.direction !== direction) continue;
    const cid = impactCidForMaqasid(i);
    if (cid) set.add(cid);
  }
  for (const i of option.tahaImpacts) {
    if (i.direction !== direction) continue;
    const cid = impactCidForTaha(i);
    if (cid) set.add(cid);
  }
  return set;
}

function findImpactFor(
  option: DeliberationOption,
  template: ConsequenceTemplate,
  direction: 'positive' | 'negative'
): MaqsidImpact | TahaImpact | undefined {
  if (template.maqsad) {
    return option.maqasidImpacts.find(
      (i) => i.direction === direction && impactCidForMaqasid(i) === template.id
    );
  }
  if (template.taha) {
    return option.tahaImpacts.find(
      (i) => i.direction === direction && impactCidForTaha(i) === template.id
    );
  }
  return undefined;
}

function addConsequence(
  option: DeliberationOption,
  template: ConsequenceTemplate,
  direction: 'positive' | 'negative'
): Partial<DeliberationOption> {
  if (template.maqsad) {
    const fresh: MaqsidImpact = {
      id: crypto.randomUUID(),
      maqsad: template.maqsad,
      direction,
      tier: 'haji', // will adjust when severity picked
      magnitude: 3,
      causalConfidence: 'zann_strong',
      affected: ['self'],
      notes: `cid:${template.id}`,
    };
    return { maqasidImpacts: [...option.maqasidImpacts, fresh] };
  }
  if (template.taha) {
    const fresh: TahaImpact = {
      id: `cid:${template.id}`,
      axis: template.taha,
      direction,
      tier: 'haji',
      magnitude: 3,
      causalConfidence: 'zann_strong',
    };
    return { tahaImpacts: [...option.tahaImpacts, fresh] };
  }
  return {};
}

function removeConsequence(
  option: DeliberationOption,
  template: ConsequenceTemplate,
  direction: 'positive' | 'negative'
): Partial<DeliberationOption> {
  if (template.maqsad) {
    return {
      maqasidImpacts: option.maqasidImpacts.filter(
        (i) => !(i.direction === direction && impactCidForMaqasid(i) === template.id)
      ),
    };
  }
  if (template.taha) {
    return {
      tahaImpacts: option.tahaImpacts.filter(
        (i) => !(i.direction === direction && impactCidForTaha(i) === template.id)
      ),
    };
  }
  return {};
}
