import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

export type ScaleVariant = 'severity' | 'help' | 'sureness';

interface PlainScaleProps {
  value: 1 | 2 | 3 | 4 | 5 | null;
  onChange: (v: 1 | 2 | 3 | 4 | 5) => void;
  variant: ScaleVariant;
  ariaLabel: string;
  className?: string;
}

/**
 * 5-button vertical scale with plain-language anchor labels.
 * The integer is hidden from the UI but stored in the data model.
 */
export function PlainScale({
  value,
  onChange,
  variant,
  ariaLabel,
  className,
}: PlainScaleProps) {
  const { t } = useTranslation('deliberate');
  const order: (1 | 2 | 3 | 4 | 5)[] = [5, 4, 3, 2, 1]; // severe at top
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn('flex flex-col gap-2.5 mx-auto max-w-sm', className)}
    >
      {order.map((n) => {
        const active = value === n;
        const labelKey = `scale.${variant}.${n}`;
        return (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(n)}
            className={cn(
              'w-full rounded-2xl border px-5 py-4 text-left text-base transition-colors',
              active
                ? 'bg-foreground text-background border-foreground shadow-sm'
                : 'bg-background border-border text-foreground hover:border-foreground/40'
            )}
          >
            {t(labelKey)}
          </button>
        );
      })}
    </div>
  );
}
