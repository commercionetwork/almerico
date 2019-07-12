<template>
  <div class="bg-white">
    <div class="row">
      <div class="col-12">
        <h2
          v-text="$t('titles.delegators')"
          class="com-font-s16-w700"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="table-responsive">
          <table class="table table-striped">
            <thead>
              <tr class="text-center com-font-s13-w700">
                <th scope="col">Delegator address</th>
                <th scope="col">Amount</th>
                <th scope="col">Share</th>
              </tr>
            </thead>
            <tbody>
              <ValidatorDetailsDelegatorsRow
                v-for="(delegator, index) in delegators"
                :key="index"
                :delegator="delegator"
                :totals="totals"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ValidatorDetailsDelegatorsRow from "./ValidatorDetailsDelegatorsRow.vue";

import { arrayManager } from "Utils";

export default {
  name: "ValidatorDetailsDelegators",
  description: "Display a delegators list",
  components: {
    ValidatorDetailsDelegatorsRow
  },
  props: {
    address: {
      type: String,
      required: true,
      note: "The account's address"
    },
    delegations: {
      type: Array,
      required: true,
      note: "Delegations as validator to display"
    },
    validator: {
      type: Object,
      required: true,
      note: "Object representing teh validator"
    }
  },
  computed: {
    filteredDelegations() {
      return this.delegations.filter(
        delegation => delegation.delegator_address !== this.address
      );
    },
    delegators() {
      const delegatorsObj = arrayManager.groupBy(
        this.filteredDelegations,
        "delegator_address"
      );
      const delegators = [];
      Object.keys(delegatorsObj).forEach(delegator => {
        const amounts = delegatorsObj[delegator];
        let tot = 0;
        amounts.forEach(item => {
          tot += parseFloat(item.shares);
        });
        delegators.push({
          address: delegator,
          shares: tot
        });
      });
      return delegators.sort(function(a, b) {
        return b.shares - a.shares;
      });
    },
    totals() {
      return parseFloat(this.validator.delegator_shares);
    }
  }
};
</script>
