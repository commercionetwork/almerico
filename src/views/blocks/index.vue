<template>
  <div class="container com-container">
    <SectionHeader
      :title="$t('titles.blocks')"
      :price="price"
      :height="height"
      :bonded="bonded"
      :inflation="inflation"
    />
    <div class="py-3 px-5 rounded bg-white">
      <TableBlocks />
    </div>
  </div>
</template>

<script>
import SectionHeader from "Components/common/SectionHeader.vue";
import TableBlocks from "./TableBlocks.vue";

export default {
  name: "Blocks",
  description: "Container for blocks' section",
  components: {
    SectionHeader,
    TableBlocks
  },
  computed: {
    price() {
      return { value: 10, iso_code: "EUR" };
    },
    height() {
      return 345678;
    },
    bonded() {
      return 123456789;
    },
    inflation() {
      return 0.034;
    }
  }
};
</script>
