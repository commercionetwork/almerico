<template>
  <div>
    <div class="row align-items-center">
      <div class="col-12 col-md-4">
        <h2
          v-text="$t('titles.delegators')"
          class="com-font-s16-w700"
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
        <div
          v-if="filteredDelegations.length > 0"
          class="table-responsive"
          data-test="items"
        >
          <table class="table table-striped">
            <thead>
              <tr class="text-center com-font-s13-w700">
                <th scope="col">
                  <span v-text="$t('labels.delegator')" />
                </th>
                <th scope="col">
                  <span v-text="$t('labels.amount')" />
                </th>
                <th scope="col">
                  <span v-text="$t('labels.share')" />
                </th>
              </tr>
            </thead>
            <tbody>
              <ValidatorDetailsDelegatorsRow
                v-for="(delegator, index) in delegators"
                :key="index"
                :delegator="delegator"
                :totals="totalShares"
              />
            </tbody>
          </table>
        </div>
        <div
          v-else
          class="text-center text-info com-font-s14-w700"
          v-text="$t('messages.noItems')"
          data-test="no-items"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from "Components/common/Pagination.vue";
import ValidatorDetailsDelegatorsRow from "./ValidatorDetailsDelegatorsRow.vue";

import { arrayManager } from "Utils";

export default {
  name: "ValidatorDetailsDelegators",
  description: "Display a delegators list",
  components: {
    Pagination,
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
          tot += parseFloat(item.shares);
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
      return parseFloat(this.validator.delegator_shares);
    }
  },
  methods: {
    changePage(page) {
      this.page = page;
    }
  }
};
</script>
