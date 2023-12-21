<template>
  <v-card-text>
    <v-select
      dense
      item-text="text"
      item-value="value"
      outlined
      :items="contracts"
      v-model="select"
    >
      <template #append>
        <v-icon color="primary">{{ mdiChevronDown }}</v-icon>
      </template>
      <template #label>
        <div class="font-weight-bold">
          <span v-text="$t('labels.selectDex')" />
        </div>
      </template>
      <template #selection="{ item }">
        <div class="font-weight-bold">
          <span v-text="item.text" />
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
    contracts() {
      return this.items.map((item) => ({
        text: `${item[CONTRACT.TOKEN.DENOM.TOKEN_1]} - ${
          item[CONTRACT.TOKEN.DENOM.TOKEN_2]
        }`,
        value: item,
      }));
    },
  },
};
</script>
