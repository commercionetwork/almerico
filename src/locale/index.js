import Vue from 'vue';
import VueI18n from 'vue-i18n';
import en from './en/index.js';
import it from './it/index.js';
import { LOCALE } from '@/constants';

const availableLocales = LOCALE.LANGS.map((lang) => lang.value);

Vue.use(VueI18n);

export default new VueI18n({
  locale: LOCALE.DEFAULT,
  fallbackLocale: LOCALE.DEFAULT,
  messages: { en, it },
  availableLocales: availableLocales,
  silentFallbackWarn: true,
});
