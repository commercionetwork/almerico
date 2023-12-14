<template>
  <v-form>
    <v-select
      :items="CHAIN.LIST"
      @change="changeChain"
      flat
      item-text="text"
      item-value="value"
      v-model="selectedItem"
    >
      <template #selection="data">
        <span
          class="text-h6 text-uppercase primary--text font-weight-bold"
          v-text="data.item.text"
        />
      </template>
      <template #item="data">
        <span
          class="text-subtitle-1 font-weight-bold"
          v-text="data.item.text"
        />
      </template>
    </v-select>
  </v-form>
</template>

<script>
import { CHAIN } from '@/constants';

export default {
  name: 'TheChainChooser',
  data() {
    return {
      CHAIN,
      selectedItem: null,
    };
  },
  computed: {
    currentItem() {
      const chainIndex = CHAIN.LIST.findIndex(
        (item) => item.lcd === process.env.VUE_APP_LCD
      );
      return chainIndex > -1
        ? CHAIN.LIST[chainIndex]
        : CHAIN.LIST[CHAIN.DEFAULT_INDEX];
    },
  },
  methods: {
    changeChain(chain) {
      window.location.href = chain;
    },
  },
  created() {
    this.selectedItem = this.currentItem;
  },
};
</script>
