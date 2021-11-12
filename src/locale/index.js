import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from './en/index.js';

const LOCALES = {
  EN: 'en-US',
};
const locale = navigator.language || navigator.userLanguage || LOCALES.EN;

Vue.use(VueI18n);

export default new VueI18n({
  locale: locale,
  fallbackLocale: LOCALES.EN,
  messages: { en },
  availableLocales: [LOCALES.EN],
  silentFallbackWarn: true,
});
