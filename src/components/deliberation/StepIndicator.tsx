import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

interface Props {
  current: number;
  total: number;
  onJump?: (step: number) => void;
}

export function StepIndicator({ current, total, onJump }: Props) {
  const { t } = useTranslation('deliberate');
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1.5">
        {Array.from({ length: total }).map((_, i) => {
          const stepNum = i + 1;
          const reached = stepNum <= current;
          const past = stepNum < current;
          return (
            <button
              key={stepNum}
              type="button"
              onClick={() => onJump?.(stepNum)}
              disabled={!past && !reached}
              aria-label={t('stepper.label', { n: stepNum, total })}
              aria-current={stepNum === current ? 'step' : undefined}
              className={cn(
                'h-1.5 flex-1 rounded-full transition-colors',
                reached ? 'bg-foreground' : 'bg-secondary',
                past ? 'cursor-pointer hover:bg-foreground/80' : 'cursor-default'
              )}
            />
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground">
        {t('stepper.progress', { n: current, total })}
      </p>
    </div>
  );
}
