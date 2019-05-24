<template>
  <div class="container com-container">
    <SectionHeader
      :title="$t('titles.blocks')"
      :price="price"
      :height="height"
      :bonded="bonded"
      :inflation="inflation"
    />
  </div>
</template>

<script>
import SectionHeader from "Components/common/SectionHeader.vue";

export default {
  name: "Blocks",
  description: "Container for blocks' section",
  components: {
    SectionHeader,
  },
  computed: {
    price() {
      return { value: 10, iso_code: "EUR" };
    },
    height() {
      return 345.67;
    },
    bonded() {
      return 123456789;
    },
    inflation() {
      return 0.034;
    }
  }
} 
</script>
