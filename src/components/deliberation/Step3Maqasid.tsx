import { useTranslation } from 'react-i18next';
import { Label } from '@/components/ui/label';
import { Segmented } from '@/components/ui/segmented';
import { StepperScale } from '@/components/ui/stepper-scale';
import { useSession } from '@/lib/storage/session';
import {
  AFFECTED_PARTIES,
  MAQASID,
  TAHA_AXES,
  type AffectedParty,
  type Confidence,
  type DeliberationOption,
  type Direction,
  type Magnitude,
  type Maqsad,
  type MaqsidImpact,
  type TahaAxis,
  type TahaImpact,
  type Tier,
} from '@/types/deliberation';

const DIRECTIONS: Direction[] = ['positive', 'negative', 'neutral'];
const TIERS: Tier[] = ['daruri', 'haji', 'tahsini'];
const CONFIDENCES: Confidence[] = ['yaqin', 'zann_strong', 'zann', 'shakk', 'jahl'];

export function Step3Maqasid() {
  const { t } = useTranslation('deliberate');
  const current = useSession((s) => s.current);
  const updateCase = useSession((s) => s.updateCase);

  if (!current) return null;
  const options = current.case.options;

  const updateOption = (id: string, patch: Partial<DeliberationOption>) => {
    updateCase({
      options: options.map((o) => (o.id === id ? { ...o, ...patch } : o)),
    });
  };

  return (
    <div className="space-y-10">
      <p className="text-muted-foreground leading-relaxed">{t('step3.intro')}</p>

      {options.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border p-8 text-center">
          <p className="text-sm text-muted-foreground">{t('step3.noOptions')}</p>
        </div>
      )}

      {options.map((option, optIdx) => (
        <section key={option.id} className="space-y-6">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              {t('step3.option')} {String.fromCharCode(65 + optIdx)}
            </p>
            <p className="text-lg font-semibold text-foreground mt-0.5">
              {option.label || t('step3.untitled')}
            </p>
          </div>

          <div className="space-y-4">
            <Label>{t('step3.maqasidLabel')}</Label>
            {MAQASID.map((m) => {
              const impact = option.maqasidImpacts.find((i) => i.maqsad === m);
              return (
                <MaqsidImpactCard
                  key={m}
                  maqsad={m}
                  impact={impact}
                  onChange={(patch) => {
                    if (!patch && impact) {
                      updateOption(option.id, {
                        maqasidImpacts: option.maqasidImpacts.filter((i) => i.id !== impact.id),
                      });
                    } else if (patch) {
                      const existing = impact;
                      const merged: MaqsidImpact = {
                        id: existing?.id ?? crypto.randomUUID(),
                        maqsad: m,
                        direction: 'neutral',
                        tier: 'daruri',
                        magnitude: 3,
                        causalConfidence: 'zann_strong',
                        affected: ['self'],
                        ...existing,
                        ...patch,
                      };
                      updateOption(option.id, {
                        maqasidImpacts: existing
                          ? option.maqasidImpacts.map((i) => (i.id === existing.id ? merged : i))
                          : [...option.maqasidImpacts, merged],
                      });
                    }
                  }}
                />
              );
            })}
          </div>

          <div className="space-y-4">
            <Label>{t('step3.tahaLabel')}</Label>
            {TAHA_AXES.map((a) => {
              const impact = option.tahaImpacts.find((i) => i.axis === a);
              return (
                <TahaImpactCard
                  key={a}
                  axis={a}
                  impact={impact}
                  onChange={(patch) => {
                    if (!patch && impact) {
                      updateOption(option.id, {
                        tahaImpacts: option.tahaImpacts.filter((i) => i.id !== impact.id),
                      });
                    } else if (patch) {
                      const existing = impact;
                      const merged: TahaImpact = {
                        id: existing?.id ?? crypto.randomUUID(),
                        axis: a,
                        direction: 'neutral',
                        tier: 'tahsini',
                        magnitude: 3,
                        causalConfidence: 'zann_strong',
                        ...existing,
                        ...patch,
                      };
                      updateOption(option.id, {
                        tahaImpacts: existing
                          ? option.tahaImpacts.map((i) => (i.id === existing.id ? merged : i))
                          : [...option.tahaImpacts, merged],
                      });
                    }
                  }}
                />
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

function MaqsidImpactCard({
  maqsad,
  impact,
  onChange,
}: {
  maqsad: Maqsad;
  impact?: MaqsidImpact;
  onChange: (patch: Partial<MaqsidImpact> | null) => void;
}) {
  const { t } = useTranslation('deliberate');
  const direction = impact?.direction ?? 'neutral';
  const isActive = direction !== 'neutral';

  const toggleAffected = (party: AffectedParty) => {
    const current = impact?.affected ?? [];
    if (current.includes(party)) {
      onChange({ affected: current.filter((p) => p !== party) });
    } else {
      onChange({ affected: [...current, party] });
    }
  };

  return (
    <div className="rounded-2xl border border-border p-4 space-y-4">
      <div className="flex items-baseline justify-between">
        <div>
          <p className="text-sm font-semibold">{t(`maqasid.${maqsad}.label`)}</p>
          <p className="text-xs text-muted-foreground italic">{t(`maqasid.${maqsad}.term`)}</p>
        </div>
        <Segmented<Direction>
          value={direction}
          onChange={(v) => onChange({ direction: v })}
          options={DIRECTIONS.map((d) => ({
            value: d,
            label: t(`step3.direction.${d}`),
          }))}
          ariaLabel={t('step3.directionLabel')}
          size="sm"
        />
      </div>

      {isActive && (
        <div className="space-y-4 pt-2">
          <div>
            <Label>{t('step3.tierLabel')}</Label>
            <p className="text-xs text-muted-foreground mb-2">{t('step3.tierHelp')}</p>
            <Segmented<Tier>
              value={impact?.tier ?? null}
              onChange={(v) => onChange({ tier: v })}
              options={TIERS.map((tier) => ({
                value: tier,
                label: t(`tier.${tier}.label`),
                description: t(`tier.${tier}.desc`),
              }))}
              ariaLabel={t('step3.tierLabel')}
              size="sm"
            />
          </div>

          <div>
            <Label>{t('step3.magnitudeLabel')}</Label>
            <StepperScale
              value={impact?.magnitude ?? null}
              onChange={(v) => onChange({ magnitude: v as Magnitude })}
              ariaLabel={t('step3.magnitudeLabel')}
              lowLabel={t('step3.magnitudeLow')}
              highLabel={t('step3.magnitudeHigh')}
            />
          </div>

          <div>
            <Label>{t('step3.causalConfidenceLabel')}</Label>
            <Segmented<Confidence>
              value={impact?.causalConfidence ?? null}
              onChange={(v) => onChange({ causalConfidence: v })}
              options={CONFIDENCES.map((c) => ({
                value: c,
                label: t(`confidence.${c}.label`),
                description: t(`confidence.${c}.term`),
              }))}
              ariaLabel={t('step3.causalConfidenceLabel')}
              size="sm"
            />
          </div>

          <div>
            <Label>{t('step3.affectedLabel')}</Label>
            <div className="flex flex-wrap gap-2">
              {AFFECTED_PARTIES.map((p) => {
                const active = impact?.affected.includes(p);
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => toggleAffected(p)}
                    className={
                      'rounded-full border px-3 h-8 text-xs transition-colors ' +
                      (active
                        ? 'bg-foreground text-background border-foreground'
                        : 'bg-background border-border text-muted-foreground hover:text-foreground')
                    }
                  >
                    {t(`step3.affected.${p}`)}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TahaImpactCard({
  axis,
  impact,
  onChange,
}: {
  axis: TahaAxis;
  impact?: TahaImpact;
  onChange: (patch: Partial<TahaImpact> | null) => void;
}) {
  const { t } = useTranslation('deliberate');
  const direction = impact?.direction ?? 'neutral';
  const isActive = direction !== 'neutral';

  return (
    <div className="rounded-2xl border border-border p-4 space-y-4">
      <div className="flex items-baseline justify-between">
        <div>
          <p className="text-sm font-semibold">{t(`taha.${axis}.label`)}</p>
          <p className="text-xs text-muted-foreground italic">{t(`taha.${axis}.term`)}</p>
        </div>
        <Segmented<Direction>
          value={direction}
          onChange={(v) => onChange({ direction: v })}
          options={DIRECTIONS.map((d) => ({
            value: d,
            label: t(`step3.direction.${d}`),
          }))}
          ariaLabel={t('step3.directionLabel')}
          size="sm"
        />
      </div>

      {isActive && (
        <div className="space-y-4 pt-2">
          <div>
            <Label>{t('step3.tierLabel')}</Label>
            <Segmented<Tier>
              value={impact?.tier ?? null}
              onChange={(v) => onChange({ tier: v })}
              options={TIERS.map((tier) => ({
                value: tier,
                label: t(`tier.${tier}.label`),
              }))}
              ariaLabel={t('step3.tierLabel')}
              size="sm"
            />
          </div>
          <div>
            <Label>{t('step3.magnitudeLabel')}</Label>
            <StepperScale
              value={impact?.magnitude ?? null}
              onChange={(v) => onChange({ magnitude: v as Magnitude })}
              ariaLabel={t('step3.magnitudeLabel')}
            />
          </div>
          <div>
            <Label>{t('step3.causalConfidenceLabel')}</Label>
            <Segmented<Confidence>
              value={impact?.causalConfidence ?? null}
              onChange={(v) => onChange({ causalConfidence: v })}
              options={CONFIDENCES.map((c) => ({
                value: c,
                label: t(`confidence.${c}.label`),
              }))}
              ariaLabel={t('step3.causalConfidenceLabel')}
              size="sm"
            />
          </div>
        </div>
      )}
    </div>
  );
}
