import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Download, RotateCcw, FileCheck2, Plus, ScrollText, Check, Zap, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Step1Case } from '@/components/deliberation/Step1Case';
import { Step2Truth } from '@/components/deliberation/Step2Truth';
import { Step3Maqasid } from '@/components/deliberation/Step3Maqasid';
import { Step4Sources } from '@/components/deliberation/Step4Sources';
import { Step5Niyya } from '@/components/deliberation/Step5Niyya';
import { Step6Review } from '@/components/deliberation/Step6Review';
import { ExpressFlow } from '@/components/deliberation/ExpressFlow';
import { Output } from '@/components/deliberation/Output';
import { useSession, type StepIndex, REVIEW_STEP, OUTPUT_STEP, FINAL_STEP } from '@/lib/storage/session';
import { saveDeliberation } from '@/lib/storage/history';
import { buildExport, downloadJSON } from '@/lib/storage/export';
import { runDeliberation } from '@/lib/classification';
import type { Deliberation, DeliberationMode } from '@/types/deliberation';
import { cn } from '@/lib/utils';

const TOTAL_MAJOR = 5;
const STEP_LABEL_KEYS = [
  'step1.short',
  'step2.short',
  'step3.short',
  'step4.short',
  'step5.short',
] as const;

export default function Deliberate() {
  const { t } = useTranslation('deliberate');
  const current = useSession((s) => s.current);
  const step = useSession((s) => s.step);
  const start = useSession((s) => s.start);
  const startAnother = useSession((s) => s.startAnother);
  const reset = useSession((s) => s.reset);
  const setStep = useSession((s) => s.setStep);
  const advanceStep = useSession((s) => s.advanceStep);
  const retreatStep = useSession((s) => s.retreatStep);
  const [savedToast, setSavedToast] = useState<string | null>(null);
  const [lastSavedAt, setLastSavedAt] = useState<number | null>(null);

  // Autosave: write the active deliberation to Dexie 600ms after any change.
  useEffect(() => {
    if (!current) return;
    const id = window.setTimeout(() => {
      void saveDeliberation(current).then(() => setLastSavedAt(Date.now()));
    }, 600);
    return () => window.clearTimeout(id);
  }, [current]);

  useEffect(() => {
    if (savedToast) {
      const id = window.setTimeout(() => setSavedToast(null), 2200);
      return () => window.clearTimeout(id);
    }
  }, [savedToast]);

  if (!current || step === 0) {
    return <LandingNew onStart={(mode) => start(mode)} />;
  }

  const isExpress = current.mode === 'quick' && step < OUTPUT_STEP;
  const isReview = step === REVIEW_STEP;
  const isOutput = step >= OUTPUT_STEP;
  const visibleStep = isOutput || isReview ? TOTAL_MAJOR : step;

  /**
   * Express completion jumps straight to OUTPUT_STEP. The ExpressFlow
   * component owns its own sub-steps; only the final "Show me the map"
   * call lands here.
   */
  const onExpressComplete = () => setStep(OUTPUT_STEP);

  const onSaveFinal = async () => {
    const result = runDeliberation(current);
    const updated: Deliberation = {
      ...current,
      status: 'final',
      result,
      updatedAt: new Date().toISOString(),
    };
    await saveDeliberation(updated);
    setSavedToast(t('savedFinal'));
  };
  const onExport = () => {
    const result = current.result ?? runDeliberation(current);
    const updated: Deliberation = { ...current, result };
    const payload = buildExport([updated]);
    const filename = `teb-deliberation-${updated.id.slice(0, 8)}.json`;
    downloadJSON(payload, filename);
  };
  const onStartAnother = async () => {
    // Make sure the current draft is persisted before we leave it.
    await saveDeliberation({ ...current, status: 'draft', updatedAt: new Date().toISOString() });
    startAnother();
    setSavedToast(t('newStarted'));
  };

  return (
    <div className="mx-auto max-w-form px-6 py-10 min-h-[calc(100vh-4rem)] flex flex-col">
      {!isExpress && (
        <CompactStepBar
          visibleStep={visibleStep}
          isOutput={isOutput || isReview}
          outputBadgeKey={isOutput ? 'outputBadge' : isReview ? 'reviewBadge' : undefined}
          onJump={(n) => setStep(n as StepIndex)}
        />
      )}
      {isExpress && <ExpressProgressBadge />}

      <div className="flex-1 flex items-start justify-center pt-12 pb-16">
        {isExpress && <ExpressFlow onComplete={onExpressComplete} />}
        {!isExpress && step === 1 && <Step1Case onComplete={advanceStep} />}
        {!isExpress && step === 2 && <Step2Truth onComplete={advanceStep} onBackToPrevious={retreatStep} />}
        {!isExpress && step === 3 && <Step3Maqasid onComplete={advanceStep} onBackToPrevious={retreatStep} />}
        {!isExpress && step === 4 && <Step4Sources onComplete={advanceStep} onBackToPrevious={retreatStep} />}
        {!isExpress && step === FINAL_STEP && <Step5Niyya onComplete={advanceStep} onBackToPrevious={retreatStep} />}
        {!isExpress && isReview && <Step6Review onComplete={advanceStep} onBackToPrevious={retreatStep} />}
        {isOutput && (
          <div className="w-full">
            <Output />
          </div>
        )}
      </div>

      <div className="border-t border-border pt-4 flex flex-wrap items-center gap-2">
        <SavedIndicator at={lastSavedAt} />
        <div className="flex-1" />
        <Button variant="ghost" size="sm" onClick={onStartAnother}>
          <Plus size={14} aria-hidden="true" /> {t('newDeliberation')}
        </Button>
        {isOutput && (
          <Button variant="ghost" size="sm" onClick={onSaveFinal}>
            <FileCheck2 size={14} aria-hidden="true" /> {t('actions.saveFinal', { ns: 'common' })}
          </Button>
        )}
        <Button variant="ghost" size="sm" onClick={onExport}>
          <Download size={14} aria-hidden="true" /> {t('actions.export', { ns: 'common' })}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            if (window.confirm(t('confirmReset'))) reset();
          }}
        >
          <RotateCcw size={14} aria-hidden="true" /> {t('reset')}
        </Button>
      </div>

      {savedToast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-foreground text-background px-4 py-2 text-sm shadow-lg"
        >
          {savedToast}
        </div>
      )}
    </div>
  );
}

function SavedIndicator({ at }: { at: number | null }) {
  const { t } = useTranslation('deliberate');
  if (!at) {
    return (
      <span className="text-xs text-muted-foreground/70 flex items-center gap-1.5">
        {t('savingHint')}
      </span>
    );
  }
  const seconds = Math.max(0, Math.floor((Date.now() - at) / 1000));
  const label =
    seconds < 5
      ? t('savedJustNow')
      : seconds < 60
      ? t('savedSecondsAgo', { n: seconds })
      : t('savedMinutesAgo', { n: Math.floor(seconds / 60) });
  return (
    <span className="text-xs text-muted-foreground flex items-center gap-1.5">
      <Check size={12} aria-hidden="true" />
      {label}
    </span>
  );
}

const TUTORIAL_KEY = 'teb.tutorial.seen';

function LandingNew({ onStart }: { onStart: (mode: DeliberationMode) => void }) {
  const { t } = useTranslation('deliberate');
  const current = useSession((s) => s.current);
  const setStep = useSession((s) => s.setStep);
  const [showIntro, setShowIntro] = useState<boolean>(() => {
    try {
      return window.localStorage.getItem(TUTORIAL_KEY) !== '1';
    } catch {
      return true;
    }
  });
  const dismissIntro = () => {
    try {
      window.localStorage.setItem(TUTORIAL_KEY, '1');
    } catch {
      /* ignore */
    }
    setShowIntro(false);
  };
  // If a deliberation exists in memory but step is 0 (e.g. after reset), allow continuing.
  const hasDraft = current !== null;

  if (showIntro) {
    return (
      <FirstRunIntro
        onStart={(mode) => {
          dismissIntro();
          onStart(mode);
        }}
        onDismiss={dismissIntro}
      />
    );
  }

  return (
    <div className="mx-auto max-w-form px-6 py-20 space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-5 text-center"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {t('eyebrow')}
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          {t('start.title')}
        </h1>
        <p className="text-muted-foreground leading-relaxed max-w-prose mx-auto">
          {t('start.subtitle')}
        </p>
      </motion.div>

      <ModeChooser onPick={onStart} />

      <div className="flex flex-col items-center gap-3 text-center">
        {hasDraft && (
          <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
            <ScrollText size={14} aria-hidden="true" /> {t('continueDraft')}
          </Button>
        )}
        <Link
          to="/examples"
          className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
        >
          {t('seeExampleInstead')}
        </Link>
        <p className="text-xs text-muted-foreground mt-1">{t('startNote')}</p>
      </div>
    </div>
  );
}

function ModeChooser({ onPick }: { onPick: (mode: DeliberationMode) => void }) {
  const { t } = useTranslation('deliberate');
  return (
    <div className="space-y-4">
      <div className="text-center space-y-1">
        <p className="text-base font-medium">{t('modeChooser.title')}</p>
        <p className="text-xs text-muted-foreground">{t('modeChooser.subtitle')}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <ModeCard
          icon={<Zap size={18} aria-hidden="true" />}
          tag={t('modeChooser.recommendedTag')}
          label={t('modeChooser.quick.label')}
          desc={t('modeChooser.quick.desc')}
          onClick={() => onPick('quick')}
          recommended
        />
        <ModeCard
          icon={<Layers size={18} aria-hidden="true" />}
          label={t('modeChooser.deep.label')}
          desc={t('modeChooser.deep.desc')}
          onClick={() => onPick('deep')}
        />
      </div>
    </div>
  );
}

function ModeCard({
  icon,
  tag,
  label,
  desc,
  onClick,
  recommended,
}: {
  icon: React.ReactNode;
  tag?: string;
  label: string;
  desc: string;
  onClick: () => void;
  recommended?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'rounded-2xl border p-5 text-left transition-colors',
        recommended
          ? 'border-foreground/40 bg-secondary/40 hover:bg-secondary/60'
          : 'border-border bg-background hover:border-foreground/40'
      )}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-foreground">{icon}</span>
        {recommended && tag && (
          <span className="text-[0.65rem] uppercase tracking-wider px-2 py-0.5 rounded-full border border-foreground/30 text-muted-foreground">
            {tag}
          </span>
        )}
      </div>
      <p className="text-sm font-semibold">{label}</p>
      <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{desc}</p>
    </button>
  );
}

function ExpressProgressBadge() {
  const { t } = useTranslation('deliberate');
  return (
    <div className="flex justify-center">
      <span className="text-[0.7rem] uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-border text-muted-foreground inline-flex items-center gap-1.5">
        <Zap size={11} aria-hidden="true" /> {t('express.modeBadge')}
      </span>
    </div>
  );
}

function FirstRunIntro({ onStart, onDismiss }: { onStart: (mode: DeliberationMode) => void; onDismiss: () => void }) {
  const { t } = useTranslation('deliberate');
  const cards = ['cards.ask', 'cards.private', 'cards.output'] as const;
  return (
    <div className="mx-auto max-w-form px-6 py-20 space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center space-y-4"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          {t('intro.eyebrow')}
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          {t('intro.title')}
        </h1>
        <p className="text-muted-foreground leading-relaxed max-w-prose mx-auto">
          {t('intro.subtitle')}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {cards.map((c, i) => (
          <motion.div
            key={c}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.06, duration: 0.35 }}
            className="rounded-2xl border border-border p-5 space-y-2"
          >
            <p className="text-sm font-semibold">{t(`intro.${c}.title`)}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t(`intro.${c}.body`)}
            </p>
          </motion.div>
        ))}
      </div>

      <ModeChooser onPick={onStart} />

      <div className="flex justify-center">
        <Link
          to="/examples"
          onClick={onDismiss}
          className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
        >
          {t('intro.exampleCta')}
        </Link>
      </div>
      <p className="text-xs text-center text-muted-foreground/70">{t('intro.dismissHint')}</p>
    </div>
  );
}

function CompactStepBar({
  visibleStep,
  isOutput,
  outputBadgeKey,
  onJump,
}: {
  visibleStep: number;
  isOutput: boolean;
  outputBadgeKey?: 'outputBadge' | 'reviewBadge';
  onJump: (n: number) => void;
}) {
  const { t } = useTranslation('deliberate');
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {Array.from({ length: TOTAL_MAJOR }).map((_, i) => {
          const n = i + 1;
          const reached = n <= visibleStep;
          const past = n < visibleStep || isOutput;
          return (
            <button
              key={n}
              type="button"
              onClick={() => past && onJump(n)}
              disabled={!past}
              aria-label={t(STEP_LABEL_KEYS[i])}
              aria-current={n === visibleStep && !isOutput ? 'step' : undefined}
              className={cn(
                'h-1.5 flex-1 rounded-full transition-colors',
                reached ? 'bg-foreground' : 'bg-secondary',
                past ? 'cursor-pointer hover:bg-foreground/80' : 'cursor-default'
              )}
            />
          );
        })}
      </div>
      <p className="text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground text-center">
        {isOutput && outputBadgeKey ? t(outputBadgeKey) : t(STEP_LABEL_KEYS[visibleStep - 1])}
      </p>
    </div>
  );
}
