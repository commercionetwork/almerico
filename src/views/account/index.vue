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
      class="alert alert-warning"
      role="alert"
      v-text="$t('messages.loading')"
      data-test="loading"
    />
    <div
      v-else-if="!isFetching && isError"
      class="alert alert-danger"
      role="alert"
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
            <AccountHeader
              :address="address"
              :membership="membership"
            />
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

import { mapActions, mapGetters } from "vuex";

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
  computed: {
    ...mapGetters("account", {
      delegations: "delegations",
      rewards: "rewards",
      unbondings: "unbondingDelegations",
      isFetching: "isFetching",
      membership: "membership",
      message: "message"
    }),
    address() {
      return this.$route.params.id;
    },
    isError() {
      return this.message.length > 0;
    }
  },
  watch: {
    address(value) {
      this.fetchAccount(value);
    }
  },
  methods: {
    ...mapActions("account", {
      fetchAccount: "fetchAccount"
    })
  },
  created() {
    this.fetchAccount(this.address);
  }
};
</script>
