<template>
  <v-text-field
    v-model="amount"
    dense
    outlined
    required
    :disabled="!v"
    :error-messages="errorMessages"
    :label="$t('labels.comAmount')"
    @blur="v.$touch()"
    @input="v.$touch()"
  />
</template>

<script>
export default {
  name: 'ValidatorManagerAmount',
  props: {
    value: {
      type: Number,
      default: 0,
    },
    v: {
      type: Object,
      required: true,
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
    errorMessages() {
      const errors = [];
      if (!this.v || !this.v.$dirty) return errors;
      !this.v.required && errors.push(this.$t('msgs.mandatoryField'));
      !this.v.decimal && errors.push(this.$t('msgs.decimalField'));
      return errors;
    },
  },
};
</script>
