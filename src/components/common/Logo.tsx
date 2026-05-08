import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function Logo() {
  const { t } = useTranslation();
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-2.5 group"
      aria-label={t('app.name')}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        className="text-foreground transition-transform duration-200 group-hover:rotate-[20deg]"
      >
        <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="16" cy="16" r="5" stroke="currentColor" strokeWidth="1.5" />
        <line x1="16" y1="2" x2="16" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="16" y1="24" x2="16" y2="30" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="2" y1="16" x2="8" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="24" y1="16" x2="30" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <span className="text-[0.95rem] font-semibold tracking-tight">
        {t('app.name')}
      </span>
    </Link>
  );
}
