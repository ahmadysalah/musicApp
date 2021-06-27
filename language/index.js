// import React from 'react';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

import { GetFromStore, AsyncStore, DeleteStore } from '../utils/AsyncStorage';
import language from './language';

// function will start auto when app start.
(async () => {
  // Set the locale once at the beginning of your app
  const currentLanguage = await GetFromStore('currentLanguage');
  // DeleteStore('currentLanguage').then();
  // Set the language what the client chose before if not get the current system language.
  i18n.locale = JSON.parse(currentLanguage) || Localization.locale.substr(0, 2);
  console.log({ localize: Localization.locale });
  // When a value is missing from a language it'll fallback to another language with the key present.
  // Set the key-value pairs for the different languages you want to support.
  i18n.fallbacks = true;

  // Set the translation from the languages file.
  i18n.translations = language;
})();

// function to change language and set the new language in asyncStorage
const onChangLanguage = async (newLanguage) => {
  // const newLanguage = i18n.locale === 'en' ? 'ko' : 'en';
  await AsyncStore('currentLanguage', JSON.stringify(newLanguage));
  // Set the new language as default
  i18n.locale = newLanguage;
  return newLanguage;
};

// function to get the current language in the App
// return the translate function
// const getCurrentLanguage = () => i18n.t('language');

// const Language = React.createContext(i18n.t('language'));
const translate = i18n.t;

export { translate, onChangLanguage };
