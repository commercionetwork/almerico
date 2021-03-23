<template>
  <v-app
    id="main"
    :style="{ background: $vuetify.theme.themes[theme].background }"
  >
    <!-- navigation -->
    <NavBar />
    <!-- content -->
    <v-main>
      <v-layout
        v-if="isLoading"
        align-center
        justify-center
        column
        fill-height
        data-test="loading"
      >
        <v-progress-circular
          :size="100"
          :width="15"
          indeterminate
          color="primary"
        />
      </v-layout>
      <v-container v-else-if="error !== null" data-test="error">
        <v-row>
          <v-col cols="12">
            <v-alert border="left" prominent text type="error">
              <span class="text-body-1" v-text="JSON.stringify(error)" />
            </v-alert>
          </v-col>
        </v-row>
      </v-container>
      <v-container v-else data-test="router-view">
        <router-view />
      </v-container>
    </v-main>
    <!-- footer -->
    <Footer />
  </v-app>
</template>

<script>
import Footer from './components/Footer';
import NavBar from './components/NavBar';

import { mapActions, mapGetters } from 'vuex';
import { ROUTES } from './constants';

export default {
  name: 'App',
  components: {
    Footer,
    NavBar,
  },
  computed: {
    ...mapGetters('starting', {
      error: 'error',
      isLoading: 'isLoading',
    }),
    theme() {
      return this.$vuetify.theme.dark ? 'dark' : 'light';
    },
    serverReachability() {
      return this.$store.getters.getServerReachability;
    },
  },
  watch: {
    serverReachability(value) {
      if (!value) this.$router.push({ name: ROUTES.NAMES.SERVER_UNREACHABLE });
    },
  },
  methods: {
    ...mapActions('starting', {
      fetchInitData: 'fetchInitData',
    }),
  },
  created() {
    this.fetchInitData();
  },
};
</script>
