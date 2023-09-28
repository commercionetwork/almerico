<template>
  <v-text-field
    id="contract-symbol"
    dense
    outlined
    persistent-placeholder
    required
    :error-messages="errorMessages"
    v-model="model"
    @blur="v.$touch()"
    @input="v.$touch()"
  >
    <template #label>
      <div class="font-weight-bold">
        <span class="mx-1 error--text">*</span>
        <span v-text="$t('labels.symbol')" />
      </div>
    </template>
  </v-text-field>
</template>

<script>
export default {
  name: 'AssetsViewNewSymbol',
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
      !this.v.charsAndDash && errors.push(this.$t('alerts.cw20SymbolPolicies'));
      return errors;
    },
  },
};
</script>
