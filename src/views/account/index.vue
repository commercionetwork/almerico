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
          <AccountTransactions :address="address" />
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

import api from "Store/delegators/api";
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
    SectionHeader
  },
  data() {
    return {
      allDelegations: [],
      rewards: [],
      allUnbondings: [],
      isFetching: false
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
