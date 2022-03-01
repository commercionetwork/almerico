<template>
  <v-list-item>
    <v-list-item-icon>
      <country-flag :country="locale.flag" size="normal" />
    </v-list-item-icon>
    <v-list-item-title>
      <v-select
        :hint="`${locale.text}, ${locale.label}`"
        :items="items"
        :placeholder="$t('labels.lang')"
        dense
        item-text="text"
        item-value="value"
        return-object
        v-model="locale"
        @change="onChangeLocale"
      >
        <template #selection="{ item }">
          <span class="text-subtitle-2">{{ item.text }}</span>
        </template>
      </v-select>
    </v-list-item-title>
  </v-list-item>
</template>

<script>
import CountryFlag from 'vue-country-flag';

import { CONFIG, LOCALES } from '@/constants';

export default {
  name: 'TheDrawerLocale',
  components: { CountryFlag },
  data: () => ({
    locale: null,
  }),
  computed: {
    defaultLocale() {
      return LOCALES.find((locale) => locale.default);
    },
    items() {
      return LOCALES;
    },
  },
  created() {
    this.locale = localStorage.getItem(CONFIG.BROWSER_STORAGE_KEYS.LOCALE)
      ? JSON.parse(localStorage.getItem(CONFIG.BROWSER_STORAGE_KEYS.LOCALE))
      : this.defaultLocale;
    this.$i18n.locale = this.locale.value;
  },
  methods: {
    onChangeLocale() {
      this.$i18n.locale = this.locale.value;
      localStorage.setItem(
        CONFIG.BROWSER_STORAGE_KEYS.LOCALE,
        JSON.stringify(this.locale)
      );
    },
  },
};
</script>
