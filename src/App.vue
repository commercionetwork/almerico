<template>
  <v-app id="main" :style="style">
    <v-container v-if="isLoading" fluid fill-height data-test="loading">
      <BaseLoadingCircular />
    </v-container>
    <div v-else>
      <TheNavBar />
      <v-main>
        <v-container v-if="error" data-test="error">
          <TheErrorMessage :error="error" />
        </v-container>
        <v-container v-else data-test="content">
          <router-view />
        </v-container>
      </v-main>
      <TheFooter />
    </div>
  </v-app>
</template>

<script>
import TheErrorMessage from '@/components/TheErrorMessage.vue';
import TheFooter from '@/components/layout/TheFooter.vue';
import BaseLoadingCircular from '@/components/BaseLoadingCircular';
import TheNavBar from '@/components/layout/TheNavBar.vue';

import { mapActions, mapGetters } from 'vuex';
import ws from '@/apis/ws';

export default {
  name: 'App',
  components: {
    BaseLoadingCircular,
    TheErrorMessage,
    TheFooter,
    TheNavBar,
  },
  computed: {
    ...mapGetters('application', {
      error: 'error',
      isLoading: 'isLoading',
    }),
    style() {
      const theme = this.$vuetify.theme.dark ? 'dark' : 'light';
      return { background: this.$vuetify.theme.themes[theme].background };
    },
  },
  created() {
    this.initAppData();
  },
  mounted() {
    ws.subscribe();
  },
  methods: {
    ...mapActions('application', {
      initAppData: 'initAppData',
    }),
  },
};
</script>
