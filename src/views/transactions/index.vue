<template>
  <div class="container com-container">
    <SectionHeader
      :title="$t('titles.transactions')"
      :price="price"
      :height="height"
      :bonded="bonded"
      :inflation="inflation"
    />
    <div class="py-3 px-5 rounded bg-white">
      <TableTransactions />
    </div>
  </div>
</template>

<script>
import SectionHeader from "Components/common/SectionHeader.vue";
import TableTransactions from "./TableTransactions.vue";

export default {
  name: "Transactions",
  description: "Container for transactions' section",
  components: {
    SectionHeader,
    TableTransactions
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