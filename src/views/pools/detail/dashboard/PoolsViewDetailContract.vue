<template>
  <v-card outlined>
    <v-card-title>
      <div class="font-weight-bold" v-text="title" />
      <v-spacer />
      <v-btn disabled icon>
        <v-icon size="20">{{ mdiDatabasePlus }}</v-icon>
      </v-btn>
      <v-btn disabled icon>
        <v-icon size="20">{{ mdiDatabaseMinus }}</v-icon>
      </v-btn>
      <v-btn icon :to="{ name: ROUTES.NAME.POOLS_DETAIL_SWAP }">
        <v-icon size="20">{{ mdiDatabaseSync }}</v-icon>
      </v-btn>
    </v-card-title>
    <pools-view-detail-lp />
    <v-divider class="mx-3" />
    <v-row>
      <v-col cols="12" md="6">
        <pools-view-detail-token
          :title="CONTRACT.TOKEN.KEY.TOKEN_1"
          :token="token1"
        />
      </v-col>
      <v-col cols="12" md="6">
        <pools-view-detail-token
          :title="CONTRACT.TOKEN.KEY.TOKEN_2"
          :token="token2"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import PoolsViewDetailLp from './PoolsViewDetailLp.vue';
import PoolsViewDetailToken from './PoolsViewDetailToken.vue';

import { mdiDatabaseMinus, mdiDatabasePlus, mdiDatabaseSync } from '@mdi/js';
import { mapGetters } from 'vuex';
import { CONTRACT, ROUTES } from '@/constants';

export default {
  name: 'PoolsViewDetailContract',
  components: {
    PoolsViewDetailLp,
    PoolsViewDetailToken,
  },
  data() {
    return {
      CONTRACT,
      ROUTES,
      mdiDatabaseMinus,
      mdiDatabasePlus,
      mdiDatabaseSync,
    };
  },
  computed: {
    ...mapGetters('poolsDetail', ['contract']),
    lp() {
      return this.contract['lp'] || null;
    },
    title() {
      return this.lp
        ? `${this.$t('titles.liquidityPool')}: ${this.lp.id}`
        : '-';
    },
    token1() {
      return this.contract[CONTRACT.TOKEN.DENOM.TOKEN_1] || {};
    },
    token2() {
      return this.contract[CONTRACT.TOKEN.DENOM.TOKEN_2] || {};
    },
  },
};
</script>
