<template>
  <v-card-text>
    <div
      class="text-subtitle-1 font-weight-bold"
      v-text="$t('labels.selectDex')"
    />
    <v-select
      dense
      outlined
      return-object
      single-line
      :items="items"
      v-model="select"
    >
      <template #append>
        <v-icon>{{ mdiChevronDown }}</v-icon>
      </template>
      <template #item="{ item }">
        <div>
          <span v-text="item[CONTRACT.TOKEN.DENOM.TOKEN_1]" /> -
          <span v-text="item[CONTRACT.TOKEN.DENOM.TOKEN_2]" />
        </div>
      </template>
      <template #selection="{ item }">
        <div class="font-weight-bold">
          <span v-text="item[CONTRACT.TOKEN.DENOM.TOKEN_1]" /> -
          <span v-text="item[CONTRACT.TOKEN.DENOM.TOKEN_2]" />
        </div>
      </template>
    </v-select>
  </v-card-text>
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
