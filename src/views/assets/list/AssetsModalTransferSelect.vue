<template>
  <v-select
    dense
    item-text="name"
    outlined
    return-object
    :items="items"
    v-model="connection"
  >
    <template #label>
      <span v-text="$t('labels.chain')" />
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
  name: 'AssetsModalTransferSelect',
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
    connection: {
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
