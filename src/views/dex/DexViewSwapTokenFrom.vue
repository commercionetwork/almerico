<template>
  <v-card flat>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <div class="text-h5 text-uppercase" v-text="token" />
          <div class="text-caption">
            <span class="mr-1" v-text="$t('labels.availables')" />
            <span class="primary--text font-weight-bold" v-text="availables" />
          </div>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            id="amount"
            class="text-h5 font-weight-bold"
            required
            :error-messages="errorMessages"
            v-model="amount"
            @blur="v.$touch()"
            @input="v.$touch()"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { tokensHandler } from '@/utils';

export default {
  name: 'DexViewSwapTokenFrom',
  props: {
    v: {
      type: Object,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    balance: {
      type: String,
      default: '0',
    },
    token: {
      type: String,
      default: '',
    },
  },
  emits: ['input'],
  computed: {
    amount: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    availables() {
      const availables = tokensHandler.convertFromBase(this.balance, 6);
      return tokensHandler.format(availables, 6);
    },
    errorMessages() {
      const errors = [];
      if (!this.v || !this.v.$dirty) return errors;
      !this.v.greaterThanZero && errors.push(this.$t('msgs.positiveAmount'));
      !this.v.smallerThanBalance &&
        errors.push(this.$t('msgs.amonutLessThanBalance'));
      return errors;
    },
  },
};
</script>
