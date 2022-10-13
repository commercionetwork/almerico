<template>
  <v-autocomplete
    :items="items"
    item-text="moniker"
    item-value="address"
    return-object
    v-model="srcAddress"
  ></v-autocomplete>
</template>

<script>
export default {
  name: 'ValidatorManagerDelegationSearch',
  props: {
    delegations: {
      type: Array,
      default: () => [],
    },
    validatorAddress: {
      type: String,
      default: '',
    },
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['input'],
  computed: {
    items() {
      const delegations = this.delegations.filter(
        (delegation) => delegation.address !== this.validatorAddress
      );
      return delegations;
    },
    srcAddress: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>
