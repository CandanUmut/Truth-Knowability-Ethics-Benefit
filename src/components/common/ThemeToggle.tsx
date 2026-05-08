import { useTranslation } from 'react-i18next';
import { Sun, Moon, Laptop } from 'lucide-react';
import { useThemeStore, type Theme } from '@/lib/storage/preferences';
import { cn } from '@/lib/utils';

const options: { value: Theme; icon: typeof Sun; key: 'light' | 'dark' | 'system' }[] = [
  { value: 'light', icon: Sun, key: 'light' },
  { value: 'system', icon: Laptop, key: 'system' },
  { value: 'dark', icon: Moon, key: 'dark' },
];

export function ThemeToggle() {
  const { t } = useTranslation();
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);

  return (
    <div
      role="radiogroup"
      aria-label={t('theme.label', { defaultValue: 'Theme' })}
      className="inline-flex items-center rounded-full border border-border bg-secondary/40 p-0.5"
    >
      {options.map(({ value, icon: Icon, key }) => {
        const active = theme === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={t(`theme.${key}`)}
            onClick={() => setTheme(value)}
            className={cn(
              'inline-flex h-7 w-7 items-center justify-center rounded-full transition-colors',
              active
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Icon size={14} aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}
