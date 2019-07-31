<template>
  <div class="container com-container">
    <div class="row py-3 d-flex align-items-center">
      <div class="col-12 col-md-4 d-flex justify-content-start">
        <h1
          class="text-uppercase com-font-s20-w800"
          v-html="$t('titles.accountDetails')"
        />
      </div>
      <div class="col-12 col-md-8 d-flex justify-content-start justify-content-md-end">
        <SearchBar />
      </div>
    </div>
    <div
      v-if="isFetching"
      class="text-center text-info com-font-s14-w400"
      v-text="$t('messages.loading')"
      data-test="loading"
    />
    <div
      v-else-if="!isFetching && hasError"
      class="text-center text-danger com-font-s14-w400"
      v-text="$t('messages.fetchingError')"
      data-test="has-error"
    />
    <div
      v-else
      class="row rounded com-bg-header"
      data-test="items"
    >
      <div class="col-12 p-0">
        <div class="row">
          <div class="col-12">
            <AccountHeader :address="address" />
          </div>
        </div>
        <div class="px-5 py-3 com-bg-body">
          <div class="row py-3">
            <div class="col-12">
              <AccountValues
                :delegations="delegations"
                :rewards="rewards"
                :unbondings="unbondings"
              />
            </div>
          </div>
          <div class="row py-3">
            <div class="col-12 col-md-6">
              <AccountDelegations :delegations="delegations" />
            </div>
            <div class="col-12 col-md-6">
              <AccountUnbondings :delegations="unbondings" />
            </div>
          </div>
          <div class="row py-3">
            <div class="col-12">
              <AccountTransactions :address="address" />
            </div>
          </div>
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
import AccountValues from "./AccountValues.vue";
import SearchBar from "Components/common/SearchBar.vue";

import api from "Store/account/api";
import { arrayManager } from "Utils";
import { mapActions } from "vuex";

export default {
  name: "Account",
  description: "Container for account section",
  components: {
    AccountDelegations,
    AccountHeader,
    AccountTransactions,
    AccountUnbondings,
    AccountValues,
    SearchBar
  },
  data() {
    return {
      allDelegations: [],
      allUnbondings: [],
      hasError: false,
      isFetching: false,
      rewards: []
    };
  },
  computed: {
    address() {
      return this.$route.params.id;
    },
    delegations() {
      const delegationsObj = arrayManager.groupBy(
        this.allDelegations,
        "validator_address"
      );
      const delegations = [];
      Object.keys(delegationsObj).forEach(validator => {
        const amounts = delegationsObj[validator];
        let tot = 0;
        amounts.forEach(item => {
          tot += parseFloat(item.shares);
        });
        delegations.push({
          validator_address: validator,
          shares: tot
        });
      });
      return delegations.sort(function(a, b) {
        return b.shares - a.shares;
      });
    },
    unbondings() {
      let delegations = [...this.allUnbondings];
      return delegations.sort(function(a, b) {
        return b.creation_height - a.creation_height;
      });
    }
  },
  watch: {
    address(value) {
      this.fetchBalances(value);
      this.getData();
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
        // get all delegations
        response = await api.requestDelegatorDelegations(this.address);
        if (response.data) this.allDelegations = response.data;

        // get unbonding delegations
        response = await api.requestDelegatorUnbondingDelegations(this.address);
        if (response.data) this.allUnbondings = response.data;

        // get rewards
        response = await api.requestDelegatorRewards(this.address);
        if (response.data) this.rewards = response.data;
      } catch (error) {
        this.hasError = true;
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
