<template>
  <v-card class="mt-3" flat>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <div class="text-subtitle-1 font-weight-bold">
            <span v-text="tokenFrom" />
            <span class="mx-1" v-html="'&#8776;'" />
            <span v-text="tokenTo" />
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
  name: 'DexViewSwapRate',
  props: {
    model: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapGetters('dex', ['contract']),
    expechangeRate() {
      if (!this.model) {
        return '0';
      }
      const expechangeRate = dexSwapManager.getExpectedAmount({
        amount: '1',
        tokenFrom: this.model.tokenFrom,
        tokenTo: this.model.tokenTo,
        fee: this.contract.fee,
      });
      const amount = tokensHandler.convertFromBase(expechangeRate, 6);
      return tokensHandler.format(amount, 6);
    },
    tokenFrom() {
      return this.model && this.model.tokenFrom
        ? `1 ${this.model.tokenFrom.label}`
        : '';
    },
    tokenTo() {
      return this.model && this.model.tokenTo
        ? `${this.expechangeRate} ${this.model.tokenTo.label}`
        : '';
    },
  },
};
</script>
