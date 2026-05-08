import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Save, Download, RotateCcw, FileCheck2 } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { StepIndicator } from '@/components/deliberation/StepIndicator';
import { Step1Case } from '@/components/deliberation/Step1Case';
import { Step2Truth } from '@/components/deliberation/Step2Truth';
import { Step3Maqasid } from '@/components/deliberation/Step3Maqasid';
import { Step4Sources } from '@/components/deliberation/Step4Sources';
import { Step5Niyya } from '@/components/deliberation/Step5Niyya';
import { Output } from '@/components/deliberation/Output';
import { useSession, type StepIndex } from '@/lib/storage/session';
import { saveDeliberation } from '@/lib/storage/history';
import { buildExport, downloadJSON } from '@/lib/storage/export';
import { runDeliberation } from '@/lib/classification';
import type { Deliberation } from '@/types/deliberation';

const TOTAL_STEPS = 5;

export default function Deliberate() {
  const { t } = useTranslation('deliberate');
  const current = useSession((s) => s.current);
  const step = useSession((s) => s.step);
  const start = useSession((s) => s.start);
  const reset = useSession((s) => s.reset);
  const setStep = useSession((s) => s.setStep);
  const [savedToast, setSavedToast] = useState<string | null>(null);

  useEffect(() => {
    if (savedToast) {
      const id = window.setTimeout(() => setSavedToast(null), 2200);
      return () => window.clearTimeout(id);
    }
  }, [savedToast]);

  if (!current || step === 0) {
    return (
      <div className="mx-auto max-w-prose px-6 py-20 space-y-10">
        <PageHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
          subtitle={t('subtitle')}
        />
        <div className="space-y-3">
          <Button onClick={() => start()}>{t('startCta')}</Button>
          <p className="text-xs text-muted-foreground">{t('startNote')}</p>
        </div>
      </div>
    );
  }

  const onSaveDraft = async () => {
    if (!current) return;
    const updated: Deliberation = { ...current, status: 'draft', updatedAt: new Date().toISOString() };
    await saveDeliberation(updated);
    setSavedToast(t('savedDraft'));
  };

  const onSaveFinal = async () => {
    if (!current) return;
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
    if (!current) return;
    const result = current.result ?? runDeliberation(current);
    const updated: Deliberation = { ...current, result };
    const payload = buildExport([updated]);
    const filename = `teb-deliberation-${updated.id.slice(0, 8)}.json`;
    downloadJSON(payload, filename);
  };

  const onPrev = () => {
    if (step > 1) setStep((step - 1) as StepIndex);
  };
  const onNext = () => {
    if (step < TOTAL_STEPS) setStep((step + 1) as StepIndex);
    else setStep(TOTAL_STEPS as StepIndex); // remain on output
  };
  const onShowOutput = () => setStep((TOTAL_STEPS + 1) as 5);

  const isOutput = step > TOTAL_STEPS;
  const visibleStep = isOutput ? TOTAL_STEPS : step;

  return (
    <div className="mx-auto max-w-form px-6 py-12">
      <div className="space-y-3 mb-8">
        <PageHeader
          eyebrow={t('eyebrow')}
          title={isOutput ? t('outputTitle') : t(`step${visibleStep}.title`)}
          subtitle={isOutput ? t('outputSubtitle') : t(`step${visibleStep}.subtitle`)}
        />
        <StepIndicator current={visibleStep} total={TOTAL_STEPS} onJump={(n) => setStep(n as StepIndex)} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={isOutput ? 'output' : `step-${step}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {!isOutput && step === 1 && <Step1Case />}
          {!isOutput && step === 2 && <Step2Truth />}
          {!isOutput && step === 3 && <Step3Maqasid />}
          {!isOutput && step === 4 && <Step4Sources />}
          {!isOutput && step === 5 && <Step5Niyya />}
          {isOutput && <Output />}
        </motion.div>
      </AnimatePresence>

      <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-border pt-6">
        {!isOutput && (
          <>
            <Button variant="outline" size="sm" onClick={onPrev} disabled={step === 1}>
              <ArrowLeft size={14} aria-hidden="true" /> {t('actions.back', { ns: 'common' })}
            </Button>
            {step < TOTAL_STEPS ? (
              <Button size="sm" onClick={onNext}>
                {t('actions.next', { ns: 'common' })} <ArrowRight size={14} aria-hidden="true" />
              </Button>
            ) : (
              <Button size="sm" onClick={onShowOutput}>
                <FileCheck2 size={14} aria-hidden="true" /> {t('seeMap')}
              </Button>
            )}
          </>
        )}
        {isOutput && (
          <Button variant="outline" size="sm" onClick={() => setStep(TOTAL_STEPS as StepIndex)}>
            <ArrowLeft size={14} aria-hidden="true" /> {t('backToSteps')}
          </Button>
        )}
        <div className="flex-1" />
        <Button variant="ghost" size="sm" onClick={onSaveDraft}>
          <Save size={14} aria-hidden="true" /> {t('actions.saveDraft', { ns: 'common' })}
        </Button>
        <Button variant="ghost" size="sm" onClick={onSaveFinal}>
          <FileCheck2 size={14} aria-hidden="true" /> {t('actions.saveFinal', { ns: 'common' })}
        </Button>
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
