import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import trCommon from '@/locales/tr/common.json';
import trHome from '@/locales/tr/home.json';
import trAbout from '@/locales/tr/about.json';
import trMethod from '@/locales/tr/method.json';
import trSources from '@/locales/tr/sources.json';
import trHistory from '@/locales/tr/history.json';
import trPrivacy from '@/locales/tr/privacy.json';
import trDeliberate from '@/locales/tr/deliberate.json';
import trGlossary from '@/locales/tr/glossary.json';
import trExamples from '@/locales/tr/examples.json';

import enCommon from '@/locales/en/common.json';
import enHome from '@/locales/en/home.json';
import enAbout from '@/locales/en/about.json';
import enMethod from '@/locales/en/method.json';
import enSources from '@/locales/en/sources.json';
import enHistory from '@/locales/en/history.json';
import enPrivacy from '@/locales/en/privacy.json';
import enDeliberate from '@/locales/en/deliberate.json';
import enGlossary from '@/locales/en/glossary.json';
import enExamples from '@/locales/en/examples.json';

const namespaces = [
  'common',
  'home',
  'about',
  'method',
  'sources',
  'history',
  'privacy',
  'deliberate',
  'glossary',
  'examples',
] as const;

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'tr',
    supportedLngs: ['tr', 'en'],
    defaultNS: 'common',
    ns: namespaces as unknown as string[],
    resources: {
      tr: {
        common: trCommon,
        home: trHome,
        about: trAbout,
        method: trMethod,
        sources: trSources,
        history: trHistory,
        privacy: trPrivacy,
        deliberate: trDeliberate,
        glossary: trGlossary,
        examples: trExamples,
      },
      en: {
        common: enCommon,
        home: enHome,
        about: enAbout,
        method: enMethod,
        sources: enSources,
        history: enHistory,
        privacy: enPrivacy,
        deliberate: enDeliberate,
        glossary: enGlossary,
        examples: enExamples,
      },
    },
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'teb.lang',
      caches: ['localStorage'],
    },
  });

export default i18n;
