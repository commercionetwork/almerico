<template>
  <div class="container com-container">
    <SectionHeader
      :title="$t('titles.transactions')"
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
  name: "Transactions",
  description: "Container for transactions' section",
  components: {
    SectionHeader,
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
} 
</script>