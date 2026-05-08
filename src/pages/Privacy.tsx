import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/common/PageHeader';

export default function Privacy() {
  const { t } = useTranslation('privacy');
  const principles = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7'] as const;

  return (
    <div className="mx-auto max-w-prose px-6 py-20 space-y-12">
      <PageHeader
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
      />
      <section className="space-y-5">
        <p className="text-base text-foreground leading-relaxed whitespace-pre-line">
          {t('intro')}
        </p>
      </section>
      <section className="space-y-5">
        <h2 className="text-xl font-semibold tracking-tight">{t('principlesTitle')}</h2>
        <ol className="space-y-4">
          {principles.map((p, i) => (
            <li key={p} className="rounded-xl border border-border p-5">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                {String(i + 1).padStart(2, '0')}
              </p>
              <p className="mt-1 text-base font-medium text-foreground">
                {t(`principles.${p}.title`)}
              </p>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {t(`principles.${p}.body`)}
              </p>
            </li>
          ))}
        </ol>
      </section>
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">{t('verifyTitle')}</h2>
        <p className="text-muted-foreground leading-relaxed">
          {t('verifyBody')}
        </p>
        <a
          href="https://github.com/CandanUmut/Truth-Knowability-Ethics-Benefit"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-foreground hover:text-accent transition-colors"
        >
          github.com/CandanUmut/Truth-Knowability-Ethics-Benefit ↗
        </a>
      </section>
    </div>
  );
}
