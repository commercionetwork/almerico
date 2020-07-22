<template>
  <div>
    <div class="row align-items-center">
      <div class="col-12 col-md-4">
        <h2
          v-text="$t('titles.delegators')"
          class="py-3 com-font-s16-w700"
        />
      </div>
      <div class="col-12 col-md-8">
        <Pagination
          v-if="filteredDelegations.length > 0"
          :limit="limit"
          :page="page"
          :total="total"
          v-on:change-page="changePage"
          data-test="pagination"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <ValidatorDetailsDelegatorsTable
          v-if="delegators.length > 0"
          :delegators="delegators"
          :totalShares="totalShares"
          data-test="items"
        />
        <div
          v-else
          class="alert alert-info"
          role="alert"
          v-text="$t('messages.noItems')"
          data-test="no-items"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "Components/common/Pagination.vue";
import ValidatorDetailsDelegatorsTable from "./ValidatorDetailsDelegatorsTable.vue";

import { arrayManager } from "Utils";

export default {
  name: "ValidatorDetailsDelegators",
  description: "Display a delegators list",
  components: {
    Pagination,
    ValidatorDetailsDelegatorsTable
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
  data() {
    return {
      limit: 5,
      page: 1
    };
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
          tot += parseFloat(item.balance.amount);
        });
        delegators.push({
          address: delegator,
          shares: tot
        });
      });
      delegators.sort(function(a, b) {
        return b.shares - a.shares;
      });
      return delegators.slice(
        (this.page - 1) * this.limit,
        this.page * this.limit
      );
    },
    total() {
      const delegatorsObj = arrayManager.groupBy(
        this.filteredDelegations,
        "delegator_address"
      );
      return Object.keys(delegatorsObj).length;
    },
    totalShares() {
      return parseFloat(this.validator.tokens);
    }
  },
  methods: {
    changePage(page) {
      this.page = page;
    }
  }
};
</script>
