<template>
  <dex-detail-data-card :subtitle="$t('titles.lpToken')">
    <template #data-1>
      <span class="font-weight-bold" v-text="$t('labels.address')" />
      <span>:</span>
      <span class="ml-1" v-text="lp.id" />
    </template>
    <template #data-2>
      <span class="font-weight-bold" v-text="$t('labels.balance')" />
      <span>:</span>
      <span class="ml-1" v-text="lpBalance" />
    </template>
    <template #data-3>
      <span class="font-weight-bold" v-text="$t('labels.supply')" />
      <span>:</span>
      <span class="ml-1" v-text="lpSupply" />
    </template>
  </dex-detail-data-card>
</template>

<script>
import DexDetailDataCard from './DexDetailDataCard.vue';

import { mapGetters } from 'vuex';
import { tokensHandler } from '@/utils';

export default {
  name: 'DexDetailLp',
  components: {
    DexDetailDataCard,
  },
  computed: {
    ...mapGetters('dexDetail', ['contract']),
    lp() {
      const lp = this.contract['lp'] || {};
      lp.denom = 'Liquidity pool';
      return lp;
    },
    lpBalance() {
      const balance =
        tokensHandler.convertFromBase(this.lp.balance, this.lp.decimals) || 0;
      return tokensHandler.format(balance, this.lp.decimals);
    },
    lpSupply() {
      const supply =
        tokensHandler.convertFromBase(this.lp.supply, this.lp.decimals) || 0;
      return tokensHandler.format(supply, this.lp.decimals);
    },
  },
};
</script>
