<template>
  <v-form :disabled="isHandling">
    <pools-view-swap-selector
      :tokenFrom="model.tokenFrom"
      :tokenTo="model.tokenTo"
      @reverse="onReverse"
    />
    <v-divider class="my-3" />
    <v-row>
      <v-col cols="12">
        <pools-view-swap-amount
          :tokenFrom="model.tokenFrom"
          :tokenTo="model.tokenTo"
          :v="$v.model.amount"
          v-model.trim="model.amount"
        />
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import PoolsViewSwapAmount from './PoolsViewSwapAmount.vue';
import PoolsViewSwapSelector from './PoolsViewSwapSelector.vue';

import { validationMixin } from 'vuelidate';
import { mapGetters } from 'vuex';
import poolsSwapLiquidityManager from './pools-swap-liquidity-manager';

export default {
  name: 'PoolsViewSwapForm',
  components: {
    PoolsViewSwapAmount,
    PoolsViewSwapSelector,
  },
  mixins: [validationMixin],
  validations() {
    return {
      model: {
        amount: {
          greaterThanZero: (value) =>
            poolsSwapLiquidityManager.greaterThanZero(value),
          smallerThanBalance: (value) =>
            poolsSwapLiquidityManager.smallerThanBalance(
              value,
              this.model.tokenFrom
            ),
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
    ...mapGetters('poolsDetail', ['isHandling', 'contract']),
  },
  watch: {
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
  created() {
    this.model.tokenFrom = this.contract.token1;
    this.model.tokenTo = this.contract.token2;
  },
  methods: {
    onReverse() {
      const tokenFrom = this.model.tokenTo;
      this.model.tokenTo = this.model.tokenFrom;
      this.model.tokenFrom = tokenFrom;
    },
  },
};
</script>
