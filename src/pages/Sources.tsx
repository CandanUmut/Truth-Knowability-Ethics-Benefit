import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/common/PageHeader';

export default function Sources() {
  const { t } = useTranslation('sources');
  return (
    <div className="mx-auto max-w-prose px-6 py-20">
      <PageHeader
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
      />
      <div className="mt-12 rounded-2xl border border-dashed border-border p-8 text-center">
        <p className="text-muted-foreground italic leading-relaxed">
          {t('placeholder')}
        </p>
      </div>
    </div>
  );
}
