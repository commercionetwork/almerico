<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-text-field
        id="contract-minter"
        dense
        disabled
        outlined
        persistent-placeholder
        :label="$t('labels.address')"
        :placeholder="minter"
      />
    </v-col>
    <v-col cols="12" md="6">
      <v-text-field
        id="contract-cap"
        dense
        outlined
        persistent-placeholder
        required
        type="number"
        :error-messages="errorMessages"
        :label="$t('labels.cap')"
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
  name: 'AssetsViewNewCap',
  props: {
    value: {
      type: String,
    },
    v: {
      type: Object,
      default: () => null,
    },
    minter: {
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
      !this.v.minValue && errors.push(this.$t('alerts.amountGreaterZero'));
      return errors;
    },
  },
};
</script>
