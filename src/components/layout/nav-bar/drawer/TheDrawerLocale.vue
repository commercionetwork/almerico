<template>
  <v-sheet color="rgba(0,0,0,0)">
    <v-select
      dense
      item-text="text"
      item-value="value"
      persistent-hint
      return-object
      single-line
      :hint="`${model.text}, ${model.label}`"
      :items="items"
      :label="$t('labels.lang')"
      v-model="model"
      @change="onChangeLocale"
    >
      <template #prepend>
        <country-flag :country="model.flag" size="normal" />
      </template>
      <template #selection="{ item }">
        <span class="text-subtitle-2">{{ item.text }}</span>
      </template>
    </v-select>
  </v-sheet>
</template>

<script>
import CountryFlag from 'vue-country-flag';

import { CONFIG, LOCALES } from '@/constants';

export default {
  name: 'TheDrawerLocale',
  components: { CountryFlag },
  data() {
    return {
      model: null,
    };
  },
  computed: {
    items() {
      return LOCALES;
    },
  },
  created() {
    this.model = LOCALES.find((locale) => locale.default);
    if (localStorage.getItem(CONFIG.BROWSER_STORAGE_KEYS.LOCALE)) {
      this.model = JSON.parse(
        localStorage.getItem(CONFIG.BROWSER_STORAGE_KEYS.LOCALE)
      );
      this.$i18n.locale = this.model.value;
    }
  },
  methods: {
    onChangeLocale() {
      this.$i18n.locale = this.model.value;
      localStorage.setItem(
        CONFIG.BROWSER_STORAGE_KEYS.LOCALE,
        JSON.stringify(this.model)
      );
    },
  },
};
</script>
