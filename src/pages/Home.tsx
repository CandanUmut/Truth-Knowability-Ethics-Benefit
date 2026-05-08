import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-prose px-6 py-24">
        <h1 className="text-4xl font-semibold tracking-tight">
          {t('home.placeholderTitle')}
        </h1>
        <p className="mt-6 text-muted-foreground leading-relaxed">
          {t('home.placeholderBody')}
        </p>
      </div>
    </main>
  );
}
