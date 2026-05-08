import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, X } from 'lucide-react';
import { ConversationalScreen } from './ConversationalScreen';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSession } from '@/lib/storage/session';
import type { DeliberationOption } from '@/types/deliberation';

interface Props {
  onComplete: () => void;
  onBackToPrevious?: () => void;
}

const SUB_TOTAL = 2;

function newOption(label = ''): DeliberationOption {
  return {
    id: crypto.randomUUID(),
    label,
    description: '',
    maqasidImpacts: [],
    tahaImpacts: [],
  };
}

export function Step1Case({ onComplete, onBackToPrevious }: Props) {
  const { t } = useTranslation('deliberate');
  const subStep = useSession((s) => s.subStep);
  const setSubStep = useSession((s) => s.setSubStep);
  const current = useSession((s) => s.current);
  const updateCase = useSession((s) => s.updateCase);

  // Smart defaults — applied once when the user enters Step 1.
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
    // Ensure we have at least two option rows ready when the user reaches sub-step 2.
    if (c.options.length < 2) {
      const needed = 2 - c.options.length;
      const fresh = Array.from({ length: needed }, () => newOption());
      updateCase({ options: [...c.options, ...fresh] });
    }
    // run once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!current) return null;
  const c = current.case;

  const setOptionLabel = (id: string, label: string) =>
    updateCase({ options: c.options.map((o) => (o.id === id ? { ...o, label } : o)) });
  const setOptionDescription = (id: string, description: string) =>
    updateCase({ options: c.options.map((o) => (o.id === id ? { ...o, description } : o)) });
  const addOption = () => updateCase({ options: [...c.options, newOption()] });
  const removeOption = (id: string) =>
    updateCase({ options: c.options.filter((o) => o.id !== id) });

  const filledOptionCount = c.options.filter((o) => o.label.trim().length > 0).length;

  if (subStep <= 1) {
    return (
      <ConversationalScreen
        progress={t('step1.progress', { n: 1, total: SUB_TOTAL })}
        title={t('step1.q1.title')}
        subtitle={t('step1.q1.subtitle')}
        helper={t('step1.q1.helper')}
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
          aria-label={t('step1.q1.title')}
          className="text-base"
        />
      </ConversationalScreen>
    );
  }

  return (
    <ConversationalScreen
      progress={t('step1.progress', { n: 2, total: SUB_TOTAL })}
      title={t('step1.q2.title')}
      subtitle={t('step1.q2.subtitle')}
      helper={t('step1.q2.helper')}
      onBack={() => setSubStep(1)}
      onContinue={onComplete}
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
              placeholder={t('step1.q2.descPlaceholder')}
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
