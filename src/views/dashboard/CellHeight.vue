<template>
  <HeaderCell :chart='false'>
    <div
      slot="header"
      v-text="$t('labels.height')"
    />
    <div
      slot="body"
      v-text="height"
    />
    <div
      slot="footer"
      v-text="time"
    />
  </HeaderCell>
</template>

<script>
import HeaderCell from "Components/common/HeaderCell.vue";

import { mapGetters } from "vuex";

export default {
  name: "CellHeight",
  description: "Display the height",
  components: {
    HeaderCell
  },
  computed: {
    ...mapGetters("blocks", {
      block: "lastBlock"
    }),
    height() {
      return this.block ? this.block.header.height : "-";
    },
    time() {
      let time = this.block ? this.block.header.time : null;
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

      return time ? `${time} ${this.$t("messages.ago")}` : "";
    }
  }
};
</script>
