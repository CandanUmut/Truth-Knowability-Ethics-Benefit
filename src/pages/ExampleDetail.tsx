import { Link, Navigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Output } from '@/components/deliberation/Output';
import { buttonVariants } from '@/components/ui/button-variants';
import { cn } from '@/lib/utils';
import { getExample, type WorkedExample } from '@/data/examples';
import { useSession } from '@/lib/storage/session';

export default function ExampleDetail() {
  const { id } = useParams<{ id: WorkedExample['id'] }>();
  const { t } = useTranslation('examples');
  const example = id ? getExample(id) : undefined;
  const loadFromHistory = useSession((s) => s.loadFromHistory);

  if (!example) {
    return <Navigate to="/examples" replace />;
  }

  const onCopy = () => {
    // Clone the deliberation as a fresh, editable copy in the active session.
    const fresh = {
      ...example.deliberation,
      id: crypto.randomUUID(),
      status: 'draft' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      title: t(`${example.id}.title`),
    };
    loadFromHistory(fresh);
  };

  return (
    <div className="mx-auto max-w-form px-6 py-16 space-y-12">
      <Link
        to="/examples"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft size={14} aria-hidden="true" /> {t('backToList')}
      </Link>

      <PageHeader
        eyebrow={t(`${example.id}.tag`)}
        title={t(`${example.id}.title`)}
        subtitle={t(`${example.id}.summary`)}
      />

      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-2xl border border-border p-5 space-y-3"
      >
        <p className="text-sm font-semibold">{t('introTitle')}</p>
        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
          {t(`${example.id}.intro`)}
        </p>
        <p className="text-xs text-muted-foreground/80 italic">
          {t(`${example.id}.paperRef`)}
        </p>
      </motion.section>

      <section>
        <Output deliberation={example.deliberation} />
      </section>

      <section className="rounded-2xl bg-secondary/40 border border-border p-6 space-y-3 text-sm text-muted-foreground leading-relaxed">
        <p className="text-base font-semibold text-foreground">{t('tryItTitle')}</p>
        <p>{t('tryItBody')}</p>
        <div className="flex flex-wrap gap-2 pt-2">
          <Link
            to="/deliberate"
            onClick={onCopy}
            className={cn(buttonVariants({ variant: 'primary', size: 'md' }))}
          >
            <Copy size={14} aria-hidden="true" /> {t('tryItCta')}
          </Link>
          <Link
            to="/examples"
            className={cn(buttonVariants({ variant: 'outline', size: 'md' }))}
          >
            {t('seeOthers')}
          </Link>
        </div>
      </section>
    </div>
  );
}
