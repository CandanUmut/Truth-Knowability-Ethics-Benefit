import { cn } from '@/lib/utils';

export interface SegmentedOption<V extends string> {
  value: V;
  label: string;
  description?: string;
}

interface SegmentedProps<V extends string> {
  value: V | null;
  onChange: (value: V) => void;
  options: SegmentedOption<V>[];
  ariaLabel: string;
  size?: 'sm' | 'md';
  className?: string;
}

export function Segmented<V extends string>({
  value,
  onChange,
  options,
  ariaLabel,
  size = 'md',
  className,
}: SegmentedProps<V>) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn(
        'inline-flex flex-wrap items-stretch rounded-full border border-border bg-secondary/40 p-0.5',
        className
      )}
    >
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            title={opt.description}
            onClick={() => onChange(opt.value)}
            className={cn(
              'rounded-full font-medium transition-colors',
              size === 'md' ? 'h-9 px-4 text-sm' : 'h-7 px-3 text-xs',
              active
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
