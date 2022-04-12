<template>
  <BaseLoadingLinear v-if="isBuilding" />
  <div v-else>
    <ExchangeRateViewContentTop :rate="model.exchangeRate" />
    <ExchangeRateViewContentBody :model="model" />
  </div>
</template>

<script>
import BaseLoadingLinear from '@/components/BaseLoadingLinear';
import ExchangeRateViewContentBody from './ExchangeRateViewContentBody.vue';
import ExchangeRateViewContentTop from './ExchangeRateViewContentTop.vue';

import overviewHelper from './helpers/overviewHelper';
import { mapGetters } from 'vuex';

export default {
  name: 'ExchangeRateViewOverview',
  components: {
    BaseLoadingLinear,
    ExchangeRateViewContentBody,
    ExchangeRateViewContentTop,
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
    ...mapGetters('application', ['stakingParams']),
    ...mapGetters('exchangeRate', [
      'abrTokens',
      'accounts',
      'freezedTokens',
      'pool',
      'supply',
      'vbrTokens',
    ]),
  },
  created() {
    this.isBuilding = true;
    overviewHelper
      .getOverview({
        abrTokens: this.abrTokens,
        accounts: this.accounts,
        freezedTokens: this.freezedTokens,
        pool: this.pool,
        supply: this.supply,
        vbrTokens: this.vbrTokens,
        denom: this.stakingParams.bond_denom,
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
