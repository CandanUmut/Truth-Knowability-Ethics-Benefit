import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

/**
 * Inline tappable term. Renders the children as the visible text and, when
 * clicked, reveals a small popover with a plain-language definition pulled
 * from the glossary namespace.
 *
 * <GlossaryTerm term="yaqin">certainty</GlossaryTerm>
 *
 * The lookup uses the glossary i18n namespace with two keys per term:
 *   glossary.<term>.title
 *   glossary.<term>.body
 */
export function GlossaryTerm({
  term,
  children,
  className,
}: {
  term: string;
  children: ReactNode;
  className?: string;
}) {
  const { t, i18n } = useTranslation('glossary');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [open]);

  const titleKey = `${term}.title`;
  const bodyKey = `${term}.body`;
  // If the term doesn't exist in the namespace, render the children plain.
  const hasEntry = i18n.exists(`glossary:${titleKey}`) && i18n.exists(`glossary:${bodyKey}`);
  if (!hasEntry) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span ref={ref} className={cn('relative inline-block', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={t(`${term}.aria`, { defaultValue: `Define ${term}` })}
        className="underline decoration-dotted underline-offset-[3px] decoration-muted-foreground/60 cursor-help focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
      >
        {children}
      </button>
      {open && (
        <span
          role="tooltip"
          className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 w-72 rounded-2xl border border-border bg-popover text-popover-foreground p-4 shadow-xl text-left normal-case"
        >
          <span className="block text-[0.7rem] uppercase tracking-wider text-muted-foreground">
            {t('label', { defaultValue: 'Glossary' })}
          </span>
          <span className="block text-sm font-semibold mt-1">{t(titleKey)}</span>
          <span className="block text-sm text-muted-foreground mt-2 leading-relaxed">
            {t(bodyKey)}
          </span>
        </span>
      )}
    </span>
  );
}
