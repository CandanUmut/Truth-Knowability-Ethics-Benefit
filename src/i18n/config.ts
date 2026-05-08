import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import trCommon from '@/locales/tr/common.json';
import trHome from '@/locales/tr/home.json';
import enCommon from '@/locales/en/common.json';
import enHome from '@/locales/en/home.json';

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'tr',
    supportedLngs: ['tr', 'en'],
    defaultNS: 'common',
    ns: ['common', 'home'],
    resources: {
      tr: { common: trCommon, home: trHome },
      en: { common: enCommon, home: enHome },
    },
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'teb.lang',
      caches: ['localStorage'],
    },
  });

export default i18n;
