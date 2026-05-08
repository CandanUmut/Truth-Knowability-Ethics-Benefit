import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WhyHelp } from '@/components/common/WhyHelp';
import { cn } from '@/lib/utils';

interface Props {
  /** A short, plain-language question. The user should be able to read it in 4 seconds. */
  title: ReactNode;
  /** A single sentence of supporting context, optional. */
  subtitle?: ReactNode;
  /** A small helper string (e.g. "Pick what applies. Skip if nothing fits."). */
  helper?: ReactNode;
  /** The input control(s). Keep this focused on one decision. */
  children: ReactNode;
  onBack?: () => void;
  onContinue?: () => void;
  onSkip?: () => void;
  continueDisabled?: boolean;
  continueLabel?: string;
  /** Optional progress text e.g. "Question 2 of 7". */
  progress?: string;
  /** When set, a (?) button appears next to the title revealing the corresponding whyhelp.<helpKey> entry. */
  helpKey?: string;
  className?: string;
}

export function ConversationalScreen({
  title,
  subtitle,
  helper,
  children,
  onBack,
  onContinue,
  onSkip,
  continueDisabled,
  continueLabel,
  progress,
  helpKey,
  className,
}: Props) {
  const { t } = useTranslation('deliberate');
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={cn('mx-auto w-full max-w-prose px-2', className)}
    >
      {progress && (
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6 text-center">
          {progress}
        </p>
      )}
      <div className="space-y-3 text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight leading-snug">
          {title}
          {helpKey && <WhyHelp helpKey={helpKey} />}
        </h2>
        {subtitle && (
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      {helper && (
        <p className="mt-6 text-xs text-muted-foreground/80 text-center italic">{helper}</p>
      )}
      <div className="mt-12">{children}</div>
      <div className="mt-12 flex items-center justify-center gap-2 flex-wrap">
        {onBack && (
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft size={14} aria-hidden="true" /> {t('actions.back', { ns: 'common' })}
          </Button>
        )}
        {onSkip && (
          <Button variant="ghost" size="sm" onClick={onSkip}>
            {t('skip')}
          </Button>
        )}
        {onContinue && (
          <Button size="md" onClick={onContinue} disabled={continueDisabled}>
            {continueLabel ?? t('actions.next', { ns: 'common' })}
            <ArrowRight size={14} aria-hidden="true" />
          </Button>
        )}
      </div>
    </motion.section>
  );
}
