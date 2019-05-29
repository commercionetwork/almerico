<template>
  <div class="container com-container">
    <SectionHeader
      :title="$t('titles.accountDetails')"
      :price="price"
      :height="height"
      :bonded="bonded"
      :inflation="inflation"
    />
    <div>
      <AccountHeader :account="account" />
    </div>
  </div>
</template>

<script>
import AccountHeader from "./AccountHeader.vue";
import SectionHeader from "Components/common/SectionHeader.vue";

export default {
  name: "Account",
  description: "Container for account section",
  components: {
    AccountHeader,
    SectionHeader
  },
  computed: {
    account() {
      return {}
    },
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
