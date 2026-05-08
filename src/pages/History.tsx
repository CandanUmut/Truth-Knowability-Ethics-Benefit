import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ScrollText } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { buttonVariants } from '@/components/ui/button-variants';
import { cn } from '@/lib/utils';

export default function History() {
  const { t } = useTranslation('history');
  return (
    <div className="mx-auto max-w-prose px-6 py-20">
      <PageHeader
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
      />
      <div className="mt-12 rounded-2xl border border-border p-10 text-center space-y-4">
        <ScrollText className="mx-auto text-muted-foreground" size={28} aria-hidden="true" />
        <p className="text-base text-foreground">{t('empty.title')}</p>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
          {t('empty.body')}
        </p>
        <div className="pt-2">
          <Link
            to="/deliberate"
            className={cn(buttonVariants({ variant: 'primary', size: 'md' }))}
          >
            {t('empty.cta')}
          </Link>
        </div>
      </div>
    </div>
  );
}
