<template>
  <v-list-item inactive>
    <v-row>
      <v-col cols="12" class="d-flex justify-center">
        <v-switch
          inset
          color="blue lighten-3"
          :append-icon="themeIcon"
          v-model="$vuetify.theme.dark"
          @change="toggleTheme"
        >
        </v-switch>
      </v-col>
    </v-row>
  </v-list-item>
</template>

<script>
import { CONFIG } from '@/constants';
import { mdiWeatherNight, mdiWhiteBalanceSunny } from '@mdi/js';

export default {
  name: 'TheDrawerThemeSwitcher',
  computed: {
    themeIcon() {
      return this.$vuetify.theme.dark === true
        ? mdiWeatherNight
        : mdiWhiteBalanceSunny;
    },
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
      localStorage.setItem(
        CONFIG.BROWSER_STORAGE_KEYS.THEME,
        this.$vuetify.theme.dark.toString()
      );
    },
  },
};
</script>
