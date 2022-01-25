import { LOCALES } from '@/constants';
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from './en/index.js';
import it from './it/index.js';

const defaultLocale = LOCALES.find((locale) => locale.default);
const availableLocales = LOCALES.map((locale) => locale.value);

Vue.use(VueI18n);

export default new VueI18n({
  locale: defaultLocale.value,
  fallbackLocale: defaultLocale.value,
  messages: { en, it },
  availableLocales: availableLocales,
  silentFallbackWarn: true,
});
