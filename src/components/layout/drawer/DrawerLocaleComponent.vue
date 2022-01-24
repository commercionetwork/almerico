<template>
  <v-list-item>
    <v-list-item-icon>
      <v-icon aria-hidden="false"> mdi-translate </v-icon>
    </v-list-item-icon>
    <v-list-item-title>
      <v-select
        :items="items"
        :placeholder="$t('labels.lang')"
        dense
        item-text="text"
        item-value="value"
        v-model="lang"
        v-on:change="onChangeLocale"
      ></v-select>
    </v-list-item-title>
  </v-list-item>
</template>

<script>
import { CONFIG, LOCALE } from '@/constants';

export default {
  name: 'DrawerLocaleComponent',
  data: () => ({
    lang: '',
  }),
  computed: {
    items() {
      return LOCALE.LANGS;
    },
  },
  methods: {
    onChangeLocale() {
      this.$i18n.locale = this.lang;
      localStorage.setItem(CONFIG.BROWSER_STORAGE_KEYS.LOCALE, this.lang);
    },
  },
  mounted() {
    this.lang = localStorage.getItem(CONFIG.BROWSER_STORAGE_KEYS.LOCALE);
    if (this.lang) this.$i18n.locale = this.lang;
  },
};
</script>
