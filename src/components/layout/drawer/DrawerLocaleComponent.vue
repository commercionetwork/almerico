<template>
  <v-list-item>
    <v-list-item-icon>
      <v-icon aria-hidden="false"> mdi-translate </v-icon>
    </v-list-item-icon>
    <v-list-item-title>
      <v-select
        v-model="$i18n.locale"
        :items="items"
        item-text="text"
        item-value="value"
        dense
        placeholder="Lang"
      ></v-select>
    </v-list-item-title>
  </v-list-item>
</template>

<script>
import { LOCALE } from '@/constants';

export default {
  name: 'DrawerLocaleComponent',
  computed: {
    items() {
      return LOCALE.LANGS;
    },
  },
};
</script>
