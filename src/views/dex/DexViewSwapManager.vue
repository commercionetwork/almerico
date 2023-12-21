<template>
  <v-progress-linear
    v-if="isFetching"
    color="primary"
    indeterminate
    data-test="loading"
  />
  <v-alert
    v-else-if="!model.tokenFrom || !model.tokenTo"
    outlined
    type="info"
    data-test="info"
  >
    <span v-text="$t('msgs.notAvailable')" />
  </v-alert>
  <div v-else data-test="content">
    <v-row class="d-flex justify-center align-center">
      <v-col cols="12" md="6">
        <dex-view-swap-selector
          :tokenFrom="model.tokenFrom"
          :tokenTo="model.tokenTo"
          @reverse="onReverse"
        />
      </v-col>
      <v-col cols="12" md="6">
        <dex-view-swap-info
          :tokenFrom="model.tokenFrom"
          :tokenTo="model.tokenTo"
        />
      </v-col>
    </v-row>
    <v-row class="d-flex align-baseline">
      <v-col cols="12" md="6">
        <dex-view-swap-amount
          :tokenFrom="model.tokenFrom"
          :tokenTo="model.tokenTo"
          :v="$v.model.amount"
          v-model.trim="model.amount"
        />
      </v-col>
      <v-col cols="12" md="6">
        <dex-view-swap-execute
          :model="model"
          :disabled="$v.model.$invalid"
          @success="onSuccess"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import DexViewSwapAmount from './DexViewSwapAmount.vue';
import DexViewSwapExecute from './DexViewSwapExecute.vue';
import DexViewSwapInfo from './DexViewSwapInfo.vue';
import DexViewSwapSelector from './DexViewSwapSelector.vue';

import { validationMixin } from 'vuelidate';
import { mapActions, mapGetters } from 'vuex';
import dexSwapManager from './dex-swap-manager';

export default {
  name: 'DexViewSwapManager',
  components: {
    DexViewSwapAmount,
    DexViewSwapExecute,
    DexViewSwapInfo,
    DexViewSwapSelector,
  },
  props: {
    contract: {
      type: Object,
      required: true,
    },
  },
  mixins: [validationMixin],
  validations() {
    return {
      model: {
        amount: {
          greaterThanZero: (value) => dexSwapManager.greaterThanZero(value),
          smallerThanBalance: (value) =>
            dexSwapManager.smallerThanBalance(value, this.model.tokenFrom),
        },
      },
    };
  },
  data() {
    return {
      model: {
        amount: '0.01',
        tokenFrom: null,
        tokenTo: null,
      },
    };
  },
  computed: {
    ...mapGetters('dex', ['isFetching', 'detail']),
  },
  created() {
    this.fetchDex(this.contract.id).then(() => {
      if (this.detail) {
        this.model.tokenFrom = this.detail.token1;
        this.model.tokenTo = this.detail.token2;
      }
    });
  },
  watch: {
    contract(value) {
      this.fetchDex(value.id).then(() => {
        if (this.detail) {
          this.model.tokenFrom = this.detail.token1;
          this.model.tokenTo = this.detail.token2;
        }
      });
    },
  },
  methods: {
    ...mapActions('dex', ['fetchDex']),
    onReverse() {
      const tokenFrom = this.model.tokenTo;
      this.model.tokenTo = this.model.tokenFrom;
      this.model.tokenFrom = tokenFrom;
    },
    onSuccess() {
      this.model.amount = '0.01';
      this.model.tokenFrom = this.detail.token1;
      this.model.tokenTo = this.detail.token2;
    },
  },
};
</script>
