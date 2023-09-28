<template>
  <v-text-field
    id="contract-cap"
    dense
    outlined
    persistent-placeholder
    required
    step="0.01"
    type="number"
    :error-messages="errorMessages"
    :label="$t('labels.cap')"
    v-model="model"
    @blur="v.$touch()"
    @input="v.$touch()"
  >
  </v-text-field>
</template>

<script>
export default {
  name: 'AssetsViewNewCap',
  props: {
    value: {
      type: String,
    },
    v: {
      type: Object,
      default: () => null,
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
      !this.v.minValue && errors.push(this.$t('alerts.amountGreaterZero'));
      return errors;
    },
  },
};
</script>
