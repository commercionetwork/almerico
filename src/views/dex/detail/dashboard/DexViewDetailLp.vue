<template>
  <v-card-text>
    <v-row>
      <v-col cols="12" md="2">
        <v-list dense>
          <base-detail-item
            :label="$t('labels.balance')"
            :content="lpBalance"
          ></base-detail-item>
        </v-list>
      </v-col>
      <v-col cols="12" md="10">
        <v-list dense>
          <base-detail-item
            :label="$t('labels.supply')"
            :content="lpSupply"
          ></base-detail-item>
        </v-list>
      </v-col>
    </v-row>
  </v-card-text>
</template>

<script>
import { mapGetters } from 'vuex';
import { tokensHandler } from '@/utils';

export default {
  name: 'DexViewDetailLp',
  computed: {
    ...mapGetters('dexDetail', ['contract']),
    lp() {
      return this.contract['lp'] || null;
    },
    lpBalance() {
      if (!this.lp) return '0';
      const balance = tokensHandler.convertFromBase(
        this.lp.balance,
        this.lp.decimals
      );
      return tokensHandler.format(balance, this.lp.decimals);
    },
    lpSupply() {
      if (!this.lp) return '0';
      const supply = tokensHandler.convertFromBase(
        this.lp.supply,
        this.lp.decimals
      );
      return tokensHandler.format(supply, this.lp.decimals);
    },
  },
};
</script>
