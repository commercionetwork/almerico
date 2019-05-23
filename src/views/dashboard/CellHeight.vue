<template>
  <DataCell :isFetching="isFetching">
    <div
      slot="top-left-content"
      class="com-font-s12-w400"
    >Height</div>
    <div slot="top-right-content">&nbsp;</div>
    <div
      slot="bottom-left-content"
      class="text-secondary com-font-s13-w700"
    >350,12</div>
    <div
      slot="bottom-right-content"
      class="com-font-s10-w400"
    >Last 10s ago</div>
  </DataCell>
</template>

<script>
import DataCell from "Components/common/DataCell.vue";

export default {
  name: "CellHeight",
  description: "Display the height",
  components: {
    DataCell
  },
  computed: {
    isFetching() {
      return false;
    }
  }
};
</script>
