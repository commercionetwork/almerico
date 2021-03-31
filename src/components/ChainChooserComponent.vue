<template>
  <v-form>
    <v-select v-model="selectedItem" :items="CHAIN.LIST">
      <template v-slot:selection="data">
        <span
          class="text-h6 text-uppercase font-weight-medium"
          v-text="data.item.text"
        />
      </template>
      <template v-slot:item="data">
        <a
          class="text-decoration-none"
          v-text="data.item.text"
          :href="data.item.value"
        />
      </template>
    </v-select>
  </v-form>
</template>

<script>
import { CHAIN } from "@/constants";

export default {
  name: "ChainChooserComponent",
  data: () => ({
    CHAIN,
    selectedItem: null,
  }),
  computed: {
    currentItem() {
      const chainIndex = CHAIN.LIST.findIndex(
        (item) => item.lcd === process.env.VUE_APP_LCD
      );
      return chainIndex > -1 ? CHAIN.LIST[chainIndex] : CHAIN.DEFAULT;
    },
  },
  created() {
    this.selectedItem = this.currentItem;
  },
};
</script>