<template>
  <DataCell
    :isFetching="isFetching"
    height="75"
  >
    <div slot="top-left-content">
      <span>
        <Icon
          name="cubes"
          scale="1"
        />
      </span>
      <span class="pl-1 com-font-s13-w400">Height</span>
    </div>
    <div slot="bottom-left-content">&nbsp;</div>
    <div slot="top-right-content">&nbsp;</div>
    <div
      slot="bottom-right-content"
      class="com-font-s14-w400"
      v-text="height"
    />
  </DataCell>
</template>

<script>
import DataCell from "Components/common/DataCell.vue";

import Icon from "vue-awesome/components/Icon.vue";
import "Assets/img/icons/cubes";

import { mapGetters } from "vuex";

export default {
  name: "CellHeight",
  description: "Display the height",
  components: {
    DataCell,
    Icon
  },
  computed: {
    ...mapGetters("tendermint", {
      blocks: "blocks",
      isFetching: "isFetching"
    }),
    height() {
      return this.blocks.length > 0 ? this.blocks[0].header.height : "";
    }
  }
};
</script>
