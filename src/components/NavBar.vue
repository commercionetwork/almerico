<template>
  <nav>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-img
        :src="$config.generic.logo"
        alt="Commercio Logo"
        class="shrink mr-2"
        contain
        transition="scale-transition"
        width="40"
      />
      <v-img
        :src="require('../assets/text-commercio.png')"
        alt="Commercio Name"
        class="shrink mt-1 hidden-sm-and-down"
        contain
        min-width="100"
        width="100"
      />

      <v-spacer></v-spacer>

      <div>
        <span class="caption" v-text="netName" />
        <v-icon right aria-hidden="false"> mdi-lan-connect </v-icon>
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app fixed>
      <v-list nav dense>
        <v-list-item-group>
          <NavBarItem
            icon="mdi-view-dashboard"
            title="Dashboard"
            :to="{ name: ROUTES.NAMES.DASHBOARD }"
          />
          <NavBarItem
            icon="mdi-account-multiple"
            title="Validators"
            :to="{ name: ROUTES.NAMES.VALIDATORS }"
          />
          <NavBarItem
            icon="mdi-swap-horizontal-bold"
            title="Transactions"
            :to="{ name: ROUTES.NAMES.TRANSACTIONS }"
          />
          <NavBarItem
            icon="mdi-shape"
            title="Blocks"
            :to="{ name: ROUTES.NAMES.BLOCKS }"
          />
        </v-list-item-group>
      </v-list>
      <v-divider></v-divider>
      <div class="pl-2">
        <v-switch
          v-model="$vuetify.theme.dark"
          hint="This toggles the theme"
          inset
          label="Dark"
          persistent-hint
        ></v-switch>
      </div>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import NavBarItem from './NavBarItem';

import { mapGetters } from 'vuex';
import { ROUTES } from '@/constants';

export default {
  name: 'NavBar',
  components: {
    NavBarItem,
  },
  data: () => ({
    ROUTES,
    drawer: false,
  }),
  computed: {
    ...mapGetters('starting', {
      info: 'nodeInfo',
    }),
    netName() {
      const name =
        this.info && this.info.node_info && this.info.node_info.network
          ? this.info.node_info.network
          : '-';
      const version =
        this.info &&
        this.info.application_version &&
        this.info.application_version.version
          ? this.info.application_version.version
          : '-';
      return `${name} (${version})`;
    },
  },
};
</script>
