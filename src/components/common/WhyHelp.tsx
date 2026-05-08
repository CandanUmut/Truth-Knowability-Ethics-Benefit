import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HelpCircle } from 'lucide-react';

/**
 * A small (?) icon button that, when clicked, reveals a popover with two
 * sections explaining why the framework is asking the current question
 * and what it does with the answer.
 *
 *   <WhyHelp helpKey="step1.q1" />
 *
 * The lookup uses the `whyhelp` keys under the deliberate namespace:
 *   deliberate:whyhelp.<helpKey>.askingFor
 *   deliberate:whyhelp.<helpKey>.engineDoes
 *
 * Renders nothing if the keys are missing — safe to drop on any screen.
 */
export function WhyHelp({ helpKey }: { helpKey: string }) {
  const { t, i18n } = useTranslation('deliberate');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  const askingForKey = `whyhelp.${helpKey}.askingFor`;
  const engineDoesKey = `whyhelp.${helpKey}.engineDoes`;
  const hasContent =
    i18n.exists(`deliberate:${askingForKey}`) ||
    i18n.exists(`deliberate:${engineDoesKey}`);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  if (!hasContent) return null;

  return (
    <span ref={ref} className="relative inline-block ml-1.5 align-middle">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t('whyhelp.label', { defaultValue: 'Why we ask this' })}
        aria-expanded={open}
        className="inline-flex items-center justify-center h-6 w-6 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
      >
        <HelpCircle size={14} aria-hidden="true" />
      </button>
      {open && (
        <span
          role="dialog"
          className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-50 w-80 rounded-2xl border border-border bg-popover text-popover-foreground p-5 shadow-xl text-left"
        >
          <span className="block text-[0.7rem] uppercase tracking-wider text-muted-foreground">
            {t('whyhelp.heading', { defaultValue: 'Why we ask this' })}
          </span>
          {i18n.exists(`deliberate:${askingForKey}`) && (
            <span className="block mt-2 space-y-1.5">
              <span className="block text-xs font-semibold text-foreground">
                {t('whyhelp.askingFor', { defaultValue: 'What we want to learn' })}
              </span>
              <span className="block text-sm text-muted-foreground leading-relaxed">
                {t(askingForKey)}
              </span>
            </span>
          )}
          {i18n.exists(`deliberate:${engineDoesKey}`) && (
            <span className="block mt-3 space-y-1.5">
              <span className="block text-xs font-semibold text-foreground">
                {t('whyhelp.engineDoes', { defaultValue: 'What the framework does with your answer' })}
              </span>
              <span className="block text-sm text-muted-foreground leading-relaxed">
                {t(engineDoesKey)}
              </span>
            </span>
          )}
        </span>
      )}
    </span>
  );
}
