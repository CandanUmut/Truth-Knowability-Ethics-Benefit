import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Download, RotateCcw, FileCheck2, Plus, ScrollText, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Step1Case } from '@/components/deliberation/Step1Case';
import { Step2Truth } from '@/components/deliberation/Step2Truth';
import { Step3Maqasid } from '@/components/deliberation/Step3Maqasid';
import { Step4Sources } from '@/components/deliberation/Step4Sources';
import { Step5Niyya } from '@/components/deliberation/Step5Niyya';
import { Step6Review } from '@/components/deliberation/Step6Review';
import { Output } from '@/components/deliberation/Output';
import { useSession, type StepIndex, REVIEW_STEP, OUTPUT_STEP, FINAL_STEP } from '@/lib/storage/session';
import { saveDeliberation } from '@/lib/storage/history';
import { buildExport, downloadJSON } from '@/lib/storage/export';
import { runDeliberation } from '@/lib/classification';
import type { Deliberation } from '@/types/deliberation';
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
    return <LandingNew onStart={() => start()} />;
  }

  const isReview = step === REVIEW_STEP;
  const isOutput = step >= OUTPUT_STEP;
  const visibleStep = isOutput || isReview ? TOTAL_MAJOR : step;

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
      <CompactStepBar
        visibleStep={visibleStep}
        isOutput={isOutput || isReview}
        outputBadgeKey={isOutput ? 'outputBadge' : isReview ? 'reviewBadge' : undefined}
        onJump={(n) => setStep(n as StepIndex)}
      />

      <div className="flex-1 flex items-start justify-center pt-12 pb-16">
        {step === 1 && <Step1Case onComplete={advanceStep} />}
        {step === 2 && <Step2Truth onComplete={advanceStep} onBackToPrevious={retreatStep} />}
        {step === 3 && <Step3Maqasid onComplete={advanceStep} onBackToPrevious={retreatStep} />}
        {step === 4 && <Step4Sources onComplete={advanceStep} onBackToPrevious={retreatStep} />}
        {step === FINAL_STEP && <Step5Niyya onComplete={advanceStep} onBackToPrevious={retreatStep} />}
        {isReview && <Step6Review onComplete={advanceStep} onBackToPrevious={retreatStep} />}
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

function LandingNew({ onStart }: { onStart: () => void }) {
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
        onStart={() => {
          dismissIntro();
          onStart();
        }}
        onDismiss={dismissIntro}
      />
    );
  }

  return (
    <div className="mx-auto max-w-prose px-6 py-24 text-center space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-5"
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
      <div className="flex flex-col items-center gap-3">
        <Button size="lg" onClick={onStart}>
          {t('startCta')}
        </Button>
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

function FirstRunIntro({ onStart, onDismiss }: { onStart: () => void; onDismiss: () => void }) {
  const { t } = useTranslation('deliberate');
  const cards = ['cards.ask', 'cards.private', 'cards.output'] as const;
  return (
    <div className="mx-auto max-w-prose px-6 py-20 space-y-10">
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

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button size="lg" onClick={onStart}>
          {t('intro.startCta')}
        </Button>
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
