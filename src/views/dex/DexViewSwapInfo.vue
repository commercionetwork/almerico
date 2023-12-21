<template>
  <v-card-text>
    <v-alert color="info" outlined>
      <v-list dense>
        <base-detail-item
          :label="$t('labels.availables')"
          :content="availables"
        />
        <base-detail-item
          :label="$t('labels.exchangeRate')"
          :content="exchange"
        />
      </v-list>
    </v-alert>
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
      return `${availables} ${this.tokenFrom.denom}`;
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
