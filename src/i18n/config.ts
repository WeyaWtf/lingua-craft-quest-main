import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import commonFR from './locales/fr/common.json';
import navigationFR from './locales/fr/navigation.json';
import pagesFR from './locales/fr/pages.json';
import componentsFR from './locales/fr/components.json';

import commonEN from './locales/en/common.json';
import navigationEN from './locales/en/navigation.json';
import pagesEN from './locales/en/pages.json';
import componentsEN from './locales/en/components.json';

const resources = {
  fr: {
    common: commonFR,
    navigation: navigationFR,
    pages: pagesFR,
    components: componentsFR,
  },
  en: {
    common: commonEN,
    navigation: navigationEN,
    pages: pagesEN,
    components: componentsEN,
  },
};

i18n
  .use(LanguageDetector) // Détecte la langue du navigateur
  .use(initReactI18next) // Passe i18n à react-i18next
  .init({
    resources,
    fallbackLng: 'fr', // Langue par défaut
    defaultNS: 'common', // Namespace par défaut
    ns: ['common', 'navigation', 'pages', 'components'], // Namespaces disponibles

    detection: {
      // Options de détection
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'], // Sauvegarde le choix dans localStorage
      lookupLocalStorage: 'i18nextLng',
    },

    interpolation: {
      escapeValue: false, // React échappe déjà les valeurs
    },

    react: {
      useSuspense: false, // Désactive suspense pour éviter les bugs de chargement
    },
  });

export default i18n;
