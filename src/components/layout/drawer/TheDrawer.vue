<template>
  <v-list nav dense>
    <v-list-item-group>
      <TheDrawerLocale />
      <v-divider />
      <TheDrawerItem
        :icon="mdiViewDashboard"
        :title="$t('titles.dashboard')"
        :to="{ name: ROUTES.NAME.HOME }"
      />
      <TheDrawerItem
        :icon="mdiAccountMultiple"
        :title="$t('titles.validators')"
        :to="{ name: ROUTES.NAME.VALIDATORS }"
      />
      <TheDrawerItem
        :icon="mdiSwapHorizontalBold"
        :title="$t('titles.transactions')"
        :to="{ name: ROUTES.NAME.TRANSACTIONS }"
      />
      <TheDrawerItem
        :icon="mdiShape"
        :title="$t('titles.blocks')"
        :to="{ name: ROUTES.NAME.BLOCKS }"
      />
      <TheDrawerItem
        :icon="mdiTableEye"
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
import {
  mdiAccountMultiple,
  mdiShape,
  mdiSwapHorizontalBold,
  mdiTableEye,
  mdiViewDashboard,
} from '@mdi/js';

export default {
  name: 'TheDrawer',
  components: {
    TheDrawerItem,
    TheDrawerTheme,
    TheDrawerLocale,
  },
  data: () => ({
    ROUTES,
    mdiAccountMultiple,
    mdiShape,
    mdiSwapHorizontalBold,
    mdiTableEye,
    mdiViewDashboard,
  }),
};
</script>
