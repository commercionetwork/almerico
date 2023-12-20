<template>
  <v-select
    dense
    outlined
    return-object
    single-line
    :items="items"
    :label="$t('labels.select')"
    v-model="select"
  >
    <template #append>
      <v-icon color="primary">{{ mdiChevronDown }}</v-icon>
    </template>
    <template #item="{ item }">
      <div class="text-caption">
        <span v-text="item[CONTRACT.TOKEN.DENOM.TOKEN_1]" /> -
        <span v-text="item[CONTRACT.TOKEN.DENOM.TOKEN_2]" />
      </div>
    </template>
    <template #selection="{ item }">
      <div class="text-caption font-weight-bold">
        <span v-text="item[CONTRACT.TOKEN.DENOM.TOKEN_1]" /> -
        <span v-text="item[CONTRACT.TOKEN.DENOM.TOKEN_2]" />
      </div>
    </template>
  </v-select>
</template>

<script>
import { mdiChevronDown } from '@mdi/js';
import { CONTRACT } from '@/constants';

export default {
  name: 'DexViewSelector',
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      CONTRACT,
      mdiChevronDown,
    };
  },
  computed: {
    select: {
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
