<template>
  <v-form>
    <v-select
      flat
      v-model="selectedItem"
      :items="CHAIN.LIST"
      item-text="text"
      item-value="value"
      v-on:change="changeChain"
    >
      <template v-slot:selection="data">
        <span
          class="text-h6 text-uppercase primary--text font-weight-bold"
          v-text="data.item.text"
        />
      </template>
      <template v-slot:item="data">
        <span class="text-subtitle-1 font-weight-bold" v-text="data.item.text" />
      </template>
    </v-select>
  </v-form>
</template>

<script>
import { CHAIN } from '@/constants';

export default {
  name: 'ChainChooserComponent',
  data: () => ({
    CHAIN,
    selectedItem: null,
  }),
  computed: {
    currentItem() {
      const chainIndex = CHAIN.LIST.findIndex(
        (item) => item.lcd === process.env.VUE_APP_LCD,
      );
      return chainIndex > -1 ? CHAIN.LIST[chainIndex] : CHAIN.DEFAULT;
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
