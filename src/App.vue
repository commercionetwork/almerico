<template>
  <v-app id="main" :style="style">
    <v-container v-if="isLoading" fluid fill-height data-test="loading">
      <base-loading-circular />
    </v-container>
    <div v-else>
      <the-nav-bar />
      <v-main>
        <v-container v-if="error" data-test="error">
          <the-error-message :error="error" />
        </v-container>
        <v-container v-else data-test="content">
          <transition name="route">
            <router-view />
          </transition>
        </v-container>
      </v-main>
      <the-footer />
    </div>
  </v-app>
</template>

<script>
import '@/assets/style/app.scss';
import TheFooter from '@/components/layout/TheFooter.vue';
import TheNavBar from '@/components/layout/TheNavBar.vue';

import { mapActions, mapGetters } from 'vuex';
import { wsBackendClient, wsChainClient } from '@/apis/ws';

export default {
  name: 'App',
  components: {
    TheFooter,
    TheNavBar,
  },
  computed: {
    ...mapGetters('application', ['error', 'isLoading']),
    style() {
      const theme = this.$vuetify.theme.dark ? 'dark' : 'light';
      return { background: this.$vuetify.theme.themes[theme].background };
    },
  },
  created() {
    this.initAppData();
    wsChainClient.get();
    wsBackendClient.get();
  },
  methods: {
    ...mapActions('application', ['initAppData']),
  },
};
</script>
