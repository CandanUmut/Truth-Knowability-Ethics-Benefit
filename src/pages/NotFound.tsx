import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { buttonVariants } from '@/components/ui/button-variants';
import { cn } from '@/lib/utils';

export default function NotFound() {
  const { t } = useTranslation('common');
  return (
    <div className="mx-auto max-w-prose px-6 py-32 text-center space-y-6">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">404</p>
      <h1 className="text-3xl font-semibold tracking-tight">
        {t('notFound.title', { defaultValue: 'Bu sayfa bulunamadı' })}
      </h1>
      <p className="text-muted-foreground">
        {t('notFound.body', { defaultValue: 'The page you are looking for does not exist on this device.' })}
      </p>
      <Link to="/" className={cn(buttonVariants({ variant: 'primary' }))}>
        {t('notFound.cta', { defaultValue: 'Ana sayfaya dön' })}
      </Link>
    </div>
  );
}
