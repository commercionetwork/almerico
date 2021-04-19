<template>
  <v-navigation-drawer v-model="isSidebarOpen" app fixed>
    <v-list nav dense>
      <v-list-item-group>
        <NavBarItemComponent
          icon="mdi-view-dashboard"
          title="Dashboard"
          :to="{ name: ROUTES.NAMES.DASHBOARD }"
        />
        <NavBarItemComponent
          icon="mdi-account-multiple"
          title="Validators"
          :to="{ name: ROUTES.NAMES.VALIDATORS }"
        />
        <NavBarItemComponent
          icon="mdi-swap-horizontal-bold"
          title="Transactions"
          :to="{ name: ROUTES.NAMES.TRANSACTIONS }"
        />
        <NavBarItemComponent
          icon="mdi-shape"
          title="Blocks"
          :to="{ name: ROUTES.NAMES.BLOCKS }"
        />
      </v-list-item-group>
    </v-list>
    <v-divider></v-divider>
    <div class="pl-2">
      <NavBarSwitchThemeComponent />
    </div>
  </v-navigation-drawer>
</template>

<script>
import NavBarItemComponent from './NavBarItemComponent';
import NavBarSwitchThemeComponent from './NavBarSwitchThemeComponent';

import { ROUTES } from '@/constants';

export default {
  name: 'NavBarNavigationDrawerComponent',
  components: {
    NavBarItemComponent,
    NavBarSwitchThemeComponent,
  },
  props: {
    drawer: {
      type: Boolean,
      default: false,
      note: 'Toggle the drawer visibility',
    },
  },
  data: () => ({
    ROUTES,
  }),
  computed: {
    isSidebarOpen: {
      get() {
        return this.drawer;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>
