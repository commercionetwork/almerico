<template>
  <v-card-text>
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
          <span v-text="label" />
        </div>
      </template>
    </v-text-field>
  </v-card-text>
</template>

<script>
import { mapGetters } from 'vuex';
import DexViewSwapManager from './dex-swap-manager';
import { tokensHandler } from '@/utils';

export default {
  name: 'DexViewSwapAmount',
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
    ...mapGetters('dex', ['detail']),
    amount: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    expected() {
      if (this.errorMessages.length > 0) {
        return '';
      }
      const expected = DexViewSwapManager.getExpectedAmount({
        amount: this.amount,
        tokenFrom: this.tokenFrom,
        tokenTo: this.tokenTo,
        lp: this.detail.lp,
      });
      return `${tokensHandler.convertFromBase(
        expected,
        this.tokenTo.decimals
      )} ${this.tokenTo.denom}`;
    },
    label() {
      return `${this.$t('labels.amount')} (${this.tokenFrom.denom})`;
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
