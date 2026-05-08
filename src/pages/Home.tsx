import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, ScrollText, Compass, BookOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button-variants';
import { cn } from '@/lib/utils';

const cards = [
  { key: 'truth' as const, icon: BookOpen },
  { key: 'ethics' as const, icon: Compass },
  { key: 'benefit' as const, icon: ScrollText },
];

export default function Home() {
  const { t } = useTranslation('home');

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-landing px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {t('hero.eyebrow')}
            </p>
            <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
              {t('hero.title')}
            </h1>
            <p className="mt-7 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              {t('hero.subhead')}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Link
                to="/deliberate"
                className={cn(buttonVariants({ variant: 'primary', size: 'lg' }))}
              >
                {t('hero.cta')} <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                to="/method"
                className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
              >
                {t('hero.secondary')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-landing px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <motion.div
              key={card.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
            >
              <Card className="h-full">
                <CardContent className="pt-6">
                  <card.icon size={20} className="text-muted-foreground" aria-hidden="true" />
                  <CardTitle className="mt-4">{t(`cards.${card.key}.title`)}</CardTitle>
                  <CardDescription className="mt-3 leading-relaxed">
                    {t(`cards.${card.key}.body`)}
                  </CardDescription>
                  <p className="mt-4 text-xs text-muted-foreground/80 italic">
                    {t(`cards.${card.key}.term`)}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-prose px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-border p-8"
        >
          <p className="text-sm font-semibold text-foreground">
            {t('hinge.title')}
          </p>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            {t('hinge.body')}
          </p>
          <p className="mt-4 text-sm text-muted-foreground/80 italic">
            {t('hinge.note')}
          </p>
        </motion.div>
      </section>
    </>
  );
}
