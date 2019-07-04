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
            :validatorAddress="validatorAddress"
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

import apiDelegators from "Store/delegators/api";
import apiValidators from "Store/validators/api";
import { PREFIX } from "Constants";
import { arrayManager, bech32Manager } from "Utils";
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
      outstandings: [],
      rewards: [],
      allUnbondings: [],
      isFetching: false
    };
  },
  computed: {
    address() {
      return this.$route.params.id;
    },
    validatorAddress() {
      let hex = bech32Manager.decode(this.address);
      return bech32Manager.encode(hex, PREFIX.COMNETVALOPER);
    },
    delegations() {
      return arrayManager.uniqueByKey(this.allDelegations, JSON.stringify);
    },
    unbondings() {
      return arrayManager.uniqueByKey(this.allUnbondings, JSON.stringify);
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
        response = await apiValidators.requestValidatorDelegations(
          this.validatorAddress
        );
        if (response.data) this.allDelegations = response.data;
        response = await apiDelegators.requestDelegatorDelegations(
          this.address
        );
        if (response.data)
          this.addDelegatorData(
            this.allDelegations,
            response.data,
            this.validatorAddress
          );

        // get unbonding delegations
        response = await apiValidators.requestValidatorUnbondingDelegations(
          this.validatorAddress
        );
        if (response.data) this.allUnbondings = response.data;
        response = await apiDelegators.requestDelegatorUnbondingDelegations(
          this.address
        );
        if (response.data)
          this.addDelegatorData(
            this.allUnbondings,
            response.data,
            this.validatorAddress
          );

        // get rewards
        response = await apiValidators.requestValidatorRewards(
          this.validatorAddress
        );
        if (response.data) this.rewards = response.data;

        // get outstanding rewards
        response = await apiValidators.requestValidatorOutstandingRewards(
          this.validatorAddress
        );
        if (response.data) this.outstandings = response.data;
      } catch (error) {
        console.log(error);
      } finally {
        this.isFetching = false;
      }
    },
    addDelegatorData(arr, data, validator_address) {
      data.forEach(element => {
        if (element.validator_address !== validator_address) {
          arr.push(element);
        }
      });
    }
  },
  created() {
    this.fetchBalances(this.address);
    this.getData();
  }
};
</script>
