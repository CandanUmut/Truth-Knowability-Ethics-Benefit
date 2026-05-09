import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, X, Sparkles } from 'lucide-react';
import { ConversationalScreen } from './ConversationalScreen';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { SourceCard } from '@/components/common/SourceCard';
import { useSession } from '@/lib/storage/session';
import { sourcesFor, getSource } from '@/lib/sources';
import type { SourceConsultation } from '@/types/deliberation';
import { cn } from '@/lib/utils';

interface Props {
  onComplete: () => void;
  onBackToPrevious?: () => void;
}

const TOTAL = 2; // gate + (matched | custom)

export function Step4Sources({ onComplete, onBackToPrevious }: Props) {
  const { t } = useTranslation('deliberate');
  const subStep = useSession((s) => s.subStep);
  const setSubStep = useSession((s) => s.setSubStep);
  const current = useSession((s) => s.current);
  const setConsultations = useSession((s) => s.setConsultations);

  useEffect(() => {
    if (subStep > TOTAL) setSubStep(TOTAL);
  }, [subStep, setSubStep]);

  const matched = useMemo(() => {
    if (!current) return [];
    return sourcesFor(current.case.description);
  }, [current]);

  if (!current) return null;
  const consultations = current.consultations;

  // Gate
  if (subStep <= 1) {
    return (
      <ConversationalScreen
        progress={t('step4.progress', { n: 1, total: TOTAL })}
        title={t('step4.gate.title')}
        subtitle={t('step4.gate.subtitle')}
        helper={t('step4.gate.helper')}
        helpKey="step4.gate"
        onBack={onBackToPrevious}
      >
        <div className="space-y-3 mx-auto max-w-md">
          <GateOption
            label={t('step4.gate.show')}
            desc={t('step4.gate.showDesc', { count: matched.length })}
            onClick={() => setSubStep(2)}
            active={false}
          />
          <GateOption
            label={t('step4.gate.custom')}
            desc={t('step4.gate.customDesc')}
            onClick={() => {
              if (consultations.length === 0) {
                setConsultations([newCustom()]);
              }
              setSubStep(2);
            }}
            active={false}
          />
          <GateOption
            label={t('step4.gate.skip')}
            desc={t('step4.gate.skipDesc')}
            onClick={onComplete}
            active={false}
          />
        </div>
      </ConversationalScreen>
    );
  }

  // Sub-step 2 — present matched + already-added consultations + ability to add custom
  const addFromLibrary = (sourceId: string, bearsOnCase: 'yes' | 'no' | 'unsure') => {
    const existing = consultations.find((c) => c.sourceId === sourceId);
    if (existing) {
      // Toggle: if same answer clicked again, remove; otherwise update.
      if (existing.bearsOnCase === bearsOnCase) {
        setConsultations(consultations.filter((c) => c.id !== existing.id));
      } else {
        setConsultations(
          consultations.map((c) => (c.id === existing.id ? { ...c, bearsOnCase } : c))
        );
      }
      return;
    }
    const src = getSource(sourceId);
    if (!src) return;
    const citation =
      src.kind === 'quran'
        ? `Q. ${src.data.sura}:${src.data.aya}`
        : src.kind === 'hadith'
        ? `${src.data.collection} #${src.data.number}`
        : src.kind === 'qaida'
        ? src.data.transliteration
        : `${src.data.scholar} — ${src.data.work}`;
    const fresh: SourceConsultation = {
      id: crypto.randomUUID(),
      sourceId,
      citation,
      bearsOnCase,
    };
    setConsultations([...consultations, fresh]);
  };

  const currentAnswerFor = (sourceId: string): 'yes' | 'no' | 'unsure' | null => {
    const c = consultations.find((c) => c.sourceId === sourceId);
    return c?.bearsOnCase ?? null;
  };

  const updateConsult = (id: string, patch: Partial<SourceConsultation>) =>
    setConsultations(consultations.map((c) => (c.id === id ? { ...c, ...patch } : c)));

  const removeConsult = (id: string) =>
    setConsultations(consultations.filter((c) => c.id !== id));

  const addCustom = () => setConsultations([...consultations, newCustom()]);

  return (
    <ConversationalScreen
      progress={t('step4.progress', { n: 2, total: TOTAL })}
      title={t('step4.review.title')}
      subtitle={t('step4.review.subtitle')}
      helper={t('step4.review.helper')}
      onBack={() => setSubStep(1)}
      onContinue={onComplete}
    >
      <div className="space-y-8 mx-auto max-w-md">
        {matched.length > 0 && (
          <section className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Sparkles size={12} aria-hidden="true" /> {t('step4.review.suggested')}
            </h3>
            <div className="space-y-3">
              {matched.map((src) => {
                const answer = currentAnswerFor(src.data.id);
                return (
                  <div key={src.data.id} className="space-y-2">
                    <SourceCard source={src} compact />
                    <div className="flex flex-wrap gap-1.5 pl-1">
                      <ResonanceButton
                        active={answer === 'yes'}
                        onClick={() => addFromLibrary(src.data.id, 'yes')}
                      >
                        {t('step4.review.bears.yes')}
                      </ResonanceButton>
                      <ResonanceButton
                        active={answer === 'unsure'}
                        onClick={() => addFromLibrary(src.data.id, 'unsure')}
                      >
                        {t('step4.review.bears.unsure')}
                      </ResonanceButton>
                      <ResonanceButton
                        active={answer === 'no'}
                        onClick={() => addFromLibrary(src.data.id, 'no')}
                      >
                        {t('step4.review.bears.no')}
                      </ResonanceButton>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        <section className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            {t('step4.review.yours')}
          </h3>
          {consultations.length === 0 && (
            <p className="text-xs text-muted-foreground italic">{t('step4.review.empty')}</p>
          )}
          <div className="space-y-3">
            {consultations.map((c, idx) => {
              const source = c.sourceId ? getSource(c.sourceId) : null;
              return (
                <div key={c.id} className="rounded-2xl border border-border p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      {t('step4.source')} {idx + 1}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeConsult(c.id)}
                      aria-label={t('step4.removeSource')}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  {source ? (
                    <SourceCard source={source} compact />
                  ) : (
                    <div>
                      <Label htmlFor={`citation-${c.id}`}>{t('step4.review.citationLabel')}</Label>
                      <Input
                        id={`citation-${c.id}`}
                        value={c.citation ?? ''}
                        onChange={(e) =>
                          updateConsult(c.id, {
                            citation: e.target.value,
                            sourceId: c.sourceId || e.target.value,
                          })
                        }
                        placeholder={t('step4.review.citationPlaceholder')}
                      />
                    </div>
                  )}
                  <Textarea
                    value={c.reasoning ?? ''}
                    onChange={(e) => updateConsult(c.id, { reasoning: e.target.value })}
                    placeholder={t('step4.review.reasoningPlaceholder')}
                    rows={2}
                    className="min-h-[56px] text-sm"
                    aria-label={t('step4.review.reasoningLabel')}
                  />
                </div>
              );
            })}
          </div>
          <Button type="button" variant="outline" size="sm" onClick={addCustom}>
            <Plus size={14} aria-hidden="true" /> {t('step4.review.addCustom')}
          </Button>
        </section>
      </div>
    </ConversationalScreen>
  );
}

function ResonanceButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'h-8 rounded-full px-3.5 text-xs font-medium border transition-colors',
        active
          ? 'bg-foreground text-background border-foreground'
          : 'bg-background border-border text-muted-foreground hover:text-foreground hover:border-foreground/40'
      )}
    >
      {children}
    </button>
  );
}

function GateOption({
  label,
  desc,
  onClick,
  active,
}: {
  label: string;
  desc: string;
  onClick: () => void;
  active: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full rounded-2xl border p-4 text-left transition-colors',
        active
          ? 'bg-foreground text-background border-foreground'
          : 'bg-background border-border hover:border-foreground/40'
      )}
    >
      <p className="text-base font-semibold">{label}</p>
      <p className={cn('text-xs mt-1', active ? 'text-background/80' : 'text-muted-foreground')}>
        {desc}
      </p>
    </button>
  );
}

function newCustom(): SourceConsultation {
  return {
    id: crypto.randomUUID(),
    sourceId: '',
    citation: '',
    bearsOnCase: 'yes',
  };
}
