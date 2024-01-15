<template>
  <div>
    <div class="text-right text-caption" v-text="caption" />
    <v-text-field
      id="amount"
      dense
      outlined
      persistent-placeholder
      required
      step="0.01"
      type="number"
      :error-messages="errorMessages"
      :success-messages="successMessages"
      v-model="amount"
      @blur="v.$touch()"
      @input="v.$touch()"
    >
      <template #label>
        <div class="font-weight-bold">
          <span class="mx-1 error--text">*</span>
          <span v-text="$t('labels.amount')" />
        </div>
      </template>
    </v-text-field>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import poolsSwapLiquidityManager from './pools-swap-liquidity-manager';
import { tokensHandler } from '@/utils';

export default {
  name: 'PoolsViewSwapAmount',
  props: {
    v: {
      type: Object,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
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
    ...mapGetters('poolsDetail', ['contract']),
    amount: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    caption() {
      const balance = tokensHandler.convertFromBase(
        this.tokenFrom.balance,
        this.tokenFrom.decimals
      );
      return `${this.tokenFrom.denom} ${tokensHandler.format(
        balance,
        this.tokenFrom.decimals
      )}`;
    },
    expected() {
      if (this.errorMessages.length > 0) {
        return '';
      }
      const expected = poolsSwapLiquidityManager.getExpectedAmount({
        amount: this.amount,
        tokenFrom: this.tokenFrom,
        tokenTo: this.tokenTo,
        lp: this.contract.lp,
      });
      return `${this.tokenTo.denom} ${tokensHandler.convertFromBase(
        expected,
        this.tokenTo.decimals
      )}`;
    },
    errorMessages() {
      const errors = [];
      if (!this.v || !this.v.$dirty) return errors;
      !this.v.greaterThanZero && errors.push(this.$t('msgs.positiveAmount'));
      !this.v.smallerThanBalance &&
        errors.push(this.$t('msgs.amonutLessThanBalance'));
      return errors;
    },
    successMessages() {
      return this.expected
        ? `${this.$t('labels.expectedAmount')}: ${this.expected}`
        : '';
    },
  },
};
</script>
