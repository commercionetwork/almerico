<template>
  <div class="container com-container">
    <SectionHeader
      :title="$t('titles.votings')"
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
  name: "Votings",
  description: "Container for votings' section",
  components: {
    SectionHeader
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
