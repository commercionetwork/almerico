<template>
  <ChainDropdown
    :currentItem="currentItem"
    :items="CHAINS_LIST.VALUES"
  />
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
    }
  },
  computed: {
    currentItem() {
      return CHAINS_LIST.DEFAULT;
    }
  },
  created() {
    const lcd = process.env.VUE_APP_LCD;
    let tmpStr = lcd.replace("lcd-", "");
    console.log(tmpStr);
  }
};
</script>