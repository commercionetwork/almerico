<template>
  <v-row>
    <v-col cols="12">
      <div class="font-weight-bold">
        <span class="mx-1 error--text">*</span>
        <span v-text="$t('titles.initialBalance')" />
      </div>
    </v-col>
    <v-col cols="12" md="6">
      <v-text-field
        id="contract-wallet"
        dense
        disabled
        outlined
        persistent-placeholder
        :label="$t('labels.address')"
        :placeholder="wallet"
      />
    </v-col>
    <v-col cols="12" md="6">
      <v-text-field
        id="contract-initial-balance"
        dense
        outlined
        persistent-placeholder
        required
        step="0.01"
        type="number"
        :error-messages="errorMessages"
        :label="$t('labels.amount')"
        v-model="model"
        @blur="v.$touch()"
        @input="v.$touch()"
      >
      </v-text-field>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'AssetsViewNewInitialBalance',
  props: {
    value: {
      type: String,
    },
    v: {
      type: Object,
      default: () => null,
    },
    wallet: {
      type: String,
    },
  },
  emits: ['input'],
  computed: {
    model: {
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
      !this.v.amountVsCap && errors.push(this.$t('msgs.amountVsCap'));
      !this.v.minValue && errors.push(this.$t('msgs.amountGreaterZero'));
      !this.v.required && errors.push(this.$t('msgs.mandatoryField'));
      return errors;
    },
  },
};
</script>
