import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Router from './Router';
import { useThemeStore } from '@/lib/storage/preferences';

export default function App() {
  const { i18n } = useTranslation();
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'light') {
      root.classList.remove('dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', prefersDark);
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return <Router />;
}
