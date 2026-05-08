import { useTranslation } from 'react-i18next';
import { Plus, X } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Segmented } from '@/components/ui/segmented';
import { StepperScale } from '@/components/ui/stepper-scale';
import { Button } from '@/components/ui/button';
import { useSession } from '@/lib/storage/session';
import {
  MAQASID,
  TAHA_AXES,
  type AgentKind,
  type DeliberationOption,
  type Maqsad,
  type Reversibility,
  type Stake,
  type TahaAxis,
  type TimeHorizon,
} from '@/types/deliberation';

const AGENT_KINDS: AgentKind[] = ['self', 'family', 'employer', 'community', 'society', 'other'];
const TIME_HORIZONS: TimeHorizon[] = ['hours', 'days', 'weeks', 'months', 'years'];

function newOptionId() {
  return crypto.randomUUID();
}

function newOption(label = ''): DeliberationOption {
  return {
    id: newOptionId(),
    label,
    description: '',
    maqasidImpacts: [],
    tahaImpacts: [],
  };
}

export function Step1Case() {
  const { t } = useTranslation('deliberate');
  const current = useSession((s) => s.current);
  const updateCase = useSession((s) => s.updateCase);

  if (!current) return null;
  const c = current.case;

  const toggleAgent = (kind: AgentKind) => {
    const exists = c.agents.find((a) => a.kind === kind);
    if (exists) {
      updateCase({ agents: c.agents.filter((a) => a.kind !== kind) });
    } else {
      updateCase({ agents: [...c.agents, { id: crypto.randomUUID(), kind }] });
    }
  };

  const setOptionLabel = (id: string, label: string) => {
    updateCase({
      options: c.options.map((o) => (o.id === id ? { ...o, label } : o)),
    });
  };
  const setOptionDescription = (id: string, description: string) => {
    updateCase({
      options: c.options.map((o) => (o.id === id ? { ...o, description } : o)),
    });
  };
  const addOption = () => updateCase({ options: [...c.options, newOption()] });
  const removeOption = (id: string) => updateCase({ options: c.options.filter((o) => o.id !== id) });

  const setStakeMaqsad = (m: Maqsad, v: Stake) =>
    updateCase({ stakes: { ...c.stakes, maqasid: { ...c.stakes.maqasid, [m]: v } } });
  const setStakeTaha = (a: TahaAxis, v: Stake) =>
    updateCase({ stakes: { ...c.stakes, taha: { ...c.stakes.taha, [a]: v } } });

  return (
    <div className="space-y-10">
      <section>
        <Label htmlFor="case-description">{t('step1.descriptionLabel')}</Label>
        <p className="text-xs text-muted-foreground mb-2">{t('step1.descriptionHelp')}</p>
        <Textarea
          id="case-description"
          value={c.description}
          onChange={(e) => updateCase({ description: e.target.value })}
          placeholder={t('step1.descriptionPlaceholder')}
          rows={6}
        />
      </section>

      <section>
        <Label>{t('step1.agentsLabel')}</Label>
        <p className="text-xs text-muted-foreground mb-3">{t('step1.agentsHelp')}</p>
        <div className="flex flex-wrap gap-2">
          {AGENT_KINDS.map((kind) => {
            const active = c.agents.some((a) => a.kind === kind);
            return (
              <button
                key={kind}
                type="button"
                onClick={() => toggleAgent(kind)}
                className={
                  'rounded-full border px-3.5 h-9 text-sm transition-colors ' +
                  (active
                    ? 'bg-foreground text-background border-foreground'
                    : 'bg-background border-border text-muted-foreground hover:text-foreground hover:border-foreground/40')
                }
              >
                {t(`step1.agents.${kind}`)}
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <Label>{t('step1.optionsLabel')}</Label>
        <p className="text-xs text-muted-foreground mb-3">{t('step1.optionsHelp')}</p>
        <div className="space-y-3">
          {c.options.map((opt, idx) => (
            <div key={opt.id} className="rounded-2xl border border-border p-4 space-y-2.5">
              <div className="flex gap-2 items-start">
                <span className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">
                  {String.fromCharCode(65 + idx)}
                </span>
                <Input
                  value={opt.label}
                  onChange={(e) => setOptionLabel(opt.id, e.target.value)}
                  placeholder={t('step1.optionLabelPlaceholder')}
                />
                <button
                  type="button"
                  onClick={() => removeOption(opt.id)}
                  aria-label={t('step1.removeOption')}
                  className="h-11 w-11 inline-flex items-center justify-center rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              <Textarea
                value={opt.description ?? ''}
                onChange={(e) => setOptionDescription(opt.id, e.target.value)}
                placeholder={t('step1.optionDescriptionPlaceholder')}
                rows={2}
                className="min-h-[60px]"
              />
            </div>
          ))}
        </div>
        <Button type="button" variant="outline" size="sm" onClick={addOption} className="mt-3">
          <Plus size={14} aria-hidden="true" /> {t('step1.addOption')}
        </Button>
        {c.options.length < 2 && (
          <p className="mt-2 text-xs text-warning">{t('step1.atLeastTwo')}</p>
        )}
      </section>

      <section>
        <Label>{t('step1.timeHorizonLabel')}</Label>
        <p className="text-xs text-muted-foreground mb-2">{t('step1.timeHorizonHelp')}</p>
        <Segmented
          value={c.timeHorizon}
          onChange={(v) => updateCase({ timeHorizon: v })}
          options={TIME_HORIZONS.map((h) => ({ value: h, label: t(`step1.timeHorizon.${h}`) }))}
          ariaLabel={t('step1.timeHorizonLabel')}
        />
      </section>

      <section>
        <Label>{t('step1.reversibilityLabel')}</Label>
        <p className="text-xs text-muted-foreground mb-2">{t('step1.reversibilityHelp')}</p>
        <StepperScale
          value={c.reversibility}
          onChange={(v) => updateCase({ reversibility: v as Reversibility })}
          ariaLabel={t('step1.reversibilityLabel')}
          lowLabel={t('step1.reversibilityLow')}
          highLabel={t('step1.reversibilityHigh')}
        />
      </section>

      <section>
        <Label>{t('step1.stakesMaqasidLabel')}</Label>
        <p className="text-xs text-muted-foreground mb-3">{t('step1.stakesMaqasidHelp')}</p>
        <div className="space-y-3">
          {MAQASID.map((m) => (
            <div key={m} className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex-1 min-w-[140px]">
                <p className="text-sm font-medium text-foreground">{t(`maqasid.${m}.label`)}</p>
                <p className="text-xs text-muted-foreground italic">{t(`maqasid.${m}.term`)}</p>
              </div>
              <StepperScale
                value={c.stakes.maqasid[m] ?? null}
                onChange={(v) => setStakeMaqsad(m, v as Stake)}
                ariaLabel={t(`maqasid.${m}.label`)}
              />
            </div>
          ))}
        </div>
      </section>

      <section>
        <Label>{t('step1.stakesTahaLabel')}</Label>
        <p className="text-xs text-muted-foreground mb-3">{t('step1.stakesTahaHelp')}</p>
        <div className="space-y-3">
          {TAHA_AXES.map((a) => (
            <div key={a} className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex-1 min-w-[140px]">
                <p className="text-sm font-medium text-foreground">{t(`taha.${a}.label`)}</p>
                <p className="text-xs text-muted-foreground italic">{t(`taha.${a}.term`)}</p>
              </div>
              <StepperScale
                value={c.stakes.taha[a] ?? null}
                onChange={(v) => setStakeTaha(a, v as Stake)}
                ariaLabel={t(`taha.${a}.label`)}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
