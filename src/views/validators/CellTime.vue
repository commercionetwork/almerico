<template>
  <DataCell
    :isFetching="isFetching"
    height="75"
  >
    <div slot="top-left-content">
      <span>
        <Icon
          name="history"
          scale="1"
        />
      </span>
      <span class="pl-1 com-font-s13-w400">Block time</span>
    </div>
    <div slot="bottom-left-content">&nbsp;</div>
    <div slot="top-right-content">&nbsp;</div>
    <div
      slot="bottom-right-content"
      class="com-font-s14-w400"
      v-text="time"
    />
  </DataCell>
</template>

<script>
import DataCell from "Components/common/DataCell.vue";

import Icon from "vue-awesome/components/Icon.vue";
import "Assets/img/icons/history";

import { mapGetters } from "vuex";

export default {
  name: "CellTime",
  description: "Display the block time",
  components: {
    DataCell,
    Icon
  },
  computed: {
    ...mapGetters("tendermint", {
      blocks: "blocks",
      isFetching: "isFetching"
    }),
    time() {
      let time = this.blocks.length > 0 ? this.blocks[0].header.time : null;
      let seconds = time ? (new Date() - new Date(time)) / 1000 : 0;
      switch (true) {
        case seconds >= 3600:
          time = `${(seconds / 3600).toFixed(0)}h`;
          break;
        case seconds >= 60:
          time = `${(seconds / 60).toFixed(0)}m`;
          break;
        default:
          time = `${seconds.toFixed(0)}s`;
      }

      return time ? `Last ${time} ago` : "";
    }
  }
};
</script>
