<template>
  <nav>
    <v-navigation-drawer app disable-resize-watcher fixed v-model="drawer">
      <the-drawer />
    </v-navigation-drawer>
    <v-app-bar app color="primary" dark flat>
      <v-row class="d-flex align-center">
        <v-col cols="2" md="5" class="d-flex justify-start">
          <v-app-bar-nav-icon @click.stop="drawer = !drawer">
            <slot>
              <v-icon size="35">{{ drawer ? mdiWindowClose : mdiMenu }}</v-icon>
            </slot>
          </v-app-bar-nav-icon>
        </v-col>
        <v-col cols="3" md="2" class="d-flex justify-center">
          <router-link :to="{ name: ROUTES.NAME.HOME }">
            <v-img :src="logoSrc" alt="Logo" width="50" />
          </router-link>
        </v-col>
        <v-col cols="7" md="5" class="d-flex justify-end">
          <the-connect-wallet-button />
        </v-col>
      </v-row>
      <the-connect-snack-bar />
    </v-app-bar>
  </nav>
</template>

<script>
import TheConnectSnackBar from './nav-bar/TheConnectSnackBar.vue';
import TheConnectWalletButton from './nav-bar/TheConnectWalletButton.vue';
import TheDrawer from './nav-bar/drawer/TheDrawer';

import { ROUTES } from '@/constants';
import { mdiMenu, mdiWindowClose } from '@mdi/js';

export default {
  name: 'TheNavBar',
  components: {
    TheConnectSnackBar,
    TheConnectWalletButton,
    TheDrawer,
  },
  data() {
    return {
      ROUTES,
      mdiMenu,
      mdiWindowClose,
      drawer: false,
    };
  },
  computed: {
    logoSrc() {
      return require('@/assets/img/logo-white.png');
    },
  },
};
</script>
