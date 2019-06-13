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
    >5.12s</div>
  </DataCell>
</template>

<script>
import DataCell from "Components/common/DataCell.vue";

import Icon from "vue-awesome/components/Icon.vue";
import "Assets/img/icons/history";

export default {
  name: "CellTime",
  description: "Display the block time",
  components: {
    DataCell,
    Icon
  },
  computed: {
    isFetching() {
      return false;
    }
  }
};
</script>
