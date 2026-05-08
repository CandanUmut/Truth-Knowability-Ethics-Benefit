import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/common/PageHeader';
import { FourSourceDiagram } from '@/components/common/FourSourceDiagram';
import { MaqasidDiagram } from '@/components/common/MaqasidDiagram';
import { TierDiagram } from '@/components/common/TierDiagram';

export default function Method() {
  const { t } = useTranslation('method');
  const commitments = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'] as const;

  return (
    <div className="mx-auto max-w-prose px-6 py-20 space-y-20">
      <PageHeader
        eyebrow={t('eyebrow')}
        title={t('title')}
        subtitle={t('subtitle')}
      />

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t('section.fourSource.title')}
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {t('section.fourSource.body')}
        </p>
        <div className="py-6">
          <FourSourceDiagram />
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t('section.maqasid.title')}
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {t('section.maqasid.body')}
        </p>
        <div className="py-6">
          <MaqasidDiagram />
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t('section.tier.title')}
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {t('section.tier.body')}
        </p>
        <div className="py-6">
          <TierDiagram />
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t('section.niyya.title')}
        </h2>
        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
          {t('section.niyya.body')}
        </p>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t('section.commitments.title')}
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {t('section.commitments.body')}
        </p>
        <ol className="space-y-3 list-decimal list-inside">
          {commitments.map((c) => (
            <li key={c} className="text-foreground leading-relaxed">
              <span className="font-medium">{t(`commitments.${c}.title`)}.</span>{' '}
              <span className="text-muted-foreground">{t(`commitments.${c}.body`)}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t('section.classification.title')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {(['settled', 'qualified', 'open'] as const).map((c) => (
            <div key={c} className="rounded-2xl border border-border p-5">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                {t(`classification.${c}.tag`)}
              </p>
              <p className="mt-2 text-base font-semibold">
                {t(`classification.${c}.title`)}
              </p>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {t(`classification.${c}.body`)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
