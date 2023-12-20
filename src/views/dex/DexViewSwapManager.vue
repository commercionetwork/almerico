<template>
  <v-progress-linear v-if="isFetching" color="primary" indeterminate />
  <div v-else-if="model.tokenFrom && model.tokenTo">
    <dex-view-swap-selector
      :tokenFrom="model.tokenFrom"
      :tokenTo="model.tokenTo"
      @reverse="onReverse"
    />
    <dex-view-swap-info :tokenFrom="model.tokenFrom" :tokenTo="model.tokenTo" />
    <dex-view-swap-amount
      :tokenFrom="model.tokenFrom"
      :tokenTo="model.tokenTo"
      :v="$v.model.amount"
      v-model.trim="model.amount"
    />
  </div>
  <div v-else />
</template>

<script>
import DexViewSwapAmount from './DexViewSwapAmount.vue';
import DexViewSwapInfo from './DexViewSwapInfo.vue';
import DexViewSwapSelector from './DexViewSwapSelector.vue';

import { validationMixin } from 'vuelidate';
import { mapActions, mapGetters } from 'vuex';
import dexSwapManager from './dex-swap-manager';

export default {
  name: 'DexViewSwapManager',
  components: {
    DexViewSwapAmount,
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
      this.model.tokenFrom = this.detail.token1;
      this.model.tokenTo = this.detail.token2;
    });
  },
  watch: {
    contract(value) {
      this.fetchDex(value.id).then(() => {
        this.model.tokenFrom = this.detail.token1;
        this.model.tokenTo = this.detail.token2;
      });
    },
    model: {
      handler(value) {
        if (this.$v.model.$invalid) {
          this.$emit('invalid');
          return;
        }
        this.$emit('complete', value);
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions('dex', ['fetchDex']),
    onReverse() {
      const tokenFrom = this.model.tokenTo;
      this.model.tokenTo = this.model.tokenFrom;
      this.model.tokenFrom = tokenFrom;
    },
  },
};
</script>
