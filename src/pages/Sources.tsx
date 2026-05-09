import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Filter } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { SourceCard } from '@/components/common/SourceCard';
import { Input } from '@/components/ui/input';
import { searchSources, allThemes, listSources } from '@/lib/sources';
import type { AnySource } from '@/types/sources';
import { cn } from '@/lib/utils';

type Filter = 'all' | 'quran' | 'hadith' | 'qaida' | 'scholar';

export default function Sources() {
  const { t } = useTranslation('sources');
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');
  const [theme, setTheme] = useState<string | null>(null);

  const themes = useMemo(() => allThemes(), []);

  const items = useMemo(() => {
    let list: AnySource[] = query.trim() ? searchSources(query) : listSources();
    if (filter !== 'all') {
      list = list.filter((s) => s.kind === filter);
    }
    if (theme) {
      list = list.filter((s) => s.data.themes.includes(theme));
    }
    return list;
  }, [query, filter, theme]);

  return (
    <div className="mx-auto max-w-form px-6 py-20 space-y-10">
      <PageHeader
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
      />

      <div className="space-y-4">
        <div className="relative">
          <Search
            size={16}
            aria-hidden="true"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="pl-11"
            aria-label={t('searchLabel')}
          />
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          <FilterPill active={filter === 'all'} onClick={() => setFilter('all')}>
            {t('filter.all')}
          </FilterPill>
          <FilterPill active={filter === 'quran'} onClick={() => setFilter('quran')}>
            {t('filter.quran')}
          </FilterPill>
          <FilterPill active={filter === 'hadith'} onClick={() => setFilter('hadith')}>
            {t('filter.hadith')}
          </FilterPill>
          <FilterPill active={filter === 'qaida'} onClick={() => setFilter('qaida')}>
            {t('filter.qaida')}
          </FilterPill>
          <FilterPill active={filter === 'scholar'} onClick={() => setFilter('scholar')}>
            {t('filter.scholar')}
          </FilterPill>
          <span aria-hidden="true" className="text-border">|</span>
          <Filter size={14} className="text-muted-foreground" aria-hidden="true" />
          <select
            value={theme ?? ''}
            onChange={(e) => setTheme(e.target.value || null)}
            className="h-9 rounded-full border border-border bg-background px-4 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={t('themeFilter')}
          >
            <option value="">{t('allThemes')}</option>
            {themes.map((th) => (
              <option key={th} value={th}>{th}</option>
            ))}
          </select>
        </div>

        <p className="text-xs text-muted-foreground">
          {t('count', { count: items.length })}
        </p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center">
          <p className="text-sm text-muted-foreground">{t('noResults')}</p>
        </div>
      ) : (
        <div className="space-y-5">
          {items.map((source) => (
            <SourceCard key={source.data.id} source={source} />
          ))}
        </div>
      )}

      <SeedNotice />
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'h-9 px-4 rounded-full border text-sm transition-colors',
        active
          ? 'bg-foreground text-background border-foreground'
          : 'bg-background border-border text-muted-foreground hover:text-foreground hover:border-foreground/40'
      )}
    >
      {children}
    </button>
  );
}

function SeedNotice() {
  const { t } = useTranslation('sources');
  return (
    <div className="rounded-2xl border border-dashed border-border p-5 text-sm text-muted-foreground leading-relaxed">
      <p className="font-medium text-foreground mb-2">{t('seedNotice.title')}</p>
      <p>{t('seedNotice.body')}</p>
    </div>
  );
}
