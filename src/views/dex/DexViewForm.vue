<template>
  <v-row>
    <v-col cols="12" sm="10" offset-sm="1" md="6" offset-md="3">
      <v-form :disabled="isHandling">
        <dex-view-swap-token-from
          :balance="balance"
          :token="model.tokenFrom.label"
          :v="$v.model.amount"
          v-model.trim="model.amount"
        />
        <dex-view-swap-inverter @reverse="onReverse" />
        <dex-view-swap-token-to :model="model" />
        <dex-view-swap-rate :model="model" />
        <dex-view-swap-execute
          :model="model"
          :disabled="$v.model.$invalid"
          @success="onSuccess"
        />
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import DexViewSwapExecute from './DexViewSwapExecute.vue';
import DexViewSwapInverter from './DexViewSwapInverter.vue';
import DexViewSwapRate from './DexViewSwapRate.vue';
import DexViewSwapTokenFrom from './DexViewSwapTokenFrom.vue';
import DexViewSwapTokenTo from './DexViewSwapTokenTo.vue';

import { mapGetters } from 'vuex';
import { validationMixin } from 'vuelidate';
import dexSwapManager from './dex-swap-manager';
import { CONTRACT } from '@/constants';
import { windowHandler } from '@/utils';

export default {
  name: 'DexViewForm',
  components: {
    DexViewSwapExecute,
    DexViewSwapInverter,
    DexViewSwapRate,
    DexViewSwapTokenFrom,
    DexViewSwapTokenTo,
  },
  mixins: [validationMixin],
  validations() {
    return {
      model: {
        amount: {
          greaterThanZero: (value) => dexSwapManager.greaterThanZero(value),
          smallerThanBalance: (value) =>
            dexSwapManager.smallerThanBalance(value, this.balance),
        },
      },
    };
  },
  data() {
    return {
      model: {
        amount: '0',
        tokenFrom: null,
        tokenTo: null,
      },
    };
  },
  computed: {
    ...mapGetters('dex', ['isHandling', 'balances', 'contract']),
    balance() {
      const balance = this.balances.find(
        (balance) => balance.denom === this.model.tokenFrom.denom
      );
      return balance ? balance.amount : '0';
    },
  },
  created() {
    this.model.tokenFrom = this.contract[CONTRACT.TOKEN.DENOM.TOKEN_1];
    this.model.tokenTo = this.contract[CONTRACT.TOKEN.DENOM.TOKEN_2];
  },
  mounted() {
    const myInput = document.getElementById('amount');
    windowHandler.setCaretPosition(myInput, 1);
  },
  methods: {
    onReverse() {
      const tokenFrom = this.model.tokenFrom;
      this.model.tokenFrom = this.model.tokenTo;
      this.model.tokenTo = tokenFrom;
    },
    onSuccess() {
      this.model.amount = '0';
      this.model.tokenFrom = this.contract[CONTRACT.TOKEN.DENOM.TOKEN_1];
      this.model.tokenTo = this.contract[CONTRACT.TOKEN.DENOM.TOKEN_2];
    },
  },
};
</script>
