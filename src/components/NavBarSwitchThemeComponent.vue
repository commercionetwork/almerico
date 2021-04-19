<template>
  <v-switch
    hint="Toggle the theme style"
    inset
    label="Dark"
    persistent-hint
    @change="toggleTheme"
  ></v-switch>
</template>

<script>
export default {
  name: 'NavBarSwitchThemeComponent',
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem('theme-dark', this.$vuetify.theme.dark);
    },
  },
  created() {
    this.$vuetify.theme.dark = localStorage.getItem('theme-dark')
      ? localStorage.getItem('theme-dark')
      : false;
  },
};
</script>
