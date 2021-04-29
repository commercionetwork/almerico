<template>
  <v-list-item v-on:click="toggleTheme">
    <v-list-item-icon>
      <v-icon aria-hidden="false">
        mdi-theme-light-dark
      </v-icon>
    </v-list-item-icon>
    <v-list-item-title v-text="'Toggle theme'" />
  </v-list-item>
</template>

<script>
export default {
  name: 'NavBarSwitchThemeComponent',
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem('dark-theme', this.$vuetify.theme.dark.toString());
    },
  },
  mounted() {
    const darkTheme = localStorage.getItem('dark-theme');
    if (darkTheme && darkTheme === 'true') {
      this.$vuetify.theme.dark = true;
    } else {
      this.$vuetify.theme.dark = false;
    }
  },
};
</script>
