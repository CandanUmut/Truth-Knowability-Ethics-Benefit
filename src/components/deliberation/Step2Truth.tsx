import { useTranslation } from 'react-i18next';
import { Plus, X, AlertTriangle } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Segmented } from '@/components/ui/segmented';
import { Button } from '@/components/ui/button';
import { useSession } from '@/lib/storage/session';
import {
  BASIS_DEFAULT_CONFIDENCE,
  CONFIDENCE_SCORE,
  type Confidence,
  type EvidentialBasis,
  type TruthClaim,
} from '@/types/deliberation';

const BASES: EvidentialBasis[] = ['sense', 'demonstrative', 'tawatur', 'cumulative', 'single_source', 'intuition', 'none'];
const CONFIDENCES: Confidence[] = ['yaqin', 'zann_strong', 'zann', 'shakk', 'jahl'];

export function Step2Truth() {
  const { t } = useTranslation('deliberate');
  const current = useSession((s) => s.current);
  const setClaims = useSession((s) => s.setClaims);

  if (!current) return null;
  const claims = current.claims;

  const addClaim = () => {
    const newClaim: TruthClaim = {
      id: crypto.randomUUID(),
      text: '',
      basis: null,
      confidence: null,
      sensitivity: false,
    };
    setClaims([...claims, newClaim]);
  };

  const updateClaim = (id: string, patch: Partial<TruthClaim>) => {
    setClaims(claims.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  };

  const removeClaim = (id: string) => {
    setClaims(claims.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground leading-relaxed">{t('step2.intro')}</p>

      {claims.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border p-8 text-center">
          <p className="text-sm text-muted-foreground">{t('step2.empty')}</p>
        </div>
      )}

      <div className="space-y-4">
        {claims.map((claim, idx) => {
          const weak = claim.sensitivity && claim.confidence !== null && CONFIDENCE_SCORE[claim.confidence] <= 0.5;
          return (
            <div key={claim.id} className="rounded-2xl border border-border p-5 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  {t('step2.claim')} {idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeClaim(claim.id)}
                  aria-label={t('step2.removeClaim')}
                  className="text-muted-foreground hover:text-destructive transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <div>
                <Label htmlFor={`claim-text-${claim.id}`}>{t('step2.textLabel')}</Label>
                <Textarea
                  id={`claim-text-${claim.id}`}
                  value={claim.text}
                  onChange={(e) => updateClaim(claim.id, { text: e.target.value })}
                  placeholder={t('step2.textPlaceholder')}
                  rows={2}
                  className="min-h-[60px]"
                />
              </div>

              <div>
                <Label>{t('step2.basisLabel')}</Label>
                <p className="text-xs text-muted-foreground mb-2">{t('step2.basisHelp')}</p>
                <Segmented<EvidentialBasis>
                  value={claim.basis}
                  onChange={(v) =>
                    updateClaim(claim.id, {
                      basis: v,
                      confidence: claim.confidence ?? BASIS_DEFAULT_CONFIDENCE[v],
                    })
                  }
                  options={BASES.map((b) => ({
                    value: b,
                    label: t(`step2.basis.${b}`),
                    description: t(`step2.basisDesc.${b}`),
                  }))}
                  ariaLabel={t('step2.basisLabel')}
                  size="sm"
                />
              </div>

              <div>
                <Label>{t('step2.confidenceLabel')}</Label>
                <p className="text-xs text-muted-foreground mb-2">{t('step2.confidenceHelp')}</p>
                <Segmented<Confidence>
                  value={claim.confidence}
                  onChange={(v) => updateClaim(claim.id, { confidence: v })}
                  options={CONFIDENCES.map((c) => ({
                    value: c,
                    label: t(`confidence.${c}.label`),
                    description: `${t(`confidence.${c}.term`)} · ${CONFIDENCE_SCORE[c].toFixed(1)}`,
                  }))}
                  ariaLabel={t('step2.confidenceLabel')}
                  size="sm"
                />
              </div>

              <div>
                <label className="inline-flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={claim.sensitivity}
                    onChange={(e) => updateClaim(claim.id, { sensitivity: e.target.checked })}
                    className="mt-1 h-4 w-4 rounded border-border text-foreground focus:ring-ring"
                  />
                  <span>
                    <span className="block text-sm font-medium text-foreground">
                      {t('step2.sensitivityLabel')}
                    </span>
                    <span className="block text-xs text-muted-foreground mt-0.5">
                      {t('step2.sensitivityHelp')}
                    </span>
                  </span>
                </label>
              </div>

              {weak && (
                <div className="flex gap-3 rounded-xl bg-warning/10 border border-warning/30 p-4">
                  <AlertTriangle size={18} className="text-warning shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="text-sm">
                    <p className="font-medium text-foreground">{t('step2.warning.title')}</p>
                    <p className="text-muted-foreground mt-0.5 leading-relaxed">
                      {t('step2.warning.body')}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Button type="button" variant="outline" size="sm" onClick={addClaim}>
        <Plus size={14} aria-hidden="true" /> {t('step2.addClaim')}
      </Button>
    </div>
  );
}
