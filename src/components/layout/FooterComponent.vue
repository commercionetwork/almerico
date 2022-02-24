<template>
  <footer>
    <v-footer
      app
      :style="{ background: $vuetify.theme.themes[theme].backgroundFooter }"
    >
      <v-btn
        @click="toTop"
        absolute
        color="primary"
        dark
        fab
        right
        small
        top
        v-scroll="onScroll"
        v-show="fab"
      >
        <v-icon dark>mdi-arrow-up-bold</v-icon>
      </v-btn>
      <v-row class="my-0 py-0 py-sm-2 overline">
        <v-col cols="12" sm="2" class="my-0 py-0">
          <span
            class="d-flex justify-center justify-sm-start"
            v-text="appVersion"
          />
        </v-col>
        <v-col cols="12" sm="8" class="my-0 py-0">
          <span class="font-italic d-flex justify-center" v-html="copy" />
        </v-col>
      </v-row>
    </v-footer>
  </footer>
</template>

<script>
import { CONFIG } from '@/constants';

export default {
  name: 'FooterComponent',
  data: () => ({
    fab: false,
  }),
  computed: {
    appVersion() {
      return `v${process.env.APP_VERSION}`;
    },
    copy() {
      const year = new Date().getFullYear();
      return `&copy;&nbsp;${year} ${CONFIG.COPYRIGHT}`;
    },
    theme() {
      return this.$vuetify.theme.dark ? 'dark' : 'light';
    },
  },
  methods: {
    onScroll() {
      if (typeof window === 'undefined') return;
      this.fab = window.pageYOffset > 25;
    },
    toTop() {
      this.$vuetify.goTo(0);
    },
  },
};
</script>
