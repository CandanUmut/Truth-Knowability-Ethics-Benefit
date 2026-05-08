import { cn } from '@/lib/utils';

interface StepperScaleProps {
  value: number | null;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  ariaLabel: string;
  lowLabel?: string;
  highLabel?: string;
  className?: string;
}

/**
 * Discrete 1-N selector (used for magnitudes, stakes, reversibility).
 * Friendlier than a slider for low-N integer choices and accessible by default.
 */
export function StepperScale({
  value,
  onChange,
  min = 1,
  max = 5,
  ariaLabel,
  lowLabel,
  highLabel,
  className,
}: StepperScaleProps) {
  const items = Array.from({ length: max - min + 1 }, (_, i) => i + min);
  return (
    <div className={cn('space-y-1.5', className)}>
      <div role="radiogroup" aria-label={ariaLabel} className="inline-flex gap-1.5">
        {items.map((n) => {
          const active = value === n;
          return (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(n)}
              className={cn(
                'h-9 w-9 rounded-full text-sm font-medium border transition-colors',
                active
                  ? 'bg-foreground text-background border-foreground'
                  : 'bg-background text-muted-foreground border-border hover:text-foreground hover:border-foreground/40'
              )}
            >
              {n}
            </button>
          );
        })}
      </div>
      {(lowLabel || highLabel) && (
        <div className="flex justify-between text-xs text-muted-foreground/80 pr-1">
          <span>{lowLabel}</span>
          <span>{highLabel}</span>
        </div>
      )}
    </div>
  );
}
