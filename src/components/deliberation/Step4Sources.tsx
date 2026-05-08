import { useTranslation } from 'react-i18next';
import { Plus, X } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Segmented } from '@/components/ui/segmented';
import { Button } from '@/components/ui/button';
import { useSession } from '@/lib/storage/session';
import type { SourceConsultation } from '@/types/deliberation';

const BEARS_OPTIONS: ('yes' | 'no' | 'unsure')[] = ['yes', 'no', 'unsure'];

export function Step4Sources() {
  const { t } = useTranslation('deliberate');
  const current = useSession((s) => s.current);
  const setConsultations = useSession((s) => s.setConsultations);

  if (!current) return null;
  const consultations = current.consultations;

  const add = () => {
    const fresh: SourceConsultation = {
      id: crypto.randomUUID(),
      sourceId: '',
      citation: '',
      bearsOnCase: null,
    };
    setConsultations([...consultations, fresh]);
  };

  const update = (id: string, patch: Partial<SourceConsultation>) =>
    setConsultations(consultations.map((c) => (c.id === id ? { ...c, ...patch } : c)));

  const remove = (id: string) => setConsultations(consultations.filter((c) => c.id !== id));

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-secondary/50 border border-border p-5">
        <p className="text-sm text-foreground font-medium">{t('step4.intro.title')}</p>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t('step4.intro.body')}</p>
        <p className="mt-3 text-xs text-muted-foreground/80 italic">{t('step4.intro.phase4')}</p>
      </div>

      {consultations.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border p-8 text-center">
          <p className="text-sm text-muted-foreground">{t('step4.empty')}</p>
        </div>
      )}

      <div className="space-y-4">
        {consultations.map((c, idx) => (
          <div key={c.id} className="rounded-2xl border border-border p-5 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">
                {t('step4.source')} {idx + 1}
              </span>
              <button
                type="button"
                onClick={() => remove(c.id)}
                aria-label={t('step4.removeSource')}
                className="text-muted-foreground hover:text-destructive transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div>
              <Label htmlFor={`citation-${c.id}`}>{t('step4.citationLabel')}</Label>
              <p className="text-xs text-muted-foreground mb-2">{t('step4.citationHelp')}</p>
              <Input
                id={`citation-${c.id}`}
                value={c.citation ?? ''}
                onChange={(e) => update(c.id, { citation: e.target.value, sourceId: c.sourceId || e.target.value })}
                placeholder={t('step4.citationPlaceholder')}
              />
            </div>

            <div>
              <Label>{t('step4.bearsLabel')}</Label>
              <Segmented<'yes' | 'no' | 'unsure'>
                value={c.bearsOnCase}
                onChange={(v) => update(c.id, { bearsOnCase: v })}
                options={BEARS_OPTIONS.map((v) => ({
                  value: v,
                  label: t(`step4.bears.${v}`),
                }))}
                ariaLabel={t('step4.bearsLabel')}
                size="sm"
              />
            </div>

            {c.bearsOnCase === 'yes' && (
              <>
                <div>
                  <Label htmlFor={`reasoning-${c.id}`}>{t('step4.reasoningLabel')}</Label>
                  <p className="text-xs text-muted-foreground mb-2">{t('step4.reasoningHelp')}</p>
                  <Textarea
                    id={`reasoning-${c.id}`}
                    value={c.reasoning ?? ''}
                    onChange={(e) => update(c.id, { reasoning: e.target.value })}
                    placeholder={t('step4.reasoningPlaceholder')}
                    rows={3}
                    className="min-h-[80px]"
                  />
                </div>
                <div>
                  <label className="inline-flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!c.followsMinority}
                      onChange={(e) => update(c.id, { followsMinority: e.target.checked })}
                      className="mt-1 h-4 w-4 rounded border-border text-foreground focus:ring-ring"
                    />
                    <span>
                      <span className="block text-sm font-medium text-foreground">
                        {t('step4.minorityLabel')}
                      </span>
                      <span className="block text-xs text-muted-foreground mt-0.5">
                        {t('step4.minorityHelp')}
                      </span>
                    </span>
                  </label>
                </div>
                {c.followsMinority && (
                  <div>
                    <Label htmlFor={`minority-${c.id}`}>{t('step4.minorityReasoningLabel')}</Label>
                    <Textarea
                      id={`minority-${c.id}`}
                      value={c.minorityReasoning ?? ''}
                      onChange={(e) => update(c.id, { minorityReasoning: e.target.value })}
                      rows={2}
                      className="min-h-[60px]"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      <Button type="button" variant="outline" size="sm" onClick={add}>
        <Plus size={14} aria-hidden="true" /> {t('step4.addSource')}
      </Button>
    </div>
  );
}
