import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const tiers = [
  { key: 'daruri' as const, weight: 3, width: '100%' },
  { key: 'haji' as const, weight: 2, width: '76%' },
  { key: 'tahsini' as const, weight: 1, width: '52%' },
];

export function TierDiagram() {
  const { t } = useTranslation('method');
  return (
    <figure className="mx-auto max-w-md space-y-3">
      {tiers.map((tier, i) => (
        <motion.div
          key={tier.key}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
          className="space-y-1.5"
        >
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-semibold text-foreground">
              {t(`tier.${tier.key}.label`)}
            </span>
            <span className="text-xs text-muted-foreground">
              {t('tier.weight')} ×{tier.weight}
            </span>
          </div>
          <div className="h-2 rounded-full bg-secondary/60 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: tier.width }}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="h-full bg-foreground rounded-full"
            />
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {t(`tier.${tier.key}.desc`)}
          </p>
        </motion.div>
      ))}
      <figcaption className="text-xs text-muted-foreground/80 text-center pt-3 italic leading-relaxed">
        {t('diagram.tier.caption')}
      </figcaption>
    </figure>
  );
}
