import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const goods = ['din', 'nafs', 'aql', 'nasl', 'mal'] as const;

export function MaqasidDiagram() {
  const { t } = useTranslation('method');
  return (
    <figure className="mx-auto max-w-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {goods.map((g, i) => (
          <motion.div
            key={g}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
            className="rounded-2xl border border-border bg-card px-4 py-5 text-center"
          >
            <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground">
              {t(`maqasid.${g}.tier`)}
            </p>
            <p className="mt-2 text-base font-semibold text-foreground">
              {t(`maqasid.${g}.label`)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground italic">
              {t(`maqasid.${g}.term`)}
            </p>
          </motion.div>
        ))}
      </div>
      <figcaption className="mt-6 text-xs text-muted-foreground text-center max-w-prose mx-auto leading-relaxed">
        {t('diagram.maqasid.caption')}
      </figcaption>
    </figure>
  );
}
