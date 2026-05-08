import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/common/PageHeader';

export default function About() {
  const { t } = useTranslation('about');
  const sections = ['origin', 'commitments', 'audience', 'limits'] as const;

  return (
    <div className="mx-auto max-w-prose px-6 py-20 space-y-12">
      <PageHeader
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
      />
      {sections.map((section) => (
        <section key={section} className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">
            {t(`${section}.title`)}
          </h2>
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
            {t(`${section}.body`)}
          </p>
        </section>
      ))}
    </div>
  );
}
