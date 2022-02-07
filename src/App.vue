<template>
  <v-app id="main" :style="style">
    <v-container v-if="isLoading" fluid fill-height data-test="loading">
      <LoadingCircularComponent />
    </v-container>
    <div v-else>
      <NavBarComponent />
      <v-main>
        <v-container v-if="error" data-test="error">
          <ErrorMessageComponent :error="error" />
        </v-container>
        <v-container v-else data-test="content">
          <router-view />
        </v-container>
      </v-main>
      <FooterComponent />
    </div>
  </v-app>
</template>

<script>
import ErrorMessageComponent from '@/components/ErrorMessageComponent.vue';
import FooterComponent from '@/components/layout/FooterComponent.vue';
import LoadingCircularComponent from '@/components/LoadingCircularComponent';
import NavBarComponent from '@/components/layout/NavBarComponent.vue';

import { mapActions, mapGetters } from 'vuex';
import ws from '@/apis/ws';

export default {
  name: 'App',
  components: {
    ErrorMessageComponent,
    FooterComponent,
    LoadingCircularComponent,
    NavBarComponent,
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
  methods: {
    ...mapActions('application', {
      initAppData: 'initAppData',
    }),
  },
  created() {
    this.initAppData();
  },
  mounted() {
    ws.subscribe();
  },
};
</script>
