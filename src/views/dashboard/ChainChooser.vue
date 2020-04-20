<template>
  <span class="pr-2">
    <ChainDropdown
      :currentItem="currentItem"
      :items="CHAINS_LIST.VALUES"
    />
  </span>
</template>

<script>
import ChainDropdown from "Components/common/ChainDropdown.vue";

import { CHAINS_LIST } from "Constants";

export default {
  name: "ChainChooser",
  components: {
    ChainDropdown
  },
  data() {
    return {
      CHAINS_LIST
    };
  },
  computed: {
    currentItem() {
      const chainIndex = CHAINS_LIST.VALUES.findIndex(
        item => item.lcd === process.env.VUE_APP_LCD
      );
      return chainIndex > -1
        ? CHAINS_LIST.VALUES[chainIndex]
        : CHAINS_LIST.DEFAULT;
    }
  }
};
</script>