<template>
  <v-text-field
    id="contract-decimals"
    dense
    outlined
    persistent-placeholder
    required
    type="number"
    :error-messages="errorMessages"
    v-model="model"
    @blur="v.$touch()"
    @input="v.$touch()"
  >
    <template #label>
      <div class="font-weight-bold">
        <span class="mx-1 error--text">*</span>
        <span v-text="$t('labels.decimals')" />
      </div>
    </template>
  </v-text-field>
</template>

<script>
export default {
  name: 'AssetsViewNewDecimals',
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
      !this.v.minValue && errors.push(this.$t('msgs.amountGreaterZero'));
      !this.v.required && errors.push(this.$t('msgs.mandatoryField'));
      return errors;
    },
  },
};
</script>
