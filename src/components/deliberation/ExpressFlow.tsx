import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, X } from 'lucide-react';
import { ConversationalScreen } from './ConversationalScreen';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Segmented } from '@/components/ui/segmented';
import { useSession } from '@/lib/storage/session';
import { deriveAllOptions } from '@/lib/auto-derive';
import type { DeliberationOption, NiyyaCheck } from '@/types/deliberation';
import { cn } from '@/lib/utils';

interface Props {
  onComplete: () => void;
  onBackToPrevious?: () => void;
}

const TOTAL = 3;

function newOption(label = ''): DeliberationOption {
  return {
    id: crypto.randomUUID(),
    label,
    description: '',
    maqasidImpacts: [],
    tahaImpacts: [],
  };
}

/**
 * ExpressFlow — the Quick path. Three screens:
 *   1. Case description
 *   2. Options (label + optional one-line description)
 *   3. Niyya-light: tone, leaning, and one conscience question
 *
 * On completion the component auto-derives maqāṣid / Tāhā impacts for
 * every option from the option text + case description, applies the
 * standard smart defaults that Step 1 used, and hands control off to
 * the dossier (OUTPUT_STEP). The user can then refine from there.
 */
export function ExpressFlow({ onComplete, onBackToPrevious }: Props) {
  const { t } = useTranslation('deliberate');
  const subStep = useSession((s) => s.subStep);
  const setSubStep = useSession((s) => s.setSubStep);
  const current = useSession((s) => s.current);
  const updateCase = useSession((s) => s.updateCase);
  const setNiyya = useSession((s) => s.setNiyya);

  // Smart defaults — applied once when the user enters Express.
  useEffect(() => {
    if (!current) return;
    const c = current.case;
    const patch: Parameters<typeof updateCase>[0] = {};
    if (c.agents.length === 0) {
      patch.agents = [{ id: crypto.randomUUID(), kind: 'self' }];
    }
    if (c.timeHorizon === null) patch.timeHorizon = 'weeks';
    if (c.reversibility === null) patch.reversibility = 3;
    if (Object.keys(c.stakes.maqasid).length === 0) {
      patch.stakes = {
        maqasid: { din: 3, nafs: 3, aql: 3, nasl: 3, mal: 3 },
        taha: { vital: 3, rational: 3, spiritual: 3 },
      };
    }
    if (Object.keys(patch).length > 0) updateCase(patch);
    if (c.options.length < 2) {
      const needed = 2 - c.options.length;
      const fresh = Array.from({ length: needed }, () => newOption());
      updateCase({ options: [...c.options, ...fresh] });
    }
    // run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Normalize sentinel "last sub-step" from retreatStep().
  useEffect(() => {
    if (subStep > TOTAL) setSubStep(TOTAL);
  }, [subStep, setSubStep]);

  if (!current) return null;
  const c = current.case;
  const niyya = current.niyya;

  const setOptionLabel = (id: string, label: string) =>
    updateCase({ options: c.options.map((o) => (o.id === id ? { ...o, label } : o)) });
  const setOptionDescription = (id: string, description: string) =>
    updateCase({ options: c.options.map((o) => (o.id === id ? { ...o, description } : o)) });
  const addOption = () => updateCase({ options: [...c.options, newOption()] });
  const removeOption = (id: string) =>
    updateCase({ options: c.options.filter((o) => o.id !== id) });

  const filledOptionCount = c.options.filter((o) => o.label.trim().length > 0).length;
  const updateNiyya = (patch: Partial<NiyyaCheck>) => setNiyya({ ...niyya, ...patch });

  const finishExpress = () => {
    // Auto-derive impacts from the combined case + option text. This is
    // the moment the framework's calculus gets non-empty input from a
    // user who never opened Step 3.
    const derived = deriveAllOptions(c.options, { caseDescription: c.description });
    updateCase({ options: derived });
    onComplete();
  };

  // — Screen 1: case description —
  if (subStep <= 1) {
    return (
      <ConversationalScreen
        progress={t('express.progress', { n: 1, total: TOTAL })}
        title={t('express.q1.title')}
        subtitle={t('express.q1.subtitle')}
        helper={t('express.q1.helper')}
        helpKey="step1.q1"
        onBack={onBackToPrevious}
        onContinue={() => setSubStep(2)}
        continueDisabled={c.description.trim().length < 4}
      >
        <Textarea
          autoFocus
          value={c.description}
          onChange={(e) => updateCase({ description: e.target.value })}
          placeholder={t('step1.q1.placeholder')}
          rows={6}
          aria-label={t('express.q1.title')}
          className="text-base"
        />
      </ConversationalScreen>
    );
  }

  // — Screen 2: options —
  if (subStep === 2) {
    return (
      <ConversationalScreen
        progress={t('express.progress', { n: 2, total: TOTAL })}
        title={t('express.q2.title')}
        subtitle={t('express.q2.subtitle')}
        helper={t('express.q2.helper')}
        helpKey="step1.q2"
        onBack={() => setSubStep(1)}
        onContinue={() => setSubStep(3)}
        continueDisabled={filledOptionCount < 2}
      >
        <div className="space-y-3 mx-auto max-w-md">
          {c.options.map((opt, idx) => (
            <div key={opt.id} className="rounded-2xl border border-border p-4 space-y-2.5">
              <div className="flex gap-2 items-center">
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground w-6">
                  {String.fromCharCode(65 + idx)}
                </span>
                <Input
                  value={opt.label}
                  onChange={(e) => setOptionLabel(opt.id, e.target.value)}
                  placeholder={t('step1.q2.optionPlaceholder')}
                  aria-label={t('step1.q2.optionAria', { letter: String.fromCharCode(65 + idx) })}
                />
                {c.options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeOption(opt.id)}
                    aria-label={t('step1.q2.remove')}
                    className="h-9 w-9 inline-flex items-center justify-center rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
              <Textarea
                value={opt.description ?? ''}
                onChange={(e) => setOptionDescription(opt.id, e.target.value)}
                placeholder={t('express.q2.descPlaceholder')}
                rows={2}
                className="min-h-[56px] text-sm"
              />
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={addOption}>
            <Plus size={14} aria-hidden="true" /> {t('step1.q2.addOption')}
          </Button>
        </div>
      </ConversationalScreen>
    );
  }

  // — Screen 3: niyya-light —
  return (
    <ConversationalScreen
      progress={t('express.progress', { n: 3, total: TOTAL })}
      title={t('express.q3.title')}
      subtitle={t('express.q3.subtitle')}
      helper={t('express.q3.helper')}
      helpKey="step5.questions.q5"
      onBack={() => setSubStep(2)}
      onContinue={finishExpress}
      continueLabel={t('express.q3.cta')}
    >
      <div className="mx-auto max-w-md space-y-8">
        <div className="space-y-2">
          <p className="text-sm font-medium">{t('step5.tone.title')}</p>
          <Segmented<'religious' | 'secular'>
            value={niyya.toneVariant ?? 'religious'}
            onChange={(v) => updateNiyya({ toneVariant: v })}
            options={[
              { value: 'religious', label: t('step5.tone.religious') },
              { value: 'secular', label: t('step5.tone.secular') },
            ]}
            ariaLabel={t('step5.tone.title')}
            size="sm"
          />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">{t('express.q3.leaning')}</p>
          <div className="space-y-2">
            {c.options.map((opt, idx) => {
              const active = niyya.leaningOptionId === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => updateNiyya({ leaningOptionId: active ? undefined : opt.id })}
                  className={cn(
                    'w-full rounded-2xl border p-3 text-left transition-colors',
                    active
                      ? 'bg-foreground text-background border-foreground'
                      : 'bg-background border-border hover:border-foreground/40'
                  )}
                >
                  <p className="text-xs uppercase tracking-wider opacity-70">
                    {t('output.option')} {String.fromCharCode(65 + idx)}
                  </p>
                  <p className="text-sm font-medium mt-0.5">
                    {opt.label || t('step3.untitledOption')}
                  </p>
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => updateNiyya({ leaningOptionId: undefined })}
              className={cn(
                'w-full rounded-2xl border p-3 text-left transition-colors text-muted-foreground italic text-sm',
                !niyya.leaningOptionId
                  ? 'bg-secondary border-foreground/20'
                  : 'bg-background border-border hover:border-foreground/40'
              )}
            >
              {t('step5.leaning.unsure')}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">
            {t(`step5.questions.q5.${niyya.toneVariant ?? 'religious'}`)}
          </p>
          <Textarea
            value={niyya.q5}
            onChange={(e) => updateNiyya({ q5: e.target.value })}
            placeholder={t('step5.questions.placeholder')}
            rows={4}
            className="text-base"
            aria-label={t(`step5.questions.q5.${niyya.toneVariant ?? 'religious'}`)}
          />
        </div>
      </div>
    </ConversationalScreen>
  );
}
