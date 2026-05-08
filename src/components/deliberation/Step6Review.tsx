import { useTranslation } from 'react-i18next';
import { ConversationalScreen } from './ConversationalScreen';
import { Segmented } from '@/components/ui/segmented';
import { PlainScale } from '@/components/ui/plain-scale';
import { useSession } from '@/lib/storage/session';
import {
  MAQASID,
  type Maqsad,
  type Reversibility,
  type Stake,
  type TimeHorizon,
} from '@/types/deliberation';
import { GlossaryTerm } from '@/components/common/GlossaryTerm';

const HORIZONS: TimeHorizon[] = ['hours', 'days', 'weeks', 'months', 'years'];

interface Props {
  onComplete: () => void;
  onBackToPrevious?: () => void;
}

/**
 * A short review surface that lets the user edit the smart defaults
 * applied earlier (time horizon, reversibility, stake ratings on the
 * five maqāṣid) before the dossier is computed. Most users will skim
 * and continue; the inputs are here for the user who wants finer control.
 */
export function Step6Review({ onComplete, onBackToPrevious }: Props) {
  const { t } = useTranslation('deliberate');
  const current = useSession((s) => s.current);
  const updateCase = useSession((s) => s.updateCase);

  if (!current) return null;
  const c = current.case;

  const setStakeMaqsad = (m: Maqsad, v: Stake) =>
    updateCase({ stakes: { ...c.stakes, maqasid: { ...c.stakes.maqasid, [m]: v } } });

  return (
    <ConversationalScreen
      title={t('review.title')}
      subtitle={t('review.subtitle')}
      helper={t('review.helper')}
      onBack={onBackToPrevious}
      onContinue={onComplete}
      continueLabel={t('review.seeMap')}
    >
      <div className="mx-auto max-w-md space-y-10 text-left">
        <section>
          <p className="text-sm font-medium mb-2">{t('review.timeHorizon')}</p>
          <Segmented
            value={c.timeHorizon}
            onChange={(v) => updateCase({ timeHorizon: v })}
            options={HORIZONS.map((h) => ({ value: h, label: t(`step1.timeHorizon.${h}`, { defaultValue: h }) }))}
            ariaLabel={t('review.timeHorizon')}
            size="sm"
          />
        </section>

        <section>
          <p className="text-sm font-medium mb-1">{t('review.reversibility')}</p>
          <p className="text-xs text-muted-foreground mb-3">{t('review.reversibilityHelp')}</p>
          <PlainScale
            value={c.reversibility as 1 | 2 | 3 | 4 | 5 | null}
            onChange={(v) => updateCase({ reversibility: v as Reversibility })}
            variant="severity"
            ariaLabel={t('review.reversibility')}
          />
        </section>

        <section>
          <p className="text-sm font-medium mb-1">{t('review.stakes')}</p>
          <p className="text-xs text-muted-foreground mb-4">
            {t('review.stakesHelp.before')}{' '}
            <GlossaryTerm term="maqasid">{t('review.stakesHelp.term')}</GlossaryTerm>
            {t('review.stakesHelp.after')}
          </p>
          <div className="space-y-5">
            {MAQASID.map((m) => (
              <div key={m} className="space-y-2">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-sm font-medium">
                    {t(`maqasid.${m}.label`)}
                  </span>
                  <span className="text-xs text-muted-foreground italic">
                    {t(`maqasid.${m}.term`)}
                  </span>
                </div>
                <PlainScale
                  value={(c.stakes.maqasid[m] ?? 3) as 1 | 2 | 3 | 4 | 5}
                  onChange={(v) => setStakeMaqsad(m, v as Stake)}
                  variant="severity"
                  ariaLabel={t(`maqasid.${m}.label`)}
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </ConversationalScreen>
  );
}
