<template>
  <v-list nav dense>
    <v-list-item-group>
      <TheDrawerLocale />
      <v-divider />
      <TheDrawerItem
        icon="mdi-view-dashboard"
        :title="$t('titles.dashboard')"
        :to="{ name: ROUTES.NAME.HOME }"
      />
      <TheDrawerItem
        icon="mdi-account-multiple"
        :title="$t('titles.validators')"
        :to="{ name: ROUTES.NAME.VALIDATORS }"
      />
      <TheDrawerItem
        icon="mdi-swap-horizontal-bold"
        :title="$t('titles.transactions')"
        :to="{ name: ROUTES.NAME.TRANSACTIONS }"
      />
      <TheDrawerItem
        icon="mdi-shape"
        :title="$t('titles.blocks')"
        :to="{ name: ROUTES.NAME.BLOCKS }"
      />
      <TheDrawerItem
        icon="mdi-table-eye"
        :title="$t('titles.exchangeRate')"
        :to="{ name: ROUTES.NAME.EXCHANGE_RATE }"
      />
      <v-divider />
      <TheDrawerTheme />
    </v-list-item-group>
  </v-list>
</template>

<script>
import TheDrawerItem from './TheDrawerItem';
import TheDrawerLocale from './TheDrawerLocale';
import TheDrawerTheme from './TheDrawerTheme';

import { ROUTES } from '@/constants';

export default {
  name: 'TheDrawer',
  components: {
    TheDrawerItem,
    TheDrawerTheme,
    TheDrawerLocale,
  },
  data: () => ({
    ROUTES,
  }),
};
</script>
