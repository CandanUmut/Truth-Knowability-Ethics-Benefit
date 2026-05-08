import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button-variants';
import { cn } from '@/lib/utils';
import { EXAMPLES } from '@/data/examples';
import { runDeliberation } from '@/lib/classification';

export default function Examples() {
  const { t, i18n } = useTranslation('examples');

  return (
    <div className="mx-auto max-w-form px-6 py-20 space-y-12">
      <PageHeader
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
      />

      <div className="rounded-2xl bg-secondary/40 border border-border p-5 text-sm text-muted-foreground leading-relaxed">
        <p className="text-foreground font-medium mb-2 flex items-center gap-2">
          <Sparkles size={14} aria-hidden="true" /> {t('disclaimer.title')}
        </p>
        <p>{t('disclaimer.body')}</p>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {EXAMPLES.map((ex, i) => {
          const result = runDeliberation(ex.deliberation);
          const classKey =
            result.classification === 'qualified_disagreement'
              ? 'qualified'
              : result.classification;
          const lang = i18n.resolvedLanguage ?? 'tr';
          const date = new Date(ex.deliberation.createdAt).toLocaleDateString(lang, {
            year: 'numeric',
            month: 'short',
          });
          return (
            <motion.div
              key={ex.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.06, duration: 0.35 }}
            >
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">
                        {t(`${ex.id}.tag`)} · {date}
                      </p>
                      <CardTitle className="mt-1">{t(`${ex.id}.title`)}</CardTitle>
                    </div>
                    <span
                      className={cn(
                        'rounded-full px-3 py-1 text-xs font-medium',
                        classKey === 'settled' && 'bg-success/15 text-success',
                        classKey === 'qualified' && 'bg-warning/15 text-warning',
                        classKey === 'open' && 'bg-secondary text-muted-foreground'
                      )}
                    >
                      {t(`classification.${classKey}.tag`, { ns: 'method' })}
                    </span>
                  </div>
                  <CardDescription className="leading-relaxed">
                    {t(`${ex.id}.summary`)}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Link
                      to={`/examples/${ex.id}`}
                      className={cn(buttonVariants({ variant: 'primary', size: 'sm' }))}
                    >
                      {t('viewDossier')} <ArrowRight size={14} aria-hidden="true" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
