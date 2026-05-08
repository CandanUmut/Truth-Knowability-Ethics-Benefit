import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ScrollText, Download, Upload, Trash2, FileCheck2, FilePen, Plus } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button-variants';
import { cn } from '@/lib/utils';
import {
  listDeliberations,
  deleteDeliberation,
  importDeliberations,
} from '@/lib/storage/history';
import {
  buildExport,
  downloadJSON,
  parseImport,
} from '@/lib/storage/export';
import { useSession } from '@/lib/storage/session';
import type { Deliberation } from '@/types/deliberation';

export default function History() {
  const { t, i18n } = useTranslation('history');
  const [items, setItems] = useState<Deliberation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const loadFromHistory = useSession((s) => s.loadFromHistory);
  const activeId = useSession((s) => s.current?.id);

  const refresh = async () => {
    setLoading(true);
    try {
      const list = await listDeliberations();
      setItems(list);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  const handleExportAll = () => {
    if (items.length === 0) return;
    const payload = buildExport(items);
    downloadJSON(payload, `teb-deliberations-${new Date().toISOString().slice(0, 10)}.json`);
  };

  const handleImport = async (file: File) => {
    try {
      const text = await file.text();
      const parsed = parseImport(text);
      const count = await importDeliberations(parsed);
      await refresh();
      setError(null);
      setError(t('imported', { count }));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Import failed');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm(t('confirmDelete'))) return;
    await deleteDeliberation(id);
    await refresh();
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-prose px-6 py-20">
        <PageHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-prose px-6 py-20 space-y-8">
      <PageHeader eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')} />

      <div className="flex flex-wrap items-center gap-2">
        <Link
          to="/deliberate"
          className={cn(buttonVariants({ variant: 'primary', size: 'sm' }))}
        >
          <Plus size={14} aria-hidden="true" /> {t('newCta')}
        </Link>
        <Button
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload size={14} aria-hidden="true" /> {t('importBtn')}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json,.json"
          className="sr-only"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void handleImport(file);
            e.target.value = '';
          }}
        />
        <Button
          variant="outline"
          size="sm"
          onClick={handleExportAll}
          disabled={items.length === 0}
        >
          <Download size={14} aria-hidden="true" /> {t('exportAll')}
        </Button>
      </div>

      {error && (
        <div className="rounded-xl border border-border bg-secondary/40 p-3 text-sm text-foreground">
          {error}
        </div>
      )}

      {items.length === 0 ? (
        <div className="rounded-2xl border border-border p-10 text-center space-y-4">
          <ScrollText className="mx-auto text-muted-foreground" size={28} aria-hidden="true" />
          <p className="text-base text-foreground">{t('empty.title')}</p>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
            {t('empty.body')}
          </p>
          <div className="pt-2">
            <Link to="/deliberate" className={cn(buttonVariants({ variant: 'primary', size: 'md' }))}>
              {t('empty.cta')}
            </Link>
          </div>
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((d) => {
            const StatusIcon = d.status === 'final' ? FileCheck2 : FilePen;
            const updated = new Date(d.updatedAt);
            const isActive = d.id === activeId;
            return (
              <li
                key={d.id}
                className={cn(
                  'rounded-2xl border p-5 space-y-3',
                  isActive ? 'border-foreground/40 bg-secondary/20' : 'border-border'
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
                      <StatusIcon size={12} aria-hidden="true" />
                      {t(`status.${d.status}`)}
                      {isActive && (
                        <span className="rounded-full bg-foreground text-background px-2 py-0.5 text-[0.65rem] uppercase tracking-wider font-medium">
                          {t('activeBadge')}
                        </span>
                      )}
                      <span aria-hidden="true">·</span>
                      <time dateTime={d.updatedAt}>
                        {updated.toLocaleDateString(i18n.resolvedLanguage)}{' '}
                        {updated.toLocaleTimeString(i18n.resolvedLanguage, { hour: '2-digit', minute: '2-digit' })}
                      </time>
                    </div>
                    <p className="text-sm font-medium text-foreground line-clamp-2 leading-relaxed">
                      {d.title || d.case.description.slice(0, 140) || t('untitled')}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t('options', { count: d.case.options.length })} · {t('claims', { count: d.claims.length })}
                    </p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Link
                      to="/deliberate"
                      onClick={() => loadFromHistory(d)}
                      className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
                    >
                      {t('open')}
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(d.id)}
                      aria-label={t('delete')}
                    >
                      <Trash2 size={14} aria-hidden="true" />
                    </Button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
