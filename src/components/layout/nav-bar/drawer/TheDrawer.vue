<template>
  <v-card
    color="transparent"
    flat
    class="fill-height d-flex flex-column justify-space-between align-center"
  >
    <v-list nav dense>
      <v-list-item-group>
        <TheDrawerLocale />
        <v-divider />
        <BaseDrawerMenuItem
          :icon="mdiViewDashboard"
          :title="$t('titles.dashboard')"
          :to="{ name: ROUTES.NAME.HOME }"
        />
        <BaseDrawerMenuItem
          :icon="mdiAccountMultiple"
          :title="$t('titles.validators')"
          :to="{ name: ROUTES.NAME.VALIDATORS }"
        />
        <BaseDrawerMenuItem
          :icon="mdiSwapHorizontalBold"
          :title="$t('titles.transactions')"
          :to="{ name: ROUTES.NAME.TRANSACTIONS }"
        />
        <BaseDrawerMenuItem
          :icon="mdiShape"
          :title="$t('titles.blocks')"
          :to="{ name: ROUTES.NAME.BLOCKS }"
        />
        <BaseDrawerMenuItem
          :icon="mdiVote"
          :title="$t('titles.governance')"
          :to="{ name: ROUTES.NAME.PROPOSALS }"
        />
        <BaseDrawerMenuItem
          :icon="mdiTableEye"
          :title="$t('titles.exchangeRate')"
          :to="{ name: ROUTES.NAME.EXCHANGE_RATE }"
        />
        <v-divider />
        <TheDrawerSocialMedial />
      </v-list-item-group>
    </v-list>
    <TheDrawerThemeSwitcher />
  </v-card>
</template>

<script>
import BaseDrawerMenuItem from './BaseDrawerMenuItem';
import TheDrawerLocale from './TheDrawerLocale';
import TheDrawerSocialMedial from './TheDrawerSocialMedial';
import TheDrawerThemeSwitcher from './TheDrawerThemeSwitcher';

import { ROUTES } from '@/constants';
import {
  mdiAccountMultiple,
  mdiShape,
  mdiSwapHorizontalBold,
  mdiTableEye,
  mdiViewDashboard,
  mdiVote,
} from '@mdi/js';

export default {
  name: 'TheDrawer',
  components: {
    BaseDrawerMenuItem,
    TheDrawerLocale,
    TheDrawerSocialMedial,
    TheDrawerThemeSwitcher,
  },
  data() {
    return {
      ROUTES,
      mdiAccountMultiple,
      mdiShape,
      mdiSwapHorizontalBold,
      mdiTableEye,
      mdiViewDashboard,
      mdiVote,
    };
  },
};
</script>
