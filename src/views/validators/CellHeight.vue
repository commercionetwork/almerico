<template>
  <DataCell :isFetching="isFetching">
    <div slot="top-left-content">
      <span>
        <Icon
          name="cubes"
          scale="1"
        />
      </span>
      <span class="pl-1 com-font-s12-w400">Height</span>
    </div>
    <div slot="top-right-content">&nbsp;</div>
    <div slot="bottom-left-content">&nbsp;</div>
    <div
      slot="bottom-right-content"
      class="com-font-s14-w400"
    >350,12</div>
  </DataCell>
</template>

<script>
import DataCell from "Components/common/DataCell.vue";

import Icon from "vue-awesome/components/Icon.vue";
import "Assets/img/icons/cubes";

export default {
  name: "CellHeight",
  description: "Display the height",
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
