<template>
  <LoadingLinearComponent v-if="isBuilding" />
  <div v-else>
    <ExchangeRateTopContentComponent :rate="model.exchangeRate" />
    <ExchangeRateBodyComponent :model="model" />
  </div>
</template>

<script>
import ExchangeRateBodyComponent from './ExchangeRateBodyComponent.vue';
import ExchangeRateTopContentComponent from './ExchangeRateTopContentComponent.vue';
import LoadingLinearComponent from '@/components/LoadingLinearComponent';

import overviewHelper from './helpers/overviewHelper';
import { mapGetters } from 'vuex';

export default {
  name: 'ExchangeRateOverviewComponent',
  components: {
    ExchangeRateBodyComponent,
    ExchangeRateTopContentComponent,
    LoadingLinearComponent,
  },
  data: () => ({
    isBuilding: false,
    model: {
      maxSupplyRows: [],
      nonCirculatingSupplyRows: [],
      circulatingSupplyRows: [],
      exchangeRate: 0,
    },
  }),
  computed: {
    ...mapGetters('application', {
      params: 'stakingParams',
    }),
    ...mapGetters('exchangeRate', {
      abrTokens: 'abrTokens',
      accounts: 'accounts',
      freezedTokens: 'freezedTokens',
      pool: 'pool',
      supply: 'supply',
      vbrTokens: 'vbrTokens',
    }),
  },
  created() {
    this.isBuilding = true;
    overviewHelper
      .getOverviewTables({
        abrTokens: this.abrTokens,
        accounts: this.accounts,
        freezedTokens: this.freezedTokens,
        pool: this.pool,
        supply: this.supply,
        vbrTokens: this.vbrTokens,
        denom: this.params.bond_denom,
        translator: this.$t,
        ctx: this,
      })
      .then((data) => {
        this.model = data;
        this.isBuilding = false;
      });
  },
};
</script>
