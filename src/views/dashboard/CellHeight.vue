<template>
  <DataCell :isFetching="isFetching">
    <div
      slot="top-left-content"
      class="com-font-s13-w400"
    >Height</div>
    <div
      slot="bottom-left-content"
      class="text-secondary com-font-s14-w700"
      v-text="height"
    />
    <div slot="top-right-content">&nbsp;</div>
    <div
      slot="bottom-right-content"
      class="com-font-s11-w400"
      v-text="getTime()"
    />
  </DataCell>
</template>

<script>
import DataCell from "Components/common/DataCell.vue";

import { mapGetters } from "vuex";

export default {
  name: "CellHeight",
  description: "Display the height",
  components: {
    DataCell
  },
  computed: {
    ...mapGetters("tendermint", {
      blocks: "blocks",
      isFetching: "isFetching"
    }),
    height() {
      return this.blocks.length > 0 ? this.blocks[0].header.height : "";
    },
    time() {
      return this.blocks.length > 0 ? this.blocks[0].header.time : "";
    },
  },
  methods: {
    getTime() {
      let time = "";
      let seconds = (new Date() - new Date(this.time)) / 1000;
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

      return `Last ${time} ago`;
    }
  }
};
</script>
