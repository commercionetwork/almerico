<template>
  <div>
    <div class="row align-items-center">
      <div class="col-12 col-md-4">
        <h2
          class="py-3 com-font-s16-w700"
          v-text="$t('titles.transactions')"
        />
      </div>
      <div class="col-12 col-md-8">
        <Pagination
          v-if="transactions.length > 0"
          :limit="limit"
          :page="page"
          :total="total"
          v-on:change-page="changePage"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div
          v-if="isFetching"
          class="alert alert-warning"
          role="alert"
          v-text="$t('messages.loading')"
          data-test="loading"
        />
        <div
          v-else-if="!isFetching && hasError"
          class="alert alert-danger"
          role="alert"
          v-text="$t('messages.fetchingError')"
          data-test="has-error"
        />
        <AccountTransactionsTable
          v-else-if="!isFetching && !hasError && transactionsPage.length > 0"
          :transactions="transactionsPage"
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
import AccountTransactionsTable from "./AccountTransactionsTable.vue";
import Pagination from "Components/common/Pagination.vue";

import { fetchTransactions } from "Api";
import { ACCOUNT_ROLES } from "Constants";

export default {
  name: "AccountTransactions",
  description: "Display the account transactions list",
  components: {
    AccountTransactionsTable,
    Pagination
  },
  props: {
    address: {
      type: String,
      required: true,
      note: "The account address"
    }
  },
  data() {
    return {
      hasError: false,
      isFetching: false,
      limit: 5,
      page: 1,
      transactions: []
    };
  },
  computed: {
    transactionsPage() {
      return this.orderedTransactions.slice(
        (this.page - 1) * this.limit,
        this.page * this.limit
      );
    },
    orderedTransactions() {
      const transactions = [...this.transactions];
      return transactions.sort(function(a, b) {
        return b.height - a.height;
      });
    },
    total() {
      return this.transactions.length;
    }
  },
  methods: {
    getTransactions() {
      this.isFetching = true;
      Object.values(ACCOUNT_ROLES).forEach(async role => {
        const tag = `${role}=${this.address}`;
        const response = await fetchTransactions(tag, this.limit);
        if (response.err) {
          this.hasError = true;
        } else {
          this.transactions.push(...response.txs);
        }
      });
      this.isFetching = false;
    },
    changePage(page) {
      this.page = page;
    }
  },
  created() {
    this.getTransactions();
  }
};
</script>
