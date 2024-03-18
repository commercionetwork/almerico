<template>
  <v-select
    dense
    item-text="name"
    item-value="id"
    outlined
    :items="items"
    v-model="connectionId"
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
      type: String,
      default: '',
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
    connectionId: {
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
