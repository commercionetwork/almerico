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
    <div class="row">
      <div class="col-12 col-md-6 mt-3">
        <AccountDelegations />
      </div>
      <div class="col-12 col-md-6 mt-3">
        <AccountUnbondings/>
      </div>
    </div>
  </div>
</template>

<script>
import AccountDelegations from "./AccountDelegations.vue";
import AccountHeader from "./AccountHeader.vue";
import AccountUnbondings from "./AccountUnbondings.vue";
import SectionHeader from "Components/common/SectionHeader.vue";

//TODO: remove
import { mockAccount } from "Store/account/__mocks__/account";

export default {
  name: "Account",
  description: "Container for account section",
  components: {
    AccountDelegations,
    AccountHeader,
    AccountUnbondings,
    SectionHeader
  },
  computed: {
    account() {
      return mockAccount();
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
