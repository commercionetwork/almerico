<template>
  <v-card flat>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <div class="text-h5 text-uppercase" v-text="token" />
        </v-col>
        <v-col cols="12" md="6">
          <div class="text-h5">
            <span class="mr-1" v-html="'&#8776;'" />
            <span class="font-weight-bold" v-text="expectedAmount" />
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import dexSwapManager from './dex-swap-manager';
import { tokensHandler } from '@/utils';

export default {
  name: 'DexViewSwapTokenTo',
  props: {
    model: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapGetters('dex', ['contract']),
    expectedAmount() {
      if (!this.model) {
        return '0';
      }
      const expectedAmount = dexSwapManager.getExpectedAmount({
        amount: this.model.amount,
        tokenFrom: this.model.tokenFrom,
        tokenTo: this.model.tokenTo,
        fee: this.contract.fee,
      });
      const amount = tokensHandler.convertFromBase(expectedAmount, 6);
      return tokensHandler.format(amount, 6);
    },
    token() {
      return this.model && this.model.tokenTo ? this.model.tokenTo.label : '';
    },
  },
};
</script>
