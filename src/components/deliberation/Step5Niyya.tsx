import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ConversationalScreen } from './ConversationalScreen';
import { Textarea } from '@/components/ui/textarea';
import { Segmented } from '@/components/ui/segmented';
import { useSession } from '@/lib/storage/session';
import type { NiyyaCheck } from '@/types/deliberation';
import { cn } from '@/lib/utils';

interface Props {
  onComplete: () => void;
  onBackToPrevious?: () => void;
}

const TOTAL = 8; // tone, q1, q2, q3, q4, q5, leaning, corrupt-confirm

const QUESTIONS: { key: 'q1' | 'q2' | 'q3' | 'q4' | 'q5'; needsTone?: boolean }[] = [
  { key: 'q1' },
  { key: 'q2' },
  { key: 'q3' },
  { key: 'q4' },
  { key: 'q5', needsTone: true },
];

export function Step5Niyya({ onComplete, onBackToPrevious }: Props) {
  const { t } = useTranslation('deliberate');
  const subStep = useSession((s) => s.subStep);
  const setSubStep = useSession((s) => s.setSubStep);
  const current = useSession((s) => s.current);
  const setNiyya = useSession((s) => s.setNiyya);

  // Normalize sentinel "last sub-step" from retreatStep().
  useEffect(() => {
    if (subStep > TOTAL) setSubStep(TOTAL);
  }, [subStep, setSubStep]);

  if (!current) return null;
  const niyya = current.niyya;
  const options = current.case.options;

  const update = (patch: Partial<NiyyaCheck>) => setNiyya({ ...niyya, ...patch });

  const advance = () => {
    if (subStep >= TOTAL) onComplete();
    else setSubStep(subStep + 1);
  };
  const retreat = () => {
    if (subStep <= 1) onBackToPrevious?.();
    else setSubStep(subStep - 1);
  };

  // 1: tone selection
  if (subStep <= 1) {
    return (
      <ConversationalScreen
        progress={t('step5.progress', { n: 1, total: TOTAL })}
        title={t('step5.tone.title')}
        subtitle={t('step5.tone.subtitle')}
        helper={t('step5.tone.helper')}
        onBack={retreat}
        onContinue={advance}
      >
        <div className="flex justify-center">
          <Segmented<'religious' | 'secular'>
            value={niyya.toneVariant ?? 'religious'}
            onChange={(v) => update({ toneVariant: v })}
            options={[
              { value: 'religious', label: t('step5.tone.religious') },
              { value: 'secular', label: t('step5.tone.secular') },
            ]}
            ariaLabel={t('step5.tone.title')}
          />
        </div>
      </ConversationalScreen>
    );
  }

  // 2..6: questions
  const questionIdx = subStep - 2;
  if (questionIdx >= 0 && questionIdx < QUESTIONS.length) {
    const q = QUESTIONS[questionIdx];
    const tone = niyya.toneVariant ?? 'religious';
    const titleKey = q.needsTone
      ? `step5.questions.${q.key}.${tone}`
      : `step5.questions.${q.key}.text`;
    return (
      <ConversationalScreen
        progress={t('step5.progress', { n: subStep, total: TOTAL })}
        title={t(titleKey)}
        subtitle={t('step5.questions.subtitle')}
        helper={t('step5.placeholder')}
        onBack={retreat}
        onContinue={advance}
      >
        <Textarea
          autoFocus
          value={niyya[q.key]}
          onChange={(e) => update({ [q.key]: e.target.value } as Partial<NiyyaCheck>)}
          placeholder={t('step5.questions.placeholder')}
          rows={5}
          className="text-base mx-auto max-w-md min-h-[140px]"
          aria-label={t(titleKey)}
        />
      </ConversationalScreen>
    );
  }

  // 7: leaning
  if (subStep === 7) {
    return (
      <ConversationalScreen
        progress={t('step5.progress', { n: 7, total: TOTAL })}
        title={t('step5.leaning.title')}
        subtitle={t('step5.leaning.subtitle')}
        helper={t('step5.leaning.helper')}
        onBack={retreat}
        onContinue={advance}
      >
        <div className="space-y-2 mx-auto max-w-md">
          {options.map((opt, idx) => {
            const active = niyya.leaningOptionId === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() =>
                  update({ leaningOptionId: active ? undefined : opt.id })
                }
                className={cn(
                  'w-full rounded-2xl border p-4 text-left transition-colors',
                  active
                    ? 'bg-foreground text-background border-foreground'
                    : 'bg-background border-border hover:border-foreground/40'
                )}
              >
                <p className="text-xs uppercase tracking-wider opacity-70">
                  {t('output.option')} {String.fromCharCode(65 + idx)}
                </p>
                <p className="text-base font-medium mt-1">
                  {opt.label || t('step3.untitledOption')}
                </p>
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => update({ leaningOptionId: undefined })}
            className={cn(
              'w-full rounded-2xl border p-4 text-left transition-colors text-muted-foreground italic',
              !niyya.leaningOptionId
                ? 'bg-secondary border-foreground/20'
                : 'bg-background border-border hover:border-foreground/40'
            )}
          >
            {t('step5.leaning.unsure')}
          </button>
        </div>
      </ConversationalScreen>
    );
  }

  // 8: corrupt confirm
  return (
    <ConversationalScreen
      progress={t('step5.progress', { n: 8, total: TOTAL })}
      title={t('step5.corrupt.title')}
      subtitle={t('step5.corrupt.subtitle')}
      helper={t('step5.corrupt.helper')}
      onBack={retreat}
      onContinue={advance}
      continueLabel={t('step5.corrupt.continue')}
    >
      <div className="mx-auto max-w-md">
        <label className="flex items-start gap-3 cursor-pointer rounded-2xl border border-border p-4 hover:border-foreground/40 transition-colors">
          <input
            type="checkbox"
            checked={!!niyya.selfReportedCorrupt}
            onChange={(e) => update({ selfReportedCorrupt: e.target.checked })}
            className="mt-1 h-4 w-4 rounded border-border text-foreground focus:ring-ring"
          />
          <span>
            <span className="block text-sm font-medium text-foreground">
              {t('step5.corrupt.label')}
            </span>
            <span className="block text-xs text-muted-foreground mt-1 leading-relaxed">
              {t('step5.corrupt.note')}
            </span>
          </span>
        </label>
      </div>
    </ConversationalScreen>
  );
}
