<template>
  <v-list nav dense>
    <v-list-item-group>
      <the-drawer-locale />
    </v-list-item-group>
    <v-divider class="ma-1" />
    <v-list-item-group>
      <base-drawer-menu-item
        :icon="mdiViewDashboard"
        :title="$t('titles.dashboard')"
        :to="{ name: ROUTES.NAME.HOME }"
      />
      <base-drawer-menu-item
        :icon="mdiAccountMultiple"
        :title="$t('titles.validators')"
        :to="{ name: ROUTES.NAME.VALIDATORS }"
      />
      <base-drawer-menu-item
        :icon="mdiSwapHorizontalBold"
        :title="$t('titles.transactions')"
        :to="{ name: ROUTES.NAME.TRANSACTIONS }"
      />
      <base-drawer-menu-item
        :icon="mdiShape"
        :title="$t('titles.blocks')"
        :to="{ name: ROUTES.NAME.BLOCKS }"
      />
      <base-drawer-menu-item
        :icon="mdiVote"
        :title="$t('titles.governance')"
        :to="{ name: ROUTES.NAME.PROPOSALS }"
      />
      <base-drawer-menu-item
        :icon="mdiLibrary"
        :title="$t('titles.assets')"
        :to="{ name: ROUTES.NAME.ASSETS }"
      />
      <base-drawer-menu-item
        :icon="mdiCropRotate"
        :title="$t('titles.dex')"
        :to="{ name: ROUTES.NAME.DEX }"
      />
      <base-drawer-menu-item
        :icon="mdiHexagonSlice2"
        :title="$t('titles.pools')"
        :to="{ name: ROUTES.NAME.POOLS }"
      />
      <base-drawer-menu-item
        :icon="mdiTableEye"
        :title="$t('titles.exchangeRate')"
        :to="{ name: ROUTES.NAME.EXCHANGE_RATE }"
      />
    </v-list-item-group>
    <v-divider class="ma-1" />
    <v-list-item-group>
      <the-drawer-social-medial />
      <the-drawer-theme-switcher />
    </v-list-item-group>
  </v-list>
</template>

<script>
import BaseDrawerMenuItem from './BaseDrawerMenuItem';
import TheDrawerLocale from './TheDrawerLocale';
import TheDrawerSocialMedial from './TheDrawerSocialMedial';
import TheDrawerThemeSwitcher from './TheDrawerThemeSwitcher';

import { ROUTES } from '@/constants';
import {
  mdiAccountMultiple,
  mdiCropRotate,
  mdiHexagonSlice2,
  mdiLibrary,
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
      mdiCropRotate,
      mdiHexagonSlice2,
      mdiLibrary,
      mdiShape,
      mdiSwapHorizontalBold,
      mdiTableEye,
      mdiViewDashboard,
      mdiVote,
    };
  },
};
</script>
