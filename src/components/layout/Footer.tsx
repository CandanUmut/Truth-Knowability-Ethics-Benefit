import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border/60 mt-24">
      <div className="mx-auto max-w-landing px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        <div>
          <p className="font-semibold text-foreground">{t('app.name')}</p>
          <p className="mt-2 text-muted-foreground leading-relaxed">
            {t('footer.tagline')}
          </p>
        </div>
        <nav aria-label={t('footer.linksLabel')} className="space-y-2">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            {t('footer.explore')}
          </p>
          <ul className="space-y-1.5">
            <li><Link to="/method" className="text-muted-foreground hover:text-foreground transition-colors">{t('nav.method')}</Link></li>
            <li><Link to="/sources" className="text-muted-foreground hover:text-foreground transition-colors">{t('nav.sources')}</Link></li>
            <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">{t('nav.about')}</Link></li>
            <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">{t('nav.privacy')}</Link></li>
          </ul>
        </nav>
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            {t('footer.repo')}
          </p>
          <p className="text-muted-foreground leading-relaxed">
            {t('footer.repoDesc')}
          </p>
          <a
            href="https://github.com/CandanUmut/Truth-Knowability-Ethics-Benefit"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-foreground hover:text-accent transition-colors"
          >
            github.com/CandanUmut/Truth-Knowability-Ethics-Benefit ↗
          </a>
        </div>
      </div>
      <div className="mx-auto max-w-landing px-6 pb-10 text-xs text-muted-foreground/80 flex flex-col md:flex-row justify-between gap-2">
        <p>© {year} Umut Candan. {t('footer.license')}</p>
        <p>{t('footer.versionLabel')} v0.1 — {t('footer.preprintLabel')}</p>
      </div>
    </footer>
  );
}
