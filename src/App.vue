<template>
  <v-app
    id="main"
    :style="{ background: $vuetify.theme.themes[theme].background }"
  >
    <!-- navigation -->
    <NavBarComponent />
    <!-- content -->
    <v-main>
      <v-container
        v-if="isLoading"
        fluid
        fill-height
        justify-center
        data-test="loading"
      >
        <v-progress-circular
          :size="100"
          :width="15"
          indeterminate
          color="primary"
        />
      </v-container>
      <v-container v-else-if="!isLoading && error" data-test="error">
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
    <FooterComponent />
  </v-app>
</template>

<script>
import FooterComponent from '@/components/layout/FooterComponent';
import NavBarComponent from '@/components/layout/NavBarComponent';

import { mapActions, mapGetters } from 'vuex';
import { subscribeWebSocket } from '@/ws';

export default {
  name: 'App',
  components: {
    FooterComponent,
    NavBarComponent,
  },
  computed: {
    ...mapGetters(['error']),
    ...mapGetters('starting', {
      isLoading: 'isLoading',
    }),
    theme() {
      return this.$vuetify.theme.dark ? 'dark' : 'light';
    },
  },
  methods: {
    ...mapActions('starting', {
      init: 'init',
    }),
  },
  beforeCreate() {
    subscribeWebSocket();
  },
  created() {
    this.init();
  },
};
</script>
