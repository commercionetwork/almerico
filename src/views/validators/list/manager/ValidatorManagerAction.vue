<template>
  <v-autocomplete
    :items="items"
    item-text="text"
    item-value="value"
    return-object
    v-model="action"
  ></v-autocomplete>
</template>

<script>
import { VALIDATORS } from '@/constants';

export default {
  name: 'ValidatorManagerAction',
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['input'],
  computed: {
    items() {
      return VALIDATORS.STAKING_ACTIONS;
    },
    action: {
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
