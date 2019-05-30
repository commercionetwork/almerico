<template>
  <DataCell
    :isFetching="isFetching"
    height="75"
  >
    <div slot="top-left-content">
      <span>
        <Icon
          name="coins"
          scale="1"
        />
      </span>
      <span class="pl-1 com-font-s12-w400">Bonded tokens</span>
    </div>
    <div slot="bottom-left-content">&nbsp;</div>
    <div slot="top-right-content">&nbsp;</div>
    <div
      slot="bottom-right-content"
      class="com-font-s14-w400"
    >120M/240M</div>
  </DataCell>
</template>

<script>
import DataCell from "Components/common/DataCell.vue";

import Icon from "vue-awesome/components/Icon.vue";
import "Assets/img/icons/coins";

export default {
  name: "CellTokens",
  description: "Display the bonded tokens",
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
