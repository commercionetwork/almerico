<template>
  <footer>
    <v-footer
      app
      :style="{ background: $vuetify.theme.themes[theme].backgroundFooter }"
    >
      <v-btn
        v-scroll="onScroll"
        v-show="fab"
        color="primary"
        fab
        dark
        small
        absolute
        top
        right
        @click="toTop"
      >
        <v-icon dark>mdi-arrow-up-bold</v-icon>
      </v-btn>
      <span class="py-1 overline font-italic" v-html="copy" />
    </v-footer>
  </footer>
</template>

<script>
export default {
  name: "FooterComponent",
  data: () => ({
    fab: false,
  }),
  computed: {
    copy() {
      const year = new Date().getFullYear();
      return `&copy;&nbsp;${year}&nbsp;Commerc.io&nbsp;srl`;
    },
    theme() {
      return this.$vuetify.theme.dark ? "dark" : "light";
    },
  },
  methods: {
    onScroll() {
      if (typeof window === "undefined") return;
      this.fab = window.pageYOffset > 25;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
  },
};
</script>