<template>
  <nav>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <router-link :to="{ name: ROUTES.NAMES.DASHBOARD }">
        <v-img
          :src="$config.generic.logo"
          alt="Commercio Logo"
          class="shrink mr-2"
          contain
          transition="scale-transition"
          width="40"
        />
      </router-link>
      <v-img
        :src="imgSrc"
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

    <NavBarNavigationDrawerComponent :drawer="drawer" />
  </nav>
</template>

<script>
import NavBarNavigationDrawerComponent from './NavBarNavigationDrawerComponent';

import { mapGetters } from 'vuex';
import { ROUTES } from '@/constants';

export default {
  name: 'NavBarComponent',
  components: {
    NavBarNavigationDrawerComponent,
  },
  data: () => ({
    ROUTES,
    drawer: false,
  }),
  computed: {
    ...mapGetters('starting', {
      info: 'nodeInfo',
    }),
    imgSrc() {
      return require('@/assets/text-commercio.png');
    },
    netName() {
      const name =
        this.info &&
        this.info.default_node_info &&
        this.info.default_node_info.network
          ? this.info.default_node_info.network
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
