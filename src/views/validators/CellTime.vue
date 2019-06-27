<template>
  <HeaderCell :chart='false'>
    <div slot="header">
      <span>
        <Icon
          name="history"
          scale="1"
        />
      </span>
      <span
        class="pl-1"
        v-text="'Block time'"
      />
    </div>
    <div slot="body">
      <span v-text="time" />
    </div>
  </HeaderCell>
</template>

<script>
import HeaderCell from "Components/common/HeaderCell.vue";

import Icon from "vue-awesome/components/Icon.vue";
import "Assets/img/icons/history";

import { mapGetters } from "vuex";

export default {
  name: "CellTime",
  description: "Display the block time",
  components: {
    HeaderCell,
    Icon
  },
  computed: {
    ...mapGetters("blocks", {
      block: "lastBlock"
    }),
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

      return time ? `Last ${time} ago` : "";
    }
  }
};
</script>
