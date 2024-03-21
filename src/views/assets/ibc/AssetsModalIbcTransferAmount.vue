<template>
  <div>
    <div class="text-right">
      <v-btn text :disabled="isHandling" @click="setMax">
        <span class="text-caption info--text" v-text="`Max: ${maxBalance}`" />
      </v-btn>
    </div>
    <v-text-field
      dense
      outlined
      required
      :error-messages="errorMessages"
      v-model="amount"
      @blur="v.$touch()"
      @input="v.$touch()"
    ></v-text-field>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'AssetsModalIbcTransferAmount',
  props: {
    v: {
      type: Object,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    maxBalance: {
      type: String,
      default: '0',
    },
  },
  emits: ['input'],
  computed: {
    ...mapGetters('assetsIbc', ['isHandling']),
    amount: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
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
  methods: {
    setMax() {
      this.amount = this.maxBalance;
    },
  },
};
</script>
