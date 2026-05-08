import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export function FourSourceDiagram() {
  const { t } = useTranslation('method');
  const sources = [
    { angle: -90, key: 'revelation' as const },
    { angle: 0, key: 'reason' as const },
    { angle: 90, key: 'experience' as const },
    { angle: 180, key: 'conscience' as const },
  ];

  return (
    <figure className="mx-auto max-w-md">
      <svg viewBox="-160 -160 320 320" className="w-full h-auto" role="img" aria-labelledby="four-source-title">
        <title id="four-source-title">{t('diagram.fourSource.title')}</title>
        <motion.circle
          cx="0"
          cy="0"
          r="115"
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="1"
          strokeDasharray="2 4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        {sources.map(({ angle, key }, i) => {
          const r = 115;
          const x = Math.cos((angle * Math.PI) / 180) * r;
          const y = Math.sin((angle * Math.PI) / 180) * r;
          return (
            <motion.g
              key={key}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <circle cx={x} cy={y} r="36" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
              <text
                x={x}
                y={y - 4}
                textAnchor="middle"
                className="fill-foreground"
                style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.02em' }}
              >
                {t(`sources.${key}.title`)}
              </text>
              <text
                x={x}
                y={y + 8}
                textAnchor="middle"
                className="fill-muted-foreground"
                style={{ fontSize: '0.5rem', fontStyle: 'italic' }}
              >
                {t(`sources.${key}.term`)}
              </text>
            </motion.g>
          );
        })}
        <motion.g
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <circle cx="0" cy="0" r="42" fill="hsl(var(--accent))" />
          <text x="0" y="-3" textAnchor="middle" className="fill-accent-foreground" style={{ fontSize: '0.65rem', fontWeight: 600 }}>
            {t('diagram.fourSource.hingeTitle')}
          </text>
          <text x="0" y="9" textAnchor="middle" className="fill-accent-foreground" style={{ fontSize: '0.55rem', fontStyle: 'italic', opacity: 0.85 }}>
            {t('diagram.fourSource.hingeTerm')}
          </text>
        </motion.g>
      </svg>
      <figcaption className="mt-4 text-xs text-muted-foreground text-center max-w-sm mx-auto leading-relaxed">
        {t('diagram.fourSource.caption')}
      </figcaption>
    </figure>
  );
}
