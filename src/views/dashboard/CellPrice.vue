<template>
  <DataCell>
    <div
      slot="top-left-content"
      class="com-font-s12-w400"
    >Price</div>
    <div slot="top-right-content">2</div>
    <div slot="bottom-left-content">3</div>
    <div slot="bottom-right-content">4</div>
  </DataCell>
</template>

<script>
import DataCell from "Components/common/DataCell.vue";

export default {
  name: "CellPrice",
  description: "Display the price",
  components: {
    DataCell
  },
  computed: {
    isFetching() {
      return true;
    }
  }
};
</script>
