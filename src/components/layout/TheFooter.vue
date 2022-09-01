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
        <v-icon dark>{{ mdiArrowUpBold }}</v-icon>
      </v-btn>
      <v-row class="d-flex align-center rm__text-transform">
        <v-col cols="12" md="4" order="1" order-md="3" class="pb-1 py-md-5">
          <div class="text-center text-md-right text-caption">
            <span class="pr-1 font-weight-bold" v-text="chainNetwork" />
            <span v-text="chainVersion" />
            <v-icon right>
              {{ connectionIcon }}
            </v-icon>
          </div>
        </v-col>
        <v-col cols="12" md="4" order="2" class="py-0 py-md-5">
          <div class="text-center text-overline font-weight-bold">
            <span class="font-italic" v-html="copy" />
          </div>
        </v-col>
        <v-col cols="12" md="4" order="3" order-md="1" class="pt-1 py-md-5">
          <div class="text-center text-md-left text-caption">
            <span v-text="appVersion" />
          </div>
        </v-col>
      </v-row>
    </v-footer>
  </footer>
</template>

<script>
import { CONFIG } from '@/constants';
import { mapGetters } from 'vuex';
import { mdiArrowUpBold, mdiLanConnect, mdiLanDisconnect } from '@mdi/js';

export default {
  name: 'TheFooter',
  data() {
    return {
      mdiArrowUpBold,
      fab: false,
    };
  },
  computed: {
    ...mapGetters('application', ['info']),
    appVersion() {
      return `v${process.env.APP_VERSION}`;
    },
    chainNetwork() {
      return this.info && this.info.node_info && this.info.node_info.network
        ? this.info.node_info.network
        : '';
    },
    chainVersion() {
      return this.info &&
        this.info.application_version &&
        this.info.application_version.version
        ? `(${this.info.application_version.version})`
        : '';
    },
    connectionIcon() {
      return this.info ? mdiLanConnect : mdiLanDisconnect;
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

<style scoped>
.rm__text-transform {
  text-transform: none !important;
}
</style>
