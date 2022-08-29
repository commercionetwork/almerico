<template>
  <nav>
    <v-navigation-drawer app disable-resize-watcher fixed v-model="drawer">
      <TheDrawer />
    </v-navigation-drawer>
    <v-app-bar app color="primary" dark flat>
      <v-row class="d-flex align-center">
        <v-col cols="4" class="d-flex justify-start">
          <v-app-bar-nav-icon @click.stop="drawer = !drawer">
            <slot>
              <v-icon size="35">{{ mdiMenu }}</v-icon>
            </slot>
          </v-app-bar-nav-icon>
        </v-col>
        <v-col cols="4" class="d-flex justify-center">
          <router-link :to="{ name: ROUTES.NAME.HOME }">
            <v-img :src="logoSrc" alt="Logo" width="50" />
          </router-link>
        </v-col>
        <v-col cols="4" class="d-flex justify-end">
          <v-btn outlined @click="suggest">
            <span>{{ $t('labels.connect') }}</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-app-bar>
  </nav>
</template>

<script>
import TheDrawer from './drawer/TheDrawer';

import { ROUTES } from '@/constants';
import { mdiMenu } from '@mdi/js';
import { keplrHandler } from '@/utils';

export default {
  name: 'TheNavBar',
  components: {
    TheDrawer,
  },
  data() {
    return {
      ROUTES,
      mdiMenu,
      drawer: false,
    };
  },
  computed: {
    logoSrc() {
      return require('@/assets/img/logo-white.png');
    },
  },
  methods: {
    suggest() {
      keplrHandler.suggest(this.$t, this);
    },
  },
};
</script>
