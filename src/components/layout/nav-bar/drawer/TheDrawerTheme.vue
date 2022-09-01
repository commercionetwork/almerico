<template>
  <v-list-item @click="toggleTheme">
    <v-list-item-icon>
      <v-icon aria-hidden="false">{{ mdiThemeLightDark }}</v-icon>
    </v-list-item-icon>
    <v-list-item-title v-text="$t('titles.toggleTheme')" />
  </v-list-item>
</template>

<script>
import { CONFIG } from '@/constants';
import { mdiThemeLightDark } from '@mdi/js';

export default {
  name: 'TheDrawerTheme',
  data() {
    return { mdiThemeLightDark };
  },
  mounted() {
    const darkTheme = localStorage.getItem(CONFIG.BROWSER_STORAGE_KEYS.THEME);
    if (darkTheme && darkTheme === 'true') {
      this.$vuetify.theme.dark = true;
    } else {
      this.$vuetify.theme.dark = false;
    }
  },
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem(
        CONFIG.BROWSER_STORAGE_KEYS.THEME,
        this.$vuetify.theme.dark.toString()
      );
    },
  },
};
</script>
