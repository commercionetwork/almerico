<template>
  <div class="container com-container">
    <SectionHeader :title="$t('titles.accountDetails')" />
    <div
      v-if="isFetching"
      v-text="$t('messages.loading')"
    />
    <div
      v-else
      class="rounded bg-light"
    >
      <div>
        <AccountHeader
          :address="address"
          :delegations="delegations"
          :outstandings="outstandings"
          :rewards="rewards"
          :unbondings="unbondings"
        />
      </div>
      <div class="bg-white">
        <div class="row">
          <div class="col-12 col-md-6 mt-3">
            <AccountDelegations :delegations="delegations" />
          </div>
          <div class="col-12 col-md-6 mt-3">
            <AccountUnbondings :delegations="unbondings" />
          </div>
        </div>
        <div class="mt-3">
          <AccountTransactions
            :address="address"
            :operatorAddress="operatorAddress"
          />
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

import api from "Store/validators/api";
import { PREFIX } from "Constants";
import { bech32Manager } from "Utils";
import { mapActions } from "vuex";

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
  data() {
    return {
      delegations: [],
      outstandings: [],
      rewards: [],
      unbondings: [],
      isFetching: false
    };
  },
  computed: {
    address() {
      return this.$route.params.id;
    },
    operatorAddress() {
      let hex = bech32Manager.decode(this.address);
      return bech32Manager.encode(hex, PREFIX.COMNETVALOPER);
    }
  },
  methods: {
    ...mapActions("account", {
      fetchBalances: "fetchBalances"
    }),
    async getData() {
      let response = null;
      this.isFetching = true;
      try {
        // get delegations
        response = await api.requestValidatorDelegations(
          this.operatorAddress
        );
        if (response.data) this.delegations = response.data;
        // get unbonding delegations
        response = await api.requestValidatorUnbondingDelegations(
          this.operatorAddress
        );
        if (response.data) this.unbondings = response.data;
        // get outstanding rewards
        response = await api.requestValidatorOutstandingRewards(
          this.operatorAddress
        );
        if (response.data) this.outstandings = response.data;
        // get rewards
        response = await api.requestValidatorRewards(
          this.operatorAddress
        );
        if (response.data) this.rewards = response.data;
      } catch (error) {
        console.log(error);
      } finally {
        this.isFetching = false;
      }
    }
  },
  created() {
    this.fetchBalances(this.address);
    this.getData();
  }
};
</script>
