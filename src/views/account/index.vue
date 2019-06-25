<template>
  <div class="container com-container">
    <SectionHeader :title="$t('titles.accountDetails')" />
    <div class="rounded bg-light">
      <div>
        <AccountHeader
          :address="address"
          :operatorAddress="operatorAddress"
        />
      </div>
      <div class="bg-white">
        <div class="row">
          <div class="col-12 col-md-6 mt-3">
            <!-- <AccountDelegations :account="account" /> -->
          </div>
          <div class="col-12 col-md-6 mt-3">
            <!-- <AccountUnbondings :account="account" /> -->
          </div>
        </div>
        <div class="mt-3">
          <!-- <AccountTransactions /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AccountDelegations from "./AccountDelegations.vue";
import AccountHeader from "./AccountHeader.vue";
import AccountTransactions from "./AccountTransactions.vue";
import AccountUnbondings from "./AccountUnbondings.vue";
import SectionHeader from "Components/common/SectionHeader.vue";

import { PREFIX } from "Constants";
import { bech32Manager } from "Utils";

export default {
  name: "Account",
  description: "Container for account section",
  components: {
    AccountDelegations,
    AccountHeader,
    AccountTransactions,
    AccountUnbondings,
    SectionHeader
  },
  computed: {
    address() {
      return this.$route.params.id;
    },
    operatorAddress() {
      let hex = bech32Manager.decode(this.address);
      return bech32Manager.encode(hex, PREFIX.COMNETVALOPER);
    }
  }
};
</script>
