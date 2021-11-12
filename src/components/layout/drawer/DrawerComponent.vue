<template>
  <v-list nav dense>
    <v-list-item-group>
      <DrawerItemComponent
        icon="mdi-view-dashboard"
        :title="$t('titles.dashboard')"
        :to="{ name: ROUTES.NAME.HOME }"
      />
      <DrawerItemComponent
        icon="mdi-account-multiple"
        :title="$t('titles.validators')"
        :to="{ name: ROUTES.NAME.VALIDATORS }"
      />
      <DrawerItemComponent
        icon="mdi-swap-horizontal-bold"
        :title="$t('titles.transactions')"
        :to="{ name: ROUTES.NAME.TRANSACTIONS }"
      />
      <DrawerItemComponent
        icon="mdi-shape"
        :title="$t('titles.blocks')"
        :to="{ name: ROUTES.NAME.BLOCKS }"
      />
      <DrawerItemComponent
        icon="mdi-table-eye"
        :title="$t('titles.exchangeRate')"
        :to="{ name: ROUTES.NAME.EXCHANGE_RATE }"
      />
      <v-divider />
      <DrawerThemeComponent />
    </v-list-item-group>
  </v-list>
</template>

<script>
import DrawerItemComponent from './DrawerItemComponent';
import DrawerThemeComponent from './DrawerThemeComponent';

import { ROUTES } from '@/constants';

export default {
  name: 'DrawerComponent',
  components: {
    DrawerItemComponent,
    DrawerThemeComponent,
  },
  data: () => ({
    ROUTES,
  }),
};
</script>
