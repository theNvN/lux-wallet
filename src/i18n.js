import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import assetEn from 'assets/locales/en/asset.json';
import commonEn from 'assets/locales/en/common.json';
import formEn from 'assets/locales/en/form.json';
import txEn from 'assets/locales/en/tx.json';
import accountEn from 'assets/locales/en/account.json';
import errorEn from 'assets/locales/en/error.json';

import assetEs from 'assets/locales/es/asset.json';
import commonEs from 'assets/locales/es/common.json';
import formEs from 'assets/locales/es/form.json';
import txEs from 'assets/locales/es/tx.json';
import accountEs from 'assets/locales/es/account.json';
import errorEs from 'assets/locales/es/error.json';

const resources = {
  en: {
    asset: assetEn,
    common: commonEn,
    form: formEn,
    tx: txEn,
    account: accountEn,
    error: errorEn,
  },
  es: {
    asset: assetEs,
    common: commonEs,
    form: formEs,
    tx: txEs,
    account: accountEs,
    error: errorEs,
  },
};

/**
 * Initialize i18n
 */
i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
