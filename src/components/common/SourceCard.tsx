import { useTranslation } from 'react-i18next';
import { ScrollText, BookOpen } from 'lucide-react';
import type { AnySource, QuranVerse, Hadith } from '@/types/sources';
import { cn } from '@/lib/utils';

interface Props {
  source: AnySource;
  className?: string;
  compact?: boolean;
  trailing?: React.ReactNode;
}

export function SourceCard({ source, className, compact, trailing }: Props) {
  const { t, i18n } = useTranslation('sources');
  const isQuran = source.kind === 'quran';

  const Icon = isQuran ? BookOpen : ScrollText;
  const labelKey = isQuran ? 'sources.quranTag' : 'sources.hadithTag';

  return (
    <article
      className={cn(
        'rounded-2xl border border-border p-5 space-y-4 bg-card text-card-foreground',
        className
      )}
    >
      <header className="flex items-start gap-3">
        <Icon size={16} className="text-muted-foreground mt-1 shrink-0" aria-hidden="true" />
        <div className="flex-1 min-w-0">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            {t(labelKey)} · {source.data.id}
          </p>
          {isQuran ? <QuranHeading verse={source.data as QuranVerse} /> : <HadithHeading hadith={source.data as Hadith} />}
        </div>
        {trailing}
      </header>

      <div
        dir="rtl"
        lang="ar"
        className="font-arabic text-[1.45rem] leading-[2] text-foreground"
      >
        {source.data.arabic}
      </div>

      {!compact && (
        <p className="text-sm italic text-muted-foreground leading-relaxed">
          {source.data.transliteration}
        </p>
      )}

      <SourceTranslations source={source} lang={i18n.resolvedLanguage ?? 'tr'} />

      {!compact && (
        <footer className="flex flex-wrap gap-2 pt-2">
          <span className="text-[0.7rem] uppercase tracking-wider px-2 py-1 rounded-full border border-border text-muted-foreground">
            {t(`assertion.${source.data.assertionStrength}`)}
          </span>
          {source.data.themes.slice(0, 5).map((th) => (
            <span
              key={th}
              className="text-xs px-2 py-1 rounded-full bg-secondary/60 text-muted-foreground"
            >
              {th}
            </span>
          ))}
          {source.data.reviewStatus === 'seed' && (
            <span className="text-[0.7rem] uppercase tracking-wider px-2 py-1 rounded-full border border-warning/40 text-warning">
              {t('reviewStatus.seed')}
            </span>
          )}
        </footer>
      )}
    </article>
  );
}

function QuranHeading({ verse }: { verse: QuranVerse }) {
  return (
    <p className="text-sm font-medium">
      Sūra {verse.sura} : Āya {verse.aya}
    </p>
  );
}

function HadithHeading({ hadith }: { hadith: Hadith }) {
  const { t } = useTranslation('sources');
  return (
    <p className="text-sm font-medium">
      {hadith.collection} #{hadith.number}{' '}
      <span className="text-xs text-muted-foreground font-normal">
        · {t(`grade.${hadith.grade}`)} · {hadith.narrator}
      </span>
    </p>
  );
}

function SourceTranslations({ source, lang }: { source: AnySource; lang: string }) {
  if (source.kind === 'quran') {
    const v = source.data;
    const trText = v.translations.diyanet;
    const enText = v.translations.pickthall ?? v.translations.sahihInt;
    return (
      <div className="space-y-2">
        {lang === 'tr' && trText && (
          <p className="text-foreground leading-relaxed">
            {trText}{' '}
            <span className="text-xs text-muted-foreground italic">— Diyanet</span>
          </p>
        )}
        {lang !== 'tr' && enText && (
          <p className="text-foreground leading-relaxed">
            {enText}{' '}
            <span className="text-xs text-muted-foreground italic">
              — {v.translations.pickthall ? 'Pickthall' : 'Sahih International'}
            </span>
          </p>
        )}
        {lang === 'tr' && enText && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {enText}{' '}
            <span className="italic">— {v.translations.pickthall ? 'Pickthall' : 'Sahih International'}</span>
          </p>
        )}
        {lang !== 'tr' && trText && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {trText} <span className="italic">— Diyanet</span>
          </p>
        )}
      </div>
    );
  } else {
    const h = source.data;
    return (
      <div className="space-y-2">
        {lang === 'tr' && h.translations.tr && (
          <p className="text-foreground leading-relaxed">{h.translations.tr}</p>
        )}
        {lang !== 'tr' && h.translations.en && (
          <p className="text-foreground leading-relaxed">{h.translations.en}</p>
        )}
        {lang === 'tr' && h.translations.en && (
          <p className="text-sm text-muted-foreground leading-relaxed italic">{h.translations.en}</p>
        )}
        {lang !== 'tr' && h.translations.tr && (
          <p className="text-sm text-muted-foreground leading-relaxed italic">{h.translations.tr}</p>
        )}
      </div>
    );
  }
}
