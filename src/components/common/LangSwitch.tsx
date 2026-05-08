import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

const langs = [
  { code: 'tr', label: 'TR' },
  { code: 'en', label: 'EN' },
] as const;

export function LangSwitch() {
  const { i18n, t } = useTranslation();
  const current = i18n.resolvedLanguage ?? 'tr';

  return (
    <div
      role="radiogroup"
      aria-label={t('lang.switchTo')}
      className="inline-flex items-center rounded-full border border-border bg-secondary/40 p-0.5"
    >
      {langs.map((lang) => {
        const active = current === lang.code;
        return (
          <button
            key={lang.code}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => void i18n.changeLanguage(lang.code)}
            className={cn(
              'h-7 px-3 text-xs font-medium rounded-full transition-colors',
              active
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {lang.label}
          </button>
        );
      })}
    </div>
  );
}
