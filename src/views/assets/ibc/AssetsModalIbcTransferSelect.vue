<template>
  <v-select
    dense
    item-text="name"
    outlined
    return-object
    :items="items"
    v-model="chain"
  >
    <template #label>
      <span v-text="$t('labels.select')" />
    </template>
    <template #append>
      <v-icon color="primary">{{ mdiChevronDown }}</v-icon>
    </template>
    <template #selection="{ item }">
      <div class="font-weight-bold">
        <span v-text="item.name" />
      </div>
    </template>
  </v-select>
</template>

<script>
import { mdiChevronDown } from '@mdi/js';

export default {
  name: 'AssetsModalIbcTransferSelect',
  props: {
    value: {
      type: Object,
      default: () => null,
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['input'],
  data() {
    return {
      mdiChevronDown,
    };
  },
  computed: {
    chain: {
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
