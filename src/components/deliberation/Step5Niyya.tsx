import { useTranslation } from 'react-i18next';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Segmented } from '@/components/ui/segmented';
import { useSession } from '@/lib/storage/session';
import type { NiyyaCheck } from '@/types/deliberation';

const QUESTIONS: (keyof Pick<NiyyaCheck, 'q1' | 'q2' | 'q3' | 'q4' | 'q5'>)[] = [
  'q1',
  'q2',
  'q3',
  'q4',
  'q5',
];

export function Step5Niyya() {
  const { t } = useTranslation('deliberate');
  const current = useSession((s) => s.current);
  const setNiyya = useSession((s) => s.setNiyya);

  if (!current) return null;
  const niyya = current.niyya;
  const options = current.case.options;

  const update = (patch: Partial<NiyyaCheck>) => setNiyya({ ...niyya, ...patch });

  return (
    <div className="space-y-10">
      <div className="rounded-2xl bg-secondary/50 border border-border p-5">
        <p className="text-sm font-medium">{t('step5.intro.title')}</p>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t('step5.intro.body')}</p>
      </div>

      <div>
        <Label>{t('step5.toneLabel')}</Label>
        <p className="text-xs text-muted-foreground mb-2">{t('step5.toneHelp')}</p>
        <Segmented<'religious' | 'secular'>
          value={niyya.toneVariant ?? 'religious'}
          onChange={(v) => update({ toneVariant: v })}
          options={[
            { value: 'religious', label: t('step5.tone.religious') },
            { value: 'secular', label: t('step5.tone.secular') },
          ]}
          ariaLabel={t('step5.toneLabel')}
          size="sm"
        />
      </div>

      {QUESTIONS.map((q) => {
        const isQ5 = q === 'q5';
        const questionKey = isQ5 ? `step5.questions.${q}.${niyya.toneVariant ?? 'religious'}` : `step5.questions.${q}.text`;
        return (
          <div key={q} className="space-y-3">
            <p className="text-base font-medium text-foreground leading-relaxed">
              {t(questionKey)}
            </p>
            <Textarea
              value={niyya[q]}
              onChange={(e) => update({ [q]: e.target.value } as Partial<NiyyaCheck>)}
              placeholder={t('step5.placeholder')}
              rows={4}
              className="min-h-[100px]"
            />
          </div>
        );
      })}

      {options.length > 0 && (
        <div className="space-y-3">
          <Label>{t('step5.leaningLabel')}</Label>
          <p className="text-xs text-muted-foreground">{t('step5.leaningHelp')}</p>
          <div className="flex flex-wrap gap-2">
            {options.map((opt, idx) => {
              const active = niyya.leaningOptionId === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() =>
                    update({ leaningOptionId: active ? undefined : opt.id })
                  }
                  className={
                    'rounded-full border px-4 h-9 text-sm transition-colors ' +
                    (active
                      ? 'bg-foreground text-background border-foreground'
                      : 'bg-background border-border text-muted-foreground hover:text-foreground hover:border-foreground/40')
                  }
                >
                  {String.fromCharCode(65 + idx)} · {opt.label || t('step3.untitled')}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="rounded-xl border border-border p-4">
        <label className="inline-flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={!!niyya.selfReportedCorrupt}
            onChange={(e) => update({ selfReportedCorrupt: e.target.checked })}
            className="mt-1 h-4 w-4 rounded border-border text-foreground focus:ring-ring"
          />
          <span>
            <span className="block text-sm font-medium text-foreground">
              {t('step5.corruptLabel')}
            </span>
            <span className="block text-xs text-muted-foreground mt-0.5 leading-relaxed">
              {t('step5.corruptHelp')}
            </span>
          </span>
        </label>
      </div>
    </div>
  );
}
