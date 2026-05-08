import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, X, AlertTriangle } from 'lucide-react';
import { ConversationalScreen } from './ConversationalScreen';
import { Textarea } from '@/components/ui/textarea';
import { PlainScale } from '@/components/ui/plain-scale';
import { Button } from '@/components/ui/button';
import { useSession } from '@/lib/storage/session';
import {
  CONFIDENCE_SCORE,
  type Confidence,
  type TruthClaim,
} from '@/types/deliberation';
import { SURENESS_TO_CONFIDENCE } from '@/data/consequences';
import { cn } from '@/lib/utils';

interface Props {
  onComplete: () => void;
  onBackToPrevious?: () => void;
}

const TOTAL_WHEN_GATED = 1; // just the gate
const TOTAL_WHEN_OPEN = 2; // gate + claims editor

type Mode = null | 'yes' | 'no' | 'unsure';

const SURENESS_FROM_CONFIDENCE: Record<Confidence, 1 | 2 | 3 | 4 | 5> = {
  jahl: 1,
  shakk: 2,
  zann: 3,
  zann_strong: 4,
  yaqin: 5,
};

export function Step2Truth({ onComplete, onBackToPrevious }: Props) {
  const { t } = useTranslation('deliberate');
  const subStep = useSession((s) => s.subStep);
  const setSubStep = useSession((s) => s.setSubStep);
  const current = useSession((s) => s.current);
  const setClaims = useSession((s) => s.setClaims);

  // Mode is implicit from claims state: claims.length > 0 ⇒ yes mode.
  const claims = current?.claims ?? [];
  const mode: Mode = claims.length > 0 ? 'yes' : (subStep > 1 ? 'no' : null);

  // Normalize sentinel from retreatStep().
  useEffect(() => {
    const total = mode === 'yes' ? TOTAL_WHEN_OPEN : TOTAL_WHEN_GATED;
    if (subStep > total) setSubStep(total);
  }, [subStep, mode, setSubStep]);

  if (!current) return null;

  if (subStep <= 1) {
    return (
      <ConversationalScreen
        progress={t('step2.progress', { n: 1, total: 2 })}
        title={t('step2.gate.title')}
        subtitle={t('step2.gate.subtitle')}
        helper={t('step2.gate.helper')}
        onBack={onBackToPrevious}
      >
        <div className="space-y-3 mx-auto max-w-md">
          <GateOption
            label={t('step2.gate.yes')}
            desc={t('step2.gate.yesDesc')}
            onClick={() => {
              if (claims.length === 0) {
                setClaims([newClaim()]);
              }
              setSubStep(2);
            }}
            active={mode === 'yes'}
          />
          <GateOption
            label={t('step2.gate.unsure')}
            desc={t('step2.gate.unsureDesc')}
            onClick={() => {
              setClaims([]);
              onComplete();
            }}
            active={false}
          />
          <GateOption
            label={t('step2.gate.no')}
            desc={t('step2.gate.noDesc')}
            onClick={() => {
              setClaims([]);
              onComplete();
            }}
            active={false}
          />
        </div>
      </ConversationalScreen>
    );
  }

  // sub-step 2: claims editor
  const updateClaim = (id: string, patch: Partial<TruthClaim>) =>
    setClaims(claims.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  const removeClaim = (id: string) => {
    const next = claims.filter((c) => c.id !== id);
    setClaims(next);
    if (next.length === 0) setSubStep(1); // back to the gate
  };
  const addClaim = () => setClaims([...claims, newClaim()]);

  return (
    <ConversationalScreen
      progress={t('step2.progress', { n: 2, total: 2 })}
      title={t('step2.claims.title')}
      subtitle={t('step2.claims.subtitle')}
      helper={t('step2.claims.helper')}
      onBack={() => setSubStep(1)}
      onContinue={onComplete}
      continueDisabled={claims.some((c) => !c.text.trim() || !c.confidence)}
    >
      <div className="space-y-5 mx-auto max-w-md">
        {claims.map((claim, idx) => {
          const weak =
            claim.sensitivity &&
            claim.confidence !== null &&
            CONFIDENCE_SCORE[claim.confidence] <= 0.5;
          return (
            <div key={claim.id} className="rounded-2xl border border-border p-4 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  {t('step2.claim')} {idx + 1}
                </p>
                <button
                  type="button"
                  onClick={() => removeClaim(claim.id)}
                  aria-label={t('step2.removeClaim')}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
              <Textarea
                value={claim.text}
                onChange={(e) => updateClaim(claim.id, { text: e.target.value })}
                placeholder={t('step2.claims.factPlaceholder')}
                rows={2}
                className="min-h-[60px] text-sm"
                aria-label={t('step2.claims.factLabel')}
              />
              <div>
                <p className="text-sm font-medium mb-2">{t('step2.claims.howSure')}</p>
                <PlainScale
                  value={claim.confidence ? SURENESS_FROM_CONFIDENCE[claim.confidence] : null}
                  onChange={(v) => updateClaim(claim.id, { confidence: SURENESS_TO_CONFIDENCE[v] })}
                  variant="sureness"
                  ariaLabel={t('step2.claims.howSure')}
                />
              </div>
              <label className="flex items-start gap-3 cursor-pointer text-sm">
                <input
                  type="checkbox"
                  checked={claim.sensitivity}
                  onChange={(e) => updateClaim(claim.id, { sensitivity: e.target.checked })}
                  className="mt-1 h-4 w-4 rounded border-border text-foreground focus:ring-ring"
                />
                <span>
                  <span className="block font-medium">{t('step2.claims.sensitivityLabel')}</span>
                  <span className="block text-xs text-muted-foreground mt-0.5">
                    {t('step2.claims.sensitivityHelp')}
                  </span>
                </span>
              </label>
              {weak && (
                <div className="flex gap-2 rounded-xl bg-warning/10 border border-warning/30 p-3 text-xs leading-relaxed">
                  <AlertTriangle size={14} className="text-warning shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{t('step2.claims.weakWarning')}</span>
                </div>
              )}
            </div>
          );
        })}
        <Button type="button" variant="outline" size="sm" onClick={addClaim}>
          <Plus size={14} aria-hidden="true" /> {t('step2.claims.addAnother')}
        </Button>
      </div>
    </ConversationalScreen>
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

function newClaim(): TruthClaim {
  return {
    id: crypto.randomUUID(),
    text: '',
    basis: null,
    confidence: null,
    sensitivity: false,
  };
}
