<template>
  <v-card-text>
    <div class="py-1" v-text="availables" />
    <div class="py-1" v-text="exchange" />
  </v-card-text>
</template>

<script>
import { mapGetters } from 'vuex';
import DexViewSwapManager from './dex-swap-manager';
import { tokensHandler } from '@/utils';

export default {
  name: 'DexViewSwapInfo',
  props: {
    tokenFrom: {
      type: Object,
      required: true,
    },
    tokenTo: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters('dex', ['detail']),
    availables() {
      let availables = 0;
      if (this.tokenFrom.balance) {
        const balance = tokensHandler.convertFromBase(
          this.tokenFrom.balance,
          this.tokenFrom.decimals
        );
        availables = tokensHandler.format(balance, this.tokenFrom.decimals);
      }
      return `${this.$t('labels.availables')}: ${availables} ${
        this.tokenFrom.denom
      }`;
    },
    exchange() {
      const exchange = DexViewSwapManager.getExpectedAmount({
        amount: '1',
        tokenFrom: this.tokenFrom,
        tokenTo: this.tokenTo,
        lp: this.detail.lp,
      });
      return `1 ${this.tokenFrom.denom} = ${tokensHandler.convertFromBase(
        exchange,
        this.tokenTo.decimals
      )} ${this.tokenTo.denom}`;
    },
  },
};
</script>
