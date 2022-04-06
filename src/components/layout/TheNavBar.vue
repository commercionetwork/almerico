<template>
  <nav>
    <v-navigation-drawer app disable-resize-watcher fixed v-model="drawer">
      <TheDrawer />
    </v-navigation-drawer>
    <v-app-bar app color="primary" dark flat>
      <v-row class="d-flex align-center">
        <v-col cols="2" md="4" class="d-flex justify-start">
          <v-app-bar-nav-icon @click.stop="drawer = !drawer">
            <slot>
              <v-icon size="40">{{ mdiMenu }}</v-icon>
            </slot>
          </v-app-bar-nav-icon>
        </v-col>
        <v-col
          cols="2"
          md="4"
          class="d-flex justify-space-between justify-md-center"
        >
          <router-link :to="{ name: ROUTES.NAME.HOME }">
            <v-img :src="logoSrc" alt="Logo" width="50" />
          </router-link>
        </v-col>
        <v-col cols="8" md="4" class="d-flex justify-end">
          <div class="caption text-right">
            <span class="pr-1 font-weight-bold" v-text="chainNetwork" />
            <span v-text="chainVersion" />
          </div>
          <v-icon right>
            {{ connectionIcon }}
          </v-icon>
        </v-col>
      </v-row>
    </v-app-bar>
  </nav>
</template>

<script>
import TheDrawer from './drawer/TheDrawer';

import { ROUTES } from '@/constants';
import { mapGetters } from 'vuex';
import { mdiLanConnect, mdiLanDisconnect, mdiMenu } from '@mdi/js';

export default {
  name: 'TheNavBar',
  components: {
    TheDrawer,
  },
  data: () => ({
    ROUTES,
    mdiMenu,
    drawer: false,
  }),
  computed: {
    ...mapGetters('application', ['info']),
    logoSrc() {
      return require('@/assets/img/logo-white.png');
    },
    connectionIcon() {
      return this.info ? mdiLanConnect : mdiLanDisconnect;
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
  },
};
</script>
